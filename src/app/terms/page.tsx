import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — One Click Tailor',
  description: 'Terms and conditions for One Click Tailor, London\'s door-to-door tailoring and alteration service.',
  alternates: { canonical: 'https://www.oneclicktailors.co.uk/terms' },
  robots: { index: true, follow: true },
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-playfair text-[1.25rem] font-medium text-charcoal mb-3">{title}</h2>
    <div className="font-sans font-light text-muted leading-relaxed space-y-3 text-[0.9375rem]">
      {children}
    </div>
  </div>
)

export default function TermsPage() {
  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">
        <div className="px-8 lg:px-24 py-16 lg:py-24 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Terms of Service</span>
          </nav>

          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">
            Legal
          </p>
          <h1 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-2">
            Terms of Service
          </h1>
          <p className="font-sans text-[0.8125rem] text-muted mb-12">
            Last updated: April 2026
          </p>

          <Section title="1. Service Description">
            <p>One Click Tailor provides door-to-door tailoring, clothing alterations and garment repair services to customers in central London. We collect garments from your address, complete the agreed work and return them to you.</p>
          </Section>

          <Section title="2. Pricing & Quotes">
            <p>Prices shown on our website are guide prices only. A confirmed quote is provided after our tailor has inspected your garments. Work does not commence until you have approved the final price.</p>
            <p>A minimum order value of <strong className="font-medium text-charcoal">£20</strong> applies.</p>
            <p>For specialist items (leather garments, wedding and occasion wear), prices are provided on inspection and may vary based on the complexity of work required.</p>
          </Section>

          <Section title="3. Booking & Collection">
            <p>By submitting a collection request, you are requesting that we visit your address to collect garments. Booking a slot does not constitute a binding contract until garments have been collected and a quote agreed.</p>
            <p>Please ensure someone is available at the agreed address for the duration of the collection window. If you need to cancel or reschedule, please contact us at least 24 hours in advance.</p>
          </Section>

          <Section title="4. Payment">
            <p>Payment is due upon approval of your confirmed quote. We accept cash or card payment on delivery, or bank transfer in advance.</p>
            <p>Bank details: <strong className="font-medium text-charcoal">One Click Tailor</strong>, Sort Code: 60-383-71, Account: 19795111.</p>
          </Section>

          <Section title="5. Turnaround Times">
            <p>Standard turnaround is 5–7 working days from collection. Estimated return dates are guides only; we will contact you if any delay is expected.</p>
          </Section>

          <Section title="6. Care of Garments">
            <p>We handle all garments with professional care. We are not liable for pre-existing damage, faults in fabric, or defects not disclosed at the time of collection.</p>
            <p>If damage occurs during our work, we will notify you immediately and discuss an appropriate remedy.</p>
          </Section>

          <Section title="7. Cancellations & Disputes">
            <p>If you are not satisfied with completed work, please contact us within 48 hours of return delivery. We will assess the concern and, where appropriate, carry out remedial work at no additional charge.</p>
            <p>Refunds are considered on a case-by-case basis for work that cannot be remedied.</p>
          </Section>

          <Section title="8. Contact">
            <p>For any questions regarding these terms, please contact us via the inquiry form on our website or by WhatsApp.</p>
          </Section>

          <div className="mt-12 pt-8 border-t border-divider">
            <Link href="/" className="font-sans text-[0.8125rem] text-hunter hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
