import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Mayfair London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Mayfair. We collect from your W1J/W1K door, alter to a perfect fit, and return pressed and perfect in 5–7 days. No shop visit needed.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-mayfair' },
  openGraph: {
    title: 'Tailor in Mayfair London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-mayfair',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Mayfair, Central London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Mayfair', item: 'https://www.finetailors.co.uk/tailor-mayfair' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Mayfair' },
  description: 'Collection-based tailoring service collecting from Mayfair addresses. Garments collected from your W1J or W1K door, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you handle designer and luxury garments collected in Mayfair?',
    a: 'Yes. Many of our Mayfair clients have garments from luxury brands and high-end designers. The collection model is particularly suited to valuable pieces — your garment goes directly from your door to our workshop and back, never sitting in a public shop.',
  },
  {
    q: 'Can you collect from a serviced apartment or hotel in Mayfair?',
    a: 'Yes. We collect from hotel rooms, serviced apartments and private residences across Mayfair. Just provide the address and any access instructions when booking and we will coordinate accordingly.',
  },
]

export default function TailorMayfair() {
  return (
    <>
      <Script id="schema-breadcrumb-mayfair" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-mayfair" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-mayfair" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Mayfair</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Mayfair, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors is a collection-based tailoring service covering all Mayfair addresses. We collect your garments from your Grosvenor Square apartment or Mount Street townhouse, alter them at our specialist workshop, and return them pressed and perfect in 5–7 days. No shop visit. No stranger in your home.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Mayfair</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Mayfair is one of London&apos;s most prestigious addresses, and its residents expect a standard of service that reflects that. Finance professionals on Berkeley Square, private members club regulars near St James&apos;s, hotel guests at The Dorchester and Claridge&apos;s, residents of the grand garden-square apartments — they all have one thing in common: their time is valuable, and their wardrobes are too.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors exists precisely for this kind of client. Our <strong>Mayfair tailoring collection service</strong> means your garments never leave the W1 postcode in the back of a taxi, never sit in a crowded shop. We collect from your door at a time that suits you, alter every piece with precision in our workshop, and return everything — jacket, trousers, dress, coat — to your exact address within 5–7 working days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            With over 10 years operating across Central London, we regularly handle luxury designer garments, bespoke suits, and occasion wear with the care they deserve. One tailor handles your clothes from collection to return — the Single Needle Guarantee.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Mayfair</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Mayfair address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Mayfair</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a convenient time at your Mayfair address — W1J, W1K or surrounding streets.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home. No travel required from you.'],
              ['We Alter Every Piece', 'Your garments are worked on in our specialist workshop. We send a written quote before a single stitch is placed — you approve first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your door, pressed and ready to wear. You pay only after approving the quote.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Mayfair Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had a suit collected from my Mayfair flat on Monday. Back by Thursday perfectly altered. Couldn&rsquo;t be easier — and the fit was exactly right.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— James, Mayfair</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Mayfair-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Mayfair</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>,{' '}
            <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and{' '}
            <Link href="/tailor-soho" className="text-hunter underline">Soho</Link>.
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
