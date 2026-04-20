import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Knightsbridge, London | Home Visits | One Click Tailor',
  description: 'One Click Tailor visits your home in Knightsbridge, London. Expert suit & dress alterations at your door. 10+ years experience. Book your Knightsbridge home visit today.',
  alternates: { canonical: 'https://www.oneclicktailor.co.uk/tailor-knightsbridge' },
  openGraph: {
    title: 'Tailor in Knightsbridge, London | One Click Tailor',
    url: 'https://www.oneclicktailor.co.uk/tailor-knightsbridge',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor visiting client home in Knightsbridge London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailor.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Knightsbridge', item: 'https://www.oneclicktailor.co.uk/tailor-knightsbridge' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'One Click Tailor',
  url: 'https://www.oneclicktailor.co.uk',
  telephone: '+44-XXXX-XXXXXX',
  areaServed: 'Knightsbridge',
  description: 'Premium door-to-door tailoring and alterations visiting homes in Knightsbridge, London.',
}

export default function TailorKnightsbridge() {
  return (
    <>
      <Script id="schema-breadcrumb-knightsbridge" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-knightsbridge" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-knightsbridge" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Knightsbridge</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Knightsbridge, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Steps from Harrods and Harvey Nichols, One Click Tailor offers premium clothing alterations at home across Knightsbridge. We visit your door — so your garments never have to travel alone.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Knightsbridge Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Knightsbridge is synonymous with luxury — from the grand department stores on Brompton Road to the discreet residential streets behind them. As your dedicated Knightsbridge tailor, One Click Tailor brings the same premium standard to your door. We understand that the garments Knightsbridge clients own are often exceptional pieces that deserve exceptional care.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our tailor home visit London service covers all SW1 and SW7 postcodes. We visit at a time that suits you, assess your wardrobe in person, collect your garments and return them perfectly altered. Whether it&apos;s suit alterations at home, dress alterations for an upcoming event, or a full wardrobe refresh — we handle it all.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Clients regularly trust us with designer and luxury purchases from Harrods and Harvey Nichols that need personalising to their exact fit. This is clothing alterations at home at its most precise.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Available in Knightsbridge</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming at Home', 'Jacket Resizing & Reshaping', 'Wedding Dress Alterations London', 'Zip, Button & Clasp Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Knightsbridge</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Arrange a convenient time at your Knightsbridge address.'],
              ['We Arrive at Your Door', 'Your tailor assesses all garments and advises on alterations.'],
              ['We Collect Your Clothes', 'Everything is collected — no dropping off required.'],
              ['Expert Alterations', 'Completed with precision and care in our workspace.'],
              ['We Return Everything', 'Delivered back to your Knightsbridge home, perfect.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Knightsbridge</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover nearby <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>.
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
