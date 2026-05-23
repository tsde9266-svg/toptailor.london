import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Bespoke Tailoring London | Made-to-Measure at Home | Fine Tailors',
  description: 'Bespoke and made-to-measure tailoring in London — suits, shirts and trousers made to your exact measurements, with fittings at your Central London address.',
  alternates: { canonical: 'https://www.finetailors.co.uk/bespoke-tailoring-london' },
  openGraph: {
    title: 'Bespoke Tailoring London | Fine Tailors',
    description: 'Made-to-measure suits, shirts and tailoring in London — fitted and made at your home. No shop visit required.',
    url: 'https://www.finetailors.co.uk/bespoke-tailoring-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bespoke tailoring London home service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Bespoke Tailoring London', item: 'https://www.finetailors.co.uk/bespoke-tailoring-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bespoke Tailoring London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Bespoke and made-to-measure tailoring in London — suits, jackets and trousers made to your exact measurements at your home.',
  serviceType: 'Bespoke Tailoring',
}

const services = [
  { title: 'Bespoke Suits', desc: 'A full made-to-measure suit — jacket, trousers, waistcoat if required — cut from your chosen cloth to your exact measurements.' },
  { title: 'Made-to-Measure Shirts', desc: 'Formal dress shirts and business shirts made to your neck, sleeve and body measurements in your chosen fabric.' },
  { title: 'Bespoke Trousers', desc: 'Trousers cut to your measurements — waist, seat, rise and leg — in any cloth from our range.' },
  { title: 'Wedding Suits', desc: 'Bespoke wedding suits for groom and groomsmen, fitted at your Central London address on a timeline that suits your wedding date.' },
  { title: 'Evening Wear', desc: 'Black tie and white tie tailoring — dinner jackets, morning coats, waistcoats — made to order.' },
  { title: 'Cloth Selection', desc: 'Access to a full range of British and Italian cloths including Dormeuil, Holland & Sherry and Huddersfield Fine Worsteds.' },
]

export default function BespokeTailoringLondon() {
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
            <span>Bespoke Tailoring London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Home Fittings · Made to Your Measurements</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Bespoke Tailoring in London —{' '}
            <em className="font-playfair italic">Fitted at Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors offers <strong>bespoke and made-to-measure tailoring in London</strong> with all fittings and consultations at your home or office. Suits, shirts and formal wear made to your exact specifications — no Savile Row appointment required.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Consultation
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">The Convenience of Bespoke Without the Shop Visit</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Traditional bespoke tailoring in London means multiple visits to a Savile Row or Jermyn Street shop — consultations, fittings, collections, over months. The process is valuable, but the logistics are not always practical for London&apos;s professional class.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors brings the bespoke process to your door. Our master tailor visits your home or office, takes your measurements, assists with cloth selection, and conducts all fittings on your premises. Your garments are made in our workshop and returned to you. The tailoring is the same — the logistics are simply different.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We work with clients in <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>, <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link> and across Central London. Call to discuss your project before booking.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">What We Make</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {services.map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">All bespoke work is quoted individually after consultation. Contact us to discuss your project.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">The Bespoke Process</h2>
          <ol className="space-y-6">
            {[
              ['Consultation at Your Home', 'Our master tailor visits your address for an initial consultation — discussing your requirements, taking measurements, reviewing cloth options and agreeing the design.'],
              ['Pattern Making & First Cut', 'A pattern is made to your measurements. The first cut is constructed and a fitting date agreed.'],
              ['Home Fitting — First Fit', 'The garment comes to your home for a first fitting. Adjustments are marked and noted. Further fits may be required depending on the garment.'],
              ['Final Return', 'The completed garment is returned to your address, pressed and finished. All costs are agreed upfront.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Discuss Your Bespoke Project</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service</Link> for existing garments that need adjustment rather than replacement.
          </p>
          <div className="flex gap-6 flex-wrap items-center">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Consultation
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
