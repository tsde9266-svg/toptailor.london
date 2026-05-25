import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Alterations Near Me London | We Come to Your Door | Fine Tailors',
  description: 'Searching for alterations near you in London? Fine Tailors is a mobile tailoring service covering all of Central London — we come to your door, collect your garments, and return them perfectly altered.',
  alternates: { canonical: 'https://www.finetailors.co.uk/alterations-near-me-london' },
  keywords: [
    'alterations near me London',
    'alterations near me',
    'clothing alterations near me London',
    'suit alterations near me London',
    'dress alterations near me London',
    'tailoring near me London',
    'tailor near me London',
    'alterations at home London',
    'mobile alterations London',
    'alterations collected from home London',
  ],
  openGraph: {
    title: 'Alterations Near Me London | We Come to Your Door | Fine Tailors',
    description: 'The best answer to "alterations near me" in London: a mobile tailoring service that comes to your door. All of Central London covered.',
    url: 'https://www.finetailors.co.uk/alterations-near-me-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Alterations near me London — Fine Tailors comes to your door' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Alterations Near Me London', item: 'https://www.finetailors.co.uk/alterations-near-me-london' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.finetailors.co.uk/#business',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  image: 'https://www.finetailors.co.uk/og-image.png',
  description: 'Fine Tailors is London\'s mobile tailoring and alterations service. We come to your Central London home or office, collect your garments, alter them, and return them within 5–7 working days.',
  areaServed: { '@type': 'City', name: 'London' },
  serviceType: 'Mobile Tailoring and Alterations',
}

const services = [
  { title: 'Suit Alterations', desc: 'Jacket, trouser and waistcoat — sleeve shortening, waist suppression, trouser hemming and tapering.', href: '/suit-alterations-london' },
  { title: 'Dress Alterations', desc: 'Hemming, take-in, strap adjustment, zip replacement and occasion wear alterations.', href: '/dress-alterations-london' },
  { title: 'Trouser Alterations', desc: 'Hemming, tapering, waist adjustment, seat reduction and turn-ups.', href: '/trouser-alterations-london' },
  { title: 'Jacket Alterations', desc: 'Sleeve shortening, body taking-in, lining repair and back seam work.', href: '/jacket-alterations-london' },
  { title: 'Coat Alterations', desc: 'Coat shortening, body resizing, sleeve work and lining replacement.', href: '/coat-alterations-london' },
  { title: 'Shirt Alterations', desc: 'Body taking-in, sleeve shortening, collar and cuff adjustment.', href: '/shirt-alterations-london' },
  { title: 'Jeans Alterations', desc: 'Hemming, tapering, original hem preservation, waist adjustment and repair.', href: '/jeans-alterations-london' },
  { title: 'Zip Repair', desc: 'Trouser, dress, jacket and coat zip replacement to an invisible finish.', href: '/zip-repair-london' },
  { title: 'Wedding Dress Alterations', desc: 'Specialist bridal alterations — hemming, bodice work, bustle fitting and more.', href: '/wedding-dress-alterations-london' },
  { title: 'Leather Jacket Alterations', desc: 'Specialist work on leather and suede garments quoted on inspection.', href: '/leather-jacket-alterations-london' },
  { title: 'Barbour Alterations', desc: 'Specialist Barbour jacket alterations and repairs.', href: '/barbour-alterations-london' },
  { title: 'Designer Alterations', desc: 'Moncler, Canada Goose and luxury brand garments handled with specialist care.', href: '/clothing-alterations-london' },
]

const areas = [
  { name: 'Mayfair', href: '/tailor-mayfair' },
  { name: 'Chelsea', href: '/tailor-chelsea' },
  { name: 'Knightsbridge', href: '/tailor-knightsbridge' },
  { name: 'Kensington', href: '/tailor-kensington' },
  { name: 'South Kensington', href: '/tailor-south-kensington' },
  { name: 'Belgravia', href: '/tailor-belgravia' },
  { name: 'Marylebone', href: '/tailor-marylebone' },
  { name: 'Westminster', href: '/tailor-westminster' },
  { name: 'Victoria', href: '/tailor-victoria' },
  { name: 'Pimlico', href: '/tailor-pimlico' },
  { name: 'Fitzrovia', href: '/tailor-fitzrovia' },
  { name: 'Soho', href: '/tailor-soho' },
  { name: 'Bloomsbury', href: '/tailor-bloomsbury' },
  { name: 'Covent Garden', href: '/tailor-covent-garden' },
  { name: 'Islington', href: '/tailor-islington' },
  { name: 'Notting Hill', href: '/tailor-notting-hill' },
  { name: 'Paddington', href: '/tailor-paddington' },
  { name: 'Fulham', href: '/tailor-fulham' },
  { name: 'Clerkenwell', href: '/tailor-clerkenwell' },
  { name: 'Shoreditch', href: '/tailor-shoreditch' },
  { name: 'Canary Wharf', href: '/tailor-canary-wharf' },
  { name: 'City of London', href: '/tailor-city-of-london' },
]

export default function AlterationsNearMeLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Alterations Near Me London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Mobile Service · All of Central London</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Alterations Near Me in London —{' '}
            <em className="font-playfair italic">We Come to Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            When you search for <strong>alterations near me</strong> in London, the nearest tailor is not always the best answer. Fine Tailors is a mobile alterations service covering all of Central London — we come to your door, collect your garments, alter them at our specialist workshop, and return them within 5–7 working days. No travel, no shop.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why &ldquo;Alterations Near Me&rdquo; Has a Better Answer in London</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Every London resident has searched for &ldquo;alterations near me&rdquo; and found a list of shops — some good, some less so. The problem is that &ldquo;nearest&rdquo; and &ldquo;best&rdquo; are rarely the same thing. The shop closest to your postcode may not be the right tailor for your garment.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors changes the question. We are a collection-based service — which means we come to you, wherever you are in Central London. Your Mayfair apartment, your Chelsea house, your Canary Wharf flat or your Marylebone office. We collect your garments, alter them at our specialist workshop, and return them pressed and perfect.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            That makes us the most convenient answer to &ldquo;alterations near me&rdquo; in London, regardless of which postcode you&apos;re in. All garments are fully insured while in our care. A written quote is approved before any work begins.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">All Alterations We Handle</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {services.map(({ title, desc, href }) => (
              <Link key={title} href={href} className="border border-divider p-5 hover:border-hunter transition-colors group">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2 group-hover:text-hunter transition-colors">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call. Tell us your address and what needs altering. We confirm a time that suits you — morning, afternoon or evening.'],
              ['We Collect From Your Door', 'We come to your Central London address at the agreed time. Doorstep collection — no entry required.'],
              ['Quote Sent for Approval', 'We assess your garments and send a written quote. No work begins until you approve it.'],
              ['Altered at Our Workshop', 'Every garment is altered at our specialist workshop to the highest standard.'],
              ['Returned Pressed and Perfect', 'Within 5–7 working days everything is back at your door, pressed and ready to wear.'],
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

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Areas We Cover</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We collect and return alterations across all of Central London. Click your area for full service details and local information:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
            {areas.map(({ name, href }) => (
              <Link key={name} href={href} className="border border-divider px-4 py-3 font-sans text-sm font-light text-charcoal hover:border-hunter hover:text-hunter transition-colors">
                {name}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Alterations Near You in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Read our full guide to the <Link href="/tailor-near-me" className="text-hunter underline">tailor near me service</Link> or see our <Link href="/how-it-works" className="text-hunter underline">how it works</Link> page for complete process details.
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
