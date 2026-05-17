import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalBooking, updateCalBooking, deleteCalBooking } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'

// PATCH /api/admin/cal-bookings/[id]
// Edits attendee details, location, and notes.
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  if (typeof body.name === 'string') {
    const v = body.name.trim()
    if (!v) return NextResponse.json({ error: 'Name cannot be empty' }, { status: 422 })
    booking.attendee.name = v
  }
  if (typeof body.email === 'string') {
    const v = body.email.trim()
    if (!v) return NextResponse.json({ error: 'Email cannot be empty' }, { status: 422 })
    booking.attendee.email = v
  }
  if (typeof body.phone    === 'string') booking.attendee.phone = body.phone.trim()
  if (typeof body.location === 'string') booking.location       = body.location.trim()
  if (typeof body.notes    === 'string') booking.notes          = body.notes.trim()

  await updateCalBooking(booking)
  return NextResponse.json({ ok: true, booking })
}

// DELETE /api/admin/cal-bookings/[id]
// Permanently removes the booking from the database.
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  await deleteCalBooking(booking.id, booking.calUid)

  await notifyTelegram(
    `🗑️ <b>Booking Deleted</b> — ${escHtml(booking.attendee.name)}\n` +
    `Was: ${booking.status} · Ref ${booking.calUid.slice(0, 8)}`
  )

  return NextResponse.json({ ok: true })
}
