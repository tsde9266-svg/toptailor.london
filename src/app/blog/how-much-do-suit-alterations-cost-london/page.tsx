import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'How Much Do Suit Alterations Cost in London? 2026 Guide | Fine Tailors',
  description: 'Suit alteration prices in London 2026: trouser hem from £18, jacket sleeve from £25, full suit from £60. Collection included. Clear guide from Fine Tailors.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/how-much-do-suit-alterations-cost-london' },
  openGraph: {
    title: 'How Much Do Suit Alterations Cost in London? 2026 Price Guide',
    description: 'Clear suit alteration prices for London 2026. Trouser hem from £18, jacket sleeve from £25, full suit from £60. Collection included.',
    url: 'https://www.finetailors.co.uk/blog/how-much-do-suit-alterations-cost-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Suit Alteration Costs London 2026 — Fine Tailors' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How Much Do Suit Alterations Cost in London?', item: 'https://www.finetailors.co.uk/blog/how-much-do-suit-alterations-cost-london' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': 'https://www.finetailors.co.uk/blog/how-much-do-suit-alterations-cost-london',
  url: 'https://www.finetailors.co.uk/blog/how-much-do-suit-alterations-cost-london',
  headline: 'How Much Do Suit Alterations Cost in London? 2026 Guide',
  description: 'Suit alteration prices in London 2026: trouser hem from £18, jacket sleeve from £25, full suit from £60. Collection included.',
  datePublished: '2026-05-25',
  dateModified: '2026-05-25',
  author: {
    '@type': 'Organization',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/how-much-do-suit-alterations-cost-london' },
}

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost to alter a suit in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suit alteration costs in London vary by alteration type. Trouser hemming starts from £18. Jacket sleeve shortening starts from £25. Taking in the jacket body starts from £35. A typical full suit alteration (jacket and trousers) costs between £60 and £120 depending on the extent of work. Fine Tailors includes collection and return from your Central London home in all alteration prices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it worth altering a suit in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — for any suit that fits well in most areas but not in one or two. A well-fitted suit looks significantly better than an expensive suit that does not fit. Trouser hemming for £18 or sleeve shortening for £25 transforms the appearance of a garment worth many times that price. The only suits not worth altering are those with structural problems (wrong shoulder width, incorrect jacket length) where the cost approaches the replacement cost of the suit itself.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do suit alterations take in London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most suit alterations take 5–7 working days with Fine Tailors. Simple alterations like trouser hemming can sometimes be completed faster. Complex work — shoulder adjustments, full re-cuts — may take longer. Call us to discuss your timeline if the garment is needed urgently.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do London tailors charge for collection and return?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some services that offer a call-out or collection option charge £25–£50 for the visit on top of alteration prices. Fine Tailors includes collection and return from your Central London home in the alteration price — you pay only for the work done on the garment.',
      },
    },
  ],
}

export default function SuitAlterationCostBlogPost() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Suit Alteration Costs London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Fine Tailors · London · 25 May 2026</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            How Much Do Suit Alterations Cost{' '}
            <em className="font-playfair italic">in London? 2026 Guide</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            London suit alteration prices vary considerably — from £18 for a trouser hem to several hundred pounds for a full re-cut. This guide gives you clear starting prices for every common alteration, explains what drives the cost up or down, and covers what to expect from a collection-based service where there is no extra charge for pickup and delivery.
          </p>
        </div>

        {/* ── Price table ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Suit Alteration Prices in London 2026</h2>
          <table className="w-full max-w-2xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-8 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">London Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Trouser hemming (plain)', 'From £18'],
                ['Trouser hemming (turn-up)', 'From £22'],
                ['Trouser tapering', 'From £22'],
                ['Trouser waist adjustment', 'From £22'],
                ['Trouser seat adjustment', 'From £28'],
                ['Jacket sleeve shortening (plain)', 'From £25'],
                ['Jacket sleeve shortening (working buttonholes)', 'From £40'],
                ['Jacket body taking-in (side seams)', 'From £35'],
                ['Jacket chest letting-out', 'From £35'],
                ['Waistcoat alterations', 'From £20'],
                ['Jacket shoulder adjustment', 'Quoted on inspection'],
                ['Full suit (jacket + trousers)', 'From £60–£120'],
              ].map(([name, price]) => (
                <tr key={name} className="border-t border-divider">
                  <td className="py-3 pr-8 font-sans font-light text-sm text-charcoal">{name}</td>
                  <td className="py-3 font-sans font-medium text-sm text-hunter">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-sans text-xs text-muted mt-4">
            Prices are starting rates from Fine Tailors. All prices include collection and return from your Central London home. Written quote confirmed after inspection — no work begins until you approve.
          </p>
        </div>

        {/* ── What drives costs ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Drives Suit Alteration Costs Up</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The &ldquo;from&rdquo; price for any alteration is the simplest version of that work — a plain hem on a single-layer trouser, or sleeve shortening on a jacket without working buttonholes. Prices increase for several common reasons:
          </p>
          <div className="space-y-4">
            {[
              ['Working buttonholes on jacket sleeves', 'A jacket with working buttonholes (also called surgeon&apos;s cuffs) requires each hole to be carefully redone after sleeve shortening — this adds £10–£20 to the sleeve price.'],
              ['Canvas construction', 'Bespoke and high-quality suits often have a floating canvas chest piece rather than a fused chest. Working around this without disturbing the canvas requires more time and skill.'],
              ['The extent of the alteration', 'Taking a trouser in by 2cm is different from taking it in by 5cm — the latter requires re-tapering through the thigh and seat to maintain the correct silhouette.'],
              ['Fabric type', 'Delicate fabrics (silk, wool crêpe, heavy tweed) require slower, more careful work than standard polyester blends. Premium fabric = slightly higher price.'],
              ['Lining work', 'A lined jacket where alterations require the lining to be opened, adjusted, and re-closed adds time to any body alteration.'],
            ].map(([title, desc]) => (
              <div key={title as string} className="border-l-2 border-hunter/30 pl-5">
                <h3 className="font-playfair font-medium text-charcoal mb-1">{title}</h3>
                <p className="font-sans font-light text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: desc as string }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Is it worth it ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Is It Worth Altering a Suit in London?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Almost always, yes — with one exception. If the fundamental proportions of the suit are wrong (the shoulder sits too wide, the jacket is too long relative to your torso, the chest is too small to let out), the alteration cost can approach the replacement cost of the suit. In those cases, a tailor will tell you honestly.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            For the common scenarios — trousers bought online that need hemming, an off-the-peg suit where the jacket is right but the sleeves are half an inch too long, a trouser that fits at the waist but is slightly wide at the thigh — the alteration cost is small relative to the improvement in appearance. A £25 sleeve shortening on a £400 suit is not a question.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The same logic applies to inherited suits, archive pieces, or suits bought in the wrong size during a sale. Provided the construction is sound and the shoulder fits, nearly any suit can be brought to a good fit.
          </p>
        </div>

        {/* ── Collection included ── */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Collection Is Included in Our Prices</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most London tailors who offer a collection or call-out option charge £25–£50 for the visit, on top of the alteration price. At Fine Tailors, collection from your Central London door and return to your door are part of the standard service — included in the alteration price. You pay for the work, not the convenience.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            See our <Link href="/alteration-costs-london" className="text-hunter underline">full alteration costs page</Link> for prices across all garment types, or our <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service page</Link> for more on what we do.
          </p>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Get a Quote for Your Suit</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Book a collection slot and we will inspect your suit at our workshop and send a written quote before any work begins. We cover all Central London postcodes seven days a week.
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
