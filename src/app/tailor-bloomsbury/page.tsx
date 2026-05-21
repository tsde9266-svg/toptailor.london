import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Bloomsbury London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Bloomsbury. We collect from your WC1B/WC1N door, alter suits and clothing, and return pressed and perfect in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-bloomsbury' },
  openGraph: {
    title: 'Tailor in Bloomsbury London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-bloomsbury',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Bloomsbury, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Bloomsbury', item: 'https://www.finetailors.co.uk/tailor-bloomsbury' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Bloomsbury' },
  description: 'Collection-based tailoring service covering Bloomsbury. Garments collected from WC1B and WC1N addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Russell Square, Gower Street and the university area of Bloomsbury?',
    a: 'Yes. We cover all WC1B and WC1N postcodes including Russell Square, Gower Street, Tavistock Square and the surrounding residential and institutional buildings. UCL, SOAS and BMA staff are among our regular Bloomsbury clients.',
  },
  {
    q: 'Do you work with academic and publishing sector professionals?',
    a: 'Yes. Bloomsbury&apos;s academic and publishing community is well represented among our clients. We handle everything from formal suits and occasion wear to smart-casual garments that need a more precise fit.',
  },
]

export default function TailorBloomsbury() {
  return (
    <>
      <Script id="schema-breadcrumb-bloomsbury" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-bloomsbury" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-bloomsbury" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Bloomsbury</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Bloomsbury, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Bloomsbury addresses — Russell Square, Gower Street, Tavistock Place and beyond — and returns them altered to a perfect fit within 5–7 days. For academics, publishing professionals and Bloomsbury residents who value quality without inconvenience.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Bloomsbury</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Bloomsbury is one of London&apos;s most intellectually distinct neighbourhoods — the British Museum, UCL, SOAS, the British Medical Association, and the cluster of academic publishers that give the area its identity. Its residents and workers tend to be professionals who value quality and convenience in equal measure, but who rarely have time for a high street shop visit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Bloomsbury tailoring collection service</strong> covers all WC1 postcodes. We collect from your door at a time you choose — residential flat, university department, office — alter every garment in our specialist workshop, and return everything pressed and perfect within 5–7 working days. The entire process requires nothing from you except opening your door twice.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Bloomsbury borders Fitzrovia to the west and Covent Garden to the south. We serve the full WC1/WC2 corridor.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Bloomsbury</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Bloomsbury address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Bloomsbury</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Bloomsbury WC1 address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Residential, office and institutional collections accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Bloomsbury door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Bloomsbury Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Russell Square flat on Wednesday, back by Monday. Suit and two dresses, all perfectly altered. Couldn&rsquo;t have been easier.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Professor Naomi, Bloomsbury</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Bloomsbury-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Bloomsbury</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-fitzrovia" className="text-hunter underline">Fitzrovia</Link>,{' '}
            <Link href="/tailor-covent-garden" className="text-hunter underline">Covent Garden</Link> and{' '}
            <Link href="/tailor-islington" className="text-hunter underline">Islington</Link>.
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
