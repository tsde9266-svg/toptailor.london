#!/usr/bin/env python3
"""Batch 8: 4 new service/landing pages"""
import os

base = "D:/toptailor/src/app"

pages = [
    # ── 1. Can a tailor collect from home London ─────────────────────────────
    {
        "path": "can-tailor-collect-from-home-london",
        "file": "page.tsx",
        "content": """\
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Can a Tailor Collect From Your Home in London? | Fine Tailors',
  description: 'Yes — Fine Tailors collects your garments from your Central London door, alters them at our workshop, and returns them in 5–7 days. No shop visit required.',
  alternates: { canonical: 'https://www.finetailors.co.uk/can-tailor-collect-from-home-london' },
  openGraph: {
    title: 'Can a Tailor Collect From Your Home in London? | Fine Tailors',
    description: 'Yes — Fine Tailors collects from your Central London door and returns garments altered and pressed in 5–7 days.',
    url: 'https://www.finetailors.co.uk/can-tailor-collect-from-home-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors — Home Collection Service London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Can a Tailor Collect From Your Home?', item: 'https://www.finetailors.co.uk/can-tailor-collect-from-home-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Home Collection Tailoring Service London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Fine Tailors collects garments from your Central London home, alters them at our workshop, and returns them pressed and perfect in 5–7 working days.',
  serviceType: 'Home Collection Garment Alteration',
}

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a tailor collect from my home in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Fine Tailors is a home collection tailoring service operating across Central London. We collect your garments from your door, alter them at our specialist workshop, and return them pressed and perfect within 5–7 working days. The tailor never enters your home — collection and return happen at your doorstep.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does home collection tailoring work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You book a collection slot online or by phone. We arrive at your door at the agreed time, collect your garments, and take them to our workshop. We send you a written quote before any work begins. Within 5–7 working days, your altered garments are returned to your door, pressed and ready to wear.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which areas of London do you collect from?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We collect from all Central London postcodes including W1, SW1, SW3, SW7, W8, WC1, WC2, EC1, EC2, E14, N1, W11, W2 and surrounding areas — covering Mayfair, Chelsea, Knightsbridge, Kensington, Belgravia, Marylebone, Westminster, Soho, Fitzrovia, Bloomsbury, Islington, City of London, Canary Wharf, Notting Hill, Pimlico, Victoria, South Kensington, Fulham, Paddington, Covent Garden, Clerkenwell and Shoreditch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to let the tailor into my home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Collection and return are doorstep-only. The tailor never enters your home. You hand over your garments at the door and receive them back the same way. This is by design — it is the core privacy and convenience principle of the service.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does home collection tailoring cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no additional charge for collection and return — the service is included in the alteration price. Trouser hemming starts from £18, suit jacket alterations from £25, dress alterations from £22. A written quote is provided before any work begins.',
      },
    },
  ],
}

const areas = [
  { name: 'Mayfair', href: '/tailor-mayfair' },
  { name: 'Knightsbridge', href: '/tailor-knightsbridge' },
  { name: 'Chelsea', href: '/tailor-chelsea' },
  { name: 'Kensington', href: '/tailor-kensington' },
  { name: 'Belgravia', href: '/tailor-belgravia' },
  { name: 'Marylebone', href: '/tailor-marylebone' },
  { name: 'Westminster', href: '/tailor-westminster' },
  { name: 'Soho', href: '/tailor-soho' },
  { name: 'Fitzrovia', href: '/tailor-fitzrovia' },
  { name: 'Bloomsbury', href: '/tailor-bloomsbury' },
  { name: 'Islington', href: '/tailor-islington' },
  { name: 'City of London', href: '/tailor-city-of-london' },
  { name: 'Canary Wharf', href: '/tailor-canary-wharf' },
  { name: 'Notting Hill', href: '/tailor-notting-hill' },
  { name: 'Pimlico', href: '/tailor-pimlico' },
  { name: 'Victoria', href: '/tailor-victoria' },
  { name: 'South Kensington', href: '/tailor-south-kensington' },
  { name: 'Fulham', href: '/tailor-fulham' },
  { name: 'Paddington', href: '/tailor-paddington' },
  { name: 'Covent Garden', href: '/tailor-covent-garden' },
  { name: 'Clerkenwell', href: '/tailor-clerkenwell' },
  { name: 'Shoreditch', href: '/tailor-shoreditch' },
]

export default function CanTailorCollectPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        {/* ── Hero ── */}
        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Can a Tailor Collect From Your Home?</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">
            Home Collection · Central London · 5–7 Working Days
          </p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Can a Tailor Collect From<br />
            <em className="font-playfair italic">Your Home in London?</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed mb-8">
            Yes. Fine Tailors is a <strong>home collection tailoring service</strong> operating across all Central London postcodes. We collect your garments from your door, alter them at our specialist workshop, and return them pressed and perfect — typically within 5–7 working days.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">How Home Collection Tailoring Works</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most tailoring services require you to travel to them — carrying your garments across the city, waiting in a shop, and returning days later to collect. For busy London professionals, or anyone with valuable clothes they would rather not transport unnecessarily, this is an inconvenient process.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors works the other way. You book a collection time at your address. We arrive at your door — apartment block, townhouse, hotel, or office — collect the garments, and take them to our workshop. A written quote is sent before any work begins. Within 5–7 working days, the altered pieces come back to your door, pressed and ready.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The tailor never enters your home. Collection and return are doorstep-only — this is the design of the service, not an afterthought. It is how we protect your privacy and your schedule simultaneously.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">The Collection Process</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Slot', 'Book online or call us. Choose a morning, afternoon, or evening time that suits your schedule. We confirm a specific window at your address.'],
              ['We Collect at Your Door', 'We arrive at the agreed time. Collection takes a few minutes at your doorstep — no entry required, no inconvenience beyond answering the door.'],
              ['Written Quote — No Surprises', 'We inspect every garment at the workshop and send a written quote. Nothing is altered until you approve. If you decline, we return the garments unchanged.'],
              ['Expert Alterations at Our Workshop', 'Every piece is handled by one tailor from collection to return — our Single Needle Guarantee. No shared shop floor, no risk of mix-ups.'],
              ['Returned in 5–7 Working Days', 'Your garments are returned to your door pressed and ready to wear. Same doorstep handover, same convenience.'],
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

        {/* ── What we collect ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What We Collect and Alter</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            We collect any garment that requires alteration — from a quick trouser hem to a full suit re-cut or a bridal gown. Services include:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket, trouser and waistcoat alterations — taking in, letting out, sleeve shortening, trouser hemming and tapering. From £25.'],
              ['Dress Alterations', 'Shortening, taking in, zip work, strap adjustments — from day dresses to layered evening gowns. From £22.'],
              ['Trouser & Jean Alterations', 'Hemming, tapering, waist adjustments, original hem preservation. From £18.'],
              ['Jacket & Coat Alterations', 'Sleeve shortening, body tapering, relining, coat shortening. From £30.'],
              ['Wedding Dress Alterations', 'Specialist bridal handling — quoted on inspection after collection.'],
              ['Leather Jacket Alterations', 'Expert leather work — zips, sleeves, body — quoted on inspection.'],
              ['Shirt Alterations', 'Sleeve shortening, body tapering, collar adjustments. From £20.'],
              ['Zip Repair & Replacement', 'Trouser, dress, jacket and coat zip work. From £25.'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── No extra charge ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">No Extra Charge for Collection and Return</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Some tailoring services that offer a collection or call-out option charge separately for the visit — typically £25–£50 on top of the alteration price. At Fine Tailors, collection and return are included in the standard service. You pay for the alteration, not for the convenience.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            All garments are fully insured while in our care. A written quote is provided before any work begins — if you decline the quote, the garments are returned to you unchanged at no cost.
          </p>
        </div>

        {/* ── Areas ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Where We Collect in London</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8 max-w-2xl">
            We cover all Central London postcodes — W1, SW1, SW3, SW7, W8, WC1, WC2, EC1, EC2, E14, N1, W11, W2 and surrounding areas. Select your area for more detail:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            {areas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        {/* ── CTA ── */}
        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Collection</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Book online or call us. We operate seven days a week across all Central London postcodes.
            See our <Link href="/alterations-near-me-london" className="text-hunter underline">full coverage area</Link> or
            browse our <Link href="/services" className="text-hunter underline">services and prices</Link>.
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
""",
    },

    # ── 2. Alteration Costs London ────────────────────────────────────────────
    {
        "path": "alteration-costs-london",
        "file": "page.tsx",
        "content": """\
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Alteration Costs London 2026 | Prices for Every Service | Fine Tailors',
  description: 'Clear alteration prices for Central London. Trouser hemming from £18, suit jacket from £25, dress alterations from £22. Home collection included. Fine Tailors.',
  alternates: { canonical: 'https://www.finetailors.co.uk/alteration-costs-london' },
  openGraph: {
    title: 'Alteration Costs London 2026 | Fine Tailors Price Guide',
    description: 'Clear London alteration prices: trouser hem from £18, suit jacket from £25, dress from £22. Collection and return included.',
    url: 'https://www.finetailors.co.uk/alteration-costs-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors — Alteration Costs London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Alteration Costs London', item: 'https://www.finetailors.co.uk/alteration-costs-london' },
  ],
}

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much do clothing alterations cost in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'London alteration prices vary by garment and alteration type. Trouser hemming starts from £18. Suit jacket alterations start from £25. Dress alterations start from £22. Coat alterations start from £30. Wedding dress and leather garment work is quoted on inspection. Fine Tailors includes collection and return from your Central London home in the alteration price.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to alter a suit in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suit alteration costs in London: trouser hemming from £18, trouser tapering from £22, jacket sleeve shortening from £25, jacket body taking-in from £35, waistcoat alterations from £20. A full suit (jacket and trousers) alteration typically costs £60–£120 depending on the extent of work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there an extra charge for home collection in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Fine Tailors includes collection and return from your Central London door in the alteration price. Some tailoring services charge £25–£50 for a call-out visit — we do not. You pay only for the alteration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do dress alterations cost in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dress alteration costs in London: hemming from £22, taking-in from £25, zip replacement from £28, strap adjustment from £15. Evening gowns and layered dresses cost more depending on complexity. Wedding dress and bridal alterations are quoted on inspection.',
      },
    },
  ],
}

const services = [
  {
    category: 'Trousers & Jeans',
    items: [
      { name: 'Trouser hemming (plain)', price: 'From £18' },
      { name: 'Trouser hemming (turn-up)', price: 'From £22' },
      { name: 'Trouser tapering', price: 'From £22' },
      { name: 'Trouser waist adjustment', price: 'From £22' },
      { name: 'Trouser seat adjustment', price: 'From £28' },
      { name: 'Jean hemming (plain)', price: 'From £18' },
      { name: 'Jean hemming (original hem preserved)', price: 'From £28' },
      { name: 'Jean tapering', price: 'From £22' },
    ],
  },
  {
    category: 'Suit Jackets',
    items: [
      { name: 'Sleeve shortening (plain)', price: 'From £25' },
      { name: 'Sleeve shortening (with working buttonholes)', price: 'From £40' },
      { name: 'Body taking-in (side seams)', price: 'From £35' },
      { name: 'Chest letting-out', price: 'From £35' },
      { name: 'Shoulder adjustment', price: 'Quoted on inspection' },
    ],
  },
  {
    category: 'Dresses',
    items: [
      { name: 'Dress hemming', price: 'From £22' },
      { name: 'Dress taking-in', price: 'From £25' },
      { name: 'Strap shortening or adjustment', price: 'From £15' },
      { name: 'Zip replacement', price: 'From £28' },
      { name: 'Evening gown alterations', price: 'From £35' },
    ],
  },
  {
    category: 'Shirts',
    items: [
      { name: 'Sleeve shortening', price: 'From £20' },
      { name: 'Body tapering', price: 'From £22' },
      { name: 'Collar adjustment', price: 'From £18' },
    ],
  },
  {
    category: 'Jackets & Coats',
    items: [
      { name: 'Jacket sleeve shortening', price: 'From £30' },
      { name: 'Jacket body tapering', price: 'From £35' },
      { name: 'Coat shortening', price: 'From £45' },
      { name: 'Coat body adjustment', price: 'From £35' },
      { name: 'Relining (jacket)', price: 'From £75' },
    ],
  },
  {
    category: 'Zips',
    items: [
      { name: 'Trouser zip replacement', price: 'From £25' },
      { name: 'Dress zip replacement', price: 'From £28' },
      { name: 'Jacket zip replacement', price: 'From £35' },
      { name: 'Coat zip replacement', price: 'From £40' },
      { name: 'Leather jacket zip replacement', price: 'Quoted on inspection' },
    ],
  },
  {
    category: 'Specialist Garments',
    items: [
      { name: 'Wedding dress alterations', price: 'Quoted on inspection' },
      { name: 'Bridal gown alterations', price: 'Quoted on inspection' },
      { name: 'Leather jacket alterations', price: 'Quoted on inspection' },
      { name: 'Bespoke or made-to-measure', price: 'Quoted on consultation' },
    ],
  },
]

export default function AlterationCostsPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        {/* ── Hero ── */}
        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Alteration Costs London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">
            Prices · Central London · Collection Included
          </p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Alteration Costs in London —{' '}
            <em className="font-playfair italic">Clear Prices, No Surprises</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            We publish our prices because we believe you should know what you are paying before you commit. All prices below are starting rates — exact quotes are confirmed after inspection, before any work begins. <strong>Collection and return from your Central London door are included.</strong>
          </p>
        </div>

        {/* ── Price note ── */}
        <div className="px-8 lg:px-24 py-10 border-b border-divider max-w-4xl">
          <div className="border border-hunter/20 bg-hunter/5 p-6">
            <p className="font-playfair text-base font-medium text-charcoal mb-2">How our pricing works</p>
            <p className="font-sans font-light text-sm text-muted leading-relaxed">
              Prices shown are starting rates. Every garment is inspected at our workshop and a written quote is sent before any work begins. If the quote is higher than expected, you can decline — your garments are returned unchanged at no charge. Collection and return from your Central London home are included in all prices.
            </p>
          </div>
        </div>

        {/* ── Price tables ── */}
        {services.map((section) => (
          <div key={section.category} className="px-8 lg:px-24 py-12 border-b border-divider max-w-4xl">
            <h2 className="font-playfair text-[1.5rem] font-medium mb-6">{section.category}</h2>
            <table className="w-full max-w-2xl border-collapse">
              <tbody>
                {section.items.map((item) => (
                  <tr key={item.name} className="border-t border-divider">
                    <td className="py-3 pr-8 font-sans font-light text-sm text-charcoal">{item.name}</td>
                    <td className="py-3 font-sans font-medium text-sm text-hunter whitespace-nowrap">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* ── Why prices vary ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Alteration Prices Vary</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most London alteration services charge more than the published &ldquo;from&rdquo; price for a number of reasons. The most common are: fabric type (leather, silk and lined garments take more time and skill than cotton or synthetic), the extent of the alteration (shortening a trouser 2cm is different to shortening it 8cm and re-tapering through the thigh), and whether the original construction makes access to the seams straightforward.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Designer and bespoke garments — Savile Row suits, couture dresses, luxury leather jackets — are inspected individually before any price is given. The price is always confirmed in writing before work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Our <Link href="/can-tailor-collect-from-home-london" className="text-hunter underline">home collection service</Link> adds no charge to the alteration price. You pay only for the work done on the garment.
          </p>
        </div>

        {/* ── Compare ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What London Alteration Prices Usually Include</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            At a standard high street tailor, the prices you see cover the alteration only — you travel to the shop, drop the garment, and return to collect. At Fine Tailors, collection from your door and return to your door are part of the service. The convenience difference is significant; the price difference is minimal.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Some services offering a call-out option charge £25–£50 for the visit on top of alteration prices. We do not. Collection and return are always included.
          </p>
        </div>

        <FAQ />

        {/* ── CTA ── */}
        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Book online or call us. We confirm a written quote after inspecting your garments — no work begins until you approve.
            See our <Link href="/services" className="text-hunter underline">full services list</Link> or
            our <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations page</Link> for more detail.
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
""",
    },

    # ── 3. Evening Wear Alterations London ────────────────────────────────────
    {
        "path": "evening-wear-alterations-london",
        "file": "page.tsx",
        "content": """\
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Evening Wear Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert evening wear alterations in London — gowns, cocktail dresses, black tie suits and occasion wear. Collected from your Central London door and returned in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/evening-wear-alterations-london' },
  openGraph: {
    title: 'Evening Wear Alterations London | Home Collection | Fine Tailors',
    description: 'Expert evening wear alterations collected from your Central London door. Gowns, cocktail dresses, black tie — returned perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/evening-wear-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Evening Wear Alterations London — Fine Tailors' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Dress Alterations London', item: 'https://www.finetailors.co.uk/dress-alterations-london' },
    { '@type': 'ListItem', position: 3, name: 'Evening Wear Alterations London', item: 'https://www.finetailors.co.uk/evening-wear-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Evening Wear Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Expert evening wear alterations collected from your Central London home and returned within 5–7 working days.',
  serviceType: 'Evening Wear Alterations',
}

export default function EveningWearAlterationsPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/dress-alterations-london" className="hover:text-hunter">Dress Alterations London</Link>
            <span className="mx-2">/</span>
            <span>Evening Wear</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">
            Evening Wear · Collection Service · 5–7 Working Days
          </p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Evening Wear Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides <strong>expert evening wear alterations in London</strong> with a full home collection and return service. Gowns, cocktail dresses, black tie suits, and all occasion wear — collected from your door and returned perfectly fitted within 5–7 working days.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Evening Wear Needs a Specialist</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Evening wear presents different challenges from everyday clothing. A floor-length gown has a hem that must fall perfectly when you are wearing your event shoes — not approximated. A structured bodice requires precise adjustment to stay in place through an entire evening. A black tie dinner jacket needs sleeve work that preserves the formal silhouette.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            At Fine Tailors, we handle evening wear regularly — from cocktail dresses to full-length ball gowns, from occasion suits to formal separates. Every piece is inspected individually. A written quote is provided before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The collection model is particularly well-suited to evening wear. These garments are often delicate, expensive, or both — carrying them across London on public transport, leaving them in a busy shop, and collecting them later is an unnecessary risk. We collect from your door and return the same way.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Evening Wear Alterations We Provide</h2>
          <table className="w-full max-w-2xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-8 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Gown hemming', 'From £35'],
                ['Cocktail dress hemming', 'From £22'],
                ['Bodice taking-in', 'From £35'],
                ['Strap shortening or adjustment', 'From £15'],
                ['Zip replacement (dress)', 'From £28'],
                ['Invisible zip installation', 'From £32'],
                ['Layered skirt shortening', 'From £45'],
                ['Beaded or embellished hem', 'Quoted on inspection'],
                ['Black tie jacket sleeve', 'From £30'],
                ['Dinner suit trousers', 'From £18'],
                ['Full gown re-cut', 'Quoted on inspection'],
              ].map(([name, price]) => (
                <tr key={name} className="border-t border-divider">
                  <td className="py-3 pr-8 font-sans font-light text-sm text-charcoal">{name}</td>
                  <td className="py-3 font-sans font-medium text-sm text-hunter">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-sans text-xs text-muted mt-4">Prices are starting rates. Written quote confirmed after inspection.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your address — morning, afternoon or evening, seven days a week.'],
              ['We Collect at Your Door', 'We arrive at the agreed time. Your evening wear is collected at the doorstep — no need to carry delicate garments anywhere.'],
              ['Written Quote Approved', 'We inspect every piece at our workshop and send a written quote. No work begins until you approve.'],
              ['Returned in 5–7 Working Days', 'Your garments are returned to your door pressed and ready for wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Dress Alterations London', href: '/dress-alterations-london' },
              { label: 'Wedding Dress Alterations', href: '/wedding-dress-alterations-london' },
              { label: 'Bridesmaid Dress Alterations', href: '/bridesmaid-dress-alterations-london' },
              { label: 'Clothing Alterations London', href: '/clothing-alterations-london' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Evening Wear Alterations</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We cover all Central London postcodes seven days a week. Collection and return are included in the alteration price.
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
""",
    },

    # ── 4. Bridesmaid Dress Alterations London ────────────────────────────────
    {
        "path": "bridesmaid-dress-alterations-london",
        "file": "page.tsx",
        "content": """\
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Bridesmaid Dress Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert bridesmaid dress alterations in London — hemming, taking-in, strap work and zip replacement. Collected from your Central London home and returned in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/bridesmaid-dress-alterations-london' },
  openGraph: {
    title: 'Bridesmaid Dress Alterations London | Fine Tailors',
    description: 'Expert bridesmaid dress alterations collected from your Central London door. Returned perfectly fitted in 5–7 working days.',
    url: 'https://www.finetailors.co.uk/bridesmaid-dress-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bridesmaid Dress Alterations London — Fine Tailors' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Wedding Dress Alterations London', item: 'https://www.finetailors.co.uk/wedding-dress-alterations-london' },
    { '@type': 'ListItem', position: 3, name: 'Bridesmaid Dress Alterations London', item: 'https://www.finetailors.co.uk/bridesmaid-dress-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bridesmaid Dress Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Expert bridesmaid dress alterations collected from your Central London home and returned within 5–7 working days.',
  serviceType: 'Bridesmaid Dress Alterations',
}

export default function BridesmaidDressAlterationsPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/wedding-dress-alterations-london" className="hover:text-hunter">Wedding Dress Alterations</Link>
            <span className="mx-2">/</span>
            <span>Bridesmaid Dresses</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">
            Bridesmaid Alterations · Collection Service · 5–7 Working Days
          </p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Bridesmaid Dress Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides <strong>expert bridesmaid dress alterations in London</strong> with a full home collection and return service. We collect from your Central London address, alter every dress to the perfect fit, and return them within 5–7 working days — without you visiting a single shop.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Bridesmaids Are Different Sizes — That Is the Point</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Bridesmaid dresses are typically bought in one style but multiple sizes, or ordered from the same batch but fitted to different bodies. The alteration challenge is precision — every dress needs to fit its wearer perfectly, and the group needs to look consistent on the day.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors regularly alters bridesmaid dresses individually, accounting for each wearer&apos;s specific requirements. Common alterations include hemming to the exact floor length for the shoes being worn, taking in the bodice, adjusting straps or back fastenings, and zip work. We inspect every dress and confirm the alterations required before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The collection model works well for bridal parties — dresses can be collected from the bride&apos;s home, a hotel room, or different individual addresses across Central London, and returned individually or together.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Bridesmaid Dress Alterations We Provide</h2>
          <table className="w-full max-w-2xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-8 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Dress hemming', 'From £22'],
                ['Bodice taking-in', 'From £30'],
                ['Strap shortening or adjustment', 'From £15'],
                ['Zip replacement', 'From £28'],
                ['Back opening adjustment', 'From £25'],
                ['Bustle or train work', 'Quoted on inspection'],
                ['Floor length adjustment (multiple layers)', 'From £45'],
                ['Full re-fit (multiple alterations)', 'Quoted on inspection'],
              ].map(([name, price]) => (
                <tr key={name} className="border-t border-divider">
                  <td className="py-3 pr-8 font-sans font-light text-sm text-charcoal">{name}</td>
                  <td className="py-3 font-sans font-medium text-sm text-hunter">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-sans text-xs text-muted mt-4">Prices are starting rates. Written quote confirmed after inspection.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Timing Your Bridesmaid Alterations</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Bridesmaid dresses should ideally be altered 4–8 weeks before the wedding, after final fittings with the shoes being worn on the day. Alterations too early risk not accounting for minor size changes; alterations too close to the date leave no time for corrections if needed.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Our standard turnaround is 5–7 working days. For time-sensitive occasions, call us to discuss availability. We operate seven days a week across all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Wedding Dress Alterations', href: '/wedding-dress-alterations-london' },
              { label: 'Evening Wear Alterations', href: '/evening-wear-alterations-london' },
              { label: 'Dress Alterations London', href: '/dress-alterations-london' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Bridesmaid Dress Alterations</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We cover all Central London postcodes seven days a week. Book early to allow time for fittings and any corrections before the wedding day.
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
""",
    },
]

for page in pages:
    dir_path = f"{base}/{page['path']}"
    os.makedirs(dir_path, exist_ok=True)
    file_path = f"{dir_path}/{page['file']}"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(page["content"])
    print(f"Written: {page['path']}")

print("Batch 8 (4 service pages) complete.")
