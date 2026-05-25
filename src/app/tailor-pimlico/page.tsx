import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Pimlico London | Fine Tailors',
  description: 'Searching for a tailor near you in Pimlico? We collect from your SW1V door, alter suits and clothing, and return pressed and perfect in 5–7 days.',
  keywords: ['tailor Pimlico', 'tailor near me Pimlico', 'tailor near me Pimlico London', 'Pimlico tailor near me', 'nearest tailor Pimlico'],
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-pimlico' },
  openGraph: {
    title: 'Tailor Near Me in Pimlico London | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-pimlico',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Pimlico, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Pimlico', item: 'https://www.finetailors.co.uk/tailor-pimlico' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Pimlico' },
  description: 'Collection-based tailoring service covering Pimlico. Garments collected from SW1V and surrounding addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Warwick Way, Tachbrook Street and the residential streets of Pimlico?',
    a: 'Yes. We cover all SW1V postcodes and the residential streets throughout Pimlico — Warwick Way, Tachbrook Street, Churton Street, Cambridge Street and surrounding areas. Pimlico is well within our regular collection zone.',
  },
  {
    q: 'As a quiet residential area, does Fine Tailors work for everyday wardrobe alterations as well as formal wear?',
    a: 'Yes. Many Pimlico clients come to us for exactly this — everyday suits, casual trousers, jeans, coats and dresses that need a better fit. There is no minimum formality requirement. Minimum order £20.',
  },
]

export default function TailorPimlico() {
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
            <span>Tailor in Pimlico</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Pimlico, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Pimlico addresses — Warwick Way, Tachbrook Street, Claverton Street and beyond — and returns them altered to a perfect fit within 5–7 days. Quiet, residential, convenient.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Pimlico</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Pimlico is one of central London&apos;s most quietly residential neighbourhoods — close to Westminster and Victoria, bordered by the Thames, and home to a steady professional community that has lived here long enough to know what they want from local services. Discretion, reliability, and the service coming to them.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Pimlico tailoring collection service</strong> covers all SW1V postcodes and the surrounding streets. We collect from your door at a time you choose — whether you&apos;re on a Victorian terrace near Tachbrook Street Market or in one of the larger apartment blocks on Vauxhall Bridge Road. Your garments go to our specialist workshop, are altered to a precise fit, and returned within 5–7 working days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Pimlico is a short distance from Westminster and Belgravia. We serve the full SW1 corridor with equal regularity.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Pimlico</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for formal pieces'],
              ['Clothing Repairs', 'Zip replacements, rehem from £8, patch repairs from £18'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Pimlico address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Pimlico</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Pimlico SW1V address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Pimlico door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Pimlico Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had garments collected from my Warwick Way flat. Everything came back perfectly altered within the week. Exactly the kind of service Pimlico has needed.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Sarah, Pimlico</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Pimlico-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Pimlico</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link>,{' '}
            <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link> and{' '}
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
