import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Belgravia London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Belgravia. We collect from your SW1W/SW1X door, alter to a perfect fit, and return pressed and perfect in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-belgravia' },
  openGraph: {
    title: 'Tailor in Belgravia London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-belgravia',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Collection-based tailoring service in Belgravia, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Belgravia', item: 'https://www.finetailors.co.uk/tailor-belgravia' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Belgravia' },
  description: 'Collection-based tailoring service covering Belgravia. Garments collected from your SW1W or SW1X door, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you handle formal wear for black-tie events collected in Belgravia?',
    a: 'Yes. Belgravia clients regularly require alterations to black-tie suits, evening dresses and occasion wear. We handle all formal and structured garments with specialist care, quoted on inspection for complex pieces.',
  },
  {
    q: 'How do you ensure discretion for collections from Eaton Square and Chester Square addresses?',
    a: 'Our service is entirely collection-based — we collect from your door and return to your door. No tailor enters your home. No one enters your property. We can coordinate with housekeepers or building concierges where required.',
  },
]

export default function TailorBelgravia() {
  return (
    <>
      <Script id="schema-breadcrumb-belgravia" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-belgravia" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-belgravia" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Belgravia</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Belgravia, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Belgravia addresses — Eaton Square, Chester Square, Belgrave Square and beyond — and returns them altered to a perfect fit within 5–7 days. Discreet, precise, collection-based.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Belgravia</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Belgravia&apos;s white stucco terraces and private garden squares house some of London&apos;s most discerning residents. The area is defined by its discretion — quiet streets, private arrangements, services that arrive without fuss and deliver without fanfare. Fine Tailors is precisely that kind of service.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Belgravia tailoring collection service</strong> operates with complete discretion. We collect garments from your SW1W or SW1X door — housekeeper hand-off, concierge collection, or direct — alter every piece in our specialist workshop, and return them pressed and perfect within 5–7 working days. No tailor enters your home. Your garments are handled by one dedicated tailor from collection to return.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Suit alterations for formal occasions, evening wear adjustments, wardrobe maintenance for clients who expect everything to fit — we cover it all. Belgravia&apos;s proximity to Knightsbridge and Westminster means we serve the wider SW1 area with equal regularity.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Belgravia</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for bridal and formal pieces'],
              ['Leather Jacket Alterations', 'Quoted on inspection — specialist work on leather garments'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Belgravia address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Belgravia</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Belgravia SW1W or SW1X address.'],
              ['We Collect From Your Door', 'We collect your garments from your door. No entry to your home. We coordinate with concierge or housekeeper if required.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop. Written quote approved by you before work begins.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Belgravia door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Belgravia Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had three suits and two evening dresses collected from our Eaton Square address. Everything returned in a week, perfectly altered. Discreet and professional throughout.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Catherine, Belgravia</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Belgravia-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Belgravia</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>,{' '}
            <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link> and{' '}
            <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>.
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
