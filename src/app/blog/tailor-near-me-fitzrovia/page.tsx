import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Fitzrovia London — Collection Service | Fine Tailors',
  description: 'Looking for a tailor near you in Fitzrovia? Fine Tailors collects from your W1T/W1W door, alters suits, dresses and garments to a perfect fit, and returns in 5–7 days.',
  keywords: ['tailor near me Fitzrovia', 'tailor near me Fitzrovia London', 'Fitzrovia tailor near me', 'nearest tailor Fitzrovia', 'tailor Fitzrovia London', 'mobile tailor Fitzrovia'],
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-fitzrovia' },
  openGraph: {
    title: 'Tailor Near Me in Fitzrovia London — Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-fitzrovia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me in Fitzrovia London' }],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me in Fitzrovia London — Collection Service',
  description: 'How to find the best tailor near you in Fitzrovia — and why a collection-based service is the right choice for W1T/W1W residents.',
  image: 'https://www.finetailors.co.uk/images/tailor.jpg',
  datePublished: '2026-05-25',
  dateModified: '2026-05-25',
  author: { '@type': 'Organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', name: 'Fine Tailors', url: 'https://www.finetailors.co.uk' },
  mainEntityOfPage: 'https://www.finetailors.co.uk/blog/tailor-near-me-fitzrovia',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me in Fitzrovia', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-fitzrovia' },
  ],
}

export default function TailorNearMeFitzrovia() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="relative w-full h-72 lg:h-96 overflow-hidden">
          <Image src="/images/tailor.jpg" alt="Tailor near me in Fitzrovia London" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="px-8 lg:px-24 py-16 max-w-3xl">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me in Fitzrovia</span>
          </nav>

          <p className="font-sans text-xs text-muted uppercase tracking-widest mb-4">Local Guide · 5 min read</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor Near Me in Fitzrovia, London
          </h1>
          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-12">
            Fitzrovia sits between Marylebone, Soho and Bloomsbury — a creative, media-heavy neighbourhood with a mix of well-dressed professionals and a strong independent-business culture. If you&apos;re looking for a tailor near you in Fitzrovia, Fine Tailors makes it easy. Fine Tailors collects from your W1T or W1W door and returns your garments perfectly altered within 5–7 working days.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">What &lsquo;Tailor Near Me&rsquo; Really Means in Fitzrovia</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The nearest alterations shop to your Fitzrovia address may not be the right choice for your garments. A shop requires you to carry your clothes in, wait for an appointment, leave them and return again to collect. Fine Tailors removes every step of that process.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We offer a better answer to &ldquo;tailor near me&rdquo; in Fitzrovia: a collection service that comes directly to your W1T or W1W address, handles your garments from start to finish, and delivers them pressed and perfectly fitted — without you ever leaving home.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">How It Works</h2>
          <ol className="space-y-4 mb-8">
            {[
              ['Book online or call', 'Select a collection time that suits you — morning, afternoon or evening, any day.'],
              ['We collect from your Fitzrovia door', 'We come to your W1T or W1W address. Doorstep collection only — no entry required.'],
              ['Your garments are altered', 'Every piece handled in our specialist workshop. Written quote sent for approval before work begins.'],
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

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">What We Alter in Fitzrovia</h2>
          <ul className="space-y-2 mb-8 font-sans font-light text-muted">
            {[
              'Suit alterations — jacket resizing, sleeve shortening, trouser hemming and tapering',
              'Dress alterations — shortening, take-in, zip replacement, occasion wear',
              'Coat and jacket alterations — body resizing, sleeve work, coat shortening',
              'Trouser and jean alterations — hemming, tapering, waist adjustment',
              'Designer and luxury garments — handled with specialist care',
              'Wedding dress alterations — specialist bridal work handled with full care',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-hunter mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Prices for Fitzrovia Alterations</h2>
          <div className="border border-divider divide-y divide-divider mb-8">
            {[
              ['Trouser hemming', 'from £18'],
              ['Trouser tapering', 'from £18'],
              ['Jacket sleeve shortening', 'from £30'],
              ['Jacket back take-in', 'from £18'],
              ['Plain dress shortening', 'from £25'],
              ['Dress take-in', 'from £28'],
              ['Coat shortening', 'from £45'],
              ['Designer / leather pieces', 'Quoted on inspection'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between px-5 py-3 font-sans text-sm">
                <span className="font-light text-charcoal">{service}</span>
                <span className="text-muted">{price}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">Minimum order £20. All prices include collection and return to your Fitzrovia address.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Fitzrovia Areas We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 mb-8 font-sans font-light text-sm text-muted">
            <li className="flex gap-2"><span className="text-hunter">—</span>Charlotte Street</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>Fitzroy Square</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>Tottenham Court Road</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>Goodge Street</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>Newman Street</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>Rathbone Place</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>W1T</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>W1W</li>
            <li className="flex gap-2"><span className="text-hunter">—</span>Fitzrovia creative offices and residences</li>

          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Nearby Areas We Also Serve</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We cover <Link href="/tailor-fitzrovia" className="text-hunter underline">Fitzrovia</Link>, <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>, <Link href="/tailor-soho" className="text-hunter underline">Soho</Link>, <Link href="/tailor-bloomsbury" className="text-hunter underline">Bloomsbury</Link>, <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>. See the <Link href="/tailor-near-me" className="text-hunter underline">full tailor near me coverage page</Link> for every London area.
          </p>

          <div className="border-t border-divider pt-10">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Fitzrovia</h2>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Book a collection from your Fitzrovia address online or call us directly.
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
        </div>

      </main>
      <Footer />
    </>
  )
}
