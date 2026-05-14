import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Islington, London | Home Visits | Fine Tailors',
  description: 'Fine Tailors visits your home in Islington, Angel and Highbury. Expert suit alterations and clothing alterations at your N1 door. Book your home visit today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-islington' },
  openGraph: {
    title: 'Tailor in Islington | Home Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-islington',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home visit Islington London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Islington', item: 'https://www.finetailors.co.uk/tailor-islington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'Islington',
  description: 'Mobile master tailor visiting homes in Islington, Angel and Highbury, London. Expert suit alterations and clothing alterations at your door.',
}

export default function TailorIslington() {
  return (
    <>
      <Script id="schema-breadcrumb-islington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-islington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-islington" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Islington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Islington, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors visits homes in Islington, Angel and Highbury. Our master tailor comes to your N1 address for expert suit alterations, clothing alterations and dress alterations — all collected from your door.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Islington Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Islington&apos;s tree-lined streets and Georgian terraces are home to one of London&apos;s most design-conscious populations. Whether you&apos;re on Upper Street, Canonbury Square or in one of the quiet residential streets behind Angel station, Fine Tailors comes directly to your door.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            As your dedicated <strong>Islington tailor</strong>, we cover all N1 postcodes and the surrounding areas of Highbury, Barnsbury and De Beauvoir Town. Our master tailor visits, assesses your garments, pins all adjustments, and returns everything perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also serve <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link> and other areas to the south — if you work in the City and live in Islington, we can accommodate visits at either location.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services in Islington</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear', 'Trouser Hemming', 'Jacket Resizing', 'Wedding Dress Alterations', 'Clothing & Zip Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Islington</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover the <Link href="/tailor-city-of-london" className="text-hunter underline">City of London</Link> and <Link href="/tailor-marylebone" className="text-hunter underline">Marylebone</Link>.
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
