import Link from 'next/link'
import { getAllOrders, getAllReviews } from '@/lib/kv'
import type { Order, OrderStatus } from '@/lib/kv'
import { signOut } from './actions'
import ReviewsAdmin from './ReviewsAdmin'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending_collection: 'Pending Collection',
  quote_sent:         'Quote Sent',
  quote_approved:     'Quote Approved',
  complete:           'Complete',
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending_collection: 'bg-amber-100 text-amber-800',
  quote_sent:         'bg-blue-100 text-blue-800',
  quote_approved:     'bg-green-100 text-green-800',
  complete:           'bg-gray-100 text-gray-600',
}

function fmt(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    day:    'numeric',
    month:  'short',
    hour:   '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  })
}

function OrderCard({ order }: { order: Order }) {
  const fixedTotal = order.estimate.reduce((s, i) => s + i.price, 0)
  const hasQuotes  = order.estimate.some(i => i.price === 0)
  const totalLabel = fixedTotal > 0
    ? `£${fixedTotal}${hasQuotes ? ' + quote items' : ''}`
    : 'Quote only'

  return (
    <Link
      href={`/admin/order/${order.id}`}
      className="block border border-divider bg-white p-5 hover:border-hunter transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <span className="font-playfair text-[1.0625rem] text-charcoal">
          {order.customer.name}
        </span>
        <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLOR[order.status]}`}>
          {STATUS_LABEL[order.status]}
        </span>
      </div>
      <p className="font-sans text-[0.8125rem] text-muted mb-1">
        {order.customer.address}, {order.customer.postcode}
      </p>
      <div className="flex items-center gap-2 flex-wrap mt-1">
        {order.customer.paymentPreference && (
          <span className="font-sans text-[0.625rem] uppercase tracking-wider px-1.5 py-0.5 rounded bg-hunter/10 text-hunter">
            {order.customer.paymentPreference === 'bank' ? 'Bank' : 'Pay on day'}
          </span>
        )}
        {order.customer.commsPref && (
          <span className="font-sans text-[0.625rem] uppercase tracking-wider px-1.5 py-0.5 rounded bg-charcoal/10 text-charcoal">
            {order.customer.commsPref === 'whatsapp' ? 'WhatsApp' : 'Email'}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="font-sans text-[0.75rem] text-muted">
          {order.estimate.length} item{order.estimate.length !== 1 ? 's' : ''} · Estimate: {totalLabel}
        </span>
        <span className="font-sans text-[0.6875rem] text-muted">
          {fmt(order.createdAt)}
        </span>
      </div>
    </Link>
  )
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  let orders:  Order[]  = []
  let reviews: import('@/lib/kv').Review[] = []
  let kvError = false

  try {
    [orders, reviews] = await Promise.all([getAllOrders(), getAllReviews()])
  } catch {
    kvError = true
  }

  const filter = (searchParams.filter ?? 'all') as OrderStatus | 'all'
  const visible = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const counts: Record<string, number> = {
    all:                orders.length,
    pending_collection: orders.filter(o => o.status === 'pending_collection').length,
    quote_sent:         orders.filter(o => o.status === 'quote_sent').length,
    quote_approved:     orders.filter(o => o.status === 'quote_approved').length,
    complete:           orders.filter(o => o.status === 'complete').length,
  }

  const tabs: Array<{ key: string; label: string }> = [
    { key: 'all',                label: `All (${counts.all})` },
    { key: 'pending_collection', label: `Pending (${counts.pending_collection})` },
    { key: 'quote_sent',         label: `Quote Sent (${counts.quote_sent})` },
    { key: 'quote_approved',     label: `Approved (${counts.quote_approved})` },
    { key: 'complete',           label: `Complete (${counts.complete})` },
  ]

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-hunter text-parchment">
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="font-playfair text-[1.125rem]">Admin</span>
          <form action={signOut}>
            <button type="submit" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
              Sign Out
            </button>
          </form>
        </div>
        <div className="border-t border-parchment/10 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          <Link href="/admin/invoices" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-parchment/40 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            Invoices
          </Link>
          <Link href="/admin/vouchers" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-parchment/40 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            Vouchers
          </Link>
          <Link href="/admin/pos" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-amber-400/60 bg-amber-500/10 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            Quick Calc
          </Link>
          <Link href="/admin/consultations" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-parchment/40 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            Consultations
          </Link>
          <Link href="/admin/log-call" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/90 hover:text-parchment border border-parchment/40 px-3 py-1 transition-colors whitespace-nowrap flex-shrink-0">
            + Log Call
          </Link>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
        <h1 className="font-playfair text-[1.75rem] mb-6">Orders</h1>

        {kvError && (
          <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6">
            <p className="font-sans text-[0.875rem] text-amber-800 font-medium mb-1">
              KV store not connected
            </p>
            <p className="font-sans text-[0.8125rem] text-amber-700">
              Set up Vercel KV in your dashboard and run <code>npm install @vercel/kv</code> to enable order storage.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <Link
              key={tab.key}
              href={`/admin${tab.key === 'all' ? '' : `?filter=${tab.key}`}`}
              className={`
                font-sans text-[0.75rem] uppercase tracking-widest px-3 py-1.5 border transition-colors
                ${filter === tab.key || (tab.key === 'all' && filter === 'all')
                  ? 'bg-hunter text-parchment border-hunter'
                  : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                }
              `}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Order list */}
        {visible.length === 0 ? (
          <p className="font-sans text-[0.875rem] text-muted text-center py-16">
            {kvError ? 'Connect KV store to see orders.' : 'No orders in this category.'}
          </p>
        ) : (
          <div className="space-y-3">
            {visible.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Reviews management */}
        <ReviewsAdmin reviews={reviews} />
      </div>
    </div>
  )
}
