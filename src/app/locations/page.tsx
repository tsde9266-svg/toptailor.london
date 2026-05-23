import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Areas We Cover | Collection Tailor Across Central London | Fine Tailors',
  description: 'Fine Tailors collects from your door across all Central London postcodes — Mayfair, Chelsea, Knightsbridge, Canary Wharf and 17 more areas. Alterations collected and returned in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/locations' },
  openGraph: {
    title: 'Areas We Cover — Collection Tailoring Across Central London | Fine Tailors',
    description: 'Collection-based tailoring service covering all Central London postcodes. Find your area and book a collection.',
    url: 'https://www.finetailors.co.uk/locations',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors collection areas across Central London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Areas We Cover', item: 'https://www.finetailors.co.uk/locations' },
  ],
}

const areas = [
  {
    name: 'Mayfair',
    href: '/tailor-mayfair',
    postcode: 'W1J / W1K',
    desc: 'Collections from Grosvenor Square, Mount Street, Berkeley Square and all W1J/W1K addresses. Finance professionals, private members club regulars, hotel guests at The Dorchester and Claridge\'s.',
  },
  {
    name: 'Knightsbridge',
    href: '/tailor-knightsbridge',
    postcode: 'SW1X / SW7',
    desc: 'Steps from Harrods. Collections from SW1X and SW7 addresses — residents, hotel guests, and Harrods-area professionals.',
  },
  {
    name: 'Chelsea',
    href: '/tailor-chelsea',
    postcode: 'SW3 / SW10',
    desc: 'King\'s Road, Sloane Square, Cheyne Walk and all SW3/SW10 addresses. Fashion-forward residents who expect precision.',
  },
  {
    name: 'Belgravia',
    href: '/tailor-belgravia',
    postcode: 'SW1W',
    desc: 'Eaton Square, Chester Square and the garden squares of SW1W. One of London\'s most prestigious residential addresses.',
  },
  {
    name: 'Kensington',
    href: '/tailor-kensington',
    postcode: 'W8',
    desc: 'Holland Park, High Street Kensington and the residential streets of W8. Families and professionals in one of London\'s quieter premium areas.',
  },
  {
    name: 'South Kensington',
    href: '/tailor-south-kensington',
    postcode: 'SW7',
    desc: 'Cromwell Road, Exhibition Road, Onslow Gardens. Residents close to the museums and international school corridor.',
  },
  {
    name: 'Westminster',
    href: '/tailor-westminster',
    postcode: 'SW1A / SW1P',
    desc: 'Whitehall, Parliament Square, Victoria Street. Civil servants, government workers, international business visitors, hotel guests at The Goring and Conrad London.',
  },
  {
    name: 'Pimlico',
    href: '/tailor-pimlico',
    postcode: 'SW1V',
    desc: 'Warwick Way, Tachbrook Street, residential SW1V. Quiet professional clientele close to Westminster and Victoria.',
  },
  {
    name: 'Marylebone',
    href: '/tailor-marylebone',
    postcode: 'W1G / W1U',
    desc: 'Harley Street, High Street, Welbeck Street. Medical consultants, private practice professionals, Chiltern Street boutique area residents.',
  },
  {
    name: 'Soho',
    href: '/tailor-soho',
    postcode: 'W1F / W1D',
    desc: 'Dean Street, Wardour Street, Carnaby Street. Media industry, advertising agencies, creative professionals — fashion-conscious clientele.',
  },
  {
    name: 'Fitzrovia',
    href: '/tailor-fitzrovia',
    postcode: 'W1T / W1W',
    desc: 'Charlotte Street, Goodge Street, the BT Tower area. Media and advertising agencies, digital sector professionals.',
  },
  {
    name: 'Covent Garden',
    href: '/tailor-covent-garden',
    postcode: 'WC2E',
    desc: 'Long Acre, Seven Dials, the Strand. Theatre professionals, hospitality workers, restaurant staff needing precise-fit stage clothes and uniforms.',
  },
  {
    name: 'Bloomsbury',
    href: '/tailor-bloomsbury',
    postcode: 'WC1B / WC1N',
    desc: 'Russell Square, Gower Street, the UCL and SOAS corridor. University and publishing sector, academics who value quality and convenience.',
  },
  {
    name: 'City of London',
    href: '/tailor-city-of-london',
    postcode: 'EC1–EC4',
    desc: 'The Square Mile — EC1, EC2, EC3 and EC4. Finance, legal and professional services workers who wear suits daily.',
  },
  {
    name: 'Clerkenwell',
    href: '/tailor-clerkenwell',
    postcode: 'EC1R / EC1V',
    desc: 'Exmouth Market, Farringdon Road. Design studios, architecture firms, creative industry professionals.',
  },
  {
    name: 'Islington',
    href: '/tailor-islington',
    postcode: 'N1',
    desc: 'Upper Street, Angel, Essex Road. Mixed professional and creative residents, families needing alterations without a long commute.',
  },
  {
    name: 'Shoreditch',
    href: '/tailor-shoreditch',
    postcode: 'E1 / EC2A',
    desc: 'Brick Lane, Old Street, Commercial Street. Tech sector, fashion-forward clientele, startup workers — garments from independent brands alongside premium labels.',
  },
  {
    name: 'Canary Wharf',
    href: '/tailor-canary-wharf',
    postcode: 'E14',
    desc: 'Canada Square, Bank Street, the E14 office towers. Bloomberg, HSBC, Barclays and other finance sector workers who wear suits as daily workwear.',
  },
  {
    name: 'Notting Hill',
    href: '/tailor-notting-hill',
    postcode: 'W11',
    desc: 'Portobello Road, Westbourne Grove. Affluent residents, boutique fashion area, high-value garments needing specialist care.',
  },
  {
    name: 'Paddington',
    href: '/tailor-paddington',
    postcode: 'W2',
    desc: 'Praed Street, Hyde Park corridor. Business travellers staying at hotels, professionals transiting through London.',
  },
  {
    name: 'Fulham',
    href: '/tailor-fulham',
    postcode: 'SW6',
    desc: 'Fulham Road, Parson\'s Green, New King\'s Road. Residential professionals, families, and creatives in a quieter part of West London.',
  },
]

