import Link from 'next/link'
import { getOrder } from '@/lib/kv'
import type { OrderStatus } from '@/lib/kv'
import QuoteForm from './QuoteForm'

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

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long',
    year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/London',
  })
}

export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string }
}) {
  let order = null
  let fetchError = false

  try {
    order = await getOrder(params.orderId)
  } catch {
    fetchError = true
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-parchment px-6 py-16 text-center">
        <p className="font-sans text-muted">Could not connect to storage. Check KV configuration.</p>
        <Link href="/admin" className="font-sans text-hunter underline mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-parchment px-6 py-16 text-center">
        <p className="font-sans text-muted">Order not found.</p>
        <Link href="/admin" className="font-sans text-hunter underline mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  const fixedTotal = order.estimate.reduce((s, i) => s + i.price, 0)
  const hasQuotes  = order.estimate.some(i => i.price === 0)

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Orders
        </Link>
        <span className="font-playfair text-[1.0625rem]">Order Detail</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-2xl mx-auto">

        {/* Order ID + status */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </p>
            <p className="font-sans text-[0.8125rem] text-muted">{fmtDate(order.createdAt)}</p>
          </div>
          <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_COLOR[order.status]}`}>
            {STATUS_LABEL[order.status]}
          </span>
        </div>

        {/* Customer details */}
        <div className="border border-divider p-5 mb-6">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Customer</p>
          <div className="space-y-2">
            {[
              ['Name',    order.customer.name],
              ['Email',   order.customer.email],
              ['Phone',   order.customer.phone ?? '—'],
              ['Address', `${order.customer.address}, ${order.customer.postcode}`],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4">
                <span className="font-sans text-[0.8125rem] text-muted w-16 flex-shrink-0">{label}</span>
                <span className="font-sans text-[0.9rem] text-charcoal break-all">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer's estimate */}
        <div className="border border-divider p-5 mb-6">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">
            Customer&apos;s Estimate
          </p>
          <ul className="space-y-2 mb-4">
            {order.estimate.map(item => (
              <li key={item.id} className="flex justify-between font-sans text-[0.9rem]">
                <span className="text-charcoal">{item.name}</span>
                <span className={item.price === 0 ? 'text-muted italic' : 'text-hunter font-medium'}>
                  {item.price === 0 ? 'Quote' : `£${item.price}`}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-divider pt-3 flex justify-between">
            <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Estimate</span>
            <span className="font-sans text-[0.875rem] text-charcoal">
              {fixedTotal > 0 ? `£${fixedTotal}` : ''}{hasQuotes ? `${fixedTotal > 0 ? ' + ' : ''}quote items` : ''}
            </span>
          </div>
        </div>

        {/* Quote section */}
        {order.status === 'quote_sent' || order.status === 'quote_approved' || order.status === 'complete' ? (
          <div className="border border-divider p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">
                Quote Sent
              </p>
              {order.quote?.approvedAt && (
                <span className="font-sans text-[0.6875rem] text-green-700 font-medium uppercase tracking-wider">
                  Approved ✓
                </span>
              )}
            </div>
            <ul className="space-y-2 mb-4">
              {order.quote!.items.map((item, i) => (
                <li key={i} className="flex justify-between font-sans text-[0.9rem]">
                  <span className="text-charcoal">{item.name}</span>
                  <span className="text-hunter font-medium">£{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-divider pt-3 flex justify-between mb-3">
              <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total Quoted</span>
              <span className="font-playfair text-[1.125rem] text-charcoal">£{order.quote!.total}</span>
            </div>
            {order.quote?.notes && (
              <p className="font-sans text-[0.8125rem] text-muted italic">
                Notes: {order.quote.notes}
              </p>
            )}
            {order.quote?.approvedAt && (
              <div className="mt-4 pt-4 border-t border-divider space-y-1">
                <p className="font-sans text-[0.8125rem] text-green-700">
                  Approved: {fmtDate(order.quote.approvedAt)}
                </p>
                <p className="font-sans text-[0.8125rem] text-charcoal">
                  Payment: {order.quote.paymentMethod === 'bank' ? 'Bank Transfer' : 'Pay on Collection / Delivery'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <QuoteForm order={order} />
        )}
      </div>
    </div>
  )
}
