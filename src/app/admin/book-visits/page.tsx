import Link from 'next/link'
import { getAllBookVisits } from '@/lib/kv'
import type { BookVisit } from '@/lib/kv'

function fmt(ts: string) {
  return new Date(ts).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
  })
}

const STATUS_COLOR: Record<BookVisit['status'], string> = {
  new:       'bg-amber-100 text-amber-800',
  scheduled: 'bg-blue-100 text-blue-800',
  closed:    'bg-gray-100 text-gray-600',
}

export default async function BookVisitsPage() {
  let visits: BookVisit[] = []
  let kvError = false

  try {
    visits = await getAllBookVisits()
  } catch {
    kvError = true
  }

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Admin
        </Link>
        <span className="font-playfair text-[1.125rem]">Book Visit Requests</span>
        <span className="w-16" />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-playfair text-[1.75rem]">Book Visits</h1>
            <p className="font-sans text-[0.8125rem] text-muted mt-1">{visits.length} total</p>
          </div>
        </div>

        {kvError && (
          <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6">
            <p className="font-sans text-[0.875rem] text-amber-800 font-medium">KV store unavailable.</p>
          </div>
        )}

        {visits.length === 0 && !kvError ? (
          <div className="border border-divider bg-white px-6 py-12 text-center">
            <p className="font-sans text-muted">No visit requests yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visits.map(v => (
              <div key={v.id} className="border border-divider bg-white p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="font-playfair text-[1.0625rem] text-charcoal">{v.name}</span>
                  <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLOR[v.status]}`}>
                    {v.status}
                  </span>
                </div>
                <p className="font-sans text-[0.8125rem] text-muted mb-1">📧 {v.email}</p>
                <p className="font-sans text-[0.875rem] text-charcoal mb-1">📍 {v.address}</p>
                {(v.preferredDate || v.preferredTime) && (
                  <p className="font-sans text-[0.8125rem] text-muted mb-1">
                    🗓 {[v.preferredDate, v.preferredTime].filter(Boolean).join(' · ')}
                  </p>
                )}
                {v.notes && (
                  <p className="font-sans text-[0.8125rem] text-muted mt-1 leading-relaxed">
                    💬 {v.notes}
                  </p>
                )}
                <p className="font-sans text-[0.6875rem] text-muted mt-2">{fmt(v.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
