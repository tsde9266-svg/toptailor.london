'use client'
import { useState } from 'react'

const HEARD_FROM_OPTIONS = [
  { value: 'google',    label: 'Google Search' },
  { value: 'referral',  label: 'Friend or Referral' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'returning', label: 'Returning Customer' },
  { value: 'other',     label: 'Other' },
]

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="space-y-2">
      <p className="font-sans text-[0.875rem] text-charcoal">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className={`w-10 h-10 text-[1.25rem] border transition-all ${
              n <= (hover || value)
                ? 'bg-hunter text-parchment border-hunter'
                : 'border-divider text-muted hover:border-hunter'
            }`}
            aria-label={`${n} star${n !== 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
        {value > 0 && (
          <span className="font-sans text-[0.75rem] text-muted self-center ml-1">
            {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value]}
          </span>
        )}
      </div>
    </div>
  )
}

export default function SurveyForm({
  prefillName,
  deliveryRef,
}: {
  prefillName: string
  deliveryRef: string
}) {
  const [bookingEase,    setBookingEase]    = useState(0)
  const [serviceQuality, setServiceQuality] = useState(0)
  const [heardFrom,      setHeardFrom]      = useState('')
  const [comments,       setComments]       = useState('')
  const [customerName,   setCustomerName]   = useState(prefillName)
  const [loading,        setLoading]        = useState(false)
  const [done,           setDone]           = useState(false)
  const [error,          setError]          = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!bookingEase)    { setError('Please rate how easy the booking was.'); return }
    if (!serviceQuality) { setError('Please rate the service quality.'); return }
    if (!heardFrom)      { setError('Please tell us how you heard about us.'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/survey', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          bookingEase,
          serviceQuality,
          heardFrom,
          comments,
          customerName,
          ref:    deliveryRef || undefined,
          source: 'delivery',
        }),
      })
      if (!res.ok) { setError('Something went wrong. Please try again.'); return }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <p className="font-playfair text-[1.25rem] text-charcoal mb-2">Thanks for the feedback!</p>
        <p className="font-sans text-muted text-[0.9375rem]">Your responses help us improve our service.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6">

      {/* Name */}
      <div>
        <label className="block font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">
          Your Name <span className="normal-case font-light tracking-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          placeholder="James Wilson"
          className="w-full border border-divider px-4 py-3 font-sans text-[0.9375rem] text-charcoal bg-white focus:outline-none focus:border-hunter"
        />
      </div>

      {/* Q1 — Booking ease */}
      <div className="border border-divider bg-white p-5">
        <StarRating
          value={bookingEase}
          onChange={setBookingEase}
          label="How easy was it to book with us?"
        />
      </div>

      {/* Q2 — Service quality */}
      <div className="border border-divider bg-white p-5">
        <StarRating
          value={serviceQuality}
          onChange={setServiceQuality}
          label="How satisfied are you with the quality of work?"
        />
      </div>

      {/* Q3 — How did you hear */}
      <div className="border border-divider bg-white p-5">
        <p className="font-sans text-[0.875rem] text-charcoal mb-3">How did you hear about us?</p>
        <div className="grid grid-cols-2 gap-2">
          {HEARD_FROM_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setHeardFrom(value)}
              className={`py-2.5 px-3 text-left border font-sans text-[0.8125rem] transition-colors ${
                heardFrom === value
                  ? 'bg-hunter text-parchment border-hunter'
                  : 'border-divider text-charcoal hover:border-hunter'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Q4 — Comments */}
      <div>
        <label className="block font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">
          Any comments? <span className="normal-case font-light tracking-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={comments}
          onChange={e => setComments(e.target.value)}
          placeholder="Anything you'd like us to know…"
          className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9rem] focus:outline-none focus:border-hunter resize-none bg-white"
        />
      </div>

      {error && (
        <p className="font-sans text-[0.875rem] text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-hunter text-parchment py-4 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit Feedback'}
      </button>

    </form>
  )
}
