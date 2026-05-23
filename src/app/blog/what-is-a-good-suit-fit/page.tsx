import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'What Is a Good Suit Fit? 5 Checks Every Man Should Know | Fine Tailors',
  description: 'A master tailor\'s guide to what a well-fitting suit actually looks like — from shoulders to trouser break. The five checks that separate a great suit from an average one.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/what-is-a-good-suit-fit' },
  keywords: [
    'what is a good suit fit',
    'how should a suit fit',
    'suit fitting guide london',
    'suit fit checklist',
    'well fitting suit london',
  ],
  openGraph: {
    title: 'What Is a Good Suit Fit? 5 Checks Every Man Should Know',
    description: 'The five checks a master tailor uses to assess suit fit — shoulders, chest, length, sleeves, and trousers.',
    url: 'https://www.finetailors.co.uk/blog/what-is-a-good-suit-fit',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Good suit fit guide London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What Is a Good Suit Fit? 5 Checks Every Man Should Know',
  description: 'A master tailor\'s guide to what a well-fitting suit actually looks like — from shoulders to trouser break.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/what-is-a-good-suit-fit' },
  keywords: 'what is a good suit fit, how should a suit fit, suit fitting guide london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'What Is a Good Suit Fit', item: 'https://www.finetailors.co.uk/blog/what-is-a-good-suit-fit' },
  ],
}

export default function WhatIsAGoodSuitFit() {
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
            <span>What Is a Good Suit Fit</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 7 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            What Is a Good Suit Fit? 5 Checks Every Man Should Know
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Master tailor assessing suit fit at a client's home" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            Most men can tell when a suit looks bad. Fewer can articulate why. The difference between a suit that commands a room and one that looks borrowed comes down to five specific points of fit — and most of them are fixable by an experienced tailor. Here is what to check.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">1. Shoulders — The Non-Negotiable</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The shoulder seam must sit precisely at the edge of your shoulder — not rolling down your arm, not sitting in from the edge. When the shoulder is wrong, the whole jacket twists, pulls, and divides opinion. This is the one measurement you cannot easily alter: always buy a suit where the shoulders are correct. Everything else is secondary.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">2. Chest — Close Without Pulling</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Button the jacket. The chest should close cleanly, with no pulling across the front and no visible X-shaped creases radiating from the button. When you open the jacket, you should be able to fit a loose fist between the lapels and your chest.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A jacket that gaps open at the chest is too small. One that hangs away from the body in the front is too large. Both are fixable: a tailor can suppress the waist and chest to create a cleaner silhouette, or take in excess fabric across the front panels.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">3. Jacket Length — Covering the Seat</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The classic test: curl your fingers under the hem of the jacket. The hem should rest in your palm. Alternatively, the jacket should just cover the seat of your trousers when standing naturally.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A jacket that is too long makes a man look shorter; one that is too short exposes the seat and looks unfinished. Jacket length can be shortened by a tailor, though it is a moderately complex alteration. It cannot be lengthened.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">4. Sleeve Length — The Shirt Cuff Rule</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            With arms relaxed at your sides, the jacket sleeve should end so that approximately half an inch (1.2 cm) of your shirt cuff is visible. This is the universal standard in English tailoring and one of the most visible markers of a well-fitted suit.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Sleeve length is one of the easiest and most common alterations a tailor makes. If a suit fits well everywhere else but the sleeves are too long, do not overlook it — the fix is straightforward and the improvement to the overall look is significant.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">5. Trouser Break — A Matter of Taste, Precisely Executed</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The &ldquo;break&rdquo; is where the trouser leg meets the shoe. Contemporary dressing leans towards no break or a slight break — the trousers ending cleanly at the top of the shoe, or with a very small fold of fabric. A full break (trousers pooling over the shoe) reads as outdated in most modern contexts.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            Trouser length is perhaps the most common alteration of all. Whatever your preferred break, a tailor can set it precisely to your shoe height and posture — something a tailor assessing you in person can do far more accurately than a shop alteration.
          </p>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Get every point of fit corrected</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Fine Tailors visits your home to assess and alter your suits in person. <Link href="/get-started" className="text-hunter underline">Book a visit</Link> — we address all five fit points in a single appointment.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
