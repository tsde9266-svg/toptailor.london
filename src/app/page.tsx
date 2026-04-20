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

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.thedoortailor.co.uk/#webpage',
  url: 'https://www.thedoortailor.co.uk',
  name: "London's Premium Door-to-Door Tailor | The Door Tailor",
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-intro'],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thedoortailor.co.uk' },
    ],
  },
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
            Your central London tailor — we visit homes, apartments and offices across the capital&apos;s most prestigious postcodes. As a dedicated <strong>door-to-door tailor London</strong> residents trust, we come to you.
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
