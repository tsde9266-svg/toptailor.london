import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'What Can a Tailor Do to a Shirt? | Fine Tailors London',
  description: 'A complete guide to shirt alterations — body slimming, sleeve shortening, collar adjustment, length changes, and what is not fixable.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/what-can-a-tailor-do-to-a-shirt' },
  keywords: [
    'what can a tailor do to a shirt',
    'shirt alterations london',
    'shirt alteration options',
    'slim shirt tailor london',
    'shirt sleeve shortening london',
  ],
  openGraph: {
    title: 'What Can a Tailor Do to a Shirt?',
    description: 'From slimming the body to shortening sleeves — the full range of shirt alterations a tailor can perform in London.',
    url: 'https://www.finetailors.co.uk/blog/what-can-a-tailor-do-to-a-shirt',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Shirt alteration options London tailor' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What Can a Tailor Do to a Shirt?',
  description: 'A complete guide to shirt alterations — body slimming, sleeve shortening, collar adjustment, length changes, and what is not fixable.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/what-can-a-tailor-do-to-a-shirt' },
  keywords: 'what can a tailor do to a shirt, shirt alterations london, shirt sleeve shortening london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'What Can a Tailor Do to a Shirt', item: 'https://www.finetailors.co.uk/blog/what-can-a-tailor-do-to-a-shirt' },
  ],
}

export default function WhatCanATailorDoToAShirt() {
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
            <span>What Can a Tailor Do to a Shirt</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            What Can a Tailor Do to a Shirt?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor altering a dress shirt in a London home" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Shirts are one of the most altered garments in a working wardrobe. The standard sizing grid rarely accommodates the specific proportions of a real body — and a shirt that bags at the body, pools at the sleeve, or pulls at the collar is uncomfortable and looks wrong. Here is what a tailor can change.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Take In the Body</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The most common shirt alteration: slimming the body through the sides and back. A tailor takes in the side seams to remove excess fabric through the chest, waist, and hip, creating a cleaner silhouette that sits closer to the body without restricting movement.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This can also be done through the back panel alone — useful when a shirt fits the chest but balloons at the back. The result, when done well, looks indistinguishable from a fitted shirt bought at that size.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Shorten the Sleeves</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Sleeve length is one of the most visible points of shirt fit. Sleeves that extend past the wrist bone look sloppy; sleeves that end mid-wrist look too short. A tailor shortens shirt sleeves from the cuff — unpicking the cuff, shortening the sleeve placket, and reattaching the cuff at the correct position.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            For shirts with French cuffs, the same approach applies but requires more care around the double-fold finish.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Shorten the Length</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A shirt that is too long bunches awkwardly when tucked and looks shapeless when worn untucked. A tailor can shorten the shirt body from the hem — straightening or reshaping the hem profile to match the original.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This is particularly useful for tall men buying shirts that fit the shoulders and chest but are too long, and for converting a dress shirt into a smarter casual shirt by shortening to an untucked length.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Slim the Cuffs</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Wide cuffs on a slim shirt look disproportionate. A tailor can take in the cuff to a narrower width, matching the overall silhouette of the shirt. This is a subtle but effective finish on formal dress shirts.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Cannot Be Done Easily</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">Collar size.</strong> The collar of a shirt is set into the neckband. Reducing or enlarging the collar size requires unpicking and rebuilding the neckband — a complex job rarely worth the cost on a ready-to-wear shirt.</li>
            <li><strong className="font-medium text-charcoal">Shoulders.</strong> Like jackets, the shoulder seam on a shirt is a structural limitation. If the shoulders are significantly wrong, the shirt is unlikely to be worth altering.</li>
            <li><strong className="font-medium text-charcoal">Making significantly larger.</strong> Shirts have minimal seam allowance in the body. Letting out is usually possible by only 1–2 cm per seam.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Typical Shirt Alteration Costs</h2>
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
                  ['Take in body — sides', '£18–£28'],
                  ['Take in body — back panel', '£15–£22'],
                  ['Shorten sleeves', '£15–£25'],
                  ['Shorten body / hem', '£15–£22'],
                  ['Slim cuffs', '£18–£28'],
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
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Get your shirts fitted properly</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Fine Tailors visits your home to assess and alter shirts in person. <Link href="/get-started" className="text-hunter underline">Book a visit</Link> or explore our <Link href="/shirt-alterations-london" className="text-hunter underline">shirt alterations service</Link>.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
