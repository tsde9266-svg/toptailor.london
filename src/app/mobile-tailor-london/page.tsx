import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Mobile Tailor London | Collection Service — No Shop Visit | Fine Tailors',
  description: 'Fine Tailors — London\'s collection-based tailoring service. We collect your garments from your Central London door, alter them, and return them pressed and perfect in 5–7 working days. No stranger enters your home.',
  alternates: { canonical: 'https://www.finetailors.co.uk/mobile-tailor-london' },
  keywords: [
    'mobile tailor London',
    'collection tailor London',
    'tailor comes to your door London',
    'tailor home visit London',
    'mobile tailoring service London',
    'garment collection tailor London',
    'door to door tailor London',
    'tailor at home London',
  ],
  openGraph: {
    title: 'Mobile Tailor London | Collection Service | Fine Tailors',
    description: 'London\'s collection-based tailoring service. We collect from your door, alter in our workshop, and return perfect in 5–7 days. No shop visit. No stranger in your home.',
    url: 'https://www.finetailors.co.uk/mobile-tailor-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mobile tailor London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Mobile Tailor London', item: 'https://www.finetailors.co.uk/mobile-tailor-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mobile Tailor London — Collection & Return Service',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Collection-based tailoring service in Central London. Garments collected from your door, altered in a specialist workshop, and returned pressed and perfect in 5–7 working days.',
  serviceType: 'Collection Tailoring',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    areaServed: 'Central London',
  },
}

const areas = [
  { name: 'Mayfair',          href: '/tailor-mayfair' },
  { name: 'Chelsea',          href: '/tailor-chelsea' },
  { name: 'Knightsbridge',    href: '/tailor-knightsbridge' },
  { name: 'Kensington',       href: '/tailor-kensington' },
  { name: 'Belgravia',        href: '/tailor-belgravia' },
  { name: 'Marylebone',       href: '/tailor-marylebone' },
  { name: 'Westminster',      href: '/tailor-westminster' },
  { name: 'City of London',   href: '/tailor-city-of-london' },
  { name: 'Notting Hill',     href: '/tailor-notting-hill' },
  { name: 'Soho',             href: '/tailor-soho' },
  { name: 'Covent Garden',    href: '/tailor-covent-garden' },
  { name: 'Fitzrovia',        href: '/tailor-fitzrovia' },
  { name: 'Bloomsbury',       href: '/tailor-bloomsbury' },
  { name: 'Islington',        href: '/tailor-islington' },
  { name: 'Paddington',       href: '/tailor-paddington' },
  { name: 'Pimlico',          href: '/tailor-pimlico' },
  { name: 'Clerkenwell',      href: '/tailor-clerkenwell' },
  { name: 'Shoreditch',       href: '/tailor-shoreditch' },
  { name: 'Canary Wharf',     href: '/tailor-canary-wharf' },
  { name: 'South Kensington', href: '/tailor-south-kensington' },
  { name: 'Fulham',           href: '/tailor-fulham' },
]

export default function MobileTailorLondon() {
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
            <span>Mobile Tailor London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Working Days · Central London</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors is London&apos;s collection-based tailoring service. We collect your garments from your Central London door, alter them in our specialist workshop, and return them pressed and perfect in 5–7 working days. No shop visit. No stranger enters your home. Garments fully insured while in our care.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Makes Fine Tailors Different</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            There are two types of tailoring service in London. Physical shops — where you travel with your garments, wait in a queue, leave them for a week, and collect. And collection services — where someone comes to you.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors is a collection service, but with a critical difference from other collection tailors: <strong>no one enters your home.</strong> We collect from your door — apartment lobby, office reception, hotel concierge — and that is as far as we come. Your garments go directly from your door to our specialist workshop, not to a shared storage room or high-street shop.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            One tailor handles your clothes from collection to return. This is the <strong>Single Needle Guarantee</strong> — consistent care, consistent results, no production-line handoffs.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services We Collect and Return</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket waist, chest, shoulders, sleeve length — all altered precisely. From £18.', '/suit-alterations-london'],
              ['Dress & Occasion Wear', 'From everyday dresses to evening gowns — alterations that respect the garment. From £25.', '/dress-alterations-london'],
              ['Trouser Alterations', 'Hemming, tapering, waist and seat adjustments. From £18.', '/trouser-alterations-london'],
              ['Jacket & Coat Alterations', 'Sleeve shortening, body tapering, relining. From £18.', '/jacket-alterations-london'],
              ['Wedding Dress Alterations', 'Specialist bridal alterations with full collection and return.', '/wedding-dress-alterations-london'],
              ['Leather Jacket Alterations', 'Specialist work on leather — sleeves, body, zip replacement.', '/leather-jacket-alterations-london'],
            ].map(([title, desc, href]) => (
              <div key={title} className="border border-divider p-5">
                <Link href={href}>
                  <h3 className="font-playfair text-base font-medium text-hunter hover:underline mb-2">{title}</h3>
                </Link>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Why Choose Collection Over a Shop?</h2>
          <div className="space-y-6">
            {[
              ['No travel required', 'You stay at home. We come to you — in Mayfair, Chelsea, Canary Wharf or anywhere in Central London. No tubes, no parking, no carrying garments.'],
              ['No stranger in your home', 'We collect from your door. No tailor sets up at your kitchen table. Your garments leave your threshold and come back to it. That\'s the extent of the contact.'],
              ['Garments never sit in a public shop', 'Your suit, dress or leather jacket goes from your door to our workshop and back. It\'s not in a shop window for a week. It\'s not handled by a dozen different staff members.'],
              ['Fully insured in transit', 'All garments are fully insured while in our care — from collection to return.'],
              ['One tailor from start to finish', 'The Single Needle Guarantee — one person handles your clothes throughout. Consistent quality, consistent results.'],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-5">
                <div className="w-1 bg-hunter/20 shrink-0 mt-1" />
                <div>
                  <h3 className="font-playfair font-medium text-charcoal mb-1">{title}</h3>
                  <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Areas We Cover in London</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-2xl">
            Our collection service covers all of Central London. Select your area to learn more:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl">
            {areas.map(({ name, href }) => (
              <Link key={name} href={href}
                className="border border-divider p-4 font-sans text-[0.875rem] text-charcoal hover:border-hunter hover:text-hunter transition-colors">
                {name}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in London</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            Book online or call us. We confirm a collection time at your Central London address and handle the rest.
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
