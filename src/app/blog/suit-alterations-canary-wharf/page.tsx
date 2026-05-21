import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Suit Alterations in Canary Wharf: A Guide for Finance Professionals | Fine Tailors',
  description: 'If you work in Canary Wharf and wear a suit daily, here is how to get alterations done without leaving E14 — and why a collection service beats every local alternative.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/suit-alterations-canary-wharf' },
  keywords: [
    'tailor Canary Wharf',
    'suit alterations Canary Wharf',
    'suit alterations E14',
    'tailor E14 London',
    'trouser alterations Canary Wharf',
  ],
  openGraph: {
    title: 'Suit Alterations in Canary Wharf: A Guide for Finance Professionals',
    description: 'How finance professionals in E14 get their suits altered without leaving Canary Wharf — and why a collection service is the right answer.',
    url: 'https://www.finetailors.co.uk/blog/suit-alterations-canary-wharf',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Suit alterations Canary Wharf London guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Suit Alterations in Canary Wharf: A Guide for Finance Professionals',
  description: 'How finance professionals working in Canary Wharf get their suits altered efficiently — without leaving E14 or sacrificing quality.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/suit-alterations-canary-wharf' },
  keywords: 'suit alterations Canary Wharf, tailor Canary Wharf, tailor E14 London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Suit Alterations Canary Wharf', item: 'https://www.finetailors.co.uk/blog/suit-alterations-canary-wharf' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there a tailor in Canary Wharf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are no established dedicated tailors physically based in Canary Wharf. The area is primarily office and residential — the nearest tailoring shops are in Mayfair or the City. Fine Tailors solves this by collecting from your E14 address and returning altered garments to you.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get a suit altered if I work in Canary Wharf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most practical option is a collection-based tailor who comes to your Canary Wharf office or E14 apartment, collects your suits, alters them, and returns them within 5–7 days. This avoids carrying garments across London to a West End tailor during working hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What suit alterations are most common for finance workers in Canary Wharf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common alterations are trouser hemming (to the right break for daily office wear), jacket waist suppression for a more tailored look, and sleeve shortening. Finance workers also frequently batch multiple suits together in one collection to cover a full wardrobe rotation.',
      },
    },
  ],
}

export default function SuitAlterationsCanaryWharf() {
  return (
    <>
      <Script id="schema-article-cw" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-cw" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-faq-cw" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Suit Alterations in Canary Wharf</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">21 May 2026 · 6 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Suit Alterations in Canary Wharf: A Guide for Finance Professionals
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            If you work in <strong>Canary Wharf</strong> and wear a suit most days — whether you&apos;re at Bloomberg, HSBC, Barclays or one of the dozens of firms in E14 — you will at some point need alterations done. Suits are rarely perfect off the peg. Bodies change. Tastes change. And a suit that worked when you bought it three years ago may need refreshing today.
          </p>

          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            The problem is practical: where do you get a suit altered in Canary Wharf without significant disruption to your working day?
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">The Canary Wharf Tailoring Problem</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Canary Wharf has excellent transport links but limited local tailoring. The area is built around office towers, hotels and serviced apartments — not boutique tailoring shops. The nearest established tailors are in Mayfair or on Savile Row, which are a 30–45 minute journey across London in each direction.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Going to a West End tailor during a working week means leaving the office during the day or going before or after work — often carrying multiple garments in a bag, on the Tube, hoping nothing gets creased in transit. For a finance professional running between meetings, this is genuinely disruptive.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            There are some dry cleaning shops and fast-alteration services closer to E14. These tend to offer the basics — hemming, waistband adjustments — at speed but not necessarily at the quality level that a well-made suit deserves. A suit that cost £800 should not have its trousers hemmed by the cheapest option available.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">The Suit Alterations a Finance Professional Actually Needs</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Finance workers wear suits differently from most other professional groups. They are worn every working day, often with long hours — which means fit and comfort matter as much as appearance. The alterations most commonly needed by Canary Wharf professionals are:
          </p>

          <ul className="space-y-4 mb-6">
            {[
              ['Trouser hemming', 'The most common request. Off-the-peg suits frequently come too long. The right break for daily office wear — not too long to drag, not so short it looks like a break-cut — is a matter of millimetres and preference. A skilled tailor hems to your exact specification.'],
              ['Jacket waist suppression', 'Many suits are cut with a boxy waist to fit a wider range of bodies. Taking in the jacket waist and back creates a sharper, more tailored appearance — the difference between wearing a suit and wearing your suit.'],
              ['Sleeve shortening', 'The sleeve break is as important as the trouser break. Too long and the jacket looks ill-fitting; the right length shows exactly the right amount of shirt cuff. Working buttonholes should always be preserved.'],
              ['Waist and seat adjustment', 'As bodies change — whether from gym work or lifestyle — waistband and seat adjustments keep existing suits wearable. Letting out is possible where there is seam allowance; taking in is almost always achievable.'],
              ['Full wardrobe refresh', 'Many Canary Wharf clients bring in 3–5 suits at once for a full alteration pass — hemming, waist suppression and sleeve adjustment across a whole wardrobe rotation. This is efficient, cost-effective, and ensures a consistent standard across every suit.'],
            ].map(([title, desc]) => (
              <li key={title} className="border-l-2 border-divider pl-4">
                <p className="font-playfair font-medium text-charcoal mb-1">{title}</p>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Why a Collection Service is the Right Answer for Canary Wharf</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The collection model solves the Canary Wharf tailoring problem directly. Instead of travelling to a tailor, the tailor collects from your address — your apartment, your office building, your hotel room.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects your suits from your E14 address, alters every piece in our specialist workshop, and returns them pressed and ready within 5–7 working days. You send a message to book a collection time, your suits are collected at the agreed time, and they come back looking right. No carrying across London. No time lost.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            For multiple suits at once, this is particularly efficient — one collection covers the whole batch, and you get everything back in a single return.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">What This Costs</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Alteration prices for Canary Wharf collections from Fine Tailors:
          </p>

          <div className="border border-divider divide-y divide-divider mb-6">
            {[
              ['Trouser hemming', 'from £18'],
              ['Trouser tapering', 'from £18'],
              ['Waist adjustment', 'from £22'],
              ['Jacket body take-in', 'from £18'],
              ['Sleeve shortening', 'from £30'],
              ['Full suit alteration (jacket + trousers)', 'from £66'],
            ].map(([service, price]) => (
              <div key={service} className="flex justify-between px-4 py-3">
                <span className="font-sans font-light text-muted text-sm">{service}</span>
                <span className="font-sans font-medium text-charcoal text-sm">{price}</span>
              </div>
            ))}
          </div>

          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            Collection and return to your E14 address is included. Minimum order £20.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">How to Book</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Book online or call +44 7438 145169 to arrange a collection from your Canary Wharf address. Provide your building name and any access instructions at the time of booking. We confirm a collection time and take it from there.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            See our <Link href="/tailor-canary-wharf" className="text-hunter underline">dedicated Canary Wharf tailoring page</Link> or our <Link href="/suit-alterations-london" className="text-hunter underline">full suit alterations service</Link> for more information.
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

          <div className="border-t border-divider pt-8 mt-8 flex gap-6 flex-wrap items-center">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection in Canary Wharf
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
              +44 7438 145169
            </a>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
