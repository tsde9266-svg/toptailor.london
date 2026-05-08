import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Navbar      from '@/components/Navbar'
import Hero        from '@/components/Hero'
import Services    from '@/components/Services'
import NeedleDivider from '@/components/NeedleDivider'
import HowItWorks  from '@/components/HowItWorks'
import About       from '@/components/About'
import Reviews     from '@/components/Reviews'
import BookingForm from '@/components/BookingForm'
import StickyBar   from '@/components/StickyBar'
import Footer      from '@/components/Footer'
import FAQ, { faqSchema } from '@/components/FAQ'

export const metadata: Metadata = {
  title: "Mobile Tailor London | Suit Alterations & Home Visits | One Click Tailor",
  description: "One Click Tailor — London's premier mobile tailoring service. Expert suit alterations, bespoke tailoring and clothing alterations at your door. Home visits across Mayfair, Chelsea, Knightsbridge and central London. Book a free home visit today.",
  alternates: { canonical: 'https://www.oneclicktailors.co.uk' },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.oneclicktailors.co.uk/#webpage',
  url: 'https://www.oneclicktailors.co.uk',
  name: "Mobile Tailor London | Suit Alterations & Home Visits | One Click Tailor",
  description: "One Click Tailor is London's premier mobile tailoring service. Expert suit alterations, bespoke tailoring and clothing alterations collected from your home across Mayfair, Chelsea, Knightsbridge and central London.",
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-intro', '#services-intro'],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.oneclicktailors.co.uk' },
    ],
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Book a Mobile Tailor in London',
  description: 'Book One Click Tailor for suit alterations, dress alterations or bespoke tailoring at your London home or office.',
  totalTime: 'PT5D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Book a Collection Slot',
      text: 'Choose your services and book a home visit slot. We come to your home or office anywhere in central London — no travel required.',
      url: 'https://www.oneclicktailors.co.uk/book',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Tailor Inspects & Quotes',
      text: 'Our tailor collects your garments, inspects every piece and sends a confirmed written quote. Work only begins after you approve the price.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Garments Returned Perfectly Altered',
      text: 'Within 5–7 working days your garments are returned to your door, pressed and perfected. Payment is due only after you have approved the quote.',
    },
  ],
}

const areas = [
  { name: 'Mayfair',        href: '/tailor-mayfair',        desc: 'Home visits for Mayfair & Grosvenor Square residents.' },
  { name: 'Chelsea',        href: '/tailor-chelsea',        desc: 'Serving Chelsea, King\'s Road & surrounding SW3.' },
  { name: 'Knightsbridge',  href: '/tailor-knightsbridge',  desc: 'Minutes from Harrods & Harvey Nichols.' },
  { name: 'Kensington',     href: '/tailor-kensington',     desc: 'Covering all W8 and Kensington postcodes.' },
  { name: 'Belgravia',      href: '/tailor-belgravia',      desc: 'Premium tailoring for Belgravia\'s SW1 addresses.' },
  { name: 'City of London', href: '/tailor-city-of-london', desc: 'EC1, EC2, EC3 and EC4 covered.' },
]

export default function Home() {
  return (
    <>
      <Script
        id="schema-webpage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Script
        id="schema-howto"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="schema-faq-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <Hero />

      <main>
        <Services />
        <NeedleDivider />
        <HowItWorks />

        {/* Areas We Visit */}
        <section id="areas" className="px-8 lg:px-24 py-20 border-t border-divider bg-parchment">
          <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium mb-4">
            Areas We Visit
          </h2>
          <p className="font-sans font-light text-muted max-w-xl mb-12 leading-relaxed">
            Your central London mobile tailor — we visit homes, apartments and offices across the capital&apos;s most prestigious postcodes. As a dedicated <strong>mobile tailor London</strong> residents trust, we come to you for expert <strong>suit alterations</strong>, bespoke tailoring and clothing repairs.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="
                  border border-divider p-6
                  hover:border-hunter hover:bg-hunter/5
                  transition-colors duration-200
                  group
                "
              >
                <h3 className="font-playfair text-lg font-medium text-charcoal group-hover:text-hunter mb-2">
                  {area.name}
                </h3>
                <p className="font-sans text-sm font-light text-muted leading-relaxed">
                  {area.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <About />
        <Reviews />
        <FAQ />
        <BookingForm />
      </main>

      <Footer />
      <StickyBar />
    </>
  )
}
