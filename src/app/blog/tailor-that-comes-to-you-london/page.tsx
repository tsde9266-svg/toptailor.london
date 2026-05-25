import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor That Comes to You London | Home Collection Service | Fine Tailors',
  description: 'Fine Tailors is the London tailor that comes to you. We collect your garments from your Central London door, alter them at our workshop, and return them in 5-7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london' },
  openGraph: {
    title: 'Tailor That Comes to You London | Home Collection Service | Fine Tailors',
    description: 'Fine Tailors is the London tailor that comes to you. We collect your garments from your Central London door, alter them at our workshop, and return them in 5-7 days.',
    url: 'https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' },
    { '@type': 'ListItem', position: 3, name: 'A Tailor That Comes to You in London — How Fine Tailors Works', item: 'https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': 'https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london',
  url: 'https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london',
  headline: 'A Tailor That Comes to You in London — How Fine Tailors Works',
  description: 'Fine Tailors is the London tailor that comes to you. We collect your garments from your Central London door, alter them at our workshop, and return them in 5-7 days.',
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
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london' },
  isPartOf: { '@id': 'https://www.finetailors.co.uk/#website' },
}

export default function TailorThatComesToYouLondon() {
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
            <span>A Tailor That Comes to You in London — How Fine Tailors Works</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Fine Tailors · London · 2026-05-25</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            A Tailor That Comes to You in London {' '}
            <em className="font-playfair italic">The Collection-Based Service Explained</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Finding a tailor that comes to you sounds like a luxury reserved for a different era — the kind of thing that happened before high street shops took over every city centre. In London today, it is not only possible but increasingly the preferred option for anyone who owns clothes worth caring about.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why a Tailor That Comes to You Makes Sense in London</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The city has a geography problem for traditional tailoring. A good alteration takes time to book, carry to, and collect from. If you live in Mayfair and the best tailor you know of is in Battersea, you are looking at a significant time commitment — and that is before you factor in carrying delicate or valuable garments on public transport.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors was built around this reality. We collect your garments from your door, alter them at our specialist workshop, and return them pressed and ready to wear — typically within 5–7 working days. The tailor comes to your door, not the other way around.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            This model suits London professionals particularly well: finance workers in the City who need suits in continuous rotation, creatives in Soho and Fitzrovia who care deeply about how their clothes fit, residents across Mayfair, Knightsbridge and Chelsea who value discretion and convenience equally.
          </p>

        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">What a Tailor That Comes to You Can Do</h2>
          <table className="w-full max-w-3xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-6 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Details</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Suit Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Jacket, trouser and waistcoat work — taking in, letting out, sleeve shortening, trouser hemming and tapering. From £25.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Trouser & Jean Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Hemming, tapering, waist adjustments, original hem preservation on jeans. From £18.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Dress Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Shortening, taking in, zip work, strap adjustments. Evening gowns, day dresses and occasion wear. From £22.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Jacket & Coat Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Sleeve shortening, body tapering, relining, coat shortening. From £30.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Wedding Dress Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Specialist handling for bridal wear — quoted on inspection after collection.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Leather Jacket Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Expert leather work including zip replacement, sleeve shortening and body tapering — quoted on inspection.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Shirt Alterations</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Sleeve shortening, body tapering, collar adjustments. From £20.</td>
            </tr>
            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">Zip Repair & Replacement</td>
              <td className="py-3 font-sans font-light text-sm text-muted">Trouser zips from £25, dress zips from £28, jacket and coat zips from £35.</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">The Collection Process — Step by Step</h2>
          <ol className="space-y-6">
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">1</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">Book a Collection Slot</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">Book online or call. We confirm a time at your address — morning, afternoon or evening.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">2</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">We Collect From Your Door</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">We arrive at the agreed time. Collection is from your doorstep — the tailor does not enter your home.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">3</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">Written Quote Sent for Approval</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">We inspect every garment and send a written quote before any work begins. Nothing is altered without your sign-off.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">4</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">We Alter at Our Workshop</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">Every piece is worked on in our workshop with full attention. No shop floor, no queue.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">5</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">We Return, Pressed and Perfect</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">Within 5–7 working days your garments are back at your door, pressed and ready to wear.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Areas Where We Collect</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            <Link href="/tailor-mayfair" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Mayfair</Link>
            <Link href="/tailor-knightsbridge" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Knightsbridge</Link>
            <Link href="/tailor-chelsea" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Chelsea</Link>
            <Link href="/tailor-kensington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Kensington</Link>
            <Link href="/tailor-belgravia" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Belgravia</Link>
            <Link href="/tailor-marylebone" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Marylebone</Link>
            <Link href="/tailor-westminster" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Westminster</Link>
            <Link href="/tailor-soho" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Soho</Link>
            <Link href="/tailor-fitzrovia" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Fitzrovia</Link>
            <Link href="/tailor-bloomsbury" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Bloomsbury</Link>
            <Link href="/tailor-islington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Islington</Link>
            <Link href="/tailor-city-of-london" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">City of London</Link>
            <Link href="/tailor-notting-hill" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Notting Hill</Link>
            <Link href="/tailor-pimlico" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Pimlico</Link>
            <Link href="/tailor-victoria" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Victoria</Link>
            <Link href="/tailor-south-kensington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">South Kensington</Link>
            <Link href="/tailor-fulham" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Fulham</Link>
            <Link href="/tailor-paddington" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Paddington</Link>
            <Link href="/tailor-covent-garden" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Covent Garden</Link>
            <Link href="/tailor-clerkenwell" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Clerkenwell</Link>
            <Link href="/tailor-canary-wharf" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Canary Wharf</Link>
            <Link href="/tailor-shoreditch" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">Shoreditch</Link>
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            See our <Link href="/mobile-tailor-london" className="text-hunter underline">mobile tailoring service</Link> for full details,
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
