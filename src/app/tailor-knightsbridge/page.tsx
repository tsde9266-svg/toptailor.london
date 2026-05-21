import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Knightsbridge London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Knightsbridge. We collect from your SW1X/SW7 door, alter luxury garments to a perfect fit, and return in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-knightsbridge' },
  openGraph: {
    title: 'Tailor in Knightsbridge London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-knightsbridge',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Knightsbridge, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Knightsbridge', item: 'https://www.finetailors.co.uk/tailor-knightsbridge' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Knightsbridge' },
  description: 'Collection-based tailoring service covering Knightsbridge. Garments collected from your SW1X or SW7 door, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you alter luxury purchases from Harrods or Harvey Nichols collected in Knightsbridge?',
    a: 'Yes. Many Knightsbridge clients bring us garments purchased at Harrods and Harvey Nichols that need personalising to their exact measurements. We collect from your Knightsbridge address, handle each piece with the care it deserves, and return it fitted perfectly.',
  },
  {
    q: 'Can you collect the same day if I\'ve just bought something in Knightsbridge that needs altering?',
    a: 'We can usually accommodate a next-day or same-week collection. Call us directly on +44 7438 145169 to discuss your timeline and we will confirm what is possible.',
  },
]

export default function TailorKnightsbridge() {
  return (
    <>
      <Script id="schema-breadcrumb-knightsbridge" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-knightsbridge" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-knightsbridge" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Knightsbridge</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Knightsbridge, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Steps from Harrods and Harvey Nichols, Fine Tailors collects garments from Knightsbridge doors and returns them altered to a perfect fit within 5–7 days. Luxury garments handled with the care they deserve. No shop visit. No inconvenience.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Knightsbridge</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Knightsbridge is synonymous with luxury — the grand department stores on Brompton Road, the private residences behind them on Montpelier Square and Beauchamp Place, the international guests at the capital&apos;s finest hotels. The people who live here expect every service they use to match the standard of the neighbourhood. Fine Tailors is built to meet that expectation.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Knightsbridge tailoring collection service</strong> is simple: we collect from your SW1X or SW7 door at a time you choose, handle every piece with specialist care in our workshop, and return your garments — jacket, dress, suit, coat — pressed and fitted perfectly within 5–7 working days. The tailor never enters your home. Your garments never sit in a public shop.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Clients regularly trust us with designer and luxury pieces purchased from Harrods and Harvey Nichols that need personalising to their exact fit. This is what fine tailoring in Knightsbridge should feel like.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Knightsbridge</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for bridal and formal pieces'],
              ['Leather Jacket Alterations', 'Quoted on inspection — sleeves, body, zip by specialist'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Knightsbridge address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Knightsbridge</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a convenient time at your Knightsbridge SW1X or SW7 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop. Written quote approved by you before work begins.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Knightsbridge door, pressed and perfect.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Knightsbridge Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;I had a jacket from Harrods that needed the sleeves shortened. Collected Tuesday, back Friday, fits beautifully. Exactly the kind of service this area deserves.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Richard, Knightsbridge</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Knightsbridge-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Knightsbridge</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>,{' '}
            <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link> and{' '}
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
