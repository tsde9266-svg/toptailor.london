import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Marylebone London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Marylebone. We collect from your W1G/W1U door, alter to a perfect fit, and return pressed and perfect in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-marylebone' },
  openGraph: {
    title: 'Tailor in Marylebone London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-marylebone',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Marylebone, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Marylebone', item: 'https://www.finetailors.co.uk/tailor-marylebone' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Marylebone' },
  description: 'Collection-based tailoring service covering Marylebone. Garments collected from W1G and W1U addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you collect from Harley Street and medical professional addresses in Marylebone?',
    a: 'Yes. Harley Street and the surrounding W1G streets are well within our Marylebone collection zone. Medical consultants and private practice professionals who need suits and formal wear altered are among our regular Marylebone clients.',
  },
  {
    q: 'Can you alter bespoke or boutique pieces from the Chiltern Street and High Street area?',
    a: 'Yes. We work with garments from the independent boutiques on Chiltern Street, Marylebone High Street and the surrounding streets. The collection model means the piece goes from your door to our workshop and back — never sitting in a public shop.',
  },
]

export default function TailorMarylebone() {
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
            <span>Tailor in Marylebone</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Marylebone, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Marylebone addresses — Harley Street, Welbeck Street, Chiltern Street and beyond — and returns them altered to a perfect fit within 5–7 days. Discreet, premium, collection-based.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Marylebone</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Marylebone sits between the bustle of Oxford Street and the quiet elegance of Regent&apos;s Park. Its residents — medical consultants on Harley Street, private practice professionals on Welbeck Street, design-conscious residents of Chiltern Street and the Georgian streets to the east — share an appreciation for quality delivered without compromise. Fine Tailors is built for exactly this clientele.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Marylebone tailoring collection service</strong> covers all W1G and W1U postcodes and the surrounding streets. We collect from your door at a time you choose, alter every piece — suits, dresses, coats, tailored shirts — in our specialist workshop, and return them pressed and perfect within 5–7 working days. No travel required from you. No strangers in your home.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Garments from the boutiques of Chiltern Street and Marylebone High Street require the same care and precision as any bespoke piece. We handle them all with equal attention.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Marylebone</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Bespoke & Made-to-Measure', 'Consultations for clients requiring garments built to exact specification'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for delicate and structured pieces'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Marylebone address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Marylebone</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Marylebone W1G or W1U address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments from your door. No entry to your home required.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop. Written quote approved by you before work begins.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Marylebone door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Marylebone Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Welbeck Street address on a Thursday, back by Wednesday. Two suits and a coat, all perfect. This is the way tailoring should work in London.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Dr. Hasan, Marylebone</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Marylebone-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Marylebone</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>,{' '}
            <Link href="/tailor-fitzrovia" className="text-hunter underline">Fitzrovia</Link> and{' '}
            <Link href="/tailor-paddington" className="text-hunter underline">Paddington</Link>.
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
