import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The Difference Between Alterations and Bespoke Tailoring | The Door Tailor',
  description: 'Not sure whether you need alterations or bespoke tailoring? The Door Tailor explains the difference and helps you choose the right service in London.',
  alternates: { canonical: 'https://www.thedoortailor.co.uk/blog/difference-between-alterations-and-bespoke' },
  openGraph: {
    title: 'The Difference Between Alterations and Bespoke Tailoring',
    url: 'https://www.thedoortailor.co.uk/blog/difference-between-alterations-and-bespoke',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Difference Between Alterations and Bespoke Tailoring',
  description: 'Not sure whether you need alterations or bespoke tailoring? The Door Tailor explains the difference and helps you choose the right service in London.',
  author: { '@type': 'Organization', name: 'The Door Tailor' },
  publisher: { '@type': 'Organization', name: 'The Door Tailor', url: 'https://www.thedoortailor.co.uk' },
  datePublished: '2026-04-01',
  url: 'https://www.thedoortailor.co.uk/blog/difference-between-alterations-and-bespoke',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thedoortailor.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.thedoortailor.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Alterations vs Bespoke', item: 'https://www.thedoortailor.co.uk/blog/difference-between-alterations-and-bespoke' },
  ],
}

export default function Post4() {
  return (
    <>
      <Script id="schema-article-4" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="schema-breadcrumb-post4" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">
        <article className="px-8 lg:px-24 py-20 max-w-3xl">

          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Alterations vs Bespoke</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">1 April 2026 · 6 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            The Difference Between Alterations and Bespoke Tailoring
          </h1>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Two people might both describe themselves as needing a tailor — but what they actually need can be quite different. One needs an existing garment adjusted. The other needs a garment made from scratch to their exact measurements. Understanding the difference helps you make the right choice, spend wisely, and end up with clothes that fit as they should. This guide to <strong>clothing alterations London</strong> and bespoke tailoring will help you decide.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Definitions</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            <strong>Alterations</strong> means adjusting a garment that already exists — changing its dimensions, proportions, or details to fit your body better. The raw material and construction are already there; a skilled tailor works with what exists to improve the fit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            <strong>Bespoke tailoring</strong> means a garment is made from scratch, entirely to your measurements and specifications. You choose the fabric, the construction details, and every element of the finished piece. It is produced for you alone, with multiple fittings during the making process.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">When You Need Alterations</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most people who seek a tailor in London actually need alterations. The most common scenarios include:
          </p>
          <ul className="font-sans font-light text-muted leading-relaxed mb-8 space-y-2 pl-6 list-disc">
            <li>An off-the-rack suit that fits well across the shoulders but is loose at the waist</li>
            <li>A dress that is the right style but slightly too long or wide at the hips</li>
            <li>A weight change — up or down — that has affected the fit of garments you love</li>
            <li>An inherited piece with sentimental value that needs updating to a modern fit</li>
            <li>Occasion wear bought for an event that needs to fit perfectly by a specific date</li>
          </ul>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">When You Need Bespoke</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Bespoke makes sense when nothing off the rack ever fits your body shape — when the proportions of your chest, shoulders, waist and hips consistently require changes so significant that buying off the rack is a poor starting point. It also makes sense for a once-in-a-lifetime investment piece: a wedding suit, a coat you intend to wear for twenty years, a statement garment for a significant occasion. Bespoke has a higher cost and a longer lead time, but delivers something that alterations simply cannot — a garment built entirely around you.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Overlap: Alterations That Feel Bespoke</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Here is something many clients do not expect: expert alterations, applied to a well-made garment, can produce a result that is almost indistinguishable from bespoke. A jacket that is taken in at the waist, given a tapered silhouette, shortened at the sleeve, and adjusted at the back seam will fit as if it were made for you. The starting point was off the rack; the result is personal. This is why <strong>clothing alterations London</strong> clients often find that their existing wardrobe has far more potential than they realised.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">Price Comparison</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Alterations are significantly less expensive than bespoke. A jacket alteration might start from £X; a full bespoke suit starts from £X and can run considerably higher depending on fabric and construction. For most people, alterations deliver the majority of the benefit at a fraction of the cost. The question to ask is: does the garment itself have good bones? If the fabric and construction are sound, and the proportions are broadly right, alterations will transform it.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">The Door Tailor Does Both — At Your Door</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Whether you need a wardrobe full of garments altered or a single bespoke commission, The Door Tailor delivers both services at your home across central London. Our visiting model means no travel, no inconvenience, and the full attention of an experienced tailor in your own space. If you are unsure which service you need, the home assessment will make it clear — we will advise honestly based on what your wardrobe requires.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">
              Not sure what you need? Let us assess in person.
            </p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/book" className="text-hunter underline">Book a home visit</Link> — we will advise on exactly the right service for your wardrobe. View our full <Link href="/services" className="text-hunter underline">tailoring services</Link>.
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
