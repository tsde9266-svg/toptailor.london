import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/kv'
import type { QuoteItem } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { quoteWALink } from '@/lib/greeting'

// ─── POST /api/admin/quote ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const orderId = String(body.orderId ?? '')
  const items   = (body.items ?? []) as QuoteItem[]
  const notes   = String(body.notes ?? '').trim()

  if (!orderId || !items.length) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 422 })
  }
  if (items.some(i => !Number.isFinite(i.price) || i.price < 0)) {
    return NextResponse.json({ error: 'Invalid item price' }, { status: 422 })
  }

  let order
  try {
    order = await getOrder(orderId)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const total = items.reduce((s, i) => s + i.price, 0)
  const now   = new Date().toISOString()

  order.quote  = { sentAt: now, items, total, notes: notes || undefined }
  order.status = 'quote_sent'

  try {
    await updateOrder(order)
  } catch {
    return NextResponse.json({ error: 'Failed to save quote' }, { status: 503 })
  }

  const waLink = order.customer.phone
    ? quoteWALink(order.customer.phone, {
        name:  order.customer.name,
        items,
        total,
        notes: notes || undefined,
      })
    : null

  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  await notifyTelegram(
    `📤 <b>Quote Ready</b> — ${escHtml(order.customer.name)}\n\n` +
    `💰 <b>Total:</b> £${total}\n` +
    `📧 <b>Customer:</b> ${escHtml(order.customer.email)}\n` +
    `⏱ ${ts}\n\n` +
    `Send the quote breakdown via WhatsApp below.`,
    waLink ? [[{ text: '💬 Send Quote on WhatsApp', url: waLink }]] : undefined,
  )

  return NextResponse.json({ ok: true, waLink })
}
