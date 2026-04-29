import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — One Click Tailor',
  description: 'Privacy policy for One Click Tailor. How we collect, use and protect your personal data.',
  alternates: { canonical: 'https://www.oneclicktailors.co.uk/privacy' },
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

export default function PrivacyPage() {
  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">
        <div className="px-8 lg:px-24 py-16 lg:py-24 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Privacy Policy</span>
          </nav>

          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">
            Legal
          </p>
          <h1 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-2">
            Privacy Policy
          </h1>
          <p className="font-sans text-[0.8125rem] text-muted mb-12">
            Last updated: April 2026
          </p>

          <Section title="1. Who We Are">
            <p>One Click Tailor is a door-to-door tailoring and alteration service operating in central London. We are the data controller for personal information collected through this website and in the course of providing our services.</p>
          </Section>

          <Section title="2. What Data We Collect">
            <p>When you make an inquiry or submit a collection request, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Home or work address (for collection and delivery)</li>
              <li>Details of garments and services requested</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <p>We use your personal data solely to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirm and fulfil your collection and alteration request</li>
              <li>Send you a quote for the work required</li>
              <li>Communicate about your order (slot confirmation, quote, delivery)</li>
              <li>Respond to inquiries you send us</li>
            </ul>
            <p>We do not use your data for marketing without your explicit consent and we do not sell or share your data with third parties.</p>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>We process your personal data on the basis of <strong className="font-medium text-charcoal">contract performance</strong> (to fulfil your service request) and <strong className="font-medium text-charcoal">legitimate interests</strong> (to respond to your inquiries).</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your personal data for up to <strong className="font-medium text-charcoal">12 months</strong> after your last interaction with us, after which it is deleted. You may request earlier deletion at any time.</p>
          </Section>

          <Section title="6. Your Rights">
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
            </ul>
            <p>To exercise any of these rights, contact us via the inquiry form on this website.</p>
          </Section>

          <Section title="7. Cookies">
            <p>This website uses only essential cookies necessary for the site to function (such as remembering items in your order basket). We do not use tracking or advertising cookies.</p>
          </Section>

          <Section title="8. Third-Party Services">
            <p>This website uses the following third-party services, each with their own privacy policies:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="font-medium text-charcoal">Cal.com</strong> — for booking collection slots</li>
              <li><strong className="font-medium text-charcoal">Resend</strong> — for transactional email delivery</li>
              <li><strong className="font-medium text-charcoal">Vercel</strong> — for website hosting</li>
            </ul>
            <p>Your name and email are passed to Cal.com when booking a slot to pre-fill your details.</p>
          </Section>

          <Section title="9. Contact">
            <p>For any privacy-related questions or requests, please use the contact form on our website. We aim to respond within 5 working days.</p>
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
