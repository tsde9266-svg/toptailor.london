import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How Many Sizes Can a Suit Be Altered? | Fine Tailors London',
  description: 'A practical guide to how much a suit can be taken in or let out — and the structural limits that decide when to alter versus buy a new suit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/how-many-sizes-can-a-suit-be-altered' },
  keywords: [
    'how many sizes can a suit be altered',
    'suit alteration size limit london',
    'how much can a suit be taken in',
    'suit too big alteration london',
    'suit size down alteration',
  ],
  openGraph: {
    title: 'How Many Sizes Can a Suit Be Altered?',
    description: 'What are the realistic limits for taking in or letting out a suit? A guide for London buyers.',
    url: 'https://www.finetailors.co.uk/blog/how-many-sizes-can-a-suit-be-altered',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'How many sizes can a suit be altered' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Many Sizes Can a Suit Be Altered?',
  description: 'A practical guide to how much a suit can be taken in or let out — and the structural limits that decide when to alter versus buy a new suit.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/how-many-sizes-can-a-suit-be-altered' },
  keywords: 'how many sizes can a suit be altered, suit alteration size limit london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How Many Sizes Can a Suit Be Altered', item: 'https://www.finetailors.co.uk/blog/how-many-sizes-can-a-suit-be-altered' },
  ],
}

export default function HowManySizesSuitAltered() {
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
            <span>How Many Sizes Can a Suit Be Altered</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 6 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How Many Sizes Can a Suit Be Altered?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Master tailor pinning a suit jacket for alteration" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Buying a suit off the peg almost always means accepting a compromise on fit. The question is: <strong>how far can a tailor correct that compromise?</strong> The answer varies by part of the suit — the jacket body, the trousers, and the shoulders all have very different limits.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Jacket Body: Taking In</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A suit jacket that is too large in the body — chest, waist, back — can typically be taken in <strong>one to two sizes</strong> without changing the character of the garment. On a well-made suit with good seam allowances, even two to three sizes down is sometimes achievable.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The jacket body is altered through side seams, back seam, and sometimes the chest panels. Each seam gives you a little more room to work with, which is why a multi-seam take-in is more powerful than a single-seam adjustment.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Jacket Body: Letting Out</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Going the other direction — making a jacket larger — is constrained by seam allowance. Quality suits often carry enough allowance for one full size. Beyond that, the seam allowance runs out and there is nothing left to release.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            If a jacket is more than one size too small across the chest, it is generally better to find the right size and take it in than to attempt letting out a suit that far.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Hardest Limit: Shoulders</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Shoulders are the single most important structural element of a jacket — and the hardest to alter. The shoulder seam should sit precisely at the edge of your shoulder bone. If it does not, every other part of the jacket will be pulled out of position.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A skilled tailor can make <strong>minor shoulder adjustments of up to about 1 cm</strong>. Beyond that, a full shoulder rebuild is required — which is expensive, technically demanding, and only worthwhile on high-value garments. As a practical rule: always try to buy a suit where the shoulders fit. Everything else can be altered; shoulders cannot be transformed.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Trousers: Much More Flexible</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Suit trousers are far more forgiving than jackets. The waist and seat can often be taken in or let out by <strong>two or more sizes</strong>, and the leg can be tapered dramatically without structural consequence. Trouser length is always adjustable.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            For this reason, it is often worth buying trousers slightly large — especially around the waist — and having them taken in precisely to your measurements by a master tailor.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">When to Buy Rather Than Alter</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            If a jacket is more than two sizes off in the body, or if the shoulders are significantly wrong, it is almost always better to start with a better-fitting size. A tailor can perfect a suit that is close; they cannot rebuild one that is fundamentally the wrong size.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Unsure if your suit can be saved?</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> — we assess the fit in person and give you an honest answer on what can and cannot be done.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
