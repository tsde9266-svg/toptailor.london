import { NextRequest, NextResponse } from 'next/server'
import { saveConsultation, logError } from '@/lib/kv'
import type { Consultation } from '@/lib/kv'
import { customerFollowUpLink, normaliseUkPhone } from '@/lib/greeting'
import { sendMail } from '@/lib/mail'

function uuid() {
  return crypto.randomUUID()
}

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
    console.error('[telegram] failed', e)
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const name      = String(body.name      ?? '').trim()
  const phone     = String(body.phone     ?? '').trim()
  const email     = String(body.email     ?? '').trim()
  const day       = String(body.day       ?? '').trim()
  const time      = String(body.time      ?? '').trim()
  const commsPref = String(body.commsPref ?? '').trim()

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 422 })
  }

  const waPhone      = normaliseUkPhone(phone)
  const followUpLink = customerFollowUpLink('phone consultation request', name)
  const timestamp    = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  const slotStr      = [day, time].filter(Boolean).join(', ')

  // Persist for admin tracking — survives the Telegram message getting buried
  const consultation: Consultation = {
    id:        uuid(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    email:     email || undefined,
    day:       day   || undefined,
    time:      time  || undefined,
    commsPref: (commsPref === 'whatsapp' || commsPref === 'email') ? commsPref : undefined,
    status:    'pending_call',
  }
  try {
    await saveConsultation(consultation)
  } catch (e) {
    console.error('[phone-consultation] KV save failed — proceeding with notifications only', e)
    logError({ route: '/api/phone-consultation', method: 'POST', status: 500, message: 'KV save failed (notifications still sent)', detail: String(e) }).catch(() => {})
  }

  const telegramMsg =
    `📞 <b>Phone Consultation Request</b>\n\n` +
    `👤 <b>Name:</b> ${name}\n` +
    `📞 <b>Phone:</b> ${phone}\n` +
    (email     ? `📧 <b>Email:</b> ${email}\n`                                                       : '') +
    (slotStr   ? `🕐 <b>Best time to call:</b> ${slotStr}\n`                                          : '') +
    (commsPref ? `💬 <b>Preferred contact:</b> ${commsPref === 'whatsapp' ? 'WhatsApp' : 'Email'}\n` : '') +
    `⏱ <b>Received:</b> ${timestamp}\n\n` +
    `⚠️ <i>Do not message them on WhatsApp first.</i> ` +
    (email
      ? `They have a self-serve WhatsApp link in their confirmation email — only open a chat below once they've messaged you.\n`
      : `No email on file — text them the link below so they can message us first, or wait for them to reach out on the call.\n`) +
    `💬 <a href="https://wa.me/${waPhone}">Open chat</a>\n` +
    (email ? '' : `✉️ <a href="sms:+${waPhone}?body=${encodeURIComponent(`Hi ${name}, thanks for your consultation request with Fine Tailors! Message us anytime on WhatsApp: ${followUpLink}`)}">Text them the WhatsApp link</a>\n`) +
    `📞 <a href="tel:${phone}">Call now</a>`

  const adminEmail = process.env.NOTIFICATION_EMAIL

  await Promise.all([
    notifyTelegram(telegramMsg),

    // Admin email
    adminEmail
      ? sendMail({
          to: adminEmail,
          subject: `📞 Phone Consultation — ${name}`,
          text:
            `Phone Consultation Request\n${'─'.repeat(40)}\n` +
            `Name:  ${name}\nPhone: ${phone}\n` +
            (email   ? `Email: ${email}\n`              : '') +
            (slotStr ? `Best time: ${slotStr}\n`        : '') +
            (commsPref ? `Contact pref: ${commsPref}\n` : '') +
            `Received: ${timestamp}`,
        }).catch((e) => console.error('[phone-consultation] admin email failed', e))
      : Promise.resolve(),

    // Customer confirmation email (only if they gave an email)
    email
      ? sendMail({
          to: email,
          subject: 'We\'ll call you — Fine Tailors',
          text:
            `Hi ${name},\n\n` +
            `We've received your callback request. A Fine Tailors specialist will call you at ${phone}` +
            (slotStr ? ` during: ${slotStr}` : '') + `.\n\n` +
            `What to expect on the call:\n` +
            `• We'll discuss your tailoring needs\n` +
            `• Recommend the right service for you\n` +
            `• Answer any questions you have — no obligation\n\n` +
            `Need us sooner?\n` +
            `• WhatsApp: ${followUpLink}\n` +
            `• Phone: +44 7438 145169\n\n` +
            `Fine Tailors`,
        }).catch((e) => console.error('[phone-consultation] customer email failed', e))
      : Promise.resolve(),
  ])

  console.log('[phone-consultation:new]', { name, phone, email, day, time, commsPref, ts: new Date().toISOString() })
  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
