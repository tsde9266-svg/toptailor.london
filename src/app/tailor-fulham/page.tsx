import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Fulham London | Fine Tailors',
  description: 'Searching for a tailor near you in Fulham? We collect from your SW6 door, alter suits, dresses and clothing to a perfect fit, and return in 5–7 days. No shop visit.',
  keywords: ['tailor near me Fulham', 'tailor near me Fulham London', 'Fulham tailor near me', 'nearest tailor Fulham', 'tailor Fulham'],
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-fulham' },
  openGraph: {
    title: 'Tailor Near Me in Fulham London | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-fulham',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Fulham, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Fulham', item: 'https://www.finetailors.co.uk/tailor-fulham' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Fulham', containedInPlace: { '@type': 'City', name: 'London' } },
  description: 'Collection-based tailoring service covering Fulham and Parsons Green. Garments collected from SW6 addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Parsons Green, Sands End and Munster Village in Fulham?',
    a: 'Yes. We cover all of SW6 including Parsons Green, Sands End, Munster Village and the streets around Fulham Broadway. From New King\'s Road to Fulham Road, we collect from any Fulham address.',
  },
  {
    q: 'Can you alter smart-casual garments as well as formal wear?',
    a: 'Yes. We alter all garment types — suits, chinos, jeans, casual jackets, coats, dresses and knitwear. There is no minimum formality requirement. If it needs altering, we can most likely help.',
  },
]

export default function TailorFulham() {
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
            <span>Tailor in Fulham</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Fulham, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Fulham and Parsons Green addresses — New King&apos;s Road, Fulham Road, Munster Village and beyond — and returns them perfectly altered within 5–7 days. No travel, no shop visit.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Fulham</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fulham is home to busy professionals and young families who appreciate quality local services — and who expect those services to come to them rather than requiring a trip across London. Our <strong>Fulham tailoring collection service</strong> is designed precisely for this community.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We collect from your SW6 door at a time you choose — whether you&apos;re on the New King&apos;s Road, near Parsons Green tube, or in the quiet streets of Munster Village. Your garments go to our specialist workshop, are altered to a perfect fit, and returned to your door within 5–7 working days. No carrying bags to a shop. No waiting in a queue on your lunch break.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We handle everything from suit alterations to casual garments, coats, dresses and occasion wear. One tailor handles your clothes from collection to return.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Fulham</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Fulham address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Fulham</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Fulham SW6 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home required.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Fulham door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Fulham Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Three pairs of trousers and a jacket collected from my Parsons Green flat. Back within a week, everything fits perfectly. So much easier than going to a shop.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Tom, Fulham</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Fulham-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Fulham</h2>
          <p className="font-sans font-light text-muted mb-4 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>,{' '}
            <Link href="/tailor-south-kensington" className="text-hunter underline">South Kensington</Link> and{' '}
            <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>.
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
