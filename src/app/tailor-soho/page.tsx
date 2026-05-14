import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Soho & Covent Garden, London | Home & Office Visits | Fine Tailors',
  description: 'Fine Tailors visits homes and offices in Soho, Covent Garden and Fitzrovia. Expert suit alterations at your W1 address. Quick turnaround. Book today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-soho' },
  openGraph: {
    title: 'Tailor in Soho & Covent Garden | Office Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-soho',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home and office visit Soho London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Soho', item: 'https://www.finetailors.co.uk/tailor-soho' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: ['Soho', 'Covent Garden', 'Fitzrovia'],
  description: 'Mobile master tailor visiting homes and offices in Soho, Covent Garden and Fitzrovia, London. Expert suit alterations and clothing alterations at your address.',
}

export default function TailorSoho() {
  return (
    <>
      <Script id="schema-breadcrumb-soho" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-soho" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-soho" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Soho & Covent Garden</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor in Soho, Covent Garden & Fitzrovia
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors visits homes and offices throughout Soho, Covent Garden and Fitzrovia. Whether you need suit alterations before a meeting or dress alterations for an event, our master tailor comes to your W1 address.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Soho Home or Office</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Soho, Covent Garden and Fitzrovia sit at the heart of London&apos;s creative and professional world. The area is dense with media companies, agencies, studios and hospitality businesses — and the people who work and live here need their clothing to look right, quickly. As your dedicated <strong>Soho tailor</strong>, Fine Tailors can visit your home or office address anywhere in W1, WC1 and WC2.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Our master tailor brings everything needed to assess your garments in person, pin all alterations, and collect everything for our workspace. Standard turnaround is 3–5 days; express 24–48 hour service is available when a deadline is approaching.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also cover neighbouring <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> and <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services in Soho & Covent Garden</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations', 'Dress & Occasion Wear', 'Trouser Hemming', 'Jacket Alterations', 'Office Wardrobe Alterations', 'Emergency Express Service'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Visit in Soho or Covent Garden</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link> and <Link href="/tailor-westminster" className="text-hunter underline">Westminster</Link>.
          </p>
          <Link href="/book" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
            Book a Visit
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
