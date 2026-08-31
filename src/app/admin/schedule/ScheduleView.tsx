'use client'
import { useState, useEffect, useCallback } from 'react'

type Booking = {
  id:        string
  createdAt: string
  status:    'upcoming' | 'done' | 'cancelled'
  customer: {
    name:     string
    phone:    string
    address:  string
    postcode: string
  }
  services:  string[]
  date:      string
  startTime: string
  endTime:   string
  notes?:    string
}

type View = 'today' | 'tomorrow' | 'week'

function isoDate(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toLocaleDateString('en-CA')
}

function fmt12(time: string) {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour   = h % 12 || 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, '0')}${suffix}`
}

function fmtDate(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function mapsUrl(address: string, postcode: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([address, postcode].filter(Boolean).join(', '))}`
}

function waUrl(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const e164   = digits.startsWith('44') ? digits : '44' + digits.replace(/^0/, '')
  return `https://wa.me/${e164}`
}

function invoiceUrl(b: Booking) {
  const params = new URLSearchParams({
    name:    b.customer.name,
    phone:   b.customer.phone,
    address: [b.customer.address, b.customer.postcode].filter(Boolean).join(', '),
  })
  return `/admin/invoice/new?${params.toString()}`
}

export default function ScheduleView() {
  const [view,     setView]     = useState<View>('today')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [showCancelled, setShowCancelled] = useState(false)

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true)
    try {
      const res  = await fetch('/api/admin/whatsapp-bookings')
      if (!res.ok) return // keep existing data on auth/server error
      const data = await res.json() as { bookings: Booking[] }
      setBookings(data.bookings ?? [])
    } catch { /**/ }
    finally { if (!quiet) setLoading(false) }
  }, [])

  useEffect(() => {
    load()
    // Silently refresh whenever the tab becomes visible again
    function onVisible() { if (document.visibilityState === 'visible') load(true) }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [load])

  const today    = isoDate(0)
  const tomorrow = isoDate(1)
  const weekEnd  = isoDate(6)

  const filtered = bookings.filter(b => {
    if (!showCancelled && b.status === 'cancelled') return false
    if (view === 'today')    return b.date === today
    if (view === 'tomorrow') return b.date === tomorrow
    return b.date >= today && b.date <= weekEnd
  })

  // group by date for week view
  const byDate = filtered.reduce<Record<string, Booking[]>>((acc, b) => {
    acc[b.date] = acc[b.date] ?? []
    acc[b.date].push(b)
    return acc
  }, {})

  const sortedDates = Object.keys(byDate).sort()

  async function toggleStatus(b: Booking) {
    const next = b.status === 'done' ? 'upcoming' : 'done'
    setUpdating(b.id)
    try {
      const res = await fetch(`/api/admin/whatsapp-bookings/${b.id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) throw new Error()
      setBookings(prev => prev.map(x => x.id === b.id ? { ...x, status: next } : x))
    } catch {
      alert('Could not update booking — please refresh and try again.')
    }
    finally { setUpdating(null) }
  }

  async function cancelBooking(b: Booking) {
    if (!confirm(`Cancel booking for ${b.customer.name}?`)) return
    setUpdating(b.id)
    try {
      const res = await fetch(`/api/admin/whatsapp-bookings/${b.id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      })
      if (!res.ok) throw new Error()
      setBookings(prev => prev.map(x => x.id === b.id ? { ...x, status: 'cancelled' } : x))
    } catch {
      alert('Could not cancel booking — please refresh and try again.')
    }
    finally { setUpdating(null) }
  }

  const tabs: Array<{ key: View; label: string }> = [
    { key: 'today',    label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'week',     label: 'This Week' },
  ]

  return (
    <div>
      {/* View toggle */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setView(t.key)}
            className={`
              font-sans text-[0.75rem] uppercase tracking-widest px-4 py-2 border transition-colors
              ${view === t.key
                ? 'bg-hunter text-parchment border-hunter'
                : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
              }
            `}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={() => setShowCancelled(p => !p)}
          className={`ml-auto font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-2 border transition-colors ${
            showCancelled ? 'border-charcoal/40 text-charcoal' : 'border-divider text-muted'
          }`}
        >
          {showCancelled ? 'Hide' : 'Show'} cancelled
        </button>
      </div>

      {loading && (
        <p className="font-sans text-[0.875rem] text-muted text-center py-16">Loading…</p>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-sans text-[0.875rem] text-muted mb-4">No bookings for this period.</p>
          <a
            href="/admin/quick-book"
            className="inline-block font-sans text-[0.75rem] uppercase tracking-widest bg-hunter text-parchment px-5 py-2.5 hover:bg-[#1E3D17] transition-colors"
          >
            + Log a booking
          </a>
        </div>
      )}

      {/* Single day view (today / tomorrow) */}
      {!loading && view !== 'week' && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map(b => <BookingCard key={b.id} booking={b} onToggle={toggleStatus} onCancel={cancelBooking} busy={updating === b.id} />)}
        </div>
      )}

      {/* Week view — grouped by date */}
      {!loading && view === 'week' && sortedDates.length > 0 && (
        <div className="space-y-8">
          {sortedDates.map(d => (
            <div key={d}>
              <h2 className="font-playfair text-[1.0625rem] text-charcoal mb-3 pb-1 border-b border-divider">
                {fmtDate(d)}
                {d === today && <span className="ml-2 font-sans text-[0.6875rem] uppercase tracking-widest text-hunter">(today)</span>}
              </h2>
              <div className="space-y-3">
                {byDate[d].map(b => <BookingCard key={b.id} booking={b} onToggle={toggleStatus} onCancel={cancelBooking} busy={updating === b.id} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BookingCard({
  booking: b,
  onToggle,
  onCancel,
  busy,
}: {
  booking:  Booking
  onToggle: (b: Booking) => void
  onCancel: (b: Booking) => void
  busy:     boolean
}) {
  const isDone      = b.status === 'done'
  const isCancelled = b.status === 'cancelled'

  return (
    <div className={`
      border bg-white p-5 transition-opacity
      ${isCancelled ? 'opacity-50 border-divider' : isDone ? 'border-divider' : 'border-hunter/30'}
    `}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className={`font-playfair text-[1.0625rem] ${isDone ? 'line-through text-muted' : 'text-charcoal'}`}>
            {b.customer.name}
          </p>
          <p className="font-sans text-[0.8125rem] text-hunter font-medium mt-0.5">
            {fmt12(b.startTime)}–{fmt12(b.endTime)}
          </p>
        </div>
        {!isCancelled && (
          <button
            onClick={() => onToggle(b)}
            disabled={busy}
            className={`
              flex-shrink-0 font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border transition-colors
              ${isDone
                ? 'bg-hunter text-parchment border-hunter'
                : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
              }
              disabled:opacity-50
            `}
          >
            {isDone ? '✓ Done' : 'Mark done'}
          </button>
        )}
        {isCancelled && (
          <span className="flex-shrink-0 font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border border-divider text-muted">
            Cancelled
          </span>
        )}
      </div>

      {/* Services */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {b.services.map(s => (
          <span key={s} className="font-sans text-[0.6875rem] uppercase tracking-wider px-2 py-0.5 bg-parchment border border-divider text-charcoal">
            {s}
          </span>
        ))}
      </div>

      {/* Address */}
      <p className="font-sans text-[0.8125rem] text-charcoal mb-2">
        {b.customer.address}{b.customer.postcode ? `, ${b.customer.postcode}` : ''}
      </p>

      {/* Notes */}
      {b.notes && (
        <p className="font-sans text-[0.8125rem] text-muted italic mb-3">{b.notes}</p>
      )}

      {/* Action links */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-divider">
        <a
          href={waUrl(b.customer.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[0.75rem] uppercase tracking-widest text-hunter border border-hunter/40 px-3 py-1.5 hover:bg-hunter/5 transition-colors"
        >
          💬 WhatsApp
        </a>
        <a
          href={mapsUrl(b.customer.address, b.customer.postcode)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-[0.75rem] uppercase tracking-widest text-charcoal border border-divider px-3 py-1.5 hover:border-charcoal transition-colors"
        >
          🗺 Maps
        </a>
        <a
          href={invoiceUrl(b)}
          className="inline-flex items-center gap-1.5 font-sans text-[0.75rem] uppercase tracking-widest text-hunter border border-hunter/40 px-3 py-1.5 hover:bg-hunter/5 transition-colors"
        >
          🧾 Invoice
        </a>
        {!isCancelled && (
          <button
            onClick={() => onCancel(b)}
            disabled={busy}
            className="ml-auto font-sans text-[0.6875rem] uppercase tracking-widest text-muted hover:text-red-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
