import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in Victoria London | Fine Tailors',
  description: 'Searching for a tailor near you in Victoria? We collect from your SW1E door, alter suits, dresses and clothing to a perfect fit, and return pressed in 5–7 days.',
  keywords: ['tailor Victoria', 'tailor near me Victoria', 'tailor near me Victoria London', 'Victoria tailor near me', 'nearest tailor Victoria'],
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-victoria' },
  openGraph: {
    title: 'Tailor Near Me in Victoria London | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-victoria',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection-based tailoring service in Victoria, London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Victoria', item: 'https://www.finetailors.co.uk/tailor-victoria' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  areaServed: { '@type': 'Neighborhood', name: 'Victoria' },
  description: 'Collection-based tailoring service covering Victoria. Garments collected from SW1E and surrounding addresses, altered, and returned in 5–7 days.',
}

const areaFaqs = [
  {
    q: 'Do you cover Victoria Station area and hotel addresses in SW1E?',
    a: 'Yes. We cover all SW1E addresses — including the Victoria Station corridor, nearby hotels and the residential streets around Buckingham Palace Road. For hotel collections, provide the hotel name and room number at booking.',
  },
  {
    q: 'Can you collect from a government or corporate office in Victoria?',
    a: 'Yes. We collect from offices throughout Victoria — provide the building address and any reception or security instructions when booking. Collections from reception desks are standard practice.',
  },
]

export default function TailorVictoria() {
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
            <span>Tailor in Victoria</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Mobile Tailor in Victoria, London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors is a collection-based tailoring service covering all Victoria addresses — SW1E, the area around Victoria Station, nearby hotels, government offices and residential streets. We collect your garments from your door, alter them to a perfect fit, and return them pressed within 5–7 working days.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring Collections Across Victoria</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Victoria occupies a distinct position in Central London — adjacent to Westminster and Pimlico, close to Belgravia, and home to a mix of government workers, business travellers staying in the area&apos;s many hotels, and residents who value the area&apos;s quieter residential streets. It is a working postcode as much as a residential one, which means many clients need a tailoring service that works around business hours.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors&apos; collection model works precisely for this context. We collect from your SW1E address — hotel, office or apartment — at a time that suits your day. Your garments go directly from your door to our specialist workshop and come back to your exact address, pressed and ready. No shop visit required. Everything fully insured in transit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            One tailor handles your clothes throughout — the Single Needle Guarantee. The same person who collects is the same person who alters and returns.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services &amp; Prices — Collected From Victoria</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              ['Suit Alterations', 'Jacket back take-in from £18 · Sleeve shortening from £30 · Trouser hemming from £18'],
              ['Dress Alterations', 'Plain dress shortening from £25 · Dress take-in from £28 · Zip replacement from £28'],
              ['Trouser & Jean Alterations', 'Shortening from £18 · Tapering from £18 · Waist adjustment from £22'],
              ['Jacket & Coat Alterations', 'Sleeve shorten from £30 · Body take-in from £18 · Coat shorten from £45'],
              ['Wedding & Occasion Wear', 'Quoted on inspection — specialist handling for delicate and structured pieces'],
              ['Leather Jacket Alterations', 'Quoted on inspection — sleeves, body, zip, take-in by specialist'],
            ].map(([title, desc]) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your Victoria address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Victoria</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call us. We confirm a convenient time at your Victoria address — SW1E or surrounding streets.'],
              ['We Collect From Your Door', 'At your chosen time we collect your garments. Office, hotel and residential collections all accommodated.'],
              ['We Alter Every Piece', 'Your garments are worked on in our specialist workshop. We send a written quote before a single stitch is placed — you approve first.'],
              ['We Return, Pressed and Perfect', 'Within 5–7 working days your clothes are returned to your Victoria address, pressed and ready to wear.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Victoria Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Collected from my Victoria office on Tuesday morning, back Thursday. Three suits hemmed and taken in — all exactly right. Didn&apos;t need to leave the building.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Richard, Victoria</cite>
          </blockquote>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Victoria-Specific Questions</h2>
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Victoria</h2>
          <p className="font-sans font-light text-muted mb-4 max-w-lg leading-relaxed">
            We also cover nearby{' '}
            <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link>,{' '}
            <Link href="/tailor-pimlico" className="text-hunter underline">Pimlico</Link> and{' '}
            <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>.
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
