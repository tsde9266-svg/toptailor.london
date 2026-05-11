'use client'
import { useState } from 'react'
import type { Voucher, VoucherType } from '@/lib/kv'

const TYPE_LABEL: Record<VoucherType, string> = {
  return_customer: 'Return Customer',
  special:         'Special',
  general:         'General',
}

const TYPE_COLOR: Record<VoucherType, string> = {
  return_customer: 'bg-amber-100 text-amber-800',
  special:         'bg-purple-100 text-purple-800',
  general:         'bg-blue-100 text-blue-700',
}

const inputCls = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'
const labelCls = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-1.5 text-charcoal'

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
  initial,
  onSave,
  onCancel,
}: {
  initial: FormState
  onSave: (f: FormState) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  function set(k: keyof FormState, v: string) {
    setForm(p => ({ ...p, [k]: v }))
  }

  function autoCode() {
    if (!form.code && form.name) {
      const code = form.name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
      set('code', code)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setSaving(true)
    try {
      await onSave(form)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5 bg-white border border-divider">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Voucher Name *</label>
          <input
            required
            value={form.name}
            onChange={e => set('name', e.target.value)}
            onBlur={autoCode}
            placeholder="Summer Special"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Code * <span className="normal-case font-light tracking-normal">(customers won&apos;t see this)</span></label>
          <input
            required
            value={form.code}
            onChange={e => set('code', e.target.value.toUpperCase())}
            placeholder="SUMMER20"
            className={`${inputCls} font-mono tracking-widest`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Discount %  *</label>
          <input
            required
            type="number"
            min="1"
            max="100"
            value={form.discountPercent}
            onChange={e => set('discountPercent', e.target.value)}
            placeholder="20"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Type</label>
          <select
            value={form.type}
            onChange={e => set('type', e.target.value as VoucherType)}
            className={inputCls}
          >
            <option value="general">General</option>
            <option value="return_customer">Return Customer</option>
            <option value="special">Special</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Description <span className="normal-case font-light tracking-normal">(appears on invoice)</span></label>
        <input
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="e.g. Loyalty reward for returning customers"
          className={inputCls}
        />
      </div>

      {err && <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{err}</p>}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="bg-hunter text-parchment px-6 py-2.5 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Voucher'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-divider text-muted px-5 py-2.5 font-sans text-[0.75rem] uppercase tracking-widest hover:border-hunter hover:text-charcoal transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function VouchersClient({ initialVouchers }: { initialVouchers: Voucher[] }) {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers)
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleCreate(form: FormState) {
    const res = await fetch('/api/admin/vouchers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:            form.name,
        code:            form.code,
        description:     form.description || undefined,
        discountPercent: Number(form.discountPercent),
        type:            form.type,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? 'Failed')
    setVouchers(p => [data.voucher, ...p])
    setCreating(false)
  }

  async function handleEdit(voucher: Voucher, form: FormState) {
    const res = await fetch(`/api/admin/vouchers/${voucher.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:            form.name,
        code:            form.code,
        description:     form.description || undefined,
        discountPercent: Number(form.discountPercent),
        type:            form.type,
        isActive:        voucher.isActive,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? 'Failed')
    setVouchers(p => p.map(v => v.id === voucher.id ? data.voucher : v))
    setEditingId(null)
  }

  async function handleToggle(voucher: Voucher) {
    const res = await fetch(`/api/admin/vouchers/${voucher.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !voucher.isActive }),
    })
    const data = await res.json()
    if (res.ok) setVouchers(p => p.map(v => v.id === voucher.id ? data.voucher : v))
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
          <button
            onClick={() => setCreating(true)}
            className="bg-hunter text-parchment px-5 py-2 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors"
          >
            + New Voucher
          </button>
        )}
      </div>

      {/* Info box */}
      <div className="bg-sage border border-hunter/20 px-5 py-4 font-sans text-[0.8125rem] text-charcoal space-y-1">
        <p><strong>Vouchers</strong> are saved discounts you apply to invoices. <strong>Return Customer</strong> vouchers show a special loyalty message on the invoice.</p>
        <p className="text-muted">Tip: Create a <em>Return Customer 20%</em> voucher — then apply it to any second-order invoice with one click.</p>
      </div>

      {/* Create form */}
      {creating && (
        <VoucherForm
          initial={emptyForm()}
          onSave={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}

      {/* Voucher list */}
      {vouchers.length === 0 && !creating ? (
        <div className="text-center py-16">
          <p className="font-sans text-[0.875rem] text-muted mb-4">No vouchers yet.</p>
          <button
            onClick={() => setCreating(true)}
            className="bg-hunter text-parchment px-8 py-3 font-sans text-[0.75rem] uppercase tracking-widest hover:bg-[#1E3D17] transition-colors"
          >
            Create First Voucher →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {vouchers.map(v => (
            <div key={v.id}>
              {editingId === v.id ? (
                <VoucherForm
                  initial={{
                    name:            v.name,
                    code:            v.code,
                    description:     v.description ?? '',
                    discountPercent: String(v.discountPercent),
                    type:            v.type,
                  }}
                  onSave={form => handleEdit(v, form)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className={`border border-divider bg-white p-5 flex items-start justify-between gap-4 ${!v.isActive ? 'opacity-60' : ''}`}>
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
                    <p className="font-sans text-[0.6875rem] text-muted/60 mt-1">Used {v.usageCount} time{v.usageCount !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(v)}
                      className="font-sans text-[0.6875rem] uppercase tracking-widest border border-divider px-3 py-1.5 text-muted hover:border-hunter hover:text-charcoal transition-colors"
                    >
                      {v.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => setEditingId(v.id)}
                      className="font-sans text-[0.6875rem] uppercase tracking-widest border border-divider px-3 py-1.5 text-muted hover:border-hunter hover:text-charcoal transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v.id, v.name)}
                      disabled={deletingId === v.id}
                      className="font-sans text-[0.6875rem] uppercase tracking-widest border border-red-200 px-3 py-1.5 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {deletingId === v.id ? 'Deleting…' : 'Delete'}
                    </button>
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
