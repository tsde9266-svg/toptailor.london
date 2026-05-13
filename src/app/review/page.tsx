import type { Metadata } from 'next'
import ReviewForm from './ReviewForm'

export const metadata: Metadata = {
  title: 'Leave a Review | Fine Tailors',
  robots: { index: false, follow: false },
}

export default function ReviewPage({
  searchParams,
}: {
  searchParams: { name?: string; ref?: string }
}) {
  const prefillName = searchParams.name?.slice(0, 100) ?? ''
  const deliveryRef = searchParams.ref?.slice(0, 40)   ?? ''

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

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

        <p className="font-sans text-[0.6875rem] text-muted text-center mt-8">
          Fine Tailors · London&apos;s finest tailors, at your door
        </p>
      </div>
    </div>
  )
}
