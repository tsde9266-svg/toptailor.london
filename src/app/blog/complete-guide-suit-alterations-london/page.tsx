import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The Complete Guide to Suit Alterations in London | Fine Tailors',
  description: 'Everything you need to know about suit alterations in London — what can be altered, what costs what, how to find the right tailor, and how collection services change the equation.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/complete-guide-suit-alterations-london' },
  keywords: [
    'suit alterations London',
    'suit alterations guide London',
    'how to get suit altered London',
    'suit alteration types London',
    'best suit alterations London',
  ],
  openGraph: {
    title: 'The Complete Guide to Suit Alterations in London',
    description: 'A comprehensive guide to suit alterations in London — every alteration type, prices, timelines and how to find the right tailor for your garment.',
    url: 'https://www.finetailors.co.uk/blog/complete-guide-suit-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Complete guide to suit alterations London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'The Complete Guide to Suit Alterations in London',
  description: 'A comprehensive guide to suit alterations in London covering every alteration type, realistic prices, turnaround times and how to choose the right tailor.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/complete-guide-suit-alterations-london' },
  keywords: 'suit alterations London, suit alteration guide London, how to get suit altered London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Complete Guide to Suit Alterations London', item: 'https://www.finetailors.co.uk/blog/complete-guide-suit-alterations-london' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost to alter a suit in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Basic suit alterations in London cost from £18 for trouser hemming, £30 for sleeve shortening and £18 for body take-in. A full suit alteration covering jacket and trousers typically costs £60–£120 depending on the extent of the work. Prices vary between tailors — fast-alteration services may be cheaper but the result on a quality suit reflects it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What suit alterations are worth doing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most impactful suit alterations are jacket waist suppression (the biggest visual improvement), trouser hemming (precision matters enormously), and sleeve shortening. Shoulder alterations are technically demanding and expensive — only worth doing on a suit with excellent fabric and construction. Always start with the alterations that give the most visual return.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do suit alterations take in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard turnaround for suit alterations in London is 5–7 working days at most quality tailors. Fast-alteration shops can do simple work in 24–48 hours but quality may be compromised. Fine Tailors returns garments within 5–7 days as standard; express service is available for urgent situations.',
      },
    },
  ],
}

