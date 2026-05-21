import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Know If Your Suit Needs Altering | Fine Tailors London',
  description: 'The 7 signs your suit needs altering — and which alterations are worth doing. A practical guide for London professionals.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/how-to-know-if-suit-needs-altering' },
  keywords: ['does my suit need altering', 'suit alterations signs', 'suit fit problems london', 'when to alter a suit london'],
  openGraph: {
    title: 'How to Know If Your Suit Needs Altering',
    description: 'The 7 signs your suit doesn\'t fit right — and what a tailor can do about each one.',
    url: 'https://www.finetailors.co.uk/blog/how-to-know-if-suit-needs-altering',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Suit fit guide London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Know If Your Suit Needs Altering',
  description: 'The 7 signs your suit doesn\'t fit right — and which alterations are worth doing. A practical guide for London professionals.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/how-to-know-if-suit-needs-altering' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to Know If Your Suit Needs Altering', item: 'https://www.finetailors.co.uk/blog/how-to-know-if-suit-needs-altering' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I know if my suit fits properly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A properly fitted suit has shoulders that sit flush with no overhang, a jacket that closes without pulling, sleeves that show 1–1.5cm of shirt cuff, and trousers with a clean break at the shoe. If any of these elements are off, the suit likely needs alteration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it worth altering a cheap suit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a suit that cost under £200, basic alterations like trouser hemming and a simple jacket take-in may still be worth doing if the suit has good construction. More complex alterations — shoulder work, significant body reshaping — cost proportionally more than the suit is worth. A tailor can advise you honestly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a suit be altered if I\'ve gained weight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Letting a suit out is possible where there is seam allowance — typically 1–2 inches. Most suits have some allowance at the waist and seat. Beyond this, the suit cannot be enlarged. Taking in is almost always possible. A tailor can assess how much adjustment is feasible on your specific suit.',
      },
    },
  ],
}

const signs = [
  {
    num: '1',
    title: 'The shoulders are too wide or narrow',
    fixable: 'Expensive to fix',
    desc: 'The shoulder seam should sit exactly at the edge of your shoulder — not further out (creating a divot or ripple at the shoulder cap) and not hanging in. This is the foundation of jacket fit. If the shoulders are significantly off, everything else will be off too regardless of alterations. Shoulder alterations are the most technically complex and expensive alteration available — typically £120+. For an inexpensive suit, this may not be worth doing. For a quality suit you intend to keep, it is worth the investment if the rest of the jacket is good.',
    action: 'Have a tailor assess whether alteration or replacement makes more sense for your specific garment.',
  },
  {
    num: '2',
    title: 'The jacket is too boxy at the waist',
    fixable: 'Easy and high-impact',
    desc: 'Off-the-peg suits are cut to fit a wide range of body types, which typically means a generous waist. The result is a jacket that looks shapeless — not quite a silhouette, just fabric hanging from the shoulders. Jacket waist suppression — taking in the side seams — is one of the most common and highest-impact alterations available. The result is a jacket that follows your body rather than just hanging from your shoulders. This is the alteration that most dramatically changes how a suit looks. From £18.',
    action: 'Have the side seams taken in. This can typically be done in one fitting.',
  },
  {
    num: '3',
    title: 'The sleeves are too long',
    fixable: 'Easy',
    desc: 'Jacket sleeves should show 1–1.5cm of shirt cuff below the jacket sleeve. Too long, and the jacket looks as though it belongs to someone with longer arms — and the shirt cuff is entirely hidden. Too short, and the shirt cuff is exposed to an ungainly degree. Sleeve shortening is one of the more affordable alterations, but it must be done carefully. Jackets with working buttonholes — actual functional buttonholes on the sleeve — require shortening from the shoulder end rather than the cuff, which is more work. From £30.',
    action: 'Have your sleeves measured with the shirt you normally wear with the suit.',
  },
  {
    num: '4',
    title: 'The trousers break is wrong',
    fixable: 'Easy and very visible',
    desc: 'The trouser break — how much fabric gathers at the shoe — is one of the most visible fit details. Too much break and the trousers drag; too little and they look awkwardly short. Modern preference tends toward a clean half-break or no break — but what looks right depends on the trouser cut, the shoe style and your personal preference. Trouser hemming is one of the most requested and most affordable alterations. From £18.',
    action: 'Have trousers hemmed wearing the shoes you normally wear with the suit.',
  },
  {
    num: '5',
    title: 'The waist is too loose or too tight',
    fixable: 'Usually easy',
    desc: 'A trouser waist that gaps at the back or requires a belt to hold it up is uncomfortable and looks wrong under a jacket. Taking in the waistband is straightforward. Letting it out depends on the seam allowance — most suits have 1–2 inches of allowance. Some have none. This varies by brand and price point. From £22.',
    action: 'Ask your tailor to check the seam allowance before committing to letting out.',
  },
  {
    num: '6',
    title: 'The jacket is too long or short',
    fixable: 'Moderate',
    desc: 'Jacket length is less commonly altered than waist or sleeves, but it matters. A jacket that is too long covers the trouser seat entirely; one that is too short looks like a riding jacket. The traditional rule — jacket covers the trouser seat and the knuckles of a relaxed hand reach the hem — is a good starting point. Jacket shortening is possible on most styles but changes the proportions of existing pockets and vents. A tailor will show you the result before committing.',
    action: 'Assess whether the existing proportions allow for shortening without moving the pockets.',
  },
  {
    num: '7',
    title: 'The jacket pulls across the chest or back',
    fixable: 'Depends on seam allowance',
    desc: 'Pulling across the chest or back when the jacket is buttoned — diagonal creases running towards the buttons — indicates the jacket is too tight through the chest or upper back. Letting out is possible but limited by seam allowance and sometimes by the lining. If the jacket is significantly too small across the chest, the suit may not be alterable to a comfortable fit.',
    action: 'Have a tailor assess the available seam allowance before investing in alterations.',
  },
]

