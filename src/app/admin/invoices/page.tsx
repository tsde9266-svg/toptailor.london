import Link from 'next/link'
import { getAllInvoices } from '@/lib/kv'
import type { Invoice, InvoiceStatus } from '@/lib/kv'
import InvoiceDeleteButton from './InvoiceDeleteButton'

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
    <div className="flex items-stretch border border-divider bg-white hover:border-hunter transition-colors duration-200">
      <Link
        href={`/admin/invoice/${inv.id}`}
        className="flex-1 block p-5"
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
            {inv.itemCount != null && (
              <span className="ml-2 inline-flex items-center gap-1 font-sans text-[0.6875rem] uppercase tracking-widest bg-hunter/10 text-hunter px-2 py-0.5">
                {inv.itemCount} item{inv.itemCount !== 1 ? 's' : ''}
              </span>
            )}
          </span>
          <span className="font-sans text-[0.6875rem] text-muted">{fmt(inv.createdAt)}</span>
        </div>
      </Link>
      <div className="flex items-center px-3 border-l border-divider">
        <InvoiceDeleteButton invoiceId={inv.id} invoiceNumber={inv.number} />
      </div>
    </div>
  )
}

type SearchParams = {
  status?:  string
  payment?: string
  q?:       string
  from?:    string
  to?:      string
}

function hrefWith(current: SearchParams, overrides: SearchParams): string {
  const merged = { ...current, ...overrides }
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v)
  const qs = params.toString()
  return `/admin/invoices${qs ? `?${qs}` : ''}`
}

function matchesSearch(inv: Invoice, q: string): boolean {
  return (
    inv.customer.name.toLowerCase().includes(q) ||
    inv.number.toLowerCase().includes(q) ||
    (inv.customer.phone ?? '').toLowerCase().includes(q) ||
    (inv.customer.email ?? '').toLowerCase().includes(q)
  )
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  let invoices: Invoice[] = []
  let kvError = false

  try { invoices = await getAllInvoices() } catch { kvError = true }

  const outstanding = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0)
  const unpaidCount = invoices.filter(i => i.status !== 'paid').length

  const status  = (searchParams.status ?? 'all') as InvoiceStatus | 'all'
  const payment = (searchParams.payment ?? 'all') as 'cash' | 'mobile' | 'all'
  const q       = (searchParams.q ?? '').trim().toLowerCase()
  const from    = searchParams.from ?? ''
  const to      = searchParams.to ?? ''
  const hasFilters = status !== 'all' || payment !== 'all' || !!q || !!from || !!to

  // Every dimension except status — used both to filter and to compute status-tab counts.
  const preStatus = invoices.filter(i => {
    if (payment !== 'all' && i.paymentMethod !== payment) return false
    if (q && !matchesSearch(i, q)) return false
    if (from && i.createdAt < from) return false
    if (to && i.createdAt > `${to}T23:59:59.999Z`) return false
    return true
  })

  const counts = {
    all:   preStatus.length,
    draft: preStatus.filter(i => i.status === 'draft').length,
    sent:  preStatus.filter(i => i.status === 'sent').length,
    paid:  preStatus.filter(i => i.status === 'paid').length,
  }

  const visible = status === 'all' ? preStatus : preStatus.filter(i => i.status === status)

  const statusTabs = [
    { key: 'all',   label: `All (${counts.all})` },
    { key: 'draft', label: `Draft (${counts.draft})` },
    { key: 'sent',  label: `Sent (${counts.sent})` },
    { key: 'paid',  label: `Paid (${counts.paid})` },
  ]
  const paymentTabs = [
    { key: 'all',    label: 'All' },
    { key: 'cash',   label: 'Cash' },
    { key: 'mobile', label: 'Mobile' },
  ]

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

        <div className="flex items-center justify-between mb-5 gap-4">
          <h1 className="font-playfair text-[1.75rem]">All Invoices</h1>
          {hasFilters && (
            <Link href="/admin/invoices" className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted hover:text-hunter underline underline-offset-2 whitespace-nowrap">
              Clear filters
            </Link>
          )}
        </div>

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
          <>
            {/* Filters */}
            <div className="border border-divider bg-white p-4 mb-6 space-y-4">
              {/* Search + date range */}
              <form method="get" className="flex flex-wrap gap-2 items-end">
                <input type="hidden" name="status"  value={status  !== 'all' ? status  : ''} />
                <input type="hidden" name="payment" value={payment !== 'all' ? payment : ''} />
                <div className="flex-1 min-w-[160px]">
                  <label className="block font-sans text-[0.625rem] uppercase tracking-widest text-muted mb-1">Search</label>
                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Name, phone, email, invoice #"
                    className="w-full border border-divider px-3 py-2 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter bg-white"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[0.625rem] uppercase tracking-widest text-muted mb-1">From</label>
                  <input
                    type="date"
                    name="from"
                    defaultValue={from}
                    className="border border-divider px-3 py-2 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter bg-white"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[0.625rem] uppercase tracking-widest text-muted mb-1">To</label>
                  <input
                    type="date"
                    name="to"
                    defaultValue={to}
                    className="border border-divider px-3 py-2 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-hunter text-parchment px-5 py-2 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-[#1E3D17] transition-colors"
                >
                  Filter
                </button>
              </form>

              {/* Status tabs */}
              <div className="flex flex-wrap gap-2">
                {statusTabs.map(tab => (
                  <Link
                    key={tab.key}
                    href={hrefWith(searchParams, { status: tab.key === 'all' ? undefined : tab.key })}
                    className={`
                      font-sans text-[0.75rem] uppercase tracking-widest px-3 py-1.5 border transition-colors
                      ${status === tab.key
                        ? 'bg-hunter text-parchment border-hunter'
                        : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                      }
                    `}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>

              {/* Payment method tabs */}
              <div className="flex flex-wrap gap-2">
                {paymentTabs.map(tab => (
                  <Link
                    key={tab.key}
                    href={hrefWith(searchParams, { payment: tab.key === 'all' ? undefined : tab.key })}
                    className={`
                      font-sans text-[0.6875rem] uppercase tracking-widest px-2.5 py-1 border transition-colors
                      ${payment === tab.key
                        ? 'bg-charcoal text-parchment border-charcoal'
                        : 'border-divider text-muted hover:border-charcoal hover:text-charcoal'
                      }
                    `}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="font-sans text-[0.875rem] text-muted text-center py-16">
                No invoices match these filters.
              </p>
            ) : (
              <div className="space-y-3">
                {visible.map(inv => <InvoiceCard key={inv.id} inv={inv} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
