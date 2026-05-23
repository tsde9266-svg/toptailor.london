import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Coat Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert coat and overcoat alterations in London — shortening, sleeve adjustment, taking in and lining repair, collected from your home. Returned perfect in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/coat-alterations-london' },
  openGraph: {
    title: 'Coat Alterations London | Fine Tailors',
    description: 'Professional coat alterations collected from your London door. Shortening, sleeve work, body adjustment — returned perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/coat-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Coat alterations London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Coat Alterations London', item: 'https://www.finetailors.co.uk/coat-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Coat Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional coat and overcoat alterations in London collected from your home. Shortening, sleeve adjustment, body take-in and lining repair.',
  serviceType: 'Coat Alterations',
}

const alterationTypes = [
  { title: 'Coat Shortening', desc: 'Reducing the coat length to modernise the silhouette or improve proportion. From £45.' },
  { title: 'Sleeve Shortening', desc: 'Adjusting sleeve length — particularly important on structured overcoats. From £30.' },
  { title: 'Body Take-In', desc: 'Taking in the body of the coat for a more fitted, contemporary look. From £18.' },
  { title: 'Shoulder Adjustment', desc: 'Correcting shoulder fit on overcoats — technically demanding, quoted on inspection.' },
  { title: 'Lining Replacement', desc: 'Replacing worn or torn coat lining with quality matching fabric. From £60.' },
  { title: 'Button Replacement', desc: 'Replacing worn or mismatched buttons to refresh a coat. From £15.' },
  { title: 'Collar Repair & Reattachment', desc: 'Repairing worn collar areas or reattaching a detached collar. Quoted on inspection.' },
  { title: 'Pocket Repair', desc: 'Repairing torn pocket linings and re-stitching pocket openings. From £20.' },
]

export default function CoatAlterationsLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Coat Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Day Turnaround</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Coat Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides expert <strong>coat alterations in London</strong> collected from your home or office. Overcoats, topcoats, trench coats and wool coats — altered, relived and returned pressed in 5–7 working days.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Coat Alterations for London&apos;s Winters — Without the Shop Visit</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A well-fitting coat is one of the most visible things you wear. It shapes your silhouette in public, in the office and on the street. Yet coat alterations are often more complex than jacket work — thicker fabrics, structured linings and the length of the garment all require skill and time. Many tailors turn coat work away or rush it.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects your coat from your Central London address and returns it altered, pressed and refreshed. We handle overcoats, trench coats, duffle coats, cashmere topcoats and structured wool coats. For luxury garments — Burberry, Aquascutum, Crombie — we treat every piece with the care it deserves.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Covering <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Coat Alterations We Specialise In</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {alterationTypes.map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Minimum order £20. All prices include collection and return to your London address.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your Central London home, office or hotel.'],
              ['We Collect Your Coat', 'We collect your coat at the agreed time. No travel, no waiting at a shop.'],
              ['We Alter and Restore', 'Your coat is worked on in our specialist workshop. A written quote is sent and approved before work begins.'],
              ['Returned, Pressed and Perfect', 'Within 5–7 working days your coat is back at your door, pressed and ready.'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-6">
                <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">{i + 1}</span>
                <div>
                  <h3 className="font-playfair font-medium text-charcoal mb-1">{title}</h3>
                  <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Our Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had my grandfather&apos;s Crombie overcoat shortened and the lining replaced. They treated it like it was their own. Back in a week, looking like new.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Charlotte, Belgravia</cite>
          </blockquote>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Coat Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/jacket-alterations-london" className="text-hunter underline">jacket alterations service</Link> and{' '}
            <Link href="/leather-jacket-alterations-london" className="text-hunter underline">leather jacket alterations service</Link>.
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
