'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Voucher, Invoice } from '@/lib/kv'
import { VOUCHER_TYPE_LABEL as TYPE_LABEL, VOUCHER_TYPE_COLOR as TYPE_COLOR, VOUCHER_TYPE_BORDER as TYPE_BORDER } from '@/lib/constants'
import { services as SERVICE_CATALOGUE } from '@/data/services'

const ALL_SERVICE_NAMES = SERVICE_CATALOGUE.flatMap(c => c.items.map(i => i.name))

type LineItem = {
  mode: 'simple' | 'qty'
  name: string
  price: number | ''
  qty: number | ''
  itemType: string
  service: string
  priceEach: number | ''
}

function emptyLine(): LineItem {
  return { mode: 'simple', name: '', price: '', qty: 2, itemType: '', service: '', priceEach: '' }
}

function lineName(it: LineItem): string {
  if (it.mode !== 'qty') return it.name
  const q = it.qty !== '' && Number(it.qty) > 0 ? `${it.qty}× ` : ''
  const item = it.itemType.trim()
  const svc  = it.service.trim()
  return `${q}${item}${svc ? ` — ${svc}` : ''}`.trim()
}

function lineTotal(it: LineItem): number {
  if (it.mode === 'qty') {
    if (it.qty === '' || it.priceEach === '') return 0
    return Number(it.qty) * Number(it.priceEach)
  }
  return it.price === '' ? 0 : Number(it.price)
}

function fromInvoiceItem(i: Invoice['items'][number]): LineItem {
  if (i.qty && i.priceEach !== undefined) {
    const raw   = i.name
    const match = raw.match(/^\d+×\s*(.+?)(?:\s+—\s+(.+))?$/)
    return {
      mode: 'qty',
      name: '', price: '',
      qty: i.qty,
      itemType: match?.[1]?.trim() ?? raw,
      service:  match?.[2]?.trim() ?? '',
      priceEach: i.priceEach,
    }
  }
  return { mode: 'simple', name: i.name, price: i.price, qty: 2, itemType: '', service: '', priceEach: '' }
}

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'
const inputClass = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

function today() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
}

type Props = {
  invoice?: Invoice   // pre-fill for edit mode
}

