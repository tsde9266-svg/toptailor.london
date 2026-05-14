import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Clothing Alterations London | Home Collection Service | Fine Tailors',
  description: 'Expert clothing alterations in London collected from your home. Suits, dresses, trousers, jackets and more. Fine Tailors — master tailor comes to your door. Book today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/clothing-alterations-london' },
  keywords: [
    'clothing alterations London',
    'clothes alterations London',
    'clothing alterations near me London',
    'garment alterations London',
    'alterations service London',
    'clothing alterations at home London',
    'alterations London',
  ],
  openGraph: {
    title: 'Clothing Alterations London | Home Collection | Fine Tailors',
    description: 'All clothing alterations in London — collected from your home and returned perfectly fitted. Master tailor comes to your door.',
    url: 'https://www.finetailors.co.uk/clothing-alterations-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Clothing alterations London home collection' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Clothing Alterations London', item: 'https://www.finetailors.co.uk/clothing-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Clothing Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+44 7438 145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'All clothing alterations in London. Home visit and collection service. Suits, dresses, trousers, jackets and all garments altered to a perfect fit.',
  serviceType: 'Clothing Alterations',
}

const services = [
  { title: 'Suit Alterations', href: '/suit-alterations-london', desc: 'Jacket, trouser and waistcoat alterations to a perfect fit.' },
  { title: 'Dress Alterations', href: '/dress-alterations-london', desc: 'Everyday dresses, evening gowns and occasion wear altered at home.' },
  { title: 'Trouser Alterations', href: null, desc: 'Hemming, waist and seat adjustments for all trouser styles.' },
  { title: 'Jacket & Coat Alterations', href: null, desc: 'Resizing, reshaping and repair for all outer garments.' },
  { title: 'Shirt & Blouse Alterations', href: null, desc: 'Taking in, sleeve adjustments and collar alterations.' },
  { title: 'Wedding & Bridal Wear', href: null, desc: 'Specialist bridal alterations with full collect and return.' },
  { title: 'Leather Garment Alterations', href: null, desc: 'Leather jackets, coats and accessories altered by a specialist.' },
  { title: 'Clothing Repairs', href: null, desc: 'Zip replacement, button replacement, seam repair and lining repair.' },
]

export default function ClothingAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-clothing" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-clothing" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-clothing" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Clothing Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">All Garments · Home Collection · Central London</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Clothing Alterations in London — At Your Door
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides professional <strong>clothing alterations in London</strong> across every garment type — suits, dresses, trousers, jackets, coats and more. Our master tailor visits your home, assesses every piece, and returns them perfectly fitted.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/book" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Home Visit
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Every Garment, Altered at Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors handles all <strong>clothing alterations in London</strong> with a single, simple process: our master tailor visits your home anywhere in central London, assesses every garment in person, and collects everything. Your clothes are returned to your door within 3–5 days, altered to exactly the fit you need.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            This service works for one garment or an entire wardrobe. Many of our clients use the home visit to go through multiple pieces at once — having a professional eye cast over suits, dresses and everyday clothes together. This is both more efficient and more informative than multiple separate shop visits.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            With over 10 years of professional experience, we work across all fabric types and garment constructions — from fast-fashion pieces to luxury designer clothing that requires the most careful handling.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Clothing Alterations We Offer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {services.map(({ title, href, desc }) => (
              <div key={title} className="border border-divider p-5">
                {href ? (
                  <Link href={href}>
                    <h3 className="font-playfair text-base font-medium text-hunter hover:underline mb-2">{title}</h3>
                  </Link>
                ) : (
                  <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                )}
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Areas We Cover</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            We cover all of central London for clothing alterations at home:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              ['Mayfair', '/tailor-mayfair'], ['Chelsea', '/tailor-chelsea'],
              ['Knightsbridge', '/tailor-knightsbridge'], ['Kensington', '/tailor-kensington'],
              ['Belgravia', '/tailor-belgravia'], ['Westminster', '/tailor-westminster'],
              ['Marylebone', '/tailor-marylebone'], ['Notting Hill', '/tailor-notting-hill'],
              ['South Kensington', '/tailor-south-kensington'], ['Fulham', '/tailor-fulham'],
              ['Islington', '/tailor-islington'], ['Soho', '/tailor-soho'],
              ['City of London', '/tailor-city-of-london'],
            ].map(([name, href]) => (
              <Link key={name} href={href}
                className="border border-divider px-4 py-2 font-sans text-[0.8125rem] text-charcoal hover:border-hunter hover:text-hunter transition-colors">
                {name}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Your Clothing Alteration Today</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            One visit, any number of garments. London&apos;s master mobile tailor is ready to come to you.
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
