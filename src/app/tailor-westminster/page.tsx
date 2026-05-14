import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Tailor in Westminster, London | Home Visits | Fine Tailors',
  description: 'Fine Tailors visits your home in Westminster, London. Expert suit & dress alterations collected from your door. SW1 and central London covered. Book today.',
  alternates: { canonical: 'https://www.finetailors.co.uk/tailor-westminster' },
  openGraph: {
    title: 'Tailor in Westminster | Home Visit | Fine Tailors',
    url: 'https://www.finetailors.co.uk/tailor-westminster',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tailor home visit Westminster London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Tailor in Westminster', item: 'https://www.finetailors.co.uk/tailor-westminster' },
  ],
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  areaServed: 'Westminster',
  description: 'Mobile master tailor visiting homes and offices in Westminster, London. Expert suit alterations and clothing alterations at your door.',
}

export default function TailorWestminster() {
  return (
    <>
      <Script id="schema-breadcrumb-westminster" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="schema-business-westminster" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="schema-faq-westminster" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Tailor in Westminster</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Your Personal Tailor in Westminster, London
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors visits homes and offices throughout Westminster — from Victoria and Pimlico to St James&apos;s and Millbank. Expert suit alterations and clothing alterations collected from your SW1 address.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Tailoring at Your Westminster Home</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Westminster is home to some of London&apos;s most discerning residents — professionals, business executives and long-term city dwellers who expect quality service delivered with discretion and efficiency. As your dedicated <strong>Westminster tailor</strong>, Fine Tailors comes directly to your address at a time that suits you.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Whether you&apos;re in a Pimlico apartment, a Victoria townhouse or an office near Parliament Square, our master tailor visits, assesses your garments, pins all adjustments in real time, and collects everything. Your clothes are returned perfectly altered within 3–5 days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We cover all Westminster postcodes including SW1A, SW1E, SW1H, SW1P, SW1V and SW1W. If you&apos;re unsure whether we reach your exact address, just call us.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Services in Westminster</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {['Suit Alterations at Home', 'Dress & Occasion Wear Alterations', 'Trouser Hemming', 'Jacket Resizing', 'Wedding Dress Alterations', 'Clothing Repairs & Zip Replacements'].map(s => (
              <div key={s} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal">{s}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works in Westminster</h2>
          <ol className="space-y-6">
            {[
              ['Book Your Visit', 'Use our booking form or call us. We confirm a time at your Westminster address.'],
              ['We Come to You', 'Your tailor arrives, assesses all garments, takes measurements and pins adjustments.'],
              ['We Collect Your Clothes', 'Everything is taken away — no travel required from you.'],
              ['Expert Alterations', 'Completed with care and precision at our specialist workspace.'],
              ['Returned to Your Door', 'Your clothes are delivered back to your Westminster address, perfectly altered.'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Home Visit in Westminster</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            We also cover nearby <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link> and <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>.
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