export default function CompleteGuideSuitAlterationsLondon() {
  return (
    <>
      <Script id="schema-article-guide" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-guide" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-faq-guide" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Complete Guide to Suit Alterations London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">21 May 2026 · 12 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            The Complete Guide to Suit Alterations in London
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            <strong>Suit alterations in London</strong> are one of the most effective things you can do for your wardrobe. A well-altered suit looks better than a poorly fitted expensive one. Yet most people either never have their suits altered, have them done badly, or spend a significant amount of time finding the right tailor and getting the logistics right.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This guide covers everything: which alterations are worth doing, what they cost in London, what to watch out for, how to prepare for an alteration appointment, and why collection-based tailoring has changed the equation for busy London professionals.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Which Suit Alterations Are Worth Doing?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Not all alterations are equal. Some have a dramatic visual impact; others are purely for comfort. Here is an honest ranking by impact:
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                rank: '1',
                title: 'Jacket waist suppression',
                impact: 'Very high',
                desc: 'Taking in the body of the jacket along the side seams creates the single biggest visual improvement to a suit. A boxy jacket becomes structured and intentional. This is the alteration that transforms a suit. Most off-the-peg jackets are cut generously — a tailor can typically take in 1–2 inches through the waist and back.',
              },
              {
                rank: '2',
                title: 'Trouser hemming',
                impact: 'Very high',
                desc: 'The trouser break is one of the most visible things about a suit. Too long and it pools; too short and it looks awkward. The right break — a clean half-break for a modern look, or a full break for a traditional one — makes a significant difference. This is also one of the most affordable alterations.',
              },
              {
                rank: '3',
                title: 'Sleeve shortening',
                impact: 'High',
                desc: 'Jacket sleeves that are too long hide the shirt cuff. The right sleeve length shows 1–1.5cm of shirt cuff and is one of the first things another suited person notices. Working buttonholes should always be preserved — look for a tailor who shortens from the shoulder end rather than the cuff on jackets with real buttonholes.',
              },
              {
                rank: '4',
                title: 'Trouser tapering',
                impact: 'High',
                desc: 'A trouser with an overly wide leg looks dated. Tapering the leg from knee to hem — or throughout — modernises a suit significantly. Combined with the right hem length, this is a complete trouser overhaul.',
              },
              {
                rank: '5',
                title: 'Waist and seat adjustment',
                impact: 'Medium-high',
                desc: 'As weight or shape changes, waistband and seat alterations keep existing suits wearable. These are practical rather than dramatic alterations but important for comfort through a full working day.',
              },
              {
                rank: '6',
                title: 'Shoulder alteration',
                impact: 'High — but complex',
                desc: 'A shoulder that fits is the foundation of jacket fit. But shoulder alterations are among the most technically demanding and expensive in tailoring. If the shoulders do not fit at all, the suit may not be worth altering. If they fit but are slightly too wide, a shoulder narrowing is possible but costly. Do not attempt this on an inexpensive suit.',
              },
            ].map(({ rank, title, impact, desc }) => (
              <div key={title} className="border border-divider p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-base font-medium text-charcoal">{rank}. {title}</h3>
                  <span className="font-sans text-xs text-hunter border border-hunter px-2 py-1 shrink-0 ml-4">{impact}</span>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Suit Alteration Prices in London — Realistic Numbers</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Prices vary considerably between a high-street fast-alteration service, a specialist tailor and a mobile collection tailor. Here are realistic figures for quality alteration work in Central London:
          </p>

          <div className="border border-divider divide-y divide-divider mb-6">
            {[
              ['Trouser hemming', 'from £18', 'Per pair. Turn-up or plain hem.'],
              ['Trouser tapering', 'from £18', 'Leg silhouette adjustment.'],
              ['Waist adjustment (in or out)', 'from £22', 'Waistband modification.'],
              ['Jacket body take-in', 'from £18', 'Side seam suppression.'],
              ['Sleeve shortening', 'from £30', 'Working buttonholes preserved.'],
              ['Lining repair', 'from £35', 'Jacket or trouser.'],
              ['Full suit (jacket + trousers)', 'from £66', 'Jacket body + sleeve + trouser hem.'],
              ['Shoulder alteration', 'from £120', 'Complex — quoted individually.'],
            ].map(([service, price, note]) => (
              <div key={service} className="flex flex-wrap justify-between px-4 py-3 gap-2">
                <div>
                  <span className="font-sans font-light text-muted text-sm block">{service}</span>
                  <span className="font-sans font-light text-muted/70 text-xs">{note}</span>
                </div>
                <span className="font-sans font-medium text-charcoal text-sm">{price}</span>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">Prices from Fine Tailors. Collection and return to your London address included.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">How to Prepare for a Suit Alteration</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A good alteration starts before the tailor collects the garment. Here is what to do:
          </p>

          <ul className="space-y-3 mb-6">
            {[
              'Wear the suit (or at least the trousers) with the shoes you normally wear with it. Trouser break is measured in relation to your actual footwear.',
              'Know what you want to change. &ldquo;It doesn\'t quite fit right&rdquo; is less useful than &ldquo;the jacket is too boxy at the waist and the sleeves are 1cm too long.&rdquo;',
              'Check the vent buttons and any working buttonholes — mention these to your tailor so they are preserved.',
              'If you have lost or gained weight recently and plan to do so again, wait until your weight is stable before investing in significant alterations.',
              'Bring any other suits you want altered at the same time. Batching saves collection trips and ensures consistent standards across your wardrobe.',
            ].map((item, i) => (
              <li key={i} className="font-sans font-light text-muted text-sm leading-relaxed flex gap-3">
                <span className="text-hunter shrink-0">—</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">How to Choose a Suit Tailor in London</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The London tailoring market ranges from Savile Row bespoke (several thousand pounds for a suit) to high-street alteration shops (fast, inexpensive, variable quality). For alteration work on an existing suit, here is what to look for:
          </p>

          <div className="space-y-4 mb-6">
            {[
              ['Reviews with specific detail', 'A review that says &ldquo;perfect fit, sleeves were exactly right&rdquo; is more useful than a generic five-star rating. Look for comments about specific alterations, not just general praise.'],
              ['Willingness to quote in advance', 'A tailor who gives you a written quote before beginning work protects you from bill surprises. At Fine Tailors, no work begins without written approval of the quote.'],
              ['Experience with your garment type', 'Not every tailor can handle luxury suits, leather jackets, or structured coats. Ask specifically about your garment before committing.'],
              ['Transparency about what is not possible', 'A good tailor tells you what cannot be altered, not just what can. &ldquo;The shoulders don\'t fit and there\'s nothing worth doing here&rdquo; is the right advice when it&apos;s true.'],
            ].map(([title, desc]) => (
              <div key={title} className="border-l-2 border-hunter pl-4">
                <p className="font-playfair font-medium text-charcoal mb-1">{title}</p>
                <p className="font-sans font-light text-muted text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">Why Collection-Based Tailoring Works for London Professionals</h2>

          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Taking suits to a tailor in London means carrying them on the Tube, collecting them a week later, and — if anything needs a second adjustment — repeating the process. For someone working full-time in a demanding role, this is friction that often means alterations simply do not happen, and a wardrobe of ill-fitting suits is the result.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A <Link href="/mobile-tailor-london" className="text-hunter underline">collection-based tailoring service</Link> removes this friction entirely. Fine Tailors collects from your Central London address — <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link>, <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and beyond — alters every garment in our workshop, and returns everything pressed and ready. You are consulted at every stage through a written quote, and work begins only after approval.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This is the practical answer to the question of how to keep a London wardrobe in good condition without spending your working week travelling to tailors.
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
              Book a Collection
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
