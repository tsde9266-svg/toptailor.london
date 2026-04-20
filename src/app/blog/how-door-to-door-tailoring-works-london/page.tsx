import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How Door-to-Door Tailoring Works in London | The Door Tailor',
  description: 'Discover how The Door Tailor\'s door-to-door tailoring service works in London. We visit your home, collect your garments and return them perfectly altered.',
  alternates: { canonical: 'https://www.thedoortailor.co.uk/blog/how-door-to-door-tailoring-works-london' },
  openGraph: {
    title: 'How Door-to-Door Tailoring Works in London',
    url: 'https://www.thedoortailor.co.uk/blog/how-door-to-door-tailoring-works-london',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Door-to-Door Tailoring Works in London',
  description: 'Discover how The Door Tailor\'s door-to-door tailoring service works in London. We visit your home, collect your garments and return them perfectly altered.',
  author: { '@type': 'Organization', name: 'The Door Tailor' },
  publisher: { '@type': 'Organization', name: 'The Door Tailor', url: 'https://www.thedoortailor.co.uk' },
  datePublished: '2026-03-10',
  url: 'https://www.thedoortailor.co.uk/blog/how-door-to-door-tailoring-works-london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thedoortailor.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.thedoortailor.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How Door-to-Door Tailoring Works', item: 'https://www.thedoortailor.co.uk/blog/how-door-to-door-tailoring-works-london' },
  ],
}

export default function Post1() {
  return (
    <>
      <Script id="schema-article-1" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-post1" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>How Door-to-Door Tailoring Works</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">10 March 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How Door-to-Door Tailoring Works in London
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Traditional tailoring asks a lot of you. Travel across London, carry your garments, wait in a shop, return to collect — all while managing a busy life. The <strong>door-to-door tailor London</strong> model removes every one of those steps. Here is exactly how The Door Tailor service works, from the moment you book to the moment your clothes are returned.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Problem with Traditional Tailors</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Central London is full of excellent tailors — but accessing them is inconvenient. You need to travel, often during peak hours, carry garments that can be fragile or bulky, wait for an appointment, and then repeat the journey twice more to collect. For professionals and busy households in Mayfair, Chelsea and across central London, this is a significant ask. The door-to-door model was built precisely to solve this.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Step 1: You Book a Home Visit</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The process begins online or by phone. You choose a time that works for you, and we confirm a visit to your home or office. We come to you anywhere in central London — from <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> and Marylebone to <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and the City. No need to travel. No need to prepare anything beyond the garments you want altered.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Step 2: We Assess Garments at Your Door</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            When we arrive, we assess every piece you want worked on. We take precise measurements, pin where adjustments are needed, and advise on what is achievable. This in-person assessment is a significant advantage over posting garments to an alterations service — we see the fit on you, in your home, in real time. If you are unsure whether a jacket can be taken in at the shoulders or whether a dress can be shortened at the hem, we will tell you honestly.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Step 3: We Collect Your Clothes</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            After the assessment, we take all garments with us. You do not drop off anything, drive anywhere, or arrange a courier. We collect from your door and transport everything carefully to our workspace. This is particularly valuable for delicate items — wedding dresses, silk blouses, structured suits — that you would rather not carry through public transport.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Step 4: Expert Alterations in Our Workspace</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            With over 10 years of professional tailoring experience, we complete all alterations to a standard the high street simply cannot match. Whether it is taking in the waist of a suit, shortening trouser legs, adjusting sleeve length, or resizing a dress, every stitch is placed with care. Standard turnaround is 3–5 days. Express 24–48 hour service is available for urgent requirements.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Step 5: We Return Garments Perfect to Your Door</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Once alterations are complete, we return everything to your address — pressed and ready to wear. There is no second trip required from you. Your clothes arrive at your door in the same condition they left, only better fitting.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Why London Professionals Choose This Service</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The <strong>door-to-door tailor London</strong> model works for anyone who values their time. City professionals who need suits altered before a board meeting. Chelsea residents with a wardrobe of quality pieces that need refreshing. Families preparing for a wedding. Anyone who has ever arrived at a tailor across town, waited, and then carried armfuls of clothes home on the Tube will immediately understand the appeal.
          </p>

          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            The service is also more personal. Your tailor knows your address, understands your wardrobe, and builds up a picture of your preferences over time. It is tailoring as it should be — attentive, convenient, and precise.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Ready to try it?
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Book your home visit today</Link> — we serve Mayfair, Chelsea, Knightsbridge and all of central London.
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
