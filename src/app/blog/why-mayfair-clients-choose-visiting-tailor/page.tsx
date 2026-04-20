import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Why Mayfair Clients Choose a Visiting Tailor | One Click Tailor',
  description: 'Mayfair residents choose One Click Tailor for premium tailoring at home. Discover why London\'s most discerning clients prefer a visiting tailor.',
  alternates: { canonical: 'https://www.oneclicktailors.co.uk/blog/why-mayfair-clients-choose-visiting-tailor' },
  openGraph: {
    title: 'Why Mayfair Clients Choose a Visiting Tailor',
    url: 'https://www.oneclicktailors.co.uk/blog/why-mayfair-clients-choose-visiting-tailor',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why Mayfair Clients Choose a Visiting Tailor',
  description: 'Mayfair residents choose One Click Tailor for premium tailoring at home. Discover why London\'s most discerning clients prefer a visiting tailor.',
  author: { '@type': 'Organization', name: 'One Click Tailor' },
  publisher: { '@type': 'Organization', name: 'One Click Tailor', url: 'https://www.oneclicktailors.co.uk' },
  datePublished: '2026-03-24',
  url: 'https://www.oneclicktailors.co.uk/blog/why-mayfair-clients-choose-visiting-tailor',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.oneclicktailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Why Mayfair Clients Choose a Visiting Tailor', item: 'https://www.oneclicktailors.co.uk/blog/why-mayfair-clients-choose-visiting-tailor' },
  ],
}

export default function Post3() {
  return (
    <>
      <Script id="schema-article-3" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-post3" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Why Mayfair Clients Choose a Visiting Tailor</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">24 March 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Why Mayfair Clients Choose a Visiting Tailor
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Mayfair is one of the few postcodes in the world where access to almost anything premium is already within walking distance. And yet, its residents consistently choose One Click Tailor — a <strong>tailor Mayfair home visit</strong> service — over the traditional tailoring shops nearby. Why? The answer says a great deal about what true luxury looks like.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Mayfair Lifestyle: Time is the Premium Luxury</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            In Mayfair, as in all of central London&apos;s most prestigious neighbourhoods, the scarcest resource is not money — it is time. Grosvenor Square residents, business owners and professionals based around Bond Street and Berkeley Square understand that their time has a cost. Spending an afternoon travelling to a tailor, waiting, and returning makes little sense when a tailor of equal or greater quality can come to the door.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Privacy and Discretion</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A home fitting is an inherently private experience. There are no other clients in the room, no shared changing area, no chance of being seen in an ill-fitting state by someone you know. For Mayfair clients — particularly those with high-profile professions or public-facing roles — this discretion is not a minor benefit. It is a fundamental requirement. One Click Tailor&apos;s visiting model provides exactly this: tailoring conducted entirely in the privacy of your own home.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">A Tailor Who Knows Mayfair Addresses</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            There is a practical advantage that is easy to overlook. A visiting tailor who regularly serves <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> clients understands the rhythm of the area. They know which buildings have concierge services, which addresses have particular access arrangements, and how to arrive and depart efficiently. Over time, the relationship becomes one of genuine familiarity and trust — something a high-street shop simply cannot replicate.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Quality Compared: Visiting Tailor vs. High-Street Chain</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Alterations shops on the high street operate on volume. A visiting tailor operates on relationship. One Click Tailor takes time to understand what each client wants, assess garments carefully in person, and complete work to a standard that reflects genuine craft. With 10+ years of experience and a client list built on reputation and referral, the quality difference is not subtle. It is the difference between an alteration that is technically correct and one that makes a garment truly yours.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Mayfair Clients Typically Need</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The most common requirements from Mayfair home visit clients include suit alterations — particularly jackets and trousers purchased from premium retailers on or near Bond Street — occasion wear adjustments ahead of charity events and formal dinners, and complete wardrobe consultations ahead of a season change. We also regularly assist with inherited or vintage garments that require sympathetic updating.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What Clients Say</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A regular Mayfair client — a company director with a demanding schedule — described the service as transformative: not because the tailoring itself was unexpected, but because the entire experience was built around her life rather than around the tailor&apos;s convenience. Her suits now fit precisely, are collected and returned on schedule, and she has not carried a garment bag since. That, she said, is what premium service actually feels like.
          </p>

          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            One Click Tailor has served central London clients for over 10 years, working with everything from everyday business suits to rare designer pieces. We also cover <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and all surrounding central London postcodes.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Book your Mayfair home visit
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Schedule a visit today</Link> — we come to you.
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
