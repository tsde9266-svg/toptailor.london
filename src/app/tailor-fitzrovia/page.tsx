import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Fitzrovia London | Fine Tailors',
  description: 'Searching for a tailor near you in Fitzrovia? We collect from your W1T/W1W door, alter for media and creative professionals, and return pressed and perfect in 5–7 days.',
  keywords: ['tailor Fitzrovia', 'tailor near me Fitzrovia', 'tailor near me Fitzrovia London', 'Fitzrovia tailor near me', 'nearest tailor Fitzrovia'],
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-fitzrovia' },
  openGraph: {
    title: 'Tailor Near Me in Fitzrovia London | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-fitzrovia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Fitzrovia, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Fitzrovia', item: 'https://www.finetailors.co.uk/tailor-fitzrovia' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Fitzrovia' },
  description: 'Collection-based tailoring service covering Fitzrovia. Garments collected from W1T and W1W addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Charlotte Street, Goodge Street and the BT Tower area of Fitzrovia?',
    a: 'Yes. We cover all Fitzrovia postcodes — W1T, W1W — and the surrounding streets including Charlotte Street, Goodge Street, Tottenham Court Road and the residential and office buildings throughout the area.',
  },
  {
    q: 'Can you collect from advertising agencies and design studios in Fitzrovia?',
    a: 'Yes. Fitzrovia&apos;s media and advertising agencies are a regular part of our client base. We collect from offices and studios of all types — just provide the address and any building access details when booking.',
  },
]

export default function TailorFitzrovia() {
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
            <span>Tailor in Fitzrovia</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Fitzrovia, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Fitzrovia addresses — Charlotte Street, Goodge Street, Cleveland Street and beyond — and returns them altered to a perfect fit within 5–7 days. For the media, advertising and digital professionals at the heart of London&apos;s creative corridor.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Fitzrovia</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fitzrovia sits between the West End&apos;s creative industries and Marylebone&apos;s professional calm. Charlotte Street&apos;s advertising and media agencies, the digital and tech companies clustered around Goodge Street, the BT Tower area offices — this is one of London&apos;s densest creative professional postcodes. The people who work here need their clothes to work as hard as they do.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Fitzrovia tailoring collection service</strong> covers all W1T and W1W addresses. We collect from your door at a time you choose — studio, office, apartment — alter every piece in our workshop, and return everything pressed and perfect within 5–7 working days. One tailor handles your clothes from collection to return.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Fitzrovia borders Marylebone to the west and Soho to the south. If you live between postcodes, call us and we will confirm your address is covered.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Fitzrovia</h2>
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
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Fitzrovia address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Fitzrovia</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Fitzrovia W1T or W1W address.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Studio, office and residential collections all accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop with a written quote approved by you first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Fitzrovia address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Fitzrovia Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from our Charlotte Street office on Tuesday, back by Thursday. Perfect alterations, zero hassle. Exactly what we needed.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Priya, Fitzrovia</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Fitzrovia-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Fitzrovia</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>,{' '}
            <Link href="/tailor-soho" className="text-hunter underline">Soho</Link> and{' '}
            <Link href="/tailor-bloomsbury" className="text-hunter underline">Bloomsbury</Link>.
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
