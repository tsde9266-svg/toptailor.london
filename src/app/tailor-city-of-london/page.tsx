import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in City of London | Home & Office Visits | One Click Tailor',
  description: 'One Click Tailor visits your home or office in the City of London. Expert suit & dress alterations at your door. 10+ years experience. Book your City visit today.',
  alternates: { canonical: 'https://www.oneclicktailor.co.uk/tailor-city-of-london' },
  openGraph: {
    title: 'Tailor in City of London | One Click Tailor',
    url: 'https://www.oneclicktailor.co.uk/tailor-city-of-london',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor visiting client in the City of London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailor.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in City of London', item: 'https://www.oneclicktailor.co.uk/tailor-city-of-london' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'One Click Tailor',
  url: 'https://www.oneclicktailor.co.uk',
  telephone: '+44-XXXX-XXXXXX',
  areaServed: 'City of London',
  description: 'Premium door-to-door tailoring and alterations visiting homes and offices in the City of London.',
}

export default function TailorCityOfLondon() {
  return (
    <>
      <Script id="schema-breadcrumb-city" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-city" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-city" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in City of London</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in the City of London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            One Click Tailor visits EC1, EC2, EC3 and EC4 addresses — homes, apartments, and offices across the Square Mile. Expert suit alterations and clothing alterations at home, without leaving your building.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your City of London Address</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The City of London moves fast — and so do we. For professionals working long hours in EC1, EC2 or EC3, finding time for a tailor visit can feel impossible. As your dedicated City of London tailor, One Click Tailor works around your schedule, visiting your home or office at a convenient time.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We offer the complete tailor home visit London experience: arrive, assess, collect, alter, return. Suit alterations — the most common requirement for City professionals — are handled with the speed and precision that a busy schedule demands. Express 24–48 hour turnaround is available for urgent alterations.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The City borders Mayfair and Marylebone to the west and north, and we serve all three as a trusted central London tailor. Whether you need a boardroom suit adjusted before an important meeting or a full wardrobe consultation, we are ready.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Available in the City of London</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming at Home', 'Jacket Resizing & Reshaping', 'Wedding Dress Alterations London', 'Zip, Button & Clasp Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in the City of London</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Choose a time at your EC1–EC4 home or office.'],
              ['We Arrive at Your Door', 'Your tailor assesses all garments and advises.'],
              ['We Collect Your Clothes', 'We take everything — no drop-off required.'],
              ['Expert Alterations', 'Completed with precision; express service available.'],
              ['We Return Everything', 'Delivered back to your City address, perfect.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Visit in the City of London</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover nearby <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> and <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>.
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
