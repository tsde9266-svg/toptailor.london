import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Canary Wharf London — Collection Service | Fine Tailors',
  description: 'Looking for a tailor near you in Canary Wharf? Fine Tailors collects from your E14 door, alters suits for finance professionals, and returns pressed and perfect in 5–7 days.',
  keywords: ['tailor near me Canary Wharf', 'tailor near me Canary Wharf London', 'Canary Wharf tailor near me', 'nearest tailor Canary Wharf', 'tailor Canary Wharf London', 'mobile tailor Canary Wharf'],
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-canary-wharf' },
  openGraph: {
    title: 'Tailor Near Me in Canary Wharf London — Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-canary-wharf',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me in Canary Wharf London' }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me in Canary Wharf London — Collection Service',
  description: 'How to find the best tailor near you in Canary Wharf — and why a collection-based service beats a high street shop for E14 finance professionals.',
  image: 'https://www.finetailors.co.uk/images/tailor.jpg',
  datePublished: '2026-05-24',
  dateModified: '2026-05-24',
  author: { '@type': 'Organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', name: 'Fine Tailors', url: 'https://www.finetailors.co.uk' },
  mainEntityOfPage: 'https://www.finetailors.co.uk/blog/tailor-near-me-canary-wharf',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me in Canary Wharf', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-canary-wharf' },
  ],
}

export default function TailorNearMeCanaryWharf() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="relative w-full h-72 lg:h-96 overflow-hidden">
          <Image src="/images/tailor.jpg" alt="Tailor near me in Canary Wharf London" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="px-8 lg:px-24 py-16 max-w-3xl">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me in Canary Wharf</span>
          </nav>

          <p className="font-sans text-xs text-muted uppercase tracking-widest mb-4">Local Guide · 5 min read</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor Near Me in Canary Wharf, London
          </h1>
          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-12">
            In Canary Wharf, suits aren&apos;t occasion wear — they&apos;re daily professional uniform. Finance and banking professionals at HSBC, Barclays, Deutsche Bank and the surrounding firms wear them every day. A suit that doesn&apos;t fit perfectly is a daily problem. Finding a tailor near you in Canary Wharf — one that can handle a professional-quality suit to the right standard — matters. Fine Tailors collects from your E14 door and makes it easy.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">The Canary Wharf Tailoring Problem</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Canary Wharf is not well served by traditional alterations shops. The estate is large, fast-paced, and the nearest high street tailor typically involves a DLR or Jubilee line journey. After a twelve-hour day, that is the last thing you want.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors exists precisely for this client. We collect from your Canada Square apartment, your E14 office, your Canary Wharf hotel — wherever suits you — and return your garments within 5–7 working days. No journey, no queue, no inconvenience.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">How It Works</h2>
          <ol className="space-y-4 mb-8">
            {[
              ['Book a collection', 'Online or by phone. We confirm a time at your Canary Wharf address.'],
              ['We collect from your E14 address', 'Apartments, offices, hotels. Building access and concierge collections fully accommodated.'],
              ['We alter in our workshop', 'Suits, shirts, trousers, jackets — all handled by our specialist team. Written quote first.'],
              ['We return pressed and perfect', 'Within 5–7 working days your clothes are back, pressed and ready for the office.'],
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

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Services for Canary Wharf Clients</h2>
          <ul className="space-y-2 mb-8 font-sans font-light text-muted">
            {[
              'Suit alterations — jacket back take-in, sleeve shortening, trouser hemming and tapering',
              'Trouser alterations — hemming, tapering, waist adjustment',
              'Shirt alterations — sleeve shortening, body tapering',
              'Jacket and coat alterations — body resizing, sleeve work',
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
          <p className="font-sans text-sm font-light text-muted mb-8">Minimum order £20. All prices include collection and return to your Canary Wharf address.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Canary Wharf Addresses We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 mb-8 font-sans font-light text-sm text-muted">
            {['Canada Square', 'Bank Street', 'Hertsmere Road', 'South Quay', 'West India Quay', 'Crossharbour', 'E14 apartments', 'E14 offices'].map(area => (
              <li key={area} className="flex gap-2"><span className="text-hunter">—</span>{area}</li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Nearby Areas</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We also cover <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link>, <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>, <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link> and <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link>. Full coverage on the <Link href="/tailor-near-me" className="text-hunter underline">tailor near me page</Link>.
          </p>

          <div className="border-t border-divider pt-10">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Canary Wharf</h2>
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
