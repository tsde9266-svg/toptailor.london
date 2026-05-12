import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/kv'
import { sendMail } from '@/lib/mail'

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

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  let order
  try {
    order = await getOrder(params.orderId)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!order?.quote)       return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.quote.approvedAt) return NextResponse.json({ ok: true })  // idempotent

  order.quote.approvedAt    = new Date().toISOString()
  order.quote.paymentMethod = 'door'
  order.status              = 'quote_approved'

  try {
    await updateOrder(order)
  } catch {
    return NextResponse.json({ error: 'Failed to save approval' }, { status: 503 })
  }

  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })

  await Promise.all([
    notifyTelegram(
      `✅ <b>Quote Approved!</b> — ${order.customer.name}\n\n` +
      `💰 <b>Total:</b> £${order.quote.total}\n` +
      `💳 <b>Payment:</b> Cash / card on collection\n` +
      `📍 <b>Return to:</b> ${order.customer.address}, ${order.customer.postcode}\n` +
      `📧 <b>Email:</b> ${order.customer.email}\n` +
      (order.customer.phone ? `📞 <b>Phone:</b> ${order.customer.phone}\n` : '') +
      `⏱ <b>Approved:</b> ${ts}`
    ),
    sendMail({
      to:      order.customer.email,
      subject: 'Quote approved — Fine Tailors',
      text:
        `Hi ${order.customer.name},\n\n` +
        `Your quote of £${order.quote.total} has been approved. Thank you!\n\n` +
        `Payment is cash or card on collection / delivery — nothing needed now.\n\n` +
        `We'll complete your alterations and be in touch to arrange return delivery.\n\n` +
        `Fine Tailors`,
    }).catch((e) => console.error('[approve] confirm email failed', e)),
  ])

  return NextResponse.json({ ok: true })
}
