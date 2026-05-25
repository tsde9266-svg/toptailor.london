#!/usr/bin/env python3
import os

base = "D:/toptailor/src/app/blog"

areas = [
  {
    "slug": "knightsbridge",
    "name": "Knightsbridge",
    "postcode": "SW1X/SW3",
    "postcode_list": "SW1X or SW3",
    "streets": ["Brompton Road", "Hans Crescent", "Sloane Street", "Pont Street", "Beauchamp Place", "Lowndes Square", "Montpelier Square", "SW1X", "SW3", "Knightsbridge hotels and residences"],
    "intro": "Knightsbridge is home to some of the finest boutiques in London — Harvey Nichols, Harrods, the Brompton Road — and residents here expect the same standard from every service they use.",
    "nearby": [("Chelsea", "/tailor-chelsea"), ("Belgravia", "/tailor-belgravia"), ("South Kensington", "/tailor-south-kensington"), ("Mayfair", "/tailor-mayfair")],
    "nearby_location": "/tailor-knightsbridge",
  },
  {
    "slug": "belgravia",
    "name": "Belgravia",
    "postcode": "SW1W/SW1X",
    "postcode_list": "SW1W or SW1X",
    "streets": ["Eaton Square", "Belgrave Square", "Elizabeth Street", "Sloane Street", "Chester Square", "Pimlico Road", "Motcomb Street", "SW1W", "SW1X", "Belgravia mansion flats and townhouses"],
    "intro": "Belgravia is one of London's most exclusive residential districts — Eaton Square, Chester Square, the white stucco townhouses of Belgrave Square. Residents here expect precision in everything, including their tailoring.",
    "nearby": [("Chelsea", "/tailor-chelsea"), ("Pimlico", "/tailor-pimlico"), ("Westminster", "/tailor-westminster"), ("Knightsbridge", "/tailor-knightsbridge")],
    "nearby_location": "/tailor-belgravia",
  },
  {
    "slug": "marylebone",
    "name": "Marylebone",
    "postcode": "W1G/W1U/NW1",
    "postcode_list": "W1G, W1U or NW1",
    "streets": ["Marylebone High Street", "Harley Street", "Baker Street", "Wimpole Street", "Dorset Square", "Cavendish Square", "Devonshire Place", "W1G", "W1U", "NW1"],
    "intro": "Marylebone has a distinctive character — village-feeling streets, independent boutiques on the High Street, the professional addresses of Harley Street and Wimpole Street. If you're searching for a tailor near you in Marylebone, Fine Tailors provides the right answer.",
    "nearby": [("Mayfair", "/tailor-mayfair"), ("Fitzrovia", "/tailor-fitzrovia"), ("Paddington", "/tailor-paddington"), ("Bloomsbury", "/tailor-bloomsbury")],
    "nearby_location": "/tailor-marylebone",
  },
  {
    "slug": "westminster",
    "name": "Westminster",
    "postcode": "SW1A/SW1P",
    "postcode_list": "SW1A or SW1P",
    "streets": ["Victoria Street", "Horseferry Road", "Smith Square", "Millbank", "Marsham Street", "Dean Stanley Street", "SW1A", "SW1P", "Westminster offices and government buildings"],
    "intro": "Westminster is the centre of British political and institutional life — and also home to a significant residential and professional population. Suits here are not worn casually. If you need a tailor near you in Westminster, the standard matters.",
    "nearby": [("Pimlico", "/tailor-pimlico"), ("Victoria", "/tailor-victoria"), ("Belgravia", "/tailor-belgravia"), ("Chelsea", "/tailor-chelsea")],
    "nearby_location": "/tailor-westminster",
  },
  {
    "slug": "victoria",
    "name": "Victoria",
    "postcode": "SW1V/SW1E",
    "postcode_list": "SW1V or SW1E",
    "streets": ["Victoria Street", "Buckingham Palace Road", "Eccleston Square", "Warwick Square", "Vauxhall Bridge Road", "Belgrave Road", "SW1V", "SW1E", "Victoria Station area residences"],
    "intro": "Victoria is a busy transit hub but also a genuinely residential area — Eccleston Square, Warwick Square and the streets running south towards Pimlico have long been home to a diverse professional population who expect excellent local services.",
    "nearby": [("Pimlico", "/tailor-pimlico"), ("Westminster", "/tailor-westminster"), ("Belgravia", "/tailor-belgravia"), ("Chelsea", "/tailor-chelsea")],
    "nearby_location": "/tailor-victoria",
  },
  {
    "slug": "pimlico",
    "name": "Pimlico",
    "postcode": "SW1V",
    "postcode_list": "SW1V",
    "streets": ["Lupus Street", "Tachbrook Street", "Churton Street", "Bessborough Street", "St George's Square", "Moreton Street", "Charlwood Street", "SW1V", "SW1P", "Pimlico residential streets"],
    "intro": "Pimlico is a close-knit residential grid of stucco terraces tucked between Chelsea and Westminster. It has its own distinct character — and residents who value convenience. If you need a tailor near you in Pimlico, Fine Tailors comes to your door.",
    "nearby": [("Victoria", "/tailor-victoria"), ("Westminster", "/tailor-westminster"), ("Chelsea", "/tailor-chelsea"), ("Belgravia", "/tailor-belgravia")],
    "nearby_location": "/tailor-pimlico",
  },
  {
    "slug": "fitzrovia",
    "name": "Fitzrovia",
    "postcode": "W1T/W1W",
    "postcode_list": "W1T or W1W",
    "streets": ["Charlotte Street", "Fitzroy Square", "Tottenham Court Road", "Goodge Street", "Newman Street", "Rathbone Place", "W1T", "W1W", "Fitzrovia creative offices and residences"],
    "intro": "Fitzrovia sits between Marylebone, Soho and Bloomsbury — a creative, media-heavy neighbourhood with a mix of well-dressed professionals and a strong independent-business culture. If you're looking for a tailor near you in Fitzrovia, Fine Tailors makes it easy.",
    "nearby": [("Marylebone", "/tailor-marylebone"), ("Soho", "/tailor-soho"), ("Bloomsbury", "/tailor-bloomsbury"), ("Mayfair", "/tailor-mayfair")],
    "nearby_location": "/tailor-fitzrovia",
  },
  {
    "slug": "bloomsbury",
    "name": "Bloomsbury",
    "postcode": "WC1/WC2",
    "postcode_list": "WC1 or WC2",
    "streets": ["Bedford Square", "Bloomsbury Square", "Russell Square", "Gower Street", "Southampton Row", "Montague Street", "Tavistock Square", "WC1B", "WC1H", "Bloomsbury academic and residential addresses"],
    "intro": "Bloomsbury has a dual character — the literary and academic heritage of the British Museum and the great squares, alongside a genuinely residential community in the streets around Russell Square and Bedford Square. A tailor near you in Bloomsbury should reflect that quiet, discerning standard.",
    "nearby": [("Fitzrovia", "/tailor-fitzrovia"), ("Islington", "/tailor-islington"), ("Clerkenwell", "/tailor-clerkenwell"), ("Covent Garden", "/tailor-covent-garden")],
    "nearby_location": "/tailor-bloomsbury",
  },
  {
    "slug": "soho",
    "name": "Soho",
    "postcode": "W1D/W1F",
    "postcode_list": "W1D or W1F",
    "streets": ["Wardour Street", "Dean Street", "Berwick Street", "Carnaby Street", "Old Compton Street", "Brewer Street", "Lexington Street", "W1D", "W1F", "Soho creative offices and residences"],
    "intro": "Soho is London at its most concentrated — restaurants, media offices, creative agencies, and a residential community tucked between the streets. Fashion and presentation matter here. If you're searching for a tailor near you in Soho, Fine Tailors makes the process seamless.",
    "nearby": [("Mayfair", "/tailor-mayfair"), ("Fitzrovia", "/tailor-fitzrovia"), ("Covent Garden", "/tailor-covent-garden"), ("Bloomsbury", "/tailor-bloomsbury")],
    "nearby_location": "/tailor-soho",
  },
  {
    "slug": "covent-garden",
    "name": "Covent Garden",
    "postcode": "WC2E/WC2H",
    "postcode_list": "WC2E or WC2H",
    "streets": ["Long Acre", "Floral Street", "Neal Street", "Monmouth Street", "Drury Lane", "The Piazza", "Bedford Street", "WC2E", "WC2H", "Covent Garden offices and residential streets"],
    "intro": "Covent Garden sits at a crossroads — the fashion boutiques of Floral Street and Monmouth Street, the theatre-world proximity, and a genuine residential community in the streets around Long Acre. If you need a tailor near you in Covent Garden, Fine Tailors collects from your door.",
    "nearby": [("Soho", "/tailor-soho"), ("Bloomsbury", "/tailor-bloomsbury"), ("Clerkenwell", "/tailor-clerkenwell"), ("Islington", "/tailor-islington")],
    "nearby_location": "/tailor-covent-garden",
  },
  {
    "slug": "islington",
    "name": "Islington",
    "postcode": "N1/EC1V",
    "postcode_list": "N1 or EC1V",
    "streets": ["Upper Street", "Islington Green", "Camden Passage", "Canonbury Square", "Barnsbury Street", "Thornhill Square", "Almeida Street", "N1", "EC1V", "Islington residential streets and terraces"],
    "intro": "Islington has always had a strong sense of its own style — the independent shops of Upper Street, the well-preserved Georgian terraces of Barnsbury and Canonbury, the well-dressed professionals who live here. Finding a tailor near you in Islington should match that standard.",
    "nearby": [("Clerkenwell", "/tailor-clerkenwell"), ("Bloomsbury", "/tailor-bloomsbury"), ("Shoreditch", "/tailor-shoreditch"), ("Covent Garden", "/tailor-covent-garden")],
    "nearby_location": "/tailor-islington",
  },
  {
    "slug": "notting-hill",
    "name": "Notting Hill",
    "postcode": "W11",
    "postcode_list": "W11",
    "streets": ["Portobello Road", "Westbourne Grove", "Ledbury Road", "Ladbroke Grove", "Pembridge Road", "All Saints Road", "Notting Hill Gate", "W11", "W10", "Notting Hill residential streets and mews"],
    "intro": "Notting Hill has a character that is entirely its own — Portobello Road on a Saturday, the stucco townhouses of Pembridge Villas, the boutiques of Westbourne Grove. Residents here have a considered approach to clothes and expect the same from their tailors.",
    "nearby": [("Kensington", "/tailor-kensington"), ("Paddington", "/tailor-paddington"), ("Fulham", "/tailor-fulham"), ("Chelsea", "/tailor-chelsea")],
    "nearby_location": "/tailor-notting-hill",
  },
  {
    "slug": "paddington",
    "name": "Paddington",
    "postcode": "W2",
    "postcode_list": "W2",
    "streets": ["Praed Street", "Sussex Gardens", "Hyde Park Square", "Westbourne Terrace", "Craven Road", "Porchester Square", "Bishop's Bridge Road", "W2", "W9", "Paddington residential streets and canal-side apartments"],
    "intro": "Paddington is a neighbourhood of contrasts — the canal-side apartments of Little Venice, the Victorian stucco of Sussex Gardens, the busy transit hub around the station. Fine Tailors collects from any Paddington address and returns your garments in 5-7 days.",
    "nearby": [("Notting Hill", "/tailor-notting-hill"), ("Marylebone", "/tailor-marylebone"), ("Kensington", "/tailor-kensington"), ("Bloomsbury", "/tailor-bloomsbury")],
    "nearby_location": "/tailor-paddington",
  },
  {
    "slug": "fulham",
    "name": "Fulham",
    "postcode": "SW6",
    "postcode_list": "SW6",
    "streets": ["Fulham Road", "New Kings Road", "Parsons Green Lane", "Munster Road", "Dawes Road", "Lillie Road", "Imperial Road", "SW6", "SW10", "Fulham residential streets and mansion flats"],
    "intro": "Fulham is a well-established residential area with a strong sense of community — the Fulham Road boutiques, the terraces around Parsons Green, the professional households along New Kings Road. If you need a tailor near you in Fulham, Fine Tailors brings the service to your door.",
    "nearby": [("Chelsea", "/tailor-chelsea"), ("Kensington", "/tailor-kensington"), ("Notting Hill", "/tailor-notting-hill"), ("South Kensington", "/tailor-south-kensington")],
    "nearby_location": "/tailor-fulham",
  },
  {
    "slug": "clerkenwell",
    "name": "Clerkenwell",
    "postcode": "EC1",
    "postcode_list": "EC1",
    "streets": ["Clerkenwell Road", "Exmouth Market", "St John Street", "Farringdon Road", "Charterhouse Street", "Jerusalem Passage", "Cowcross Street", "EC1M", "EC1R", "Clerkenwell creative studios and residential lofts"],
    "intro": "Clerkenwell is one of London's most design-conscious neighbourhoods — the creative studios around Exmouth Market, the historic streets near St John's Gate, and a professional community with high standards. If you're looking for a tailor near you in Clerkenwell, Fine Tailors collects from your door.",
    "nearby": [("Islington", "/tailor-islington"), ("City of London", "/tailor-city-of-london"), ("Bloomsbury", "/tailor-bloomsbury"), ("Shoreditch", "/tailor-shoreditch")],
    "nearby_location": "/tailor-clerkenwell",
  },
  {
    "slug": "south-kensington",
    "name": "South Kensington",
    "postcode": "SW7",
    "postcode_list": "SW7",
    "streets": ["Old Brompton Road", "Thurloe Square", "Onslow Gardens", "Sydney Street", "Fulham Road", "Pelham Street", "Harrington Road", "SW7", "SW5", "South Kensington mansion blocks and garden squares"],
    "intro": "South Kensington is one of London's most elegant neighbourhoods — the great museum quarter, the French-speaking community around the Institut francais, and some of the finest mansion blocks and garden squares in the city. A tailor near you in South Kensington should match that standard.",
    "nearby": [("Kensington", "/tailor-kensington"), ("Chelsea", "/tailor-chelsea"), ("Knightsbridge", "/tailor-knightsbridge"), ("Fulham", "/tailor-fulham")],
    "nearby_location": "/tailor-south-kensington",
  },
]

