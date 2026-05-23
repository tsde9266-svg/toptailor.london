import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '5 Alterations That Make a Suit Look More Expensive | Fine Tailors London',
  description: 'The five tailoring alterations that have the biggest visual impact on a suit — transforming an average off-the-peg garment into something that looks genuinely expensive.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/alterations-that-make-suit-look-expensive' },
  keywords: [
    'alterations that make suit look expensive',
    'suit fit upgrades london',
    'suit alterations worth doing',
    'how to make suit look better london',
    'best suit alterations london',
  ],
  openGraph: {
    title: '5 Alterations That Make a Suit Look More Expensive',
    description: 'The alterations with the biggest visual return — from waist suppression to the perfect trouser break.',
    url: 'https://www.finetailors.co.uk/blog/alterations-that-make-suit-look-expensive',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Suit alterations that improve fit and look' }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: '5 Alterations That Make a Suit Look More Expensive',
  description: 'The five tailoring alterations that have the biggest visual impact on how expensive a suit looks.',
  image: 'https://www.finetailors.co.uk/og-image.png',
  author: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors' },
  publisher: { '@type': 'Organization', '@id': 'https://www.finetailors.co.uk/#organization', name: 'Fine Tailors', logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' } },
  datePublished: '2026-05-23',
  dateModified: '2026-05-23',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/alterations-that-make-suit-look-expensive' },
  keywords: 'alterations that make suit look expensive, suit fit upgrades london, best suit alterations london',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: '5 Alterations That Make a Suit Look More Expensive', item: 'https://www.finetailors.co.uk/blog/alterations-that-make-suit-look-expensive' },
  ],
}

export default function AlterationsThatMakeSuitLookExpensive() {
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
            <span>5 Alterations That Make a Suit Look More Expensive</span>
          </nav>

          <div className="font-sans text-xs text-muted mb-6">23 May 2026 · 6 min read</div>

          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-8">
            5 Alterations That Make a Suit Look More Expensive
          </h1>

          <div className="relative w-full h-56 lg:h-72 overflow-hidden mb-10">
            <Image src="/images/tailor.jpg" alt="A well-fitted suit after tailoring alterations" fill className="object-cover" />
          </div>

          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-8">
            The difference between a £300 suit and a £3,000 suit is partly fabric and construction — but a large part of it is <strong>fit</strong>. An average suit, properly altered, can look genuinely impressive. An expensive suit worn badly fitting looks ordinary. These are the five alterations with the highest visual return.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">1. Jacket Waist Suppression</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Off-the-peg suits are cut for an averaged body. The jacket often hangs straight from the chest with little shape through the waist. Waist suppression — taking in the side seams to create an hourglass shape through the torso — is the single alteration that most dramatically changes how a suit reads. A suppressed waist makes a man look taller, more defined, and the suit itself more intentional. The effect is visible from across a room.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">2. Sleeve Length — The Shirt Cuff Signal</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Exposing exactly half an inch of shirt cuff below the jacket sleeve is one of the most immediate visual signals of a well-dressed man. It is also one of the easiest fixes — sleeve shortening is a routine alteration — yet it is surprisingly often overlooked. Sleeves that are too long bury the cuff entirely. Sleeves too short expose too much. Get this right, and the whole suit looks more considered.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">3. Trouser Leg Taper</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            Wide trouser legs add visual weight and make the wearer look shorter and heavier. A tapered leg — slimmed from the thigh to the ankle — creates a cleaner, more modern silhouette. Combined with the right trouser break, a tapered leg has an outsized effect on how the whole suit reads. This is particularly effective on suits bought a few years ago when the cut was fuller.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">4. The Trouser Break — Precise and Intentional</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The break is the fold of fabric where the trouser leg meets the shoe. In contemporary dressing, no break (trousers ending cleanly at the top of the shoe) or a slight break reads as considered and modern. A full break — the trouser leg pooling over the shoe — reads as dated and often makes a man look shorter. Shortening trousers to the right break point costs little and changes the entire proportion of the outfit.
          </p>

          <h2 className="font-playfair text-2xl font-medium text-charcoal mb-3">5. Back Seam and Seat — The View from Behind</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            The back of a suit is seen as often as the front. A jacket that sags at the back, or trousers with excess fabric pooling in the seat, undermine an otherwise well-fitted suit. Taking in the back seam of the jacket creates a cleaner fall from shoulder to hem. Reducing the seat removes the drooping fold that makes cheap suits look cheap. These two alterations are less commonly discussed but deliver a significant upgrade to the overall appearance.
          </p>

          <div className="bg-hunter/5 border border-hunter/20 px-6 py-5 mb-12">
            <p className="font-playfair text-lg text-charcoal mb-2">The compound effect</p>
            <p className="font-sans font-light text-muted text-[0.9rem] leading-relaxed">
              These five alterations are most powerful when done together. A suit with a suppressed waist, correct sleeve length, tapered leg, clean break, and a tidy back seam looks — to any observer — like a suit that cost significantly more than it did. The total alteration cost is typically £80–150. The visual upgrade is disproportionate to the investment.
            </p>
          </div>

          <div className="border-t border-divider pt-10">
            <p className="font-playfair text-xl font-medium text-charcoal mb-4">Transform your suit</p>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Fine Tailors visits your home and assesses every fit point in person. <Link href="/get-started" className="text-hunter underline">Book a visit</Link> — we will tell you exactly which alterations will make the biggest difference on your specific suit.
            </p>
            <Link href="/blog" className="font-sans text-sm font-light text-muted underline">← Back to Blog</Link>
          </div>

        </article>
      </main>
      <Footer />
    </>
  )
}
