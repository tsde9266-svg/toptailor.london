import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { saveDelivery, getAllDeliveries } from '@/lib/kv'
import type { DeliveryStop } from '@/lib/kv'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const deliveries = await getAllDeliveries().catch(() => [])
  return NextResponse.json({ deliveries })
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const date  = String(body.date  ?? '').trim()
  const notes = String(body.notes ?? '').trim()
  const raw   = (body.stops ?? []) as Array<Record<string, string>>

  if (!date) return NextResponse.json({ error: 'Date is required' }, { status: 422 })
  if (!raw.length) return NextResponse.json({ error: 'At least one stop is required' }, { status: 422 })

  const stops: DeliveryStop[] = raw.map(s => ({
    id:      crypto.randomUUID(),
    name:    String(s.name    ?? '').trim(),
    phone:   String(s.phone   ?? '').trim(),
    address: String(s.address ?? '').trim(),
    items:   String(s.items   ?? '').trim(),
    orderId: s.orderId ? String(s.orderId).trim() : undefined,
    status:  'pending',
  }))

  if (stops.some(s => !s.name || !s.address)) {
    return NextResponse.json({ error: 'Each stop needs a name and address' }, { status: 422 })
  }

  const delivery = {
    id:        crypto.randomUUID(),
    date,
    createdAt: new Date().toISOString(),
    notes:     notes || undefined,
    stops,
  }

  await saveDelivery(delivery)
  return NextResponse.json({ ok: true, id: delivery.id })
}
