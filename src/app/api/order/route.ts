import { NextRequest, NextResponse } from 'next/server'
import { saveOrder } from '@/lib/kv'
import type { Order } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'

const MAX = { name: 200, email: 254, phone: 30, address: 300, postcode: 15 }

// ─── POST /api/order ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const customer          = (body.customer  ?? {}) as Record<string, string>
  const items             = (body.items     ?? []) as Array<{ id: string; name: string; categoryName: string; price: number }>
  const rawTotal          = Number(body.total)
  const commsPref         = String(body.commsPref         ?? '').trim() as 'whatsapp' | 'email' | ''
  const paymentPreference = String(body.paymentPreference ?? '').trim() as 'day' | 'bank' | ''

  // Required field validation
  if (!customer.name?.trim() || !customer.email?.trim() || !customer.address?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }
  if (items.length === 0) {
    return NextResponse.json({ error: 'No items in order' }, { status: 422 })
  }
  if (!Number.isFinite(rawTotal) || rawTotal <= 0) {
    return NextResponse.json({ error: 'Invalid order total' }, { status: 422 })
  }
  if (items.some(i => !Number.isFinite(i.price) || i.price < 0)) {
    return NextResponse.json({ error: 'Invalid item price' }, { status: 422 })
  }

  // Length limits — prevent bloated records
  if (customer.name.length    > MAX.name)     return NextResponse.json({ error: 'Name too long' },     { status: 422 })
  if (customer.email.length   > MAX.email)    return NextResponse.json({ error: 'Email too long' },    { status: 422 })
  if ((customer.phone ?? '').length > MAX.phone) return NextResponse.json({ error: 'Phone too long' }, { status: 422 })
  if (customer.address.length > MAX.address)  return NextResponse.json({ error: 'Address too long' },  { status: 422 })

  const orderId   = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  const order: Order = {
    id:      orderId,
    status:  'pending_collection',
    createdAt,
    customer: {
      name:              customer.name.trim(),
      email:             customer.email.trim(),
      phone:             customer.phone?.trim() || undefined,
      address:           customer.address.trim(),
      postcode:          customer.postcode?.trim() || '',
      commsPref:         (commsPref === 'whatsapp' || commsPref === 'email') ? commsPref : undefined,
      paymentPreference: (paymentPreference === 'day' || paymentPreference === 'bank') ? paymentPreference : undefined,
    },
    estimate:      items,
    estimateTotal: rawTotal,
  }

  try {
    await saveOrder(order)
  } catch (e) {
    console.error('[order] KV save failed', e)
    return NextResponse.json({ error: 'Failed to save order — please try again' }, { status: 503 })
  }

  // Notify admin — customer has submitted their order (slot may already be booked via cal-webhook)
  notifyTelegram(
    `📋 <b>Order Submitted</b> — ${escHtml(order.customer.name)}\n` +
    `📍 ${escHtml(order.customer.address ?? '')}${order.customer.postcode ? `, ${escHtml(order.customer.postcode)}` : ''}\n` +
    `💰 £${rawTotal} · ${items.length} item${items.length !== 1 ? 's' : ''}\n` +
    `💳 Payment: ${order.customer.paymentPreference === 'bank' ? 'Bank transfer' : 'Pay on day'}\n` +
    `💬 Comms: ${order.customer.commsPref ?? 'not specified'}`,
  ).catch(() => {})

  return NextResponse.json({ ok: true, orderId })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
