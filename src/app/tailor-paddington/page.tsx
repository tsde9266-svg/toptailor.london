import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Paddington London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Paddington. We collect from your W2 door, alter suits and clothing, and return pressed and perfect in 5–7 days. No shop visit needed.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-paddington' },
  openGraph: {
    title: 'Tailor in Paddington London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-paddington',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Collection-based tailoring service in Paddington, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Paddington', item: 'https://www.finetailors.co.uk/tailor-paddington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Paddington' },
  description: 'Collection-based tailoring service covering Paddington. Garments collected from W2 addresses including hotels and apartments, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Can you collect from hotels in Paddington for business travellers?',
    a: 'Yes. We regularly collect from hotels in the Paddington and W2 area. If you are staying in the area for work and need alterations done quickly, call us on +44 7438 145169 and we will confirm what is achievable within your stay.',
  },
  {
    q: 'Do you cover Praed Street and the streets around Paddington station?',
    a: 'Yes. We cover all W2 postcodes — Praed Street, Westbourne Terrace, Sussex Gardens and the surrounding residential and hotel buildings around Paddington station.',
  },
]

export default function TailorPaddington() {
  return (
    <>
      <Script id="schema-breadcrumb-paddington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-paddington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-paddington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Paddington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Paddington, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Paddington addresses — Praed Street, Westbourne Terrace, Sussex Gardens and beyond — and returns them altered to a perfect fit within 5–7 days. Hotels and long-stay accommodation welcome.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Paddington</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Paddington is one of London&apos;s busiest transit hubs, with a significant population of business travellers, professionals on extended stays, and residents in the large W2 apartment buildings. For the business traveller who needs a suit altered quickly, or the W2 resident who simply wants expert tailoring without a shop visit, Fine Tailors provides exactly the right service.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Paddington tailoring collection service</strong> covers all W2 addresses — hotel rooms, serviced apartments and residential buildings. We collect at a time you choose, alter every piece in our specialist workshop, and return everything pressed and perfect within 5–7 working days. Hotel collections are fully accommodated with advance notice.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Paddington borders Notting Hill and Marylebone. We serve the full W2 and surrounding postcode area.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Paddington</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Paddington address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Paddington</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Paddington W2 address — home, hotel or serviced apartment.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Hotel and serviced apartment collections fully accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Paddington address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Paddington Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;I was staying in Paddington for two weeks on business. Had two suits collected from my hotel. Both came back perfectly altered before I left. Incredibly convenient service.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Robert, staying in Paddington</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Paddington-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Paddington</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link>,{' '}
            <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link> and{' '}
            <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>.
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
