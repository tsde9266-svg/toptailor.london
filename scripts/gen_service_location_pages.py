#!/usr/bin/env python3
import os

base = "D:/toptailor/src/app"

pages = [
  {
    "path": "suit-alterations-mayfair",
    "service": "Suit Alterations",
    "service_lower": "suit alterations",
    "area": "Mayfair",
    "postcode": "W1J/W1K",
    "postcode_desc": "W1J or W1K",
    "location_page": "/tailor-mayfair",
    "canonical": "https://www.finetailors.co.uk/suit-alterations-mayfair",
    "intro": "Mayfair has long been associated with the finest tailoring in Britain — Savile Row runs through its heart. If your suit needs work, the collection-based approach means your garment goes from your Grosvenor Square apartment or Bond Street address directly to our workshop and back, without a shop visit.",
    "streets": ["Grosvenor Square", "Mount Street", "Bond Street", "Berkeley Square", "South Audley Street", "Park Lane", "W1J", "W1K"],
    "nearby_service": "/suit-alterations-london",
    "nearby_areas": [("Chelsea", "/suit-alterations-chelsea"), ("Knightsbridge", "/suit-alterations-knightsbridge"), ("Marylebone", "/tailor-marylebone")],
    "component": "SuitAlterationsMayfair",
  },
  {
    "path": "suit-alterations-chelsea",
    "service": "Suit Alterations",
    "service_lower": "suit alterations",
    "area": "Chelsea",
    "postcode": "SW3/SW10",
    "postcode_desc": "SW3 or SW10",
    "location_page": "/tailor-chelsea",
    "canonical": "https://www.finetailors.co.uk/suit-alterations-chelsea",
    "intro": "Chelsea residents have always had high standards when it comes to clothes — the King's Road, the boutiques of the Fulham Road, the well-dressed households of Cheyne Walk. If your suit needs altering, Fine Tailors provides the right answer: collection from your Chelsea door, expert alteration, and return within 5-7 days.",
    "streets": ["King's Road", "Sloane Square", "Fulham Road", "Cheyne Walk", "Chelsea Embankment", "Sloane Avenue", "SW3", "SW10"],
    "nearby_service": "/suit-alterations-london",
    "nearby_areas": [("Mayfair", "/suit-alterations-mayfair"), ("Knightsbridge", "/suit-alterations-knightsbridge"), ("South Kensington", "/tailor-south-kensington")],
    "component": "SuitAlterationsChelsea",
  },
  {
    "path": "suit-alterations-knightsbridge",
    "service": "Suit Alterations",
    "service_lower": "suit alterations",
    "area": "Knightsbridge",
    "postcode": "SW1X/SW3",
    "postcode_desc": "SW1X or SW3",
    "location_page": "/tailor-knightsbridge",
    "canonical": "https://www.finetailors.co.uk/suit-alterations-knightsbridge",
    "intro": "Knightsbridge is home to some of the most significant luxury retail in London — and the residents and professionals in the area expect the same quality from their tailoring services. Fine Tailors collects your suit from your Brompton Road or Lowndes Square address and returns it perfectly altered.",
    "streets": ["Brompton Road", "Hans Crescent", "Pont Street", "Beauchamp Place", "Lowndes Square", "Montpelier Square", "SW1X", "SW3"],
    "nearby_service": "/suit-alterations-london",
    "nearby_areas": [("Mayfair", "/suit-alterations-mayfair"), ("Chelsea", "/suit-alterations-chelsea"), ("Belgravia", "/tailor-belgravia")],
    "component": "SuitAlterationsKnightsbridge",
  },
  {
    "path": "dress-alterations-mayfair",
    "service": "Dress Alterations",
    "service_lower": "dress alterations",
    "area": "Mayfair",
    "postcode": "W1J/W1K",
    "postcode_desc": "W1J or W1K",
    "location_page": "/tailor-mayfair",
    "canonical": "https://www.finetailors.co.uk/dress-alterations-mayfair",
    "intro": "Mayfair is home to some of the finest fashion boutiques and designer houses in London. Many of our Mayfair clients bring us garments from Bond Street, Mount Street and the surrounding area that need careful, expert alteration. Our collection service means your dress never has to leave your address unaccompanied.",
    "streets": ["Grosvenor Square", "Mount Street", "Bond Street", "Berkeley Square", "South Audley Street", "Park Lane", "W1J", "W1K"],
    "nearby_service": "/dress-alterations-london",
    "nearby_areas": [("Chelsea", "/dress-alterations-chelsea"), ("Knightsbridge", "/tailor-knightsbridge"), ("Marylebone", "/tailor-marylebone")],
    "component": "DressAlterationsMayfair",
  },
  {
    "path": "dress-alterations-chelsea",
    "service": "Dress Alterations",
    "service_lower": "dress alterations",
    "area": "Chelsea",
    "postcode": "SW3/SW10",
    "postcode_desc": "SW3 or SW10",
    "location_page": "/tailor-chelsea",
    "canonical": "https://www.finetailors.co.uk/dress-alterations-chelsea",
    "intro": "Chelsea has a long history of fashion-consciousness — from the boutiques of the King's Road to the evening wear that goes to Hurlingham and beyond. Fine Tailors collects dresses from Chelsea addresses and returns them perfectly altered, with no need to carry valuable or delicate garments across the city.",
    "streets": ["King's Road", "Sloane Square", "Fulham Road", "Cheyne Walk", "Chelsea Embankment", "Draycott Avenue", "SW3", "SW10"],
    "nearby_service": "/dress-alterations-london",
    "nearby_areas": [("Mayfair", "/dress-alterations-mayfair"), ("Knightsbridge", "/tailor-knightsbridge"), ("South Kensington", "/tailor-south-kensington")],
    "component": "DressAlterationsChelsea",
  },
]

