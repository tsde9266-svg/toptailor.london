import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Mobile Tailor London | Master Tailor Comes to Your Door | Fine Tailors',
  description: 'Fine Tailors — London\'s master mobile tailor. We come to your door anywhere in central London. Expert suit alterations, bespoke tailoring and clothing alterations at home. Book your visit today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/mobile-tailor-london' },
  keywords: [
    'mobile tailor London',
    'master tailor London',
    'tailor comes to your door London',
    'tailor home visit London',
    'mobile tailoring service London',
    'master tailor comes to your door',
    'door to door tailor London',
    'tailor at home London',
  ],
  openGraph: {
    title: 'Mobile Tailor London | Master Tailor at Your Door | Fine Tailors',
    description: 'A master mobile tailor comes directly to your London home. Expert alterations and bespoke tailoring without leaving your door.',
    url: 'https://www.finetailors.co.uk/mobile-tailor-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mobile master tailor visiting London home' }],
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
  name: 'Mobile Tailor London — Master Tailor Home Visit',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+44 7438 145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'A master tailor visits your home in central London for suit alterations, bespoke tailoring and all clothing alterations. Collect and return service included.',
  serviceType: 'Mobile Tailoring',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    areaServed: 'Central London',
  },
}

const areas = [
  { name: 'Mayfair', href: '/tailor-mayfair' },
  { name: 'Chelsea', href: '/tailor-chelsea' },
  { name: 'Knightsbridge', href: '/tailor-knightsbridge' },
  { name: 'Kensington', href: '/tailor-kensington' },
  { name: 'Belgravia', href: '/tailor-belgravia' },
  { name: 'Marylebone', href: '/tailor-marylebone' },
  { name: 'Westminster', href: '/tailor-westminster' },
  { name: 'City of London', href: '/tailor-city-of-london' },
  { name: 'Notting Hill', href: '/tailor-notting-hill' },
]

export default function MobileTailorLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-mobile" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-mobile" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-mobile" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Mobile Tailor London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Master Tailor · Comes to Your Door</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            London&apos;s Mobile Master Tailor — At Your Door
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors brings a master tailor directly to your home, office or apartment anywhere in central London. No travel, no shop queues — expert tailoring, on your terms.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Is a Mobile Tailor?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A <strong>mobile tailor</strong> is a fully qualified master tailor who visits you — at your home, office or any address — instead of you visiting a shop. Fine Tailors has delivered this service across central London for over 10 years, working with private clients, business professionals and families who demand the highest standard without the inconvenience of a high-street shop.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>master tailor comes to your door</strong> with all the tools needed to assess, pin and advise on your garments in person. We then collect everything, complete the alterations or bespoke work at our specialist workspace, and return your clothes perfectly finished — usually within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            This is professional tailoring reimagined for how London&apos;s busiest residents actually live: time-poor, quality-conscious, and based in one of the world&apos;s greatest cities.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Our Master Tailor Brings to Your Door</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations at Home', 'Jacket waist, chest, shoulders, sleeve length — all assessed on your body, at your address.'],
              ['Dress & Occasion Wear', 'From everyday dresses to couture gowns — alterations that respect the garment.'],
              ['Bespoke Suits Made to Measure', 'A made-to-measure suit cut to your exact proportions, fitted at your door.'],
              ['Trouser & Jean Alterations', 'Hemming, waist, seat and thigh adjustments done to a professional standard.'],
              ['Wedding Dress Alterations', 'Specialist alterations with full collection and return to your London address.'],
              ['Leather & Designer Garments', 'Over a decade of experience with luxury and delicate fabrics.'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Why Choose a Mobile Tailor Over a Shop?</h2>
          <div className="space-y-6">
            {[
              ['No travel required', 'You stay at home. Our master tailor comes to you — in Mayfair, Chelsea, Kensington or anywhere in central London. No tubes, no parking, no carrying garments.'],
              ['Fitting in your own environment', 'We assess garments on your body, in your home. This produces a more accurate fit than any shop fitting room.'],
              ['Personal, attentive service', 'You deal directly with a master tailor who builds an understanding of your wardrobe and preferences over time.'],
              ['Expert advice on the spot', 'Unsure whether an alteration is possible? Our tailor advises you honestly, in person, with the garment in hand.'],
              ['Full collect and return', 'We take your clothes, work on them, and return them to your door. You never carry anything.'],
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
            Our mobile tailoring service covers all of central London. Select your area to learn more:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl">
            {areas.map(({ name, href }) => (
              <Link key={name} href={href}
                className="border border-divider p-4 font-sans text-[0.875rem] text-charcoal hover:border-hunter hover:text-hunter transition-colors">
                Tailor in {name}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Your Mobile Tailor Today</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            London&apos;s master tailor is ready to visit. Tell us your address and preferred time — we handle the rest.
          </p>
          <div className="flex gap-6 flex-wrap">
            <Link href="/book" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Home Visit
            </Link>
            <Link href="/" className="font-sans text-sm font-light text-muted underline self-center">
              ← Back to home
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
