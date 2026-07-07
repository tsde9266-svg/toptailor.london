'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Voucher, Invoice } from '@/lib/kv'
import { VOUCHER_TYPE_LABEL as TYPE_LABEL, VOUCHER_TYPE_COLOR as TYPE_COLOR, VOUCHER_TYPE_BORDER as TYPE_BORDER } from '@/lib/constants'
import { services as SERVICE_CATALOGUE } from '@/data/services'

const GARMENTS = ['Trouser', 'Jeans', 'Jacket', 'Coat', 'Shirt', 'Dress', 'Wedding Dress', 'Leather Jacket', 'Skirt', 'Ladies Suit', 'Jumpsuit', 'Waistcoat', 'Other']

// Flat lookup: service name → price for auto-fill
const SERVICE_PRICE_MAP: Record<string, number> = Object.fromEntries(
  SERVICE_CATALOGUE.flatMap(cat => cat.items.filter(i => i.price > 0).map(i => [i.name, i.price]))
)

let _uid = 0
function uid() { return String(++_uid) }

type GarmentRow = {
  id:        string
  garment:   string
  qty:       number
  service:   string
  price:     number
  priceEach: number
}

function fromInvoiceItems(items: Invoice['items']): GarmentRow[] {
  return items.map((item, i) => {
    if (item.garment) {
      return { id: String(i), garment: item.garment, qty: item.qty ?? 1, service: item.name, price: item.price, priceEach: item.priceEach ?? item.price }
    }
    const match = item.name.match(/^(\d+)[×x]\s*(.+?)(?:\s+[—\-]\s+(.+))?$/)
    if (match && item.qty) {
      return { id: String(i), garment: match[2].trim(), qty: item.qty, service: (match[3] ?? match[2]).trim(), price: item.price, priceEach: item.priceEach ?? item.price }
    }
    return { id: String(i), garment: '', qty: 1, service: item.name, price: item.price, priceEach: item.price }
  })
}

type Group = { key: string; garment: string; qty: number; rows: GarmentRow[] }

function groupRows(rows: GarmentRow[]): Group[] {
  const seen = new Set<string>()
  const order: string[] = []
  const groups: Record<string, Group> = {}
  for (const row of rows) {
    const key = row.garment ? `${row.garment}::${row.qty}` : `__free::${row.id}`
    if (!seen.has(key)) { seen.add(key); order.push(key); groups[key] = { key, garment: row.garment, qty: row.qty, rows: [] } }
    groups[key].rows.push(row)
  }
  return order.map(k => groups[k])
}

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'
const inputClass = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

function today() {
  const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString().split('T')[0]
}

type Props = { invoice?: Invoice }

