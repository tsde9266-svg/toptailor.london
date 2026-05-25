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
