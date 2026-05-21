import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Shirt Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert shirt alterations in London — body take-in, sleeve shortening, collar adjustment and more, collected from your home. Returned perfect in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/shirt-alterations-london' },
  openGraph: {
    title: 'Shirt Alterations London | Fine Tailors',
    description: 'Professional shirt alterations collected from your London door. Body take-in, sleeve, collar — returned perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/shirt-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Shirt alterations London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Shirt Alterations London', item: 'https://www.finetailors.co.uk/shirt-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Shirt Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional shirt alterations in London collected from your home. Body take-in, sleeve shortening, collar adjustment and side seam work.',
  serviceType: 'Shirt Alterations',
}

const alterationTypes = [
  { title: 'Body Take-In', desc: 'Reducing the body of a shirt along the side seams for a slimmer, more tailored fit. From £18.' },
  { title: 'Sleeve Shortening', desc: 'Adjusting sleeve length at the cuff with the placket preserved. From £18.' },
  { title: 'Collar Adjustment', desc: 'Tightening or loosening the collar band for a better neck fit. Quoted on inspection.' },
  { title: 'Shirt Length Shortening', desc: 'Reducing shirt length for a cleaner tuck or to wear untucked. From £15.' },
  { title: 'Shoulder Narrowing', desc: 'Taking in the shoulder of a shirt — complex, quoted on inspection.' },
  { title: 'Button Replacement', desc: 'Replacing buttons on dress shirts, casual shirts or formal wear. From £10.' },
  { title: 'Dart Addition', desc: 'Adding back darts to create a fitted shape in formal dress shirts. From £20.' },
  { title: 'Repair & Restoration', desc: 'Collar turn, fraying repair, split seams — quoted on inspection.' },
]

export default function ShirtAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-shirt" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-shirt" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-shirt" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Shirt Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Day Turnaround</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Shirt Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides expert <strong>shirt alterations in London</strong> collected from your home. Dress shirts, casual shirts, formal shirts — taken in, shortened, repaired and returned pressed in 5–7 working days.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Shirts Worth Altering — and Why Collection Works</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A well-cut shirt is harder to find than a well-cut suit. Brands cut generously to fit a wide range of bodies, which means a shirt that fits well across the shoulders often billows at the waist. One that fits the body can pull at the collar. <strong>Shirt alterations</strong> solve this — and the difference between a shirt that fits and one that doesn&apos;t is visible in every meeting room and social occasion.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects shirts from your Central London home, office or hotel, alters them in our workshop, and returns them pressed. We work with dress shirts, formal shirts, casual shirts and blouses — including luxury brands where fabric care is paramount.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>, <Link href="/tailor-soho" className="text-hunter underline">Soho</Link>, <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Shirt Alterations We Specialise In</h2>
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
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your Central London address.'],
              ['We Collect Your Shirts', 'We collect all shirts at once — batching is more efficient and covered by one collection.'],
              ['We Alter Each Piece', 'Every shirt is assessed and altered in our workshop. A written quote is sent before work begins.'],
              ['Returned, Pressed and Ready', 'Within 5–7 working days your shirts are returned to your door, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Shirt Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service</Link> and{' '}
            <Link href="/trouser-alterations-london" className="text-hunter underline">trouser alterations service</Link>.
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
