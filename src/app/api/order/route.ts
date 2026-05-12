import { NextRequest, NextResponse } from 'next/server'
import { saveOrder } from '@/lib/kv'
import type { Order } from '@/lib/kv'

// Notifications removed — the cal.com webhook handles admin Telegram
// notification (with approve/propose buttons) when the customer books
// their slot. No duplicate emails or Telegram messages needed here.

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
  const total             = Number(body.total ?? 0)
  const commsPref         = String(body.commsPref         ?? '').trim() as 'whatsapp' | 'email' | ''
  const paymentPreference = String(body.paymentPreference ?? '').trim() as 'day' | 'bank' | ''

  if (!customer.name || !customer.email || !customer.address || items.length === 0) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const orderId   = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  const order: Order = {
    id:      orderId,
    status:  'pending_collection',
    createdAt,
    customer: {
      name:              customer.name,
      email:             customer.email,
      phone:             customer.phone || undefined,
      address:           customer.address,
      postcode:          customer.postcode,
      commsPref:         (commsPref === 'whatsapp' || commsPref === 'email') ? commsPref : undefined,
      paymentPreference: (paymentPreference === 'day' || paymentPreference === 'bank') ? paymentPreference : undefined,
    },
    estimate:      items,
    estimateTotal: total,
  }

  try {
    await saveOrder(order)
  } catch (e) {
    console.error('[order] KV save failed', e)
  }

  console.log('[order:new]', {
    id: orderId, name: customer.name,
    address: customer.address, postcode: customer.postcode,
    total, items: items.map(i => i.name),
    ts: createdAt,
  })

  return NextResponse.json({ ok: true, orderId })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
