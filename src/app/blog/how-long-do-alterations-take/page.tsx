import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How Long Do Clothing Alterations Take in London? | Fine Tailors',
  description: 'A practical guide to alteration turnaround times in London — from simple hems to complex shoulder work. What to expect and when to book.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/how-long-do-alterations-take' },
  keywords: [
    'how long do alterations take london',
    'alteration turnaround time london',
    'clothing alteration timeline london',
    'same day alterations london',
    'express tailoring london',
  ],
  openGraph: {
    title: 'How Long Do Clothing Alterations Take in London?',
    description: 'From simple hems to shoulder work — realistic turnaround times for clothing alterations in London.',
    url: 'https://www.finetailors.co.uk/blog/how-long-do-alterations-take',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Clothing alterations turnaround time London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Long Do Clothing Alterations Take in London?',
  description: 'A practical guide to alteration turnaround times in London — from simple hems to complex shoulder work.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/how-long-do-alterations-take' },
  keywords: 'how long do alterations take london, alteration turnaround time london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How Long Do Alterations Take', item: 'https://www.finetailors.co.uk/blog/how-long-do-alterations-take' },
  ],
}

export default function HowLongDoAlterationsTake() {
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
            <span>How Long Do Alterations Take</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How Long Do Clothing Alterations Take in London?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor completing clothing alterations in London" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            One of the first questions before booking a tailor is: <strong>how long will it actually take?</strong> The answer depends on what needs doing — a simple trouser hem is a very different proposition to a full jacket relining. Here is a realistic guide to alteration turnaround times in London.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Standard Turnaround Times</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            As a general guide, most common alterations fall into these timeframes:
          </p>
          <div className="border border-divider mb-8 overflow-hidden">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Alteration</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Typical Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Trouser hemming / shortening', '1–3 days'],
                  ['Waist adjustment (trousers)', '2–4 days'],
                  ['Zip replacement', '2–4 days'],
                  ['Dress shortening', '2–4 days'],
                  ['Jacket waist suppression', '3–5 days'],
                  ['Sleeve shortening', '3–5 days'],
                  ['Full suit (jacket + trousers)', '5–7 days'],
                  ['Shoulder adjustment', '7–10 days'],
                  ['Jacket relining', '7–14 days'],
                ].map(([alt, time], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{alt}</td>
                    <td className="px-5 py-3 font-light text-muted">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Affects Alteration Turnaround?</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-3 pl-6 list-disc">
            <li><strong className="font-medium text-charcoal">Complexity.</strong> A trouser hem requires one clean seam. A shoulder adjustment means dismantling the upper jacket, reshaping the structure, and rebuilding — a multi-hour task even for a master tailor.</li>
            <li><strong className="font-medium text-charcoal">Fabric.</strong> Delicate fabrics — silk, chiffon, beaded materials — require far more care and time than standard wool or polyester blends.</li>
            <li><strong className="font-medium text-charcoal">Required finish.</strong> A standard hem takes minutes. A same-finish jean hem that matches the original chain-stitch takes considerably longer and requires a specialist machine.</li>
            <li><strong className="font-medium text-charcoal">Number of garments.</strong> Multiple pieces in one visit can be batched efficiently, but each still requires time to alter properly.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Can You Get Same-Day Alterations in London?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            For simple alterations — a basic hem, a zip replacement, a straightforward waist take-in — same-day or next-day service is possible when booked early. Fine Tailors offers <Link href="/same-day-alterations-london" className="text-hunter underline">same-day alterations in London</Link> for qualifying work.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            More complex work — anything involving the jacket body, shoulders, or several garments — should be booked with at least a week&apos;s lead time. If you have a specific event or deadline, mention it when booking: we always do our best to accommodate fixed dates.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">How Fine Tailors Works</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects your garments from your home or office, completes the alterations at the workshop, and returns everything to you. The standard collection-to-return window is <strong>3–5 days</strong> for most work.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            For complex or multi-garment orders we confirm the exact timeframe at the assessment visit, so there are never any surprises.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Book your alteration</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Get started</Link> to book a home visit. We collect, alter, and return — with a turnaround that suits your schedule.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
