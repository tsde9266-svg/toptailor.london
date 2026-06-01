import type { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tailoring & Alteration Services London | Collected From Your Door | Fine Tailors',
  description: 'All tailoring and alteration services in London — suits, dresses, trousers, jackets, skirts, wedding dresses, leather, fur and more. Collected from your Central London door in 5–7 days.',
  alternates: { canonical: 'https://www.finetailors.co.uk/services' },
  openGraph: {
    title: 'Tailoring & Alteration Services London | Fine Tailors',
    description: 'All garment alteration services in London collected from your door. Suits, dresses, coats, leather jackets, fur coats and more.',
    url: 'https://www.finetailors.co.uk/services',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors — Alteration Services London' }],
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://www.finetailors.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.finetailors.co.uk/services' },
  ],
}

// ─── Rich service sections ─────────────────────────────────────────────────────
const serviceBlocks = [
  {
    id:       'suits',
    title:    'Suit Alterations',
    href:     '/suit-alterations-london',
    price:    'Jackets from £18 · Trousers from £25',
    img:      'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Professional suit fitting and alteration',
    body:     'A perfectly fitted suit is one of the most powerful things a person can wear. Whether you have just had a suit made that needs final adjustments, bought off the peg and need it taken in, or have a favourite jacket that no longer fits — we collect from your door and return it transformed.',
    examples: [
      'Jacket sleeve shortening from cuff or shoulder',
      'Body take-in and waist suppression',
      'Trouser hemming, tapering and waist adjustment',
      'Waistcoat alterations and lining repairs',
      'Full suit re-cut for significant size changes',
    ],
    reverse: false,
  },
  {
    id:       'dresses',
    title:    'Dress Alterations',
    href:     '/dress-alterations-london',
    price:    'From £25',
    img:      'https://images.unsplash.com/photo-1524563970700-a302b6888e17?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Dress alteration and fitting',
    body:     'From everyday dresses to formal evening gowns, we handle the full spectrum of dress alterations. Shortening, taking in, letting out, strap adjustments, zip replacements and neckline changes — all handled with the care your garment deserves.',
    examples: [
      'Plain dress shortening — £25',
      'Layered or lined dress shortening — from £35',
      'Taking in the body through the sides',
      'New zip or zip repair',
      'Strap shortening or removal',
    ],
    reverse: true,
  },
  {
    id:       'trousers',
    title:    'Trouser & Jean Alterations',
    href:     '/trouser-alterations-london',
    price:    'From £20',
    img:      'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Trouser hemming and tailoring',
    body:     'Trouser fit makes or breaks an outfit. Whether you need a hem taking up, a leg tapering, a waist letting in or a pocket repaired — we handle everything from designer trousers to everyday jeans, all from your door.',
    examples: [
      'Trouser shortening plain or with same finish — £25–£30',
      'Jeans shortening — £20–£28',
      'Leg tapering (2 seam or 4 seam)',
      'Waist adjustment on trousers or jeans',
      'New zip, pocket work and patch repairs',
    ],
    reverse: false,
  },
  {
    id:       'jackets',
    title:    'Jacket & Coat Alterations',
    href:     '/jacket-alterations-london',
    price:    'From £18',
    img:      'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Jacket alteration and sleeve shortening',
    body:     'Jackets and coats are some of the most complex garments to alter — sleeve pitch, shoulder balance, and lining all need to be considered. Our tailor has worked on everything from high-street blazers to luxury overcoats, handling each with equal precision.',
    examples: [
      'Sleeve shortening from cuff — £30',
      'Sleeve shortening from shoulder — £65',
      'Body take-in (1 or 3 seams)',
      'Jacket and coat shortening',
      'Full relining — from £75',
    ],
    reverse: true,
  },
  {
    id:       'shirts',
    title:    'Shirt Alterations',
    href:     '/shirt-alterations-london',
    price:    'From £15',
    img:      'https://images.unsplash.com/photo-1560796952-f1c9b838544c?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Shirt tailoring and body adjustment',
    body:     'A well-fitted shirt transforms how you look in a suit. Too wide in the body, sleeves too long, collar too loose — these are problems a tailor solves in days. We handle dress shirts, casual shirts and blouses across all fabrics.',
    examples: [
      'Sleeve shortening (same finish) — £30',
      'Length shortening — £28',
      'Body take in sides — £18',
      'Add darts for a tailored shape — £15',
      'Collar adjustments — from £20',
    ],
    reverse: false,
  },
  {
    id:       'skirts',
    title:    'Skirt Alterations',
    href:     '/services',
    price:    'From £22',
    img:      'https://images.unsplash.com/photo-1630930678172-63343537a00a?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Skirt hemming and alteration',
    body:     'Pencil skirts, A-line skirts, pleated midi skirts — each construction requires a different approach to altering. We handle shortening, waist adjustments, side seam reduction and zip replacement across all skirt types and fabrics.',
    examples: [
      'Skirt shortening — £25',
      'Layered or lined skirt shortening — from £35',
      'Waist adjustment',
      'Take in side seams',
      'New zip installation',
    ],
    reverse: true,
  },
  {
    id:       'ladies-suits',
    title:    'Ladies Suits',
    href:     '/services',
    price:    'From £25',
    img:      'https://images.unsplash.com/photo-1603394151492-5e9b974b090b?w=900&q=80&auto=format&fit=crop',
    imgAlt:   "Women's suit fitting and alteration",
    body:     'Women\'s suits require the same precision as menswear — often more so. Jacket body and sleeves, trouser or skirt waist and length, all altered as a coordinated set to maintain proportion and silhouette. We collect the full suit and return it perfectly matched.',
    examples: [
      'Jacket sleeve shortening',
      'Jacket body take-in',
      'Trouser shortening and waist adjustment',
      'Full ladies suit alteration (complete set)',
    ],
    reverse: false,
  },
  {
    id:       'jumpsuits',
    title:    'Jumpsuits & Playsuits',
    href:     '/services',
    price:    'From £35',
    img:      'https://images.unsplash.com/photo-1625479142928-c2f2914318f2?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Jumpsuit and playsuit alteration',
    body:     'Jumpsuits are notoriously difficult to fit off the peg — the crotch height, leg length and body proportions all need to work together. We specialise in making jumpsuits and playsuits work for your body, handling everything from leg shortening to body take-in.',
    examples: [
      'Leg shortening — from £35',
      'Body take-in at the sides',
      'Zip replacement',
      'Playsuit alterations — quoted on inspection',
    ],
    reverse: true,
  },
  {
    id:       'wedding',
    title:    'Wedding & Bridal Wear',
    href:     '/wedding-dress-alterations-london',
    price:    'Quoted on inspection',
    img:      'https://images.unsplash.com/photo-1585241920473-b472eb9ffbae?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Wedding dress alteration and bridal fitting',
    body:     'Your wedding dress deserves specialist care. We alter bridal gowns, bridesmaid dresses, beaded gowns, and prom dresses — handling layered tulle, delicate lace, structured bodices and intricate embellishments with the patience and skill they demand. All work priced after a full inspection.',
    examples: [
      'Wedding dress shortening (layered and structured)',
      'Bodice take-in and letting out',
      'Strap adjustment and neckline work',
      'Bridesmaid dress alterations',
      'Beaded and embellished occasion wear',
      'Prom and ball gown alterations',
    ],
    reverse: false,
  },
  {
    id:       'leather',
    title:    'Leather Jacket Alterations',
    href:     '/leather-jacket-alterations-london',
    price:    'Quoted on inspection',
    img:      'https://images.unsplash.com/photo-1593250816874-8edf4f732edb?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Leather jacket alteration and specialist work',
    body:     'Leather cannot be unpicked and re-sewn like fabric — every stitch hole is permanent. This is specialist work requiring specific equipment, thread and technique. We handle biker jackets, tailored leather blazers, suede jackets and fashion leather across all weights and finishes.',
    examples: [
      'Sleeve shortening (from cuff or shoulder)',
      'Body take-in — sides, chest and back',
      'Zip replacement and new zip addition',
      'Leather repairs and patches',
      'Suede and nubuck work',
    ],
    reverse: true,
  },
  {
    id:       'fur',
    title:    'Fur & Sheepskin Coats',
    href:     '/services',
    price:    'Quoted on inspection',
    img:      'https://images.unsplash.com/photo-1602706294170-1fed8eecd9f9?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Fur coat and sheepskin alteration',
    body:     'Fur coats — real, vintage and faux — require their own set of specialist techniques. Shortening a fur hem, re-lining the body, repairing seam splits or adjusting the shoulder width are all achievable, but only by a tailor who understands the construction. We quote every piece individually after collection.',
    examples: [
      'Fur coat shortening',
      'Re-lining (body and sleeves)',
      'Seam and lining repairs',
      'Faux fur jacket alterations',
      'Sheepskin coat alterations',
    ],
    reverse: false,
  },
  {
    id:       'luxury',
    title:    'Luxury Brand Outerwear',
    href:     '/services',
    price:    'Quoted on inspection',
    img:      'https://images.unsplash.com/photo-1641320197434-6ae0ca235048?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Luxury brand outerwear alteration',
    body:     'Canada Goose, Moncler and Barbour jackets have specific construction — down fill, waxed cotton, quilted baffles — that affects how alterations can be made. We understand the limitations and work within them, discussing exactly what is achievable before any work begins.',
    examples: [
      'Canada Goose — sleeve shortening, body adjustment',
      'Moncler — sleeve and zip work',
      'Barbour — waxed cotton and quilted alterations',
      'Down-fill jacket sleeve shortening',
    ],
    reverse: true,
  },
]

