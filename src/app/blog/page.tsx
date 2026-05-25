import type { Metadata } from 'next'
import Image from 'next/image'
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
  // ── Batch 8 — cost guide (May 2026) ─────────────────────────────────────
  {
    slug: 'how-much-do-suit-alterations-cost-london',
    title: 'How Much Do Suit Alterations Cost in London? 2026 Guide',
    excerpt: 'Clear London suit alteration prices: trouser hem from £18, jacket sleeve from £25, full suit from £60. Collection included. What drives costs up and when it\'s worth it.',
    date: '2026-05-25',
    readTime: '7 min read',
  },
  // ── Batch 4 — high-intent search posts (May 2026) ────────────────────────
  {
    slug: 'tailor-that-comes-to-you-london',
    title: 'A Tailor That Comes to You in London — How Fine Tailors Works',
    excerpt: 'Fine Tailors is the London tailor that comes to your door — collecting garments, altering them, and returning them pressed in 5–7 days.',
    date: '2026-05-25',
    readTime: '6 min read',
  },
  {
    slug: 'suit-alterations-near-me-london',
    title: 'Suit Alterations Near Me in London — Why Collection Beats Proximity',
    excerpt: 'Why searching "suit alterations near me" misses the point — and how Fine Tailors collects from every Central London postcode.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  // ── Tailor near me — local guides (May 2026, full set) ───────────────────
  {
    slug: 'tailor-near-me-knightsbridge',
    title: 'Tailor Near Me in Knightsbridge London — Collection Service',
    excerpt: 'The answer to "tailor near me" in Knightsbridge SW1X — a collection service for Brompton Road and Pont Street residents.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-belgravia',
    title: 'Tailor Near Me in Belgravia London — Collection Service',
    excerpt: 'Fine Tailors collects from Eaton Square and Belgrave Square addresses, alters suits and garments, and returns in 5–7 days.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-marylebone',
    title: 'Tailor Near Me in Marylebone London — Collection Service',
    excerpt: 'How Fine Tailors serves Marylebone W1G — collecting from High Street and Harley Street addresses, returned perfect in 5–7 days.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-westminster',
    title: 'Tailor Near Me in Westminster London — Collection Service',
    excerpt: 'The collection-based answer to "tailor near me" in Westminster SW1A/SW1P — suits and garments collected from your door.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-victoria',
    title: 'Tailor Near Me in Victoria London — Collection Service',
    excerpt: 'Fine Tailors collects from Victoria SW1V/SW1E addresses and returns garments perfectly altered within 5–7 working days.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-pimlico',
    title: 'Tailor Near Me in Pimlico London — Collection Service',
    excerpt: 'Doorstep tailor collection in Pimlico SW1V — suits, dresses and garments collected, altered, and returned without a shop visit.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-soho',
    title: 'Tailor Near Me in Soho London — Collection Service',
    excerpt: 'Fine Tailors collects from Soho W1D/W1F — from Wardour Street to Dean Street — and returns garments altered in 5–7 days.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-fitzrovia',
    title: 'Tailor Near Me in Fitzrovia London — Collection Service',
    excerpt: 'Collection-based tailoring for Fitzrovia W1T/W1W — Charlotte Street, Fitzroy Square, and the creative offices of the area.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-bloomsbury',
    title: 'Tailor Near Me in Bloomsbury London — Collection Service',
    excerpt: 'Fine Tailors collects from Bloomsbury WC1/WC2 — Russell Square, Bedford Square, and the residential streets of the area.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-covent-garden',
    title: 'Tailor Near Me in Covent Garden London — Collection Service',
    excerpt: 'Doorstep tailoring in Covent Garden WC2 — Long Acre, Floral Street, and the residential streets near the Piazza.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-islington',
    title: 'Tailor Near Me in Islington London — Collection Service',
    excerpt: 'Fine Tailors collects from Islington N1 — Upper Street, Canonbury and Barnsbury — and returns garments in 5–7 days.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-notting-hill',
    title: 'Tailor Near Me in Notting Hill London — Collection Service',
    excerpt: 'From Portobello Road to Westbourne Grove — Fine Tailors collects from W11 addresses and returns garments perfectly altered.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-paddington',
    title: 'Tailor Near Me in Paddington London — Collection Service',
    excerpt: 'Fine Tailors covers Paddington W2 — Little Venice canal-side apartments to Sussex Gardens — collected and returned in 5–7 days.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-fulham',
    title: 'Tailor Near Me in Fulham London — Collection Service',
    excerpt: 'The answer to "tailor near me" in Fulham SW6 — suits and garments collected from your Parsons Green or Fulham Road address.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-clerkenwell',
    title: 'Tailor Near Me in Clerkenwell London — Collection Service',
    excerpt: 'Fine Tailors collects from Clerkenwell EC1 — Exmouth Market, St John Street, and the creative studios of the area.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-south-kensington',
    title: 'Tailor Near Me in South Kensington London — Collection Service',
    excerpt: 'Collection-based tailoring in South Kensington SW7 — Thurloe Square, Onslow Gardens, and the museum-quarter residences.',
    date: '2026-05-25',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-mayfair',
    title: 'Tailor Near Me in Mayfair London — Collection Service',
    excerpt: 'How Fine Tailors serves Mayfair W1 — collecting from your door, altering suits and luxury garments, and returning them perfect in 5–7 days.',
    date: '2026-05-24',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-chelsea',
    title: 'Tailor Near Me in Chelsea London — Collection Service',
    excerpt: 'The answer to "tailor near me" in Chelsea SW3/SW10 — a collection service that comes to your King\'s Road or Cheyne Walk address.',
    date: '2026-05-24',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-kensington',
    title: 'Tailor Near Me in Kensington London — Collection Service',
    excerpt: 'Fine Tailors collects from your Kensington W8 door, alters suits and luxury garments, and returns them pressed and perfect in 5–7 days.',
    date: '2026-05-24',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-canary-wharf',
    title: 'Tailor Near Me in Canary Wharf — Collection Service',
    excerpt: 'Suit alterations for finance professionals in E14 — collected from your Canada Square apartment or office, returned in 5–7 days.',
    date: '2026-05-24',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-shoreditch',
    title: 'Tailor Near Me in Shoreditch London — Collection Service',
    excerpt: 'From blazers for client meetings to leather jackets and vintage finds — Fine Tailors collects from your E1/EC2A door and handles it all.',
    date: '2026-05-24',
    readTime: '5 min read',
  },
  {
    slug: 'tailor-near-me-city-of-london',
    title: 'Tailor Near Me in City of London — Collection Service',
    excerpt: 'The Square Mile\'s collection-based tailoring service — suits collected from EC1–EC4 offices and apartments, returned in 5–7 days.',
    date: '2026-05-24',
    readTime: '5 min read',
  },
  // ── New FAQ posts (May 2026) ──────────────────────────────────────────────
  {
    slug: 'what-is-a-good-suit-fit',
    title: 'What Is a Good Suit Fit? 5 Checks Every Man Should Know',
    excerpt: 'The five points a master tailor checks on every suit — from shoulders to trouser break — and why getting each one right matters.',
    date: '2026-05-23',
    readTime: '7 min read',
  },
  {
    slug: 'alterations-that-make-suit-look-expensive',
    title: '5 Alterations That Make a Suit Look More Expensive',
    excerpt: 'The alterations with the highest visual return — transforming an average off-the-peg suit into something that looks genuinely expensive.',
    date: '2026-05-23',
    readTime: '6 min read',
  },
  {
    slug: 'how-long-do-alterations-take',
    title: 'How Long Do Clothing Alterations Take in London?',
    excerpt: 'From simple hems to shoulder reconstruction — realistic turnaround times for every type of alteration, and when same-day service is possible.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-prepare-for-tailor-visit',
    title: 'How to Prepare for a Tailor\'s Home Visit',
    excerpt: 'What to wear, what to gather, and how to communicate what you want — the six things that make a home tailor visit more effective.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'is-it-worth-altering-cheap-clothes',
    title: 'Is It Worth Altering Cheap Clothes?',
    excerpt: 'An honest guide to the value equation — when altering inexpensive garments makes financial sense and when it does not.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-make-jeans-fit-better',
    title: 'How to Make Jeans Fit Better — Ask a Tailor',
    excerpt: 'Tapering, waist adjustment, same-finish hem — what a tailor can do to a pair of jeans, and what each alteration typically costs.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'what-can-a-tailor-do-to-a-shirt',
    title: 'What Can a Tailor Do to a Shirt?',
    excerpt: 'Body slimming, sleeve shortening, length reduction, cuff adjustment — the full range of shirt alterations and typical costs.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'can-a-tailor-make-clothes-bigger',
    title: 'Can a Tailor Make Clothes Bigger?',
    excerpt: 'Yes — by letting out seams. A guide to when it works, how much bigger a garment can be made, and the one limit that cannot be overcome.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'how-many-sizes-can-a-suit-be-altered',
    title: 'How Many Sizes Can a Suit Be Altered?',
    excerpt: 'The structural limits of suit alterations — how much the body can be taken in or let out, and why shoulders are the hardest constraint.',
    date: '2026-05-23',
    readTime: '6 min read',
  },
  {
    slug: 'dress-alteration-cost-london',
    title: 'How Much Do Dress Alterations Cost in London?',
    excerpt: 'Transparent pricing for dress shortening, taking in, zip replacement, and specialist work on delicate or beaded fabrics.',
    date: '2026-05-23',
    readTime: '5 min read',
  },
  {
    slug: 'trouser-alteration-cost-london',
    title: 'How Much Do Trouser Alterations Cost in London?',
    excerpt: 'A full price guide for trouser hemming, tapering, waist adjustment, and pocket work — plus what makes some trouser jobs more expensive.',
    date: '2026-05-23',
    readTime: '4 min read',
  },
  {
    slug: 'can-a-tailor-fix-a-broken-zip',
    title: 'Can a Tailor Fix a Broken Zip?',
    excerpt: 'Yes — from slider repair to full replacement on jackets, dresses, and trousers. What each type of zip job involves and what it costs.',
    date: '2026-05-23',
    readTime: '4 min read',
  },
  // ── Original posts ────────────────────────────────────────────────────────
  {
    slug: 'complete-guide-suit-alterations-london',
    title: 'The Complete Guide to Suit Alterations in London',
    excerpt: 'Every alteration type, realistic prices, how to choose a tailor, and why collection-based tailoring works for busy London professionals.',
    date: '2026-05-21',
    readTime: '12 min read',
  },
  {
    slug: 'how-to-know-if-suit-needs-altering',
    title: 'How to Know If Your Suit Needs Altering',
    excerpt: 'The 7 signs your suit doesn\'t fit right — and which alterations are worth doing. A practical guide for London professionals.',
    date: '2026-05-21',
    readTime: '7 min read',
  },
  {
    slug: 'suit-alterations-canary-wharf',
    title: 'Suit Alterations in Canary Wharf: A Guide for Finance Professionals',
    excerpt: 'How E14 finance workers get their suits altered without leaving Canary Wharf — and why a collection service is the practical answer.',
    date: '2026-05-21',
    readTime: '6 min read',
  },
  {
    slug: 'collection-tailor-vs-shop-london',
    title: 'Collection Tailor vs High Street Shop London — Which Is Better?',
    excerpt: 'An honest comparison of collection-based tailoring vs a high-street alteration shop. When each makes sense for London clients.',
    date: '2026-05-21',
    readTime: '7 min read',
  },
  {
    slug: 'wedding-dress-alterations-london',
    title: 'Wedding Dress Alterations in London: Timeline and What to Expect',
    excerpt: 'When to book, what can be altered, realistic costs, and why a collection service is safer for a delicate bridal gown.',
    date: '2026-05-21',
    readTime: '8 min read',
  },
  {
    slug: 'leather-jacket-alterations-london-guide',
    title: 'Leather Jacket Alterations in London: What to Expect',
    excerpt: 'What can and cannot be altered on a leather jacket — and why specialist handling is non-negotiable for premium leather garments.',
    date: '2026-05-21',
    readTime: '6 min read',
  },
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
      <script type="application/ld+json"
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
                className="border border-divider hover:border-hunter hover:bg-hunter/5 transition-colors duration-200 group overflow-hidden"
              >
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src="/images/tailor.jpg"
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
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
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
