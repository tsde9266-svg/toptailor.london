import { NextRequest, NextResponse } from 'next/server'

// ─── Telegram notification ────────────────────────────────────────────────────
// Setup (2 min, completely free):
//   1. Open Telegram → search @BotFather → send /newbot → follow prompts
//      → it gives you a token like:  123456789:ABCdef...
//   2. Open your new bot and send it any message (e.g. "hi")
//   3. Visit: https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
//      → look for "chat":{"id": 123456789}  ← that's your chat ID
//   4. In Vercel dashboard → Settings → Environment Variables → add:
//        TELEGRAM_BOT_TOKEN   =  123456789:ABCdef...
//        TELEGRAM_CHAT_ID     =  123456789
//   5. Redeploy — done. You'll get an instant Telegram ping for every inquiry.
// ─────────────────────────────────────────────────────────────────────────────
async function notifyEmail(subject: string, bodyText: string) {
  const apiKey = process.env.RESEND_API_KEY
  const to     = process.env.NOTIFICATION_EMAIL
  if (!apiKey || !to) return
  try {
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    'Top Tailor <onboarding@resend.dev>',
        to:      [to],
        subject,
        text:    bodyText,
      }),
    })
  } catch (e) {
    console.error('[email] failed', e)
  }
}

async function notifyTelegram(text: string) {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return   // silently skip if not configured yet

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:    chatId,
        text,
        parse_mode: 'HTML',
      }),
    })
  } catch (e) {
    // Never let a notification failure break the form submission
    console.error('[telegram] failed to send notification', e)
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(body: Record<string, unknown>) {
  const errors: string[] = []
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2)
    errors.push('Name is required.')
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('A valid email is required.')
  return errors
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch (_e) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const errors = validate(body)
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  const name     = String(body.name     ?? '').trim()
  const email    = String(body.email    ?? '').trim()
  const phone    = String(body.phone    ?? '').trim()
  const service  = String(body.service  ?? '').trim()
  const day      = String(body.day      ?? '').trim()
  const postcode = String(body.postcode ?? '').trim()
  const notes    = String(body.notes    ?? '').trim()

  const emailSubject = `📋 New Inquiry — ${name}`
  const emailBody =
    `New Inquiry — Top Tailor\n${'─'.repeat(40)}\n` +
    `Name:     ${name}\nEmail:    ${email}\n` +
    (phone    ? `Phone:    ${phone}\n`    : '') +
    (service  ? `Service:  ${service}\n` : '') +
    (day      ? `Day:      ${day}\n`     : '') +
    (postcode ? `Postcode: ${postcode}\n`: '') +
    (notes    ? `\nNotes:\n${notes}`     : '')

  await Promise.all([
    notifyEmail(emailSubject, emailBody),
    notifyTelegram(
      `📋 <b>New Top Tailor Inquiry</b>\n\n` +
      `👤 <b>Name:</b> ${name}\n` +
      `📧 <b>Email:</b> ${email}\n` +
      (phone    ? `📞 <b>Phone:</b> ${phone}\n`       : '') +
      (service  ? `✂️ <b>Service:</b> ${service}\n`   : '') +
      (day      ? `📅 <b>Day:</b> ${day}\n`            : '') +
      (postcode ? `📍 <b>Postcode:</b> ${postcode}\n`  : '') +
      (notes    ? `\n💬 <b>Notes:</b>\n${notes}`       : '')
    ),
  ])

  // Also log to Vercel logs as a backup record
  console.log('[contact:new]', { name, email, phone, service, day, postcode, notes, ts: new Date().toISOString() })

  return NextResponse.json({ ok: true }, { status: 200 })
}

// Reject non-POST
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
