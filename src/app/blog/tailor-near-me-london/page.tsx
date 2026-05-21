import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailor Near Me London — Why Fine Tailors Is the Answer | Fine Tailors',
  description: 'Searching for a tailor near you in London? Fine Tailors is a mobile master tailor who comes to your door anywhere in central London — no travel needed.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-london' },
  keywords: [
    'tailor near me London',
    'tailor near me central London',
    'local tailor London',
    'tailor close to me London',
    'best tailor near me London',
    'tailor Mayfair near me',
    'tailor Chelsea near me',
  ],
  openGraph: {
    title: 'Tailor Near Me London — Fine Tailors Comes to Your Door',
    description: 'The best answer to "tailor near me" in London is a mobile tailor who visits your home. Fine Tailors covers all of central London.',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mobile tailor near me London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me London — Why a Mobile Tailor Is the Best Answer',
  description: 'When you search for a tailor near you in London, a mobile master tailor who comes to your home is the most convenient and professional option.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-12',
  dateModified: '2026-05-12',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/tailor-near-me-london' },
  keywords: 'tailor near me London, mobile tailor London, local tailor London',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Tailor Near Me London', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-london' },
  ],
}

export default function TailorNearMeLondon() {
  return (
    <>
      <Script id="schema-article-near-me" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-near-me" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me London</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">12 May 2026 · 4 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            Searching for a Tailor Near You in London? Here Is the Best Answer.
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Every day, thousands of Londoners search &ldquo;tailor near me&rdquo; on their phones — often in a hurry, often with a specific garment in mind. The search returns a list of shops. You pick the nearest one, travel there, wait, leave your clothes, travel back to collect. That is the traditional answer to &ldquo;tailor near me.&rdquo; There is a much better one.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Problem with the Nearest Tailor</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A tailor that is geographically close is not necessarily the most convenient option. Even a shop five minutes away requires you to travel twice — once to drop off and once to collect — while also carrying your garments both ways. If you live in <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> or any part of central London, there are better options than proximity.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">A Mobile Tailor Is Closer Than You Think</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            When Fine Tailors visits your home, we are — for practical purposes — the nearest tailor possible. We come to your address. You do not go to us. Our <strong>mobile tailor service covers all of central London</strong>: every W, SW, EC and WC postcode. Whether you are in a Marylebone townhouse or a Shoreditch apartment, we can be at your door.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Think about the last time you searched &ldquo;tailor near me.&rdquo; What you really meant was: I need a tailor who is convenient, professional, and accessible. A mobile master tailor who visits your home is all three, and more.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What &ldquo;Near Me&rdquo; Actually Means in London</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            London is a city of neighbourhoods. A tailor in Soho is not convenient for someone in Kensington. A shop in Aldgate is not nearby for a Belgravia resident. The traditional &ldquo;tailor near me&rdquo; model assumes a small town where everything is within walking distance. Central London does not work like that.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Fine Tailors resolves this entirely. We cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>, <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>, <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link>, <Link href="/tailor-notting-hill" className="text-hunter underline">Notting Hill</Link> and the <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>. Wherever you are in central London, we come to you.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">What You Get When You Book Fine Tailors</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            When you book a visit, a master tailor with over 10 years of professional experience comes to your home. We assess your garments in person — on your body, in your space — which produces a more accurate result than any shop fitting room. We pin all adjustments, advise honestly on what is achievable, collect your clothes, and return them perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The service covers everything from everyday <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations</Link> and trouser hemming to wedding dress alterations and complex jacket work. Express 24–48 hour turnaround is available for urgent requirements.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Next Time You Search &ldquo;Tailor Near Me&rdquo;</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            Skip the list of shops. Book a mobile tailor who comes to you. It costs the same, produces a better result, and removes every inconvenience of traditional tailoring. Fine Tailors is the tailor nearest to wherever you are in central London — because we come to your address.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Book your visit today
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Book a home visit</Link> or <a href="tel:+447438145169" className="text-hunter underline">call us on +44 7438 145169</a>. We serve all of central London.
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
