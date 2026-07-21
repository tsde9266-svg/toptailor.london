'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Voucher, Invoice } from '@/lib/kv'
import { VOUCHER_TYPE_LABEL as TYPE_LABEL, VOUCHER_TYPE_COLOR as TYPE_COLOR, VOUCHER_TYPE_BORDER as TYPE_BORDER } from '@/lib/constants'
import { services as SERVICE_CATALOGUE } from '@/data/services'
import { legacyToItemGroups } from '@/lib/invoice-groups'
import CustomerSearch from './CustomerSearch'

const GARMENTS = [
  'Trouser', 'Jeans', 'Jacket', 'Coat', 'Shirt', 'Dress', 'Wedding Dress',
  'Leather Jacket', 'Skirt', 'Ladies Suit', 'Jumpsuit', 'Playsuit',
  'Fur / Sheepskin Coat', 'Suede', 'Occasion Wear', 'Waistcoat', 'Other',
]

// Flat lookup: service name → price for auto-fill
const SERVICE_PRICE_MAP: Record<string, number> = Object.fromEntries(
  SERVICE_CATALOGUE.flatMap(cat => cat.items.filter(i => i.price > 0).map(i => [i.name, i.price]))
)

let _uid = 0
function uid() { return String(++_uid) }

// ── Working state: one entry per physical item, holding every service done to it ──
type UIService = { id: string; name: string; priceEach: number; appliesTo: number }
type UIGroup    = { id: string; garment: string; qty: number; services: UIService[] }

function fromInvoice(invoice: Invoice): UIGroup[] {
  const source = invoice.itemGroups?.length ? invoice.itemGroups : legacyToItemGroups(invoice.items)
  return source.map(g => ({
    id:      g.id,
    garment: g.garment,
    qty:     g.qty,
    services: g.services.map(s => ({ id: uid(), name: s.name, priceEach: s.priceEach, appliesTo: s.appliesTo })),
  }))
}

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'
const inputClass = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

function today() {
  const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString().split('T')[0]
}

// ── Service picker used both for the quick-add panel and "add another service" ──
function ServiceSelect({ value, custom, onChange, onCustomChange, selectRef }: {
  value: string; custom: string
  onChange: (v: string) => void; onCustomChange: (v: string) => void
  selectRef?: React.RefObject<HTMLSelectElement>
}) {
  return (
    <div>
      <select ref={selectRef} value={value}
        onChange={e => onChange(e.target.value)}
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
      {value === '__custom' && (
        <input value={custom} onChange={e => onCustomChange(e.target.value)}
          placeholder="Describe the service"
          className="mt-2 w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white" />
      )}
    </div>
  )
}

