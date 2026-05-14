import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailoring Advice & London Style Guide | Fine Tailors Blog',
  description: 'Expert tailoring advice, London style guides, and tips on clothing alterations at home from Fine Tailors.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
  ],
}

const posts = [
  {
    slug: 'best-tailor-london',
    title: 'Best Tailor in London — What to Look for in 2026',
    excerpt: 'What separates a truly great tailor from an average one in London — and why a mobile master tailor beats most shop alternatives.',
    date: '2026-05-15',
    readTime: '6 min read',
  },
  {
    slug: 'suit-alteration-cost-london',
    title: 'How Much Do Suit Alterations Cost in London?',
    excerpt: 'A transparent guide to suit alteration prices in London — what affects cost, typical ranges, and whether a mobile tailor is more expensive.',
    date: '2026-05-15',
    readTime: '5 min read',
  },
  {
    slug: 'master-tailor-home-visit-london',
    title: 'Master Tailor Home Visit in London — What to Expect',
    excerpt: 'What happens when a master tailor comes to your door in London? The visit process, what to prepare, and why the result is better.',
    date: '2026-05-12',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-london',
    title: 'Searching for a Tailor Near You in London? Here Is the Best Answer.',
    excerpt: 'A mobile tailor who comes to your home is the most convenient and professional answer to "tailor near me" in central London.',
    date: '2026-05-12',
    readTime: '4 min read',
  },
  {
    slug: 'how-door-to-door-tailoring-works-london',
    title: 'How Door-to-Door Tailoring Works in London',
    excerpt: 'Discover how Fine Tailors’s door-to-door tailoring service works in London — from booking to collection and return.',
    date: '2026-03-10',
    readTime: '5 min read',
  },
  {
    slug: 'suit-alterations-at-home-london',
    title: 'Suit Alterations at Home: What to Expect in London',
    excerpt: 'Everything you need to know about suit alterations at home in London — what we assess, how long it takes, and what to prepare.',
    date: '2026-03-17',
    readTime: '6 min read',
  },
  {
    slug: 'why-mayfair-clients-choose-visiting-tailor',
    title: 'Why Mayfair Clients Choose a Visiting Tailor',
    excerpt: 'London’s most discerning residents choose Fine Tailors for privacy, precision, and the premium convenience of a home visit.',
    date: '2026-03-24',
    readTime: '5 min read',
  },
  {
    slug: 'difference-between-alterations-and-bespoke',
    title: 'The Difference Between Alterations and Bespoke Tailoring',
    excerpt: 'Not sure whether you need alterations or bespoke tailoring? We explain the difference and help you choose the right service.',
    date: '2026-04-01',
    readTime: '6 min read',
  },
]

export default function BlogIndex() {
  return (
    <>
      <Script id="schema-breadcrumb-blog" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-4">
            Tailoring Advice & Style Guide
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-xl leading-relaxed">
            Expert insights on door-to-door tailoring, clothing alterations at home, and dressing well in London.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-divider p-8 hover:border-hunter hover:bg-hunter/5 transition-colors duration-200 group"
              >
                <div className="flex gap-4 font-sans text-xs text-muted mb-4">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-playfair text-xl font-medium text-charcoal group-hover:text-hunter mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-6 font-sans text-xs font-medium text-hunter uppercase tracking-widest">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
