'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Review } from '@/lib/kv'

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-1 text-charcoal'
const inputClass = 'w-full border border-divider px-3 py-2 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

function Stars({ n }: { n?: number }) {
  if (!n) return null
  return (
    <span className="text-amber-400 text-[0.875rem]" aria-label={`${n} stars`}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  )
}

export default function ReviewsAdmin({ reviews }: { reviews: Review[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [author,  setAuthor]  = useState('')
  const [quote,   setQuote]   = useState('')
  const [stars,   setStars]   = useState(5)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const pendingReviews  = reviews.filter(r => r.status === 'pending')
  const approvedReviews = reviews.filter(r => r.status !== 'pending')

  function fmt(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    const res = await fetch('/api/admin/review', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ author: author.trim(), quote: quote.trim(), stars }),
    })
    if (!res.ok) { setError((await res.json().catch(() => ({}))).error ?? 'Failed'); return }
    setAuthor(''); setQuote(''); setStars(5); setSuccess(true)
    startTransition(() => router.refresh())
  }

  async function handleApprove(id: string) {
    await fetch(`/api/admin/reviews/${id}/approve`, { method: 'POST' })
    startTransition(() => router.refresh())
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this review?')) return
    await fetch('/api/admin/review', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <div className="mt-12 space-y-10">

      {/* ── Pending approvals ── */}
      {pendingReviews.length > 0 && (
        <div>
          <h2 className="font-playfair text-[1.375rem] mb-1">Pending Approval</h2>
          <p className="font-sans text-[0.8125rem] text-muted mb-4">{pendingReviews.length} review{pendingReviews.length !== 1 ? 's' : ''} waiting</p>
          <div className="space-y-3">
            {pendingReviews.map(r => (
              <div key={r.id} className="border border-amber-200 bg-amber-50 p-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans text-[0.875rem] font-medium text-charcoal">{r.author}</span>
                  <Stars n={r.stars} />
                  <span className="font-sans text-[0.6875rem] text-muted">{fmt(r.createdAt)}</span>
                  {r.deliveryRef && (
                    <span className="font-sans text-[0.6rem] uppercase tracking-widest bg-blue-100 text-blue-700 px-1.5 py-0.5">Delivery</span>
                  )}
                </div>
                <p className="font-sans text-[0.875rem] text-charcoal leading-relaxed">{r.quote}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(r.id)}
                    disabled={pending}
                    className="font-sans text-[0.75rem] uppercase tracking-widest bg-hunter text-parchment px-4 py-2 hover:bg-[#1E3D17] transition-colors disabled:opacity-60"
                  >
                    ✓ Approve — go live
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={pending}
                    className="font-sans text-[0.75rem] uppercase tracking-widest border border-red-300 text-red-600 px-4 py-2 hover:bg-red-50 transition-colors disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Live reviews ── */}
      <div>
        <h2 className="font-playfair text-[1.5rem] mb-1">Reviews</h2>
        <p className="font-sans text-[0.8125rem] text-muted mb-6">
          Top 3 most recent approved reviews show on the homepage.
        </p>

        {/* Add form */}
        <form onSubmit={handleAdd} className="border border-divider bg-white p-5 mb-8 space-y-4">
          <p className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Add Review Manually</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Customer Name</label>
              <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required placeholder="e.g. James" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Stars</label>
              <select value={stars} onChange={e => setStars(Number(e.target.value))} className={inputClass}>
                {[5,4,3,2,1].map(n => (
                  <option key={n} value={n}>{n} — {'★'.repeat(n)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Review</label>
            <textarea value={quote} onChange={e => setQuote(e.target.value)} required rows={3}
              placeholder='"Excellent service — my suit came back fitting perfectly."'
              className={`${inputClass} resize-none`} />
          </div>

          {error   && <p className="font-sans text-sm text-red-600 bg-red-50 px-3 py-2 border border-red-200">{error}</p>}
          {success && <p className="font-sans text-sm text-green-700 bg-green-50 px-3 py-2 border border-green-200">Review added — visible on homepage.</p>}

          <button type="submit" disabled={pending}
            className="bg-hunter text-parchment px-8 py-3 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60">
            {pending ? 'Saving…' : 'Add Review'}
          </button>
        </form>

        {/* Approved list */}
        {approvedReviews.length === 0 ? (
          <p className="font-sans text-[0.875rem] text-muted text-center py-8 border border-dashed border-divider">
            No approved reviews yet.
          </p>
        ) : (
          <div className="space-y-3">
            {approvedReviews.map((r, i) => (
              <div key={r.id} className="border border-divider bg-white p-4 flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  {i < 3 ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-hunter text-parchment font-sans text-[0.625rem] font-medium">{i + 1}</span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-divider text-muted font-sans text-[0.625rem]">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-sans text-[0.875rem] font-medium text-charcoal">{r.author}</span>
                    <Stars n={r.stars} />
                    <span className="font-sans text-[0.6875rem] text-muted">{fmt(r.createdAt)}</span>
                    {i < 3 && <span className="font-sans text-[0.6rem] uppercase tracking-widest text-hunter">On site</span>}
                  </div>
                  <p className="font-sans text-[0.875rem] text-muted leading-relaxed line-clamp-2">{r.quote}</p>
                </div>
                <button onClick={() => handleDelete(r.id)} disabled={pending}
                  aria-label="Delete" className="flex-shrink-0 text-muted hover:text-red-600 transition-colors disabled:opacity-40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                  </svg>
                </button>
              </div>
            ))}
            {approvedReviews.length > 3 && (
              <p className="font-sans text-[0.75rem] text-muted text-center pt-1">
                Showing top 3 on homepage · {approvedReviews.length - 3} more stored
              </p>
            )}
          </div>
        )}
      </div>

      {/* Share link info */}
      <div className="border border-divider bg-white p-5">
        <p className="font-sans text-[0.75rem] uppercase tracking-widest text-muted mb-2">Your Review Link</p>
        <p className="font-sans text-[0.875rem] text-charcoal font-medium mb-1">finetailors.co.uk/review</p>
        <p className="font-sans text-[0.75rem] text-muted">Save this link in your notes and share it with any customer. Takes 30 seconds to complete.</p>
      </div>
    </div>
  )
}
