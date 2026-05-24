import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me London — The Definitive Answer | Fine Tailors',
  description: 'Searching for a tailor near you in London? The best answer is a mobile master tailor who visits your home. Fine Tailors covers all 22 Central London neighbourhoods — no travel, no shop.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-london' },
  keywords: [
    'tailor near me London',
    'tailor near me central London',
    'local tailor London',
    'tailor close to me London',
    'best tailor near me London',
    'nearest tailor London',
    'mobile tailor near me London',
    'suit alterations near me London',
    'clothing alterations near me London',
    'tailor Mayfair near me',
    'tailor Chelsea near me',
    'tailor Knightsbridge near me',
    'tailor Kensington near me',
    'tailor Westminster near me',
  ],
  openGraph: {
    title: 'Tailor Near Me London — The Definitive Answer',
    description: 'The best answer to "tailor near me" in London is a mobile master tailor who visits your home. Fine Tailors covers all of Central London.',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me London — mobile tailor home visit' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me London — The Definitive Answer',
  description: 'Searching for a tailor near you in London? The best answer is a mobile master tailor who visits your home. Fine Tailors covers all 22 Central London neighbourhoods.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-12',
  dateModified: '2026-05-24',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/tailor-near-me-london' },
  keywords: 'tailor near me London, mobile tailor London, local tailor London, nearest tailor London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me London', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-london' },
  ],
}

const areas = [
  { name: 'Mayfair', slug: 'tailor-mayfair', postcode: 'W1J/W1K' },
  { name: 'Chelsea', slug: 'tailor-chelsea', postcode: 'SW3/SW10' },
  { name: 'Knightsbridge', slug: 'tailor-knightsbridge', postcode: 'SW1X' },
  { name: 'Kensington', slug: 'tailor-kensington', postcode: 'W8' },
  { name: 'South Kensington', slug: 'tailor-south-kensington', postcode: 'SW7' },
  { name: 'Belgravia', slug: 'tailor-belgravia', postcode: 'SW1W' },
  { name: 'Westminster', slug: 'tailor-westminster', postcode: 'SW1P' },
  { name: 'Pimlico', slug: 'tailor-pimlico', postcode: 'SW1V' },
  { name: 'Victoria', slug: 'tailor-victoria', postcode: 'SW1E' },
  { name: 'Marylebone', slug: 'tailor-marylebone', postcode: 'W1U' },
  { name: 'Fitzrovia', slug: 'tailor-fitzrovia', postcode: 'W1T' },
  { name: 'Bloomsbury', slug: 'tailor-bloomsbury', postcode: 'WC1' },
  { name: 'Soho', slug: 'tailor-soho', postcode: 'W1D' },
  { name: 'Covent Garden', slug: 'tailor-covent-garden', postcode: 'WC2' },
  { name: 'Islington', slug: 'tailor-islington', postcode: 'N1' },
  { name: 'Clerkenwell', slug: 'tailor-clerkenwell', postcode: 'EC1' },
  { name: 'Shoreditch', slug: 'tailor-shoreditch', postcode: 'EC2A' },
  { name: 'City of London', slug: 'tailor-city-of-london', postcode: 'EC2–EC4' },
  { name: 'Canary Wharf', slug: 'tailor-canary-wharf', postcode: 'E14' },
  { name: 'Notting Hill', slug: 'tailor-notting-hill', postcode: 'W11' },
  { name: 'Paddington', slug: 'tailor-paddington', postcode: 'W2' },
  { name: 'Fulham', slug: 'tailor-fulham', postcode: 'SW6' },
]

