import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Jacket Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert jacket alterations in London — sleeve shortening, body take-in, lining repair and more, collected from your home. Returned perfect in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/jacket-alterations-london' },
  openGraph: {
    title: 'Jacket Alterations London | Fine Tailors',
    description: 'Professional jacket alterations collected from your London door. Sleeve shorten, waist suppression, lining — returned perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/jacket-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Jacket alterations London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Jacket Alterations London', item: 'https://www.finetailors.co.uk/jacket-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Jacket Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Professional jacket alterations in London collected from your home. Sleeve shortening, body take-in, lining repair and shoulder adjustment.',
  serviceType: 'Jacket Alterations',
}

const alterationTypes = [
  { title: 'Sleeve Shortening', desc: 'Precise sleeve shortening with working buttonholes preserved. From £30.' },
  { title: 'Sleeve Lengthening', desc: 'Letting down sleeves where fabric allows. From £30.' },
  { title: 'Body Take-In (Waist Suppression)', desc: 'Taking in the side seams to create a sharper, more tailored silhouette. From £18.' },
  { title: 'Shoulder Adjustment', desc: 'The most technically demanding jacket alteration — handled by our master tailor. Quoted on inspection.' },
  { title: 'Back Seam Take-In', desc: 'Reducing the back to improve fit through the seat and shoulder blades. From £18.' },
  { title: 'Lining Repair or Replacement', desc: 'Replacing torn or worn jacket lining — invisible result. From £35.' },
  { title: 'Button Replacement', desc: 'Replacing buttons to update a jacket or match a missing button. From £15.' },
  { title: 'Collar & Lapel Adjustments', desc: 'Correcting collar roll, reattaching lapels or adjusting notch — quoted on inspection.' },
]

export default function JacketAlterationsLondon() {
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
            <span>Jacket Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · 5–7 Day Turnaround</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Jacket Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides professional <strong>jacket alterations in London</strong> collected from your home or office. Blazers, suit jackets, sports jackets and casual jackets — all altered to a precise fit and returned pressed within 5–7 working days.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Jacket Fit Matters — and Why Collection Makes It Easier</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A jacket that fits well transforms an outfit. One that doesn&apos;t — pulling across the shoulders, bunching at the waist, sleeves that show too much shirt — is hard to miss. <strong>Jacket alterations</strong> are often the single most impactful thing you can have done to an item of clothing, but they require a skilled tailor and, for complex adjustments, precision that only comes from proper assessment.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects your jacket from your Central London address, alters it in our specialist workshop, and returns it pressed and ready. We handle blazers, suit jackets, sports jackets and casual jackets — from off-the-peg pieces to luxury designer garments.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>, <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Jacket Alterations We Specialise In</h2>
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
              ['We Collect From Your Door', 'We collect your jacket at your chosen time. No travel, no dropping off at a shop.'],
              ['We Alter Your Jacket', 'Your jacket is worked on in our specialist workshop. A written quote is sent and approved before any work begins.'],
              ['Returned, Pressed and Perfect', 'Within 5–7 working days your jacket is back at your door, pressed and ready to wear.'],
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
              &ldquo;Three blazers collected from my City office. All came back with sleeves shortened and bodies taken in — sharp, perfectly fitted. Collected and returned without any disruption to my day.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Oliver, City of London</cite>
          </blockquote>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Jacket Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Also see our{' '}
            <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service</Link> and{' '}
            <Link href="/coat-alterations-london" className="text-hunter underline">coat alterations service</Link>.
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
