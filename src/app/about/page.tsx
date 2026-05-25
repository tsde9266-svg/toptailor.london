import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'About Fine Tailors — London\'s Collection-Based Tailoring Service',
  description: 'Fine Tailors collects your garments from your Central London door, alters them to a perfect fit, and returns them pressed and perfect in 5–7 days. No shop visit. No stranger in your home.',
  alternates: { canonical: 'https://www.finetailors.co.uk/about' },
  openGraph: {
    title: 'About Fine Tailors — London\'s Collection-Based Tailoring Service',
    url: 'https://www.finetailors.co.uk/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors — Collection-based tailoring service in Central London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.finetailors.co.uk/about' },
  ],
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.finetailors.co.uk/about#page',
  url: 'https://www.finetailors.co.uk/about',
  name: 'About Fine Tailors',
  description: 'Fine Tailors is a collection-based tailoring service operating across Central London since 2014.',
  isPartOf: { '@id': 'https://www.finetailors.co.uk/#website' },
  about: { '@id': 'https://www.finetailors.co.uk/#business' },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.finetailors.co.uk/about#tailor',
  name: 'Fine Tailors Master Tailor',
  jobTitle: 'Master Tailor',
  description: 'Professional master tailor with over 10 years of experience serving Central London clients. Specialising in suit alterations, dress alterations, bespoke tailoring and collection-based garment care.',
  knowsAbout: ['Suit Alterations', 'Dress Alterations', 'Bespoke Tailoring', 'Garment Construction', 'Fabric Types', 'Wedding Dress Alterations', 'Leather Garment Work'],
  worksFor: { '@id': 'https://www.finetailors.co.uk/#business' },
  url: 'https://www.finetailors.co.uk/about',
}

