import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Dress Alterations London | Collected from Your Home | Fine Tailors',
  description: 'Professional dress alterations in London with home collection and return. Fine Tailors alters occasion wear, evening gowns, wedding dresses and everyday dresses. 3–5 day turnaround.',
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
    description: 'Expert dress alterations in London — collected from your home, returned perfectly fitted. Evening wear, occasion wear and everyday dresses.',
    url: 'https://www.finetailors.co.uk/dress-alterations-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dress alterations London home collection service' }],
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
    telephone: '+44 7438 145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional dress alterations in London. Home visit, collection and return service. Evening wear, occasion wear, wedding dresses and everyday dresses.',
  serviceType: 'Dress Alterations',
}

const dresTypes = [
  { title: 'Waist & Body Taking In', desc: 'Taking in the body of a dress for a closer, more flattering fit — preserving the original shape and structure.' },
  { title: 'Hem Shortening', desc: 'Shortening to the right length — whether a clean hem, rolled hem or original finish type.' },
  { title: 'Strap & Neckline Adjustments', desc: 'Repositioning or shortening straps, adjusting necklines and shoulder seams.' },
  { title: 'Zip Replacement', desc: 'Replacing broken, seized or noisy zips on any dress style.' },
  { title: 'Letting Out & Seam Adjustment', desc: 'Releasing seams where possible to give more room at the waist, hips or chest.' },
  { title: 'Lining Repair & Replacement', desc: 'Re-lining or repairing inner linings on formal and evening wear.' },
  { title: 'Evening & Occasion Gowns', desc: 'Specialist work on structured formal gowns, with full understanding of complex fabrics.' },
  { title: 'Wedding Dress Alterations', desc: 'Bridal and bridesmaid alterations handled with full care — home collection included.' },
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
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Home Collection · 3–5 Day Turnaround</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Dress Alterations in London — Collected from Your Home
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides expert <strong>dress alterations in London</strong> with a full home collection and return service. From everyday dresses to evening gowns and wedding dresses, we alter every piece to a perfect fit — without you leaving your home.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/book" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection Visit
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Use a Mobile Tailor for Dress Alterations?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Dress alterations require precise fitting — ideally with you wearing the dress, in good light, while a tailor pins adjustments in real time. A shop fitting room can achieve this, but it requires travel, an appointment, and often several return visits. Fine Tailors does all of this at your home.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            This matters especially for <strong>dress alterations in London</strong> where many garments are delicate, structured or expensive — evening gowns, silk dresses, bridesmaid dresses — that you would rather not carry through the city. We visit, assess, pin, collect and return everything within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover all of central London — <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and beyond.
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
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Home Visit', 'Choose a time anywhere in central London. We confirm and arrive at your address.'],
              ['Dress Assessment at Your Door', 'You wear the dress. Our tailor assesses the fit, pins all adjustments, and advises on what\'s possible.'],
              ['We Collect Your Dress', 'We take the dress away — no transport, no risk of damage in transit.'],
              ['Expert Alterations', 'All alterations completed with full attention to fabric, structure and original design intent.'],
              ['Returned to Your Door', 'Your dress is returned to your London address within 3–5 days, ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Your Dress Alteration in London Today</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also specialise in <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link> and all <Link href="/clothing-alterations-london" className="text-hunter underline">clothing alterations</Link> across central London.
          </p>
          <Link href="/book" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
            Book a Visit
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
