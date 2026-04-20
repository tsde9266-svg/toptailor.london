import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Kensington, London | Home Visits | One Click Tailor',
  description: 'One Click Tailor visits your home in Kensington, London. Expert suit & dress alterations at your door. 10+ years experience. Book your Kensington home visit today.',
  alternates: { canonical: 'https://www.oneclicktailor.co.uk/tailor-kensington' },
  openGraph: {
    title: 'Tailor in Kensington, London | One Click Tailor',
    url: 'https://www.oneclicktailor.co.uk/tailor-kensington',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor visiting client home in Kensington London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailor.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Kensington', item: 'https://www.oneclicktailor.co.uk/tailor-kensington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'One Click Tailor',
  url: 'https://www.oneclicktailor.co.uk',
  telephone: '+44-XXXX-XXXXXX',
  areaServed: 'Kensington',
  description: 'Premium door-to-door tailoring and alterations visiting homes in Kensington, London.',
}

export default function TailorKensington() {
  return (
    <>
      <Script id="schema-breadcrumb-kensington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-kensington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-kensington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Kensington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Kensington, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            One Click Tailor covers all W8 and surrounding Kensington postcodes, bringing expert tailoring and clothing alterations at home to your door. Professional, discreet, precise.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Kensington Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Kensington is one of London&apos;s most sought-after postcodes, home to garden squares, stucco-fronted townhouses, and residents who value their time. As your Kensington tailor, One Click Tailor provides a seamless service that respects your schedule and your wardrobe.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our tailor home visit London service means we come to you — assess, collect, alter, and return. No trips to the high street, no waiting. Whether you need suit alterations at home, dress alterations for an event at the Royal Albert Hall nearby, or everyday clothing alterations at home, we cover it.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We&apos;re also the central London tailor trusted by Holland Park and Notting Hill clients just minutes away, and we regularly serve Knightsbridge addresses bordering W8.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Available in Kensington</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming at Home', 'Jacket Resizing & Reshaping', 'Wedding Dress Alterations London', 'Zip, Button & Clasp Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Kensington</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Choose a time at your Kensington W8 address.'],
              ['We Arrive at Your Door', 'Your tailor assesses garments and advises.'],
              ['We Collect Your Clothes', 'We take everything — no drop-off needed.'],
              ['Expert Alterations', 'Completed carefully in our workspace.'],
              ['We Return Everything', 'Delivered back perfectly to your Kensington door.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Kensington</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover nearby <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>.
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
