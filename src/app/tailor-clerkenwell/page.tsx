import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Clerkenwell London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Clerkenwell. We collect from your EC1R/EC1V door, alter for design and creative professionals, and return in 5–7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-clerkenwell' },
  openGraph: {
    title: 'Tailor in Clerkenwell London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-clerkenwell',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Clerkenwell, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Clerkenwell', item: 'https://www.finetailors.co.uk/tailor-clerkenwell' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Clerkenwell' },
  description: 'Collection-based tailoring service covering Clerkenwell. Garments collected from EC1R and EC1V addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Exmouth Market, Farringdon Road and the EC1R area?',
    a: 'Yes. We cover all EC1R and EC1V postcodes — Exmouth Market, Farringdon Road, Clerkenwell Road and the surrounding design studios, architecture firms and residential buildings.',
  },
  {
    q: 'Can you collect from design studios and architecture firms in Clerkenwell?',
    a: 'Yes. Clerkenwell is home to London&apos;s highest concentration of design and architecture studios. We collect from offices, studios and workshops of all types — just provide the address and access details when booking.',
  },
]

export default function TailorClerkenwell() {
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
            <span>Tailor in Clerkenwell</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Clerkenwell, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Clerkenwell addresses — Exmouth Market, Farringdon Road, St John Street and beyond — and returns them altered to a perfect fit within 5–7 days. For design, architecture and creative industry professionals.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Clerkenwell</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Clerkenwell has one of the highest concentrations of design studios, architecture firms and creative industry offices in Europe. Exmouth Market&apos;s mix of independent restaurants and studios, Farringdon Road&apos;s media and design companies, and the converted warehouse spaces throughout EC1 form a creative community with a strong aesthetic sensibility and a need for services that understand quality.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Clerkenwell tailoring collection service</strong> covers all EC1R and EC1V postcodes. We collect from your studio, office or apartment at a time you choose, alter every garment in our specialist workshop, and return it pressed and perfect within 5–7 working days. No shop visit, no travel — just collection from your door and return to it.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Clerkenwell sits between the City of London and Islington. We serve the full EC1 corridor and the surrounding areas.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Clerkenwell</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Leather Jacket Alterations', 'Quoted on inspection — specialist work on leather garments'],
              ['Clothing Repairs', 'Zip replacements, rehem from £8, patch repairs from £18'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Clerkenwell address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Clerkenwell</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Clerkenwell EC1R or EC1V address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Studio, office and residential collections all accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Clerkenwell address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Clerkenwell Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from our Exmouth Market studio on Monday, back Thursday. Three jackets and two pairs of trousers — all perfect. Highly recommend for the EC1 area.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Seb, Clerkenwell</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Clerkenwell-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Clerkenwell</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-islington" className="text-hunter underline">Islington</Link>,{' '}
            <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link> and{' '}
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
