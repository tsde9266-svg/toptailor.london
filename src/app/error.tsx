'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-8 text-center">
      <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted mb-6 block">
        Something went wrong
      </span>
      <h1 className="font-playfair text-[2.5rem] leading-[1.1] font-medium text-charcoal mb-4">
        Unexpected error.
      </h1>
      <p className="font-sans font-light text-muted max-w-xs leading-relaxed mb-10">
        We&apos;ve been notified. Please try again or contact us directly.
      </p>
      <button
        onClick={reset}
        className="
          bg-hunter text-parchment
          px-10 py-4
          font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
        "
      >
        Try again
      </button>
    </main>
  )
}
