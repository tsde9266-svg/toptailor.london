import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Bridesmaid Dress Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert bridesmaid dress alterations in London — hemming, taking-in, strap work and zip replacement. Collected from your Central London home and returned in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/bridesmaid-dress-alterations-london' },
  openGraph: {
    title: 'Bridesmaid Dress Alterations London | Fine Tailors',
    description: 'Expert bridesmaid dress alterations collected from your Central London door. Returned perfectly fitted in 5–7 working days.',
    url: 'https://www.finetailors.co.uk/bridesmaid-dress-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bridesmaid Dress Alterations London — Fine Tailors' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Wedding Dress Alterations London', item: 'https://www.finetailors.co.uk/wedding-dress-alterations-london' },
    { '@type': 'ListItem', position: 3, name: 'Bridesmaid Dress Alterations London', item: 'https://www.finetailors.co.uk/bridesmaid-dress-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bridesmaid Dress Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Expert bridesmaid dress alterations collected from your Central London home and returned within 5–7 working days.',
  serviceType: 'Bridesmaid Dress Alterations',
}

export default function BridesmaidDressAlterationsPage() {
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
            <Link href="/wedding-dress-alterations-london" className="hover:text-hunter">Wedding Dress Alterations</Link>
            <span className="mx-2">/</span>
            <span>Bridesmaid Dresses</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">
            Bridesmaid Alterations · Collection Service · 5–7 Working Days
          </p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Bridesmaid Dress Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides <strong>expert bridesmaid dress alterations in London</strong> with a full home collection and return service. We collect from your Central London address, alter every dress to the perfect fit, and return them within 5–7 working days — without you visiting a single shop.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Bridesmaids Are Different Sizes — That Is the Point</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Bridesmaid dresses are typically bought in one style but multiple sizes, or ordered from the same batch but fitted to different bodies. The alteration challenge is precision — every dress needs to fit its wearer perfectly, and the group needs to look consistent on the day.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Fine Tailors regularly alters bridesmaid dresses individually, accounting for each wearer&apos;s specific requirements. Common alterations include hemming to the exact floor length for the shoes being worn, taking in the bodice, adjusting straps or back fastenings, and zip work. We inspect every dress and confirm the alterations required before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The collection model works well for bridal parties — dresses can be collected from the bride&apos;s home, a hotel room, or different individual addresses across Central London, and returned individually or together.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Bridesmaid Dress Alterations We Provide</h2>
          <table className="w-full max-w-2xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-8 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Dress hemming', 'From £22'],
                ['Bodice taking-in', 'From £30'],
                ['Strap shortening or adjustment', 'From £15'],
                ['Zip replacement', 'From £28'],
                ['Back opening adjustment', 'From £25'],
                ['Bustle or train work', 'Quoted on inspection'],
                ['Floor length adjustment (multiple layers)', 'From £45'],
                ['Full re-fit (multiple alterations)', 'Quoted on inspection'],
              ].map(([name, price]) => (
                <tr key={name} className="border-t border-divider">
                  <td className="py-3 pr-8 font-sans font-light text-sm text-charcoal">{name}</td>
                  <td className="py-3 font-sans font-medium text-sm text-hunter">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-sans text-xs text-muted mt-4">Prices are starting rates. Written quote confirmed after inspection.</p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Timing Your Bridesmaid Alterations</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Bridesmaid dresses should ideally be altered 4–8 weeks before the wedding, after final fittings with the shoes being worn on the day. Alterations too early risk not accounting for minor size changes; alterations too close to the date leave no time for corrections if needed.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            Our standard turnaround is 5–7 working days. For time-sensitive occasions, call us to discuss availability. We operate seven days a week across all Central London postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Wedding Dress Alterations', href: '/wedding-dress-alterations-london' },
              { label: 'Evening Wear Alterations', href: '/evening-wear-alterations-london' },
              { label: 'Dress Alterations London', href: '/dress-alterations-london' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Bridesmaid Dress Alterations</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We cover all Central London postcodes seven days a week. Book early to allow time for fittings and any corrections before the wedding day.
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
