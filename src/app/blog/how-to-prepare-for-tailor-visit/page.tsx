import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Prepare for a Tailor\'s Home Visit | Fine Tailors London',
  description: 'Everything you need to know before a tailor visits your home — what to wear, what to prepare, and how to get the most out of the appointment.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/how-to-prepare-for-tailor-visit' },
  keywords: [
    'how to prepare for tailor home visit london',
    'tailor visit what to expect london',
    'home tailor visit tips london',
    'before tailor comes to your home',
    'mobile tailor home visit london',
  ],
  openGraph: {
    title: 'How to Prepare for a Tailor\'s Home Visit',
    description: 'What to wear, what to prepare, and how to communicate what you want — making the most of a home tailor visit in London.',
    url: 'https://www.finetailors.co.uk/blog/how-to-prepare-for-tailor-visit',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'How to prepare for tailor home visit London' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Prepare for a Tailor\'s Home Visit',
  description: 'Everything you need to know before a tailor visits your home — what to wear, what to prepare, and how to get the most out of the appointment.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/how-to-prepare-for-tailor-visit' },
  keywords: 'how to prepare for tailor home visit london, tailor visit what to expect london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'How to Prepare for a Tailor\'s Home Visit', item: 'https://www.finetailors.co.uk/blog/how-to-prepare-for-tailor-visit' },
  ],
}

export default function HowToPrepareForTailorVisit() {
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
            <span>How to Prepare for a Tailor&apos;s Home Visit</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 5 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            How to Prepare for a Tailor&apos;s Home Visit
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="Tailor arriving for a home visit consultation in London" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            A tailor visiting your home is far more convenient than taking garments to a shop — but getting the most out of the appointment takes a little preparation. A well-prepared client gets a faster, more accurate fitting and a better result. Here is exactly what to do before your tailor arrives.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">1. Wear the Right Shoes</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This is the most commonly overlooked preparation step. Trouser length and break are measured relative to your foot height — a trainer-height shoe and a formal shoe create completely different break points. When trying on trousers or a suit for alteration, wear the shoes you will most often wear with that garment. If you want your suit trousers hemmed for Oxford shoes, wear your Oxfords at the fitting.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">2. Have the Garments Clean and Pressed</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A tailor assesses how a garment sits and falls on the body. If it is creased or unwashed, it may hang differently than it does clean — giving a slightly false picture of the fit. Garments should ideally be clean, but they need not be freshly pressed; a simple shake-out is usually enough. For structured garments like suits, try to avoid heavy creasing by hanging them in a warm room beforehand.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">3. Know What You Want Changed</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The more specifically you can articulate the problem, the better. &ldquo;The jacket feels too baggy&rdquo; is helpful. &ldquo;The jacket feels baggy at the waist and I want a more defined shape through the torso&rdquo; is even better. If you have a visual reference — a photo of a fit you like, or a garment that fits well as a comparison point — bring it.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            You do not need to know tailoring terminology. A good tailor translates what you describe into the correct technical alteration — but the more clearly you express what bothers you about the fit, the more precisely it can be addressed.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">4. Gather All the Garments You Want Assessed</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            This sounds obvious but is often forgotten. Go through your wardrobe before the appointment and pull out anything you have been meaning to get altered — not just the item you specifically booked for. A tailor visiting your home can assess multiple garments in one appointment, which is far more efficient than separate visits for each piece. Having three suits, two pairs of trousers, and a couple of shirts ready means you get everything sorted in one go.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">5. Have a Clear Space</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            A tailor needs to walk around you and assess the garment from all angles — front, back, and sides. A clear area of roughly 2 metres by 2 metres is sufficient. A hallway, bedroom, or living room all work well. The tailor brings their own equipment; you only need to provide the space and the garments.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-4">6. Note Any Specific Concerns in Advance</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-12">
            If you have a tight deadline — a wedding, a job interview, a specific date by which you need the garment — mention it when booking and repeat it at the start of the visit. A good tailor will work to your timeline and tell you honestly if it is achievable. Better to know early than to find out the day before you need the suit.
          </p>

          <div className="bg-hunter/5 border border-hunter/20 px-6 py-5 mb-12">
            <p className="font-playfair text-lg text-charcoal mb-2">What the tailor will do</p>
            <p className="font-sans font-light text-muted text-[0.9rem] leading-relaxed">
              At Fine Tailors, the visit works like this: the tailor arrives, you try on each garment, the tailor pins and marks the alterations in person, you agree the work and the quote, and the garments are collected. Everything is returned to you once altered — no follow-up trips, no carrying bags across London.
            </p>
          </div>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Ready to book?</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              <Link href="/get-started" className="text-hunter underline">Book a home visit</Link> — we come to you, assess in person, and return your altered garments to your door.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
