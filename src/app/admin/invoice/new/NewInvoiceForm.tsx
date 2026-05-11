'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type LineItem = { name: string; price: number | '' }

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'
const inputClass = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

function today() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
}

export default function NewInvoiceForm() {
  const router = useRouter()

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [address, setAddress] = useState('')
  const [items,   setItems]   = useState<LineItem[]>([{ name: '', price: '' }])
  const [discount, setDiscount] = useState<number | ''>('')
  const [notes,   setNotes]   = useState('')
  const [payment, setPayment] = useState<'bank' | 'cash'>('bank')
  const [dueDate, setDueDate] = useState(today())
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function setItemName(i: number, v: string) {
    setItems(p => p.map((it, idx) => idx === i ? { ...it, name: v } : it))
  }
  function setItemPrice(i: number, v: string) {
    setItems(p => p.map((it, idx) => idx === i ? { ...it, price: v === '' ? '' : Number(v) } : it))
  }
  function removeItem(i: number) { setItems(p => p.filter((_, idx) => idx !== i)) }
  function addItem()              { setItems(p => [...p, { name: '', price: '' }]) }

  const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0), 0)
  const total    = discount ? Math.max(0, subtotal - Number(discount)) : subtotal

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    for (const it of items) {
      if (!it.name.trim())                       { setError('All services need a name.'); return }
      if (it.price === '' || Number(it.price) <= 0) { setError(`Enter a price for "${it.name || 'service'}".`); return }
    }
    if (items.length === 0) { setError('Add at least one service.'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/invoice', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name, email, phone: phone || undefined, address: address || undefined },
          items: items.map(it => ({ name: it.name, price: Number(it.price) })),
          discount: discount || undefined,
          notes:    notes   || undefined,
          paymentMethod: payment,
          dueDate,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'Failed to create invoice.'); return }
      router.push(`/admin/invoice/${data.id}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8 max-w-2xl mx-auto">

      {/* Customer */}
      <div className="border border-divider bg-white p-6 space-y-5">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Customer Details</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="James Wilson" />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="james@email.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Phone <span className="normal-case font-light tracking-normal">(optional)</span></label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="+44 7000 000000" />
          </div>
          <div>
            <label className={labelClass}>Address <span className="normal-case font-light tracking-normal">(optional)</span></label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputClass} placeholder="14 Belgravia Square, London SW1X 8PH" />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="border border-divider bg-white p-6">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Services</p>

        <div className="space-y-2 mb-3">
          <div className="hidden lg:grid gap-3 pb-1 border-b border-divider" style={{ gridTemplateColumns: '1fr 110px 36px' }}>
            <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Service</span>
            <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-center">Price £</span>
            <span />
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid gap-3 items-center" style={{ gridTemplateColumns: '1fr 110px 36px' }}>
              <input
                value={item.name}
                onChange={e => setItemName(i, e.target.value)}
                placeholder="e.g. Suit trouser taper"
                className="input-line font-sans text-[0.9rem]"
              />
              <input
                type="number"
                min="1"
                step="1"
                value={item.price}
                onChange={e => setItemPrice(i, e.target.value)}
                placeholder="0"
                className="input-line font-sans text-[0.9rem] text-center"
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="w-8 h-8 flex items-center justify-center text-muted hover:text-red-500 transition-colors"
                aria-label="Remove"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 font-sans text-[0.8125rem] text-hunter border border-dashed border-hunter/40 px-4 py-2 w-full hover:border-hunter hover:bg-hunter/5 transition-colors"
        >
          <span className="text-[1.125rem] leading-none">+</span> Add service
        </button>

        {/* Discount */}
        <div className="mt-6 pt-4 border-t border-divider">
          <div className="flex items-center gap-4">
            <label className="font-sans text-[0.75rem] uppercase tracking-widest text-charcoal whitespace-nowrap">
              Discount £ <span className="normal-case font-light tracking-normal">(optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={discount}
              onChange={e => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
              className="input-line font-sans text-[0.9rem] w-28"
            />
          </div>
        </div>

        {/* Running total */}
        <div className="mt-4 pt-4 border-t border-divider space-y-1">
          {subtotal !== total && (
            <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
              <span>Subtotal</span><span>£{subtotal}</span>
            </div>
          )}
          {discount ? (
            <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
              <span>Discount</span><span>−£{discount}</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total</span>
            <span className="font-playfair text-[1.625rem] text-hunter">£{total}</span>
          </div>
        </div>
      </div>

      {/* Payment & dates */}
      <div className="border border-divider bg-white p-6 space-y-5">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Payment & Dates</p>

        <div>
          <label className={labelClass}>Payment Method</label>
          <div className="flex gap-2">
            {(['bank', 'cash'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setPayment(m)}
                className={`font-sans text-[0.75rem] uppercase tracking-widest px-4 py-2 border transition-colors ${
                  payment === m ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                }`}
              >
                {m === 'bank' ? 'Bank Transfer' : 'Cash / Pay on Day'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="border border-divider bg-white p-6">
        <label className={labelClass}>Notes for customer <span className="normal-case font-light tracking-normal">(optional)</span></label>
        <textarea
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Your jacket required specialist thread — adjusted accordingly."
          className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9rem] focus:outline-none focus:border-hunter resize-none bg-white"
        />
      </div>

      {error && (
        <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-hunter text-parchment py-5 font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Invoice…' : `Generate Invoice — £${total} →`}
      </button>
    </form>
  )
}
