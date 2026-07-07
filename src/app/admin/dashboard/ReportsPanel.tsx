'use client'
import { useState } from 'react'
import type { ReportType } from '@/app/api/admin/reports/route'

const REPORT_EMAIL = 'taqi0413@gmail.com'

const REPORTS: { type: ReportType; label: string; sub: string }[] = [
  { type: 'summary',     label: 'Monthly Business Summary', sub: 'Revenue, customers, top services — one email' },
  { type: 'customers',   label: 'Full Customer List',       sub: 'Every customer as a CSV' },
  { type: 'revenue',     label: 'Revenue & Invoices',        sub: 'All invoices with status and amounts' },
  { type: 'outstanding', label: 'Outstanding Invoices',      sub: 'Who still owes you money' },
  { type: 'services',    label: 'Top Services',              sub: 'Best-selling services by revenue' },
  { type: 'orders',      label: 'Orders Report',             sub: 'All online booking-form orders' },
  { type: 'bookings',    label: 'Bookings & Schedule',       sub: 'All WhatsApp bookings' },
  { type: 'backup',      label: 'Full Data Backup',          sub: 'Every record in the system, as CSVs' },
]

type SendState = 'idle' | 'sending' | 'sent' | 'error'

export default function ReportsPanel() {
  const [state, setState] = useState<Record<string, SendState>>({})
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({})

  async function send(type: ReportType) {
    setState(s => ({ ...s, [type]: 'sending' }))
    try {
      const res  = await fetch('/api/admin/reports', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, email: REPORT_EMAIL }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Failed to send')
      setState(s => ({ ...s, [type]: 'sent' }))
      setTimeout(() => setState(s => ({ ...s, [type]: 'idle' })), 4000)
    } catch (e) {
      setErrorMsg(m => ({ ...m, [type]: e instanceof Error ? e.message : 'Failed to send' }))
      setState(s => ({ ...s, [type]: 'error' }))
      setTimeout(() => setState(s => ({ ...s, [type]: 'idle' })), 5000)
    }
  }

  return (
    <div className="border border-divider bg-white p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Reports — Emailed to Inbox</p>
        <p className="font-sans text-[0.6875rem] text-muted">→ {REPORT_EMAIL}</p>
      </div>
      <p className="font-sans text-[0.75rem] text-muted mb-4">
        Nothing downloads to this device — every report is sent straight to your email.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {REPORTS.map(r => {
          const st = state[r.type] ?? 'idle'
          return (
            <button
              key={r.type}
              type="button"
              onClick={() => send(r.type)}
              disabled={st === 'sending'}
              className={`text-left border p-3 transition-colors ${
                st === 'sent'  ? 'border-green-400 bg-green-50' :
                st === 'error' ? 'border-red-300 bg-red-50' :
                'border-divider hover:border-hunter'
              } disabled:opacity-60`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans text-[0.8125rem] font-medium text-charcoal">{r.label}</span>
                <span className="font-sans text-[0.6875rem] uppercase tracking-widest flex-shrink-0">
                  {st === 'idle'    && <span className="text-muted">Send →</span>}
                  {st === 'sending' && <span className="text-muted animate-pulse">Sending…</span>}
                  {st === 'sent'    && <span className="text-green-700">✓ Sent</span>}
                  {st === 'error'   && <span className="text-red-600">Failed</span>}
                </span>
              </div>
              <p className="font-sans text-[0.75rem] text-muted mt-0.5">{r.sub}</p>
              {st === 'error' && errorMsg[r.type] && (
                <p className="font-sans text-[0.6875rem] text-red-600 mt-1">{errorMsg[r.type]}</p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
