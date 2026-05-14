'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Delivery } from '@/lib/kv'

function fmtDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function fmtTime(t: string) {
  const [h, m] = t.split(':')
  const hour = parseInt(h!, 10)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const h12  = hour % 12 || 12
  return `${h12}:${m}${ampm}`
}

type Status = 'all' | 'pending' | 'complete'

export default function DeliveriesClient({ deliveries }: { deliveries: Delivery[] }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<Status>('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return deliveries.filter(d => {
      const allNames    = d.stops.map(s => s.name.toLowerCase()).join(' ')
      const allAddr     = d.stops.map(s => s.address.toLowerCase()).join(' ')
      const dateStr     = fmtDate(d.date).toLowerCase()
      const matchSearch = !q || allNames.includes(q) || allAddr.includes(q) || dateStr.includes(q)

      const total     = d.stops.length
      const delivered = d.stops.filter(s => s.status === 'delivered').length
      const isDone    = delivered === total
      const matchStatus =
        status === 'all' ? true :
        status === 'complete' ? isDone :
        !isDone

      return matchSearch && matchStatus
    })
  }, [deliveries, search, status])

  return (
    <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, address, or date…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-divider px-3 py-2 font-sans text-[0.875rem] text-charcoal bg-white focus:outline-none focus:border-hunter"
        />
        <div className="flex gap-0 border border-divider">
          {(['all', 'pending', 'complete'] as Status[]).map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 font-sans text-[0.6875rem] uppercase tracking-widest transition-colors ${
                status === s ? 'bg-hunter text-parchment' : 'bg-white text-muted hover:text-charcoal'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-divider p-12 text-center">
          <p className="font-sans text-muted">
            {deliveries.length === 0 ? 'No deliveries yet.' : 'No deliveries match your filter.'}
          </p>
          {deliveries.length === 0 && (
            <Link
              href="/admin/deliveries/new"
              className="mt-4 inline-block font-sans text-[0.75rem] uppercase tracking-widest text-hunter underline underline-offset-2"
            >
              Plan your first delivery run
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(d => {
            const total     = d.stops.length
            const delivered = d.stops.filter(s => s.status === 'delivered').length
            const done      = delivered === total
            const names     = d.stops.map(s => s.name).join(', ')
            const firstAddr = d.stops[0]?.address ?? ''

            return (
              <Link
                key={d.id}
                href={`/admin/deliveries/${d.id}`}
                className="block bg-white border border-divider p-5 hover:border-hunter transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-playfair text-[1.125rem] text-charcoal leading-none">
                      {fmtDate(d.date)}
                    </p>
                    {d.time && (
                      <span className="font-sans text-[0.75rem] text-muted">
                        · {fmtTime(d.time)}
                      </span>
                    )}
                  </div>
                  <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-1 flex-shrink-0 ${
                    done ? 'bg-green-100 text-green-800' : delivered > 0 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {done ? 'Complete' : `${delivered}/${total}`}
                  </span>
                </div>

                <p className="font-sans text-[0.875rem] text-charcoal font-medium leading-snug mb-1 truncate">
                  {names}
                </p>
                <p className="font-sans text-[0.8125rem] text-muted truncate">
                  {firstAddr}{total > 1 ? ` + ${total - 1} more stop${total - 1 !== 1 ? 's' : ''}` : ''}
                </p>
                {d.notes && (
                  <p className="font-sans text-[0.75rem] text-muted/70 mt-1 truncate">
                    {d.notes}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
