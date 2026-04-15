'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const reviews = [
  {
    quote:
      '"The convenience is unmatched. To have Savile Row quality at my doorstep in Mayfair is revolutionary."',
    author: 'James Thorne',
  },
  {
    quote:
      '"They handled my vintage couture with incredible care. The fit is now better than the original."',
    author: 'Eleanor Rigby',
  },
  {
    quote:
      '"The only person I trust with my wardrobe. Fast, professional, and impeccable craftsmanship."',
    author: 'Marcus Aurelius',
  },
]

function Stars() {
  return (
    <div className="flex justify-center gap-1 mb-4" aria-label="Five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#3B6D11"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const sectionRef = useScrollReveal<HTMLElement>()

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
        {reviews.map((r, i) => (
          <div
            key={r.author}
            className="
              text-center pt-12 px-10 pb-12
              border-r border-divider last:border-r-0
              reveal-on-scroll
            "
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <Stars />
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
        {reviews.map((r, i) => (
          <div
            key={r.author}
            className="text-center reveal-on-scroll"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Stars />
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
