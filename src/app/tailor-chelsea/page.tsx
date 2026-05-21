import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Chelsea London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Chelsea. We collect from your SW3/SW10 door, alter to a perfect fit, and return pressed and perfect in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-chelsea' },
  openGraph: {
    title: 'Tailor in Chelsea London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-chelsea',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Chelsea, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Chelsea', item: 'https://www.finetailors.co.uk/tailor-chelsea' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Chelsea' },
  description: 'Collection-based tailoring service covering Chelsea. Garments collected from your SW3 or SW10 door, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you work with high-end garments from the Chelsea and King\'s Road boutiques?',
    a: 'Yes. We regularly collect and alter garments from independent and designer boutiques along the King\'s Road and Fulham Road. The collection model ensures your pieces travel safely and are handled by one tailor throughout.',
  },
  {
    q: 'Can you collect from both home and office addresses in Chelsea?',
    a: 'Yes. We collect from residential addresses, apartments and offices anywhere in SW3 and SW10. Just provide the address and any access requirements when booking.',
  },
]

export default function TailorChelsea() {
  return (
    <>
      <Script id="schema-breadcrumb-chelsea" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-chelsea" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-chelsea" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Chelsea</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Chelsea, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors is a collection-based tailoring service covering all Chelsea addresses — King&apos;s Road, Sloane Square, Cheyne Walk and beyond. We collect your garments from your SW3 or SW10 door, alter them to a perfect fit, and return everything pressed and perfect in 5–7 days.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Chelsea</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Chelsea residents have long had a well-developed eye for quality — the King&apos;s Road boutiques, the Fulham Road design shops, the fashion-forward residents of Cheyne Walk and Chelsea Embankment all expect their clothes to fit well and their services to deliver without inconvenience. Fine Tailors is built for exactly this clientele.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Chelsea tailoring collection service</strong> removes every friction point from the process. We collect from your door at a time you choose — morning, afternoon, or evening. Your garments go to our specialist workshop, where each piece is altered by hand and machine to the highest standard. Within 5–7 working days, everything is returned to your Chelsea address, pressed and ready to wear.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Whether you need a suit jacket taken in for a charity dinner, a cocktail dress shortened for a Sloane Street event, or a designer coat altered after a recent purchase — we handle it all, collected from your door and returned to it.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Chelsea</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for delicate and structured pieces'],
              ['Leather Jacket Alterations', 'Quoted on inspection — sleeves, body, zip, take-in by specialist'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Chelsea address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Chelsea</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Chelsea SW3 or SW10 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home required.'],
              ['We Alter Every Piece', 'Your garments are worked on in our specialist workshop. Written quote sent before work begins — you approve first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your door, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Chelsea Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my King&rsquo;s Road flat, back in less than a week. The suit fits perfectly now. Incredibly easy process.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Sophie, Chelsea</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Chelsea-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Chelsea</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>,{' '}
            <Link href="/tailor-south-kensington" className="text-hunter underline">South Kensington</Link> and{' '}
            <Link href="/tailor-fulham" className="text-hunter underline">Fulham</Link>.
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
