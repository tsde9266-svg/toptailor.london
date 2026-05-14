import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Notting Hill, London | Home Visits | Fine Tailors',
  description: 'Fine Tailors visits your home in Notting Hill, London. Expert suit alterations and clothing alterations at your door. W11 and W2 covered. Book today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-notting-hill' },
  openGraph: {
    title: 'Tailor in Notting Hill | Home Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-notting-hill',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home visit Notting Hill London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Notting Hill', item: 'https://www.finetailors.co.uk/tailor-notting-hill' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'Notting Hill',
  description: 'Mobile master tailor visiting homes in Notting Hill, London. Expert suit alterations and clothing alterations collected from your door.',
}

export default function TailorNottingHill() {
  return (
    <>
      <Script id="schema-breadcrumb-notting" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-notting" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-notting" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Notting Hill</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Notting Hill, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors brings expert tailoring and clothing alterations at home to Notting Hill, Bayswater and Westbourne Grove. We visit your W11 or W2 address — our master tailor comes to you.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Notting Hill Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Notting Hill is one of west London&apos;s most sought-after neighbourhoods — elegant stucco townhouses, confident style, and a taste for quality that extends to every detail of daily life. As your dedicated <strong>Notting Hill tailor</strong>, Fine Tailors brings that same standard of service to your front door.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We visit your home on Ladbroke Grove, Pembridge Road, Westbourne Park or any address in the W11 and W2 postcode area. Our master tailor assesses your garments in person, pins all adjustments, collects everything, and returns your clothes perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also cover neighbouring <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link> and <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, so if you&apos;re between postcodes, we almost certainly cover your address.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services in Notting Hill</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming', 'Jacket Resizing', 'Wedding Dress Alterations', 'Leather & Designer Garments'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Notting Hill</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>.
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
