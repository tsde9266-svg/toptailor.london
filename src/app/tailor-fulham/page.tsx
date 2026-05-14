import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Fulham, London | Home Visits | Fine Tailors',
  description: 'Fine Tailors visits your home in Fulham, London. Expert suit alterations, dress alterations and clothing alterations at your SW6 door. Book today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-fulham' },
  openGraph: {
    title: 'Tailor in Fulham | Home Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-fulham',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home visit Fulham London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Fulham', item: 'https://www.finetailors.co.uk/tailor-fulham' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'Fulham',
  description: 'Mobile master tailor visiting homes in Fulham and Parsons Green, London. Expert suit alterations and clothing alterations collected from your door.',
}

export default function TailorFulham() {
  return (
    <>
      <Script id="schema-breadcrumb-fulham" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-fulham" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-fulham" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Fulham</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Fulham, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors brings expert tailoring at home to Fulham, Parsons Green and the wider SW6 area. Our master tailor visits your address — suit alterations, dress alterations and clothing repairs, all collected from your door.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Fulham Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fulham&apos;s residents are typically busy professionals and families who appreciate quality local services — and who expect those services to come to them. As your dedicated <strong>Fulham tailor</strong>, Fine Tailors does exactly that. We visit your home anywhere in SW6, assess your garments, and return them perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            From New King&apos;s Road to Fulham Road, Parsons Green to Munster Village — wherever you are in the area, our master tailor comes to you. No travel, no waiting, no carrying garments across London.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also cover neighbouring <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and <Link href="/tailor-south-kensington" className="text-hunter underline">South Kensington</Link>.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services in Fulham</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress Alterations', 'Trouser Hemming & Waist', 'Jacket Resizing', 'Wedding Dress Alterations', 'Clothing Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Fulham</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We cover all of Fulham and SW6 — including Parsons Green, Sands End and Munster Village.
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
