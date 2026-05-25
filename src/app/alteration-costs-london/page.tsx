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
