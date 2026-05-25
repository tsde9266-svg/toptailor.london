import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Evening Wear Alterations London | Collected From Your Door | Fine Tailors',
  description: 'Expert evening wear alterations in London — gowns, cocktail dresses, black tie suits and occasion wear. Collected from your Central London door and returned in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/evening-wear-alterations-london' },
  openGraph: {
    title: 'Evening Wear Alterations London | Home Collection | Fine Tailors',
    description: 'Expert evening wear alterations collected from your Central London door. Gowns, cocktail dresses, black tie — returned perfect in 5–7 days.',
    url: 'https://www.finetailors.co.uk/evening-wear-alterations-london',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Evening Wear Alterations London — Fine Tailors' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Dress Alterations London', item: 'https://www.finetailors.co.uk/dress-alterations-london' },
    { '@type': 'ListItem', position: 3, name: 'Evening Wear Alterations London', item: 'https://www.finetailors.co.uk/evening-wear-alterations-london' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Evening Wear Alterations London',
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  },
  areaServed: { '@type': 'City', name: 'London' },
  description: 'Expert evening wear alterations collected from your Central London home and returned within 5–7 working days.',
  serviceType: 'Evening Wear Alterations',
}

export default function EveningWearAlterationsPage() {
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
            <Link href="/dress-alterations-london" className="hover:text-hunter">Dress Alterations London</Link>
            <span className="mx-2">/</span>
            <span>Evening Wear</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">
            Evening Wear · Collection Service · 5–7 Working Days
          </p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Evening Wear Alterations in London —{' '}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides <strong>expert evening wear alterations in London</strong> with a full home collection and return service. Gowns, cocktail dresses, black tie suits, and all occasion wear — collected from your door and returned perfectly fitted within 5–7 working days.
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Evening Wear Needs a Specialist</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            Evening wear presents different challenges from everyday clothing. A floor-length gown has a hem that must fall perfectly when you are wearing your event shoes — not approximated. A structured bodice requires precise adjustment to stay in place through an entire evening. A black tie dinner jacket needs sleeve work that preserves the formal silhouette.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            At Fine Tailors, we handle evening wear regularly — from cocktail dresses to full-length ball gowns, from occasion suits to formal separates. Every piece is inspected individually. A written quote is provided before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            The collection model is particularly well-suited to evening wear. These garments are often delicate, expensive, or both — carrying them across London on public transport, leaving them in a busy shop, and collecting them later is an unnecessary risk. We collect from your door and return the same way.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">Evening Wear Alterations We Provide</h2>
          <table className="w-full max-w-2xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-8 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Gown hemming', 'From £35'],
                ['Cocktail dress hemming', 'From £22'],
                ['Bodice taking-in', 'From £35'],
                ['Strap shortening or adjustment', 'From £15'],
                ['Zip replacement (dress)', 'From £28'],
                ['Invisible zip installation', 'From £32'],
                ['Layered skirt shortening', 'From £45'],
                ['Beaded or embellished hem', 'Quoted on inspection'],
                ['Black tie jacket sleeve', 'From £30'],
                ['Dinner suit trousers', 'From £18'],
                ['Full gown re-cut', 'Quoted on inspection'],
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {[
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your address — morning, afternoon or evening, seven days a week.'],
              ['We Collect at Your Door', 'We arrive at the agreed time. Your evening wear is collected at the doorstep — no need to carry delicate garments anywhere.'],
              ['Written Quote Approved', 'We inspect every piece at our workshop and send a written quote. No work begins until you approve.'],
              ['Returned in 5–7 Working Days', 'Your garments are returned to your door pressed and ready for wear.'],
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

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Dress Alterations London', href: '/dress-alterations-london' },
              { label: 'Wedding Dress Alterations', href: '/wedding-dress-alterations-london' },
              { label: 'Bridesmaid Dress Alterations', href: '/bridesmaid-dress-alterations-london' },
              { label: 'Clothing Alterations London', href: '/clothing-alterations-london' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book Evening Wear Alterations</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            We cover all Central London postcodes seven days a week. Collection and return are included in the alteration price.
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
