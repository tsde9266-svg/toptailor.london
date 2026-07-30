'use client'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import type { Review } from '@/lib/kv'
import { BUSINESS } from '@/lib/constants'

const STARTER_REVIEWS: Review[] = [
  { id: 'starter-1', author: 'Taqi',  stars: 5, status: 'approved', quote: 'Brilliant service. My suit came back fitting perfectly — the tailor collected from my flat and returned it within days. Highly recommend.', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'starter-2', author: 'Ijlal', stars: 5, status: 'approved', quote: 'Excellent craftsmanship. Had a jacket and two trousers altered, all came back spot on. Very professional and easy to deal with.', createdAt: '2026-01-02T00:00:00Z' },
  { id: 'starter-3', author: 'Mooni', stars: 5, status: 'approved', quote: 'So convenient having the tailor come directly to you. Fast turnaround, great results. Will definitely use again for all my tailoring needs.', createdAt: '2026-01-03T00:00:00Z' },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-1 mb-5" aria-label={`${count} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#97C459' : 'rgba(197,221,151,0.25)'} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ')
  const initials = parts.length >= 2
    ? (parts[0]![0] ?? '') + (parts[1]![0] ?? '')
    : (parts[0]?.slice(0, 2) ?? '')
  return (
    <div className="w-12 h-12 rounded-full bg-hunter/30 border border-hunter/50 flex items-center justify-center mx-auto mb-4">
      <span className="font-playfair text-[0.875rem] text-parchment uppercase">{initials}</span>
    </div>
  )
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const sectionRef = useScrollReveal<HTMLElement>()
  const approved  = reviews.filter(r => r.status === 'approved' || !r.status)
  const displayed = approved.length > 0 ? approved : STARTER_REVIEWS

  return (
    <section id="reviews" ref={sectionRef} className="relative reveal-on-scroll overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1601056639638-c53c50e13ead?w=1600&q=60&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19,58,11,0.94) 0%, rgba(19,58,11,0.88) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 py-24 px-8 lg:px-24">

        {/* Eyebrow + header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-parchment/50 block mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-playfair text-[2rem] lg:text-[2.75rem] font-medium text-parchment">
            What Our <em className="italic">Clients Say</em>
          </h2>
          {/* Stars row */}
          <div className="flex justify-center items-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#97C459" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="font-sans text-[0.8125rem] text-parchment/70 ml-2">5.0 · Rated excellent</span>
          </div>
        </div>

        {/* Reviews grid — desktop */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayed.map((r, i) => (
            <div
              key={r.id}
              className="bg-white/10 backdrop-blur-sm border border-parchment/20 p-8 reveal-on-scroll"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Initials name={r.author} />
              <Stars count={r.stars} />
              <blockquote className="font-playfair text-[1.0625rem] italic leading-relaxed text-parchment/90 mb-6 text-center">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <cite className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/50 not-italic block text-center">
                — {r.author}, London
              </cite>
            </div>
          ))}
        </div>

        {/* Reviews — mobile */}
        <div className="lg:hidden space-y-6">
          {displayed.map((r, i) => (
            <div
              key={r.id}
              className="bg-white/10 border border-parchment/20 p-6 text-center reveal-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Initials name={r.author} />
              <Stars count={r.stars} />
              <blockquote className="font-playfair text-[1.125rem] italic leading-relaxed text-parchment/90 mb-4">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <cite className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/50 not-italic">
                — {r.author}, London
              </cite>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-10 border-t border-parchment/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <a
            href={BUSINESS.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2.5
              border border-parchment/40 text-parchment px-6 py-3
              font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
              hover:bg-parchment hover:text-charcoal transition-colors
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Leave us a review on Google
          </a>
          <div className="flex gap-4">
            <a href="/book-visit" className="bg-parchment text-charcoal px-8 py-3 font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase hover:bg-white transition-colors">
              Book a Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
