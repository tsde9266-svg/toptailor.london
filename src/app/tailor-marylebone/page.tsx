import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Marylebone, London | Home Visits | Fine Tailors',
  description: 'Fine Tailors visits your home in Marylebone, London. Expert suit alterations and clothing alterations at your door. W1 covered. Book your home visit today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-marylebone' },
  openGraph: {
    title: 'Tailor in Marylebone | Home Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-marylebone',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home visit Marylebone London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Marylebone', item: 'https://www.finetailors.co.uk/tailor-marylebone' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'Marylebone',
  description: 'Mobile master tailor visiting homes in Marylebone, London. Expert suit alterations and clothing alterations at your door.',
}

export default function TailorMarylebone() {
  return (
    <>
      <Script id="schema-breadcrumb-marylebone" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-marylebone" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-marylebone" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Marylebone</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Marylebone, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors brings expert tailoring and clothing alterations at home to Marylebone residents. From Harley Street to Chiltern Street, we visit your W1 address — no travel, no inconvenience.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Marylebone Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Marylebone&apos;s residents are known for their appreciation of quality — independent boutiques, fine restaurants, and professional services delivered with care. As your dedicated <strong>Marylebone tailor</strong>, Fine Tailors fits that ethos exactly. We visit your home, assess your garments in person, and return them perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Whether you&apos;re on Baker Street, Wimpole Street or the elegant residential streets between Regent&apos;s Park and Oxford Street, our master tailor comes to you. We cover all W1 postcodes and the surrounding areas — Fitzrovia, Soho and Mayfair are all within our regular service zone.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            With over 10 years serving central London clients, we handle everything from everyday clothing alterations to luxury pieces requiring the most delicate attention.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services Available in Marylebone</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming', 'Jacket Resizing', 'Bespoke Made-to-Measure', 'Clothing Repairs'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Marylebone</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Use our booking form or call us. We confirm a time at your Marylebone address.'],
              ['We Come to Your Door', 'Your master tailor arrives, assesses garments and advises on all alterations.'],
              ['We Collect Your Clothes', 'We take everything — no carrying, no travel, no inconvenience.'],
              ['Expert Alterations', 'Every garment worked on with precision at our specialist workspace.'],
              ['Returned Perfect', 'Your clothes returned to your Marylebone address within 3–5 days.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Marylebone</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover nearby <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link> and <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>.
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
