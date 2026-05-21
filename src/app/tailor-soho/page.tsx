import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Soho London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Soho. We collect from your W1D/W1F door, alter suits and clothing for media and creative professionals, and return in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-soho' },
  openGraph: {
    title: 'Tailor in Soho London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-soho',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Soho, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Soho', item: 'https://www.finetailors.co.uk/tailor-soho' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Soho' },
  description: 'Collection-based tailoring service covering Soho. Garments collected from W1D and W1F addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Can you collect from a Soho flat above a business or office building?',
    a: 'Yes. Soho is a mix of residential flats, offices and creative studios. We collect from all address types — just provide the full address and any access instructions (door codes, buzzer names) when booking.',
  },
  {
    q: 'Do you alter garments for people in the media, advertising or fashion industry?',
    a: 'Yes. The Soho and Fitzrovia creative sector is one of our regular client bases. Whether you need a suit altered for a client presentation, a dress adjusted for a shoot, or casual pieces tailored to a sharper fit, we handle all of it.',
  },
]

export default function TailorSoho() {
  return (
    <>
      <Script id="schema-breadcrumb-soho" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-soho" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-soho" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Soho</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Soho, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Soho addresses — Dean Street, Wardour Street, Carnaby Street and beyond — and returns them altered to a perfect fit within 5–7 days. For media, advertising and creative professionals who need their clothes to look right.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Soho</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Soho sits at the heart of London&apos;s creative and media world. Dean Street, Wardour Street and the surrounding W1D and W1F streets are dense with advertising agencies, production companies, film studios and independent creative businesses. The people who work and live here are fashion-conscious, time-poor, and expect services to work around their schedule.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Soho tailoring collection service</strong> is designed for exactly this clientele. We collect from your Soho address — flat, studio, office — at a time you choose, alter every garment in our specialist workshop, and return it pressed and perfect within 5–7 working days. No travel, no shop visit, no lunch break wasted carrying a bag across the city.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The Soho wardrobe is as varied as the neighbourhood — suits for presentations, casual-smart pieces for client dinners, fashion-forward garments from independent brands. We handle all of it with equal care.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Soho</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Soho address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Soho</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Soho W1D or W1F address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. We accommodate buzzer access, door codes and office receptions.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Soho address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Soho Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Dean Street studio, back in five days. A suit, two pairs of trousers, one jacket — all perfect. Exactly what you need when you&rsquo;re too busy to go to a shop.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Jake, Soho</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Soho-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Soho</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>,{' '}
            <Link href="/tailor-fitzrovia" className="text-hunter underline">Fitzrovia</Link> and{' '}
            <Link href="/tailor-covent-garden" className="text-hunter underline">Covent Garden</Link>.
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
