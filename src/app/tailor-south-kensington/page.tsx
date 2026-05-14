import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in South Kensington, London | Home Visits | Fine Tailors',
  description: 'Fine Tailors visits your home in South Kensington, London. Expert suit alterations and clothing alterations collected from your SW7 address. Book today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-south-kensington' },
  openGraph: {
    title: 'Tailor in South Kensington | Home Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-south-kensington',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home visit South Kensington London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in South Kensington', item: 'https://www.finetailors.co.uk/tailor-south-kensington' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'South Kensington',
  description: 'Mobile master tailor visiting homes in South Kensington, London. Expert suit alterations and clothing alterations at your door.',
}

export default function TailorSouthKensington() {
  return (
    <>
      <Script id="schema-breadcrumb-sk" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-sk" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-sk" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in South Kensington</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in South Kensington, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors visits homes and apartments throughout South Kensington. Expert suit alterations and clothing alterations collected directly from your SW7 address — no travel required.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your South Kensington Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            South Kensington is one of London&apos;s most cosmopolitan and affluent neighbourhoods — tree-lined streets, grand Victorian properties, and a resident population that expects quality in everything. As your dedicated <strong>South Kensington tailor</strong>, Fine Tailors delivers that standard directly to your door.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Whether you live on Onslow Square, Cranley Gardens or anywhere in the SW7 postcode, our master tailor visits your home, assesses every garment in person, pins all adjustments, and collects your clothes. We return everything perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover South Kensington and neighbouring <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services in South Kensington</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear', 'Trouser Hemming', 'Jacket Resizing & Reshaping', 'Wedding Dress Alterations', 'Designer & Luxury Garments'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in South Kensington</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link> and <Link href="/tailor-fulham" className="text-hunter underline">Fulham</Link>.
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
