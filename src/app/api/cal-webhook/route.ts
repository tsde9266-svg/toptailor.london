import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import {
  saveCalBooking,
  getCalBookingByCalUid,
  updateCalBooking,
  type CalBooking,
} from '@/lib/kv'
import { bookingConfirmationWALink } from '@/lib/greeting'
import { notifyTelegram, escHtml } from '@/lib/telegram'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

// ─── Signature verification ────────────────────────────────────────────────────
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

// ─── Date formatter for Telegram messages ─────────────────────────────────────
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
  const rawBody = await req.text()

  const secret = process.env.CALCOM_WEBHOOK_SECRET
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

  const handled = ['BOOKING_CREATED', 'BOOKING_CANCELLED', 'BOOKING_RESCHEDULED']
  if (!handled.includes(triggerEvent)) {
    return NextResponse.json({ ok: true })
  }

  // Extract attendee details
  // Cal.com sends custom field responses (phone, address) in payload.responses,
  // not always in the attendee object — check both.
  const attendees  = (payload.attendees ?? []) as Array<Record<string, string>>
  const attendee   = attendees[0] ?? {}
  const responses  = (payload.responses ?? {}) as Record<string, { value?: unknown } | unknown>
  const pickStr    = (r: unknown) => {
    if (!r) return ''
    if (typeof r === 'string') return r
    const v = (r as { value?: unknown }).value
    if (typeof v === 'string') return v
    // location can be { value: "attendeeAddress", optionValue: "123 Street..." }
    if (v && typeof v === 'object') return String((v as { optionValue?: unknown }).optionValue ?? '')
    return ''
  }

  const name      = attendee.name  || pickStr(responses.name)  || String(payload.name  ?? 'Unknown')
  const email     = attendee.email || pickStr(responses.email) || String(payload.email ?? '')
  const phone     = attendee.phoneNumber
    || pickStr(responses.phone)
    || String(payload.phoneNumber ?? '')
  const startTime = String(payload.startTime ?? '')
  const endTime   = String(payload.endTime   ?? '')
  const notes     = pickStr(responses.notes)
    || String(payload.description ?? payload.additionalNotes ?? '')
  const calUid    = String(payload.uid ?? '')
  // location: prefer the responses address over the location-type label
  const location  = pickStr(responses.location) || String(payload.location ?? '')

  const dateStr = startTime ? fmt(startTime) : ''
  const endStr  = endTime
    ? new Date(endTime).toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
      })
    : ''

  // ── BOOKING_CANCELLED ──────────────────────────────────────────────────────
  if (triggerEvent === 'BOOKING_CANCELLED') {
    if (calUid) {
      try {
        const existing = await getCalBookingByCalUid(calUid)
        if (existing && existing.status !== 'cancelled') {
          existing.status = 'cancelled'
          await updateCalBooking(existing)
        }
      } catch (e) {
        console.error('[cal-webhook] failed to cancel booking in KV', e)
      }
    }
    await notifyTelegram(
      `❌ <b>Booking Cancelled</b>\n\n` +
      `👤 <b>Name:</b> ${escHtml(name)}\n` +
      `📧 <b>Email:</b> ${escHtml(email)}\n` +
      (phone   ? `📞 <b>Phone:</b> ${escHtml(phone)}\n`   : '') +
      (dateStr ? `📅 <b>Was:</b> ${dateStr}\n`   : '') +
      (calUid  ? `\n🔑 Ref: <code>${calUid.slice(0, 8)}</code>` : '')
    ).catch(() => {})
    return NextResponse.json({ ok: true })
  }

  // ── BOOKING_CREATED / BOOKING_RESCHEDULED ──────────────────────────────────
  const isReschedule = triggerEvent === 'BOOKING_RESCHEDULED'
  let booking: CalBooking

  try {
    const existing = calUid ? await getCalBookingByCalUid(calUid) : null

    if (existing && isReschedule) {
      // Customer rescheduled in cal.com — reset to pending with new times
      booking = {
        ...existing,
        status:        'pending',
        scheduledAt:   startTime,
        endTime,
        location,
        notes,
        proposedTimes: undefined,
        adminNote:     undefined,
        approvedAt:    undefined,
        confirmedTime: undefined,
      }
      await updateCalBooking(booking)
    } else if (existing) {
      // Webhook retry — booking already saved, skip duplicate creation
      console.log('[cal-webhook] duplicate calUid, skipping', calUid)
      return NextResponse.json({ ok: true })
    } else {
      booking = {
        id:          crypto.randomUUID(),
        calUid,
        status:      'pending',
        createdAt:   new Date().toISOString(),
        attendee:    { name, email, phone },
        scheduledAt: startTime,
        endTime,
        location,
        notes,
      }
      await saveCalBooking(booking)
    }
  } catch (e) {
    console.error('[cal-webhook] KV error', e)
    // Still notify Telegram even if KV fails
    await notifyTelegram(`⚠️ <b>Booking received but KV save failed</b>\n👤 ${escHtml(name)}\n📧 ${escHtml(email)}`)
    return NextResponse.json({ ok: true })
  }

  const icon  = isReschedule ? '🔄' : '🆕'
  const label = isReschedule ? 'Booking Rescheduled — Needs Approval' : 'New Booking — Awaiting Your Approval'

  const waLink = phone
    ? bookingConfirmationWALink(phone, { startTime, endTime, location })
    : ''

  const message =
    `${icon} <b>${label}</b>\n\n` +
    `👤 <b>Name:</b> ${escHtml(name)}\n` +
    `📧 <b>Email:</b> ${escHtml(email)}\n` +
    (phone    ? `📞 <b>Phone:</b> ${escHtml(phone)}\n`                         : '') +
    (dateStr  ? `📅 <b>Date:</b> ${dateStr}${endStr ? ` – ${endStr}` : ''}\n` : '') +
    (location ? `📍 <b>Location:</b> ${escHtml(location)}\n`                   : '') +
    (notes    ? `\n💬 <b>Notes:</b>\n${escHtml(notes)}\n`                      : '') +
    `\n⏳ <i>Slot booked — awaiting your approval.</i>\n` +
    `⚠️ <i>Customer has NOT yet submitted their order or chosen a payment method.</i>`

  const buttons = [[
    { text: '✅ Open Admin',        url: `${BASE_URL}/admin/bookings/${booking.id}` },
    ...(waLink ? [{ text: '💬 WhatsApp Customer', url: waLink }] : []),
  ]]

  await notifyTelegram(message, buttons).catch(() => {})
  console.log(`[cal-webhook:${triggerEvent}]`, { name, email, startTime, id: booking.id })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
