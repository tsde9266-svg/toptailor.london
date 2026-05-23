import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Shoreditch London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Shoreditch. We collect from your E1/EC2A door, alter for tech and fashion professionals, and return pressed and perfect in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-shoreditch' },
  openGraph: {
    title: 'Tailor in Shoreditch London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-shoreditch',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Shoreditch, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Shoreditch', item: 'https://www.finetailors.co.uk/tailor-shoreditch' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Shoreditch' },
  description: 'Collection-based tailoring service covering Shoreditch. Garments collected from E1 and EC2A addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Brick Lane, Old Street and the E1/EC2A area of Shoreditch?',
    a: 'Yes. We cover all E1 and EC2A postcodes — Brick Lane, Old Street, Commercial Street, Shoreditch High Street and the surrounding streets. The full Shoreditch area is within our regular collection zone.',
  },
  {
    q: 'Do you work with independent brand garments and fashion-forward pieces alongside premium labels?',
    a: 'Yes. Shoreditch clients often have wardrobes that mix independent East London designers with premium labels. We handle all garment types with equal care — from a vintage Levi jacket to a tailored Cos suit. Leather and specialist pieces quoted on inspection.',
  },
]

export default function TailorShoreditch() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Shoreditch</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Shoreditch, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Shoreditch addresses — Brick Lane, Old Street, Commercial Street and beyond — and returns them altered to a perfect fit within 5–7 days. For tech sector workers, startup professionals and fashion-conscious Shoreditch residents.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Shoreditch</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Shoreditch is one of London&apos;s most dynamic and fashion-conscious postcodes. Old Street&apos;s tech corridor, the creative agencies and startups clustered around Shoreditch High Street, the mix of independent brands and premium labels along Brick Lane and Commercial Street — the people who work and live here have wardrobes as varied as the neighbourhood itself.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Shoreditch tailoring collection service</strong> covers all E1 and EC2A postcodes. We collect from your apartment, studio or office at a time you choose, alter every piece in our specialist workshop — suits and formal wear for client meetings, fashion garments from independent brands, leather jackets for specialist care — and return everything within 5–7 working days, pressed and perfect.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Shoreditch sits between the City of London and Hackney. If you live on the E2 or E8 border, call us and we will confirm whether your address is covered.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Shoreditch</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Shoreditch address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Shoreditch</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Shoreditch E1 or EC2A address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Apartments, studios and offices all accommodated. Buzzer access and door codes noted.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Shoreditch address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Shoreditch Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Brick Lane flat on Tuesday. Leather jacket, two pairs of jeans and a blazer — all back by Friday, all perfect. Brilliant service for East London.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Dan, Shoreditch</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Shoreditch-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Shoreditch</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>,{' '}
            <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link> and{' '}
            <Link href="/tailor-islington" className="text-hunter underline">Islington</Link>.
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