// ── Inline "add another service to this item" form ──────────────────────────
function AddServiceForm({ groupQty, onAdd, onCancel }: {
  groupQty: number
  onAdd: (s: { name: string; priceEach: number; appliesTo: number }) => void
  onCancel: () => void
}) {
  const [svc, setSvc]         = useState('')
  const [custom, setCustom]   = useState('')
  const [price, setPrice]     = useState<number | ''>('')
  const [appliesTo, setAppliesTo] = useState(groupQty)
  const selectRef = useRef<HTMLSelectElement>(null)

  function confirm() {
    const name = svc === '__custom' ? custom.trim() : svc.trim()
    if (!name) { selectRef.current?.focus(); return }
    onAdd({
      name,
      priceEach: price === '' ? 0 : Number(price),
      appliesTo: Math.min(Math.max(1, appliesTo || 1), groupQty),
    })
  }

  return (
    <div className="mt-3 pl-3 border-l-2 border-hunter/30 space-y-2.5">
      <ServiceSelect
        value={svc} custom={custom}
        onChange={v => { setSvc(v); const p = SERVICE_PRICE_MAP[v]; if (p) setPrice(p) }}
        onCustomChange={setCustom}
        selectRef={selectRef}
      />
      <div className="flex items-end gap-3 flex-wrap">
        <div className="w-32">
          <label className={labelClass}>Price each (£)</label>
          <input type="number" min="0" step="0.01" value={price}
            onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            onKeyDown={e => e.key === 'Enter' && confirm()}
            className="w-full border border-divider px-3 py-2 font-sans text-[0.875rem] focus:outline-none focus:border-hunter bg-white" />
        </div>
        {groupQty > 1 && (
          <div className="w-40">
            <label className={labelClass}>Applies to</label>
            <div className="flex items-center gap-1.5">
              <input type="number" min="1" max={groupQty} value={appliesTo}
                onChange={e => setAppliesTo(Number(e.target.value))}
                className="w-16 border border-divider px-2 py-2 font-sans text-[0.875rem] text-center focus:outline-none focus:border-hunter bg-white" />
              <span className="font-sans text-[0.8125rem] text-muted whitespace-nowrap">of {groupQty}</span>
            </div>
          </div>
        )}
        <div className="flex gap-2 ml-auto">
          <button type="button" onClick={confirm}
            className="bg-hunter text-parchment px-4 py-2 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-[#1E3D17] transition-colors">
            Add
          </button>
          <button type="button" onClick={onCancel}
            className="border border-divider text-muted px-4 py-2 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:border-red-300 hover:text-red-500 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
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
  const [groups,  setGroups]  = useState<UIGroup[]>(() => invoice ? fromInvoice(invoice) : [])
  const [notes,     setNotes]     = useState(invoice?.notes             ?? '')
  const [itemCount, setItemCount] = useState<number | ''>(invoice?.itemCount ?? '')
  const [payment,   setPayment]   = useState<'cash' | 'mobile'>(invoice?.paymentMethod ?? 'cash')
  const [dueDate, setDueDate] = useState(invoice?.dueDate          ?? today())
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [addingServiceTo, setAddingServiceTo] = useState<string | null>(null)

  const [addGarment,       setAddGarment]       = useState('Trouser')
  const [addGarmentCustom, setAddGarmentCustom] = useState('')
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
            // Merge repeat taps of the same service/garment/price into one item with qty > 1,
            // instead of leaving them as separate qty-1 rows that would undercount on display.
            const byKey = new Map<string, UIGroup>()
            for (const it of draft.items) {
              const garment = it.garment ?? ''
              const key = `${garment}::${it.name}::${it.price}`
              const existing = byKey.get(key)
              if (existing) {
                existing.qty += 1
                existing.services[0].appliesTo += 1
              } else {
                byKey.set(key, { id: uid(), garment, qty: 1, services: [{ id: uid(), name: it.name, priceEach: it.price, appliesTo: 1 }] })
              }
            }
            setGroups(Array.from(byKey.values()))
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

  function handleAddItem() {
    const svc = addService === '__custom' ? addCustomSvc.trim() : addService.trim()
    if (!svc) { serviceRef.current?.focus(); return }
    const qty = addQty === '' ? 1 : Number(addQty)
    if (qty < 1) return
    const garment = addGarment === 'Other' ? addGarmentCustom.trim() : addGarment
    const priceEach = addPrice === '' ? 0 : Number(addPrice)
    setGroups(p => [...p, {
      id: uid(), garment, qty,
      services: [{ id: uid(), name: svc, priceEach, appliesTo: qty }],
    }])
    setAddService(''); setAddCustomSvc(''); setAddPrice('')
    serviceRef.current?.focus()
  }

  function removeGroup(id: string) { setGroups(p => p.filter(g => g.id !== id)) }
  function setGroupGarment(id: string, garment: string) { setGroups(p => p.map(g => g.id === id ? { ...g, garment } : g)) }
  function setGroupQty(id: string, qty: number) {
    setGroups(p => p.map(g => g.id === id
      ? { ...g, qty, services: g.services.map(s => ({ ...s, appliesTo: Math.min(s.appliesTo, qty) })) }
      : g))
  }
  function removeService(groupId: string, serviceId: string) {
    setGroups(p => p.map(g => g.id === groupId ? { ...g, services: g.services.filter(s => s.id !== serviceId) } : g).filter(g => g.services.length > 0))
  }
  function addServiceToGroup(groupId: string, s: { name: string; priceEach: number; appliesTo: number }) {
    setGroups(p => p.map(g => g.id === groupId ? { ...g, services: [...g.services, { id: uid(), ...s }] } : g))
    setAddingServiceTo(null)
  }

  const subtotal = groups.reduce((sum, g) => sum + g.services.reduce((s, sv) => s + sv.priceEach * sv.appliesTo, 0), 0)
  const totalQty = groups.reduce((sum, g) => sum + g.qty, 0)
  const effectivePct = discountMode === 'voucher'
    ? (selectedVoucher?.discountPercent ?? (isEdit && invoice?.discountPercent ? invoice.discountPercent : 0))
    : (discountMode === 'manual' ? (Number(discountPercent) || 0) : 0)
  const discountAmt  = effectivePct > 0 ? Math.round(subtotal * effectivePct) / 100 : 0
  const total        = Math.max(0, subtotal - discountAmt)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim())      { setError('Customer name is required.'); return }
    if (groups.length === 0) { setError('Add at least one item.'); return }
    for (const g of groups) {
      if (!g.garment.trim()) { setError('Every item needs a name, e.g. "Trouser".'); return }
      for (const s of g.services) {
        if (!s.name.trim()) { setError('Each service needs a name.'); return }
        if (s.priceEach < 0) { setError('Prices cannot be negative.'); return }
      }
    }

    const itemGroups = groups.map(g => ({
      id:      g.id,
      garment: g.garment.trim(),
      qty:     g.qty,
      services: g.services.map(s => ({ name: s.name.trim(), priceEach: s.priceEach, appliesTo: s.appliesTo })),
    }))

    const payload = {
      customer: { name, email: email || undefined, phone: phone || undefined, address: address || undefined },
      itemGroups,
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
            {addGarment === 'Other' && (
              <input value={addGarmentCustom} onChange={e => setAddGarmentCustom(e.target.value)}
                placeholder="Describe the item, e.g. Black Trouser"
                className="mt-2 w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white" />
            )}
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
          <ServiceSelect
            value={addService} custom={addCustomSvc}
            onChange={v => { setAddService(v); const p = SERVICE_PRICE_MAP[v]; if (p) setAddPrice(p) }}
            onCustomChange={setAddCustomSvc}
            selectRef={serviceRef}
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
          <div>
            <label className={labelClass}>Price per item (£)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-muted pointer-events-none">£</span>
              <input ref={priceRef} type="number" min="0" step="0.01" value={addPrice}
                onChange={e => setAddPrice(e.target.value === '' ? '' : Number(e.target.value))}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem() } }}
                placeholder="0"
                className="w-full border border-divider pl-7 pr-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white" />
            </div>
            {addQty !== '' && addPrice !== '' && Number(addQty) > 1 && (
              <p className="font-sans text-[0.75rem] text-muted mt-1.5">
                {addQty} × £{Number(addPrice).toFixed(2)} = <span className="text-hunter font-medium">£{(Number(addQty) * Number(addPrice)).toFixed(2)}</span>
              </p>
            )}
          </div>
          <button type="button" onClick={handleAddItem}
            className="bg-hunter text-parchment px-6 py-2.5 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors whitespace-nowrap">
            + Add Item
          </button>
        </div>
        <p className="font-sans text-[0.75rem] text-muted mt-3">
          Need another service on an item you already added? Use &ldquo;+ Add service&rdquo; on that item below instead of adding it here again.
        </p>
      </div>

      {/* ── Items List ──────────────────────────────────────────────── */}
      {groups.length > 0 ? (
        <div className="border border-divider bg-white">
          <div className="px-6 py-4 border-b border-divider flex items-center justify-between">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Invoice Items</p>
            <p className="font-sans text-[0.75rem] text-muted">
              {totalQty} item{totalQty !== 1 ? 's' : ''}&nbsp;·&nbsp;
              <span className="font-medium text-charcoal">£{subtotal.toFixed(2)}</span>
            </p>
          </div>

          <div className="divide-y divide-divider">
            {groups.map((group, gi) => (
              <div key={group.id} className="px-6 py-4">
                <div className="flex items-start gap-2 mb-2.5">
                  <span className="font-sans text-[0.75rem] text-muted mt-1.5 flex-shrink-0">{gi + 1} ·</span>
                  <input value={group.garment} onChange={e => setGroupGarment(group.id, e.target.value)}
                    placeholder="Item name, e.g. Trouser"
                    className="font-playfair text-[0.9375rem] font-medium text-charcoal border-b border-transparent hover:border-divider focus:border-hunter focus:outline-none bg-transparent flex-1 min-w-0 py-0.5" />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="font-sans text-[0.75rem] text-muted">qty</span>
                    <input type="number" min="1" value={group.qty}
                      onChange={e => setGroupQty(group.id, Math.max(1, Number(e.target.value) || 1))}
                      className="w-14 border border-divider px-1.5 py-1 font-sans text-[0.8125rem] text-center focus:outline-none focus:border-hunter bg-white" />
                  </div>
                  <button type="button" onClick={() => removeGroup(group.id)}
                    className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-500 transition-colors shrink-0" aria-label="Remove item">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="space-y-2 pl-5">
                  {group.services.map(s => (
                    <div key={s.id} className="flex items-center gap-3">
                      <span className="font-sans text-[0.875rem] text-muted flex-1">
                        {s.name}
                        {group.qty > 1 && s.appliesTo < group.qty && (
                          <span className="text-hunter"> — {s.appliesTo} of {group.qty}</span>
                        )}
                      </span>
                      <span className="font-sans text-[0.875rem] text-charcoal whitespace-nowrap">
                        {s.appliesTo > 1
                          ? `£${s.priceEach.toFixed(2)} × ${s.appliesTo} = £${(s.priceEach * s.appliesTo).toFixed(2)}`
                          : `£${s.priceEach.toFixed(2)}`}
                      </span>
                      <button type="button" onClick={() => removeService(group.id, s.id)}
                        className="w-6 h-6 flex items-center justify-center text-muted hover:text-red-500 transition-colors shrink-0" aria-label="Remove service">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}

                  {addingServiceTo === group.id ? (
                    <AddServiceForm
                      groupQty={group.qty}
                      onAdd={s => addServiceToGroup(group.id, s)}
                      onCancel={() => setAddingServiceTo(null)}
                    />
                  ) : (
                    <button type="button" onClick={() => setAddingServiceTo(group.id)}
                      className="font-sans text-[0.75rem] text-hunter hover:underline mt-1">
                      + Add service to this item
                    </button>
                  )}
                </div>
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
                  <button type="button" onClick={() => { setDiscountMode('none'); setSelectedVoucher(null); setDiscountPercent('') }}
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
                      <button key={v.id} type="button" onClick={() => { setSelectedVoucher(v); setDiscountMode('voucher'); setDiscountPercent('') }}
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
          <p className="font-sans text-[0.875rem] text-muted">No items yet — use the panel above to add items.</p>
        </div>
      )}

      {/* ── Customer ────────────────────────────────────────────────── */}
      <div className="border border-divider bg-white p-6 space-y-5">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Customer</p>
        {!isEdit && (
          <CustomerSearch onSelect={c => {
            setName(c.name)
            setEmail(c.email)
            setPhone(c.phone)
            setAddress(c.address)
          }} />
        )}
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
          placeholder={totalQty > 0 ? String(totalQty) : 'e.g. 4'}
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
