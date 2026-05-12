import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalBooking, updateCalBooking } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { fmtSlotDate, fmtSlotTime, slotConfirmationWALink } from '@/lib/greeting'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const slotIndex = Number(body.slotIndex ?? -1)

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  const slots = booking.proposedTimes ?? []
  if (slotIndex < 0 || slotIndex >= slots.length) {
    return NextResponse.json({ error: 'Invalid slot index' }, { status: 422 })
  }

  const chosen = slots[slotIndex]!

  booking.status        = 'approved'
  booking.approvedAt    = new Date().toISOString()
  booking.confirmedTime = chosen

  const waLink = booking.attendee.phone
    ? slotConfirmationWALink(booking.attendee.phone, {
        start:    chosen.start,
        end:      chosen.end,
        location: booking.location,
      })
    : null

  await Promise.allSettled([
    updateCalBooking(booking),
    notifyTelegram(
      `✅ <b>Slot Confirmed (via WhatsApp)</b> — ${escHtml(booking.attendee.name)}\n` +
      `📅 ${fmtSlotDate(chosen.start)}, ${fmtSlotTime(chosen.start)} – ${fmtSlotTime(chosen.end)}\n\n` +
      `⚠️ <b>ACTION NEEDED:</b> Update this booking in Cal.com to the new time slot above.`,
    ),
  ])

  return NextResponse.json({ ok: true, waLink })
}
