import Link from 'next/link'
import { getRecentErrors } from '@/lib/kv'
import type { AppError } from '@/lib/kv'
import { clearErrors } from './actions'

function fmt(ts: string) {
  return new Date(ts).toLocaleString('en-GB', {
    day:     'numeric',
    month:   'short',
    year:    'numeric',
    hour:    '2-digit',
    minute:  '2-digit',
    second:  '2-digit',
    timeZone: 'Europe/London',
  })
}

function StatusBadge({ status }: { status: number }) {
  const cls = status >= 500
    ? 'bg-red-100 text-red-700'
    : status >= 400
    ? 'bg-amber-100 text-amber-800'
    : 'bg-gray-100 text-gray-600'
  return (
    <span className={`font-sans text-[0.6875rem] font-medium px-2 py-0.5 rounded ${cls}`}>
      {status}
    </span>
  )
}

export default async function ErrorLogPage() {
  let errors: AppError[] = []
  let kvError = false

  try {
    errors = await getRecentErrors(200)
  } catch {
    kvError = true
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link
          href="/admin"
          className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors"
        >
          ← Admin
        </Link>
        <span className="font-playfair text-[1.125rem]">Error Log</span>
        <span className="w-16" />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-5xl mx-auto">

        {kvError && (
          <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6">
            <p className="font-sans text-[0.875rem] text-amber-800 font-medium">
              KV store unavailable — cannot load error log.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-playfair text-[1.75rem]">Error Log</h1>
            <p className="font-sans text-[0.8125rem] text-muted mt-1">
              Last 200 server-side errors. Newest first.
            </p>
          </div>
          {errors.length > 0 && (
            <form action={clearErrors}>
              <button
                type="submit"
                className="font-sans text-[0.6875rem] uppercase tracking-widest text-red-600 border border-red-200 px-4 py-2 hover:bg-red-50 transition-colors"
              >
                Clear all
              </button>
            </form>
          )}
        </div>

        {errors.length === 0 && !kvError ? (
          <div className="border border-divider bg-white px-6 py-12 text-center">
            <p className="font-sans text-muted text-[0.9375rem]">No errors logged.</p>
            <p className="font-sans text-[0.8125rem] text-muted mt-1">
              Server errors will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="border border-divider bg-white overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-divider bg-parchment/50">
                  <th className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-left px-4 py-3">Time</th>
                  <th className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-left px-4 py-3">Route</th>
                  <th className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-left px-3 py-3">Status</th>
                  <th className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-left px-4 py-3">Message</th>
                  <th className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-left px-4 py-3">Detail</th>
                </tr>
              </thead>
              <tbody>
                {errors.map((err, i) => (
                  <tr key={err.id} className={`border-b border-divider ${i % 2 === 0 ? 'bg-white' : 'bg-parchment/20'}`}>
                    <td className="px-4 py-3 font-sans text-[0.75rem] text-muted whitespace-nowrap">
                      {fmt(err.ts)}
                    </td>
                    <td className="px-4 py-3 font-sans text-[0.8125rem] text-charcoal whitespace-nowrap">
                      <span className="font-mono text-[0.6875rem] text-muted mr-1">{err.method}</span>
                      {err.route}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={err.status} />
                    </td>
                    <td className="px-4 py-3 font-sans text-[0.8125rem] text-charcoal">
                      {err.message}
                    </td>
                    <td className="px-4 py-3 font-sans text-[0.75rem] text-muted max-w-[200px]">
                      {err.detail ? (
                        <span title={err.detail} className="cursor-help">
                          {err.detail.length > 60 ? err.detail.slice(0, 60) + '…' : err.detail}
                        </span>
                      ) : (
                        <span className="text-muted/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
