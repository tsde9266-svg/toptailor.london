import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getInvoice } from '@/lib/kv'
import InvoiceActions from './InvoiceActions'
import { BUSINESS } from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  })
}

const STATUS_LABEL = { draft: 'Draft', sent: 'Sent', paid: 'Paid' }
const STATUS_COLOR = {
  draft: 'bg-gray-100 text-gray-600',
  sent:  'bg-blue-100 text-blue-700',
  paid:  'bg-green-100 text-green-800',
}

export default async function AdminInvoicePage({ params }: { params: { invoiceId: string } }) {
  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch { /* storage down */ }
  if (!invoice) notFound()

  const invoiceUrl = `${BASE_URL}/invoice/${invoice.id}`
  const waText     = encodeURIComponent(
    `Hi ${invoice.customer.name}, here is your invoice from ${BUSINESS.name}:\n\n${invoice.number} — £${invoice.total}\n\n${invoiceUrl}`
  )

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/invoices" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Invoices
        </Link>
        <span className="font-playfair text-[1.0625rem]">Invoice Detail</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-2xl mx-auto space-y-6">

        {/* Invoice ID + status */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">
              {invoice.number}
            </p>
            <p className="font-playfair text-[1.625rem] text-charcoal">{invoice.customer.name}</p>
            <p className="font-sans text-[0.8125rem] text-muted">{fmtDate(invoice.createdAt)}</p>
          </div>
          <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 flex-shrink-0 ${STATUS_COLOR[invoice.status]}`}>
            {STATUS_LABEL[invoice.status]}
          </span>
        </div>

        {/* Customer */}
        <div className="border border-divider bg-white p-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">Customer</p>
          <div className="space-y-1.5">
            {[
              ['Name',    invoice.customer.name],
              ['Email',   invoice.customer.email],
              ['Phone',   invoice.customer.phone ?? '—'],
              ['Address', invoice.customer.address ?? '—'],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4">
                <span className="font-sans text-[0.8125rem] text-muted w-16 flex-shrink-0">{label}</span>
                <span className="font-sans text-[0.875rem] text-charcoal break-all">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Items + total */}
        <div className="border border-divider bg-white p-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">Services</p>
          <ul className="space-y-2 mb-4">
            {invoice.items.map((item, i) => (
              <li key={i} className="flex justify-between font-sans text-[0.9rem]">
                <span className="text-charcoal">{item.name}</span>
                <span className="text-hunter font-medium">£{item.price}</span>
              </li>
            ))}
          </ul>
          {(invoice.discountAmount ?? invoice.discount) ? (
            <div className="border-t border-divider pt-2 space-y-1.5 mb-0">
              <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
                <span>Subtotal</span><span>£{invoice.subtotal}</span>
              </div>
              <div className="flex justify-between font-sans text-[0.8125rem] text-muted">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>
                    {invoice.voucherName ? invoice.voucherName : 'Discount'}
                    {invoice.discountPercent ? ` (${invoice.discountPercent}%)` : ''}
                  </span>
                  {invoice.voucherCode && (
                    <code className="font-mono text-[0.6875rem] bg-parchment px-1.5 py-0.5 border border-divider">{invoice.voucherCode}</code>
                  )}
                  {invoice.discountType === 'voucher' && (
                    <span className="font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800">Voucher</span>
                  )}
                </div>
                <span>−£{(invoice.discountAmount ?? invoice.discount ?? 0).toFixed(2)}</span>
              </div>
            </div>
          ) : null}
          <div className="border-t border-divider pt-3 flex justify-between">
            <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total</span>
            <span className="font-playfair text-[1.5rem] text-charcoal">£{invoice.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment + dates */}
        <div className="border border-divider bg-white p-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">Payment</p>
          <div className="space-y-1.5">
            {[
              ['Method',   invoice.paymentMethod === 'bank' ? 'Bank Transfer' : invoice.paymentMethod === 'mobile' ? 'Mobile / NFC' : 'Cash'],
              ['Due',      fmtDate(invoice.dueDate)],
              ['Paid',     invoice.paidAt ? fmtDate(invoice.paidAt) : '—'],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4">
                <span className="font-sans text-[0.8125rem] text-muted w-16 flex-shrink-0">{label}</span>
                <span className="font-sans text-[0.875rem] text-charcoal">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <InvoiceActions
          invoiceId={invoice.id}
          invoiceUrl={invoiceUrl}
          waText={waText}
          status={invoice.status}
          customerEmail={invoice.customer.email}
        />

        {invoice.notes && (
          <div className="border-l-2 border-hunter/30 pl-4">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">Notes</p>
            <p className="font-sans text-[0.875rem] text-muted italic">{invoice.notes}</p>
          </div>
        )}

      </div>
    </div>
  )
}