// ─── Luxury brand cards ────────────────────────────────────────────────────────
const luxuryBrands = [
  { title: 'Canada Goose', href: '/canada-goose-alterations-london', desc: 'Down-fill construction handled with specialist understanding. Sleeve shortening, body adjustment and zip repair.' },
  { title: 'Moncler',      href: '/moncler-jacket-alterations-london', desc: 'Quilted and down jacket alterations — sleeve shortening, body width reduction and zip work.' },
  { title: 'Barbour',      href: '/barbour-alterations-london', desc: 'Waxed cotton and quilted Barbour alterations. Wax compatibility discussed upfront.' },
]

export default function ServicesPage() {
  return (
    <>
      <Script id="breadcrumb" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] bg-parchment min-h-screen">

        {/* ── Hero ── */}
        <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
          <Image
            src="https://images.unsplash.com/photo-1606501126768-b78d4569d3f9?w=1600&q=80&auto=format&fit=crop"
            alt="Fine Tailors — alteration services collected from your London door"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(19,58,11,0.88) 0%, rgba(19,58,11,0.55) 60%, rgba(0,0,0,0.2) 100%)' }}
          />
          <div className="relative z-10 px-8 lg:px-24 py-20 lg:py-28 max-w-3xl">
            <nav className="font-sans text-xs text-parchment/50 mb-8">
              <Link href="/" className="hover:text-parchment/80">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-parchment/70">Services</span>
            </nav>
            <h1 className="font-playfair text-[2.75rem] lg:text-[4rem] leading-[1.05] font-medium text-parchment mb-6">
              Every Garment. <br />
              <em className="italic">Collected From Your Door.</em>
            </h1>
            <p className="font-sans font-light text-parchment/80 text-[1.0625rem] max-w-xl leading-relaxed mb-8">
              Suits, dresses, trousers, leather, fur, bridal — we alter everything. No shop visit. No travel. We come to your Central London home and return your garments pressed and perfect in 5–7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book-visit" className="bg-parchment text-charcoal px-8 py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-white transition-colors">
                Book a Visit →
              </Link>
              <Link href="/prices" className="border border-parchment/40 text-parchment px-8 py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:border-parchment transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* ── Trust bar ── */}
        <div className="bg-hunter text-parchment px-8 lg:px-24 py-5">
          <div className="flex flex-wrap gap-x-10 gap-y-3 items-center">
            {[
              '✓ Collected from your door',
              '✓ Fully insured in transit',
              '✓ Written quote before work begins',
              '✓ One tailor — start to finish',
              '✓ 5–7 day turnaround',
            ].map(t => (
              <span key={t} className="font-sans text-[0.75rem] text-parchment/80 tracking-wide">{t}</span>
            ))}
          </div>
        </div>

        {/* ── Service blocks ── */}
        <div className="divide-y divide-divider">
          {serviceBlocks.map((svc) => (
            <div
              key={svc.id}
              className={`flex flex-col ${svc.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Image */}
              <div className="relative lg:w-2/5 xl:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                <Image
                  src={svc.img}
                  alt={svc.imgAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/10" />
              </div>

              {/* Content */}
              <div className="lg:w-3/5 xl:w-1/2 px-8 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
                <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted mb-4 block">
                  {svc.price}
                </span>
                <h2 className="font-playfair text-[1.75rem] lg:text-[2.25rem] font-medium text-charcoal mb-4">
                  {svc.title}
                </h2>
                <p className="font-sans font-light text-muted leading-relaxed mb-6 text-[0.9375rem]">
                  {svc.body}
                </p>
                <ul className="space-y-2 mb-8">
                  {svc.examples.map(ex => (
                    <li key={ex} className="flex items-start gap-3 font-sans text-[0.875rem] text-charcoal">
                      <span className="text-hunter mt-0.5 flex-shrink-0">—</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={svc.href}
                    className="inline-block text-center border border-hunter text-hunter px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-hunter hover:text-parchment transition-colors"
                  >
                    Learn More →
                  </Link>
                  <Link
                    href="/book-visit"
                    className="inline-block text-center bg-hunter text-parchment px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors"
                  >
                    Book a Visit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Same-day / Express section ── */}
        <section className="bg-hunter text-parchment px-8 lg:px-24 py-16 lg:py-20">
          <div className="max-w-4xl grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-parchment/50 block mb-4">EXPRESS SERVICE</span>
              <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium mb-4">
                Same-Day &amp; <em className="italic">Urgent Alterations</em>
              </h2>
              <p className="font-sans font-light text-parchment/80 leading-relaxed mb-6">
                Event tomorrow? Dress that needs to be ready tonight? We offer express and same-day alterations for urgent situations — subject to availability and garment complexity. Call us directly to confirm we can help.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Express hemming and zip repairs',
                  'Last-minute suit sleeve shortening',
                  'Emergency dress take-in before an event',
                  'Call to confirm availability — not all work is achievable same-day',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 font-sans text-[0.875rem] text-parchment/80">
                    <span className="text-[#97C459] mt-0.5 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+447438145169" className="inline-block text-center bg-parchment text-charcoal px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-white transition-colors">
                  Call Now →
                </a>
                <Link href="/same-day-alterations-london" className="inline-block text-center border border-parchment/30 text-parchment px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:border-parchment transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-72 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586216583179-20b23ef9dd5f?w=800&q=80&auto=format&fit=crop"
                alt="Urgent tailoring and same-day alterations"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-70"
              />
            </div>
          </div>
        </section>

        {/* ── Luxury brands ── */}
        <section className="px-8 lg:px-24 py-16 border-b border-divider">
          <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted block mb-4">SPECIALIST WORK</span>
          <h2 className="font-playfair text-[2rem] font-medium mb-3">Luxury Brand Outerwear</h2>
          <p className="font-sans font-light text-muted mb-10 max-w-2xl leading-relaxed">
            Outerwear from premium brands requires a different approach — specific fabrics, specialist equipment and understanding of how the brand&apos;s construction affects what is achievable. All work quoted individually on inspection.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl">
            {luxuryBrands.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="border border-divider p-6 hover:border-hunter hover:bg-hunter/5 transition-colors group"
              >
                <h3 className="font-playfair text-lg font-medium text-charcoal group-hover:text-hunter mb-3">{svc.title}</h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">{svc.desc}</p>
                <span className="inline-block mt-4 font-sans text-xs font-medium text-hunter uppercase tracking-widest">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Bespoke / Made-to-measure ── */}
        <section className="px-8 lg:px-24 py-16 border-b border-divider">
          <div className="max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497997092403-f091fcf5b6c4?w=900&q=80&auto=format&fit=crop"
                alt="Bespoke tailoring and made-to-measure suits London"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted block mb-4">
                MADE TO MEASURE
              </span>
              <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium text-charcoal mb-4">
                Bespoke Tailoring
              </h2>
              <p className="font-sans font-light text-muted leading-relaxed mb-4">
                Made-to-measure suits, shirts and formal wear — no appointment in a shop required. Our tailor visits your home, takes your measurements, discusses your cloth and style preferences, and returns with a garment built precisely to your body.
              </p>
              <p className="font-sans font-light text-muted leading-relaxed mb-8">
                All bespoke work is quoted individually at the home consultation. A deposit is taken after you approve the design and cloth selection.
              </p>
              <Link href="/bespoke-tailoring-london" className="inline-block border border-hunter text-hunter px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-hunter hover:text-parchment transition-colors">
                About Bespoke →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-8 lg:px-24 py-16">
          <div className="border border-divider bg-white p-8 lg:p-12 max-w-4xl">
            <h2 className="font-playfair text-[2rem] font-medium mb-3">Ready to book?</h2>
            <p className="font-sans font-light text-muted max-w-xl leading-relaxed mb-8">
              All 20+ Central London postcodes covered. We collect your garments, alter them and return them pressed and perfect. No shop visit. No travel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book-visit" className="flex-1 text-center bg-hunter text-parchment px-10 py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1E3D17] transition-colors">
                📅 Book a Visit
              </Link>
              <Link href="/inquiry" className="flex-1 text-center border border-charcoal text-charcoal px-10 py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-charcoal hover:text-parchment transition-colors">
                ⚡ Quick Inquiry
              </Link>
              <Link href="/prices" className="flex-1 text-center border border-divider text-muted px-10 py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:border-hunter hover:text-hunter transition-colors">
                💷 See Prices
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
