import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Barbour Jacket Alterations London | Specialist Service | Fine Tailors',
  description: 'Specialist Barbour jacket alterations in London — sleeve shortening, body adjustments and repairs on waxed cotton and quilted jackets, collected from your home.',
  alternates: { canonical: 'https://www.finetailors.co.uk/barbour-alterations-london' },
  openGraph: {
    title: 'Barbour Jacket Alterations London | Fine Tailors',
    description: 'Specialist Barbour jacket alterations collected from your London door. Waxed cotton and quilted — expert handling.',
    url: 'https://www.finetailors.co.uk/barbour-alterations-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Barbour jacket alterations London specialist service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Barbour Alterations London', item: 'https://www.finetailors.co.uk/barbour-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Barbour Jacket Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Specialist Barbour waxed cotton and quilted jacket alterations in London collected from your home.',
  serviceType: 'Outerwear Alterations',
}

export default function BarbourAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-barbour" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-barbour" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-barbour" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Barbour Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Specialist Outerwear · Collected From Your Home</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Barbour Jacket Alterations in London —{' '}
            <em className="font-playfair italic">Waxed Cotton Specialist</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors is experienced with Barbour jacket alterations in London. Waxed cotton requires different handling from conventional fabrics — needle holes are more visible, adhesives must be wax-compatible, and the construction of Barbour jackets demands familiarity with the brand&apos;s specific build. We collect from your home and return every jacket properly altered.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Altering Barbour&apos;s Waxed Cotton — What to Know</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Barbour waxed cotton jackets are among the most enduring British outerwear garments — designed to last decades, often passed between generations. The waxed cotton construction that makes them weather-resistant also means they require specific handling when alteration is needed.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Needle holes in waxed cotton are not invisible — the wax seals around them over time but immediately after alteration, the holes are more apparent than in conventional fabric. This is important to know before committing to an alteration. Seam finishes must also be compatible with the wax. Fine Tailors is experienced with this and will advise you on what is achievable and what the result will look like before any work is started.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Barbour quilted jackets are also handled — these follow more conventional construction and are generally more straightforward to alter than the waxed cotton range.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We collect from <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link> and across Central London.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Barbour Alterations We Handle</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              { title: 'Sleeve Shortening', desc: 'Shortening sleeves on waxed cotton and quilted Barbour jackets. The cuff finish is matched to the original. Quoted on inspection.' },
              { title: 'Body Take-In', desc: 'Taking in the body of a Barbour jacket for a slimmer silhouette. Needle hole visibility discussed upfront on waxed models.' },
              { title: 'Length Shortening', desc: 'Reducing jacket length — achievable on most Barbour styles. Assessed on inspection.' },
              { title: 'Zip & Fastener Repair', desc: 'Replacing main zip or press studs. We source compatible hardware for Barbour models.' },
              { title: 'Lining Repair', desc: 'Repairing or replacing the interior tartan or quilted lining on worn Barbour jackets.' },
              { title: 'Pocket Repair', desc: 'Repairing torn pocket linings and re-stitching pocket openings. From £20.' },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">All Barbour alteration work is quoted individually on inspection. We will always advise on what the result will look like before work begins.</p>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Barbour Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/coat-alterations-london" className="text-hunter underline">coat alterations service</Link> and{' '}
            <Link href="/canada-goose-alterations-london" className="text-hunter underline">Canada Goose alterations service</Link>.
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
