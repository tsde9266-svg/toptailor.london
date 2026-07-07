'use client'
import { useState, useEffect, useRef } from 'react'

type CustomerHit = { name: string; email: string; phone: string; address: string; source?: string }

type Props = {
  onSelect: (c: { name: string; email: string; phone: string; address: string }) => void
}

const SOURCE_LABEL: Record<string, string> = {
  order: 'order', booking: 'booking', invoice: 'invoice', consultation: 'call',
}

export default function CustomerSearch({ onSelect }: Props) {
  const [customers, setCustomers] = useState<CustomerHit[]>([])
  const [loaded, setLoaded]       = useState(false)
  const [query, setQuery]         = useState('')
  const [open, setOpen]           = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/admin/customers')
      .then(r => r.json())
      .then((data: CustomerHit[]) => { setCustomers(Array.isArray(data) ? data : []); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  useEffect(() => {
    function handler(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const q = query.trim().toLowerCase()
  const filtered = q
    ? customers.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      ).slice(0, 8)
    : customers.slice(0, 8)

  return (
    <div ref={ref} className="relative">
      <label className="block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal">
        Find existing customer <span className="normal-case font-light tracking-normal">(optional)</span>
      </label>
      <input
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder="Search by name, phone, or email…"
        className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white"
      />
      <p className="font-sans text-[0.75rem] text-muted mt-1.5">
        Can&apos;t find them? No problem — just type their details below and they&apos;ll be saved as a new customer.
      </p>

      {open && loaded && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-divider shadow-lg z-20 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="font-sans text-[0.8125rem] text-muted px-4 py-3">No matches — type details below to add them as new.</p>
          ) : (
            filtered.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { onSelect(c); setOpen(false); setQuery('') }}
                className="block w-full text-left px-4 py-2.5 border-b border-divider last:border-b-0 hover:bg-parchment transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[0.875rem] font-medium text-charcoal">{c.name}</span>
                  {c.source && (
                    <span className="font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 bg-hunter/10 text-hunter">
                      {SOURCE_LABEL[c.source] ?? c.source}
                    </span>
                  )}
                </div>
                <p className="font-sans text-[0.75rem] text-muted">{[c.phone, c.email].filter(Boolean).join(' · ')}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
