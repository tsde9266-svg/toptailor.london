import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalBooking, updateCalBooking, type CalBookingSlot } from '@/lib/kv'
import { proposeTimesWALink, fmtSlotDate, fmtSlotTime } from '@/lib/greeting'
import { notifyTelegram, escHtml } from '@/lib/telegram'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const rawSlots  = (body.slots ?? []) as Array<{ date: string; startTime: string; endTime: string }>
  const adminNote = String(body.adminNote ?? '').trim()

  if (!rawSlots.length) {
    return NextResponse.json({ error: 'At least one slot is required' }, { status: 422 })
  }

  const slots: CalBookingSlot[] = rawSlots
    .filter(s => s.date && s.startTime && s.endTime)
    .map(s => ({
      start: `${s.date}T${s.startTime}`,
      end:   `${s.date}T${s.endTime}`,
    }))

  if (!slots.length) {
    return NextResponse.json({ error: 'No valid slots provided' }, { status: 422 })
  }

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.status === 'cancelled') {
    return NextResponse.json({ error: 'Booking is cancelled' }, { status: 422 })
  }

  booking.status        = 'awaiting_customer'
  booking.proposedTimes = slots
  booking.adminNote     = adminNote || undefined

  await updateCalBooking(booking).catch(() => {})

  const waLink = booking.attendee.phone
    ? proposeTimesWALink(booking.attendee.phone, {
        name:      booking.attendee.name,
        slots,
        adminNote: adminNote || undefined,
      })
    : null

  const slotSummary = slots.map((s, i) =>
    `${i + 1}. ${fmtSlotDate(s.start)}, ${fmtSlotTime(s.start)} – ${fmtSlotTime(s.end)}`
  ).join('\n')

  notifyTelegram(
    `📋 <b>Alternative slots proposed</b> — ${escHtml(booking.attendee.name)}\n\n` +
    `${slotSummary}\n\n` +
    `Waiting for customer to reply with their choice.`,
    waLink ? [[{ text: '💬 Send propose message', url: waLink }]] : undefined,
  ).catch(() => {})

  return NextResponse.json({ ok: true, waLink })
}
