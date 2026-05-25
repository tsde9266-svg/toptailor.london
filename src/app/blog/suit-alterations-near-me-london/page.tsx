import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Suit Alterations Near Me London | Collected From Your Door | Fine Tailors',
  description: 'Looking for suit alterations near you in London? Fine Tailors collects from your Central London door and returns your suit perfectly fitted in 5-7 days. No shop visit.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/suit-alterations-near-me-london' },
  openGraph: {
    title: 'Suit Alterations Near Me London | Collected From Your Door | Fine Tailors',
    description: 'Looking for suit alterations near you in London? Fine Tailors collects from your Central London door and returns your suit perfectly fitted in 5-7 days. No shop visit.',
    url: 'https://www.finetailors.co.uk/blog/suit-alterations-near-me-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'Suit Alterations Near Me in London — Why Nearest Is Not Always Best', item: 'https://www.finetailors.co.uk/blog/suit-alterations-near-me-london' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': 'https://www.finetailors.co.uk/blog/suit-alterations-near-me-london',
  url: 'https://www.finetailors.co.uk/blog/suit-alterations-near-me-london',
  headline: 'Suit Alterations Near Me in London — Why Nearest Is Not Always Best',
  description: 'Looking for suit alterations near you in London? Fine Tailors collects from your Central London door and returns your suit perfectly fitted in 5-7 days. No shop visit.',
  datePublished: '2026-05-25',
  dateModified: '2026-05-25',
  author: {
    '@type': 'Organization',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    logo: { '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/suit-alterations-near-me-london' },
  isPartOf: { '@id': 'https://www.finetailors.co.uk/#website' },
}

export default function SuitAlterationsNearMeLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Suit Alterations Near Me in London — Why Nearest Is Not Always Best</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Fine Tailors · London · 2026-05-25</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Suit Alterations Near Me in London {' '}
            <em className="font-playfair italic">Why Collection Beats Proximity</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            When you search &ldquo;suit alterations near me&rdquo; in London, you get a map of local shops — some of which you have never heard of, with reviews that tell you little about the quality of work on a tailored suit versus a pair of budget trousers. There is a better question to ask: which service is best for your specific garment, regardless of distance?
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">The Problem With Nearest</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The closest alteration shop to your postcode may be perfectly good for a quick hem. But for a well-made suit — bespoke, made-to-measure, or even a quality off-the-peg — the alteration matters as much as the original construction. The wrong cut on a jacket chest or a badly pitched trouser seat is more damaging than wearing the suit slightly long.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors operates on a different model. We are not the nearest option to any single postcode. Instead, we collect from every Central London postcode — W1, SW1, SW3, SW7, W8, WC1, WC2, EC1, EC2, E14, N1, W11, W2 and surrounding areas — and bring every suit back to our specialist workshop. The result is consistent, expert work regardless of where in Central London you live or work.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The collection model also eliminates the most inconvenient part of using a high street shop: getting there and back with your suit. Collection and return at your door means the service fits around you.
          </p>

        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">What Suit Alterations We Provide</h2>
          <table className="w-full max-w-3xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-6 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Details</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Jacket Taking In or Letting Out</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Body width adjustment at the side seams — the most common suit jacket alteration. From £35.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Sleeve Shortening</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Shortening the jacket sleeves with or without working buttonholes. From £25.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Trouser Hemming</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Plain hem or turn-up hem — the most common trouser alteration. From £18.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Trouser Tapering</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Narrowing the trouser leg for a modern silhouette. From £22.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Trouser Waist Adjustment</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Taking in or letting out the trouser waist at the back. From £22.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Jacket Shoulder Adjustment</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Shoulder alterations are complex — quoted on inspection after collection.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Full Suit Re-Cut</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Comprehensive alteration of jacket and trousers together — quoted on inspection.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Trouser Seat Adjustment</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Seat letting out or taking in for fit through the hips and thighs. From £28.</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">1</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">Book Online or Call</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">Choose your collection slot. We serve all Central London postcodes seven days a week.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">2</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">We Come to Your Door</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">We collect your suit at the agreed time. Doorstep only — no need to be in more than a moment.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">3</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">Written Quote Approved</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">We send a written quote for your sign-off before a single stitch is placed.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">4</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">Altered at Our Workshop</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">Every suit is worked on by one tailor — our Single Needle Guarantee.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">5</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">Returned in 5-7 Working Days</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">Your suit comes back to your door, pressed and ready for its next outing.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Areas We Cover for Suit Alterations</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            <Link href="/suit-alterations-mayfair" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Mayfair</Link>
            <Link href="/suit-alterations-chelsea" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Chelsea</Link>
            <Link href="/suit-alterations-knightsbridge" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Knightsbridge</Link>
            <Link href="/tailor-kensington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Kensington</Link>
            <Link href="/tailor-belgravia" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Belgravia</Link>
            <Link href="/tailor-marylebone" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Marylebone</Link>
            <Link href="/tailor-westminster" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Westminster</Link>
            <Link href="/tailor-soho" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Soho</Link>
            <Link href="/tailor-fitzrovia" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Fitzrovia</Link>
            <Link href="/tailor-bloomsbury" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Bloomsbury</Link>
            <Link href="/tailor-islington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Islington</Link>
            <Link href="/tailor-city-of-london" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">City of London</Link>
            <Link href="/tailor-canary-wharf" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Canary Wharf</Link>
            <Link href="/tailor-notting-hill" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Notting Hill</Link>
            <Link href="/tailor-pimlico" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Pimlico</Link>
            <Link href="/tailor-south-kensington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">South Kensington</Link>
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            See our <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service</Link> for full details,
            or book directly below. We cover all Central London postcodes seven days a week.
          </p>
          <div className="flex gap-6 flex-wrap items-center">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
              +44 7438 145169
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
