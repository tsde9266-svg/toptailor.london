import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Canada Goose Alterations London | Specialist Service | Fine Tailors',
  description: 'Specialist Canada Goose jacket alterations in London — sleeve shortening, body adjustments and repairs, collected from your home. Expert handling for technical outerwear.',
  alternates: { canonical: 'https://www.finetailors.co.uk/canada-goose-alterations-london' },
  openGraph: {
    title: 'Canada Goose Alterations London | Fine Tailors',
    description: 'Specialist Canada Goose jacket alterations collected from your London door. Expert handling for technical outerwear.',
    url: 'https://www.finetailors.co.uk/canada-goose-alterations-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Canada Goose alterations London specialist service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Canada Goose Alterations London', item: 'https://www.finetailors.co.uk/canada-goose-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Canada Goose Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Specialist Canada Goose jacket alterations in London, collected from your home.',
  serviceType: 'Outerwear Alterations',
}

export default function CanadaGooseAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-cg" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-cg" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-cg" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Canada Goose Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Specialist Outerwear · Collected From Your Home</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Canada Goose Alterations in London —{' '}
            <em className="font-playfair italic">Experienced Specialist Handling</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors is experienced with altering Canada Goose jackets in London. Technical outerwear of this quality requires a tailor who understands the construction — down-fill chambers, welded seams, technical fabrics — before placing a single stitch. We collect from your home and return the garment altered and intact.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Canada Goose Alterations Require a Specialist</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Canada Goose jackets are constructed differently from conventional outerwear. The down-fill chambers are stitched in a specific pattern — alter the wrong seam and you disrupt the fill distribution. The fabrics are technical: Arctic Tech and Fusion Fit materials that behave differently from wool or cotton under a needle.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors is experienced working with Canada Goose outerwear. We do not claim brand certification, but our tailors have handled multiple alterations on these jackets and understand what can and cannot be achieved safely. Every job is assessed on inspection before any quote is given.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The most common alterations requested on Canada Goose jackets are sleeve shortening, body width reduction, and zip or fastener repair. We assess each garment individually and advise on what is achievable before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We collect from <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and all Central London postcodes. The collection model also means your jacket never sits in a shop window or storage room — it goes from your door to our workshop and straight back.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What We Can Alter</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              { title: 'Sleeve Shortening', desc: 'The most requested Canada Goose alteration. Requires careful handling at the cuff construction to avoid disrupting the seal. Quoted on inspection.' },
              { title: 'Body Width Reduction', desc: 'Taking in the body of the jacket for a slimmer fit. Assessed individually as seam placement varies by model.' },
              { title: 'Length Adjustment', desc: 'Shortening the overall jacket length. Assessed on inspection — possible on some models.' },
              { title: 'Zip & Fastener Repair', desc: 'Replacing main zip, cuff zips or press studs. We source matching hardware where possible.' },
              { title: 'Lining Repair', desc: 'Repairing torn or worn interior lining where accessible without disturbing fill.' },
              { title: 'Strap & Trim Adjustment', desc: 'Fur trim reattachment, strap shortening and hood adjustment. Quoted on inspection.' },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">All Canada Goose alteration work is quoted individually after inspection. We are transparent about what is and is not achievable on your specific model.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection', 'Book online or call. We collect your Canada Goose jacket from your Central London address.'],
              ['Inspection & Quote', 'Your jacket is inspected individually. We send a detailed written quote — covering what is possible and what is not — before any work begins.'],
              ['You Approve', 'Work proceeds only after your written approval. No surprises on the bill or on the result.'],
              ['Returned to Your Door', 'Your jacket is returned to your London address within the agreed timeframe.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Canada Goose Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/moncler-jacket-alterations-london" className="text-hunter underline">Moncler jacket alterations service</Link> and{' '}
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