export default function NewInvoiceForm({ invoice }: Props) {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const isEdit        = !!invoice

  const [name,    setName]    = useState(invoice?.customer.name    ?? searchParams.get('name')    ?? '')
  const [email,   setEmail]   = useState(invoice?.customer.email   ?? searchParams.get('email')   ?? '')
  const [phone,   setPhone]   = useState(invoice?.customer.phone   ?? searchParams.get('phone')   ?? '')
  const [address, setAddress] = useState(invoice?.customer.address ?? searchParams.get('address') ?? '')
  const [rows,    setRows]    = useState<GarmentRow[]>(() => invoice ? fromInvoiceItems(invoice.items) : [])
  const [notes,     setNotes]     = useState(invoice?.notes             ?? '')
  const [itemCount, setItemCount] = useState<number | ''>(invoice?.itemCount ?? '')
  const [payment,   setPayment]   = useState<'cash' | 'mobile'>(invoice?.paymentMethod ?? 'cash')
  const [dueDate, setDueDate] = useState(invoice?.dueDate          ?? today())
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const [addGarment,   setAddGarment]   = useState('Trouser')
  const [addQty,       setAddQty]       = useState<number | ''>(1)
  const [addService,   setAddService]   = useState('')
  const [addCustomSvc, setAddCustomSvc] = useState('')
  const [addPrice,     setAddPrice]     = useState<number | ''>('')
  const serviceRef = useRef<HTMLSelectElement>(null)
  const priceRef   = useRef<HTMLInputElement>(null)

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
          const draft = JSON.parse(raw) as {
            items: Array<{ name: string; price: number; garment?: string }>
            discountPercent: number
            customer?: { name: string; email: string; phone: string; address: string }
          }
          if (Array.isArray(draft.items) && draft.items.length > 0) {
            setRows(draft.items.map(i => ({ id: uid(), garment: i.garment ?? '', qty: 1, service: i.name, price: i.price, priceEach: i.price })))
          }
          if (draft.discountPercent > 0) { setDiscountMode('manual'); setDiscountPercent(draft.discountPercent) }
          if (draft.customer?.name)    setName(draft.customer.name)
          if (draft.customer?.email)   setEmail(draft.customer.email)
          if (draft.customer?.phone)   setPhone(draft.customer.phone)
          if (draft.customer?.address) setAddress(draft.customer.address)
          sessionStorage.removeItem('pos_draft')
        }
      } catch { /* ignore */ }
    }
    fetch('/api/admin/vouchers')
      .then(r => r.json())
      .then((data: Voucher[]) => { setVouchers(Array.isArray(data) ? data.filter(v => v.isActive) : []); setVouchersLoaded(true) })
      .catch(() => setVouchersLoaded(true))
  }, [isEdit])

  function handleAdd() {
    const svc = addService === '__custom' ? addCustomSvc.trim() : addService.trim()
    if (!svc) { serviceRef.current?.focus(); return }
    const qty  = addQty === '' ? 1 : Number(addQty)
    if (qty < 1) return
    const each = addPrice === '' ? 0 : Number(addPrice)
    setRows(p => [...p, { id: uid(), garment: addGarment, qty, service: svc, price: qty * each, priceEach: each }])
    setAddService(''); setAddCustomSvc(''); setAddPrice('')
    serviceRef.current?.focus()
  }

  function removeRow(id: string) { setRows(p => p.filter(r => r.id !== id)) }
  function selectVoucher(v: Voucher) { setSelectedVoucher(v); setDiscountMode('voucher'); setDiscountPercent('') }
  function clearDiscount()           { setDiscountMode('none'); setSelectedVoucher(null); setDiscountPercent('') }

  const subtotal     = rows.reduce((s, r) => s + r.price, 0)
  const effectivePct = discountMode === 'voucher'
    ? (selectedVoucher?.discountPercent ?? (isEdit && invoice?.discountPercent ? invoice.discountPercent : 0))
    : (discountMode === 'manual' ? (Number(discountPercent) || 0) : 0)
  const discountAmt  = effectivePct > 0 ? Math.round(subtotal * effectivePct) / 100 : 0
  const total        = Math.max(0, subtotal - discountAmt)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim())     { setError('Customer name is required.'); return }
    if (rows.length === 0) { setError('Add at least one service.'); return }
    for (const r of rows) {
      if (!r.service.trim()) { setError('Each item needs a service name.'); return }
      if (r.price < 0)       { setError('Prices cannot be negative.'); return }
    }

    const payload = {
      customer: { name, email: email || undefined, phone: phone || undefined, address: address || undefined },
      items:    rows.map(r => ({
        name:      r.service,
        price:     r.price,
        qty:       r.qty,
        priceEach: r.priceEach,
        garment:   r.garment || undefined,
      })),
      discountPercent: effectivePct > 0 ? effectivePct : undefined,
      voucherId:       discountMode === 'voucher' ? selectedVoucher?.id : undefined,
      notes:           notes || undefined,
      itemCount:       itemCount !== '' ? Number(itemCount) : undefined,
      paymentMethod:   payment,
      dueDate,
    }

    setLoading(true)
    try {
      const url    = isEdit ? `/api/admin/invoice/${invoice!.id}/edit` : '/api/admin/invoice'
      const method = isEdit ? 'PATCH' : 'POST'
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data   = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'Failed to save invoice.'); return }
      router.push(`/admin/invoice/${isEdit ? invoice!.id : data.id}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const groups       = groupRows(rows)
  const serviceCount = rows.length

  return (
    <form onSubmit={submit} className="space-y-6 max-w-2xl mx-auto">

      {/* ── Quick Add ───────────────────────────────────────────────── */}
      <div className="border border-divider bg-white p-6">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-5">Add Item</p>

        <div className="grid grid-cols-[1fr_80px] gap-3 mb-3">
          <div>
            <label className={labelClass}>Garment</label>
            <select value={addGarment} onChange={e => setAddGarment(e.target.value)}
              className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white">
              {GARMENTS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Qty</label>
            <input type="number" min="1" step="1" value={addQty}
              onChange={e => setAddQty(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] text-center focus:outline-none focus:border-hunter bg-white" />
          </div>
        </div>

        <div className="mb-3">
          <label className={labelClass}>Service</label>
          <select ref={serviceRef} value={addService}
            onChange={e => {
              const svc = e.target.value
              setAddService(svc)
              if (svc && svc !== '__custom') {
                const known = SERVICE_PRICE_MAP[svc]
                if (known) setAddPrice(known)
              }
            }}
            className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white text-charcoal">
            <option value="">Select service…</option>
            {SERVICE_CATALOGUE.map(cat => (
              <optgroup key={cat.id} label={cat.name}>
                {cat.items.map(s => (
                  <option key={s.id} value={s.name}>
                    {s.name}{s.price > 0 ? ` — £${s.price}${s.note === 'from' ? '+' : ''}` : ' — Quote'}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="__custom">Custom…</option>
          </select>
          {addService === '__custom' && (
            <input value={addCustomSvc} onChange={e => setAddCustomSvc(e.target.value)}
              placeholder="Describe the service"
              className="mt-2 w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white" />
          )}
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
          <div>
            <label className={labelClass}>Price per item (£)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-muted pointer-events-none">£</span>
              <input ref={priceRef} type="number" min="0" step="0.01" value={addPrice}
                onChange={e => setAddPrice(e.target.value === '' ? '' : Number(e.target.value))}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
                placeholder="0"
                className="w-full border border-divider pl-7 pr-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white" />
            </div>
            {addQty !== '' && addPrice !== '' && Number(addQty) > 1 && (
              <p className="font-sans text-[0.75rem] text-muted mt-1.5">
                {addQty} × £{Number(addPrice).toFixed(2)} = <span className="text-hunter font-medium">£{(Number(addQty) * Number(addPrice)).toFixed(2)}</span>
              </p>
            )}
          </div>
          <button type="button" onClick={handleAdd}
            className="bg-hunter text-parchment px-6 py-2.5 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors whitespace-nowrap">
            + Add
          </button>
        </div>
      </div>

      {/* ── Items List ──────────────────────────────────────────────── */}
      {rows.length > 0 ? (
        <div className="border border-divider bg-white">
          <div className="px-6 py-4 border-b border-divider flex items-center justify-between">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Invoice Items</p>
            <p className="font-sans text-[0.75rem] text-muted">
              {serviceCount} service{serviceCount !== 1 ? 's' : ''}&nbsp;·&nbsp;
              <span className="font-medium text-charcoal">£{subtotal.toFixed(2)}</span>
            </p>
          </div>

          <div className="divide-y divide-divider">
            {groups.map(group => (
              <div key={group.key} className="px-6 py-4">
                {group.garment ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-2.5">
                      <span className="font-playfair text-[0.9375rem] font-medium text-charcoal">{group.garment}</span>
                      {group.qty > 1 && <span className="font-sans text-[0.75rem] text-muted">× {group.qty}</span>}
                    </div>
                    <div className="space-y-2">
                      {group.rows.map(row => (
                        <div key={row.id} className="flex items-center gap-3 pl-3">
                          <span className="font-sans text-[0.875rem] text-muted flex-1">{row.service}</span>
                          <span className="font-sans text-[0.875rem] text-charcoal whitespace-nowrap">
                            {row.qty > 1
                              ? `£${row.priceEach.toFixed(2)} × ${row.qty} = £${row.price.toFixed(2)}`
                              : `£${row.price.toFixed(2)}`}
                          </span>
                          <button type="button" onClick={() => removeRow(row.id)}
                            className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-500 transition-colors shrink-0" aria-label="Remove">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    {group.rows.map(row => (
                      <div key={row.id} className="flex items-center gap-3">
                        <span className="font-sans text-[0.875rem] text-charcoal flex-1">{row.service}</span>
                        <span className="font-sans text-[0.875rem] text-charcoal whitespace-nowrap">£{row.price.toFixed(2)}</span>
                        <button type="button" onClick={() => removeRow(row.id)}
                          className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-500 transition-colors shrink-0" aria-label="Remove">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Discount */}
          <div className="px-6 py-5 border-t border-divider space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Discount</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setDiscountMode('manual'); setSelectedVoucher(null) }}
                  className={`font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border transition-colors ${discountMode === 'manual' ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter'}`}>
                  Manual %
                </button>
                <button type="button" onClick={() => { setDiscountMode('voucher'); setDiscountPercent('') }}
                  className={`font-sans text-[0.6875rem] uppercase tracking-widest px-3 py-1.5 border transition-colors ${discountMode === 'voucher' ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter'}`}>
                  Voucher
                </button>
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
                  <input type="number" min="1" max="100" value={discountPercent}
                    onChange={e => setDiscountPercent(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="20"
                    className="input-line font-sans text-[0.9rem] w-20 text-center" />
                  <span className="font-sans text-[0.9rem] text-muted">%</span>
                </div>
                {effectivePct > 0 && (
                  <span className="font-sans text-[0.8125rem] text-hunter">= −£{discountAmt.toFixed(2)}</span>
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
                        className={`text-left p-3 border-2 transition-all ${selectedVoucher?.id === v.id ? 'border-hunter bg-hunter/5' : `${TYPE_BORDER[v.type]} hover:border-hunter`}`}>
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
                      ✓ {selectedVoucher.name} — {selectedVoucher.discountPercent}% off = −£{discountAmt.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Running total */}
          <div className="px-6 py-5 border-t border-divider bg-[#FDFAF6] space-y-1">
            {discountAmt > 0 && (
              <>
                <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
                  <span>Subtotal</span><span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
                  <span>Discount ({effectivePct}%{discountMode === 'voucher' && selectedVoucher ? ` · ${selectedVoucher.code}` : ''})</span>
                  <span>−£{discountAmt.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total</span>
              <span className="font-playfair text-[1.75rem] text-hunter">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-divider py-10 text-center">
          <p className="font-sans text-[0.875rem] text-muted">No items yet — use the panel above to add services.</p>
        </div>
      )}

      {/* ── Customer ────────────────────────────────────────────────── */}
      <div className="border border-divider bg-white p-6 space-y-5">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Customer</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="James Wilson" />
          </div>
          <div>
            <label className={labelClass}>Phone <span className="normal-case font-light tracking-normal">(optional)</span></label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="+44 7000 000000" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email <span className="normal-case font-light tracking-normal">(optional)</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="james@email.com" />
          </div>
          <div>
            <label className={labelClass}>Address <span className="normal-case font-light tracking-normal">(optional)</span></label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputClass} placeholder="14 Belgravia Square, SW1X 8PH" />
          </div>
        </div>
      </div>

      {/* ── Payment ─────────────────────────────────────────────────── */}
      <div className="border border-divider bg-white p-6 space-y-5">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Payment</p>
        <div>
          <label className={labelClass}>Method</label>
          <div className="flex flex-wrap gap-2">
            {([{ id: 'cash', label: 'Cash / Pay on Day' }, { id: 'mobile', label: 'Mobile / NFC' }] as const).map(m => (
              <button key={m.id} type="button" onClick={() => setPayment(m.id)}
                className={`font-sans text-[0.75rem] uppercase tracking-widest px-4 py-2 border transition-colors ${payment === m.id ? 'bg-hunter text-parchment border-hunter' : 'border-divider text-muted hover:border-hunter hover:text-charcoal'}`}>
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

      {/* ── Notes ───────────────────────────────────────────────────── */}
      <div className="border border-divider bg-white p-6">
        <label className={labelClass}>Note for customer <span className="normal-case font-light tracking-normal">(optional)</span></label>
        <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Your jacket required specialist thread — adjusted accordingly."
          className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9rem] focus:outline-none focus:border-hunter resize-none bg-white" />
      </div>

      {/* ── Items to Collect ────────────────────────────────────────── */}
      <div className="border border-hunter/40 bg-hunter/5 p-6">
        <label className="block font-sans text-[0.75rem] uppercase tracking-widest mb-1 text-hunter">
          Items to Collect
        </label>
        <p className="font-sans text-[0.75rem] text-muted mb-3">
          How many garments are you physically picking up? This appears on the invoice as a reference count.
        </p>
        <input
          type="number" min="1" step="1"
          value={itemCount}
          onChange={e => setItemCount(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g. 4"
          className="w-32 border border-hunter/30 px-3 py-2.5 font-sans text-[1.125rem] font-medium text-center text-hunter focus:outline-none focus:border-hunter bg-white"
        />
      </div>

      {error && (
        <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-hunter text-parchment py-5 font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {loading
          ? (isEdit ? 'Saving…' : 'Generating…')
          : (isEdit ? `Save — £${total.toFixed(2)} →` : `Generate Invoice — £${total.toFixed(2)} →`)
        }
      </button>
    </form>
  )
}
