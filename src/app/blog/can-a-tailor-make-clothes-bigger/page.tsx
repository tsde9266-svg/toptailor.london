import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Can a Tailor Make Clothes Bigger? | Fine Tailors London',
  description: 'Yes — but it depends on the garment. A guide to letting out seams, seam allowances, and the limits of making clothes larger through alterations.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/can-a-tailor-make-clothes-bigger' },
  keywords: [
    'can a tailor make clothes bigger',
    'letting out seams london',
    'can alteration make garment larger',
    'tailor make suit bigger london',
    'let out clothing london',
  ],
  openGraph: {
    title: 'Can a Tailor Make Clothes Bigger?',
    description: 'When a tailor can let out a garment — and when there is simply not enough fabric to work with.',
    url: 'https://www.finetailors.co.uk/blog/can-a-tailor-make-clothes-bigger',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Can a tailor make clothes bigger guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Can a Tailor Make Clothes Bigger?',
  description: 'Yes — but it depends on the garment. A guide to letting out seams and the limits of making clothes larger.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/can-a-tailor-make-clothes-bigger' },
  keywords: 'can a tailor make clothes bigger, letting out seams london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Can a Tailor Make Clothes Bigger', item: 'https://www.finetailors.co.uk/blog/can-a-tailor-make-clothes-bigger' },
  ],
}

export default function CanATailorMakeClothesBigger() {
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
            <span>Can a Tailor Make Clothes Bigger</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Can a Tailor Make Clothes Bigger?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor examining seam allowance on a jacket" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            The short answer is: <strong>yes, in most cases — but it depends on the garment.</strong> Making a garment larger is technically called &ldquo;letting out&rdquo; and it works by releasing extra fabric hidden within the seams. Understanding when this is possible — and when it isn&apos;t — can save you a wasted trip to the tailor.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">How &ldquo;Letting Out&rdquo; Works</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When a garment is made, the pieces of fabric are sewn together leaving a small amount of extra fabric folded inside the seam — called the <strong>seam allowance</strong>. A tailor can unpick that seam, release some or all of the allowance, and resew further out, making the garment larger.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The critical variable is how much seam allowance exists. A well-made tailored suit typically has generous allowances — 1.5–2.5 cm — specifically so it can be let out later. A cheap fast-fashion garment may have almost none.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Which Garments Can Usually Be Made Bigger?</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">Tailored suit jackets.</strong> Quality suits are almost always made with letting-out in mind. Side seams, back seams, and chest seams often carry enough allowance for 1–2 sizes.</li>
            <li><strong className="font-medium text-charcoal">Suit trousers and formal trousers.</strong> The waist seam and seat seam usually have good allowance. Most trousers can be let out 1–2 sizes at the waist.</li>
            <li><strong className="font-medium text-charcoal">Dresses and skirts.</strong> Side seams on structured dresses often carry adequate allowance. The result depends on the fabric and construction quality.</li>
            <li><strong className="font-medium text-charcoal">Jeans and casual trousers.</strong> Waist letting-out is usually limited — most jeans have minimal seam allowance. Leg widening is possible with 4-seam tapering in reverse.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Limits: When It Cannot Be Done</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">No seam allowance.</strong> If the fabric was cut right to the seam edge, there is nothing to release. This is common in fast-fashion garments and stretch fabrics.</li>
            <li><strong className="font-medium text-charcoal">Shoulders.</strong> Shoulder seams are the one structural element that cannot meaningfully be enlarged. Widening shoulders requires dismantling and rebuilding the upper jacket — a significant and expensive job, usually not worth attempting.</li>
            <li><strong className="font-medium text-charcoal">Faded or pressed seam lines.</strong> Even with enough allowance, letting out a dark fabric may reveal a faint line where the old seam sat — pressed permanently into the cloth. A skilled tailor can often steam this out, but not always.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">How Much Bigger Can a Garment Be Made?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            As a rule of thumb: <strong>one to two sizes</strong> is achievable on most quality garments. Going beyond that is rarely possible without adding new fabric — which changes the look of the garment entirely.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            If a garment is more than two sizes too small, it is almost always better to find a larger size and have it taken in to fit, rather than attempt to let out a garment that far.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Not sure if your garment can be let out?</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> — we assess the garment in person and tell you exactly what is and isn&apos;t possible before any work begins.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
