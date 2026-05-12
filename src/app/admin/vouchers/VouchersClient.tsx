'use client'
import { useState } from 'react'
import type { Voucher, VoucherType } from '@/lib/kv'
import { VOUCHER_TYPE_LABEL as TYPE_LABEL, VOUCHER_TYPE_COLOR as TYPE_COLOR } from '@/lib/constants'

const inputCls = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'
const labelCls = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-1.5 text-charcoal'

// ── Voucher create/edit form ──────────────────────────────────────────────────
type FormState = {
  name: string
  code: string
  description: string
  discountPercent: string
  type: VoucherType
}

const emptyForm = (): FormState => ({
  name: '', code: '', description: '', discountPercent: '', type: 'general',
})

function VoucherForm({
  initial, onSave, onCancel,
}: {
  initial: FormState
  onSave: (f: FormState) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  function set(k: keyof FormState, v: string) { setForm(p => ({ ...p, [k]: v })) }

  function autoCode() {
    if (!form.code && form.name) {
      set('code', form.name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setSaving(true)
    try { await onSave(form) }
    catch (e) { setErr(e instanceof Error ? e.message : 'Error saving') }
    finally   { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-white border border-divider">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Voucher Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} onBlur={autoCode}
            placeholder="Summer Special" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Code * <span className="normal-case font-light tracking-normal">(customers won&apos;t see this)</span></label>
          <input required value={form.code} onChange={e => set('code', e.target.value.toUpperCase())}
            placeholder="SUMMER20" className={`${inputCls} font-mono tracking-widest`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Discount % *</label>
          <input required type="number" min="1" max="100" value={form.discountPercent}
            onChange={e => set('discountPercent', e.target.value)} placeholder="20" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value as VoucherType)} className={inputCls}>
            <option value="general">General</option>
            <option value="return_customer">Return Customer</option>
            <option value="special">Special</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Description <span className="normal-case font-light tracking-normal">(appears on invoice)</span></label>
        <input value={form.description} onChange={e => set('description', e.target.value)}
          placeholder="e.g. Loyalty reward for returning customers" className={inputCls} />
      </div>

      {err && <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{err}</p>}

      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={saving}
          className="bg-hunter text-parchment px-6 py-2.5 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors disabled:opacity-60">
          {saving ? 'Saving…' : 'Save Voucher'}
        </button>
        <button type="button" onClick={onCancel}
          className="border border-divider text-muted px-5 py-2.5 font-sans text-[0.75rem] uppercase tracking-widest hover:border-hunter hover:text-charcoal transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── Send-to-customer inline form ──────────────────────────────────────────────
function SendForm({ voucherId, voucherName, onDone }: {
  voucherId:   string
  voucherName: string
  onDone:      () => void
}) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [err,     setErr]     = useState('')

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setSending(true)
    try {
      const res  = await fetch(`/api/admin/vouchers/${voucherId}/send`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ customerName: name, customerEmail: email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send')
      setSent(true)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Send failed')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="border border-hunter/30 bg-sage px-5 py-4">
        <p className="font-sans text-[0.875rem] text-hunter font-medium mb-1">
          ✓ Voucher sent to {email}
        </p>
        <p className="font-sans text-[0.8125rem] text-muted mb-3">
          {name} will receive a branded email with the <strong>{voucherName}</strong> voucher code.
        </p>
        <button onClick={onDone}
          className="font-sans text-[0.6875rem] uppercase tracking-widest border border-divider px-4 py-1.5 text-muted hover:border-hunter hover:text-charcoal transition-colors">
          Done
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSend} className="border border-divider bg-[#FAFAF7] px-5 py-4 space-y-4">
      <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">
        Send <strong className="text-charcoal">{voucherName}</strong> voucher to customer
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Customer Name *</label>
          <input required type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Sarah Ahmed" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Customer Email *</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="sarah@email.com" className={inputCls} />
        </div>
      </div>

      {/* Preview of what gets sent */}
      <div className="bg-white border border-divider px-4 py-3 font-sans text-[0.8125rem] text-muted">
        <p className="font-medium text-charcoal mb-0.5">What the customer receives:</p>
        <p>A branded email with the voucher code, the discount amount, and a &ldquo;Book Online Now&rdquo; button. The email includes the terms: <em>&ldquo;This voucher is only applicable when making a booking online through the website.&rdquo;</em></p>
      </div>

      {err && <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{err}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={sending}
          className="bg-hunter text-parchment px-6 py-2.5 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors disabled:opacity-60">
          {sending ? 'Sending…' : 'Send Voucher Email'}
        </button>
        <button type="button" onClick={onDone}
          className="border border-divider text-muted px-5 py-2.5 font-sans text-[0.75rem] uppercase tracking-widest hover:border-hunter hover:text-charcoal transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── Main list component ───────────────────────────────────────────────────────
export default function VouchersClient({ initialVouchers }: { initialVouchers: Voucher[] }) {
  const [vouchers,     setVouchers]    = useState<Voucher[]>(initialVouchers)
  const [creating,     setCreating]    = useState(false)
  const [editingId,    setEditingId]   = useState<string | null>(null)
  const [deletingId,   setDeletingId]  = useState<string | null>(null)
  const [sendingId,    setSendingId]   = useState<string | null>(null)
  const [toggleError,  setToggleError] = useState<string | null>(null)

  async function handleCreate(form: FormState) {
    const res  = await fetch('/api/admin/vouchers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name, code: form.code,
        description: form.description || undefined,
        discountPercent: Number(form.discountPercent), type: form.type,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? 'Failed')
    setVouchers(p => [data.voucher, ...p])
    setCreating(false)
  }

  async function handleEdit(voucher: Voucher, form: FormState) {
    const res  = await fetch(`/api/admin/vouchers/${voucher.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name, code: form.code,
        description: form.description || undefined,
        discountPercent: Number(form.discountPercent), type: form.type,
        isActive: voucher.isActive,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? 'Failed')
    setVouchers(p => p.map(v => v.id === voucher.id ? data.voucher : v))
    setEditingId(null)
  }

  async function handleToggle(voucher: Voucher) {
    setToggleError(null)
    const res  = await fetch(`/api/admin/vouchers/${voucher.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !voucher.isActive }),
    })
    const data = await res.json()
    if (res.ok) setVouchers(p => p.map(v => v.id === voucher.id ? data.voucher : v))
    else        setToggleError(data.error ?? 'Failed to update voucher. Please try again.')
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete voucher "${name}"? This cannot be undone.`)) return
    setDeletingId(id)
    const res = await fetch(`/api/admin/vouchers/${id}`, { method: 'DELETE' })
    if (res.ok) setVouchers(p => p.filter(v => v.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-playfair text-[1.75rem]">Vouchers</h1>
        {!creating && (
          <button onClick={() => setCreating(true)}
            className="bg-hunter text-parchment px-5 py-2 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors">
            + New Voucher
          </button>
        )}
      </div>

      <div className="bg-sage border border-hunter/20 px-5 py-4 font-sans text-[0.8125rem] text-charcoal space-y-1">
        <p><strong>Vouchers</strong> — create discounts and send them directly to customers by email. <strong>Return Customer</strong> vouchers include a personalised loyalty message.</p>
        <p className="text-muted">Hit <em>Send to Customer</em> on any voucher to email a beautifully designed voucher card directly to their inbox.</p>
      </div>

      {toggleError && (
        <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{toggleError}</p>
      )}

      {creating && (
        <VoucherForm initial={emptyForm()} onSave={handleCreate} onCancel={() => setCreating(false)} />
      )}

      {vouchers.length === 0 && !creating ? (
        <div className="text-center py-16">
          <p className="font-sans text-[0.875rem] text-muted mb-4">No vouchers yet.</p>
          <button onClick={() => setCreating(true)}
            className="bg-hunter text-parchment px-8 py-3 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors">
            Create First Voucher →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {vouchers.map(v => (
            <div key={v.id}>
              {editingId === v.id ? (
                <VoucherForm
                  initial={{ name: v.name, code: v.code, description: v.description ?? '', discountPercent: String(v.discountPercent), type: v.type }}
                  onSave={form => handleEdit(v, form)}
                  onCancel={() => setEditingId(null)}
                />
              ) : sendingId === v.id ? (
                <SendForm
                  voucherId={v.id}
                  voucherName={v.name}
                  onDone={() => setSendingId(null)}
                />
              ) : (
                <div className={`border border-divider bg-white p-5 ${!v.isActive ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-playfair text-[1.0625rem] text-charcoal">{v.name}</span>
                        <span className={`font-sans text-[0.625rem] font-medium uppercase tracking-wider px-2 py-0.5 ${TYPE_COLOR[v.type]}`}>
                          {TYPE_LABEL[v.type]}
                        </span>
                        {!v.isActive && (
                          <span className="font-sans text-[0.625rem] uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-500">Inactive</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <code className="font-mono text-[0.8125rem] bg-parchment px-2 py-0.5 text-charcoal border border-divider">{v.code}</code>
                        <span className="font-sans text-[0.875rem] text-hunter font-semibold">{v.discountPercent}% off</span>
                      </div>
                      {v.description && (
                        <p className="font-sans text-[0.8125rem] text-muted mt-1">{v.description}</p>
                      )}
                      <p className="font-sans text-[0.6875rem] text-muted/60 mt-1">Sent {v.usageCount} time{v.usageCount !== 1 ? 's' : ''}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => { setSendingId(v.id); setEditingId(null) }}
                        disabled={!v.isActive}
                        className="font-sans text-[0.6875rem] uppercase tracking-widest border border-hunter/50 px-3 py-1.5 text-hunter hover:bg-hunter hover:text-parchment transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ✉ Send to Customer
                      </button>
                      <button onClick={() => handleToggle(v)}
                        className="font-sans text-[0.6875rem] uppercase tracking-widest border border-divider px-3 py-1.5 text-muted hover:border-hunter hover:text-charcoal transition-colors">
                        {v.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => { setEditingId(v.id); setSendingId(null) }}
                        className="font-sans text-[0.6875rem] uppercase tracking-widest border border-divider px-3 py-1.5 text-muted hover:border-hunter hover:text-charcoal transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(v.id, v.name)} disabled={deletingId === v.id}
                        className="font-sans text-[0.6875rem] uppercase tracking-widest border border-red-200 px-3 py-1.5 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
                        {deletingId === v.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
