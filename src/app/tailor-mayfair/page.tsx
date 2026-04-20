import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Mayfair, London | Home Visits | One Click Tailor',
  description: 'One Click Tailor visits your home in Mayfair, London. Expert suit & dress alterations at your door. 10+ years experience. Book your Mayfair home visit today.',
  alternates: { canonical: 'https://www.oneclicktailor.co.uk/tailor-mayfair' },
  openGraph: {
    title: 'Tailor in Mayfair, London | One Click Tailor',
    url: 'https://www.oneclicktailor.co.uk/tailor-mayfair',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor visiting client home in Mayfair London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailor.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Mayfair', item: 'https://www.oneclicktailor.co.uk/tailor-mayfair' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'One Click Tailor',
  url: 'https://www.oneclicktailor.co.uk',
  telephone: '+44-XXXX-XXXXXX',
  areaServed: 'Mayfair',
  description: 'Premium door-to-door tailoring and alterations visiting homes in Mayfair, London.',
}

export default function TailorMayfair() {
  return (
    <>
      <Script id="schema-breadcrumb-mayfair" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-mayfair" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-mayfair" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Mayfair</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Mayfair, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            One Click Tailor brings expert tailoring and clothing alterations at home to Mayfair residents. From Grosvenor Square to Berkeley Square, we visit your address — no travel, no inconvenience.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Mayfair Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Mayfair is one of London&apos;s most prestigious addresses, and its residents expect a standard of service to match. As your dedicated <strong>Mayfair tailor</strong>, One Click Tailor visits your home at a time that suits you — whether you&apos;re in a Grosvenor Square apartment or a Mount Street townhouse. We understand that for Mayfair clients, time is the most valuable commodity. That&apos;s why we come to you.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our tailor home visit London service means you never need to carry garments across the city or wait in a shop queue. We assess every piece in your own wardrobe, advise on what&apos;s possible, collect your clothes, and return them perfectly altered — usually within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            With over 10 years serving central London clients, we handle everything from everyday clothing alterations at home to luxury designer pieces requiring the most delicate care.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Available in Mayfair</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming at Home', 'Jacket Resizing & Reshaping', 'Wedding Dress Alterations London', 'Zip, Button & Clasp Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Mayfair</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Use our booking form or call us. We confirm a time at your Mayfair address.'],
              ['We Arrive at Your Door', 'Your tailor arrives, assesses all garments, takes measurements and advises on alterations.'],
              ['We Collect Your Clothes', 'No dropping off needed — we collect and take everything to our workspace.'],
              ['Expert Alterations', 'Every garment is worked on with precision and care.'],
              ['We Return Everything', 'Your clothes are delivered back to your Mayfair address, perfectly altered.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Mayfair</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            Ready to experience tailoring at your door? We also cover nearby <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>.
          </p>
          <div className="flex gap-6 flex-wrap">
            <Link href="/book" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Visit
            </Link>
            <Link href="/" className="font-sans text-sm font-light text-muted underline self-center">
              ← Back to home
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
