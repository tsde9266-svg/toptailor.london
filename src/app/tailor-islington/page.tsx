import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Islington London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Islington. We collect from your N1 door, alter suits, dresses and clothing to a perfect fit, and return in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-islington' },
  openGraph: {
    title: 'Tailor in Islington London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-islington',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Islington, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Islington', item: 'https://www.finetailors.co.uk/tailor-islington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Islington' },
  description: 'Collection-based tailoring service covering Islington, Angel and Highbury. Garments collected from N1 addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Barnsbury, De Beauvoir Town and Canonbury in Islington?',
    a: 'Yes. We cover all N1 postcodes including Barnsbury, De Beauvoir Town, Canonbury, Angel and the streets around Upper Street. If you are on the N1C or N5 border, call us to confirm.',
  },
  {
    q: 'Can you alter garments bought from the independent boutiques on Upper Street?',
    a: 'Yes. Upper Street and the surrounding area has a strong independent fashion scene. We regularly collect and alter garments from Islington boutiques and returns them fitting precisely. The collection model is ideal for pieces from smaller brands.',
  },
]

export default function TailorIslington() {
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
            <span>Tailor in Islington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Islington, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Islington addresses — Upper Street, Angel, Barnsbury, Canonbury and beyond — and returns them altered to a perfect fit within 5–7 days. For busy professionals and families who want expert tailoring without the inconvenience.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Islington</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Islington&apos;s Georgian terraces and garden squares house a mixed professional and creative community — people who appreciate quality, value their time, and increasingly expect services to come to them rather than requiring a journey across London. Our <strong>Islington tailoring collection service</strong> is built for this community.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We collect from your N1 door at a time you choose — morning, afternoon or evening. Your garments go to our specialist workshop, where each piece is altered by hand and machine to a precise fit. Within 5–7 working days everything is returned to your Islington address, pressed and ready to wear.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Islington is well placed for City workers who live north of the Square Mile. If you commute into EC1 or EC2, we can arrange a collection from either your home address or your office.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Islington</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for delicate and structured pieces'],
              ['Clothing Repairs', 'Zip replacements, rehem from £8, patch repairs from £18'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Islington address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Islington</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Islington N1 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home required.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Islington door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Islington Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Canonbury flat on a Tuesday, back Friday. Two suits altered perfectly. Exactly the kind of service that should exist in Islington.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Oliver, Islington</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Islington-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Islington</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>,{' '}
            <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link> and{' '}
            <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link>.
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
