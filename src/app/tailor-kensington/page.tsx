import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Kensington London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Kensington. We collect from your W8 door, alter to a perfect fit, and return pressed and perfect in 5–7 days. No shop visit needed.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-kensington' },
  openGraph: {
    title: 'Tailor in Kensington London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-kensington',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Kensington, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Kensington', item: 'https://www.finetailors.co.uk/tailor-kensington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Kensington' },
  description: 'Collection-based tailoring service covering Kensington. Garments collected from your W8 door, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Holland Park and the wider W8 area?',
    a: 'Yes. We cover all W8 postcodes including Kensington, Holland Park and the residential streets between High Street Kensington and Notting Hill Gate. If you are on the border, just call us and we will confirm.',
  },
  {
    q: 'Can you alter formal wear for events at the Royal Albert Hall or nearby venues?',
    a: 'Yes. We handle occasion wear and formal garments regularly. If you have an upcoming event and need alterations completed quickly, call us directly and we will work around your deadline where possible.',
  },
]

export default function TailorKensington() {
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
            <span>Tailor in Kensington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Kensington, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Kensington addresses — Holland Park, Pemberton Gardens, the streets around High Street Kensington — and returns them altered to a perfect fit within 5–7 days. Professional, discreet, precise.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Kensington</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Kensington is one of London&apos;s most sought-after postcodes — the garden squares, stucco-fronted townhouses, and proximity to the cultural institutions of Exhibition Road make it home to one of the capital&apos;s most discerning communities. Residents here value their time and expect quality services to come to them, not the other way around.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Kensington tailoring collection service</strong> delivers exactly that. We collect from your W8 door — whether that&apos;s a Holland Park townhouse, a flat above Kensington High Street, or a garden-facing apartment on Phillimore Gardens — alter every piece in our specialist workshop, and return them pressed and perfect within 5–7 working days. The tailor never enters your home. Your garments never sit in a public shop.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            From everyday suit alterations to occasion wear for a black-tie event at the Royal Albert Hall, we handle it all with the same precision and care. One tailor, one point of contact, from collection to return.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Kensington</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for formal and structured pieces'],
              ['Leather Jacket Alterations', 'Quoted on inspection — specialist work on leather garments'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Kensington address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Kensington</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Kensington W8 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Kensington door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Kensington Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Brilliant. Collected from my Holland Park address, alterations done perfectly, back within the week. No fuss, no travel — exactly what I needed.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Emma, Kensington</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Kensington-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Kensington</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>,{' '}
            <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link> and{' '}
            <Link href="/tailor-south-kensington" className="text-hunter underline">South Kensington</Link>.
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
