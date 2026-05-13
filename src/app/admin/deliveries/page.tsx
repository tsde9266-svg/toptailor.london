import Link from 'next/link'
import { getAllDeliveries } from '@/lib/kv'

function fmtDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default async function DeliveriesPage() {
  const deliveries = await getAllDeliveries().catch(() => [])

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Admin
        </Link>
        <span className="font-playfair text-[1.0625rem]">Deliveries</span>
        <Link
          href="/admin/deliveries/new"
          className="font-sans text-[0.75rem] uppercase tracking-widest bg-parchment text-hunter px-3 py-1.5 hover:bg-parchment/90 transition-colors"
        >
          + New
        </Link>
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-2xl mx-auto">
        {deliveries.length === 0 ? (
          <div className="border border-dashed border-divider p-12 text-center">
            <p className="font-sans text-muted mb-4">No deliveries yet.</p>
            <Link
              href="/admin/deliveries/new"
              className="font-sans text-[0.75rem] uppercase tracking-widest text-hunter underline underline-offset-2"
            >
              Plan your first delivery run
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {deliveries.map(d => {
              const total     = d.stops.length
              const delivered = d.stops.filter(s => s.status === 'delivered').length
              const done      = delivered === total
              return (
                <Link
                  key={d.id}
                  href={`/admin/deliveries/${d.id}`}
                  className="block bg-white border border-divider p-5 hover:border-hunter transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-playfair text-[1.125rem] text-charcoal mb-1">{fmtDate(d.date)}</p>
                      <p className="font-sans text-[0.8125rem] text-muted">
                        {total} stop{total !== 1 ? 's' : ''}
                        {d.notes && ` · ${d.notes.slice(0, 40)}${d.notes.length > 40 ? '…' : ''}`}
                      </p>
                    </div>
                    <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-1 flex-shrink-0 ${
                      done ? 'bg-green-100 text-green-800' : delivered > 0 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {done ? 'Complete' : `${delivered}/${total}`}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
