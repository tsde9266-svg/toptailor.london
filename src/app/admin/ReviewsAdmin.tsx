'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Review } from '@/lib/kv'

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-1 text-charcoal'
const inputClass = 'w-full border border-divider px-3 py-2 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

export default function ReviewsAdmin({ reviews }: { reviews: Review[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [author,  setAuthor]  = useState('')
  const [quote,   setQuote]   = useState('')
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const res = await fetch('/api/admin/review', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ author: author.trim(), quote: quote.trim() }),
    })

    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error ?? 'Failed to add review')
      return
    }

    setAuthor('')
    setQuote('')
    setSuccess(true)
    startTransition(() => router.refresh())
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this review?')) return

    const res = await fetch('/api/admin/review', {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id }),
    })

    if (!res.ok) {
      alert('Failed to delete review')
      return
    }

    startTransition(() => router.refresh())
  }

  function fmt(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  return (
    <div className="mt-12">
      <h2 className="font-playfair text-[1.5rem] mb-1">Reviews</h2>
      <p className="font-sans text-[0.8125rem] text-muted mb-6">
        Top 3 most recent reviews show on the homepage automatically.
      </p>

      {/* ── Add form ── */}
      <form onSubmit={handleAdd} className="border border-divider bg-white p-5 mb-8 space-y-4">
        <p className="font-sans text-[0.75rem] uppercase tracking-widest text-muted mb-2">
          Add New Review
        </p>

        <div>
          <label className={labelClass}>Customer Name</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
            placeholder="e.g. James"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Review Quote</label>
          <textarea
            value={quote}
            onChange={e => setQuote(e.target.value)}
            required
            rows={3}
            placeholder='e.g. "Excellent service — my suit came back fitting perfectly."'
            className={`${inputClass} resize-none`}
          />
          <p className="font-sans text-[0.6875rem] text-muted mt-1">
            Add speech marks yourself if you want them shown: &ldquo;like this&rdquo;
          </p>
        </div>

        {error   && <p className="font-sans text-sm text-red-600 bg-red-50 px-3 py-2 border border-red-200">{error}</p>}
        {success && <p className="font-sans text-sm text-green-700 bg-green-50 px-3 py-2 border border-green-200">Review added — visible on homepage.</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-hunter text-parchment px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'Add Review'}
        </button>
      </form>

      {/* ── Existing reviews ── */}
      {reviews.length === 0 ? (
        <p className="font-sans text-[0.875rem] text-muted text-center py-8 border border-dashed border-divider">
          No reviews yet. Add your first one above.
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className="border border-divider bg-white p-4 flex items-start gap-4"
            >
              {/* Badge: top 3 indicator */}
              <div className="flex-shrink-0 mt-0.5">
                {i < 3 ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-hunter text-parchment font-sans text-[0.625rem] font-medium">
                    {i + 1}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-divider text-muted font-sans text-[0.625rem]">
                    {i + 1}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-[0.875rem] font-medium text-charcoal">{r.author}</span>
                  <span className="font-sans text-[0.6875rem] text-muted">{fmt(r.createdAt)}</span>
                  {i < 3 && (
                    <span className="font-sans text-[0.6rem] uppercase tracking-widest text-hunter">
                      Shown on site
                    </span>
                  )}
                </div>
                <p className="font-sans text-[0.875rem] text-muted leading-relaxed line-clamp-2">
                  {r.quote}
                </p>
              </div>

              <button
                onClick={() => handleDelete(r.id)}
                disabled={pending}
                aria-label={`Delete review by ${r.author}`}
                className="flex-shrink-0 text-muted hover:text-red-600 transition-colors disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                </svg>
              </button>
            </div>
          ))}

          {reviews.length > 3 && (
            <p className="font-sans text-[0.75rem] text-muted text-center pt-1">
              Showing top 3 on homepage · {reviews.length - 3} more stored
            </p>
          )}
        </div>
      )}
    </div>
  )
}
