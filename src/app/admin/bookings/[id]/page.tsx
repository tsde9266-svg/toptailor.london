import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCalBooking } from '@/lib/kv'
import type { CalBookingStatus } from '@/lib/kv'
import { fmtBookingDate, fmt12h, fmtSlotDate, fmtSlotTime } from '@/lib/greeting'
import BookingActions from './BookingActions'

const STATUS_LABEL: Record<CalBookingStatus, string> = {
  pending:            'Awaiting Approval',
  awaiting_customer:  'Awaiting Customer Reply',
  approved:           'Confirmed',
  cancelled:          'Cancelled',
}

const STATUS_COLOR: Record<CalBookingStatus, string> = {
  pending:            'bg-amber-100 text-amber-800',
  awaiting_customer:  'bg-blue-100 text-blue-800',
  approved:           'bg-green-100 text-green-800',
  cancelled:          'bg-gray-100 text-gray-500',
}

export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  const booking = await getCalBooking(params.id).catch(() => null)
  if (!booking) notFound()

  const dateStr = booking.scheduledAt ? fmtBookingDate(booking.scheduledAt) : '—'
  const timeStr = booking.scheduledAt && booking.endTime
    ? `${fmt12h(booking.scheduledAt)} – ${fmt12h(booking.endTime)}`
    : ''

  const confirmedDate = booking.confirmedTime
    ? `${fmtSlotDate(booking.confirmedTime.start)}, ${fmtSlotTime(booking.confirmedTime.start)} – ${fmtSlotTime(booking.confirmedTime.end)}`
    : null

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/bookings" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Bookings
        </Link>
        <span className="font-playfair text-[1.0625rem]">Booking</span>
        <span className="w-20" />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-2xl mx-auto">
        {/* Status badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-sans text-[0.75rem] font-medium uppercase tracking-wider px-3 py-1 rounded ${STATUS_COLOR[booking.status]}`}>
            {STATUS_LABEL[booking.status]}
          </span>
          <span className="font-sans text-[0.75rem] text-muted">
            Ref: {booking.calUid.slice(0, 8)}
          </span>
        </div>

        {/* Customer details */}
        <div className="bg-white border border-divider p-6 mb-4">
          <h2 className="font-playfair text-[1.25rem] text-charcoal mb-4">{booking.attendee.name}</h2>
          <div className="space-y-2">
            <p className="font-sans text-[0.875rem] text-muted">📧 {booking.attendee.email}</p>
            {booking.attendee.phone && (
              <p className="font-sans text-[0.875rem] text-muted">📞 {booking.attendee.phone}</p>
            )}
          </div>
        </div>

        {/* Booking details */}
        <div className="bg-white border border-divider p-6 mb-4">
          <h3 className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Requested Appointment</h3>
          <div className="space-y-2">
            <p className="font-sans text-[0.875rem] text-charcoal">📅 {dateStr}</p>
            {timeStr && <p className="font-sans text-[0.875rem] text-charcoal">🕐 {timeStr}</p>}
            {booking.location && <p className="font-sans text-[0.875rem] text-charcoal">📍 {booking.location}</p>}
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="bg-white border border-divider p-6 mb-4">
            <h3 className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">Customer Notes</h3>
            <p className="font-sans text-[0.875rem] text-charcoal">{booking.notes}</p>
          </div>
        )}

        {/* Confirmed time (if rescheduled by admin) */}
        {confirmedDate && (
          <div className="bg-green-50 border border-green-200 p-6 mb-4">
            <h3 className="font-sans text-[0.6875rem] uppercase tracking-widest text-green-700 mb-2">Confirmed Time</h3>
            <p className="font-sans text-[0.875rem] text-green-800 font-medium">{confirmedDate}</p>
          </div>
        )}

        {/* Actions (client component) */}
        <BookingActions booking={booking} />
      </div>
    </div>
  )
}
