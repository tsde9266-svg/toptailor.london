import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Fine Tailors',
  description: 'Terms and conditions for Fine Tailors, London\'s door-to-door tailoring and alteration service.',
  alternates: { canonical: 'https://www.finetailors.co.uk/terms' },
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
            Last updated: July 2026
          </p>

          <Section title="1. Service Description">
            <p>Fine Tailors provides door-to-door tailoring, clothing alterations and garment repair services to customers in central London. We collect garments from your address, complete the agreed work and return them to you.</p>
          </Section>

          <Section title="2. Pricing & Quotes">
            <p>Prices shown on our website are guide prices only. A confirmed quote is provided after our tailor has inspected your garments. Work does not commence until you have approved the final price.</p>
            <p>A minimum order value of <strong className="font-medium text-charcoal">£20</strong> applies.</p>
            <p>For specialist items (leather garments, wedding and occasion wear), prices are provided on inspection and may vary based on the complexity of work required.</p>
          </Section>

          <Section title="3. Booking & Collection">
            <p>By submitting a collection request, you are requesting that we visit your address to collect garments. Booking a slot does not constitute a binding contract until garments have been collected and a quote agreed.</p>
            <p>Please ensure someone is available at the agreed address for the duration of the collection window. If you need to cancel or reschedule, please contact us at least 24 hours in advance.</p>
            <p>Once you have approved a quote and we have collected your garments, you are agreeing to pay for the work as set out in Section 5 (Payment), subject to your cancellation rights in Section 4 below.</p>
          </Section>

          <Section title="4. Your Right to Cancel (Cooling-Off Period)">
            <p>If you are booking as a private individual (consumer), you normally have the right under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 to cancel your booking within 14 days without giving a reason, and to receive a full refund of anything paid.</p>
            <p>By requesting that we collect your garments and begin work within this 14-day period, you are expressly asking us to start the service before the cooling-off period ends, and you consent to this. Where you do so:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You may still cancel before the work is completed, but you will be responsible for paying a reasonable amount for any work carried out and materials used up to the point you cancel.</li>
              <li>If the service is fully completed within the 14-day period, your cancellation right ends once the service is complete, and no refund will be due for that completed work.</li>
            </ul>
            <p>To cancel, contact us as soon as possible via WhatsApp or the enquiry form on our website, ideally before we collect or begin work on your garments.</p>
          </Section>

          <Section title="5. Payment">
            <p>Payment is due upon approval of your confirmed quote. We accept cash or card (contactless / NFC) on collection or delivery.</p>
            <p>By submitting a booking and proceeding with collection, you agree to pay in full for the work completed at the confirmed price, subject to your cancellation rights in Section 4 above. Once the cooling-off period has ended, or work has been completed within that period at your request as described in Section 4, this agreement to pay applies regardless of a later change of mind or personal circumstances.</p>
            <p>The exceptions to this are (a) where our service has caused material damage to your garment(s) or belongings, or (b) where the work was not carried out with reasonable care and skill. In either case, please refer to Section 7 and Section 8 below — we will assess the matter in good faith and agree an appropriate remedy in line with your rights under the Consumer Rights Act 2015, which may include repeat or remedial work, a reduction in price, or a refund. Dissatisfaction with style or fit that falls within the agreed brief does not, on its own, exempt a customer from payment for completed work.</p>
            <p>If payment is not received for completed work, we reserve the right to withhold the garments until payment is made in full, to charge reasonable late-payment costs, and to pursue any outstanding balance through appropriate means, including debt recovery or small claims proceedings.</p>
          </Section>

          <Section title="6. Turnaround Times">
            <p>Standard turnaround is 5–7 working days from collection. Estimated return dates are guides only; we will contact you if any delay is expected.</p>
          </Section>

          <Section title="7. Care of Garments">
            <p>We handle all garments with professional care. We are not liable for pre-existing damage, faults in fabric, or defects not disclosed at the time of collection.</p>
            <p>If damage occurs during our work, we will notify you immediately and discuss an appropriate remedy.</p>
          </Section>

          <Section title="8. Cancellations & Disputes">
            <p>If you are not satisfied with completed work, please contact us as soon as possible, ideally within 48 hours of return delivery, so we can look into it quickly. We will assess the concern and, where appropriate, carry out remedial work at no additional charge.</p>
            <p>Refunds are considered on a case-by-case basis for work that cannot be remedied.</p>
            <p>Nothing in this section limits your statutory rights under the Consumer Rights Act 2015, including your right to request repeat performance or a price reduction where a service has not been carried out with reasonable care and skill.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>Our liability to you for loss of or damage to a garment arising from our services is limited to the fair market value of the affected garment(s), or the price you paid for the relevant service, whichever is greater.</p>
            <p>Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability which cannot be excluded or limited under English law, including your statutory rights under the Consumer Rights Act 2015.</p>
          </Section>

          <Section title="10. Governing Law & Jurisdiction">
            <p>These terms, and any dispute or claim arising out of or in connection with them or our services, are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction over any such dispute, save that if you are a consumer resident elsewhere in the UK, you may bring proceedings in your local courts instead.</p>
          </Section>

          <Section title="11. Contact">
            <p>For any questions regarding these terms, please contact us via the enquiry form on our website or by WhatsApp.</p>
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
