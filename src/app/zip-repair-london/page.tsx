import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Zip Repair London | Collected From Your Home | Fine Tailors',
  description: 'Broken zip? Fine Tailors repairs and replaces zips on trousers, dresses, jackets and coats across Central London. Home collection and return — no shop visit needed.',
  alternates: { canonical: 'https://www.finetailors.co.uk/zip-repair-london' },
  keywords: [
    'zip repair London',
    'zip repair near me London',
    'broken zip repair London',
    'trouser zip replacement London',
    'dress zip repair London',
    'jacket zip repair London',
    'zip replacement near me',
    'coat zip repair London',
  ],
  openGraph: {
    title: 'Zip Repair London | Home Collection | Fine Tailors',
    description: 'Zip repairs and replacements collected from your Central London home. Trousers, dresses, jackets and coats — returned fixed in 5–7 working days.',
    url: 'https://www.finetailors.co.uk/zip-repair-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zip repair London home collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Zip Repair London', item: 'https://www.finetailors.co.uk/zip-repair-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Zip Repair London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Zip repair and replacement service in London. Collection and return from your Central London address. Trousers, dresses, jackets, coats and bags.',
  serviceType: 'Zip Repair',
}

const zipTypes = [
  {
    title: 'Trouser Zip Replacement',
    desc: 'Replacing a broken, stuck or seized trouser zip — preserving the original waistband, lining and facing. From £25.',
  },
  {
    title: 'Dress Zip Replacement',
    desc: 'Invisible zips, regular zips and exposed zips replaced on all dress types — occasion wear, everyday and designer garments. From £28.',
  },
  {
    title: 'Jacket & Coat Zip Replacement',
    desc: 'Full-length jacket and coat zips — including chunky separating zips — replaced with matched hardware and an invisible finish. From £35.',
  },
  {
    title: 'Skirt Zip Repair',
    desc: 'Side zips, back zips and concealed zips on skirts and tailored pieces replaced to an invisible standard. From £25.',
  },
  {
    title: 'Leather Jacket Zip',
    desc: 'Specialist zip replacement on leather jackets and leather garments — quoted on inspection to match the original hardware.',
  },
  {
    title: 'Bag Zip Repair',
    desc: 'Zip repairs on bags, holdalls and accessories — quoted individually. Not all bag constructions are repairable without specialist equipment.',
  },
]

export default function ZipRepairLondon() {
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
            <span>Zip Repair London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Working Days</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Zip Repair in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            A broken zip does not mean a garment is finished. Fine Tailors repairs and replaces zips on trousers, dresses, jackets, coats and skirts across Central London — collected from your door, returned fixed and finished within 5–7 working days. No shop visit required.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Not Replace the Zip Yourself</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A zip replacement that goes wrong is a much bigger problem than the original broken zip. The facing, lining, waistband or seam around a zip is often what determines whether the repair is invisible or obvious. Replacing a zip on a suit trouser, a silk dress or a tailored jacket requires the right tools and enough experience to match the original construction.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors handles <strong>zip repairs in London</strong> with the same care applied to all garment work — matching zip weight and tooth colour, preserving the original facing and lining, finishing the repair so it is indistinguishable from the factory fit. We collect from your <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> or any other Central London address.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            A written quote is provided before any work begins. Garments are fully insured while in our care.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Zip Repairs We Handle</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {zipTypes.map(({ title, desc }) => (
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
              ['We Collect Your Garment', 'We collect your item from your door. No travel, no risk of further damage in transit. Garment fully insured.'],
              ['We Quote and Fix the Zip', 'We inspect the garment, assess the repair required, and send a written quote for your approval before any work begins.'],
              ['Returned to Your Door', 'Within 5–7 working days your garment is back at your door with the zip repaired to an invisible finish.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Zip Repair in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link>, <Link href="/dress-alterations-london" className="text-hunter underline">dress alterations</Link> and <Link href="/trouser-alterations-london" className="text-hunter underline">trouser alterations</Link> across Central London.
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
