import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Collection Tailor vs High Street Shop London — Which Is Better? | Fine Tailors',
  description: 'Why a collection-based tailor is better than a high street shop for most London professionals — and when the shop is the right answer.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/collection-tailor-vs-shop-london' },
  keywords: ['collection tailor london', 'mobile tailor vs shop london', 'best way to get clothes altered london', 'tailor that collects london'],
  openGraph: {
    title: 'Collection Tailor vs High Street Shop — Which Is Better for London?',
    description: 'An honest comparison of collection-based tailoring vs a high-street alteration shop in London. When each makes sense.',
    url: 'https://www.finetailors.co.uk/blog/collection-tailor-vs-shop-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Collection tailor vs shop London guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Collection Tailor vs High Street Shop London — Which Is Better?',
  description: 'An honest comparison of collection tailoring vs a high-street alteration shop in London. The real differences, who wins on what, and when each makes sense.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/collection-tailor-vs-shop-london' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Collection Tailor vs Shop London', item: 'https://www.finetailors.co.uk/blog/collection-tailor-vs-shop-london' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is a collection tailor more expensive than a high street shop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. A quality collection tailor charges comparable prices to a quality high-street tailor. Fast-alteration shops may be cheaper for simple work, but the result reflects it. Collection services like Fine Tailors include collection and return in the price — there is no additional delivery fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a reliable collection tailor in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Look for reviews that mention specific alterations and specific results — not just general praise. A reliable collection tailor will give a written quote before work begins, have clear communication about what is achievable, and provide a return timeline they actually keep.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a collection tailor do same-day alterations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some collection tailors offer express service for simple alterations. Fine Tailors offers express service for urgent situations — call to confirm availability. Standard turnaround is 5–7 working days.',
      },
    },
  ],
}

export default function CollectionTailorVsShopLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Collection Tailor vs Shop London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">21 May 2026 · 7 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Collection Tailor vs High Street Shop in London — Which Is Better?
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            London has no shortage of tailoring options — alteration shops on every high street, specialist tailors in Mayfair and Marylebone, and now collection services that come to your door. If you&apos;re looking for <strong>clothing alterations in London</strong> and trying to work out which type of service makes sense for your situation, this is an honest comparison.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">The Real Difference Between a Collection Tailor and a Shop</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The practical difference is simple: a shop requires you to travel with your garments. A collection service does not. But this difference compounds:
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'You travel to the shop (typically 20–40 minutes each way in Central London)',
              'You carry your garments — through stations, on public transport, or in a taxi',
              'You leave them at the shop and travel home',
              'You return to collect them 1–2 weeks later',
              'If anything needs adjusting, you repeat the process',
            ].map((item, i) => (
              <li key={i} className="font-sans font-light text-muted text-sm leading-relaxed flex gap-3">
                <span className="text-hunter shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            For a London professional, that is 2–4 journeys and 2–4 hours of time for a standard alteration. A collection service replaces all of that with one brief exchange at your door.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Where a Shop Has the Advantage</h2>
          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Speed',
                desc: 'A fast-alteration shop can hem a pair of trousers in 20 minutes if you wait. A collection service cannot match this. If you need something done within hours, the shop wins.',
              },
              {
                title: 'Simple, low-cost work',
                desc: 'For a £15 trouser hem on a pair you don\'t particularly care about, a local alteration shop is perfectly adequate. Collection services add value for quality garments and multiple pieces — not always for a single simple job on a cheap garment.',
              },
              {
                title: 'You\'re already passing',
                desc: 'If a shop is genuinely on your route and you pass it twice a week anyway, the friction of dropping off and collecting is lower. Collection tailoring is most valuable when the shop is out of your way.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="border-l-2 border-divider pl-4">
                <p className="font-playfair font-medium text-charcoal mb-1">{title}</p>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Where a Collection Service Wins Clearly</h2>
          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Quality and valuable garments',
                desc: 'A suit that cost £800 should not be hemmed by whoever is cheapest and fastest. A collection tailor who gives a written quote, handles your garment personally throughout, and is accountable for the result is worth the small additional cost over a fast-alteration shop.',
              },
              {
                title: 'Multiple garments at once',
                desc: 'One collection covers an entire wardrobe batch. Four suits, eight trousers, three dresses — all collected and returned in a single exchange. The time saving versus multiple shop visits is significant.',
              },
              {
                title: 'Delicate or difficult garments',
                desc: 'Wedding dresses, leather jackets, structured evening gowns — garments that require specialist handling and that you would rather not carry through London on public transport. The collection model removes the transport risk entirely.',
              },
              {
                title: 'Privacy and discretion',
                desc: 'Your garments never sit in a public shop. They go from your door to a specialist workshop and back. For residents of high-value properties who prefer not to carry expensive items through public spaces, this matters.',
              },
              {
                title: 'When time is the constraint',
                desc: 'Not having time to visit a tailor is different from needing alterations done quickly. If you have a week but cannot spare the journey time, a collection service fits around your schedule in a way a shop simply cannot.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="border-l-2 border-hunter pl-4">
                <p className="font-playfair font-medium text-charcoal mb-1">{title}</p>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">A Note on Reliability</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Not all collection tailors in London are equal. The model requires reliable logistics — a tailor who shows up when they say they will, returns garments when they say they will, and communicates honestly about what is achievable. Before booking any collection service, check the reviews carefully for comments about reliability, not just quality.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors operates on a written-quote model — no work begins without your approval, and our return timeline is confirmed at booking. We cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link>, <Link href="/tailor-islington" className="text-hunter underline">Islington</Link> and all Central London postcodes.
          </p>

          <div className="border-t border-divider pt-8 mt-8">
            <h2 className="font-playfair text-[1.5rem] font-medium mb-6">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {faqSchema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => (
                <div key={item.name} className="border-b border-divider pb-6 last:border-0">
                  <dt className="font-playfair font-medium text-charcoal mb-2">{item.name}</dt>
                  <dd className="font-sans font-light text-muted leading-relaxed text-sm">{item.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-divider pt-8 mt-8">
            <p className="font-sans font-light text-muted mb-6">
              See our <Link href="/mobile-tailor-london" className="text-hunter underline">collection tailoring service</Link> or our <Link href="/clothing-alterations-london" className="text-hunter underline">full clothing alterations service</Link> for more information.
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

        </article>
      </main>
      <Footer />
    </>
  )
}
