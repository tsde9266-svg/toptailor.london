'use client'
import { useState } from 'react'
import type { Order } from '@/lib/kv'

type LineItem = {
  name:       string
  price:      number | ''
  needsPrice: boolean
}

export default function QuoteForm({ order }: { order: Order }) {
  const [items, setItems] = useState<LineItem[]>(
    order.estimate.map(e => ({
      name:       e.name,
      price:      e.price === 0 ? '' : e.price,
      needsPrice: e.price === 0,
    }))
  )
  const [notes,   setNotes]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0)

  function setName(index: number, value: string) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, name: value } : item))
  }

  function setPrice(index: number, value: string) {
    const n = value === '' ? '' : Number(value)
    setItems(prev => prev.map((item, i) => i === index ? { ...item, price: n } : item))
  }

  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function addItem() {
    setItems(prev => [...prev, { name: '', price: '', needsPrice: false }])
  }

  async function sendQuote() {
    setError('')
    for (const item of items) {
      if (!item.name.trim()) { setError('All items need a name.'); return }
      if (item.price === '' || Number(item.price) <= 0) {
        setError(`Fill in the price for "${item.name || 'item'}".`)
        return
      }
    }
    if (items.length === 0) { setError('Add at least one item to the quote.'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          items: items.map(i => ({ name: i.name, price: Number(i.price) })),
          notes,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Failed to send quote. Try again.')
      } else {
        setSent(true)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded p-6 text-center mt-6">
        <p className="font-playfair text-[1.25rem] text-green-800 mb-2">Quote Sent ✓</p>
        <p className="font-sans text-[0.875rem] text-green-700">
          Email sent to <strong>{order.customer.email}</strong> with a link to review and approve.
        </p>
        <p className="font-sans text-[0.875rem] text-green-700 mt-1">
          Total quoted: <strong>£{total}</strong>
        </p>
        <a href="/admin" className="
          inline-block mt-5 bg-hunter text-parchment px-6 py-3
          font-sans text-[0.75rem] font-medium tracking-widest uppercase
          hover:bg-[#1E3D17] transition-colors
        ">
          Back to Orders
        </a>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="border-t-2 border-hunter pt-6 mb-6">
        <h2 className="font-playfair text-[1.375rem] mb-1">Create Quote</h2>
        <p className="font-sans text-[0.8125rem] text-muted">
          Adjust prices, add or remove items, then send to the customer.
          Items marked <span className="text-amber-600 font-medium">⚠ needs price</span> were requested as quotes.
        </p>
      </div>

      {/* Items table */}
      <div className="space-y-2 mb-4">
        {/* Header */}
        <div className="hidden lg:grid gap-3 px-1 pb-1 border-b border-divider" style={{ gridTemplateColumns: '1fr 100px 36px' }}>
          <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Item</span>
          <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted text-center">Price £</span>
          <span />
        </div>

        {items.map((item, i) => (
          <div key={i} className="grid gap-3 items-center" style={{ gridTemplateColumns: '1fr 100px 36px' }}>
            <div className="relative">
              <input
                value={item.name}
                onChange={e => setName(i, e.target.value)}
                placeholder="Item name"
                className="input-line w-full font-sans text-[0.9rem]"
              />
              {item.needsPrice && item.price === '' && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 font-sans text-[0.65rem] text-amber-600 font-medium whitespace-nowrap">
                  ⚠ needs price
                </span>
              )}
            </div>
            <input
              type="number"
              min="0"
              step="1"
              value={item.price}
              onChange={e => setPrice(i, e.target.value)}
              placeholder="0"
              className={`
                input-line w-full font-sans text-[0.9rem] text-center
                ${item.needsPrice && item.price === '' ? 'border-amber-400' : ''}
              `}
            />
            <button
              onClick={() => removeItem(i)}
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="
          flex items-center gap-2 font-sans text-[0.8125rem] text-hunter
          border border-dashed border-hunter/40 px-4 py-2 w-full
          hover:border-hunter hover:bg-hunter/5 transition-colors mb-6
        "
      >
        <span className="text-[1.125rem] leading-none">+</span> Add item
      </button>

      {/* Running total */}
      <div className="flex justify-between items-center border-t border-divider pt-4 mb-6">
        <span className="font-sans text-[0.8125rem] text-muted uppercase tracking-widest">Quote Total</span>
        <span className="font-playfair text-[1.5rem] text-hunter">£{total}</span>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label className="block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal">
          Notes for customer <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className="w-full border border-divider bg-white px-4 py-3 font-sans text-[0.9rem] text-charcoal focus:outline-none focus:border-hunter resize-none"
          placeholder="e.g. Your leather jacket needs specialist thread — adjusted accordingly."
        />
      </div>

      {error && (
        <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 mb-5">
          {error}
        </p>
      )}

      <button
        onClick={sendQuote}
        disabled={loading}
        className="
          w-full bg-hunter text-parchment py-5
          font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Sending…' : `Send Quote — £${total} →`}
      </button>
    </div>
  )
}
