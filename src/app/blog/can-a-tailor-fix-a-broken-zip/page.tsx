import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Can a Tailor Fix a Broken Zip? | Fine Tailors London',
  description: 'Yes — zip replacement and repair is one of the most common tailoring jobs. A guide to the types of zip repairs, costs, and what to expect.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/can-a-tailor-fix-a-broken-zip' },
  keywords: [
    'can a tailor fix a broken zip',
    'broken zip replacement london',
    'zip repair tailor london',
    'replace zip on jacket london',
    'zip alteration london',
  ],
  openGraph: {
    title: 'Can a Tailor Fix a Broken Zip?',
    description: 'Zip repair and replacement is one of the most common alteration jobs. Here is what a tailor can do and what it typically costs.',
    url: 'https://www.finetailors.co.uk/blog/can-a-tailor-fix-a-broken-zip',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Can a tailor fix a broken zip London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Can a Tailor Fix a Broken Zip?',
  description: 'Yes — zip replacement and repair is one of the most common tailoring jobs. A guide to types of zip repairs, costs, and what to expect.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/can-a-tailor-fix-a-broken-zip' },
  keywords: 'can a tailor fix a broken zip, broken zip replacement london, zip repair tailor london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Can a Tailor Fix a Broken Zip', item: 'https://www.finetailors.co.uk/blog/can-a-tailor-fix-a-broken-zip' },
  ],
}

export default function CanATailorFixABrokenZip() {
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
            <span>Can a Tailor Fix a Broken Zip</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 4 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Can a Tailor Fix a Broken Zip?
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor replacing a zip on a garment in London" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            <strong>Yes — zip repair and replacement is one of the most common jobs a tailor does.</strong> Whether it is a jacket zip that has given up, an invisible dress zip that has jammed, or a trouser fly that will not stay up, a skilled tailor can fix or replace it. Here is what to know.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Repair vs Replace</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Not every broken zip needs replacing. Sometimes the problem is a faulty slider — the pull mechanism that moves up and down the teeth. If the teeth are intact but the slider is loose, has split, or the pull has detached, a tailor can often replace just the slider, which is quicker and cheaper than replacing the full zip.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            If the teeth are bent, missing, or the tape has torn, a full replacement is needed. A new zip is sewn in to match the original — same length, same colour, same weight where possible.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Types of Zip — What Each Involves</h2>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-4 pl-6 list-disc">
            <li>
              <strong className="font-medium text-charcoal">Trouser fly zip.</strong> A straightforward replacement. The tailor unpicks the fly, removes the old zip, and sews in the new one. Typically 2–4 days turnaround.
            </li>
            <li>
              <strong className="font-medium text-charcoal">Jacket or coat zip.</strong> More involved — the zip often runs through a facing or lining that must be opened and restitched. On puffer jackets or technical outerwear, the replacement must match the original teeth weight and length exactly. Typically 3–5 days.
            </li>
            <li>
              <strong className="font-medium text-charcoal">Invisible zip on a dress.</strong> An invisible zip sits inside a seam and is invisible when closed. Replacing one requires care to match the seam exactly and ensure the zip sits flush. A skilled tailor can replace these cleanly; an unskilled one can leave a visible ridge or puckering.
            </li>
            <li>
              <strong className="font-medium text-charcoal">Leather jacket zip.</strong> Heavy-duty coil or metal zips on leather garments require specialist handling. The leather must be marked carefully and stitched without perforating it unnecessarily, as additional holes are permanent.
            </li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Typical Costs</h2>
          <div className="border border-divider mb-8 overflow-hidden">
            <table className="w-full font-sans text-[0.875rem]">
              <thead>
                <tr className="bg-hunter/5 border-b border-divider">
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Zip Repair</th>
                  <th className="text-left px-5 py-3 font-medium text-charcoal">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Slider replacement only', '£10–£18'],
                  ['Trouser fly zip replacement', '£18–£28'],
                  ['Dress invisible zip replacement', '£25–£40'],
                  ['Jacket / coat zip replacement', '£28–£45'],
                  ['Leather jacket zip (specialist)', 'Quote on inspection'],
                ].map(([repair, cost], i) => (
                  <tr key={i} className={`border-b border-divider last:border-b-0 ${i % 2 === 0 ? '' : 'bg-hunter/[0.02]'}`}>
                    <td className="px-5 py-3 font-light text-charcoal">{repair}</td>
                    <td className="px-5 py-3 font-light text-muted">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            A broken zip is rarely a reason to discard a garment you otherwise like. For the cost of a replacement, most garments can be given several more years of life.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Get your zip fixed at home</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> — we assess the zip in person and complete the repair or replacement without you having to leave the house.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
