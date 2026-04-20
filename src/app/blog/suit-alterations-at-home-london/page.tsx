import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Suit Alterations at Home: What to Expect in London | One Click Tailor',
  description: 'Everything you need to know about suit alterations at home in London. One Click Tailor visits Knightsbridge, Kensington & central London.',
  alternates: { canonical: 'https://www.oneclicktailors.co.uk/blog/suit-alterations-at-home-london' },
  openGraph: {
    title: 'Suit Alterations at Home: What to Expect in London',
    url: 'https://www.oneclicktailors.co.uk/blog/suit-alterations-at-home-london',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Suit Alterations at Home: What to Expect in London',
  description: 'Everything you need to know about suit alterations at home in London. One Click Tailor visits Knightsbridge, Kensington & central London.',
  author: { '@type': 'Organization', name: 'One Click Tailor' },
  publisher: { '@type': 'Organization', name: 'One Click Tailor', url: 'https://www.oneclicktailors.co.uk' },
  datePublished: '2026-03-17',
  url: 'https://www.oneclicktailors.co.uk/blog/suit-alterations-at-home-london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.oneclicktailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Suit Alterations at Home', item: 'https://www.oneclicktailors.co.uk/blog/suit-alterations-at-home-london' },
  ],
}

export default function Post2() {
  return (
    <>
      <Script id="schema-article-2" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-post2" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Suit Alterations at Home</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">17 March 2026 · 6 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Suit Alterations at Home: What to Expect in London
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            An off-the-rack suit that almost fits is one of the most common wardrobes problems in London — and one of the most fixable. With the right alterations, a suit that feels slightly wrong can become one that looks entirely bespoke. Here is exactly what to expect from a <strong>suit alterations home visit London</strong> with One Click Tailor.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Why Suit Fit Matters</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A well-fitted suit communicates confidence, attention to detail, and care — signals that matter whether you are in a boardroom, at a wedding, or simply going about your day. The challenge is that men&apos;s and women&apos;s suit sizing is designed around averages, and almost nobody is average. Shoulders may be right while the waist runs loose. Sleeves may be correct in length but wide at the cuff. These are all fixable — but not from a shop floor.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What We Assess at Your Home Fitting</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When we visit your home in <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link> or anywhere in central London, the fitting assessment is thorough. We examine:
          </p>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-2 pl-6 list-disc">
            <li><strong>Shoulders</strong> — the most critical measurement; the shoulder seam must sit at the edge of your shoulder.</li>
            <li><strong>Chest</strong> — how the jacket buttons and whether it pulls or gaps when fastened.</li>
            <li><strong>Waist suppression</strong> — how much the jacket takes in to follow your body shape.</li>
            <li><strong>Trouser break</strong> — how the trouser leg falls onto the shoe.</li>
            <li><strong>Sleeve length</strong> — showing the right amount of shirt cuff beneath the jacket sleeve.</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Common Suit Alterations</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The most frequently requested suit alterations during a home visit include:
          </p>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-2 pl-6 list-disc">
            <li>Taking in or letting out the jacket waist</li>
            <li>Shortening or lengthening sleeves (with or without working buttonholes)</li>
            <li>Tapering trouser legs for a slimmer silhouette</li>
            <li>Taking in the seat and thigh of trousers</li>
            <li>Shortening the jacket body length</li>
            <li>Adjusting the trouser waistband</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">How Long Alterations Take</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Standard suit alterations are returned within 3–5 days. If you have an urgent occasion — a presentation, a wedding, a formal dinner — our express 24–48 hour service is available. Just mention the deadline when booking and we will accommodate it wherever possible.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What to Prepare for Your Home Visit</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            To get the most from your fitting, wear or have ready the shirt and shoes you would typically wear with the suit. The shirt collar affects how the jacket sits at the back; the shoe height affects trouser break. No other preparation is needed — we bring everything required for the assessment.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Designer and Luxury Suit Experience</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We regularly work with luxury and designer suits — from high-street premium labels to investment pieces from heritage tailoring houses. Every garment receives the same care, but we are particularly attentive with suits that have complex construction: full-canvas jackets, working buttonholes, or unusual fabrications. These require a tailor who understands what is inside the garment, not just what is on the surface. With over 10 years of experience, One Click Tailor brings that understanding to your door.
          </p>

          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            For <strong>suit alterations home visit London</strong> clients in Knightsbridge and Kensington, the service is the same consistent standard that central London residents expect and deserve.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Book a suit fitting at your home
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Schedule your home visit today</Link> — we serve all of central London.
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
