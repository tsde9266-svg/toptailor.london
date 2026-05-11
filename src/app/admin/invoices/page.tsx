import Link from 'next/link'
import { getAllInvoices } from '@/lib/kv'
import type { Invoice, InvoiceStatus } from '@/lib/kv'

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: 'Draft',
  sent:  'Sent',
  paid:  'Paid',
}
const STATUS_COLOR: Record<InvoiceStatus, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent:  'bg-blue-100 text-blue-700',
  paid:  'bg-green-100 text-green-800',
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short',
  })
}

function InvoiceCard({ inv }: { inv: Invoice }) {
  return (
    <Link
      href={`/admin/invoice/${inv.id}`}
      className="block border border-divider bg-white p-5 hover:border-hunter transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-1.5">
        <div>
          <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">{inv.number}</span>
          <p className="font-playfair text-[1.0625rem] text-charcoal">{inv.customer.name}</p>
        </div>
        <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 flex-shrink-0 ${STATUS_COLOR[inv.status]}`}>
          {STATUS_LABEL[inv.status]}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-sans text-[0.8125rem] text-muted">
          {inv.items.length} service{inv.items.length !== 1 ? 's' : ''} ·{' '}
          <span className={inv.status === 'paid' ? 'line-through' : 'text-hunter font-medium'}>
            £{inv.total}
          </span>
        </span>
        <span className="font-sans text-[0.6875rem] text-muted">{fmt(inv.createdAt)}</span>
      </div>
    </Link>
  )
}

export default async function InvoicesPage() {
  let invoices: Invoice[] = []
  let kvError = false

  try { invoices = await getAllInvoices() } catch { kvError = true }

  const outstanding = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0)
  const unpaidCount = invoices.filter(i => i.status !== 'paid').length

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-hunter text-parchment">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
            ← Orders
          </Link>
          <span className="font-playfair text-[1.0625rem]">Invoices</span>
          <Link href="/admin/invoice/new" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-parchment/40 px-3 py-1 transition-colors whitespace-nowrap">
            + New
          </Link>
        </div>
        <div className="border-t border-parchment/10 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          <Link href="/admin/vouchers" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/80 hover:text-parchment border border-parchment/30 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            Vouchers
          </Link>
          <Link href="/admin/pos" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/80 hover:text-parchment border border-amber-400/60 bg-amber-500/10 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            Quick Calc
          </Link>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">

        {/* Summary */}
        {!kvError && invoices.length > 0 && (
          <div className="border border-divider bg-white p-5 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">Outstanding</p>
              <p className="font-playfair text-[2rem] text-charcoal">£{outstanding}</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">Unpaid invoices</p>
              <p className="font-playfair text-[2rem] text-charcoal">{unpaidCount}</p>
            </div>
            <Link
              href="/admin/invoice/new"
              className="w-full lg:w-auto text-center bg-hunter text-parchment px-6 py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-[#1E3D17] transition-colors"
            >
              + New Invoice
            </Link>
          </div>
        )}

        <h1 className="font-playfair text-[1.75rem] mb-5">All Invoices</h1>

        {kvError && (
          <p className="font-sans text-[0.875rem] text-muted text-center py-16">
            Could not connect to storage. Check KV configuration.
          </p>
        )}

        {!kvError && invoices.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-[0.875rem] text-muted mb-6">No invoices yet.</p>
            <Link
              href="/admin/invoice/new"
              className="inline-block bg-hunter text-parchment px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors"
            >
              Create First Invoice →
            </Link>
          </div>
        )}

        {!kvError && invoices.length > 0 && (
          <div className="space-y-3">
            {invoices.map(inv => <InvoiceCard key={inv.id} inv={inv} />)}
          </div>
        )}
      </div>
    </div>
  )
}
