import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Kensington London — Collection Service | Fine Tailors',
  description: 'Looking for a tailor near you in Kensington? Fine Tailors collects from your W8 door, alters suits, dresses and garments to a perfect fit, and returns in 5–7 days.',
  keywords: ['tailor near me Kensington', 'tailor near me Kensington London', 'Kensington tailor near me', 'nearest tailor Kensington', 'tailor Kensington London', 'mobile tailor Kensington'],
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-kensington' },
  openGraph: {
    title: 'Tailor Near Me in Kensington London — Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-kensington',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me in Kensington London' }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me in Kensington London — Collection Service',
  description: 'How to find the best tailor near you in Kensington — and why a collection-based service is the smartest choice for W8 residents.',
  image: 'https://www.finetailors.co.uk/images/tailor.jpg',
  datePublished: '2026-05-24',
  dateModified: '2026-05-24',
  author: { '@type': 'Organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', name: 'Fine Tailors', url: 'https://www.finetailors.co.uk' },
  mainEntityOfPage: 'https://www.finetailors.co.uk/blog/tailor-near-me-kensington',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me in Kensington', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-kensington' },
  ],
}

export default function TailorNearMeKensington() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="relative w-full h-72 lg:h-96 overflow-hidden">
          <Image src="/images/tailor.jpg" alt="Tailor near me in Kensington London" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="px-8 lg:px-24 py-16 max-w-3xl">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me in Kensington</span>
          </nav>

          <p className="font-sans text-xs text-muted uppercase tracking-widest mb-4">Local Guide · 5 min read</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor Near Me in Kensington, London
          </h1>
          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-12">
            Kensington is one of London&apos;s most desirable residential addresses — Kensington Palace Gardens, the grand Victorian townhouses of Pemberton Gardens, the quiet garden squares near Holland Park. If you&apos;re looking for a tailor near you in Kensington, Fine Tailors offers a service that matches the area: discreet, professional, collected from your W8 door.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">The Problem with &lsquo;Nearest Tailor&rsquo; Searches</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When you search &ldquo;tailor near me&rdquo; in Kensington, Google will surface local shops — many of which require you to travel, drop off, wait, return, collect. For a busy W8 resident, that&apos;s two unnecessary journeys.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors does something simpler: we come to you. Collection from your Kensington address, alterations in our workshop, return to your door. The only journey your garments take is with us.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">How It Works in Kensington</h2>
          <ol className="space-y-4 mb-8">
            {[
              ['Book a collection', 'Online or by phone. Any day, morning, afternoon or evening.'],
              ['We collect from your W8 door', 'At your chosen time we come to your Kensington address. Doorstep collection — no entry required.'],
              ['We alter in our workshop', 'Every garment is handled by our specialist team. Written quote approved by you before work begins.'],
              ['We return pressed and perfect', 'Within 5–7 working days your clothes are back at your door, ready to wear.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-4">
                <span className="font-playfair text-xl text-hunter/30 shrink-0 w-6">{i + 1}</span>
                <div>
                  <strong className="font-playfair font-medium text-charcoal">{title}.</strong>{' '}
                  <span className="font-sans font-light text-muted">{desc}</span>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Services for Kensington Clients</h2>
          <ul className="space-y-2 mb-8 font-sans font-light text-muted">
            {[
              'Suit alterations — jacket resizing, sleeve shortening, trouser hemming',
              'Dress and occasion wear — shortening, take-in, zip work',
              'Coat and jacket alterations — body resizing, sleeve shortening, length',
              'Trouser and jean alterations — hemming, tapering, waist',
              'Luxury and designer garments — careful specialist handling',
              'Wedding dress alterations — quoted on inspection',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-hunter mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Prices</h2>
          <div className="border border-divider divide-y divide-divider mb-8">
            {[
              ['Trouser hemming', 'from £18'],
              ['Trouser tapering', 'from £18'],
              ['Jacket sleeve shortening', 'from £30'],
              ['Jacket back take-in', 'from £18'],
              ['Plain dress shortening', 'from £25'],
              ['Dress take-in', 'from £28'],
              ['Coat shortening', 'from £45'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between px-5 py-3 font-sans text-sm">
                <span className="font-light text-charcoal">{service}</span>
                <span className="text-muted">{price}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">Minimum order £20. All prices include collection and return to your Kensington W8 address.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Kensington Addresses We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 mb-8 font-sans font-light text-sm text-muted">
            {['Kensington Palace Gardens', 'Pemberton Gardens', 'Holland Park', 'Kensington High Street', 'Abingdon Road', 'Lexham Gardens', 'Cornwall Gardens', 'W8 postcodes'].map(area => (
              <li key={area} className="flex gap-2"><span className="text-hunter">—</span>{area}</li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Nearby Areas</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We also cover <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link>, <Link href="/tailor-south-kensington" className="text-hunter underline">South Kensington</Link> and <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>. Full coverage on the <Link href="/tailor-near-me" className="text-hunter underline">tailor near me page</Link>.
          </p>

          <div className="border-t border-divider pt-10">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Kensington</h2>
            <div className="flex gap-6 flex-wrap items-center">
              <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
                Book a Collection
              </Link>
              <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
                +44 7438 145169
              </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
