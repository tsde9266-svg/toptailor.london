import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Leather Jacket Alterations London | Specialist Service | Fine Tailors',
  description: 'Specialist leather jacket alterations in London — sleeve shortening, body take-in, zip replacement and lining repair, collected from your home. Expert handling.',
  alternates: { canonical: 'https://www.finetailors.co.uk/leather-jacket-alterations-london' },
  openGraph: {
    title: 'Leather Jacket Alterations London | Fine Tailors',
    description: 'Specialist leather jacket alterations collected from your London door. Sleeve, body, zip, lining — expert handling for premium and luxury leather.',
    url: 'https://www.finetailors.co.uk/leather-jacket-alterations-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Leather jacket alterations London specialist service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Leather Jacket Alterations London', item: 'https://www.finetailors.co.uk/leather-jacket-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Leather Jacket Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Specialist leather jacket alterations in London collected from your home. Sleeve shortening, body take-in, zip replacement and lining repair.',
  serviceType: 'Leather Jacket Alterations',
}

const alterationTypes = [
  { title: 'Sleeve Shortening', desc: 'Shortening leather jacket sleeves — the hem is finished to match the original. Requires specialist leather sewing equipment. Quoted on inspection.' },
  { title: 'Body Take-In', desc: 'Taking in the body of a leather jacket along the side seams for a slimmer fit. Marks from previous seams may be visible on some leathers — assessed beforehand.' },
  { title: 'Zip Replacement', desc: 'Replacing main zip or pocket zips. We match the original hardware where possible. Quoted on inspection.' },
  { title: 'Lining Replacement', desc: 'Replacing worn or torn leather jacket lining with quality fabric matched to the original. Quoted on inspection.' },
  { title: 'Collar & Snap Repair', desc: 'Repairing or replacing collars, press studs and snap fasteners. Quoted on inspection.' },
  { title: 'Leather Repair & Patching', desc: 'Minor leather repairs, scuffs and patching — assessed individually on inspection.' },
]

export default function LeatherJacketAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-leather" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-leather" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-leather" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Leather Jacket Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Specialist Leather Work · Collected From Your Home</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Leather Jacket Alterations in London —{' '}
            <em className="font-playfair italic">Specialist Handling</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides specialist <strong>leather jacket alterations in London</strong> with a collection service from your home. Luxury leather jackets require different equipment and expertise to fabric garments — we have both. Quoted individually on inspection.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Leather Jacket Alterations Require a Specialist</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Leather is not forgiving. Unlike fabric, needle holes in leather are permanent — a wrong stitch placement cannot be unpicked without trace. Leather requires specific sewing machinery, specialist needles, and adhesives designed for the material. The tailor who shortens your suit trousers is not necessarily the right person to take in your leather jacket.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors has experience with premium and luxury leather garments — biker jackets, bomber jackets, designer pieces and luxury brand leather. We are experienced with working on high-value leathers from luxury brands and handle every piece with care appropriate to its value.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            All leather jacket alteration work is quoted individually after inspection, as the leather type, construction and extent of the alteration affect complexity significantly. We collect from <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link>, <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Leather Jacket Work We Handle</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {alterationTypes.map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">All leather work is quoted individually on inspection. Minimum order £20. Includes collection and return to your London address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection', 'Book online or call. We collect your leather jacket from your home or office.'],
              ['Inspection & Quote', 'Your jacket is inspected in our workshop. We send a detailed written quote before any work begins.'],
              ['You Approve the Work', 'Work only proceeds after your written approval of the quote. No surprises.'],
              ['Returned, Finished', 'Within the agreed timeframe your jacket is returned to your London address. Leather work turnaround varies by complexity — typically 7–10 working days.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Leather Jacket Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/jacket-alterations-london" className="text-hunter underline">jacket alterations service</Link> and{' '}
            <Link href="/coat-alterations-london" className="text-hunter underline">coat alterations service</Link>.
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
