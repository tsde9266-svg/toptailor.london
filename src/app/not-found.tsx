import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — One Click Tailor',
  description:
    "The page you're looking for doesn't exist. Return to One Click Tailor for expert tailoring and alterations in central London.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-8 text-center">
      <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted mb-6 block">
        404
      </span>
      <h1 className="font-playfair text-[2.5rem] leading-[1.1] font-medium text-charcoal mb-4">
        Page not found.
      </h1>
      <p className="font-sans font-light text-muted max-w-xs leading-relaxed mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="
          bg-hunter text-parchment
          px-10 py-4
          font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
        "
      >
        Back to Home
      </Link>
    </main>
  )
}
