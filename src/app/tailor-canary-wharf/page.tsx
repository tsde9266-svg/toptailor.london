import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Canary Wharf London | Fine Tailors',
  description: 'Searching for a tailor near you in Canary Wharf? We collect from your E14 door, alter suits for finance professionals, and return pressed and perfect in 5–7 days.',
  keywords: ['tailor near me Canary Wharf', 'tailor near me Canary Wharf London', 'Canary Wharf tailor near me', 'nearest tailor Canary Wharf', 'tailor Canary Wharf'],
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-canary-wharf' },
  openGraph: {
    title: 'Tailor Near Me in Canary Wharf London | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-canary-wharf',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Canary Wharf, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Canary Wharf', item: 'https://www.finetailors.co.uk/tailor-canary-wharf' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Canary Wharf', containedInPlace: { '@type': 'City', name: 'London' } },
  description: 'Collection-based tailoring service covering Canary Wharf. Garments collected from E14 addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Can you collect from a Canary Wharf apartment or office building in E14?',
    a: 'Yes. We collect from residential apartments and office buildings throughout the Canary Wharf estate — Canada Square, Bank Street, Hertsmere Road and all E14 addresses. Provide building access instructions when booking and we coordinate accordingly.',
  },
  {
    q: 'How fast can you turn around a suit for a finance professional in Canary Wharf?',
    a: 'Standard turnaround is 5–7 working days. If you have a specific deadline — a client meeting, a conference, a formal event — call us directly on +44 7438 145169 and we will tell you what is achievable within your timeline.',
  },
]

export default function TailorCanaryWharf() {
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
            <span>Tailor in Canary Wharf</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Canary Wharf, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Canary Wharf addresses — Canada Square, Bank Street, Hertsmere Road and beyond — and returns them altered to a perfect fit within 5–7 days. For finance professionals who wear suits every day and cannot afford a poor fit.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Canary Wharf</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Canary Wharf is home to the European headquarters of Bloomberg, HSBC, Deutsche Bank, Barclays and dozens of other major financial institutions. The professionals who work here — and many who live in the surrounding E14 apartments — wear suits as daily professional uniform, not special occasion dress. A suit that fits correctly is a career requirement, not a luxury.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Canary Wharf tailoring collection service</strong> is built for this client. We collect from your E14 apartment or office at a time you choose, alter every piece in our specialist workshop, and return everything pressed and perfect within 5–7 working days. No leaving the estate to find a tailor. No waiting in a shop queue after a twelve-hour day.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Suits, shirts, trousers, jackets — all handled with equal care. If you have a regular wardrobe maintenance requirement, call us to discuss ongoing collection arrangements.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Canary Wharf</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Shirt Alterations', 'Sleeve shortening, body tapering, collar adjustments — prices on request'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip from £28'],
              ['Clothing Repairs', 'Zip replacements, rehem from £8, patch repairs from £18'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Canary Wharf address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Canary Wharf</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Canary Wharf E14 home or office.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Building access and concierge collections fully accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop. Written quote sent before work begins — you approve first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Canary Wharf address, ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Canary Wharf Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Canada Square apartment on Monday, back by Friday. Three suits, all perfect. This is exactly the service Canary Wharf has been missing.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Alex, Canary Wharf</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Canary Wharf-Specific Questions</h2>
          <dl className="space-y-6 max-w-3xl">
            {areaFaqs.map((item, i) => (
              <div key={i} className="border-b border-divider pb-6 last:border-0">
                <dt className="font-playfair font-medium text-charcoal mb-2">{item.q}</dt>
                <dd className="font-sans font-light text-muted leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Canary Wharf</h2>
          <p className="font-sans font-light text-muted mb-4 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>,{' '}
            <Link href="/tailor-shoreditch" className="text-hunter underline">Shoreditch</Link> and{' '}
            <Link href="/tailor-clerkenwell" className="text-hunter underline">Clerkenwell</Link>.
          </p>
          <p className="font-sans text-sm font-light text-muted mb-6 max-w-lg leading-relaxed">
            Looking for a <Link href="/tailor-near-me" className="text-hunter underline">tailor near me</Link> across all of London? See every area we cover.
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
