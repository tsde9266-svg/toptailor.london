import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor Near Me in London | Fine Tailors — We Come to You',
  description: 'Looking for a tailor near you in London? Fine Tailors is a mobile master tailor covering all of Central London — we come to your door. No travel, no shop, no strangers in your home.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-near-me' },
  keywords: [
    'tailor near me',
    'tailor near me London',
    'mobile tailor near me London',
    'tailor near me central London',
    'tailor near me Mayfair',
    'tailor near me Chelsea',
    'tailor near me Knightsbridge',
    'tailor near me Kensington',
    'tailor near me Westminster',
    'tailor near me Belgravia',
    'local tailor London',
    'tailor close to me London',
    'nearest tailor London',
    'tailor home visit near me London',
    'suit alterations near me London',
  ],
  openGraph: {
    title: 'Tailor Near Me in London | Fine Tailors — We Come to You',
    description: 'The best answer to "tailor near me" in London: a mobile master tailor who visits your home across all Central London postcodes.',
    url: 'https://www.finetailors.co.uk/tailor-near-me',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me London — Fine Tailors comes to your door' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor Near Me', item: 'https://www.finetailors.co.uk/tailor-near-me' },
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
  description: 'Fine Tailors is London\'s mobile tailoring service. We come to your home across Central London for suit alterations, dress alterations, and all clothing alterations. No travel required — we collect, alter, and return to your door.',
  areaServed: [
    { '@type': 'Neighborhood', name: 'Mayfair', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Chelsea', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Knightsbridge', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Kensington', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'South Kensington', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Belgravia', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Westminster', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Pimlico', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Victoria', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Marylebone', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Fitzrovia', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Bloomsbury', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Soho', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Covent Garden', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Islington', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Clerkenwell', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Shoreditch', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'City of London', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Canary Wharf', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Notting Hill', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Paddington', containedInPlace: { '@type': 'City', name: 'London' } },
    { '@type': 'Neighborhood', name: 'Fulham', containedInPlace: { '@type': 'City', name: 'London' } },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tailoring Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Suit Alterations Near Me London', url: 'https://www.finetailors.co.uk/suit-alterations-london' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dress Alterations Near Me London', url: 'https://www.finetailors.co.uk/dress-alterations-london' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trouser Alterations Near Me London', url: 'https://www.finetailors.co.uk/trouser-alterations-london' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Tailor London', url: 'https://www.finetailors.co.uk/mobile-tailor-london' } },
    ],
  },
}

const nearMeFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there a tailor near me in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Fine Tailors is a mobile tailoring service that covers all of Central London. We come to your home or office, so wherever you are in London, we are the tailor nearest to you. We cover Mayfair, Chelsea, Knightsbridge, Kensington, Belgravia, Westminster, Marylebone, Soho, Covent Garden, Islington, Clerkenwell, Shoreditch, the City of London, Canary Wharf, Notting Hill, Paddington, Fulham, and all surrounding postcodes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a mobile tailor near me work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You book a visit online or by phone. A master tailor comes to your home at the agreed time, assesses your garments on your body, and pins all required alterations. The garments are then collected, altered at our workshop, and returned to your door — typically within 3–5 days. No travel, no shop, no waiting rooms.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a tailor near me cost in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prices start from £18 for trouser shortening, £18 for trouser tapering, £25 for dress shortening, and £30 for jacket sleeve shortening. The home visit is included in the price — there is no separate call-out charge. An exact quote is provided after assessing the garments in person.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a tailor near me do same-day alterations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For simple alterations — trouser hemming, zip replacement, basic waist adjustment — same-day or next-day service is available when booked early. More complex work such as jacket alterations or shoulder adjustment requires 5–7 days. Mention your deadline when booking and we will confirm what is achievable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which London postcodes does a tailor near me cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fine Tailors covers: W1 (Mayfair, Marylebone, Soho, Fitzrovia), W2 (Paddington), W8 (Kensington), W11 (Notting Hill), SW1 (Westminster, Belgravia, Pimlico, Victoria), SW1X (Knightsbridge), SW3/SW10 (Chelsea), SW6 (Fulham), SW7 (South Kensington), WC1 (Bloomsbury), WC2 (Covent Garden), EC1 (Clerkenwell, Islington), EC2 (Shoreditch, City of London), E14 (Canary Wharf). Contact us for postcodes not listed — we cover a wide area.',
      },
    },
  ],
}

