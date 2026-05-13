'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Stop = { name: string; phone: string; address: string; items: string; orderId: string }
const EMPTY: Stop = { name: '', phone: '', address: '', items: '', orderId: '' }

const today = () => new Date().toISOString().split('T')[0]!

const INPUT = 'w-full border border-divider px-3 py-2 font-sans text-[0.875rem] text-charcoal bg-white focus:outline-none focus:border-hunter'
const LABEL = 'block font-sans text-[0.625rem] uppercase tracking-widest text-muted mb-1'

export default function NewDeliveryPage() {
  const router = useRouter()
  const [date,    setDate]    = useState(today())
  const [notes,   setNotes]   = useState('')
  const [stops,   setStops]   = useState<Stop[]>([{ ...EMPTY }])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function updateStop(i: number, field: keyof Stop, val: string) {
    setStops(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/deliveries', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          date,
          notes: notes.trim() || undefined,
          stops: stops.map(s => ({
            name:    s.name.trim(),
            phone:   s.phone.trim(),
            address: s.address.trim(),
            items:   s.items.trim(),
            orderId: s.orderId.trim() || undefined,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      router.push(`/admin/deliveries/${data.id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/deliveries" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Deliveries
        </Link>
        <span className="font-playfair text-[1.0625rem]">New Delivery Run</span>
        <span className="w-20" />
      </div>

      <form onSubmit={handleSubmit} className="px-4 lg:px-8 py-8 max-w-2xl mx-auto space-y-6">

        {/* Date + notes */}
        <div className="bg-white border border-divider p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Delivery Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Notes (optional)</label>
              <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Afternoon run" className={INPUT} />
            </div>
          </div>
        </div>

        {/* Stops */}
        <div className="space-y-4">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Stops</p>

          {stops.map((stop, i) => (
            <div key={i} className="bg-white border border-divider p-5 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="font-sans text-[0.75rem] font-medium text-charcoal">Stop {i + 1}</p>
                {stops.length > 1 && (
                  <button type="button" onClick={() => setStops(p => p.filter((_, idx) => idx !== i))}
                    className="font-sans text-[0.6875rem] text-red-500 hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Customer Name *</label>
                  <input type="text" value={stop.name} onChange={e => updateStop(i, 'name', e.target.value)} required placeholder="e.g. Sarah" className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Phone</label>
                  <input type="tel" value={stop.phone} onChange={e => updateStop(i, 'phone', e.target.value)} placeholder="+44 7..." className={INPUT} />
                </div>
              </div>

              <div>
                <label className={LABEL}>Address *</label>
                <input type="text" value={stop.address} onChange={e => updateStop(i, 'address', e.target.value)} required placeholder="39 Majuba Road, B16 0PD" className={INPUT} />
              </div>

              <div>
                <label className={LABEL}>Garments / Items</label>
                <input type="text" value={stop.items} onChange={e => updateStop(i, 'items', e.target.value)} placeholder="e.g. Suit jacket + 2 trousers" className={INPUT} />
              </div>

              <div>
                <label className={LABEL}>Order ID (optional)</label>
                <input type="text" value={stop.orderId} onChange={e => updateStop(i, 'orderId', e.target.value)} placeholder="Link to order in system" className={INPUT} />
              </div>
            </div>
          ))}

          {stops.length < 10 && (
            <button type="button" onClick={() => setStops(p => [...p, { ...EMPTY }])}
              className="w-full border border-dashed border-divider py-3 font-sans text-[0.8125rem] text-muted hover:border-hunter hover:text-charcoal transition-colors">
              + Add another stop
            </button>
          )}
        </div>

        {error && (
          <p className="font-sans text-[0.875rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-hunter text-parchment py-4 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating…' : 'Create Delivery Run →'}
        </button>
      </form>
    </div>
  )
}