def make_component_name(name):
    return name.replace(" ", "").replace("-", "")

def make_streets_jsx(streets):
    lines = []
    for s in streets:
        lines.append(f'            {{["{s}"].map(a => <li key={{a}} className="flex gap-2"><span className="text-hunter">—</span>{{a}}</li>)}}')
    return "\n".join(lines)

def make_nearby_links(nearby):
    parts = []
    for n, href in nearby:
        parts.append(f'<Link href="{href}" className="text-hunter underline">{n}</Link>')
    return ", ".join(parts)

template = """\
import type {{ Metadata }} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {{
  title: 'Tailor Near Me in {name} London — Collection Service | Fine Tailors',
  description: 'Looking for a tailor near you in {name}? Fine Tailors collects from your {postcode} door, alters suits, dresses and garments to a perfect fit, and returns in 5–7 days.',
  keywords: ['tailor near me {name}', 'tailor near me {name} London', '{name} tailor near me', 'nearest tailor {name}', 'tailor {name} London', 'mobile tailor {name}'],
  alternates: {{ canonical: 'https://www.finetailors.co.uk/blog/tailor-near-me-{slug}' }},
  openGraph: {{
    title: 'Tailor Near Me in {name} London — Collection Service | Fine Tailors',
    url: 'https://www.finetailors.co.uk/blog/tailor-near-me-{slug}',
    images: [{{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tailor near me in {name} London' }}],
  }},
}}

const schema = {{
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tailor Near Me in {name} London — Collection Service',
  description: 'How to find the best tailor near you in {name} — and why a collection-based service is the right choice for {postcode} residents.',
  image: 'https://www.finetailors.co.uk/images/tailor.jpg',
  datePublished: '2026-05-25',
  dateModified: '2026-05-25',
  author: {{ '@type': 'Organization', name: 'Fine Tailors' }},
  publisher: {{ '@type': 'Organization', name: 'Fine Tailors', url: 'https://www.finetailors.co.uk' }},
  mainEntityOfPage: 'https://www.finetailors.co.uk/blog/tailor-near-me-{slug}',
}}

const breadcrumb = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' }},
    {{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' }},
    {{ '@type': 'ListItem', position: 3, name: 'Tailor Near Me in {name}', item: 'https://www.finetailors.co.uk/blog/tailor-near-me-{slug}' }},
  ],
}}

export default function TailorNearMe{component_name}() {{
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(schema) }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(breadcrumb) }}}} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="relative w-full h-72 lg:h-96 overflow-hidden">
          <Image src="/images/tailor.jpg" alt="Tailor near me in {name} London" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="px-8 lg:px-24 py-16 max-w-3xl">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>Tailor Near Me in {name}</span>
          </nav>

          <p className="font-sans text-xs text-muted uppercase tracking-widest mb-4">Local Guide · 5 min read</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3rem] leading-[1.1] font-medium text-charcoal mb-6">
            Tailor Near Me in {name}, London
          </h1>
          <p className="font-sans font-light text-lg text-muted leading-relaxed mb-12">
            {intro} Fine Tailors collects from your {postcode_list} door and returns your garments perfectly altered within 5–7 working days.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">What &lsquo;Tailor Near Me&rsquo; Really Means in {name}</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-4">
            The nearest alterations shop to your {name} address may not be the right choice for your garments. A shop requires you to carry your clothes in, wait for an appointment, leave them and return again to collect. Fine Tailors removes every step of that process.
          </p>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We offer a better answer to &ldquo;tailor near me&rdquo; in {name}: a collection service that comes directly to your {postcode_list} address, handles your garments from start to finish, and delivers them pressed and perfectly fitted — without you ever leaving home.
          </p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">How It Works</h2>
          <ol className="space-y-4 mb-8">
            {{[
              ['Book online or call', 'Select a collection time that suits you — morning, afternoon or evening, any day.'],
              ['We collect from your {name} door', 'We come to your {postcode_list} address. Doorstep collection only — no entry required.'],
              ['Your garments are altered', 'Every piece handled in our specialist workshop. Written quote sent for approval before work begins.'],
              ['We return pressed and perfect', 'Within 5–7 working days your clothes are back at your door, ready to wear.'],
            ].map(([title, desc], i) => (
              <li key={{i}} className="flex gap-4">
                <span className="font-playfair text-xl text-hunter/30 shrink-0 w-6">{{i + 1}}</span>
                <div>
                  <strong className="font-playfair font-medium text-charcoal">{{title}}.</strong>{{' '}}
                  <span className="font-sans font-light text-muted">{{desc}}</span>
                </div>
              </li>
            ))}}
          </ol>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">What We Alter in {name}</h2>
          <ul className="space-y-2 mb-8 font-sans font-light text-muted">
            {{[
              'Suit alterations — jacket resizing, sleeve shortening, trouser hemming and tapering',
              'Dress alterations — shortening, take-in, zip replacement, occasion wear',
              'Coat and jacket alterations — body resizing, sleeve work, coat shortening',
              'Trouser and jean alterations — hemming, tapering, waist adjustment',
              'Designer and luxury garments — handled with specialist care',
              'Wedding dress alterations — specialist bridal work handled with full care',
            ].map((item, i) => (
              <li key={{i}} className="flex gap-3">
                <span className="text-hunter mt-1">—</span>
                <span>{{item}}</span>
              </li>
            ))}}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Prices for {name} Alterations</h2>
          <div className="border border-divider divide-y divide-divider mb-8">
            {{[
              ['Trouser hemming', 'from £18'],
              ['Trouser tapering', 'from £18'],
              ['Jacket sleeve shortening', 'from £30'],
              ['Jacket back take-in', 'from £18'],
              ['Plain dress shortening', 'from £25'],
              ['Dress take-in', 'from £28'],
              ['Coat shortening', 'from £45'],
              ['Designer / leather pieces', 'Quoted on inspection'],
            ].map(([service, price]) => (
              <div key={{service}} className="flex justify-between px-5 py-3 font-sans text-sm">
                <span className="font-light text-charcoal">{{service}}</span>
                <span className="text-muted">{{price}}</span>
              </div>
            ))}}
          </div>
          <p className="font-sans text-sm font-light text-muted mb-8">Minimum order £20. All prices include collection and return to your {name} address.</p>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">{name} Areas We Cover</h2>
          <ul className="grid grid-cols-2 gap-2 mb-8 font-sans font-light text-sm text-muted">
{streets_ul}
          </ul>

          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Nearby Areas We Also Serve</h2>
          <p className="font-sans font-light text-muted leading-relaxed mb-8">
            We cover <Link href="{nearby_location}" className="text-hunter underline">{name}</Link>, {nearby_links}. See the <Link href="/tailor-near-me" className="text-hunter underline">full tailor near me coverage page</Link> for every London area.
          </p>

          <div className="border-t border-divider pt-10">
            <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection in {name}</h2>
            <p className="font-sans font-light text-muted mb-6 leading-relaxed">
              Book a collection from your {name} address online or call us directly.
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
        </div>

      </main>
      <Footer />
    </>
  )
}}
"""

for area in areas:
    slug = area["slug"]
    name = area["name"]
    postcode = area["postcode"]
    postcode_list = area["postcode_list"]
    streets = area["streets"]
    intro = area["intro"]
    nearby = area["nearby"]
    nearby_location = area["nearby_location"]

    component_name = make_component_name(name)
    nearby_links = make_nearby_links(nearby)

    streets_ul = ""
    for s in streets:
        s_escaped = s.replace("'", "\\'")
        streets_ul += f'            <li className="flex gap-2"><span className="text-hunter">—</span>{s}</li>\n'

    content = template.format(
        slug=slug,
        name=name,
        postcode=postcode,
        postcode_list=postcode_list,
        intro=intro,
        nearby_location=nearby_location,
        nearby_links=nearby_links,
        component_name=component_name,
        streets_ul=streets_ul,
    )

    path = f"{base}/tailor-near-me-{slug}/page.tsx"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: tailor-near-me-{slug}")

print("All 16 blog posts written.")
