import { NextRequest, NextResponse } from 'next/server'
import { saveOrder } from '@/lib/kv'
import type { Order } from '@/lib/kv'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.oneclicktailors.co.uk'

function uuid() {
  return crypto.randomUUID()
}

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

// ─── Email via Resend ─────────────────────────────────────────────────────────
async function notifyEmail(subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY
  const to     = process.env.NOTIFICATION_EMAIL
  if (!apiKey || !to) return
  try {
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    'One Click Tailor <onboarding@resend.dev>',
        to:      [to],
        subject,
        text:    body,
      }),
    })
  } catch (e) {
    console.error('[email] failed', e)
  }
}

// ─── Confirmation email to customer ───────────────────────────────────────────
async function sendCustomerConfirmation(
  to: string, name: string,
  items: Array<{ name: string; price: number }>,
  estimateTotal: number,
) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const hasQuotes  = items.some(i => i.price === 0)
  const itemLines  = items.map(i =>
    `  • ${i.name}${i.price === 0 ? ' — Quote' : ` — £${i.price}`}`
  ).join('\n')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    'One Click Tailor <onboarding@resend.dev>',
      to:      [to],
      subject: 'Collection request received — One Click Tailor',
      text:
        `Hi ${name},\n\n` +
        `We've received your collection request. Here's your estimate:\n\n` +
        `${itemLines}\n\n` +
        (estimateTotal > 0 ? `Estimate total: £${estimateTotal}${hasQuotes ? ' + quote items' : ''}\n\n` : '') +
        `What happens next:\n` +
        `1. We collect your garments at your booked slot\n` +
        `2. Our tailor inspects everything at home\n` +
        `3. You receive a confirmed quote by email — approve it in one click\n` +
        `4. We complete the work and return your garments within 5–7 working days\n\n` +
        `You only pay after approving the final quote. No surprises.\n\n` +
        `Questions? Reply to this email or WhatsApp us.\n\n` +
        `One Click Tailor`,
    }),
  }).catch(() => {})
}

// ─── POST /api/order ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const customer = (body.customer ?? {}) as Record<string, string>
  const items    = (body.items    ?? []) as Array<{ id: string; name: string; categoryName: string; price: number }>
  const total    = Number(body.total ?? 0)

  if (!customer.name || !customer.email || !customer.address || items.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const orderId   = uuid()
  const createdAt = new Date().toISOString()
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  // Store in KV
  const order: Order = {
    id:      orderId,
    status:  'pending_collection',
    createdAt,
    customer: {
      name:     customer.name,
      email:    customer.email,
      phone:    customer.phone || undefined,
      address:  customer.address,
      postcode: customer.postcode,
    },
    estimate:      items,
    estimateTotal: total,
  }

  try {
    await saveOrder(order)
  } catch (e) {
    console.error('[order] KV save failed — proceeding without storage', e)
  }

  // Notification bodies
  const hasQuotes = items.some(i => i.price === 0)
  const itemLines = items.map(i =>
    `  • ${i.name}${i.price === 0 ? ' — Quote' : ` — £${i.price}`}`
  ).join('\n')

  const adminLink = `${BASE_URL}/admin/order/${orderId}`

  const telegramMsg =
    `🛒 <b>New Collection Request</b>\n\n` +
    `👤 <b>Name:</b> ${customer.name}\n` +
    `📧 <b>Email:</b> ${customer.email}\n` +
    (customer.phone ? `📞 <b>Phone:</b> ${customer.phone}\n` : '') +
    `📍 <b>Address:</b> ${customer.address}, ${customer.postcode}\n\n` +
    `🧵 <b>Estimate:</b>\n${itemLines}\n\n` +
    `💰 <b>Estimate total:</b> £${total}${hasQuotes ? ' + quote items' : ''}\n` +
    `⏱ <b>Received:</b> ${timestamp}\n\n` +
    `🔗 <b>Admin:</b> <a href="${adminLink}">${adminLink}</a>`

  const emailSubject = `New Collection Request — ${customer.name}`
  const emailBody    =
    `New Collection Request\n${'─'.repeat(40)}\n` +
    `Name:     ${customer.name}\n` +
    `Email:    ${customer.email}\n` +
    (customer.phone ? `Phone:    ${customer.phone}\n` : '') +
    `Address:  ${customer.address}\n` +
    `Postcode: ${customer.postcode}\n\n` +
    `Estimate:\n${itemLines}\n\n` +
    `Estimate total: £${total}${hasQuotes ? ' + quote items' : ''}\n` +
    `Received: ${timestamp}\n\n` +
    `Admin: ${adminLink}`

  await Promise.all([
    notifyTelegram(telegramMsg),
    notifyEmail(emailSubject, emailBody),
    sendCustomerConfirmation(customer.email, customer.name, items, total),
  ])

  console.log('[order:new]', {
    id: orderId, name: customer.name, email: customer.email,
    address: customer.address, postcode: customer.postcode,
    total, items: items.map(i => i.name),
    ts: createdAt,
  })

  return NextResponse.json({ ok: true, orderId })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
