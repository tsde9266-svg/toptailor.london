import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Suit Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert suit alterations in London, collected from your home. Fine Tailors adjusts jacket waist, chest, shoulders, sleeves and trousers to a perfect fit. 5–7 working day turnaround.',
  alternates: { canonical: 'https://www.finetailors.co.uk/suit-alterations-london' },
  keywords: [
    'suit alterations London',
    'suit alterations near me London',
    'suit alteration service London',
    'tailor suit alterations London',
    'jacket alterations London',
    'trouser alterations London',
    'suit taken in London',
    'suit fitting London at home',
  ],
  openGraph: {
    title: 'Suit Alterations London | Home Collection | Fine Tailors',
    description: 'Professional suit alterations in London. We collect from your home, alter to a perfect fit, and return within 5–7 working days.',
    url: 'https://www.finetailors.co.uk/suit-alterations-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Suit alterations London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Suit Alterations London', item: 'https://www.finetailors.co.uk/suit-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Suit Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional suit alterations in London. Collection and return service. Jacket, trouser and waistcoat alterations to a perfect fit. Garments fully insured while in transit.',
  serviceType: 'Suit Alterations',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    areaServed: 'London',
  },
}

const alterationTypes = [
  { title: 'Jacket Waist Suppression', desc: 'Taking in the body of the jacket for a sharper, more tailored silhouette. From £18.' },
  { title: 'Chest & Seat Letting Out', desc: 'Releasing seams to give more room where you need it without compromising the shape.' },
  { title: 'Sleeve Shortening & Lengthening', desc: 'Adjusting sleeve length with working buttonholes preserved. From £30.' },
  { title: 'Shoulder Adjustments', desc: 'The most complex alteration — tackled expertly by our master tailor. Quoted on inspection.' },
  { title: 'Trouser Waist & Seat', desc: 'Taking in or letting out the trouser waist and seat for a perfect fit. From £22.' },
  { title: 'Trouser Hemming', desc: 'Shortened to the right break — plain hem, turn-up or machine-stitched. From £18.' },
  { title: 'Jacket Lining Repair', desc: 'Replacing or repairing torn and worn jacket linings to an invisible standard. From £35.' },
  { title: 'Waistcoat Alterations', desc: 'Three-piece suits altered together for a perfectly matched result.' },
]

export default function SuitAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-suit" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-suit" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-suit" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Suit Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Working Days</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Suit Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides professional <strong>suit alterations in London</strong> with a full collection and return service. We collect your suit from your door, alter it in our specialist workshop, and return it pressed and perfect — without you leaving home. Garments are fully insured while in our care.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why London Professionals Choose Fine Tailors</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            An off-the-peg suit rarely fits perfectly. Shoulders sit slightly wide, the waist is too boxy, the trouser break is wrong. <strong>Suit alterations</strong> transform a good suit into a great one — but getting alterations done well in London has historically meant travel, queues and multiple shop visits.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors solves this entirely. We collect your suit from your Central London address, alter every piece in our specialist workshop, and return everything — jacket, trousers and waistcoat — perfectly altered within 5–7 working days. Your garment never sits in a public shop. It goes from your door directly to our workshop and straight back to you. Everything is fully insured while in transit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            With over 10 years of professional experience working with clients across <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link>, we handle everything from everyday off-the-peg alterations to the most delicate adjustments on bespoke and designer suits.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Suit Alterations We Specialise In</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {alterationTypes.map(({ title, desc }) => (
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
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your Central London home, office or hotel.'],
              ['We Collect Your Suit', 'At your chosen time we collect your garments. No carrying, no dropping off. Everything insured in transit.'],
              ['We Alter and Press', 'Jacket, trousers and waistcoat altered together in our workshop. A written quote is sent before any stitch is placed — you approve first.'],
              ['Returned to Your Door', 'Within 5–7 working days your suit is back at your door, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Your Suit Alteration in London</h2>
          <p className="font-sans font-light text-muted mb-4 max-w-lg leading-relaxed">
            We cover all of Central London — <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link>, <Link href="/tailor-islington" className="text-hunter underline">Islington</Link> and beyond.
          </p>
          <p className="font-sans text-sm font-light text-muted mb-8 max-w-lg leading-relaxed">
            Read our <Link href="/blog/complete-guide-suit-alterations-london" className="text-hunter underline">complete guide to suit alterations in London</Link> for pricing, types and what to expect.
          </p>
          <div className="flex gap-6 flex-wrap">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors self-center">
              +44 7438 145169
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
