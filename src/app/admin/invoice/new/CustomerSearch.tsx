'use client'
import { useState, useEffect, useRef } from 'react'

type CustomerHit = { name: string; email: string; phone: string; address: string; source?: string }

type Props = {
  value: string
  onNameChange: (name: string) => void
  onSelect: (c: { name: string; email: string; phone: string; address: string }) => void
}

const SOURCE_LABEL: Record<string, string> = {
  order: 'order', booking: 'booking', invoice: 'invoice', consultation: 'call', whatsapp: 'whatsapp',
}

export default function CustomerSearch({ value, onNameChange, onSelect }: Props) {
  const [customers, setCustomers] = useState<CustomerHit[]>([])
  const [loaded, setLoaded]       = useState(false)
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

  const q = value.trim().toLowerCase()
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
        Name *
      </label>
      <input
        required
        type="text"
        value={value}
        onChange={e => { onNameChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder="Start typing a name, phone, or email…"
        className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white"
        autoComplete="off"
      />
      <p className="font-sans text-[0.75rem] text-muted mt-1.5">
        Matches an existing customer? Pick them from the list to fill in the rest — otherwise just keep typing and they&apos;ll be saved as new.
      </p>

      {open && loaded && q && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-divider shadow-lg z-20 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="font-sans text-[0.8125rem] text-muted px-4 py-3">No matches — keep typing to add them as new.</p>
          ) : (
            filtered.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { onSelect(c); setOpen(false) }}
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