const steps = [
  { num: '01', title: 'Book', body: 'Choose your services and book a collection slot online or by phone. We confirm a time at your address.' },
  { num: '02', title: 'We Collect', body: 'At your chosen time, we collect your garments from your door. No need to travel anywhere.' },
  { num: '03', title: 'We Alter', body: 'Every piece is worked on in our workshop with precision and care. We send a confirmed quote before a single stitch is placed.' },
  { num: '04', title: 'We Return', body: 'Within 5–7 working days, your garments are returned to your door, pressed and perfected.' },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        {/* ── Hero header ──────────────────────────────────── */}
        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>About</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            About Fine Tailors —{' '}
            <em className="font-playfair italic">London&apos;s Collection-Based Tailoring Service</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            We collect your garments from your Central London door, alter them to a perfect fit, and return them pressed and perfect in 5–7 days. No shop visit. No stranger in your home.
          </p>
        </div>

        {/* ── What makes us different ───────────────────────── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">A Different Kind of Tailoring Service</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most tailoring services ask you to travel to them. You carry your garments across the city, wait in a shop, leave them with someone you&apos;ve never met, and come back days later. For busy London professionals, that process is an inconvenience at best and a genuine barrier at worst.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors works differently. We are a <strong>collection-based tailoring service</strong> — your garments are collected directly from your door, altered at our specialist workshop, and returned to you pressed and perfect. The tailor never enters your home. You never visit a shop. Everything happens at your door and on your schedule.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            This model was built around the reality of London life: limited time, valuable wardrobes, and a preference for discretion. Whether you live in a Mayfair apartment, a Knightsbridge townhouse, or an office near Canary Wharf, the service comes to you — not the other way around.
          </p>
        </div>

        {/* ── Why collection-based is better for luxury garments ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Collection is Safer for Valuable Garments</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When you leave a garment in a high street shop, it sits in a back room with dozens of other pieces, handled by multiple members of staff, sometimes for weeks. For an everyday pair of trousers this may be fine. For a bespoke suit, a designer dress, a luxury leather jacket, or a wedding gown, it is an unnecessary risk.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            With Fine Tailors, your garments travel a single route: from your door to our workshop and back. They are handled by one tailor from collection to return. There is no shop floor, no waiting queue, no risk of your piece being mixed up or lost among other orders.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We work regularly with luxury and designer pieces — suits from Savile Row, leather jackets from premium brands, occasion wear from independent London designers — and the collection model is a core reason clients trust us with garments they genuinely care about.
          </p>
        </div>

        {/* ── What we specialise in ─────────────────────────── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">What We Specialise In</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket, trouser and waistcoat alterations for both off-the-peg and bespoke suits.'],
              ['Dress Alterations', 'From plain day dresses to layered evening gowns — shortening, taking in, zip work.'],
              ['Trouser & Jean Alterations', 'Hemming, tapering, waist adjustments, pocket work — from £18.'],
              ['Jacket & Coat Alterations', 'Sleeve shortening, body tapering, relining, coat shortening — from £30.'],
              ['Wedding Dress Alterations', 'Specialist handling for bridal and occasion wear — quoted on inspection.'],
              ['Leather Jacket Alterations', 'Expert work on leather garments — sleeves, body, zip replacement — quoted on inspection.'],
              ['Shirt Alterations', 'Sleeve shortening, body tapering, collar adjustments.'],
              ['Bespoke & Made-to-Measure', 'Consultations for clients requiring garments built to their exact specification.'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Experience & credentials ──────────────────────── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Experience You Can Trust</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors has been operating across Central London since 2014 — more than ten years of collections, alterations and returns across Mayfair, Chelsea, Knightsbridge, Kensington, Belgravia, the City and beyond.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our clients include finance professionals who rely on well-fitted suits as daily workwear, creative industry workers in Soho and Fitzrovia who value a precise cut, hotel guests in Mayfair requiring discreet same-visit collection, and residents across Central London who simply want expert tailoring without the inconvenience of a shop visit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Every garment is handled by a single tailor from collection to return. This is the <strong>Single Needle Guarantee</strong> — one person responsible for your clothes from the moment they leave your door to the moment they come back, ensuring consistent quality and care that a multi-staff shop simply cannot replicate.
          </p>
        </div>

        {/* ── How it works ─────────────────────────────────── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-10">How It Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-5xl">
            {steps.map((step) => (
              <div key={step.num} className="border border-divider p-6 relative">
                <span className="font-playfair text-[3rem] leading-none text-hunter/15 select-none absolute top-4 right-6">
                  {step.num}
                </span>
                <h3 className="font-playfair text-lg font-medium text-charcoal mb-3">{step.title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Areas served ─────────────────────────────────── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Where We Operate</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            We cover all Central London postcodes — W1, SW1, SW3, SW7, W8, WC1, WC2, EC1, EC2, E14, N1, W11, W2 and surrounding areas. If you&apos;re unsure whether we cover your address, call us.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Mayfair', href: '/tailor-mayfair' },
              { name: 'Knightsbridge', href: '/tailor-knightsbridge' },
              { name: 'Chelsea', href: '/tailor-chelsea' },
              { name: 'Kensington', href: '/tailor-kensington' },
              { name: 'Belgravia', href: '/tailor-belgravia' },
              { name: 'Westminster', href: '/tailor-westminster' },
              { name: 'Marylebone', href: '/tailor-marylebone' },
              { name: 'Soho', href: '/tailor-soho' },
              { name: 'City of London', href: '/tailor-city-of-london' },
              { name: 'Islington', href: '/tailor-islington' },
              { name: 'Notting Hill', href: '/tailor-notting-hill' },
            ].map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="font-sans text-sm font-light text-hunter underline hover:text-charcoal transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Ready to Get Started?</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            Book a collection slot online or call us directly. We cover all Central London postcodes and operate seven days a week.
          </p>
          <div className="flex gap-6 flex-wrap items-center">
            <Link
              href="/get-started"
              className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors"
            >
              Book a Collection
            </Link>
            <a
              href="tel:+447438145169"
              className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors"
            >
              +44 7438 145169
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
