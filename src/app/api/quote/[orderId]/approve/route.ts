import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/kv'

async function notifyTelegram(text: string) {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  }).catch(() => {})
}

async function sendConfirmEmail(
  to: string, name: string, total: number, payMethod: 'door' | 'bank'
) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const payText = payMethod === 'bank'
    ? "You've chosen bank transfer. We'll confirm receipt and start work shortly."
    : "You've chosen to pay on collection / delivery."

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    'One Click Tailor <onboarding@resend.dev>',
      to:      [to],
      subject: 'Quote approved — One Click Tailor',
      text:
        `Hi ${name},\n\n` +
        `Your quote of £${total} has been approved. Thank you!\n\n` +
        `${payText}\n\n` +
        `We'll complete your alterations and be in touch to arrange return delivery.\n\n` +
        `One Click Tailor`,
    }),
  }).catch(() => {})
}

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const paymentMethod = String(body.paymentMethod ?? '') as 'door' | 'bank'
  if (!['door', 'bank'].includes(paymentMethod)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 422 })
  }

  let order
  try {
    order = await getOrder(params.orderId)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!order?.quote)     return NextResponse.json({ error: 'Order not found' },  { status: 404 })
  if (order.quote.approvedAt) return NextResponse.json({ ok: true })  // already approved, idempotent

  order.quote.approvedAt    = new Date().toISOString()
  order.quote.paymentMethod = paymentMethod
  order.status              = 'quote_approved'

  try {
    await updateOrder(order)
  } catch {
    return NextResponse.json({ error: 'Failed to save approval' }, { status: 503 })
  }

  const payLabel = paymentMethod === 'bank' ? '🏦 Bank Transfer' : '🚪 Pay on Collection'
  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  await Promise.all([
    notifyTelegram(
      `✅ <b>Quote Approved!</b> — ${order.customer.name}\n\n` +
      `💰 <b>Total:</b> £${order.quote.total}\n` +
      `💳 <b>Payment:</b> ${payLabel}\n` +
      `📍 <b>Return to:</b> ${order.customer.address}, ${order.customer.postcode}\n` +
      `📧 <b>Email:</b> ${order.customer.email}\n` +
      (order.customer.phone ? `📞 <b>Phone:</b> ${order.customer.phone}\n` : '') +
      `⏱ <b>Approved:</b> ${ts}`
    ),
    sendConfirmEmail(order.customer.email, order.customer.name, order.quote.total, paymentMethod),
  ])

  return NextResponse.json({ ok: true })
}
