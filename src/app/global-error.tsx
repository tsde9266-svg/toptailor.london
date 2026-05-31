'use client'
import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0, background: '#F5F0E8', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>
            Something went wrong
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 500, color: '#2C2C2C', marginBottom: '1rem', lineHeight: 1.1 }}>
            Unexpected error.
          </h1>
          <p style={{ color: '#888', maxWidth: '20rem', margin: '0 auto 2.5rem', lineHeight: 1.6, fontSize: '0.9375rem' }}>
            We&apos;ve been notified. Please try again or contact us directly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{ background: '#2A5220', color: '#F5F0E8', border: 'none', padding: '1rem 2.5rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ border: '1px solid #ddd', color: '#2C2C2C', padding: '1rem 2.5rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