const areas = [
  { name: 'Mayfair', slug: 'tailor-mayfair', postcode: 'W1J/W1K' },
  { name: 'Chelsea', slug: 'tailor-chelsea', postcode: 'SW3/SW10' },
  { name: 'Knightsbridge', slug: 'tailor-knightsbridge', postcode: 'SW1X' },
  { name: 'Kensington', slug: 'tailor-kensington', postcode: 'W8' },
  { name: 'South Kensington', slug: 'tailor-south-kensington', postcode: 'SW7' },
  { name: 'Belgravia', slug: 'tailor-belgravia', postcode: 'SW1W/SW1X' },
  { name: 'Westminster', slug: 'tailor-westminster', postcode: 'SW1P' },
  { name: 'Pimlico', slug: 'tailor-pimlico', postcode: 'SW1V' },
  { name: 'Victoria', slug: 'tailor-victoria', postcode: 'SW1E' },
  { name: 'Marylebone', slug: 'tailor-marylebone', postcode: 'W1U/W1G' },
  { name: 'Fitzrovia', slug: 'tailor-fitzrovia', postcode: 'W1T/W1W' },
  { name: 'Bloomsbury', slug: 'tailor-bloomsbury', postcode: 'WC1' },
  { name: 'Soho', slug: 'tailor-soho', postcode: 'W1D/W1F' },
  { name: 'Covent Garden', slug: 'tailor-covent-garden', postcode: 'WC2' },
  { name: 'Islington', slug: 'tailor-islington', postcode: 'N1' },
  { name: 'Clerkenwell', slug: 'tailor-clerkenwell', postcode: 'EC1' },
  { name: 'Shoreditch', slug: 'tailor-shoreditch', postcode: 'EC2A' },
  { name: 'City of London', slug: 'tailor-city-of-london', postcode: 'EC2/EC3/EC4' },
  { name: 'Canary Wharf', slug: 'tailor-canary-wharf', postcode: 'E14' },
  { name: 'Notting Hill', slug: 'tailor-notting-hill', postcode: 'W11' },
  { name: 'Paddington', slug: 'tailor-paddington', postcode: 'W2' },
  { name: 'Fulham', slug: 'tailor-fulham', postcode: 'SW6' },
]

