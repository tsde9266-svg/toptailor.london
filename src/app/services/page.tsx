import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailoring & Alteration Services London | Collected From Your Door | Fine Tailors',
  description: 'All tailoring and alteration services in London — suits, dresses, trousers, jackets, coats, wedding dresses, leather jackets and more. Collected from your Central London door in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/services' },
  openGraph: {
    title: 'Tailoring & Alteration Services London | Fine Tailors',
    description: 'All garment alteration services in London collected from your door. Suits, dresses, coats, leather jackets and more.',
    url: 'https://www.finetailors.co.uk/services',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors collection alteration services London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.finetailors.co.uk/services' },
  ],
}

const coreServices = [
  {
    title: 'Suit Alterations',
    href: '/suit-alterations-london',
    price: 'from £18',
    desc: 'Jacket waist suppression, sleeve shortening, trouser hemming and tapering, waistcoat alterations — the complete suit altered to a perfect fit.',
  },
  {
    title: 'Dress Alterations',
    href: '/dress-alterations-london',
    price: 'from £25',
    desc: 'Hemming, body take-in, strap and neckline adjustments, zip replacement — for everyday dresses, evening gowns and occasion wear.',
  },
  {
    title: 'Trouser Alterations',
    href: '/trouser-alterations-london',
    price: 'from £18',
    desc: 'Hemming to the right break, tapering the leg, waist and seat adjustment, turn-up addition or removal. Jeans and suit trousers alike.',
  },
  {
    title: 'Jacket Alterations',
    href: '/jacket-alterations-london',
    price: 'from £18',
    desc: 'Sleeve shortening, body take-in, lining repair, collar work. Blazers, suit jackets and casual jackets.',
  },
  {
    title: 'Coat Alterations',
    href: '/coat-alterations-london',
    price: 'from £30',
    desc: 'Coat shortening, sleeve adjustment, body take-in, lining replacement. Overcoats, trench coats, wool coats and cashmere topcoats.',
  },
  {
    title: 'Shirt Alterations',
    href: '/shirt-alterations-london',
    price: 'from £15',
    desc: 'Body take-in, sleeve shortening, collar adjustment, dart addition. Dress shirts, casual shirts and formal wear.',
  },
  {
    title: 'Wedding Dress Alterations',
    href: '/wedding-dress-alterations-london',
    price: 'quoted on inspection',
    desc: 'Specialist bridal alterations — hemming layered gowns, bodice take-in, bustle fitting, strap adjustment and emergency repairs. Collected from your home.',
  },
  {
    title: 'Leather Jacket Alterations',
    href: '/leather-jacket-alterations-london',
    price: 'quoted on inspection',
    desc: 'Sleeve shortening, body take-in, zip replacement, lining repair. Specialist leather equipment required — handled by experienced hands.',
  },
  {
    title: 'Same Day & Express',
    href: '/same-day-alterations-london',
    price: 'express fee applies',
    desc: 'Urgent alterations for last-minute occasions. Call to confirm availability — not all garments or alterations are achievable same-day.',
  },
  {
    title: 'Bespoke Tailoring',
    href: '/bespoke-tailoring-london',
    price: 'quoted individually',
    desc: 'Made-to-measure suits, shirts and formal wear — all fittings and consultations at your Central London home. No Savile Row appointment required.',
  },
]

const luxuryServices = [
  {
    title: 'Canada Goose Alterations',
    href: '/canada-goose-alterations-london',
    desc: 'Sleeve shortening, body adjustment and zip repair on Canada Goose jackets. Down-fill construction handled with specialist understanding.',
  },
  {
    title: 'Moncler Jacket Alterations',
    href: '/moncler-jacket-alterations-london',
    desc: 'Sleeve shortening, body width reduction and zip work on Moncler quilted and down jackets. Luxury outerwear requiring careful handling.',
  },
  {
    title: 'Barbour Alterations',
    href: '/barbour-alterations-london',
    desc: 'Waxed cotton and quilted Barbour jacket alterations. Sleeve shortening, body take-in, lining replacement — wax compatibility discussed upfront.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Script id="schema-breadcrumb-services" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Services</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailoring &amp; Alteration Services —{' '}
            <em className="font-playfair italic">Collected From Your London Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Every service listed below is delivered by collection. We come to your Central London door, collect your garments, alter them in our specialist workshop, and return them pressed and perfect within 5–7 working days. All garments are fully insured while in our care.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Alteration Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl">
            {coreServices.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="border border-divider p-6 hover:border-hunter hover:bg-hunter/5 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-playfair text-xl font-medium text-charcoal group-hover:text-hunter">
                    {svc.title}
                  </h2>
                  <span className="font-sans text-xs text-hunter border border-hunter px-2 py-1 shrink-0 ml-4">
                    {svc.price}
                  </span>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{svc.desc}</p>
                <span className="inline-block mt-4 font-sans text-xs font-medium text-hunter uppercase tracking-widest">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Luxury Brand Specialist Work</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-2xl leading-relaxed">
            Outerwear from premium brands requires different handling — specific fabrics, specialist equipment, and understanding of the brand&apos;s construction. All work quoted individually on inspection.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl">
            {luxuryServices.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="border border-divider p-6 hover:border-hunter hover:bg-hunter/5 transition-colors duration-200 group"
              >
                <h3 className="font-playfair text-lg font-medium text-charcoal group-hover:text-hunter mb-3">
                  {svc.title}
                </h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What All Services Have in Common</h2>
          <div className="space-y-4">
            {[
              ['Collection from your door', 'We come to your Central London address — home, office or hotel. No travel required.'],
              ['No stranger in your home', 'We collect from your door, not from your kitchen table. The collection is the only contact.'],
              ['Garments insured in transit', 'All garments are fully insured from collection to return. Hand over a £1,500 suit with confidence.'],
              ['Written quote before work begins', 'We send a detailed quote after assessing your garments. No work begins without your approval.'],
              ['One tailor from start to finish', 'The Single Needle Guarantee — one person handles your clothes throughout.'],
              ['5–7 working day return', 'Most work returned within 5–7 working days. Express service available — call to confirm.'],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-5 border-b border-divider pb-4 last:border-0">
                <div className="w-1 bg-hunter/20 shrink-0 mt-1" />
                <div>
                  <p className="font-playfair font-medium text-charcoal mb-1">{title}</p>
                  <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We cover all Central London postcodes. See our full <Link href="/locations" className="text-hunter underline">list of areas we cover</Link>.
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
