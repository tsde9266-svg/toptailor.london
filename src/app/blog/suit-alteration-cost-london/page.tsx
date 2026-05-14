import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How Much Do Suit Alterations Cost in London? | Fine Tailors',
  description: 'A complete guide to suit alteration prices in London — what affects cost, what to expect to pay, and why a mobile tailor often works out cheaper than you think.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/suit-alteration-cost-london' },
  keywords: [
    'suit alteration cost London',
    'how much suit alterations London',
    'suit alteration price London',
    'cost of suit alterations London',
    'suit tailoring cost London',
    'trouser alteration cost London',
    'jacket alteration price London',
  ],
  openGraph: {
    title: 'How Much Do Suit Alterations Cost in London?',
    description: 'What should you expect to pay for suit alterations in London? A transparent guide to pricing, value, and what affects cost.',
    url: 'https://www.finetailors.co.uk/blog/suit-alteration-cost-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Suit alteration cost London guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Much Do Suit Alterations Cost in London?',
  description: 'A complete guide to suit alteration prices in London — jacket waist, trouser hem, shoulder work, and what a mobile master tailor costs compared to a high-street shop.',
  image: 'https://www.finetailors.co.uk/og-image.jpg',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/icon-512.png' } },
  datePublished: '2026-05-15',
  dateModified: '2026-05-15',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/suit-alteration-cost-london' },
  keywords: 'suit alteration cost London, suit alteration price London, how much suit alterations London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Suit Alteration Cost London', item: 'https://www.finetailors.co.uk/blog/suit-alteration-cost-london' },
  ],
}

export default function SuitAlterationCostLondon() {
  return (
    <>
      <Script id="schema-article-cost" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-cost" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Suit Alteration Cost London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">15 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How Much Do Suit Alterations Cost in London?
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            <strong>Suit alteration costs in London</strong> vary considerably depending on what needs doing, who does it, and where. This guide gives you a realistic picture of what to expect — and explains why a master tailor who visits your home often delivers better value than a cheaper high-street shop.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Affects the Cost of Suit Alterations?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Several factors drive the price of any suit alteration:
          </p>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">Complexity of the alteration.</strong> Trouser hemming is straightforward. Shoulder adjustment is one of the most technically demanding alterations in tailoring and takes significantly longer.</li>
            <li><strong className="font-medium text-charcoal">Fabric type.</strong> Delicate fabrics — silk, tweed, cashmere — require more care and time than standard wool or polyester blends.</li>
            <li><strong className="font-medium text-charcoal">Suit construction.</strong> A fully canvassed bespoke suit requires more care to alter than a fused off-the-peg suit. A lining must often be opened, altered, and restitched.</li>
            <li><strong className="font-medium text-charcoal">Number of garments.</strong> Jacket, trousers and waistcoat together will cost more than trousers alone — but a full three-piece altered in one visit is more efficient than three separate trips.</li>
            <li><strong className="font-medium text-charcoal">Turnaround required.</strong> Express 24–48 hour service carries a premium over standard 3–5 day turnaround.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Typical Suit Alteration Prices in London</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            As a general guide, here is what you might expect to pay for common suit alterations in London:
          </p>
          <div className="border border-divider mb-8 overflow-hidden">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Alteration</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Typical Range (London)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Trouser hemming', '£15–£30'],
                  ['Trouser waist taken in / let out', '£20–£40'],
                  ['Jacket waist suppression', '£35–£65'],
                  ['Jacket chest taken in / let out', '£40–£75'],
                  ['Sleeve shortening (without buttons)', '£20–£35'],
                  ['Sleeve shortening (working buttons)', '£35–£65'],
                  ['Shoulder adjustment', '£60–£120+'],
                  ['Full suit (jacket + trousers)', '£80–£180+'],
                ].map(([alt, price], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{alt}</td>
                    <td className="px-5 py-3 font-light text-muted">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-8">
            These are indicative ranges only. Fine Tailors provides exact quotes after assessing your garment in person — costs vary based on the specific alteration, fabric, and construction.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Is a Mobile Tailor More Expensive?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            This is the question most people ask — and the honest answer is: not necessarily, and often no.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A cheap high-street alterations shop may quote less for a trouser hem. But consider the full cost of that transaction: your travel time to the shop (twice — once to drop off, once to collect), the opportunity cost of carrying garments across London, and the risk of a result that doesn&apos;t match what you described because there was no proper fitting.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors charges fair professional rates for <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations in London</Link>. The visit is included. The fitting is included. The collection and return is included. For many clients — particularly those with multiple garments, busy schedules, or high-value pieces — the all-in value of a <Link href="/mobile-tailor-london" className="text-hunter underline">mobile master tailor</Link> is higher than a cheaper shop.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">When Is It Worth Having a Suit Altered?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Almost always, if the suit is worth keeping. The rule of thumb: if the suit cost more than the alteration, it is probably worth doing. An off-the-peg suit that cost £400 and needs £60 of alterations becomes a significantly better garment. A £1,200 suit that needs £150 of alterations becomes outstanding.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            The only exceptions are structural problems that cannot be resolved — shoulders that are too large by more than one size, or a garment so poorly made that the fabric itself cannot take the alteration. A master tailor will tell you honestly when this is the case.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Get a quote for your suit alterations
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Book a home visit</Link> — we assess your garments in person and provide an exact quote before any work begins.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">
              ← Back to Blog
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
