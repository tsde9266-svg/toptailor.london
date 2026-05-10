import Link from 'next/link'
import { getAllConsultations } from '@/lib/kv'
import type { Consultation } from '@/lib/kv'

const STATUS_LABEL: Record<Consultation['status'], string> = {
  pending_call: 'Pending Call',
  called:       'Called',
  closed:       'Closed',
}

const STATUS_COLOR: Record<Consultation['status'], string> = {
  pending_call: 'bg-amber-100 text-amber-800',
  called:       'bg-blue-100 text-blue-800',
  closed:       'bg-gray-100 text-gray-600',
}

function fmt(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    day:    'numeric',
    month:  'short',
    hour:   '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  })
}

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  let consultations: Consultation[] = []
  let kvError = false
  try {
    consultations = await getAllConsultations()
  } catch {
    kvError = true
  }

  const filter  = (searchParams.filter ?? 'all') as Consultation['status'] | 'all'
  const visible = filter === 'all' ? consultations : consultations.filter(c => c.status === filter)

  const counts: Record<string, number> = {
    all:          consultations.length,
    pending_call: consultations.filter(c => c.status === 'pending_call').length,
    called:       consultations.filter(c => c.status === 'called').length,
    closed:       consultations.filter(c => c.status === 'closed').length,
  }

  const tabs = [
    { key: 'all',          label: `All (${counts.all})` },
    { key: 'pending_call', label: `Pending (${counts.pending_call})` },
    { key: 'called',       label: `Called (${counts.called})` },
    { key: 'closed',       label: `Closed (${counts.closed})` },
  ]

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Admin
        </Link>
        <span className="font-playfair text-[1.0625rem]">Consultations</span>
        <Link
          href="/admin/log-call"
          className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-parchment/40 px-3 py-1 transition-colors"
        >
          + Log Call
        </Link>
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
        {kvError && (
          <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6">
            <p className="font-sans text-[0.875rem] text-amber-800 font-medium">Could not load consultations.</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <Link
              key={tab.key}
              href={`/admin/consultations${tab.key === 'all' ? '' : `?filter=${tab.key}`}`}
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
            No consultations in this category.
          </p>
        ) : (
          <div className="space-y-3">
            {visible.map(c => (
              <Link
                key={c.id}
                href={`/admin/consultations/${c.id}`}
                className="block border border-divider bg-white p-5 hover:border-hunter transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="font-playfair text-[1.0625rem] text-charcoal">{c.name}</span>
                  <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLOR[c.status]}`}>
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>
                <p className="font-sans text-[0.8125rem] text-muted mb-1">
                  📞 {c.phone}{c.email ? ` · ${c.email}` : ''}
                </p>
                {(c.day || c.time) && (
                  <p className="font-sans text-[0.75rem] text-muted mb-1">
                    Best time: {[c.day, c.time].filter(Boolean).join(', ')}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  {c.commsPref && (
                    <span className="font-sans text-[0.6875rem] text-muted">
                      Prefers: {c.commsPref === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </span>
                  )}
                  <span className="font-sans text-[0.6875rem] text-muted ml-auto">{fmt(c.createdAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
