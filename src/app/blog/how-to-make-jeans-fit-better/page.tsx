import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Make Jeans Fit Better — Ask a Tailor | Fine Tailors London',
  description: 'A tailor can transform a pair of jeans — tapering the leg, adjusting the waist, shortening the hem with the original finish. Here is what is possible and what it costs.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/how-to-make-jeans-fit-better' },
  keywords: [
    'how to make jeans fit better',
    'tailor jeans london',
    'jeans alteration london',
    'taper jeans london',
    'shorten jeans london',
    'jeans waist alteration london',
  ],
  openGraph: {
    title: 'How to Make Jeans Fit Better — Ask a Tailor',
    description: 'From tapering the leg to shortening with the original selvedge finish — what a tailor can do to your jeans in London.',
    url: 'https://www.finetailors.co.uk/blog/how-to-make-jeans-fit-better',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jeans alteration tailor London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Make Jeans Fit Better — Ask a Tailor',
  description: 'A tailor can transform a pair of jeans — tapering the leg, adjusting the waist, shortening the hem with the original finish.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/how-to-make-jeans-fit-better' },
  keywords: 'how to make jeans fit better, tailor jeans london, jeans alteration london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to Make Jeans Fit Better', item: 'https://www.finetailors.co.uk/blog/how-to-make-jeans-fit-better' },
  ],
}

export default function HowToMakeJeansFitBetter() {
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
            <span>How to Make Jeans Fit Better</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How to Make Jeans Fit Better — Ask a Tailor
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor altering a pair of jeans in London" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Finding jeans that fit perfectly off the rail is surprisingly rare. The waist fits but the leg is too straight. The length is right but the thigh is too baggy. <strong>A tailor can fix most of this</strong> — and a good pair of jeans altered to your measurements will outlast ten pairs bought and discarded because they never quite worked.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Leg Tapering — The Most Popular Jeans Alteration</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Tapering is the most common jeans alteration. A tailor takes in the outer or inner seam (or both) from the thigh down to the ankle, slimming the leg to your preferred silhouette. This turns a straight or relaxed-fit jean into a slim or tailored cut without buying a new pair.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A 2-seam taper works from the inner seams and is suitable for moderate tapering. A 4-seam taper (all four seams) gives a more dramatic result. The key is communicating exactly how slim you want the leg at the knee and ankle — bring a pair that fits as a reference if you have one.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Waist Adjustment</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            If the waist is too large but the seat and thighs fit, a tailor can take in the waistband at the back. This is done through the back centre seam, preserving the original waistband detail. Most jeans can be taken in up to about 3–4 cm at the waist this way.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Letting out the waist is more limited — most jeans have minimal seam allowance at the waist, so enlargement is rarely possible by more than 1–2 cm.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Shortening the Hem — with the Original Finish</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Shortening jeans seems simple but the finish matters enormously. A standard hem stitched by most cheap alterations services will look obviously wrong on raw denim or selvedge jeans. The original hem has a specific stitch type — often a chain stitch — and a specific fading pattern above it.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A <strong>same-finish hem</strong> preserves the original hem by folding it up from inside and shortening from above, so the original stitch and wear pattern remain intact. This is more expensive but looks correct on premium denim. For everyday jeans, a standard clean hem is fine.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Seat Reduction</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Excess fabric in the seat creates a drooping, shapeless look. A tailor can take in the seat seam to remove the sag and create a cleaner line. This is a moderately involved alteration on jeans because the rear pockets must be repositioned, but a skilled tailor handles it routinely.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Jeans Alterations Typically Cost</h2>
          <div className="border border-divider mb-12 overflow-hidden">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Alteration</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Leg taper — 2 seam', '£18–£25'],
                  ['Leg taper — 4 seam', '£25–£35'],
                  ['Waist take-in', '£22–£32'],
                  ['Jeans shortening — standard finish', '£18'],
                  ['Jeans shortening — same original finish', '£25'],
                  ['Seat reduction', '£30–£45'],
                ].map(([alt, cost], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{alt}</td>
                    <td className="px-5 py-3 font-light text-muted">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Get your jeans altered at home</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Fine Tailors visits your home to measure and assess your jeans in person — no guesswork, no returns. <Link href="/get-started" className="text-hunter underline">Book a visit</Link>.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