export default function NewInvoiceForm({ invoice }: Props) {
  const router  = useRouter()
  const isEdit  = !!invoice

  const [name,    setName]    = useState(invoice?.customer.name    ?? '')
  const [email,   setEmail]   = useState(invoice?.customer.email   ?? '')
  const [phone,   setPhone]   = useState(invoice?.customer.phone   ?? '')
  const [address, setAddress] = useState(invoice?.customer.address ?? '')
  const [items,   setItems]   = useState<LineItem[]>(() =>
    invoice ? invoice.items.map(fromInvoiceItem) : [emptyLine()]
  )
  const [notes,   setNotes]   = useState(invoice?.notes ?? '')
  const [payment, setPayment] = useState<'cash' | 'mobile'>(invoice?.paymentMethod ?? 'cash')
  const [dueDate, setDueDate] = useState(invoice?.dueDate ?? today())
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const [discountMode,    setDiscountMode]    = useState<'none' | 'manual' | 'voucher'>(
    invoice?.discountType === 'voucher' ? 'voucher' : invoice?.discountPercent ? 'manual' : 'none'
  )
  const [discountPercent, setDiscountPercent] = useState<number | ''>(invoice?.discountPercent ?? '')
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
  const [vouchers,        setVouchers]        = useState<Voucher[]>([])
  const [vouchersLoaded,  setVouchersLoaded]  = useState(false)

  useEffect(() => {
    if (!isEdit) {
      try {
        const raw = sessionStorage.getItem('pos_draft')
        if (raw) {
          const draft = JSON.parse(raw) as { items: Array<{ name: string; price: number }>; discountPercent: number }
          if (Array.isArray(draft.items) && draft.items.length > 0) {
            setItems(draft.items.map(i => ({ mode: 'simple' as const, name: i.name, price: i.price, qty: 2, itemType: '', service: '', priceEach: '' })))
          }
          if (draft.discountPercent > 0) {
            setDiscountMode('manual')
            setDiscountPercent(draft.discountPercent)
          }
          sessionStorage.removeItem('pos_draft')
        }
      } catch { /* ignore */ }
    }

    fetch('/api/admin/vouchers')
      .then(r => r.json())
      .then((data: Voucher[]) => {
        setVouchers(Array.isArray(data) ? data.filter(v => v.isActive) : [])
        setVouchersLoaded(true)
      })
      .catch(() => setVouchersLoaded(true))
  }, [isEdit])

  // ── Line item helpers ─────────────────────────────────────────────────────

  function updateItem(i: number, patch: Partial<LineItem>) {
    setItems(p => p.map((it, idx) => idx === i ? { ...it, ...patch } : it))
  }
  function toggleMode(i: number) {
    setItems(p => p.map((it, idx) => idx === i
      ? { ...it, mode: it.mode === 'simple' ? 'qty' : 'simple' }
      : it
    ))
  }
  function removeItem(i: number) { setItems(p => p.filter((_, idx) => idx !== i)) }
  function addItem()              { setItems(p => [...p, emptyLine()]) }

  function selectVoucher(v: Voucher) { setSelectedVoucher(v); setDiscountMode('voucher'); setDiscountPercent('') }
  function clearDiscount()           { setDiscountMode('none'); setSelectedVoucher(null); setDiscountPercent('') }

  // ── Totals ────────────────────────────────────────────────────────────────

  const subtotal = items.reduce((s, it) => s + lineTotal(it), 0)
  const effectivePct = discountMode === 'voucher'
    ? (selectedVoucher?.discountPercent ?? (isEdit && invoice?.discountPercent ? invoice.discountPercent : 0))
    : (discountMode === 'manual' ? (Number(discountPercent) || 0) : 0)
  const discountAmount = effectivePct > 0 ? Math.round(subtotal * effectivePct) / 100 : 0
  const total          = Math.max(0, subtotal - discountAmount)

  // ── Submit ────────────────────────────────────────────────────────────────

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    for (const it of items) {
      if (it.mode === 'simple') {
        if (!it.name.trim())                          { setError('All services need a name.'); return }
        if (it.price === '' || Number(it.price) < 0) { setError(`Enter a valid price for "${it.name || 'service'}".`); return }
      } else {
        if (!it.itemType.trim())                           { setError('Enter an item type (e.g. Shirt) for each qty line.'); return }
        if (it.qty === '' || Number(it.qty) < 1)           { setError('Quantity must be at least 1.'); return }
        if (it.priceEach === '' || Number(it.priceEach) < 0) { setError(`Enter a valid price per item for "${it.itemType}".`); return }
      }
    }
    if (items.length === 0) { setError('Add at least one service.'); return }

    const payload = {
      customer:        { name, email, phone: phone || undefined, address: address || undefined },
      items:           items.map(it => ({
        name:      lineName(it) || it.name,
        price:     lineTotal(it),
        ...(it.mode === 'qty' ? { qty: Number(it.qty), priceEach: Number(it.priceEach) } : {}),
      })),
      discountPercent: effectivePct > 0 ? effectivePct : undefined,
      voucherId:       discountMode === 'voucher' ? selectedVoucher?.id : undefined,
      notes:           notes || undefined,
      paymentMethod:   payment,
      dueDate,
    }

    setLoading(true)
    try {
      const url    = isEdit ? `/api/admin/invoice/${invoice!.id}/edit` : '/api/admin/invoice'
      const method = isEdit ? 'PATCH' : 'POST'
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'Failed to save invoice.'); return }
      router.push(`/admin/invoice/${isEdit ? invoice!.id : data.id}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

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
            <label className={labelClass}>Email <span className="normal-case font-light tracking-normal">(optional)</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="james@email.com" />
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

        <div className="space-y-3 mb-3">
          {items.map((item, i) => (
            <div key={i} className="border border-divider/60 p-3 space-y-2">

              {/* Mode toggle pill */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleMode(i)}
                  className={`font-sans text-[0.625rem] uppercase tracking-widest px-2.5 py-1 border transition-colors ${
                    item.mode === 'qty'
                      ? 'bg-hunter text-parchment border-hunter'
                      : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                  }`}
                >
                  {item.mode === 'qty' ? '× Qty Mode' : '+ Qty'}
                </button>
                {item.mode === 'qty' && (
                  <span className="font-sans text-[0.6875rem] text-muted">
                    e.g. 6 × Shirt — Length Shortening
                  </span>
                )}
              </div>

              {item.mode === 'simple' ? (
                /* ── Simple mode ── */
                <div className="grid gap-2 items-center" style={{ gridTemplateColumns: '1fr 110px 36px' }}>
                  <input
                    value={item.name}
                    onChange={e => updateItem(i, { name: e.target.value })}
                    placeholder="e.g. Suit trouser taper"
                    className="input-line font-sans text-[0.9rem]"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={e => updateItem(i, { price: e.target.value === '' ? '' : Number(e.target.value) })}
                    placeholder="0"
                    className="input-line font-sans text-[0.9rem] text-center"
                  />
                  <button type="button" onClick={() => removeItem(i)}
                    className="w-8 h-8 flex items-center justify-center text-muted hover:text-red-500 transition-colors" aria-label="Remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                /* ── Qty mode ── */
                <div className="space-y-2.5">
                  {/* Row 1: qty × item + delete */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number" min="1" step="1"
                      value={item.qty}
                      onChange={e => updateItem(i, { qty: e.target.value === '' ? '' : Number(e.target.value) })}
                      placeholder="1"
                      className="input-line font-sans text-[0.9rem] text-center w-14 shrink-0"
                    />
                    <span className="font-sans text-[0.9rem] text-muted shrink-0">×</span>
                    <input
                      value={item.itemType}
                      onChange={e => updateItem(i, { itemType: e.target.value })}
                      placeholder="Item (e.g. Shirt)"
                      className="input-line font-sans text-[0.9rem] flex-1 min-w-0"
                    />
                    <button type="button" onClick={() => removeItem(i)}
                      className="w-8 h-8 shrink-0 flex items-center justify-center text-muted hover:text-red-500 transition-colors" aria-label="Remove">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>

                  {/* Row 2: service select */}
                  {(() => {
                    const isCustom = item.service !== '' && !ALL_SERVICE_NAMES.includes(item.service)
                    const selectVal = isCustom ? '__custom' : item.service
                    return (
                      <div className="space-y-1.5">
                        <select
                          value={selectVal}
                          onChange={e => {
                            const v = e.target.value
                            if (v === '__custom') updateItem(i, { service: '' })
                            else updateItem(i, { service: v })
                          }}
                          className="w-full border border-divider px-3 py-2 font-sans text-[0.875rem] focus:outline-none focus:border-hunter bg-white text-charcoal"
                        >
                          <option value="">— Select service (optional) —</option>
                          {SERVICE_CATALOGUE.map(cat => (
                            <optgroup key={cat.id} label={cat.name}>
                              {cat.items.map(s => (
                                <option key={s.id} value={s.name}>{s.name}</option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="__custom">Custom…</option>
                        </select>
                        {(selectVal === '__custom') && (
                          <input
                            value={item.service}
                            onChange={e => updateItem(i, { service: e.target.value })}
                            placeholder="Describe the service"
                            className="input-line font-sans text-[0.9rem] w-full"
                          />
                        )}
                      </div>
                    )
                  })()}

                  {/* Row 3: price per item */}
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[0.75rem] text-muted">@ £</span>
                    <input
                      type="number" min="0" step="0.01"
                      value={item.priceEach}
                      onChange={e => updateItem(i, { priceEach: e.target.value === '' ? '' : Number(e.target.value) })}
                      placeholder="25"
                      className="input-line font-sans text-[0.9rem] text-center w-24"
                    />
                    <span className="font-sans text-[0.75rem] text-muted">per item</span>
                    {item.qty !== '' && item.priceEach !== '' && (
                      <span className="font-sans text-[0.875rem] text-hunter font-medium">
                        = £{lineTotal(item).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              )}
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
        <div className="mt-6 pt-5 border-t border-divider space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Discount</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setDiscountMode('manual'); setSelectedVoucher(null) }}
                className={`font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  discountMode === 'manual' ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter'
                }`}>Manual %</button>
              <button type="button" onClick={() => { setDiscountMode('voucher'); setDiscountPercent('') }}
                className={`font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  discountMode === 'voucher' ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter'
                }`}>Apply Voucher</button>
              {discountMode !== 'none' && (
                <button type="button" onClick={clearDiscount}
                  className="font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border border-divider text-red-500 hover:border-red-300 transition-colors">
                  Clear
                </button>
              )}
            </div>
          </div>

          {discountMode === 'manual' && (
            <div className="flex items-center gap-4">
              <label className="font-sans text-[0.75rem] uppercase tracking-widest text-charcoal whitespace-nowrap">Discount %</label>
              <div className="flex items-center gap-1">
                <input type="number" min="1" max="100"
                  value={discountPercent}
                  onChange={e => setDiscountPercent(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="20"
                  className="input-line font-sans text-[0.9rem] w-20 text-center"
                />
                <span className="font-sans text-[0.9rem] text-muted">%</span>
              </div>
              {effectivePct > 0 && (
                <span className="font-sans text-[0.8125rem] text-hunter">= −£{discountAmount.toFixed(2)}</span>
              )}
            </div>
          )}

          {discountMode === 'voucher' && (
            <div className="space-y-2">
              {!vouchersLoaded && <p className="font-sans text-[0.8125rem] text-muted">Loading vouchers…</p>}
              {vouchersLoaded && vouchers.length === 0 && (
                <p className="font-sans text-[0.8125rem] text-muted">
                  No active vouchers.{' '}
                  <a href="/admin/vouchers" target="_blank" className="text-hunter underline">Create one →</a>
                </p>
              )}
              {vouchersLoaded && vouchers.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vouchers.map(v => (
                    <button key={v.id} type="button" onClick={() => selectVoucher(v)}
                      className={`text-left p-3 border-2 transition-all ${
                        selectedVoucher?.id === v.id ? 'border-hunter bg-hunter/5' : `${TYPE_BORDER[v.type]} hover:border-hunter`
                      }`}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-sans text-[0.75rem] font-semibold text-charcoal">{v.name}</span>
                        <span className="font-playfair text-[1rem] text-hunter">{v.discountPercent}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-[0.6875rem] text-muted">{v.code}</code>
                        <span className={`font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 ${TYPE_COLOR[v.type]}`}>
                          {TYPE_LABEL[v.type]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {selectedVoucher && (
                <div className="bg-hunter/5 border border-hunter/30 px-4 py-3">
                  <p className="font-sans text-[0.8125rem] text-hunter font-medium">
                    ✓ {selectedVoucher.name} — {selectedVoucher.discountPercent}% off = −£{discountAmount.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Running total */}
        <div className="mt-4 pt-4 border-t border-divider space-y-1">
          {discountAmount > 0 && (
            <>
              <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
                <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
                <span>Discount ({effectivePct}%{discountMode === 'voucher' && selectedVoucher ? ` · ${selectedVoucher.code}` : ''})</span>
                <span>−£{discountAmount.toFixed(2)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total</span>
            <span className="font-playfair text-[1.625rem] text-hunter">£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment & dates */}
      <div className="border border-divider bg-white p-6 space-y-5">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Payment & Dates</p>
        <div>
          <label className={labelClass}>Payment Method</label>
          <div className="flex flex-wrap gap-2">
            {([{ id: 'cash', label: 'Cash / Pay on Day' }, { id: 'mobile', label: 'Mobile / NFC' }] as const).map(m => (
              <button key={m.id} type="button" onClick={() => setPayment(m.id)}
                className={`font-sans text-[0.75rem] uppercase tracking-widest px-4 py-2 border transition-colors ${
                  payment === m.id ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                }`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Notes */}
      <div className="border border-divider bg-white p-6">
        <label className={labelClass}>Notes for customer <span className="normal-case font-light tracking-normal">(optional)</span></label>
        <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Your jacket required specialist thread — adjusted accordingly."
          className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9rem] focus:outline-none focus:border-hunter resize-none bg-white" />
      </div>

      {error && (
        <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-hunter text-parchment py-5 font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {loading
          ? (isEdit ? 'Saving…' : 'Creating Invoice…')
          : (isEdit ? `Save Changes — £${total.toFixed(2)} →` : `Generate Invoice — £${total.toFixed(2)} →`)
        }
      </button>
    </form>
  )
}
