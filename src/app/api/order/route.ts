import { NextRequest, NextResponse } from 'next/server'

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
    console.error('[telegram] failed', e)
  }
}

// ─── Email via Resend (free — 3,000 emails/month, no package needed) ──────────
// Setup (2 min):
//   1. Go to resend.com → sign up free
//   2. Go to API Keys → Create API Key
//   3. In Vercel → Environment Variables add:
//        RESEND_API_KEY      = re_xxxxxxxxxxxx
//        NOTIFICATION_EMAIL  = your@email.com  (where you want to receive alerts)
// ─────────────────────────────────────────────────────────────────────────────
async function notifyEmail(subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY
  const to     = process.env.NOTIFICATION_EMAIL
  if (!apiKey || !to) return
  try {
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Top Tailor <onboarding@resend.dev>',
        to:      [to],
        subject,
        text:    body,
      }),
    })
  } catch (e) {
    console.error('[email] failed', e)
  }
}

// ─── POST /api/order ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const customer      = (body.customer ?? {}) as Record<string, string>
  const items         = (body.items    ?? []) as Array<{ name: string; categoryName: string; price: number }>
  const total         = Number(body.total ?? 0)
  const paymentMethod = String(body.paymentMethod ?? 'door')

  if (!customer.name || !customer.email || !customer.address || items.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const payLabel  = paymentMethod === 'bank' ? '🏦 Bank Transfer (paid)' : '🚪 Pay on Door'
  const itemLines = items.map(i => `  • ${i.name} — £${i.price}`).join('\n')
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  // ── Telegram message (rich HTML) ────────────────────────────────────────────
  const telegramMsg =
    `🛒 <b>New Order — Top Tailor</b>\n\n` +
    `👤 <b>Name:</b> ${customer.name}\n` +
    `📧 <b>Email:</b> ${customer.email}\n` +
    (customer.phone ? `📞 <b>Phone:</b> ${customer.phone}\n` : '') +
    `📍 <b>Address:</b> ${customer.address}, ${customer.postcode}\n\n` +
    `🧵 <b>Items:</b>\n${itemLines}\n\n` +
    `💰 <b>Total:</b> £${total}\n` +
    `💳 <b>Payment:</b> ${payLabel}\n` +
    `⏱ <b>Received:</b> ${timestamp}`

  // ── Email message (plain text) ───────────────────────────────────────────────
  const emailSubject = `🛒 New Order — ${customer.name} — £${total}`
  const emailBody    =
    `New Order — Top Tailor\n` +
    `${'─'.repeat(40)}\n` +
    `Name:     ${customer.name}\n` +
    `Email:    ${customer.email}\n` +
    (customer.phone ? `Phone:    ${customer.phone}\n` : '') +
    `Address:  ${customer.address}\n` +
    `Postcode: ${customer.postcode}\n\n` +
    `Items:\n${items.map(i => `  - ${i.name}  £${i.price}`).join('\n')}\n\n` +
    `Total:    £${total}\n` +
    `Payment:  ${paymentMethod === 'bank' ? 'Bank Transfer (paid)' : 'Pay on Door'}\n` +
    `Received: ${timestamp}`

  // Fire both in parallel — if one fails the other still reaches you
  await Promise.all([
    notifyTelegram(telegramMsg),
    notifyEmail(emailSubject, emailBody),
  ])

  console.log('[order:new]', {
    name: customer.name, email: customer.email,
    address: customer.address, postcode: customer.postcode,
    total, paymentMethod,
    items: items.map(i => i.name),
    ts: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
