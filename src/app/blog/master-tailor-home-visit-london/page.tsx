import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Master Tailor Home Visit London — What to Expect | Fine Tailors',
  description: 'Discover what happens when a master tailor comes to your London home. Fine Tailors explains the home visit process, what to prepare, and what makes a master tailor different.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/master-tailor-home-visit-london' },
  keywords: [
    'master tailor London',
    'master tailor comes to your door London',
    'master tailor home visit London',
    'master tailor at home London',
    'tailor home visit London',
    'qualified master tailor London',
  ],
  openGraph: {
    title: 'Master Tailor Home Visit London — What to Expect',
    description: 'What happens when a master tailor comes to your door in London? Fine Tailors walks you through the experience.',
    url: 'https://www.finetailors.co.uk/blog/master-tailor-home-visit-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Master tailor home visit London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Master Tailor Home Visit London — What to Expect',
  description: 'What happens when a master tailor comes to your door in London? Fine Tailors explains the process, the difference between master and standard tailoring, and how to prepare.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-12',
  dateModified: '2026-05-12',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/master-tailor-home-visit-london' },
  keywords: 'master tailor London, master tailor home visit, tailor comes to your door London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Master Tailor Home Visit London', item: 'https://www.finetailors.co.uk/blog/master-tailor-home-visit-london' },
  ],
}

export default function MasterTailorHomeVisit() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Master Tailor Home Visit London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">12 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Master Tailor Home Visit in London — What to Expect
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Having a <strong>master tailor come to your door in London</strong> is one of those experiences that people rarely forget. The attention, the precision, the ease of it — all of it is distinct from walking into a shop. If you have never had a tailor visit your home before, here is exactly what to expect with Fine Tailors.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Is a Master Tailor?</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The title &ldquo;master tailor&rdquo; refers to a tailor who has achieved the highest level of craft skill — typically through years of professional training and hands-on experience across all garment types. A master tailor does not simply hem trousers or take in a waist. They understand garment construction in full: how a jacket is built from the inside out, how fabric behaves over time, how a silhouette should follow a body, and how to solve fit problems that a less experienced tailor might not even recognise.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors has over 10 years of professional master tailoring experience, working with clients across <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and throughout central London. This includes everyday clothing alterations, complex suit restructuring, bespoke made-to-measure work, and delicate designer and luxury garments.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Before the Visit: What to Prepare</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Very little preparation is required. Before your master tailor arrives at your London home, it helps to:
          </p>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-2 pl-6 list-disc">
            <li>Gather the garments you want looked at in one place</li>
            <li>Have a clear space where you can be assessed — a well-lit room works best</li>
            <li>Wear or have available the shoes you normally wear with each suit or outfit</li>
            <li>Think about any specific fit issues you&apos;ve noticed — &ldquo;the shoulders feel wide&rdquo; or &ldquo;the waist is too loose&rdquo;</li>
          </ul>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            You do not need to measure anything yourself or know exactly what alterations are needed. That is precisely what the master tailor is there for.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">During the Visit</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When your Fine Tailors master tailor arrives, they will:
          </p>
          <ol className="font-sans font-light text-muted leading-relaxed mb-8 space-y-4 pl-6 list-decimal">
            <li><strong className="font-medium text-charcoal">Assess each garment on your body.</strong> This is the critical difference from posting clothes to a mail-in service. We see the fit in real life — how the jacket sits on your shoulders, where the trouser breaks, how the waist falls.</li>
            <li><strong className="font-medium text-charcoal">Advise on what is possible.</strong> Not every alteration is feasible, and not every alteration is worth doing. We tell you honestly — if a jacket&apos;s shoulders are too small to alter, we say so. If a dress can be taken in at the waist but shortening the hem would look wrong, we explain why.</li>
            <li><strong className="font-medium text-charcoal">Pin and mark all adjustments.</strong> Every alteration is pinned precisely on the garment while you wear it. This is the most accurate way to establish the right fit.</li>
            <li><strong className="font-medium text-charcoal">Note any specific requests.</strong> Prefer a closer trouser break? Want working buttonholes kept on the jacket sleeve? We note everything.</li>
            <li><strong className="font-medium text-charcoal">Collect your garments.</strong> Everything is taken away carefully. You carry nothing.</li>
          </ol>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">After the Visit: Alterations and Return</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Your garments are brought to our specialist workspace, where all alterations are completed by hand and machine to the highest standard. Standard turnaround is 3–5 days. Express 24–48 hour service is available when time matters.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            When complete, we return everything to your London address — pressed, protected and ready to wear. You never need to leave your home for any part of this process.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Why London Clients Choose a Master Tailor at Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The practical reasons are obvious — no travel, no carrying garments, no time wasted. But there is something more important: the quality of the result.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            When a master tailor assesses a suit on your body, in the actual environment where you wear it, using the shoes and belt you normally wear with it — the resulting alteration is more precise than anything produced in a shop fitting room under fluorescent lights. This is why clients in <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and across central London choose Fine Tailors — not just for the convenience, but for the standard.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Ready to have a master tailor come to your door?
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Book your home visit</Link> — we cover all of central London. Or visit our <Link href="/mobile-tailor-london" className="text-hunter underline">mobile tailoring service page</Link> to learn more.
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
