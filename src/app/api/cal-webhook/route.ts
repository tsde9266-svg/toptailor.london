import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// ─── Telegram ─────────────────────────────────────────────────────────────────
async function notifyTelegram(text: string) {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  } catch (e) {
    console.error('[telegram] failed to send', e)
  }
}

// ─── Signature verification ────────────────────────────────────────────────────
// Cal.com signs every webhook with HMAC-SHA256 using your webhook secret.
// Add CAL_WEBHOOK_SECRET in Vercel env vars for full security (optional but recommended).
function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  try {
    const hmac     = crypto.createHmac('sha256', secret)
    hmac.update(rawBody)
    const expected = hmac.digest('hex')
    const received = signature.replace(/^sha256=/, '')
    return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected))
  } catch {
    return false
  }
}

// ─── Date formatter ────────────────────────────────────────────────────────────
function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    weekday:  'long',
    day:      'numeric',
    month:    'long',
    year:     'numeric',
    hour:     '2-digit',
    minute:   '2-digit',
    timeZone: 'Europe/London',
  })
}

// ─── POST /api/cal-webhook ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Read raw body first (needed for signature verification)
  const rawBody = await req.text()

  // Verify Cal.com signature if secret is set
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (secret) {
    const sig = req.headers.get('x-cal-signature-256') ?? ''
    if (!sig || !verifySignature(rawBody, sig, secret)) {
      console.warn('[cal-webhook] signature mismatch — request rejected')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const triggerEvent = String(body.triggerEvent ?? '')
  const payload      = (body.payload ?? {}) as Record<string, unknown>

  // Only handle booking lifecycle events
  const handled = ['BOOKING_CREATED', 'BOOKING_CANCELLED', 'BOOKING_RESCHEDULED']
  if (!handled.includes(triggerEvent)) {
    return NextResponse.json({ ok: true })
  }

  // Extract attendee details
  const attendees = (payload.attendees ?? []) as Array<Record<string, string>>
  const attendee  = attendees[0] ?? {}
  const name      = attendee.name        ?? String(payload.name        ?? 'Unknown')
  const email     = attendee.email       ?? String(payload.email       ?? '')
  const phone     = attendee.phoneNumber ?? String(payload.phoneNumber ?? '')
  const startTime = String(payload.startTime ?? '')
  const endTime   = String(payload.endTime   ?? '')
  const notes     = String(payload.description ?? payload.additionalNotes ?? '')
  const uid       = String(payload.uid ?? '').slice(0, 8)
  const location  = String(payload.location ?? '')

  const dateStr = startTime ? fmt(startTime) : ''
  const endStr  = endTime
    ? new Date(endTime).toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
      })
    : ''

  const META: Record<string, { icon: string; label: string }> = {
    BOOKING_CREATED:     { icon: '✅', label: 'New Booking Confirmed'  },
    BOOKING_CANCELLED:   { icon: '❌', label: 'Booking Cancelled'      },
    BOOKING_RESCHEDULED: { icon: '🔄', label: 'Booking Rescheduled'    },
  }
  const { icon, label } = META[triggerEvent]

  const message =
    `${icon} <b>Top Tailor — ${label}</b>\n\n` +
    `👤 <b>Name:</b> ${name}\n` +
    `📧 <b>Email:</b> ${email}\n` +
    (phone    ? `📞 <b>Phone:</b> ${phone}\n`                               : '') +
    (dateStr  ? `📅 <b>Date:</b> ${dateStr}${endStr ? ` – ${endStr}` : ''}\n` : '') +
    (location ? `📍 <b>Location:</b> ${location}\n`                         : '') +
    (notes    ? `\n💬 <b>Notes:</b>\n${notes}\n`                            : '') +
    (uid      ? `\n🔑 Ref: <code>${uid}</code>`                             : '')

  await notifyTelegram(message)
  console.log(`[cal-webhook:${triggerEvent}]`, { name, email, startTime, uid })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
