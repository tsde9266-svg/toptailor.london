import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getDelivery, updateDelivery, deleteDelivery } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'

// PATCH — mark a stop as delivered, or update notes
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const delivery = await getDelivery(params.id).catch(() => null)
  if (!delivery) return NextResponse.json({ error: 'Delivery not found' }, { status: 404 })

  // Mark a single stop delivered
  if (typeof body.stopId === 'string') {
    const stop = delivery.stops.find(s => s.id === body.stopId)
    if (!stop) return NextResponse.json({ error: 'Stop not found' }, { status: 404 })
    stop.status      = 'delivered'
    stop.deliveredAt = new Date().toISOString()
    await updateDelivery(delivery)

    notifyTelegram(
      `📦 <b>Delivered</b> — ${escHtml(stop.name)}\n` +
      `📍 ${escHtml(stop.address)}\n` +
      `🧵 ${escHtml(stop.items || '—')}`
    ).catch(() => {})

    return NextResponse.json({ ok: true })
  }

  // Mark review sent for a stop
  if (typeof body.reviewSentStopId === 'string') {
    const stop = delivery.stops.find(s => s.id === body.reviewSentStopId)
    if (stop) { stop.reviewSent = true; await updateDelivery(delivery) }
    return NextResponse.json({ ok: true })
  }

  // Update delivery notes
  if (typeof body.notes === 'string') {
    delivery.notes = body.notes.trim() || undefined
    await updateDelivery(delivery)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Nothing to update' }, { status: 422 })
}

// DELETE — remove delivery entirely
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const delivery = await getDelivery(params.id).catch(() => null)
  if (!delivery) return NextResponse.json({ error: 'Delivery not found' }, { status: 404 })
  await deleteDelivery(params.id)
  return NextResponse.json({ ok: true })
}
