#!/usr/bin/env python3
import os

base = "D:/toptailor/src/app/blog"

posts = [
    {
        "path": "tailor-that-comes-to-you-london",
        "component": "TailorThatComesToYouLondon",
        "title": "A Tailor That Comes to You in London — How Fine Tailors Works",
        "slug": "tailor-that-comes-to-you-london",
        "meta_title": "Tailor That Comes to You London | Home Collection Service | Fine Tailors",
        "meta_desc": "Fine Tailors is the London tailor that comes to you. We collect your garments from your Central London door, alter them at our workshop, and return them in 5-7 days.",
        "canonical": "https://www.finetailors.co.uk/blog/tailor-that-comes-to-you-london",
        "date_published": "2026-05-25",
        "date_modified": "2026-05-25",
        "h1": "A Tailor That Comes to You in London",
        "h1_em": "The Collection-Based Service Explained",
        "intro": """Finding a tailor that comes to you sounds like a luxury reserved for a different era — the kind of thing that happened before high street shops took over every city centre. In London today, it is not only possible but increasingly the preferred option for anyone who owns clothes worth caring about.""",
        "section1_h2": "Why a Tailor That Comes to You Makes Sense in London",
        "section1": """The city has a geography problem for traditional tailoring. A good alteration takes time to book, carry to, and collect from. If you live in Mayfair and the best tailor you know of is in Battersea, you are looking at a significant time commitment — and that is before you factor in carrying delicate or valuable garments on public transport.

Fine Tailors was built around this reality. We collect your garments from your door, alter them at our specialist workshop, and return them pressed and ready to wear — typically within 5–7 working days. The tailor comes to your door, not the other way around.

This model suits London professionals particularly well: finance workers in the City who need suits in continuous rotation, creatives in Soho and Fitzrovia who care deeply about how their clothes fit, residents across Mayfair, Knightsbridge and Chelsea who value discretion and convenience equally.""",
        "section2_h2": "What a Tailor That Comes to You Can Do",
        "services": [
            ("Suit Alterations", "Jacket, trouser and waistcoat work — taking in, letting out, sleeve shortening, trouser hemming and tapering. From £25."),
            ("Trouser & Jean Alterations", "Hemming, tapering, waist adjustments, original hem preservation on jeans. From £18."),
            ("Dress Alterations", "Shortening, taking in, zip work, strap adjustments. Evening gowns, day dresses and occasion wear. From £22."),
            ("Jacket & Coat Alterations", "Sleeve shortening, body tapering, relining, coat shortening. From £30."),
            ("Wedding Dress Alterations", "Specialist handling for bridal wear — quoted on inspection after collection."),
            ("Leather Jacket Alterations", "Expert leather work including zip replacement, sleeve shortening and body tapering — quoted on inspection."),
            ("Shirt Alterations", "Sleeve shortening, body tapering, collar adjustments. From £20."),
            ("Zip Repair & Replacement", "Trouser zips from £25, dress zips from £28, jacket and coat zips from £35."),
        ],
        "section3_h2": "The Collection Process — Step by Step",
        "steps": [
            ("Book a Collection Slot", "Book online or call. We confirm a time at your address — morning, afternoon or evening."),
            ("We Collect From Your Door", "We arrive at the agreed time. Collection is from your doorstep — the tailor does not enter your home."),
            ("Written Quote Sent for Approval", "We inspect every garment and send a written quote before any work begins. Nothing is altered without your sign-off."),
            ("We Alter at Our Workshop", "Every piece is worked on in our workshop with full attention. No shop floor, no queue."),
            ("We Return, Pressed and Perfect", "Within 5–7 working days your garments are back at your door, pressed and ready to wear."),
        ],
        "section4_h2": "Areas Where We Collect",
        "areas": [
            ("Mayfair", "/tailor-mayfair"),
            ("Knightsbridge", "/tailor-knightsbridge"),
            ("Chelsea", "/tailor-chelsea"),
            ("Kensington", "/tailor-kensington"),
            ("Belgravia", "/tailor-belgravia"),
            ("Marylebone", "/tailor-marylebone"),
            ("Westminster", "/tailor-westminster"),
            ("Soho", "/tailor-soho"),
            ("Fitzrovia", "/tailor-fitzrovia"),
            ("Bloomsbury", "/tailor-bloomsbury"),
            ("Islington", "/tailor-islington"),
            ("City of London", "/tailor-city-of-london"),
            ("Notting Hill", "/tailor-notting-hill"),
            ("Pimlico", "/tailor-pimlico"),
            ("Victoria", "/tailor-victoria"),
            ("South Kensington", "/tailor-south-kensington"),
            ("Fulham", "/tailor-fulham"),
            ("Paddington", "/tailor-paddington"),
            ("Covent Garden", "/tailor-covent-garden"),
            ("Clerkenwell", "/tailor-clerkenwell"),
            ("Canary Wharf", "/tailor-canary-wharf"),
            ("Shoreditch", "/tailor-shoreditch"),
        ],
        "cta_service_link": "/mobile-tailor-london",
        "cta_service_label": "mobile tailoring service",
    },
    {
        "path": "suit-alterations-near-me-london",
        "component": "SuitAlterationsNearMeLondon",
        "title": "Suit Alterations Near Me in London — Why Nearest Is Not Always Best",
        "slug": "suit-alterations-near-me-london",
        "meta_title": "Suit Alterations Near Me London | Collected From Your Door | Fine Tailors",
        "meta_desc": "Looking for suit alterations near you in London? Fine Tailors collects from your Central London door and returns your suit perfectly fitted in 5-7 days. No shop visit.",
        "canonical": "https://www.finetailors.co.uk/blog/suit-alterations-near-me-london",
        "date_published": "2026-05-25",
        "date_modified": "2026-05-25",
        "h1": "Suit Alterations Near Me in London",
        "h1_em": "Why Collection Beats Proximity",
        "intro": """When you search \"suit alterations near me\" in London, you get a map of local shops — some of which you have never heard of, with reviews that tell you little about the quality of work on a tailored suit versus a pair of budget trousers. There is a better question to ask: which service is best for your specific garment, regardless of distance?""",
        "section1_h2": "The Problem With Nearest",
        "section1": """The closest alteration shop to your postcode may be perfectly good for a quick hem. But for a well-made suit — bespoke, made-to-measure, or even a quality off-the-peg — the alteration matters as much as the original construction. The wrong cut on a jacket chest or a badly pitched trouser seat is more damaging than wearing the suit slightly long.

Fine Tailors operates on a different model. We are not the nearest option to any single postcode. Instead, we collect from every Central London postcode — W1, SW1, SW3, SW7, W8, WC1, WC2, EC1, EC2, E14, N1, W11, W2 and surrounding areas — and bring every suit back to our specialist workshop. The result is consistent, expert work regardless of where in Central London you live or work.

The collection model also eliminates the most inconvenient part of using a high street shop: getting there and back with your suit. Collection and return at your door means the service fits around you.""",
        "section2_h2": "What Suit Alterations We Provide",
        "services": [
            ("Jacket Taking In or Letting Out", "Body width adjustment at the side seams — the most common suit jacket alteration. From £35."),
            ("Sleeve Shortening", "Shortening the jacket sleeves with or without working buttonholes. From £25."),
            ("Trouser Hemming", "Plain hem or turn-up hem — the most common trouser alteration. From £18."),
            ("Trouser Tapering", "Narrowing the trouser leg for a modern silhouette. From £22."),
            ("Trouser Waist Adjustment", "Taking in or letting out the trouser waist at the back. From £22."),
            ("Jacket Shoulder Adjustment", "Shoulder alterations are complex — quoted on inspection after collection."),
            ("Full Suit Re-Cut", "Comprehensive alteration of jacket and trousers together — quoted on inspection."),
            ("Trouser Seat Adjustment", "Seat letting out or taking in for fit through the hips and thighs. From £28."),
        ],
        "section3_h2": "How It Works",
        "steps": [
            ("Book Online or Call", "Choose your collection slot. We serve all Central London postcodes seven days a week."),
            ("We Come to Your Door", "We collect your suit at the agreed time. Doorstep only — no need to be in more than a moment."),
            ("Written Quote Approved", "We send a written quote for your sign-off before a single stitch is placed."),
            ("Altered at Our Workshop", "Every suit is worked on by one tailor — our Single Needle Guarantee."),
            ("Returned in 5-7 Working Days", "Your suit comes back to your door, pressed and ready for its next outing."),
        ],
        "section4_h2": "Areas We Cover for Suit Alterations",
        "areas": [
            ("Mayfair", "/suit-alterations-mayfair"),
            ("Chelsea", "/suit-alterations-chelsea"),
            ("Knightsbridge", "/suit-alterations-knightsbridge"),
            ("Kensington", "/tailor-kensington"),
            ("Belgravia", "/tailor-belgravia"),
            ("Marylebone", "/tailor-marylebone"),
            ("Westminster", "/tailor-westminster"),
            ("Soho", "/tailor-soho"),
            ("Fitzrovia", "/tailor-fitzrovia"),
            ("Bloomsbury", "/tailor-bloomsbury"),
            ("Islington", "/tailor-islington"),
            ("City of London", "/tailor-city-of-london"),
            ("Canary Wharf", "/tailor-canary-wharf"),
            ("Notting Hill", "/tailor-notting-hill"),
            ("Pimlico", "/tailor-pimlico"),
            ("South Kensington", "/tailor-south-kensington"),
        ],
        "cta_service_link": "/suit-alterations-london",
        "cta_service_label": "suit alterations service",
    },
]


