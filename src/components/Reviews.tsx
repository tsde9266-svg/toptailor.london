'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Review } from '@/lib/kv'

// Shown when no approved reviews exist yet
const STARTER_REVIEWS: Review[] = [
  { id: 'starter-1', author: 'Taqi',  stars: 5, status: 'approved', quote: '"Brilliant service. My suit came back fitting perfectly — the tailor collected from my flat and returned it within days. Highly recommend."', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'starter-2', author: 'Ijlal', stars: 5, status: 'approved', quote: '"Excellent craftsmanship. Had a jacket and two trousers altered, all came back spot on. Very professional and easy to deal with."', createdAt: '2026-01-02T00:00:00Z' },
  { id: 'starter-3', author: 'Mooni', stars: 5, status: 'approved', quote: '"So convenient having the tailor come directly to you. Fast turnaround, great results. Will definitely use again."', createdAt: '2026-01-03T00:00:00Z' },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-1 mb-4" aria-label={`${count} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#3B6D11' : '#CBD5C0'} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const sectionRef = useScrollReveal<HTMLElement>()

  const approved  = reviews.filter(r => r.status === 'approved' || !r.status)
  const displayed = (approved.length > 0 ? approved : STARTER_REVIEWS).slice(0, 3)

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="bg-sage reveal-on-scroll py-24 px-8 lg:px-24"
    >
      {/* Eyebrow */}
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-forest text-center mb-16">
        TESTIMONIALS
      </p>

      {/* ══ DESKTOP — 3 columns (≥ lg) ══════════════════════ */}
      <div className="hidden lg:grid grid-cols-3 gap-0 border-t border-divider">
        {displayed.map((r, i) => (
          <div
            key={r.id}
            className="text-center pt-12 px-10 pb-12 border-r border-divider last:border-r-0 reveal-on-scroll"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <Stars count={r.stars} />
            <blockquote className="font-playfair text-[1.125rem] italic leading-relaxed text-hunter mb-6">
              {r.quote}
            </blockquote>
            <cite className="font-sans text-[0.75rem] uppercase tracking-widest text-forest not-italic">
              — {r.author}
            </cite>
          </div>
        ))}
      </div>

      {/* ══ MOBILE — vertical stack (< lg) ══════════════════ */}
      <div className="lg:hidden space-y-16">
        {displayed.map((r, i) => (
          <div
            key={r.id}
            className="text-center reveal-on-scroll"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Stars count={r.stars} />
            <blockquote className="font-playfair text-[1.25rem] italic leading-relaxed text-hunter mb-4">
              {r.quote}
            </blockquote>
            <cite className="font-sans text-[0.75rem] uppercase tracking-widest text-forest not-italic">
              — {r.author}
            </cite>
          </div>
        ))}
      </div>
    </section>
  )
}
