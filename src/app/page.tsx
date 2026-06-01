import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import Services      from '@/components/Services'
import NeedleDivider  from '@/components/NeedleDivider'
import CraftGallery   from '@/components/CraftGallery'
import OffersSection  from '@/components/OffersSection'
import HowItWorks     from '@/components/HowItWorks'
import TailorJourney from '@/components/TailorJourney'
import About         from '@/components/About'
import Reviews       from '@/components/Reviews'
// Commented out — superseded by the unified /get-started flow.
// To re-enable: uncomment this import + the <BookingForm /> usage below.
// import BookingForm   from '@/components/BookingForm'
import StickyBar     from '@/components/StickyBar'
import Footer        from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'
import { getAllReviews } from '@/lib/kv'

export const metadata: Metadata = {
  title: "Mobile Tailor Central London | Suit & Clothing Alterations | Fine Tailors",
  description: "London's collection-based tailoring service. We collect from your door in Mayfair, Westminster, Knightsbridge & all Central London postcodes — returned perfect in 5–7 days.",
  alternates: { canonical: 'https://www.finetailors.co.uk' },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.finetailors.co.uk/#webpage',
  url: 'https://www.finetailors.co.uk',
  name: "Mobile Tailor Central London | Suit & Clothing Alterations | Fine Tailors",
  description: "Fine Tailors is London's collection-based tailoring service. We collect garments from your door across Mayfair, Westminster, Knightsbridge and all Central London postcodes — returned pressed and perfect in 5–7 days.",
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-intro', '#services-intro'],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    ],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Book a Mobile Tailor in London',
  description: 'Book Fine Tailors for suit alterations, dress alterations or bespoke tailoring at your London home or office.',
  totalTime: 'PT5D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Book a Collection Slot',
      text: 'Choose your services and book a home visit slot. We come to your home or office anywhere in central London — no travel required.',
      url: 'https://www.finetailors.co.uk/book',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Tailor Inspects & Quotes',
      text: 'Our tailor collects your garments, inspects every piece and sends a confirmed written quote. Work only begins after you approve the price.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Garments Returned Perfectly Altered',
      text: 'Within 5–7 working days your garments are returned to your door, pressed and perfected. Payment is due only after you have approved the quote.',
    },
  ],
}

const areas = [
  { name: 'Mayfair',        href: '/tailor-mayfair',        desc: 'Collections from Grosvenor Square, Berkeley Square & W1J.' },
  { name: 'Chelsea',        href: '/tailor-chelsea',        desc: 'King\'s Road, Sloane Square & SW3/SW10.' },
  { name: 'Knightsbridge',  href: '/tailor-knightsbridge',  desc: 'Steps from Harrods — SW1X & SW7.' },
  { name: 'Kensington',     href: '/tailor-kensington',     desc: 'Holland Park, High Street Kensington & W8.' },
  { name: 'Belgravia',      href: '/tailor-belgravia',      desc: 'Eaton Square, Chester Square & SW1W.' },
  { name: 'Westminster',    href: '/tailor-westminster',    desc: 'Whitehall, Victoria, Pimlico & SW1.' },
  { name: 'Marylebone',     href: '/tailor-marylebone',     desc: 'Harley Street, Chiltern Street & W1G.' },
  { name: 'Soho',           href: '/tailor-soho',           desc: 'Dean Street, Wardour Street & W1D.' },
  { name: 'City of London', href: '/tailor-city-of-london', desc: 'EC1, EC2, EC3 and EC4 covered.' },
  { name: 'Islington',      href: '/tailor-islington',      desc: 'Upper Street, Angel, Canonbury & N1.' },
  { name: 'Notting Hill',   href: '/tailor-notting-hill',   desc: 'Portobello Road, Westbourne Grove & W11.' },
  { name: 'Canary Wharf',    href: '/tailor-canary-wharf',    desc: 'Canada Square, Bank Street & E14.' },
  { name: 'Covent Garden',  href: '/tailor-covent-garden',   desc: 'Long Acre, Seven Dials & WC2E.' },
  { name: 'Fitzrovia',      href: '/tailor-fitzrovia',       desc: 'Charlotte Street, Goodge Street & W1T.' },
  { name: 'Bloomsbury',     href: '/tailor-bloomsbury',      desc: 'Russell Square, Gower Street & WC1B.' },
  { name: 'Paddington',     href: '/tailor-paddington',      desc: 'Praed Street, Hyde Park & W2.' },
  { name: 'Pimlico',        href: '/tailor-pimlico',         desc: 'Warwick Way, Tachbrook Street & SW1V.' },
  { name: 'Clerkenwell',    href: '/tailor-clerkenwell',     desc: 'Exmouth Market, Farringdon Road & EC1.' },
  { name: 'Shoreditch',     href: '/tailor-shoreditch',      desc: 'Brick Lane, Old Street & E1/EC2A.' },
  { name: 'South Kensington', href: '/tailor-south-kensington', desc: 'Cromwell Road, Exhibition Road & SW7.' },
  { name: 'Fulham',         href: '/tailor-fulham',          desc: "Fulham Road, Parson's Green & SW6." },
]

