'use client'
import { useState } from 'react'

export default function ReviewForm({
  prefillName,
  deliveryRef,
}: {
  prefillName: string
  deliveryRef: string
}) {
  const [name,      setName]      = useState(prefillName)
  const [stars,     setStars]     = useState(0)
  const [hovered,   setHovered]   = useState(0)
  const [quote,     setQuote]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (stars === 0) { setError('Please select a star rating.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/review/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ author: name, quote, stars, deliveryRef: deliveryRef || undefined }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? 'Something went wrong')
      }
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong — please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="text-4xl mb-4">🌟</div>
        <p className="font-playfair text-[1.5rem] text-charcoal mb-2">Thank you{name ? `, ${name.split(' ')[0]}` : ''}!</p>
        <p className="font-sans text-muted text-[0.9375rem]">
          Your review has been submitted and will appear on our website shortly.
        </p>
      </div>
    )
  }

  const display = hovered || stars

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Stars */}
      <div>
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">
          Your rating
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setStars(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              className="text-4xl transition-transform hover:scale-110 focus:outline-none"
              aria-label={`${n} star${n !== 1 ? 's' : ''}`}
            >
              <span style={{ color: n <= display ? '#F59E0B' : '#D1D5DB' }}>★</span>
            </button>
          ))}
        </div>
        {stars > 0 && (
          <p className="font-sans text-[0.75rem] text-muted mt-1">
            {['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][stars]}
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          maxLength={100}
          placeholder="e.g. James"
          className="w-full border border-divider px-4 py-3 font-sans text-[0.9375rem] text-charcoal bg-white focus:outline-none focus:border-hunter"
        />
      </div>

      {/* Review text */}
      <div>
        <label className="block font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">
          Tell us about your experience
        </label>
        <textarea
          value={quote}
          onChange={e => setQuote(e.target.value)}
          required
          rows={4}
          maxLength={1000}
          placeholder="What did you have done? Were you happy with the result?"
          className="w-full border border-divider px-4 py-3 font-sans text-[0.9375rem] text-charcoal bg-white focus:outline-none focus:border-hunter resize-none"
        />
      </div>

      {error && (
        <p className="font-sans text-[0.875rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-hunter text-parchment py-4 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
