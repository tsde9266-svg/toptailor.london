'use client'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { services } from '@/data/services'

const icons: Record<string, React.ReactNode> = {
  trousers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M5 2h14l-2 20H7L5 2z" /><line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  jacket: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M3 7l4-5h10l4 5v14H3V7z" /><path d="M9 2l-2 5M15 2l2 5" />
    </svg>
  ),
  shirts: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M3 7l3-5h3l3 3 3-3h3l3 5-3 2v11H6V9L3 7z" />
    </svg>
  ),
  dress: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 2h12l3 20H3L6 2z" /><path d="M9 2c0 3-1 5-3 7M15 2c0 3 1 5 3 7" />
    </svg>
  ),
  occasion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M12 2L4 8v14h16V8L12 2z" /><path d="M9 22V12h6v10" />
    </svg>
  ),
  leather: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <ellipse cx="12" cy="12" rx="8" ry="10" /><path d="M8 4c0 4-2 6-2 8s2 4 2 8M16 4c0 4 2 6 2 8s-2 4-2 8" />
    </svg>
  ),
  repairs: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M12 2a5 5 0 015 5c0 1-.2 2-.6 2.8L20 14l-6 6-3.2-3.4A5 5 0 1112 2z" />
    </svg>
  ),
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
        <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] font-medium mb-3">
          What We <em className="italic">Alter</em>
        </h2>
        <p className="font-sans font-light text-muted max-w-xl leading-relaxed text-[0.9375rem]">
          Expert alterations across every garment type — all collected from your Central London door and returned in 5–7 days.
        </p>
      </div>

      {/* Grid */}
      <div className="px-8 lg:px-24 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((cat, i) => {
            const min = minPrice(cat.items)
            const isQuoteOnly = cat.items.every(it => it.note === 'quote')
            return (
              <Link
                key={cat.id}
                href="/prices"
                className="
                  group border border-divider bg-white p-6
                  hover:border-hunter hover:bg-hunter/5
                  transition-colors duration-200
                  reveal-on-scroll
                "
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="text-hunter/60 group-hover:text-hunter transition-colors mb-4 block">
                  {icons[cat.id]}
                </span>
                <h3 className="font-playfair text-[1.0625rem] font-medium text-charcoal group-hover:text-hunter mb-2 transition-colors">
                  {cat.name}
                </h3>
                <p className="font-sans text-[0.8125rem] text-muted leading-relaxed mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-sans text-[0.75rem] font-medium text-hunter">
                    {isQuoteOnly ? 'Quote on inspection' : min ? `From £${min}` : ''}
                  </span>
                  <span className="font-sans text-[0.6875rem] text-muted group-hover:text-hunter transition-colors uppercase tracking-widest">
                    See prices →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
