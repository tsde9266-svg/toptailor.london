import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Notting Hill London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Notting Hill. We collect from your W11 door, alter luxury and fashion garments to a perfect fit, and return in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-notting-hill' },
  openGraph: {
    title: 'Tailor in Notting Hill London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-notting-hill',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Collection-based tailoring service in Notting Hill, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Notting Hill', item: 'https://www.finetailors.co.uk/tailor-notting-hill' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Notting Hill' },
  description: 'Collection-based tailoring service covering Notting Hill. Garments collected from W11 and surrounding addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you work with vintage and designer pieces from the Portobello Road area?',
    a: 'Yes. Notting Hill clients often bring us vintage finds from the Portobello Road market, designer pieces from Westbourne Grove boutiques, and premium garments that need careful handling. The collection model is ideal — your piece never sits in a public shop.',
  },
  {
    q: 'Do you cover Westbourne Grove and Ladbroke Grove addresses?',
    a: 'Yes. We cover all W11 postcodes and the surrounding streets including Westbourne Grove, Ladbroke Grove, Pembridge Road and Portobello Road. Call us if you are on the W10 or W2 border and we will confirm.',
  },
]

export default function TailorNottingHill() {
  return (
    <>
      <Script id="schema-breadcrumb-notting" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-notting" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-notting" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Notting Hill</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Notting Hill, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Notting Hill addresses — Portobello Road, Westbourne Grove, Ladbroke Grove and beyond — and returns them altered to a perfect fit within 5–7 days. Specialist care for high-value and fashion-forward garments.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Notting Hill</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Notting Hill is one of west London&apos;s most distinctive neighbourhoods — the stucco townhouses of Pembridge Square, the boutiques of Westbourne Grove, the antique and fashion markets of Portobello Road. Its residents tend to have wardrobes that reflect strong personal style and include pieces that genuinely require expert care.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Notting Hill tailoring collection service</strong> is ideal for this client profile. We collect from your W11 door at a time you choose — whether you&apos;re in a townhouse off Ladbroke Grove or a flat above Westbourne Park Road — alter every piece in our specialist workshop, and return everything pressed and perfect within 5–7 working days. High-value garments receive the same care as any other piece: one tailor, from collection to return.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Leather jackets, vintage designer pieces, fashion-forward garments from independent designers — we handle them all. Quoted on inspection for specialist items.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Notting Hill</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Leather Jacket Alterations', 'Quoted on inspection — sleeves, body, zip by specialist'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for delicate and structured pieces'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Notting Hill address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Notting Hill</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Notting Hill W11 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Notting Hill door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Notting Hill Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had a vintage leather jacket and two dresses collected from my Portobello Road flat. Everything came back altered perfectly, handled with real care.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Lucia, Notting Hill</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Notting Hill-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Notting Hill</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>,{' '}
            <Link href="/tailor-paddington" className="text-hunter underline">Paddington</Link> and{' '}
            <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>.
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