export default function TailorNearMeLondon() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">12 May 2026 · Updated 24 May 2026 · 9 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Searching for a Tailor Near You in London? Here Is the Definitive Answer.
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Mobile tailor visiting a client's home in Central London" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Every day, thousands of Londoners search &ldquo;tailor near me&rdquo; — often with a specific garment in mind, often in a hurry. Google returns a map of shops ordered by distance. You pick the closest. You travel there. You wait. You leave your clothes. You travel back to collect. That is the traditional answer to &ldquo;tailor near me.&rdquo;
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            There is a far better answer: <strong>a mobile master tailor who comes to you</strong>. Fine Tailors visits your home or office anywhere in Central London. We assess your garments in person, collect them, alter them at our workshop, and return them pressed and perfect to your door. The nearest tailor in London is the one who comes to your address — and that is us.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Why the Nearest Shop Is Not Actually the Most Convenient</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The &ldquo;tailor near me&rdquo; search assumes that proximity equals convenience. In a small town, that is true. In London, it is not.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Consider what it actually takes to use the nearest tailor shop. You have to carry your garments there — suits, dresses, or coats are not easy to transport on the Tube. You have to visit twice: once to drop off, once to collect. You have to coordinate your schedule with the shop&apos;s hours. And all of this assumes the shop near you is actually good. Proximity and quality are not the same thing.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A <Link href="/mobile-tailor-london" className="text-hunter underline">mobile tailor in London</Link> eliminates every one of those friction points. The tailor comes to your home. Your garments never leave your hands until they are collected. You never travel. You never wait in a shop. You never carry a suit across London.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What &ldquo;Near Me&rdquo; Actually Means in Central London</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            London is a city of distinct, self-contained neighbourhoods separated by distances that are short on a map but significant in practice. A tailor in Soho is not convenient for someone in Kensington. A shop in Aldgate is not nearby for a Belgravia resident. The typical &ldquo;tailor near me&rdquo; result shows options that are &ldquo;nearby&rdquo; by map distance but require meaningful journeys in real life.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors resolves this by removing location from the equation entirely. We cover 22 Central London neighbourhoods — every area where our typical clients live and work. Whether you are in a Mayfair townhouse, a Chelsea mews, a Canary Wharf apartment, or a Shoreditch studio, we come to you. We are, functionally, the nearest tailor to every address we serve.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The &ldquo;Tailor Near Me&rdquo; Service: What You Get</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When you book Fine Tailors, here is exactly what happens:
          </p>
          <ol className="font-sans font-light text-muted leading-relaxed mb-8 space-y-4 pl-6 list-decimal">
            <li><strong className="font-medium text-charcoal">You book online or by phone.</strong> Choose a time — morning, afternoon, or evening. We come to your address in any of the 22 areas below.</li>
            <li><strong className="font-medium text-charcoal">Your master tailor arrives.</strong> Over 10 years of professional experience. We assess each garment on your body, in your home, and discuss exactly what you want changed. We mark all alterations and provide a written quote on the spot.</li>
            <li><strong className="font-medium text-charcoal">We collect your garments.</strong> Once you approve the quote, we take the clothes. You do not carry anything.</li>
            <li><strong className="font-medium text-charcoal">We alter everything at our workshop.</strong> One tailor handles your clothes throughout — the same person who assessed the fit is the person who performs the alteration.</li>
            <li><strong className="font-medium text-charcoal">We return everything to your door.</strong> Within 3–5 days for most work (7 days for complex alterations), your clothes are returned pressed and perfect. You pay only on return.</li>
          </ol>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Alterations Can a Tailor Near Me Do?</h2>
          <div className="border border-divider mb-8 overflow-hidden">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Service</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Starting From</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Trouser shortening / hemming', '£18'],
                  ['Trouser tapering (leg slim)', '£18'],
                  ['Trouser waist adjustment', '£22'],
                  ['Jacket sleeve shortening', '£30'],
                  ['Jacket waist suppression', '£18'],
                  ['Dress shortening', '£25'],
                  ['Dress taking in', '£28'],
                  ['Zip replacement (dress / trousers)', '£20'],
                  ['Shirt body slim', '£18'],
                  ['Coat shortening', '£45'],
                  ['Leather jacket alterations', 'Quote on inspection'],
                  ['Wedding dress alterations', 'Quote on inspection'],
                ].map(([svc, price], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{svc}</td>
                    <td className="px-5 py-3 font-light text-muted">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">These are starting prices. An exact quote is confirmed in person — no surprises.</p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Find a Tailor Near Me — All 22 London Areas We Cover</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            Fine Tailors covers every area below. Click your neighbourhood for a dedicated page with local details and what to expect.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-10">
            {areas.map(a => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="border border-divider px-4 py-3 hover:border-hunter hover:bg-hunter/5 transition-colors group"
              >
                <div className="font-playfair text-[0.875rem] font-medium text-charcoal group-hover:text-hunter leading-snug">Tailor near me — {a.name}</div>
                <div className="font-sans text-[0.7rem] text-muted mt-0.5">{a.postcode}</div>
              </Link>
            ))}
          </div>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Can a Tailor Near Me Do Same-Day Alterations?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            For simple, qualifying alterations — trouser hemming, zip replacement, basic waist take-in — <Link href="/same-day-alterations-london" className="text-hunter underline">same-day alterations</Link> are possible when booked early in the day. More complex work (jacket alterations, shoulder adjustments, wedding dress work) requires 5–7 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            If you have a specific deadline — a wedding, a job interview, an event — tell us when booking and we will confirm what is achievable and by when.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Is a Mobile Tailor Near Me More Expensive?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Not necessarily — and often no. Fine Tailors charges professional rates for expert work. The home visit and return delivery are included in the price. There is no separate call-out charge.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            When you account for the true cost of using a traditional tailor near you — two taxi or Tube journeys, time out of your day, the risk of a poor result because the shop did not do a proper fitting — a mobile tailor in London is the same or better value for most clients. For clients with multiple garments, valuable pieces, or busy schedules, it is significantly better.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Next Time You Search &ldquo;Tailor Near Me&rdquo;</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            Skip the map of shops. <Link href="/tailor-near-me" className="text-hunter underline">Book a mobile tailor</Link> who comes to your address in Central London. Fine Tailors is the nearest tailor to wherever you are — because we come to you.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Book your tailor near you today</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> or <a href="tel:+447438145169" className="text-hunter underline">call +44 7438 145169</a>. We cover all of Central London.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
