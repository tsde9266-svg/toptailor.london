import Link   from 'next/link'
import Navbar  from '@/components/Navbar'
import Footer  from '@/components/Footer'
import GetStartedQuickAdd from './GetStartedQuickAdd'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Tailoring Collection in London | Fine Tailors',
  description: 'Book your collection slot online — we collect from your Central London door, alter your garments, and return them pressed and perfect in 5–7 days. Seven days a week.',
  alternates: { canonical: 'https://www.finetailors.co.uk/get-started' },
  openGraph: {
    title: 'Book a Tailoring Collection in London | Fine Tailors',
    description: 'Book your collection slot online — we collect from your Central London door, alter your garments, and return them pressed and perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/get-started',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors — Book a Collection' }],
  },
}

export default function GetStartedPage() {
  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">

        {/* Header */}
        <div className="px-8 lg:px-24 py-16 lg:py-20 border-b border-divider max-w-3xl">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-4">
            FINE TAILORS — WHERE TO START
          </span>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium">
            How can we <br />
            <em className="font-playfair italic">help you today?</em>
          </h1>
          <p className="font-sans font-light text-[1.0625rem] text-muted mt-6 max-w-lg leading-relaxed">
            Two ways to begin. Either way, the rest of the journey stays the same — slot, address, payment.
          </p>
        </div>

        {/* Two main option cards */}
        <div className="px-8 lg:px-24 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-divider">

            {/* Phone Consultation */}
            <div className="flex flex-col p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-divider">
              <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] mb-6 inline-block px-2.5 py-1 w-fit border border-divider text-muted">
                Free
              </span>
              <div className="mb-6 text-muted">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h2 className="font-playfair text-[1.5rem] lg:text-[1.75rem] font-medium mb-3">
                Phone Consultation
              </h2>
              <p className="font-sans font-light text-[0.9375rem] text-muted leading-relaxed flex-1 mb-8">
                Not sure what you need? Tell us your name, phone, and a time — a specialist will call you to walk through your options. No commitment.
              </p>
              <Link
                href="/get-started/call"
                className="
                  w-full text-center py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase
                  transition-colors duration-200
                  border border-charcoal text-charcoal hover:bg-charcoal hover:text-parchment
                "
              >
                Schedule a Call →
              </Link>
            </div>

            {/* Browse Services */}
            <div className="flex flex-col p-8 lg:p-10 bg-hunter/[0.03]">
              <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] mb-6 inline-block px-2.5 py-1 w-fit bg-hunter text-parchment">
                Most popular
              </span>
              <div className="mb-6 text-hunter">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <h2 className="font-playfair text-[1.5rem] lg:text-[1.75rem] font-medium mb-3">
                Browse &amp; Book
              </h2>
              <p className="font-sans font-light text-[0.9375rem] text-muted leading-relaxed flex-1 mb-8">
                Pick the services you need — alterations, dresses, leather, plus a Home Visit. Choose a slot, give us your address, done.
              </p>
              <Link
                href="/#services"
                className="
                  w-full text-center py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercased
                  transition-colors duration-200
                  bg-hunter text-parchment hover:bg-[#1E3D17]
                "
              >
                View Services →
              </Link>
            </div>
          </div>

          {/* Quick add: Home Visit only */}
          <div className="mt-10 border border-divider bg-parchment p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <p className="font-playfair text-[1.25rem] mb-2">Home Visit</p>
              <p className="font-sans font-light text-[0.875rem] text-muted leading-relaxed">
                We can send a tailor to your door for a charge of only £20. Please note if you agree with the consultation and give us clothing to alter, the £20 will be credited onto the final amount.
              </p>
            </div>
            <GetStartedQuickAdd />
          </div>

          {/* Reassurance */}
          <p className="font-sans text-[0.8125rem] text-muted text-center mt-10">
            Stuck or have a question?{' '}
            <a
              href="https://wa.me/447438145169?text=Hi%2C%20I%27d%20like%20some%20help%20choosing%20the%20right%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="text-hunter underline underline-offset-2"
            >
              Message us on WhatsApp
            </a>{' '}
            and we&apos;ll guide you.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
