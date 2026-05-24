import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Shoreditch London — Collection Service | Fine Tailors',
  description: 'Looking for a tailor near you in Shoreditch? Fine Tailors collects from your E1/EC2A door, alters for tech and fashion professionals, and returns pressed and perfect in 5–7 days.',
  keywords: ['tailor near me Shoreditch', 'tailor near me Shoreditch London', 'Shoreditch tailor near me', 'nearest tailor Shoreditch', 'tailor Shoreditch London', 'mobile tailor Shoreditch'],
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-shoreditch' },
  openGraph: {
    title: 'Tailor Near Me in Shoreditch London — Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-shoreditch',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me in Shoreditch London' }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me in Shoreditch London — Collection Service',
  description: 'How to find the best tailor near you in Shoreditch — and why a collection-based service is the right choice for E1 and EC2A residents.',
  image: 'https://www.finetailors.co.uk/images/tailor.jpg',
  datePublished: '2026-05-24',
  dateModified: '2026-05-24',
  author: { '@type': 'Organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', name: 'Fine Tailors', url: 'https://www.finetailors.co.uk' },
  mainEntityOfPage: 'https://www.finetailors.co.uk/blog/tailor-near-me-shoreditch',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me in Shoreditch', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-shoreditch' },
  ],
}

export default function TailorNearMeShoreditch() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="relative w-full h-72 lg:h-96 overflow-hidden">
          <Image src="/images/tailor.jpg" alt="Tailor near me in Shoreditch London" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="px-8 lg:px-24 py-16 max-w-3xl">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me in Shoreditch</span>
          </nav>

          <p className="font-sans text-xs text-muted uppercase tracking-widest mb-4">Local Guide · 5 min read</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor Near Me in Shoreditch, London
          </h1>
          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-12">
            Shoreditch wardrobes don&apos;t fit neatly into one category. The same person might need a blazer tailored for a client meeting at a Shoreditch tech firm, a leather jacket taken in, and a pair of vintage Levi&apos;s hemmed. When you search for a tailor near you in Shoreditch, you need someone who can handle all of it — with the same level of care. Fine Tailors collects from your E1 or EC2A door and does exactly that.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Why a Collection Tailor Works for Shoreditch</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Shoreditch is busy. Brick Lane, Old Street, Commercial Street — the neighbourhood has energy but not always a lot of convenient high street tailoring. Many E1 and EC2A residents end up travelling across London for alterations when the answer should be simpler.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors collects from your door. Whether you&apos;re in a flat above Shoreditch High Street, a studio off Bethnal Green Road, or an apartment near Old Street roundabout — we come to you. No travel, no waiting, no shop.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">How It Works</h2>
          <ol className="space-y-4 mb-8">
            {[
              ['Book a collection', 'Online or by phone. We confirm a time at your E1 or EC2A address.'],
              ['We collect from your door', 'Apartments, studios, offices. Buzzer access and door codes noted in advance.'],
              ['We alter every piece', 'Suits, leather jackets, jeans, casual pieces — all handled with care. Written quote approved by you first.'],
              ['We return pressed and perfect', 'Within 5–7 working days your garments are back at your Shoreditch address.'],
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

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">What We Alter in Shoreditch</h2>
          <ul className="space-y-2 mb-8 font-sans font-light text-muted">
            {[
              'Suit alterations — jacket take-in, sleeve shortening, trouser hemming',
              'Trouser and jean alterations — hemming, tapering, waist adjustment',
              'Leather jacket alterations — specialist work quoted on inspection',
              'Jacket and coat alterations — body resizing, sleeve work',
              'Dress alterations — shortening, take-in, zip replacement',
              'Casual garments — fashion pieces, independent brand garments, vintage finds',
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
              ['Leather jacket alterations', 'Quoted on inspection'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between px-5 py-3 font-sans text-sm">
                <span className="font-light text-charcoal">{service}</span>
                <span className="text-muted">{price}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">Minimum order £20. All prices include collection and return to your Shoreditch address.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Shoreditch Areas We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 mb-8 font-sans font-light text-sm text-muted">
            {['Brick Lane', 'Old Street', 'Commercial Street', 'Shoreditch High Street', 'Bethnal Green Road', 'Calvert Avenue', 'E1 postcodes', 'EC2A postcodes'].map(area => (
              <li key={area} className="flex gap-2"><span className="text-hunter">—</span>{area}</li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Nearby Areas</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We cover <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link>, <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>, <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link> and <Link href="/tailor-islington" className="text-hunter underline">Islington</Link>. See the <Link href="/tailor-near-me" className="text-hunter underline">full tailor near me coverage page</Link>.
          </p>

          <div className="border-t border-divider pt-10">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Shoreditch</h2>
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
