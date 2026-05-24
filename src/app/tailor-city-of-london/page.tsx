import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in City of London | Fine Tailors',
  description: 'Searching for a tailor near you in the City of London? We collect from your EC1–EC4 door, alter suits and clothing, and return pressed and perfect in 5–7 days.',
  keywords: ['tailor near me City of London', 'tailor near me City of London London', 'City of London tailor near me', 'nearest tailor City of London', 'tailor City of London'],
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-city-of-london' },
  openGraph: {
    title: 'Tailor Near Me in City of London | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-city-of-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in the City of London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in City of London', item: 'https://www.finetailors.co.uk/tailor-city-of-london' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'City of London', containedInPlace: { '@type': 'City', name: 'London' } },
  description: 'Collection-based tailoring service covering the City of London. Garments collected from EC1–EC4 addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Can you collect from a City of London office or EC1–EC4 home address?',
    a: 'Yes. We collect from offices, apartments and residential buildings across the Square Mile — EC1, EC2, EC3 and EC4. Provide your address and any access instructions when booking and we coordinate accordingly.',
  },
  {
    q: 'How quickly can you alter a suit needed for a City boardroom meeting?',
    a: 'Standard turnaround is 5–7 working days. If you have a specific deadline, call us directly on +44 7438 145169 and we will tell you what is achievable. We prioritise City clients with time-sensitive requirements where possible.',
  },
]

export default function TailorCityOfLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in City of London</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in the City of London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from City of London addresses — EC1, EC2, EC3 and EC4 — and returns them perfectly altered within 5–7 days. For finance and professional sector workers who wear suits every day and cannot afford a poor fit.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across the Square Mile</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The City of London moves at a pace that leaves little room for inconvenience. Finance professionals, lawyers, and executives working in the Square Mile wear suits as daily workwear — not occasion wear — and the fit needs to be right every day, not just on special occasions. Fine Tailors is built for this client profile.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>City of London tailoring collection service</strong> works around your schedule. We collect from your EC1–EC4 office or apartment at a time you choose, alter every piece in our specialist workshop — suits, shirts, trousers, coats — and return them to your exact address within 5–7 working days. No travelling across London with garment bags. No waiting in a shop queue after work.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also serve the neighbouring areas of <Link href="/tailor-islington" className="text-hunter underline">Islington</Link> and <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link> for clients who live north or east of the Square Mile.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From the City</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Shirt Alterations', 'Sleeve shortening, body tapering, collar adjustments — prices on request'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Clothing Repairs', 'Zip replacements, rehem from £8, patch repairs from £18'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your City of London address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in the City of London</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your EC1–EC4 home or office.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. We coordinate with reception or building security if required.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop. Written quote sent before work begins.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your City address, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What City Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my EC2 office on Wednesday, back by the following Monday perfectly altered. Exactly what you need when you wear a suit five days a week.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Michael, City of London</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">City of London — Specific Questions</h2>
          <dl className="space-y-6 max-w-3xl">
            {areaFaqs.map((item, i) => (
              <div key={i} className="border-b border-divider pb-6 last:border-0">
                <dt className="font-playfair font-medium text-charcoal mb-2">{item.q}</dt>
                <dd className="font-sans font-light text-muted leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in the City of London</h2>
          <p className="font-sans font-light text-muted mb-4 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-islington" className="text-hunter underline">Islington</Link>,{' '}
            <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link> and{' '}
            <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link>.
          </p>
          <p className="font-sans text-sm font-light text-muted mb-6 max-w-lg leading-relaxed">
            Looking for a <Link href="/tailor-near-me" className="text-hunter underline">tailor near me</Link> across all of London? See every area we cover.
          </p>
          <p className="font-sans text-sm font-light text-muted mb-6 max-w-lg leading-relaxed">
            Services: <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link> · <Link href="/dress-alterations-london" className="text-hunter underline">dress alterations</Link> · <Link href="/trouser-alterations-london" className="text-hunter underline">trouser alterations</Link>.
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
