import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Dress Alterations London | Collected From Your Home | Fine Tailors',
  description: 'Professional dress alterations in London with home collection and return. Fine Tailors alters occasion wear, evening gowns, wedding dresses and everyday dresses. 5–7 working day turnaround.',
  alternates: { canonical: 'https://www.finetailors.co.uk/dress-alterations-london' },
  keywords: [
    'dress alterations London',
    'dress alterations near me London',
    'dress alteration service London',
    'evening dress alterations London',
    'occasion wear alterations London',
    'dress taken in London',
    'dress hemming London',
    'dress fitting London at home',
  ],
  openGraph: {
    title: 'Dress Alterations London | Home Collection | Fine Tailors',
    description: 'Expert dress alterations in London — collected from your home, returned perfectly fitted in 5–7 working days. Evening wear, occasion wear and everyday dresses.',
    url: 'https://www.finetailors.co.uk/dress-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dress alterations London home collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Dress Alterations London', item: 'https://www.finetailors.co.uk/dress-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Dress Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional dress alterations in London. Collection and return service. Evening wear, occasion wear, wedding dresses and everyday dresses. Garments fully insured while in transit.',
  serviceType: 'Dress Alterations',
}

const dresTypes = [
  { title: 'Waist & Body Taking In', desc: 'Taking in the body of a dress for a closer, more flattering fit — preserving the original shape and structure. From £28.' },
  { title: 'Hem Shortening', desc: 'Shortening to the right length — plain hem, rolled hem or original finish type. From £25.' },
  { title: 'Strap & Neckline Adjustments', desc: 'Repositioning or shortening straps, adjusting necklines and shoulder seams.' },
  { title: 'Zip Replacement', desc: 'Replacing broken, seized or noisy zips on any dress style. From £28.' },
  { title: 'Letting Out & Seam Adjustment', desc: 'Releasing seams where possible to give more room at the waist, hips or chest.' },
  { title: 'Lining Repair & Replacement', desc: 'Re-lining or repairing inner linings on formal and evening wear.' },
  { title: 'Evening & Occasion Gowns', desc: 'Specialist work on structured formal gowns, with full understanding of complex fabrics.' },
  { title: 'Wedding Dress Alterations', desc: 'Bridal and bridesmaid alterations handled with full specialist care — see our dedicated wedding dress service.' },
]

export default function DressAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-dress" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-dress" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-dress" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Dress Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Working Days</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Dress Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides expert <strong>dress alterations in London</strong> with a full collection and return service. From everyday dresses to evening gowns and wedding dresses, we collect from your door, alter every piece to a perfect fit, and return it pressed within 5–7 working days. Garments are fully insured while in our care.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Collection Is the Right Way to Alter a Dress</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Dress alterations require precise fitting — ideally with you wearing the dress, in good light, at a time that suits you. A shop fitting room can achieve this, but it requires travel, an appointment, and often several return visits. Fine Tailors does all of this at your home.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            This matters especially for valuable or delicate <strong>dress alterations in London</strong> — evening gowns, silk dresses, bridesmaid dresses — that you would rather not carry across the city. We collect, assess, alter and return everything within 5–7 working days. Your dress never sits in a public shop. It goes from your door to our workshop and straight back.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover all of Central London — <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-islington" className="text-hunter underline">Islington</Link> and beyond.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Dress Alterations We Specialise In</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {dresTypes.map(({ title, desc }) => (
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
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your Central London address.'],
              ['We Collect Your Dress', 'We collect your dress at your chosen time. No travel, no transport risk. Everything insured in transit.'],
              ['We Alter Your Dress', 'All alterations completed with full attention to fabric, structure and original design. A written quote is approved by you before any work begins.'],
              ['Returned to Your Door', 'Within 5–7 working days your dress is back at your door, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Your Dress Alteration in London</h2>
          <p className="font-sans font-light text-muted mb-4 max-w-lg leading-relaxed">
            Also see our <Link href="/wedding-dress-alterations-london" className="text-hunter underline">specialist wedding dress alterations service</Link>, our <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link> and all <Link href="/clothing-alterations-london" className="text-hunter underline">clothing alterations</Link> across Central London.
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