template = """\
import type {{ Metadata }} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, {{ faqSchema }} from '@/components/FAQ'

export const metadata: Metadata = {{
  title: '{service} {area} | Collected From Your Home | Fine Tailors',
  description: 'Expert {service_lower} in {area} — collected from your {postcode} home and returned perfectly fitted in 5–7 working days. Fine Tailors covers all of Central London.',
  alternates: {{ canonical: '{canonical}' }},
  keywords: [
    '{service_lower} {area}',
    '{service_lower} near me {area}',
    '{service_lower} {area} London',
    'tailor {area} London',
    'alterations {area}',
    '{area} {service_lower}',
  ],
  openGraph: {{
    title: '{service} {area} | Home Collection | Fine Tailors',
    description: 'Expert {service_lower} in {area}, collected from your {postcode} door. Returned perfectly fitted in 5–7 working days.',
    url: '{canonical}',
    images: [{{ url: '/og-image.png', width: 1200, height: 630, alt: '{service} {area} London' }}],
  }},
}}

const breadcrumb = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' }},
    {{ '@type': 'ListItem', position: 2, name: '{service} London', item: 'https://www.finetailors.co.uk/{service_slug}-london' }},
    {{ '@type': 'ListItem', position: 3, name: '{service} {area}', item: '{canonical}' }},
  ],
}}

const serviceSchema = {{
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '{service} {area}',
  provider: {{
    '@type': 'LocalBusiness',
    '@id': 'https://www.finetailors.co.uk/#business',
    name: 'Fine Tailors',
    telephone: '+447438145169',
  }},
  areaServed: {{ '@type': 'Neighborhood', name: '{area}', containedInPlace: {{ '@type': 'City', name: 'London' }} }},
  description: 'Professional {service_lower} in {area}, London. Home collection and return service. Garments fully insured while in transit.',
  serviceType: '{service}',
}}

export default function {component}() {{
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(breadcrumb) }}}} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(serviceSchema) }}}} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(faqSchema) }}}} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="{nearby_service}" className="hover:text-hunter">{service} London</Link>
            <span className="mx-2">/</span>
            <span>{area}</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Collection Service · {area} · 5–7 Working Days</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            {service} in {area} —{{' '}}
            <em className="font-playfair italic">Collected From Your Door</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            Fine Tailors provides expert <strong>{service_lower} in {area}</strong> with a full home collection and return service. {intro}
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
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">Why Collection Is the Right Approach in {area}</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The traditional route for {service_lower} is to carry your garments to a shop, leave them, and return to collect. In {area}, that means transporting valuable pieces across London unnecessarily. Fine Tailors removes every step.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            We collect from your {postcode_desc} address at a time that suits you, alter every piece at our specialist workshop, and return them pressed and perfect within 5–7 working days. All garments are fully insured while in our care. A written quote is approved before any work begins.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed">
            We also cover <Link href="/tailor-mayfair" className="text-hunter underline">Mayfair</Link>, <Link href="/tailor-chelsea" className="text-hunter underline">Chelsea</Link>, <Link href="/tailor-knightsbridge" className="text-hunter underline">Knightsbridge</Link> and all other Central London postcodes. See <Link href="/alterations-near-me-london" className="text-hunter underline">all areas we cover</Link>.
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">How It Works</h2>
          <ol className="space-y-6">
            {{[
              ['Book a Collection Slot', 'Book online or call. We confirm a time at your {area} address — morning, afternoon or evening.'],
              ['We Collect From Your Door', 'We come to your {postcode_desc} address at the agreed time. Doorstep collection only — no entry required.'],
              ['Written Quote for Approval', 'We inspect your garments and send a written quote. No work begins until you approve.'],
              ['Returned Pressed and Perfect', 'Within 5–7 working days everything is back at your door, pressed and ready to wear.'],
            ].map(([title, desc], i) => (
              <li key={{i}} className="flex gap-6">
                <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">{{i + 1}}</span>
                <div>
                  <h3 className="font-playfair font-medium text-charcoal mb-1">{{title}}</h3>
                  <p className="font-sans font-light text-muted text-sm leading-relaxed">{{desc}}</p>
                </div>
              </li>
            ))}}
          </ol>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">{area} Areas We Collect From</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
{streets_ul}
          </ul>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16 border-t border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book {service} in {area}</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            See our <Link href="{nearby_service}" className="text-hunter underline">full {service_lower} service</Link> or explore{nearby_areas_text}.
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
}}
"""

for page in pages:
    service_slug = page["service"].lower().replace(" ", "-")

    streets_ul = ""
    for s in page["streets"]:
        streets_ul += f'            <li className="font-sans font-light text-sm text-muted border border-divider px-4 py-3">{s}</li>\n'

    nearby_areas_text = ""
    for n, href in page["nearby_areas"]:
        nearby_areas_text += f' <Link href="{href}" className="text-hunter underline">{n}</Link>,'
    nearby_areas_text = nearby_areas_text.rstrip(",")

    content = template.format(
        service=page["service"],
        service_lower=page["service_lower"],
        service_slug=service_slug,
        area=page["area"],
        postcode=page["postcode"],
        postcode_desc=page["postcode_desc"],
        location_page=page["location_page"],
        canonical=page["canonical"],
        intro=page["intro"],
        nearby_service=page["nearby_service"],
        component=page["component"],
        streets_ul=streets_ul,
        nearby_areas_text=nearby_areas_text,
    )

    path = f"{base}/{page['path']}/page.tsx"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {page['path']}")

print("All 5 service+location pages written.")
