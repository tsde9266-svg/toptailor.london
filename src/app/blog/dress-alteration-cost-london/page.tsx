import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How Much Do Dress Alterations Cost in London? | Fine Tailors',
  description: 'A transparent guide to dress alteration prices in London — shortening, taking in, zip replacement, and what makes a dress more expensive to alter.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/dress-alteration-cost-london' },
  keywords: [
    'dress alteration cost london',
    'how much dress alterations london',
    'dress shortening cost london',
    'dress taking in cost london',
    'dress zip replacement london',
  ],
  openGraph: {
    title: 'How Much Do Dress Alterations Cost in London?',
    description: 'Transparent pricing for dress alterations in London — from simple shortening to zip replacement and structural adjustments.',
    url: 'https://www.finetailors.co.uk/blog/dress-alteration-cost-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Dress alteration cost London guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Much Do Dress Alterations Cost in London?',
  description: 'A transparent guide to dress alteration prices in London — shortening, taking in, zip replacement, and what makes a dress more expensive to alter.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/dress-alteration-cost-london' },
  keywords: 'dress alteration cost london, how much dress alterations london, dress shortening cost london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Dress Alteration Cost London', item: 'https://www.finetailors.co.uk/blog/dress-alteration-cost-london' },
  ],
}

export default function DressAlterationCostLondon() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="max-w-3xl px-8 lg:px-24 py-20">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Dress Alteration Cost London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How Much Do Dress Alterations Cost in London?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor altering a dress at a client's home in London" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Dress alterations in London vary considerably in cost depending on the complexity of the work, the construction of the dress, and the fabric involved. This guide gives you realistic prices for common dress alterations — and explains what makes some jobs more expensive than others.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Dress Alteration Prices in London</h2>
          <div className="border border-divider mb-8 overflow-hidden">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Alteration</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Fine Tailors Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Plain dress shortening', 'from £25'],
                  ['Dress shortening — 2 layers', 'from £35'],
                  ['Dress take in at sides', 'from £28'],
                  ['Dress take in sides — through zip', 'from £35'],
                  ['New zip on dress', 'from £28'],
                  ['Shorten straps', 'from £18'],
                  ['Beaded / delicate dress', 'Quote on inspection'],
                  ['Wedding dress alterations', 'Quote on inspection'],
                ].map(([alt, cost], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{alt}</td>
                    <td className="px-5 py-3 font-light text-muted">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Makes a Dress More Expensive to Alter?</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">Number of layers.</strong> A plain cotton dress with one layer is straightforward to shorten. A layered chiffon or organza dress with a lining, petticoat, and outer layer requires each layer to be cut and hemmed separately — adding significant time and cost.</li>
            <li><strong className="font-medium text-charcoal">Delicate fabrics.</strong> Silk, chiffon, lace, and beaded fabrics require more care, slower stitching, and specialist handling. The risk of error is higher, and skilled time is more expensive.</li>
            <li><strong className="font-medium text-charcoal">Embellishment.</strong> Beads, sequins, or embroidery near a seam or hem mean the tailor must work around the detail, removing and reattaching embellishment where necessary. This is time-consuming specialist work.</li>
            <li><strong className="font-medium text-charcoal">Taking in through a zip.</strong> If a dress needs to be taken in at the sides but has a concealed zip, the zip must be partially or fully removed and reset as part of the alteration — adding cost.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Wedding Dresses — A Special Case</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Wedding dress alterations are priced on inspection rather than by a standard rate, because the variation in construction, fabric, and complexity is enormous. A simple civil ceremony dress in plain crepe is a very different proposition to a structured cathedral gown with corset, boning, train, and beaded lace.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            As a general guide, expect wedding dress alterations to start from £80–120 for basic work and rise significantly for complex multi-point adjustments. See our dedicated <Link href="/wedding-dress-alterations-london" className="text-hunter underline">wedding dress alterations guide</Link> for more detail.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Get an exact quote for your dress</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Fine Tailors assesses every dress in person before quoting — no surprises. <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> or explore our <Link href="/dress-alterations-london" className="text-hunter underline">dress alterations service</Link>.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
