import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Westminster London | Collection Service | Fine Tailors',
  description: 'Collection-based tailor in Westminster. We collect from your SW1A/SW1P door, alter suits and clothing, and return pressed and perfect in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-westminster' },
  openGraph: {
    title: 'Tailor in Westminster London | Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-westminster',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Westminster, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Westminster', item: 'https://www.finetailors.co.uk/tailor-westminster' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Westminster' },
  description: 'Collection-based tailoring service covering Westminster. Garments collected from SW1A, SW1E, SW1H, SW1P, SW1V addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you collect from government and civil service areas near Whitehall and Parliament Square?',
    a: 'Yes. We cover all Westminster postcodes including SW1A and SW1P. Civil servants, government workers and professionals in the Whitehall and Victoria Street area are among our regular Westminster clients.',
  },
  {
    q: 'Can you collect from hotels in Westminster such as The Goring or Conrad London St James?',
    a: 'Yes. We collect from hotel rooms across Westminster. Just let us know the hotel name and room number, and any access instructions, when booking and we will coordinate the collection accordingly.',
  },
]

export default function TailorWestminster() {
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
            <span>Tailor in Westminster</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Westminster, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects garments from Westminster addresses — Victoria Street, Whitehall, Pimlico, St James&apos;s and beyond — and returns them altered to a perfect fit within 5–7 days. For civil servants, government professionals, hotel guests and Westminster residents.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Westminster</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Westminster is home to a diverse and demanding population: civil servants who wear suits five days a week and need them to fit correctly, international business visitors staying in the area&apos;s fine hotels, residents of the quiet streets between Victoria and Pimlico, and professionals working in the government cluster around Whitehall and Parliament Square.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our <strong>Westminster tailoring collection service</strong> covers all SW1 postcodes — SW1A, SW1E, SW1H, SW1P, SW1V and SW1W. We collect from your door at a time that works around your schedule, alter every garment in our specialist workshop, and return everything pressed and perfect within 5–7 working days. Hotels, offices, apartments and private residences all accommodated.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Westminster&apos;s proximity to Belgravia and Mayfair means we operate across the entire SW1/W1 corridor with equal regularity.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Westminster</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for formal and structured pieces'],
              ['Clothing Repairs', 'Zip replacements, rehem from £8, patch repairs from £18'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Westminster address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Westminster</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a time at your Westminster SW1 address — home, office, or hotel.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Hotel collections and office collections accommodated.'],
              ['We Alter Every Piece', 'Your garments are handled in our specialist workshop. Written quote approved before work begins.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Westminster address.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Westminster Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;I work near Parliament Square and had two suits collected from my Victoria flat. Back within a week, both fitting perfectly. Simple and professional.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— David, Westminster</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Westminster-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Westminster</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>,{' '}
            <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> and{' '}
            <Link href="/tailor-pimlico" className="text-hunter underline">Pimlico</Link>.
          </p>
          <p className="font-sans text-sm font-light text-muted mb-6 max-w-lg leading-relaxed">
            Services: <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link> · <Link href="/dress-alterations-london" className="text-hunter underline">dress alterations</Link> · <Link href="/trouser-alterations-london" className="text-hunter underline">trouser alterations</Link>.
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
