import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me in City of London — Collection Service | Fine Tailors',
  description: 'Looking for a tailor near you in the City of London? Fine Tailors collects from your EC1–EC4 door, alters suits and clothing, and returns pressed and perfect in 5–7 days.',
  keywords: ['tailor near me City of London', 'tailor near me City of London London', 'City of London tailor near me', 'nearest tailor City of London', 'tailor Square Mile', 'tailor EC1 EC2'],
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-city-of-london' },
  openGraph: {
    title: 'Tailor Near Me in City of London — Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-city-of-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me in City of London' }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me in the City of London — Collection Service',
  description: 'How to find the best tailor near you in the City of London — and why a collection-based service is the right answer for EC1–EC4 finance and legal professionals.',
  image: 'https://www.finetailors.co.uk/images/tailor.jpg',
  datePublished: '2026-05-24',
  dateModified: '2026-05-24',
  author: { '@type': 'Organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', name: 'Fine Tailors', url: 'https://www.finetailors.co.uk' },
  mainEntityOfPage: 'https://www.finetailors.co.uk/blog/tailor-near-me-city-of-london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me in City of London', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-city-of-london' },
  ],
}

export default function TailorNearMeCityOfLondon() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="relative w-full h-72 lg:h-96 overflow-hidden">
          <Image src="/images/tailor.jpg" alt="Tailor near me in City of London" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="px-8 lg:px-24 py-16 max-w-3xl">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me in City of London</span>
          </nav>

          <p className="font-sans text-xs text-muted uppercase tracking-widest mb-4">Local Guide · 5 min read</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor Near Me in the City of London
          </h1>
          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-12">
            The Square Mile operates at a pace that leaves little room for inconvenience. Finance professionals, lawyers and executives working in EC1, EC2, EC3 and EC4 wear suits as daily workwear — and a suit that doesn&apos;t fit correctly is a daily problem. Finding a tailor near you in the City of London that can handle professional-quality suits to the right standard, without requiring you to travel, makes all the difference. Fine Tailors collects from your door.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">The City of London Tailoring Challenge</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Traditional tailoring shops in and around the City require two visits — drop off and collect. After a long day in the Square Mile, the last thing you want is to carry garment bags to a shop queue. The better answer is a service that comes to you.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors covers all EC1–EC4 postcodes. We collect from your EC2 office, your EC1 apartment, your EC4 building reception — wherever works for you — and return your garments within 5–7 working days, pressed and ready for the boardroom.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">How It Works in the City</h2>
          <ol className="space-y-4 mb-8">
            {[
              ['Book a collection', 'Online or by phone. We confirm a time at your City of London EC1–EC4 address.'],
              ['We collect from your door', 'Office, apartment, hotel. We coordinate with reception or building security if required.'],
              ['We alter every piece', 'Suits, shirts, trousers, coats — all handled by our specialist team. Written quote approved first.'],
              ['We return pressed and perfect', 'Within 5–7 working days your clothes are back at your City address, ready to wear.'],
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

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Services for City Professionals</h2>
          <ul className="space-y-2 mb-8 font-sans font-light text-muted">
            {[
              'Suit alterations — jacket take-in, sleeve shortening, trouser hemming and tapering',
              'Trouser and shirt alterations — hemming, tapering, sleeve shortening, body tapering',
              'Jacket and coat alterations — body resizing, sleeve work, coat shortening',
              'Dress alterations — shortening, take-in, zip replacement',
              'Ongoing wardrobe maintenance — call to discuss regular collection arrangements',
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
              ['Coat shortening', 'from £45'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between px-5 py-3 font-sans text-sm">
                <span className="font-light text-charcoal">{service}</span>
                <span className="text-muted">{price}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">Minimum order £20. All prices include collection and return to your City of London address.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">City of London Areas We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 mb-8 font-sans font-light text-sm text-muted">
            {['EC1 — Clerkenwell border', 'EC2 — Moorgate / Bank', 'EC3 — Monument / Fenchurch', 'EC4 — Blackfriars / Temple', 'St Paul&apos;s', 'Liverpool Street', 'Cannon Street', 'Aldgate'].map(area => (
              <li key={area} className="flex gap-2"><span className="text-hunter">—</span>{area}</li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Nearby Areas</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We cover <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>, <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link>, <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link> and <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link>. Full coverage on the <Link href="/tailor-near-me" className="text-hunter underline">tailor near me page</Link>.
          </p>

          <div className="border-t border-divider pt-10">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in the City</h2>
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
