import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Chelsea, London | Home Visits | One Click Tailor',
  description: 'One Click Tailor visits your home in Chelsea, London. Expert suit & dress alterations at your door. 10+ years experience. Book your Chelsea home visit today.',
  alternates: { canonical: 'https://www.oneclicktailors.co.uk/tailor-chelsea' },
  openGraph: {
    title: 'Tailor in Chelsea, London | One Click Tailor',
    url: 'https://www.oneclicktailors.co.uk/tailor-chelsea',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor visiting client home in Chelsea London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Chelsea', item: 'https://www.oneclicktailors.co.uk/tailor-chelsea' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'One Click Tailor',
  url: 'https://www.oneclicktailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'Chelsea',
  description: 'Premium door-to-door tailoring and alterations visiting homes in Chelsea, London.',
}

export default function TailorChelsea() {
  return (
    <>
      <Script id="schema-breadcrumb-chelsea" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-chelsea" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-chelsea" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Chelsea</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Chelsea, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            One Click Tailor provides expert tailoring and clothing alterations at home across Chelsea. From King&apos;s Road to the quieter streets of SW3, we bring the tailor to your door.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Chelsea Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Chelsea&apos;s residents have long had an eye for quality — and that extends to how their clothes fit. As your personal <strong>Chelsea tailor</strong>, One Click Tailor visits your home at a time to suit your schedule. Whether you live off King&apos;s Road or along the Embankment, our tailor home visit London service removes every inconvenience from the tailoring process.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We come to you, assess your wardrobe, collect your garments, and return them altered to perfection — typically within 3–5 days. No queues, no carrying bags across the city. Just expert clothing alterations at home, delivered to your door.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Our 10+ years of experience across central London means we&apos;re trusted by Chelsea clients with everything from everyday alterations to high-end designer pieces. We&apos;re also the go-to central London tailor for Sloane Square and Fulham Road addresses.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Available in Chelsea</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming at Home', 'Jacket Resizing & Reshaping', 'Wedding Dress Alterations London', 'Zip, Button & Clasp Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Chelsea</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Use our booking form or call us to arrange a visit at your Chelsea address.'],
              ['We Arrive at Your Door', 'Your tailor arrives, assesses all garments and advises on what can be achieved.'],
              ['We Collect Your Clothes', 'We take everything away — no dropping off required.'],
              ['Expert Alterations', 'Every garment is worked on with precision and the highest care.'],
              ['We Return Everything', 'Your clothes are delivered back to your Chelsea home, perfectly altered.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Chelsea</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover nearby <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>.
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
