import Link from 'next/link'
import { getAllCalBookings } from '@/lib/kv'
import type { CalBooking, CalBookingStatus } from '@/lib/kv'
import { fmtBookingDate, fmt12h } from '@/lib/greeting'

const STATUS_LABEL: Record<CalBookingStatus, string> = {
  pending:            'Awaiting Approval',
  awaiting_customer:  'Awaiting Customer',
  approved:           'Confirmed',
  cancelled:          'Cancelled',
}

const STATUS_COLOR: Record<CalBookingStatus, string> = {
  pending:            'bg-amber-100 text-amber-800',
  awaiting_customer:  'bg-blue-100 text-blue-800',
  approved:           'bg-green-100 text-green-800',
  cancelled:          'bg-gray-100 text-gray-500',
}

function fmtCreated(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
  })
}

function BookingCard({ b }: { b: CalBooking }) {
  const dateStr = b.scheduledAt ? fmtBookingDate(b.scheduledAt) : '—'
  const timeStr = b.scheduledAt
    ? fmt12h(b.scheduledAt) + (b.endTime ? ` – ${fmt12h(b.endTime)}` : '')
    : ''

  return (
    <Link
      href={`/admin/bookings/${b.id}`}
      className="block border border-divider bg-white p-5 hover:border-hunter transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="font-playfair text-[1.0625rem] text-charcoal">{b.attendee.name}</span>
        <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLOR[b.status]}`}>
          {STATUS_LABEL[b.status]}
        </span>
      </div>

      <p className="font-sans text-[0.8125rem] text-muted mb-1">
        📅 {dateStr}{timeStr ? ` · ${timeStr}` : ''}
      </p>
      {b.location && (
        <p className="font-sans text-[0.8125rem] text-muted mb-1">📍 {b.location}</p>
      )}
      <p className="font-sans text-[0.8125rem] text-muted">
        📧 {b.attendee.email}
        {b.attendee.phone ? ` · 📞 ${b.attendee.phone}` : ''}
      </p>

      <div className="flex justify-end mt-3">
        <span className="font-sans text-[0.6875rem] text-muted">{fmtCreated(b.createdAt)}</span>
      </div>
    </Link>
  )
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  let bookings: CalBooking[] = []
  let kvError = false

  try {
    bookings = await getAllCalBookings()
  } catch {
    kvError = true
  }

  const filter  = (searchParams.filter ?? 'all') as CalBookingStatus | 'all'
  const visible = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const counts: Record<string, number> = {
    all:               bookings.length,
    pending:           bookings.filter(b => b.status === 'pending').length,
    awaiting_customer: bookings.filter(b => b.status === 'awaiting_customer').length,
    approved:          bookings.filter(b => b.status === 'approved').length,
    cancelled:         bookings.filter(b => b.status === 'cancelled').length,
  }

  const tabs = [
    { key: 'all',               label: `All (${counts.all})` },
    { key: 'pending',           label: `Pending (${counts.pending})` },
    { key: 'awaiting_customer', label: `Awaiting Customer (${counts.awaiting_customer})` },
    { key: 'approved',          label: `Confirmed (${counts.approved})` },
    { key: 'cancelled',         label: `Cancelled (${counts.cancelled})` },
  ]

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Admin
        </Link>
        <span className="font-playfair text-[1.0625rem]">Cal.com Bookings</span>
        <span className="w-20" />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
        {kvError && (
          <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6">
            <p className="font-sans text-[0.875rem] text-amber-800 font-medium">Could not load bookings.</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <Link
              key={tab.key}
              href={`/admin/bookings${tab.key === 'all' ? '' : `?filter=${tab.key}`}`}
              className={`
                font-sans text-[0.75rem] uppercase tracking-widest px-3 py-1.5 border transition-colors
                ${filter === tab.key || (tab.key === 'all' && filter === 'all')
                  ? 'bg-hunter text-parchment border-hunter'
                  : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                }
              `}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="font-sans text-[0.875rem] text-muted text-center py-16">
            {kvError ? 'Connect KV store to see bookings.' : 'No bookings in this category.'}
          </p>
        ) : (
          <div className="space-y-3">
            {visible.map(b => <BookingCard key={b.id} b={b} />)}
          </div>
        )}
      </div>
    </div>
  )
}
