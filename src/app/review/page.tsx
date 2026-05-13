import type { Metadata } from 'next'
import ReviewForm from './ReviewForm'
import { getAllReviews } from '@/lib/kv'

export const metadata: Metadata = {
  title: 'Reviews | Fine Tailors',
  robots: { index: false, follow: false },
}

function Stars({ n }: { n?: number }) {
  const count = n ?? 5
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < count ? '#F59E0B' : '#D1D5DB'} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: { name?: string; ref?: string }
}) {
  const prefillName = searchParams.name?.slice(0, 100) ?? ''
  const deliveryRef = searchParams.ref?.slice(0, 40)   ?? ''

  const allReviews = await getAllReviews().catch(() => [])
  const reviews    = allReviews.filter(r => r.status === 'approved' || !r.status)

  return (
    <div className="min-h-screen bg-parchment px-4 py-16">
      <div className="w-full max-w-lg mx-auto">

        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-hunter flex items-center justify-center flex-shrink-0">
            <span className="text-parchment font-serif text-base">FT</span>
          </div>
          <div>
            <p className="font-playfair text-[1.1rem] text-charcoal leading-none">Fine Tailors</p>
            <p className="font-sans text-[0.6875rem] text-muted tracking-widest uppercase">Master Tailors · London</p>
          </div>
        </div>

        <h1 className="font-playfair text-[2rem] lg:text-[2.5rem] leading-[1.1] text-charcoal mb-3">
          How did we do?
        </h1>
        <p className="font-sans font-light text-muted mb-10 text-[0.9375rem]">
          Your feedback means the world to us — it only takes 30 seconds.
        </p>

        <ReviewForm prefillName={prefillName} deliveryRef={deliveryRef} />

        {/* Reviews list */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <div className="border-t border-divider pt-12">
              <p className="font-sans text-[0.6875rem] uppercase tracking-[0.3em] text-muted mb-8 text-center">
                What our customers say
              </p>

              <div className="space-y-6">
                {reviews.map(r => (
                  <div key={r.id} className="border border-divider bg-white px-6 py-5">
                    <Stars n={r.stars} />
                    <blockquote className="font-playfair text-[1rem] italic text-charcoal leading-relaxed mb-4">
                      {r.quote}
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <cite className="font-sans text-[0.75rem] uppercase tracking-widest text-hunter not-italic">
                        — {r.author}
                      </cite>
                      <span className="font-sans text-[0.6875rem] text-muted">
                        {fmtDate(r.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="font-sans text-[0.6875rem] text-muted text-center mt-12">
          Fine Tailors · London&apos;s finest tailors, at your door
        </p>
      </div>
    </div>
  )
}
