import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Same Day Alterations London | Express Service | Fine Tailors',
  description: 'Express and same-day clothing alterations in London — suit, dress and trouser alterations for urgent occasions, collected and returned as fast as possible.',
  alternates: { canonical: 'https://www.finetailors.co.uk/same-day-alterations-london' },
  openGraph: {
    title: 'Same Day Alterations London | Fine Tailors',
    description: 'Express clothing alterations in London for urgent occasions — collected and returned as fast as your timeline requires.',
    url: 'https://www.finetailors.co.uk/same-day-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Same day express alterations London service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Same Day Alterations London', item: 'https://www.finetailors.co.uk/same-day-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Same Day Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Express and same-day clothing alterations in London. Suit, trouser and dress alterations for urgent occasions, subject to availability.',
  serviceType: 'Same Day Alterations',
}

export default function SameDayAlterationsLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-sameday" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-service-sameday" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="schema-faq-sameday" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Same Day Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Express Service · Subject to Availability</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Same Day &amp; Express Alterations in London —{' '}
            <em className="font-playfair italic">Urgent Occasions Handled</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors offers express alteration services for urgent occasions — a last-minute event, an unexpected wedding, a suit that needs fixing before tomorrow&apos;s interview. Same-day service is subject to availability; call us to confirm and we will do everything we can to help.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <a href="tel:+447438145169" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Call to Check Availability
            </a>
            <Link href="/get-started" className="font-sans text-sm font-light text-charcoal underline self-center">
              Or book online →
            </Link>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">When You Need Alterations Fast</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Most alterations at Fine Tailors are completed within 5–7 working days as part of our standard collection service. This allows time to do the work properly — pressing, finishing, quality checking — without rushing. For most situations, this is the right timeline.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            However, life has a way of producing urgent situations. An event brought forward. A garment that doesn&apos;t fit as expected. A last-minute black-tie invitation. In these cases, we can often accommodate express turnaround — 24–48 hours for straightforward alterations like trouser hemming, a simple take-in, or a sleeve adjustment.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            <strong>Express service carries an additional fee</strong> to reflect the priority scheduling and extended working hours required. We will always be transparent about what is and isn&apos;t achievable before collecting your garment.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link>, <Link href="/tailor-canary-wharf" className="text-hunter underline">Canary Wharf</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Express Service Covers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {[
              { title: 'Trouser Hemming', desc: 'One of the fastest alterations — typically achievable within 24 hours.' },
              { title: 'Simple Take-In', desc: 'Side seam take-ins on trousers, dresses and jackets for a faster fit adjustment.' },
              { title: 'Sleeve Shortening', desc: 'Jacket and shirt sleeve shortening — turnaround depends on complexity.' },
              { title: 'Emergency Repairs', desc: 'Split seams, broken zips, detached buttons — prioritised same-day where possible.' },
              { title: 'Pre-Event Pressing', desc: 'Garments pressed and returned the same day for an important event.' },
              { title: 'Wedding Emergency Alterations', desc: 'Pre-wedding urgent alterations handled with priority. Call immediately.' },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">Express service subject to availability. Call to confirm before booking — we cannot guarantee same-day for all garment types.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How Express Service Works</h2>
          <ol className="space-y-6">
            {[
              ['Call First', 'For same-day or 24-hour service, call us to confirm availability before booking online. We need to confirm the timeline is achievable for your specific garment.'],
              ['We Collect Immediately', 'Once confirmed, we collect your garments as soon as possible — that morning or afternoon, depending on location.'],
              ['Priority Workshop Handling', 'Your garments are prioritised in our workshop queue. We call with a quote and work begins on approval.'],
              ['Express Return', 'Your garments are returned at the agreed time — same day, or the following morning as required.'],
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

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Need Alterations Urgently in London?</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            The fastest way to confirm availability is to call us directly. For standard alterations, use our{' '}
            <Link href="/suit-alterations-london" className="text-hunter underline">suit alterations service</Link> with the standard 5–7 day turnaround.
          </p>
          <div className="flex gap-6 flex-wrap items-center">
            <a href="tel:+447438145169" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Call +44 7438 145169
            </a>
            <Link href="/get-started" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
              Book online →
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
