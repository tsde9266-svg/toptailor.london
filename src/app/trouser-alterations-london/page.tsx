import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Trouser Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert trouser and jean alterations in London — hemming, tapering, waist adjustment and more, collected from your home. Returned perfect in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/trouser-alterations-london' },
  openGraph: {
    title: 'Trouser Alterations London | Fine Tailors',
    description: 'Professional trouser alterations collected from your London door. Hemming, tapering, waist adjustment — returned perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/trouser-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Trouser alterations London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Trouser Alterations London', item: 'https://www.finetailors.co.uk/trouser-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Trouser Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional trouser and jean alterations in London, collected from your home. Hemming, tapering, waist and seat adjustment.',
  serviceType: 'Trouser Alterations',
}

const alterationTypes = [
  { title: 'Trouser Hemming', desc: 'Shortened to the correct break — plain hem, turn-up, or invisible machine stitch. From £18.' },
  { title: 'Trouser Tapering', desc: 'Slimming the leg from knee to hem or throughout for a modern silhouette. From £18.' },
  { title: 'Waist Taking In or Letting Out', desc: 'Adjusting the waistband for a precise fit. From £22.' },
  { title: 'Seat Adjustment', desc: 'Taking in or releasing the seat for comfort and shape. From £22.' },
  { title: 'Crotch Repair & Reinforcement', desc: 'Repairing worn seams or adding reinforcement to high-wear areas. Quoted on inspection.' },
  { title: 'Turn-Up Addition or Removal', desc: 'Adding or removing a trouser turn-up to change the finish. From £22.' },
  { title: 'Jean Alterations', desc: 'Hemming and tapering jeans with the original stitching preserved where possible. From £18.' },
  { title: 'Lining & Pocket Repairs', desc: 'Replacing worn trouser lining or repairing pockets. Quoted on inspection.' },
]

export default function TrouserAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-trouser" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-trouser" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-trouser" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Trouser Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Day Turnaround</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Trouser Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides professional <strong>trouser alterations in London</strong> with a full collection and return service. We collect your trousers and jeans from your home or office, alter them to a perfect fit, and return them pressed within 5–7 working days.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Expert Trouser Alterations Without Leaving Your Door</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The right trouser fit makes a significant difference to how a suit or outfit looks and feels. Too long, and the break is sloppy. Too wide, and the leg looks dated. Even a slight waist discrepancy affects how a jacket sits. <strong>Trouser alterations</strong> are among the most common and most impactful alterations a tailor makes — and they are also the easiest to get right when the tailor can assess the garment properly.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects your trousers from your Central London address — office, apartment, hotel — alters them in our workshop, and returns them pressed and perfect. No dropping off at a shop, no collecting again. One tailor handles your garments from start to finish under our Single Needle Guarantee.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We work across <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Trouser Alterations We Specialise In</h2>
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
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Central London address — home, office or hotel.'],
              ['We Collect From Your Door', 'At your chosen time we collect your trousers and any other garments. No travel, no dropping off.'],
              ['We Alter Every Piece', 'Your trousers are worked on in our specialist workshop. We send a written quote before a stitch is placed — you approve first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your trousers are returned to your door, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Our Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had four pairs of suit trousers hemmed and tapered. All came back perfectly turned, exactly the break I wanted. Collected and returned without me leaving the flat.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Daniel, Westminster</cite>
          </blockquote>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Trouser Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service</Link> and{' '}
            <Link href="/jacket-alterations-london" className="text-hunter underline">jacket alterations service</Link>.
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