def make_services_jsx(services):
    rows = ""
    for name, desc in services:
        rows += f"""            <tr className="border-t border-divider">
              <td className="py-3 pr-6 font-sans font-light text-sm text-charcoal">{name}</td>
              <td className="py-3 font-sans font-light text-sm text-muted">{desc}</td>
            </tr>\n"""
    return rows


def make_steps_jsx(steps):
    items = ""
    for i, (title, desc) in enumerate(steps, 1):
        items += f"""            <li className="flex gap-6">
              <span className="font-playfair text-2xl text-hunter/30 shrink-0 w-8">{i}</span>
              <div>
                <h3 className="font-playfair font-medium text-charcoal mb-1">{title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </li>\n"""
    return items


def make_areas_jsx(areas):
    items = ""
    for name, href in areas:
        items += f"""            <Link href="{href}" className="font-sans text-sm font-light text-hunter underline border border-divider px-4 py-3 hover:bg-white/50 transition-colors">{name}</Link>\n"""
    return items


template = """\
import type {{ Metadata }} from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ, {{ faqSchema }} from '@/components/FAQ'

export const metadata: Metadata = {{
  title: '{meta_title}',
  description: '{meta_desc}',
  alternates: {{ canonical: '{canonical}' }},
  openGraph: {{
    title: '{meta_title}',
    description: '{meta_desc}',
    url: '{canonical}',
    images: [{{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors London' }}],
  }},
}}

const breadcrumb = {{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.finetailors.co.uk' }},
    {{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.finetailors.co.uk/blog' }},
    {{ '@type': 'ListItem', position: 3, name: '{title}', item: '{canonical}' }},
  ],
}}

const articleSchema = {{
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': '{canonical}',
  url: '{canonical}',
  headline: '{title}',
  description: '{meta_desc}',
  datePublished: '{date_published}',
  dateModified: '{date_modified}',
  author: {{
    '@type': 'Organization',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
  }},
  publisher: {{
    '@type': 'Organization',
    name: 'Fine Tailors',
    url: 'https://www.finetailors.co.uk',
    logo: {{ '@type': 'ImageObject', url: 'https://www.finetailors.co.uk/logo-icon.png' }},
  }},
  mainEntityOfPage: {{ '@type': 'WebPage', '@id': '{canonical}' }},
  isPartOf: {{ '@id': 'https://www.finetailors.co.uk/#website' }},
}}

export default function {component}() {{
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(breadcrumb) }}}} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(articleSchema) }}}} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(faqSchema) }}}} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        <div className="px-8 lg:px-24 py-20 border-b border-divider">
          <nav className="font-sans text-xs text-muted mb-8">
            <Link href="/" className="hover:text-hunter">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-hunter">Blog</Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </nav>
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-hunter mb-4">Fine Tailors · London · {date_published}</p>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium text-charcoal mb-6">
            {h1} {{' '}}
            <em className="font-playfair italic">{h1_em}</em>
          </h1>
          <p className="font-sans font-light text-lg text-muted max-w-2xl leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">{section1_h2}</h2>
{section1_paras}
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">{section2_h2}</h2>
          <table className="w-full max-w-3xl border-collapse">
            <thead>
              <tr className="border-b-2 border-charcoal/10">
                <th className="text-left py-3 pr-6 font-sans text-xs uppercase tracking-[0.15em] text-muted">Alteration</th>
                <th className="text-left py-3 font-sans text-xs uppercase tracking-[0.15em] text-muted">Details</th>
              </tr>
            </thead>
            <tbody>
{services_rows}            </tbody>
          </table>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider max-w-4xl">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-8">{section3_h2}</h2>
          <ol className="space-y-6">
{steps_items}          </ol>
        </div>

        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">{section4_h2}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
{areas_links}          </div>
        </div>

        <FAQ />

        <div className="px-8 lg:px-24 py-16">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-4">Book a Collection</h2>
          <p className="font-sans font-light text-muted mb-6 max-w-lg leading-relaxed">
            See our <Link href="{cta_service_link}" className="text-hunter underline">{cta_service_label}</Link> for full details,
            or book directly below. We cover all Central London postcodes seven days a week.
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


def make_section1_paras(text):
    paras = [p.strip() for p in text.strip().split("\n\n") if p.strip()]
    jsx = ""
    for p in paras:
        jsx += f'          <p className="font-sans font-light text-muted leading-relaxed mb-4">\n            {p}\n          </p>\n'
    return jsx


for post in posts:
    services_rows = make_services_jsx(post["services"])
    steps_items = make_steps_jsx(post["steps"])
    areas_links = make_areas_jsx(post["areas"])
    section1_paras = make_section1_paras(post["section1"])

    content = template.format(
        component=post["component"],
        meta_title=post["meta_title"],
        meta_desc=post["meta_desc"],
        canonical=post["canonical"],
        title=post["title"],
        date_published=post["date_published"],
        date_modified=post["date_modified"],
        h1=post["h1"],
        h1_em=post["h1_em"],
        intro=post["intro"],
        section1_h2=post["section1_h2"],
        section1_paras=section1_paras,
        section2_h2=post["section2_h2"],
        services_rows=services_rows,
        section3_h2=post["section3_h2"],
        steps_items=steps_items,
        section4_h2=post["section4_h2"],
        areas_links=areas_links,
        cta_service_link=post["cta_service_link"],
        cta_service_label=post["cta_service_label"],
    )

    path = f"{base}/{post['path']}/page.tsx"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {post['path']}")

print("Batch 4 blog posts written.")