export default function TailorNearMe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nearMeFaq) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        {/* Hero */}
        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6 max-w-3xl">
            Tailor Near Me in London —{' '}
            <em className="font-playfair italic">We Come to Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed mb-8">
            When you search &ldquo;tailor near me&rdquo; in London, you want someone convenient, professional, and accessible. Fine Tailors is a mobile master tailor who visits your home across all 22 Central London neighbourhoods. We come to you — no travel, no carrying garments across the city, no waiting rooms.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Visit Near Me
            </Link>
            <a href="tel:+447438145169" className="px-10 py-4 border border-charcoal font-sans text-xs font-medium tracking-[0.15em] uppercase hover:border-hunter hover:text-hunter transition-colors">
              +44 7438 145169
            </a>
          </div>
        </div>

        {/* Why mobile beats the nearest shop */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why &ldquo;Tailor Near Me&rdquo; Means Something Different Now</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The traditional answer to &ldquo;tailor near me&rdquo; is a list of shops ordered by distance. You pick the closest, travel there, wait, leave your clothes, and travel back to collect them. That is two trips, time out of your day, and garments left in a public shop for days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A mobile tailor changes the equation entirely. When Fine Tailors visits your home, we are — for all practical purposes — the nearest tailor in London to your address. You open your door, we assess your garments on your body in your own space, we collect them, and we return them altered and pressed. You never leave home.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            For busy professionals in Mayfair, families in Chelsea, or City workers who cannot afford two round-trips to a tailor shop, this is not a convenience — it is the only sensible option.
          </p>
        </div>

        {/* How it works */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How Our &ldquo;Tailor Near Me&rdquo; Service Works</h2>
          <ol className="space-y-8">
            {[
              {
                n: '1',
                title: 'Book a Visit at Your Address',
                body: 'Book online or by phone. Choose a time that suits you — morning, afternoon, or evening. We confirm a slot at your specific London address, whether that is a W1 apartment, an SW3 townhouse, or an E14 office.',
              },
              {
                n: '2',
                title: 'Your Master Tailor Arrives',
                body: 'A master tailor with over 10 years of professional experience comes to your door. You try on each garment. We assess the fit, mark every required alteration, and advise honestly on what can and cannot be done. We provide a written quote before any work begins.',
              },
              {
                n: '3',
                title: 'We Collect and Alter',
                body: 'Once you approve the quote, we collect the garments and take them to our specialist workshop. Every piece is worked on with precision — one tailor handles your clothes from collection to return.',
              },
              {
                n: '4',
                title: 'We Return to Your Door',
                body: 'Within 3–5 days for most alterations (7 days for complex work), your clothes are returned to your exact address — pressed, perfect, and ready to wear. You pay only on return.',
              },
            ].map(({ n, title, body }) => (
              <li key={n} className="flex gap-6">
                <span className="font-playfair text-3xl text-hunter/25 shrink-0 w-8 leading-none pt-1">{n}</span>
                <div>
                  <h3 className="font-playfair font-medium text-charcoal text-lg mb-2">{title}</h3>
                  <p className="font-sans font-light text-muted leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Services */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">What Your Nearest Tailor Can Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mb-8">
            {[
              { title: 'Suit Alterations', desc: 'Jacket waist, sleeves, back seam, trouser hem, tapering. From £18.', href: '/suit-alterations-london' },
              { title: 'Dress Alterations', desc: 'Shortening, taking in, straps, zip replacement. From £25.', href: '/dress-alterations-london' },
              { title: 'Trouser Alterations', desc: 'Hem, taper, waist, pockets, rehem. From £18.', href: '/trouser-alterations-london' },
              { title: 'Jacket & Coat Alterations', desc: 'Sleeves, body, lining, shorten. From £18.', href: '/jacket-alterations-london' },
              { title: 'Shirt Alterations', desc: 'Body slim, sleeve shorten, length, cuffs. From £15.', href: '/shirt-alterations-london' },
              { title: 'Wedding Dress Alterations', desc: 'Specialist handling, quoted on inspection.', href: '/wedding-dress-alterations-london' },
              { title: 'Leather Jacket Alterations', desc: 'Specialist work — sleeves, body, zip. Quoted on inspection.', href: '/leather-jacket-alterations-london' },
              { title: 'Same-Day Alterations', desc: 'Urgent work available for qualifying alterations.', href: '/same-day-alterations-london' },
              { title: 'Bespoke Tailoring', desc: 'Made-to-measure garments designed around you.', href: '/bespoke-tailoring-london' },
            ].map(s => (
              <Link key={s.title} href={s.href} className="border border-divider p-5 hover:border-hunter hover:bg-hunter/5 transition-colors group">
                <h3 className="font-playfair font-medium text-charcoal group-hover:text-hunter mb-2">{s.title}</h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Areas covered */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Find Your Nearest Tailor by London Neighbourhood</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8 max-w-2xl">
            Fine Tailors covers 22 Central London neighbourhoods. Click your area to see the dedicated service page for your postcode.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl">
            {areas.map(a => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="border border-divider px-4 py-3 hover:border-hunter hover:bg-hunter/5 transition-colors group"
              >
                <div className="font-playfair text-[0.9375rem] font-medium text-charcoal group-hover:text-hunter leading-snug">{a.name}</div>
                <div className="font-sans text-[0.75rem] text-muted mt-0.5">{a.postcode}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Postcode list */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">London Postcodes We Cover</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            If your postcode starts with any of the following, Fine Tailors comes to you:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl">
            {[
              ['W1', 'Mayfair · Marylebone · Soho · Fitzrovia'],
              ['W2', 'Paddington · Bayswater'],
              ['W8', 'Kensington'],
              ['W11', 'Notting Hill · Ladbroke Grove'],
              ['SW1', 'Westminster · Victoria · Pimlico'],
              ['SW1X', 'Knightsbridge · Belgravia'],
              ['SW3', 'Chelsea'],
              ['SW6', 'Fulham'],
              ['SW7', 'South Kensington'],
              ['SW10', 'Chelsea · West Brompton'],
              ['WC1', 'Bloomsbury · Holborn'],
              ['WC2', 'Covent Garden · Strand'],
              ['EC1', 'Clerkenwell · Barbican'],
              ['EC2', 'City · Shoreditch'],
              ['EC3', 'City of London'],
              ['EC4', 'City of London'],
              ['N1', 'Islington · Angel'],
              ['E14', 'Canary Wharf · Docklands'],
            ].map(([pc, area]) => (
              <div key={pc} className="border border-divider px-4 py-3">
                <div className="font-mono text-[0.875rem] font-medium text-hunter">{pc}</div>
                <div className="font-sans text-[0.75rem] text-muted mt-0.5 leading-tight">{area}</div>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">
            Not listed? <a href="tel:+447438145169" className="text-hunter underline">Call us</a> — we cover a wide area and may well come to you.
          </p>
        </div>

        {/* Comparison */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Mobile Tailor vs Nearest Shop</h2>
          <div className="border border-divider overflow-hidden max-w-2xl">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal"></th>
                  <th className="text-left px-5 py-3 font-medium text-hunter">Fine Tailors</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Shop Near Me</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['You travel', 'Never', 'Twice'],
                  ['Fitting quality', 'On your body at home', 'Shop fitting room'],
                  ['Garments left in public', 'No — workshop only', 'Yes'],
                  ['One tailor throughout', 'Yes', 'Often not'],
                  ['Return to your door', 'Yes', 'You collect'],
                  ['Available evenings', 'Yes', 'Rarely'],
                  ['Minimum order', '£20', 'Varies'],
                ].map(([feature, ft, shop], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{feature}</td>
                    <td className="px-5 py-3 font-medium text-hunter">{ft}</td>
                    <td className="px-5 py-3 font-light text-muted">{shop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Questions About Finding a Tailor Near You in London</h2>
          <dl className="space-y-0 divide-y divide-divider max-w-3xl">
            {nearMeFaq.mainEntity.map((item, i) => (
              <div key={i} className="py-6">
                <dt className="font-playfair font-medium text-charcoal mb-3">{item.name}</dt>
                <dd className="font-sans font-light text-muted leading-relaxed">{item.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <FAQ />

        {/* CTA */}
        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Your Nearest Tailor in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Fine Tailors comes to your address anywhere in Central London. Book a visit today — we assess your garments in person, provide an exact quote, and return everything altered and pressed to your door.
          </p>
          <p className="font-sans text-sm font-light text-muted mb-8 max-w-lg leading-relaxed">
            Also see: <Link href="/mobile-tailor-london" className="text-hunter underline">mobile tailor London</Link> · <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations near me</Link> · <Link href="/clothing-alterations-london" className="text-hunter underline">clothing alterations near me</Link>
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Visit
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
