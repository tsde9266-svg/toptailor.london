import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Is It Worth Altering Cheap Clothes? | Fine Tailors London',
  description: 'An honest guide to when it makes sense to alter inexpensive garments — and when the cost of alterations exceeds the value of the garment.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/is-it-worth-altering-cheap-clothes' },
  keywords: [
    'is it worth altering cheap clothes',
    'worth altering cheap suit london',
    'alteration value london',
    'should I alter inexpensive clothes',
    'tailoring cheap clothes london',
  ],
  openGraph: {
    title: 'Is It Worth Altering Cheap Clothes?',
    description: 'When alteration makes financial sense on a budget garment — and when you are better off replacing it.',
    url: 'https://www.finetailors.co.uk/blog/is-it-worth-altering-cheap-clothes',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Is it worth altering cheap clothes guide' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Is It Worth Altering Cheap Clothes?',
  description: 'An honest guide to when it makes sense to alter inexpensive garments — and when the cost of alterations exceeds the value of the garment.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/is-it-worth-altering-cheap-clothes' },
  keywords: 'is it worth altering cheap clothes, worth altering cheap suit london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Is It Worth Altering Cheap Clothes', item: 'https://www.finetailors.co.uk/blog/is-it-worth-altering-cheap-clothes' },
  ],
}

export default function IsItWorthAlteringCheapClothes() {
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
            <span>Is It Worth Altering Cheap Clothes</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Is It Worth Altering Cheap Clothes?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor assessing garment quality before alteration" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            This is a question we are asked honestly and often. The answer is: <strong>sometimes yes, sometimes no — and a good tailor will tell you which.</strong> Here is how to think through the decision before spending money on an alteration.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Basic Value Test</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The starting point is simple: <strong>if the alteration costs more than the garment is worth to you, do not alter it.</strong>
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A £25 trouser hem on a £15 pair of trousers from Primark is almost never worth it — the garment itself has limited lifespan and the alteration cost exceeds replacement. A £25 trouser hem on a £90 pair of H&M trousers you wear weekly and love the fabric of? That is probably worth doing.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A useful rule of thumb: <strong>if the alteration cost is more than 40–50% of the garment&apos;s replacement cost, think twice.</strong>
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">When It Makes Sense</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">You wear it often.</strong> Frequency of use is the key variable. A basic alteration on something you wear three times a week pays for itself quickly in wearability and comfort.</li>
            <li><strong className="font-medium text-charcoal">The fabric is decent despite the price.</strong> Many mid-range high-street brands (Zara, &amp; Other Stories, COS) use better fabrics than their price suggests. These are worth altering.</li>
            <li><strong className="font-medium text-charcoal">The alteration is simple.</strong> A trouser hem, a basic waist take-in, or a dress shortening are low-cost, high-return alterations that make sense on most garments.</li>
            <li><strong className="font-medium text-charcoal">There is sentimental value.</strong> A garment with emotional significance is worth altering even when the economics are marginal.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">When It Does Not Make Sense</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">Very poor fabric quality.</strong> Thin polyester or plasticky fabric cannot hold a crisp seam line and will not improve with alteration. The garment will still look cheap after the alteration, just a different size.</li>
            <li><strong className="font-medium text-charcoal">The garment has structural problems.</strong> Cheap construction — poorly set sleeves, badly fused interfacing, uneven stitching — cannot be fixed by a fitting alteration. These are structural issues, not fit issues.</li>
            <li><strong className="font-medium text-charcoal">The alteration required is complex.</strong> If a cheap garment needs shoulder work or relining, the alteration cost will approach or exceed the value of a better garment that fits.</li>
            <li><strong className="font-medium text-charcoal">No seam allowance exists.</strong> Very cheap garments are often cut right to the edge with no reserve fabric. Letting out or adjusting substantially may simply not be possible.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Middle Ground — High Street Suits</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            Suits from ASOS, Next, H&M, Zara, or similar retailers occupy interesting territory. The fabric is often decent. The construction is basic but functional. And these suits are almost universally worth having basic alterations done: trouser hem, leg taper, waist suppression on the jacket. For a total cost of £60–100, a £150 high-street suit can be made to look like a £400 garment. This is one of the best value propositions in dressing well.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Not sure if your garment is worth altering?</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> — we assess every garment honestly and tell you exactly what is worth doing and what is not.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
