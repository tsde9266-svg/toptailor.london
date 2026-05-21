import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Covent Garden London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Covent Garden. We collect from your WC2E door, alter suits, stage wear and clothing to a perfect fit, and return in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-covent-garden' },
  openGraph: {
    title: 'Tailor in Covent Garden London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-covent-garden',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Collection-based tailoring service in Covent Garden, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Covent Garden', item: 'https://www.finetailors.co.uk/tailor-covent-garden' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Covent Garden' },
  description: 'Collection-based tailoring service covering Covent Garden. Garments collected from WC2E addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Can you collect from a WC2E address near the Strand or Long Acre?',
    a: 'Yes. We cover all WC2E postcodes and the surrounding Covent Garden streets — Long Acre, Seven Dials, the Strand corridor and the residential and office buildings throughout the area.',
  },
  {
    q: 'Do you work with theatrical or performance wear for the theatre district?',
    a: 'Yes. Covent Garden&apos;s theatre district means we regularly work with performers, production staff and hospitality workers who need precise-fit garments. We handle all garment types including tailored costumes, uniforms and stage clothing, quoted on inspection for specialist pieces.',
  },
]

export default function TailorCoventGarden() {
  return (
    <>
      <Script id="schema-breadcrumb-covent" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-covent" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-covent" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Covent Garden</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Covent Garden, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Covent Garden addresses — Long Acre, Seven Dials, the Strand and beyond — and returns them altered to a perfect fit within 5–7 days. For theatre professionals, restaurant workers, hospitality staff and Covent Garden residents.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Covent Garden</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Covent Garden is one of London&apos;s most distinctive areas — the theatre district, the market piazza, Seven Dials&apos; independent boutiques, and the Strand&apos;s mix of offices and hotels all converge in a small area that has a unique professional population. Performers who need stage garments to fit precisely. Hospitality and restaurant workers who need smart uniforms altered. Production staff who have little time for a shop visit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Covent Garden tailoring collection service</strong> serves all of these clients. We collect from your WC2E address at a time you choose, alter every piece in our specialist workshop, and return everything pressed and perfect within 5–7 working days. For residents, the same service applies — no travel, no shop visit, just collection from your door and return to it.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Covent Garden sits at the junction of the West End, the legal district and the creative corridor running towards Soho. We serve the full WC2 and surrounding area.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Covent Garden</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Uniforms & Workwear', 'Smart uniforms, hospitality and front-of-house workwear alterations'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for formal pieces'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Covent Garden address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Covent Garden</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Covent Garden WC2E address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Office, residential and hotel collections all accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Covent Garden address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Covent Garden Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had stage costumes and two suits collected from our Seven Dials flat. Everything came back fitting perfectly — and the turnaround was exactly as promised.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Marcus, Covent Garden</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Covent Garden-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Covent Garden</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-soho" className="text-hunter underline">Soho</Link>,{' '}
            <Link href="/tailor-bloomsbury" className="text-hunter underline">Bloomsbury</Link> and{' '}
            <Link href="/tailor-fitzrovia" className="text-hunter underline">Fitzrovia</Link>.
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
