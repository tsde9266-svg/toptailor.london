import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How Much Do Trouser Alterations Cost in London? | Fine Tailors',
  description: 'A complete guide to trouser alteration prices in London — hemming, tapering, waist adjustments, and what affects the cost.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/trouser-alteration-cost-london' },
  keywords: [
    'trouser alteration cost london',
    'trouser hem cost london',
    'how much trouser alterations london',
    'trouser shortening price london',
    'trouser waist alteration cost',
  ],
  openGraph: {
    title: 'How Much Do Trouser Alterations Cost in London?',
    description: 'Transparent pricing for all common trouser alterations in London — hemming, tapering, waist take-in, and more.',
    url: 'https://www.finetailors.co.uk/blog/trouser-alteration-cost-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Trouser alteration cost London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Much Do Trouser Alterations Cost in London?',
  description: 'A complete guide to trouser alteration prices in London — hemming, tapering, waist adjustments, and what affects the cost.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/trouser-alteration-cost-london' },
  keywords: 'trouser alteration cost london, trouser hem cost london, how much trouser alterations london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Trouser Alteration Cost London', item: 'https://www.finetailors.co.uk/blog/trouser-alteration-cost-london' },
  ],
}

export default function TrouserAlterationCostLondon() {
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
            <span>Trouser Alteration Cost London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 4 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How Much Do Trouser Alterations Cost in London?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor hemming trousers in a London home" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Trouser alterations are some of the most frequently requested tailoring jobs in London — and some of the most worthwhile. A well-hemmed pair of trousers or a properly tapered leg transforms how a garment sits on the body. Here is a transparent breakdown of what trouser alterations typically cost.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Trouser Alteration Prices in London</h2>
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
                  ['Trouser shortening — standard hem', 'from £18'],
                  ['Trouser shortening — same finish / turn-ups / tape', 'from £25'],
                  ['Jeans shortening — standard', 'from £18'],
                  ['Jeans shortening — same original finish', 'from £25'],
                  ['Tapering trousers — 2 seam', 'from £18'],
                  ['Tapering trousers — 4 seam', 'from £28'],
                  ['Trouser waist adjustment', 'from £22'],
                  ['Jeans waist — same original finish', 'from £28'],
                  ['New pockets (full)', 'from £45'],
                  ['New pockets (half)', 'from £25'],
                  ['Patch repair', 'from £18'],
                  ['New zip — trousers', 'from £20'],
                  ['Rehem', 'from £8'],
                ].map(([alt, cost], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{alt}</td>
                    <td className="px-5 py-3 font-light text-muted">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Affects the Cost?</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">The finish required.</strong> A basic hem takes minutes. A same-finish hem — matching the original chain stitch or turn-up exactly — takes significantly longer and requires the right equipment.</li>
            <li><strong className="font-medium text-charcoal">Fabric type.</strong> Delicate fabrics such as silk trousers or fine wool require more care and time than standard polyester or cotton blends.</li>
            <li><strong className="font-medium text-charcoal">Number of seams.</strong> A 2-seam taper works the inner seams only. A 4-seam taper works all four seams for a more dramatic result — naturally more time and cost.</li>
            <li><strong className="font-medium text-charcoal">Original features to preserve.</strong> Preserving belt loops, pocket styles, or turn-up detail adds complexity and time to the alteration.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Is It Worth Altering Trousers?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Almost always, yes. A £25 trouser hem on a £180 pair of suit trousers is a straightforward investment. A £18–28 taper on a pair of chinos you wear three times a week is excellent value.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            The exception is very cheap garments where the fabric is so poor that the alteration costs more than a replacement. But for any trousers you wear regularly and want to keep wearing, a professional alteration is worth every penny.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Get your trousers altered at home</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Fine Tailors visits you at home, assesses each garment in person, and provides an exact quote. <Link href="/get-started" className="text-hunter underline">Book a visit</Link> or explore our <Link href="/trouser-alterations-london" className="text-hunter underline">trouser alterations service</Link>.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