export default async function Home() {
  const reviews = await getAllReviews().catch(() => [])
  return (
    <>
      <Script
        id="schema-webpage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Script
        id="schema-howto"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="schema-faq-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <Hero />

      <main>
        <Services />
        <NeedleDivider />

        {/* ── Trust differentiators — with visual ──────────────── */}
        <section className="border-t border-divider bg-parchment overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left: image */}
            <div className="relative h-64 lg:h-auto lg:min-h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1626274890657-e28d5b65b04b?w=900&q=80&auto=format&fit=crop"
                alt="Fine Tailors — why we are different from every other London tailor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-hunter/30" />
              <div className="absolute inset-0 flex items-end p-8 lg:p-12">
                <span className="font-playfair text-[2rem] text-parchment italic leading-tight">
                  &ldquo;From your door<br />to ours — and back.&rdquo;
                </span>
              </div>
            </div>
            {/* Right: content */}
            <div className="px-8 lg:px-16 py-14 lg:py-20 flex flex-col justify-center">
              <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted block mb-4">
                WHY FINE TAILORS
              </span>
              <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium mb-4 leading-tight">
                The Difference You <em className="italic">Feel</em>
              </h2>
              <p className="font-sans font-light text-muted max-w-md mb-10 leading-relaxed">
                Every other London tailor asks you to come to them. Fine Tailors collects from your door — and that changes everything.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon:  '🔒',
                    title: 'Your garments never sit in a public shop',
                    body:  'From your door to our workshop and straight back. Not in a shop window. Not handled by a dozen different staff.',
                  },
                  {
                    icon:  '🛡️',
                    title: 'Fully insured while in our care',
                    body:  'All garments are fully insured from collection to return. Hand over your £1,500 suit with complete confidence.',
                  },
                  {
                    icon:  '🪡',
                    title: 'One tailor — start to finish',
                    body:  'The Single Needle Guarantee. One person handles your clothes throughout. Consistent quality, no handoffs.',
                  },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <h3 className="font-playfair text-[1.0625rem] font-medium text-charcoal mb-1">{title}</h3>
                      <p className="font-sans font-light text-muted text-[0.875rem] leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CraftGallery />
        <OffersSection />
        <HowItWorks />
        <TailorJourney />

        {/* Areas We Visit */}
        <section id="areas" className="border-t border-divider bg-parchment overflow-hidden">

          {/* Photo banner header */}
          <div className="relative h-56 lg:h-72">
            <Image
              src="https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=1600&q=75&auto=format&fit=crop"
              alt="Central London — Fine Tailors covers Mayfair, Chelsea, Knightsbridge and all premium postcodes"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(19,58,11,0.92) 0%, rgba(19,58,11,0.55) 60%, rgba(0,0,0,0.2) 100%)' }} />
            <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-24">
              <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-parchment/50 block mb-3">
                COVERAGE AREA
              </span>
              <h2 className="font-playfair text-[2rem] lg:text-[3rem] font-medium text-parchment mb-3 leading-tight">
                Areas We <em className="italic">Visit</em>
              </h2>
              <p className="font-sans font-light text-parchment/70 max-w-lg leading-relaxed hidden lg:block">
                Central London mobile tailor — homes, apartments and offices across the capital&apos;s most prestigious postcodes.
              </p>
            </div>
          </div>

          <div className="px-8 lg:px-24 py-10">
            <p className="font-sans font-light text-muted max-w-xl mb-10 leading-relaxed lg:hidden">
              Your central London mobile tailor — we visit homes, apartments and offices across the capital&apos;s most prestigious postcodes. Searching for a <Link href="/tailor-near-me" className="text-hunter underline">tailor near me</Link> or <Link href="/alterations-near-me-london" className="text-hunter underline">alterations near me</Link>? See every area we cover.
            </p>
            <p className="font-sans font-light text-muted max-w-xl mb-10 leading-relaxed hidden lg:block">
              As a dedicated <strong>mobile tailor London</strong> residents trust, we come to you for expert <strong>suit alterations</strong>, bespoke tailoring and clothing repairs. Searching for a <Link href="/tailor-near-me" className="text-hunter underline">tailor near me</Link> or <Link href="/alterations-near-me-london" className="text-hunter underline">alterations near me</Link>? See every area we cover.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {areas.map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="
                    border border-divider bg-white p-5 lg:p-6
                    hover:border-hunter hover:bg-hunter/5
                    transition-colors duration-200 group
                  "
                >
                  <h3 className="font-playfair text-[1rem] lg:text-lg font-medium text-charcoal group-hover:text-hunter mb-1 lg:mb-2">
                    {area.name}
                  </h3>
                  <p className="font-sans text-[0.75rem] lg:text-sm font-light text-muted leading-relaxed hidden sm:block">
                    {area.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <About />
        <Reviews reviews={reviews} />
        <FAQ />
        {/* <BookingForm />  ← Inquiry form, paused. The unified /get-started flow replaces it. */}
      </main>

      <Footer />
      <StickyBar />
    </>
  )
}
