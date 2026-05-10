import { NextRequest, NextResponse } from 'next/server'
import { adminGreetingLink, normaliseUkPhone } from '@/lib/greeting'
import { sendMail } from '@/lib/mail'

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
  const to = process.env.NOTIFICATION_EMAIL
  if (!to) return
  try {
    await sendMail({ to, subject, text: bodyText })
  } catch (e) {
    console.error('[email] admin notify failed', e)
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

// ─── Confirmation email to customer ───────────────────────────────────────────
async function sendCustomerConfirmation(
  to: string,
  name: string,
  address: string,
) {
  const needsAddress = !address.trim()

  try {
    await sendMail({
      to,
      subject: 'We received your inquiry — Fine Tailors',
      text:
        `Hi ${name},\n\n` +
        `Thank you for getting in touch. We've received your inquiry and a specialist will contact you within a few hours.\n\n` +
        `Please note: all home visits and consultations are chargeable. We do not offer free assessments. ` +
        `Our team will share full pricing when they get in touch.\n\n` +
        (needsAddress
          ? `To help us plan your visit, please reply to this email with your full home or workplace address (including postcode) so we can confirm availability for your area.\n\n`
          : '') +
        `Questions in the meantime? Reply to this email or WhatsApp us directly.\n\n` +
        `Fine Tailors`,
    })
  } catch (e) {
    console.error('[email] customer confirmation failed', e)
  }
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
  const address  = String(body.address  ?? '').trim()
  const postcode = String(body.postcode ?? '').trim()
  const notes    = String(body.notes    ?? '').trim()

  const waPhone      = phone ? normaliseUkPhone(phone)   : ''
  const greetingLink = phone ? adminGreetingLink(phone)  : ''

  const emailSubject = `📋 New Inquiry — ${name}`
  const emailBody =
    `New Inquiry — Fine Tailors\n${'─'.repeat(40)}\n` +
    `Name:     ${name}\nEmail:    ${email}\n` +
    (phone    ? `Phone:    ${phone}\n`    : '') +
    (service  ? `Service:  ${service}\n` : '') +
    (day      ? `Day:      ${day}\n`     : '') +
    (address  ? `Address:  ${address}\n` : '') +
    (postcode ? `Postcode: ${postcode}\n`: '') +
    (notes    ? `\nNotes:\n${notes}`     : '')

  await Promise.all([
    notifyEmail(emailSubject, emailBody),
    notifyTelegram(
      `📋 <b>New Inquiry</b>\n\n` +
      `👤 <b>Name:</b> ${name}\n` +
      `📧 <b>Email:</b> ${email}\n` +
      (phone    ? `📞 <b>Phone:</b> ${phone}\n`                                                  : '') +
      (service  ? `✂️ <b>Service:</b> ${service}\n`                                              : '') +
      (day      ? `📅 <b>Day:</b> ${day}\n`                                                       : '') +
      (address  ? `🏠 <b>Address:</b> ${address}\n`                                               : '') +
      (postcode ? `📍 <b>Postcode:</b> ${postcode}\n`                                             : '') +
      (notes    ? `\n💬 <b>Notes:</b>\n${notes}\n`                                                : '') +
      (greetingLink ? `\n👋 <a href="${greetingLink}">Send greeting on WhatsApp</a>\n`            : '') +
      (waPhone      ? `💬 <a href="https://wa.me/${waPhone}">Open chat</a>`                       : '')
    ),
    sendCustomerConfirmation(email, name, address),
  ])

  // Also log to Vercel logs as a backup record
  console.log('[contact:new]', { name, email, phone, service, day, postcode, notes, ts: new Date().toISOString() })

  return NextResponse.json({ ok: true }, { status: 200 })
}

// Reject non-POST
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
