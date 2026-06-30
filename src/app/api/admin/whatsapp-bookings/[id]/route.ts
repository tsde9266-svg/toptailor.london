import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import {
  getWhatsAppBooking,
  updateWhatsAppBooking,
  deleteWhatsAppBooking,
  deleteCalEntry,
  type WhatsAppBookingStatus,
} from '@/lib/kv'

const VALID_STATUSES: WhatsAppBookingStatus[] = ['upcoming', 'done', 'cancelled']

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const booking = await getWhatsAppBooking(params.id)
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (body.status && VALID_STATUSES.includes(body.status as WhatsAppBookingStatus)) {
    booking.status = body.status as WhatsAppBookingStatus
  }
  if (body.notes !== undefined) booking.notes = body.notes ? String(body.notes).trim() : undefined

  await updateWhatsAppBooking(booking)
  return NextResponse.json({ ok: true, booking })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const booking = await getWhatsAppBooking(params.id)
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await deleteWhatsAppBooking(params.id)
  if (booking.calEntryId) await deleteCalEntry(booking.calEntryId).catch(() => {})

  return NextResponse.json({ ok: true })
}
