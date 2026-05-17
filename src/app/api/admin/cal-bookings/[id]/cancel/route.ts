import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalBooking, updateCalBooking } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { fmtBookingDate, fmt12h } from '@/lib/greeting'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.status === 'cancelled') {
    return NextResponse.json({ error: 'Already cancelled' }, { status: 422 })
  }

  booking.status = 'cancelled'
  await updateCalBooking(booking)

  const dateStr = booking.scheduledAt ? fmtBookingDate(booking.scheduledAt) : '—'
  const timeStr = booking.scheduledAt ? fmt12h(booking.scheduledAt) : ''

  await notifyTelegram(
    `❌ <b>Booking Cancelled (by admin)</b> — ${escHtml(booking.attendee.name)}\n` +
    `📅 ${dateStr}${timeStr ? `, ${timeStr}` : ''}\n` +
    `📞 ${escHtml(booking.attendee.phone || '—')}`
  )

  return NextResponse.json({ ok: true })
}
