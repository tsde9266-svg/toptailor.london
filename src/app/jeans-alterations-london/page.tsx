import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Jeans Alterations London | Hem, Taper & Waist | Fine Tailors',
  description: 'Jeans alterations in London — hemming, tapering, waist adjustment and repairs collected from your Central London home. Returned perfectly fitted in 5–7 working days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/jeans-alterations-london' },
  keywords: [
    'jeans alterations London',
    'jeans alterations near me London',
    'jeans hemming London',
    'jeans tapered London',
    'hem jeans near me London',
    'jeans taken in London',
    'denim alterations London',
    'jeans waist alteration London',
  ],
  openGraph: {
    title: 'Jeans Alterations London | Home Collection | Fine Tailors',
    description: 'Jeans hemming, tapering and waist adjustments in London — collected from your home and returned in 5–7 working days.',
    url: 'https://www.finetailors.co.uk/jeans-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jeans alterations London home collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Jeans Alterations London', item: 'https://www.finetailors.co.uk/jeans-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Jeans Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Jeans alterations in London including hemming, tapering, waist adjustment and repair. Home collection and return service across Central London.',
  serviceType: 'Jeans Alterations',
}

const jeansServices = [
  {
    title: 'Hem Shortening',
    desc: 'Shortening jeans to the right length — plain hem, original worn hem preserved, or chain-stitch hem for a more authentic finish. From £18.',
  },
  {
    title: 'Original Hem Preservation',
    desc: 'Shortening from the waist while preserving the original distressed or branded hem exactly — a specialist technique for premium denim. From £28.',
  },
  {
    title: 'Leg Tapering',
    desc: 'Narrowing the leg from the knee or thigh for a slimmer, more contemporary silhouette. Single leg from £18, both legs from £18 per pair.',
  },
  {
    title: 'Waist Taking-In',
    desc: 'Reducing the waist where the hips and thighs fit correctly but the waistband is too large — taken in from the back seam. From £22.',
  },
  {
    title: 'Seat & Thigh Adjustment',
    desc: 'Reducing excess fabric across the seat and upper thigh for a cleaner fit through the back. From £25.',
  },
  {
    title: 'Crotch & Inner Seam Repair',
    desc: 'Reinforcing worn or split seams at the inner thigh and crotch — extending the life of well-worn denim. From £20.',
  },
]

export default function JeansAlterationsLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Jeans Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Working Days</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Jeans Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors handles <strong>jeans alterations in London</strong> with the same precision we apply to suits and formal wear. Hemming, tapering, waist adjustment, crotch repair — we collect from your Central London door, alter your denim at our specialist workshop, and return it within 5–7 working days. No shop visit, no carrying jeans across the city.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Denim Is Not Simple</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Jeans look casual but altering them well requires specific knowledge. Denim is heavy, the original seam is usually a felled construction, and premium jeans often have chain-stitched hems, selvedge edges and distressed finishes that cannot simply be re-hemmed with a regular machine.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors alters denim properly — matching thread, preserving original hem character where requested, and handling premium brands from <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> and <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> boutiques with the care they deserve. We also handle tapering on heavier denim where leg seams need to be properly pressed and finished.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We collect from all Central London addresses. All garments are insured while in transit. A written quote is approved before any work begins.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Jeans Alterations We Specialise In</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {jeansServices.map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your London address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call. We confirm a collection time at your Central London address.'],
              ['We Collect Your Jeans', 'We come to your door at the agreed time. No travel required. Everything insured in transit.'],
              ['Written Quote for Approval', 'We assess the required work and send you a quote before any stitching begins.'],
              ['Returned to Your Door', 'Within 5–7 working days your jeans are back at your door, perfectly hemmed, tapered or repaired.'],
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

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Jeans Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our <Link href="/trouser-alterations-london" className="text-hunter underline">trouser alterations</Link>, <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link> and <Link href="/clothing-alterations-london" className="text-hunter underline">all clothing alterations</Link> across Central London.
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
