import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Dress Alterations Mayfair | Collected From Your Home | Fine Tailors',
  description: 'Expert dress alterations in Mayfair — collected from your W1J/W1K home and returned perfectly fitted in 5–7 working days. Fine Tailors covers all of Central London.',
  alternates: { canonical: 'https://www.finetailors.co.uk/dress-alterations-mayfair' },
  keywords: [
    'dress alterations Mayfair',
    'dress alterations near me Mayfair',
    'dress alterations Mayfair London',
    'tailor Mayfair London',
    'alterations Mayfair',
    'Mayfair dress alterations',
  ],
  openGraph: {
    title: 'Dress Alterations Mayfair | Home Collection | Fine Tailors',
    description: 'Expert dress alterations in Mayfair, collected from your W1J/W1K door. Returned perfectly fitted in 5–7 working days.',
    url: 'https://www.finetailors.co.uk/dress-alterations-mayfair',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dress Alterations Mayfair London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Dress Alterations London', item: 'https://www.finetailors.co.uk/dress-alterations-london' },
    { '@type': 'ListItem', position: 3, name: 'Dress Alterations Mayfair', item: 'https://www.finetailors.co.uk/dress-alterations-mayfair' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Dress Alterations Mayfair',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'Neighborhood', name: 'Mayfair', containedInPlace: { '@type': 'City', name: 'London' } },
  description: 'Professional dress alterations in Mayfair, London. Home collection and return service. Garments fully insured while in transit.',
  serviceType: 'Dress Alterations',
}

export default function DressAlterationsMayfair() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/dress-alterations-london" className="hover:text-hunter">Dress Alterations London</Link>
            <span className="mx-2">/</span>
            <span>Mayfair</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · Mayfair · 5–7 Working Days</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Dress Alterations in Mayfair —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides expert <strong>dress alterations in Mayfair</strong> with a full home collection and return service. Mayfair is home to some of the finest fashion boutiques and designer houses in London. Many of our Mayfair clients bring us garments from Bond Street, Mount Street and the surrounding area that need careful, expert alteration. Our collection service means your dress never has to leave your address unaccompanied.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Collection Is the Right Approach in Mayfair</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The traditional route for dress alterations is to carry your garments to a shop, leave them, and return to collect. In Mayfair, that means transporting valuable pieces across London unnecessarily. Fine Tailors removes every step.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We collect from your W1J or W1K address at a time that suits you, alter every piece at our specialist workshop, and return them pressed and perfect within 5–7 working days. All garments are fully insured while in our care. A written quote is approved before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and all other Central London postcodes. See <Link href="/alterations-near-me-london" className="text-hunter underline">all areas we cover</Link>.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your Mayfair address — morning, afternoon or evening.'],
              ['We Collect From Your Door', 'We come to your W1J or W1K address at the agreed time. Doorstep collection only — no entry required.'],
              ['Written Quote for Approval', 'We inspect your garments and send a written quote. No work begins until you approve.'],
              ['Returned Pressed and Perfect', 'Within 5–7 working days everything is back at your door, pressed and ready to wear.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-6">
                <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">{i + 1}</span>
                <div>
                  <h3 className="font-playfair font-medium text-charcoal mb-1">{title}</h3>
                  <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Mayfair Areas We Collect From</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">Grosvenor Square</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">Mount Street</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">Bond Street</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">Berkeley Square</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">South Audley Street</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">Park Lane</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">W1J</li>
            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">W1K</li>

          </ul>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Dress Alterations in Mayfair</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            See our <Link href="/dress-alterations-london" className="text-hunter underline">full dress alterations service</Link> or explore <Link href="/dress-alterations-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>.
          </p>
          <div className="flex gap-6 flex-wrap items-center">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
              +44 7438 145169
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
