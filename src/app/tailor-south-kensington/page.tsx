import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in South Kensington London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in South Kensington. We collect from your SW7 door, alter to a perfect fit, and return pressed and perfect in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-south-kensington' },
  openGraph: {
    title: 'Tailor in South Kensington London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-south-kensington',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in South Kensington, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in South Kensington', item: 'https://www.finetailors.co.uk/tailor-south-kensington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'South Kensington' },
  description: 'Collection-based tailoring service covering South Kensington. Garments collected from SW7 addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Onslow Square, Cranley Gardens and the wider SW7 area?',
    a: 'Yes. We cover all SW7 postcodes including Onslow Square, Cranley Gardens, Gloucester Road and the streets around South Kensington station. If you are on the SW5 or SW3 border, we almost certainly cover your address.',
  },
  {
    q: 'Can you alter evening wear for cultural events at the V&A, Science Museum or nearby venues?',
    a: 'Yes. Evening wear and occasion wear alterations are a regular part of our service. If you have a specific event date, mention it when booking and we will confirm whether your timeline can be accommodated.',
  },
]

export default function TailorSouthKensington() {
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
            <span>Tailor in South Kensington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in South Kensington, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from South Kensington addresses — Onslow Square, Cranley Gardens, Gloucester Road and beyond — and returns them altered to a perfect fit within 5–7 days. Premium service for one of London&apos;s most cosmopolitan neighbourhoods.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across South Kensington</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            South Kensington is one of London&apos;s most cosmopolitan and affluent neighbourhoods — the tree-lined garden squares, the grand Victorian mansion blocks, and proximity to Exhibition Road&apos;s world-class cultural institutions create a community that expects quality in every service. Fine Tailors delivers precisely that.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>South Kensington tailoring collection service</strong> covers all SW7 postcodes. We collect from your door at a time you choose — whether you&apos;re on Onslow Square, Cranley Gardens or anywhere in the area — alter every piece in our specialist workshop, and return them pressed and perfect within 5–7 working days. No travel, no shop visit, no inconvenience.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            South Kensington&apos;s international resident community means we regularly handle garments from all over the world — luxury Italian suits, French designer dresses, British tailored coats — each treated with equal care and expertise.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From South Kensington</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your South Kensington address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in South Kensington</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your South Kensington SW7 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your South Kensington door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What South Kensington Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from Cranley Gardens on Monday, delivered back Thursday. Two dresses and a suit, all perfectly altered. Effortless from start to finish.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Isabelle, South Kensington</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">South Kensington-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in South Kensington</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>,{' '}
            <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link> and{' '}
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
