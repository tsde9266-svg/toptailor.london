'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { services } from '@/data/services'

// Curated tailoring images from Unsplash (all from fashion/tailoring search results)
const categoryImages: Record<string, string> = {
  trousers:      'https://images.unsplash.com/photo-1578353022142-09264fd64295?w=600&q=80&auto=format&fit=crop',
  jacket:        'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=600&q=80&auto=format&fit=crop',
  shirts:        'https://images.unsplash.com/photo-1560796952-f1c9b838544c?w=600&q=80&auto=format&fit=crop',
  dress:         'https://images.unsplash.com/photo-1521467752200-3bccf80f16ed?w=600&q=80&auto=format&fit=crop',
  skirts:        'https://images.unsplash.com/photo-1630930678172-63343537a00a?w=600&q=80&auto=format&fit=crop',
  'ladies-suits':'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=600&q=80&auto=format&fit=crop',
  jumpsuits:     'https://images.unsplash.com/photo-1625479142928-c2f2914318f2?w=600&q=80&auto=format&fit=crop',
  occasion:      'https://images.unsplash.com/photo-1585241920473-b472eb9ffbae?w=600&q=80&auto=format&fit=crop',
  fur:           'https://images.unsplash.com/photo-1602706294170-1fed8eecd9f9?w=600&q=80&auto=format&fit=crop',
  leather:       'https://images.unsplash.com/photo-1593250816874-8edf4f732edb?w=600&q=80&auto=format&fit=crop',
  repairs:       'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=600&q=80&auto=format&fit=crop',
}

function minPrice(items: typeof services[0]['items']): number | null {
  const prices = items.filter(i => i.price > 0).map(i => i.price)
  return prices.length ? Math.min(...prices) : null
}

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const visible = services.filter(c => c.id !== 'consultation')

  return (
    <section id="services" ref={sectionRef} className="reveal-on-scroll bg-parchment border-t border-divider">

      {/* Section header */}
      <div className="px-8 lg:px-24 pt-20 pb-10">
        <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted block mb-3">
          FINE TAILORS · ALL SERVICES
        </span>
        <h2 className="font-playfair text-[2rem] lg:text-[2.75rem] font-medium mb-4">
          What We <em className="italic">Alter</em>
        </h2>
        <p className="font-sans font-light text-muted max-w-xl leading-relaxed">
          Expert alterations across every garment type — collected from your Central London door and returned in 5–7 days. All work fully insured.
        </p>
      </div>

      {/* Photo grid */}
      <div className="px-8 lg:px-24 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {visible.map((cat, i) => {
            const min = minPrice(cat.items)
            const isQuoteOnly = cat.items.every(it => it.note === 'quote')
            const imgSrc = categoryImages[cat.id] ?? categoryImages['repairs']
            return (
              <Link
                key={cat.id}
                href="/prices"
                className="
                  group relative overflow-hidden
                  aspect-[3/4] lg:aspect-[4/5]
                  reveal-on-scroll
                "
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {/* Photo */}
                <Image
                  src={imgSrc}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    background: 'linear-gradient(to top, rgba(19,58,11,0.92) 0%, rgba(19,58,11,0.4) 55%, rgba(0,0,0,0.15) 100%)',
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5">
                  <h3 className="font-playfair text-[0.9375rem] lg:text-[1.0625rem] font-medium text-parchment leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-[0.65rem] lg:text-[0.6875rem] text-parchment/70 uppercase tracking-wider">
                    {isQuoteOnly ? 'Quote on inspection' : min ? `From £${min}` : cat.subtitle}
                  </p>

                  {/* Hover reveal */}
                  <div className="
                    mt-3 overflow-hidden
                    max-h-0 group-hover:max-h-16
                    transition-all duration-300 ease-in-out
                  ">
                    <p className="font-sans text-[0.6875rem] text-parchment/80 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="
                    mt-2 flex items-center gap-1
                    opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300
                  ">
                    <span className="font-sans text-[0.625rem] text-[#97C459] uppercase tracking-[0.15em]">
                      See prices →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