export default function LocationsPage() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <span>Areas We Cover</span>
          </nav>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            Areas We Cover —{' '}
            <em className="font-playfair italic">Collection Tailoring Across Central London</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors collects from all Central London postcodes. Find your area below — each page covers local streets, client types, and exactly how the collection service works for your neighbourhood.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl">
            {areas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="border border-divider p-6 hover:border-hunter hover:bg-hunter/5 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-playfair text-xl font-medium text-charcoal group-hover:text-hunter">
                    {area.name}
                  </h2>
                  <span className="font-sans text-xs text-muted border border-divider px-2 py-1 shrink-0 ml-4">
                    {area.postcode}
                  </span>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">
                  {area.desc}
                </p>
                <span className="inline-block mt-4 font-sans text-xs font-medium text-hunter uppercase tracking-widest">
                  View {area.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">How Collection Works in Any Area</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The service is identical across all 21 areas. Book a collection slot, we arrive at your door at the agreed time, collect your garments, alter them in our specialist workshop, and return them pressed and perfect within 5–7 working days.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            No tailor enters your home. Your garments go from your door to our workshop and straight back — never into a public shop, never handled by multiple staff members. All garments are fully insured while in our care.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            If your area is not listed above, contact us — we cover a wide radius and many neighbouring postcodes.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in Your Area</h2>
          <p className="font-sans font-light text-muted mb-8 max-w-lg leading-relaxed">
            Also see our full <Link href="/services" className="text-hunter underline">list of alteration services</Link> we offer across all areas.
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