export default function HowToKnowSuitNeedsAltering() {
  return (
    <>
      <Script id="schema-article-fit" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-fit" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-faq-fit" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>How to Know If Your Suit Needs Altering</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">21 May 2026 · 7 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How to Know If Your Suit Needs Altering
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Most men who wear suits own at least one that doesn&apos;t fit quite right. They know it looks slightly off, but they&apos;re not sure exactly what the problem is or whether it&apos;s worth fixing. This guide walks through the seven most common fit problems — what causes them, whether they&apos;re fixable, and what a tailor would actually do.
          </p>

          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The short version: most <strong>suit alterations</strong> that make the biggest visual difference — waist suppression, trouser hemming, sleeve shortening — are straightforward and affordable. The expensive alterations (shoulders, significant chest work) are only worth doing on quality suits you plan to keep.
          </p>

          <div className="space-y-8 mb-12">
            {signs.map((sign) => (
              <div key={sign.num} className="border border-divider p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-playfair text-3xl text-hunter/20 font-medium">{sign.num}</span>
                    <h2 className="font-playfair text-xl font-medium text-charcoal">{sign.title}</h2>
                  </div>
                  <span className="font-sans text-xs text-muted border border-divider px-2 py-1 shrink-0 ml-4 whitespace-nowrap">{sign.fixable}</span>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">{sign.desc}</p>
                <p className="font-sans text-sm font-medium text-charcoal border-l-2 border-hunter pl-3">{sign.action}</p>
              </div>
            ))}
          </div>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4 mt-10">What to Do Next</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The best way to know for certain what your suit needs is to have a tailor look at it. Fine Tailors collects from your Central London door — we collect your suit, assess it, and send a written quote before a single stitch is placed. No travel, no shop visit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            See our <Link href="/suit-alterations-london" className="text-hunter underline">full suit alterations service</Link> or our <Link href="/blog/complete-guide-suit-alterations-london" className="text-hunter underline">complete guide to suit alterations in London</Link> for pricing and what to expect.
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
