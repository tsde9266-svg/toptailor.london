import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Wedding Dress Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Specialist wedding dress alterations in London — hemming, taking in, bustle work and emergency repairs, collected from your home. Expert handling for delicate gowns.',
  alternates: { canonical: 'https://www.finetailors.co.uk/wedding-dress-alterations-london' },
  openGraph: {
    title: 'Wedding Dress Alterations London | Fine Tailors',
    description: 'Specialist wedding dress alterations in London — collected from your home, handled with care, returned perfect. No shop visit required.',
    url: 'https://www.finetailors.co.uk/wedding-dress-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Wedding dress alterations London collection service' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Wedding Dress Alterations London', item: 'https://www.finetailors.co.uk/wedding-dress-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Wedding Dress Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Specialist wedding dress and bridal wear alterations in London, collected from your home. Hemming, taking in, bustle fitting and emergency repairs.',
  serviceType: 'Wedding Dress Alterations',
}

const alterationTypes = [
  { title: 'Hem Shortening', desc: 'Adjusting the hem on lace, tulle, satin and layered gowns. Every layer is handled individually for a clean finish. Quoted on inspection.' },
  { title: 'Bodice Taking-In', desc: 'Reducing the bodice for a closer fit through the bust, waist and back. Structured bodices require specialist handling.' },
  { title: 'Strap & Neckline Adjustment', desc: 'Shortening, lengthening or repositioning straps and adjusting necklines for comfort and fit.' },
  { title: 'Bustle Addition', desc: 'Adding a bustle to lift the train for the reception — button, French or American style depending on the gown.' },
  { title: 'Zip Replacement', desc: 'Replacing faulty or broken zips on wedding gowns — handled with care to preserve fabric and structure.' },
  { title: 'Emergency Repairs', desc: 'Pre-wedding emergency repairs — split seams, broken fastenings, torn fabric. Prioritised turnaround available.' },
  { title: 'Preservation Pressing', desc: 'Post-wedding pressing and minor repairs before storage. Quoted on inspection.' },
  { title: 'Bridesmaid Dress Alterations', desc: 'Matching the whole bridal party — hemming, taking-in and strap adjustments for bridesmaid dresses.' },
]

export default function WeddingDressAlterationsLondon() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Wedding Dress Alterations London</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Specialist Handling · Collected From Your Home</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Wedding Dress Alterations in London —{' '}
            <em className="font-playfair italic">Handled With Care</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides specialist <strong>wedding dress alterations in London</strong> with a full collection service. Your gown is collected from your home, altered by a specialist, and returned to your door — pressed and perfect. No shop visit, no carrying your dress on public transport.
          </p>
          <div className="flex gap-4 flex-wrap mt-8">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-light text-charcoal underline self-center">
              Call +44 7438 145169
            </a>
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Collection Is Safer for a Wedding Dress</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            A wedding dress is one of the most valuable garments most people ever own — both financially and sentimentally. It is also one of the most difficult to transport safely. Lace catches on everything. Tulle crushes. Structured bodices can be distorted by poor packing. Carrying a gown on public transport or in the back of a car is a risk no bride should have to take.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors collects your wedding dress from your Central London home. It is transported carefully to our specialist workshop, altered by a tailor with experience in bridal and occasion wear, and returned to your address. Your gown never sits in a shop, never travels alone, never risks the exposure that a high-street shop collection entails.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We work across <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-kensington" className="text-hunter underline">Kensington</Link>, <Link href="/tailor-belgravia" className="text-hunter underline">Belgravia</Link> and all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Wedding Dress Alteration Timeline</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-6">
            Most wedding dress alterations take 2–4 sessions. We recommend beginning at least 8–10 weeks before your wedding date for complex work, or 4–6 weeks for simpler adjustments. Contact us as early as possible — we can advise on timing at consultation.
          </p>
          <div className="space-y-4 max-w-2xl">
            {[
              ['10–12 weeks before', 'Initial consultation. Dress collected, assessed, and written quote provided.'],
              ['6–8 weeks before', 'Major alterations complete — body fit, hem, strap work. First return and fitting.'],
              ['3–4 weeks before', 'Final adjustments after any weight changes. Bustle fitting if required.'],
              ['1–2 weeks before', 'Final return, pressed and hung. Emergency alterations available if needed.'],
            ].map(([time, desc]) => (
              <div key={time} className="flex gap-6 border-b border-divider pb-4 last:border-0">
                <span className="font-playfair text-sm font-medium text-hunter shrink-0 w-36">{time}</span>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Wedding Dress Alterations We Specialise In</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-3xl">
            {alterationTypes.map(({ title, desc }) => (
              <div key={title} className="border border-divider p-5">
                <h3 className="font-playfair text-base font-medium text-charcoal mb-2">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm font-light text-muted mt-6">All wedding dress alteration work is quoted individually after inspection. Minimum order £20.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">What Our Clients Say</h2>
          <blockquote className="border-l-2 border-hunter pl-6">
            <p className="font-playfair italic text-lg text-charcoal mb-3">
              &ldquo;Had my wedding dress hem shortened and the bodice taken in. They collected from my Kensington flat and returned it looking exactly as I&apos;d hoped. The thought of carrying it on the tube was a nightmare I didn&apos;t have to deal with.&rdquo;
            </p>
            <cite className="font-sans text-sm text-muted not-italic">— Sophie, Kensington</cite>
          </blockquote>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Wedding Dress Alterations in London</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            Book as early as possible to secure your date. Also see our{' '}
            <Link href="/dress-alterations-london" className="text-hunter underline">dress alterations service</Link> for non-bridal occasion wear.
          </p>
          <div className="flex gap-6 flex-wrap items-center">
            <Link href="/get-started" className="bg-hunter text-parchment px-10 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
              Book a Collection
            </Link>
            <a href="tel:+447438145169" className="font-sans text-sm font-medium text-charcoal hover:text-hunter transition-colors">
              +44 7438 145169
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
