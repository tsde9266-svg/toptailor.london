import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getOrder } from '@/lib/kv'
import ApprovePanel from './ApprovePanel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Quote | One Click Tailor',
  robots: { index: false, follow: false },
}

export default async function QuotePage({
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

  if (fetchError || !order?.quote) {
    return (
      <>
        <Navbar solid />
        <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment flex flex-col items-center justify-center px-8 text-center gap-6">
          <p className="font-playfair text-[1.5rem]">Quote not found.</p>
          <p className="font-sans text-sm text-muted">
            This link may have expired or the quote hasn&apos;t been sent yet.
          </p>
          <Link href="/" className="font-sans text-[0.75rem] uppercase tracking-widest text-hunter underline">
            Return home
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const { quote, customer } = order
  const alreadyApproved = Boolean(quote.approvedAt)

  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">
        <div className="px-8 lg:px-24 py-16 lg:py-24 max-w-2xl mx-auto">

          {/* Header */}
          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">
            One Click Tailor
          </p>
          <h1 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-4">
            Your Confirmed Quote
          </h1>
          <p className="font-sans font-light text-muted mb-10">
            Hi <strong className="text-charcoal font-medium">{customer.name}</strong>, our tailor has inspected
            your garments. Here is your confirmed quote before we start any work.
          </p>

          {/* Quote items */}
          <div className="border border-divider p-6 mb-8">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Your Quote</p>
            <ul className="space-y-3 mb-4">
              {quote.items.map((item, i) => (
                <li key={i} className="flex justify-between font-sans text-[0.9rem]">
                  <span className="text-charcoal">{item.name}</span>
                  <span className="text-hunter font-medium">£{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-divider pt-3 flex justify-between">
              <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total</span>
              <span className="font-playfair text-[1.5rem] text-charcoal">£{quote.total}</span>
            </div>
          </div>

          {/* Tailor notes */}
          {quote.notes && (
            <div className="border-l-2 border-hunter/30 pl-4 mb-8">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">Note from your tailor</p>
              <p className="font-sans text-[0.9rem] text-muted italic">{quote.notes}</p>
            </div>
          )}

          {/* Approved state */}
          {alreadyApproved ? (
            <div className="border border-green-200 bg-green-50 p-6 text-center">
              <svg className="mx-auto mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <p className="font-playfair text-[1.25rem] text-green-800 mb-2">Quote Approved</p>
              <p className="font-sans text-[0.875rem] text-green-700 mb-1">
                Payment: {quote.paymentMethod === 'bank' ? 'Bank Transfer' : 'Pay on Collection / Delivery'}
              </p>
              <p className="font-sans text-[0.875rem] text-green-700">
                We&apos;re working on your garments and will be in touch to arrange delivery.
              </p>
            </div>
          ) : (
            <ApprovePanel orderId={order.id} total={quote.total} />
          )}

          {/* What happens next (pre-approval) */}
          {!alreadyApproved && (
            <div className="mt-10 pt-8 border-t border-divider">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">What happens next</p>
              <ol className="space-y-3">
                {[
                  'Approve the quote above',
                  'We complete all alterations — typically 5–7 working days',
                  'Your garments are returned to your door, pressed and perfect',
                ].map((s, i) => (
                  <li key={i} className="flex gap-4 font-sans text-[0.875rem] text-muted">
                    <span className="font-playfair text-hunter text-[1rem] w-5 flex-shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
