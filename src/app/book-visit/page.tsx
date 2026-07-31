'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppConfirmCTA from '@/components/WhatsAppConfirmCTA'

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'
const TIME_OPTIONS = ['Morning (9am – 12pm)', 'Afternoon (12pm – 5pm)', 'Evening (5pm – 8pm)', 'Flexible']

export default function BookVisitPage() {
  const [name,          setName]          = useState('')
  const [phone,         setPhone]         = useState('')
  const [email,         setEmail]         = useState('')
  const [address,       setAddress]       = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [notes,         setNotes]         = useState('')
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState('')
  const [done,          setDone]          = useState(false)

  const waMessage = [
    `Hi, I'm ${name}. I'd like to book a home visit.`,
    `Address: ${address}.`,
    (preferredDate || preferredTime) ? `Preferred: ${[preferredDate, preferredTime].filter(Boolean).join(' · ')}.` : '',
    notes.trim() ? `Notes: ${notes.trim()}` : '',
  ].filter(Boolean).join(' ')
  const waRef = `${name} · ${phone || email} · Book visit`
  const waHref = `/api/go/whatsapp?text=${encodeURIComponent(waMessage)}&ref=${encodeURIComponent(waRef)}`

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    // Open WhatsApp immediately, synchronously, as a direct result of the
    // tap — keeps it a user gesture (no popup-blocker issues) and keeps the
    // message customer-initiated (see WhatsAppConfirmCTA for why that matters).
    window.open(waHref, '_blank', 'noopener,noreferrer')

    setLoading(true)
    setError('')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch('/api/book-visit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, phone, email, address, preferredDate, preferredTime, notes }),
        signal:  controller.signal,
      })
      clearTimeout(timeout)
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as Record<string, unknown>
        throw new Error(typeof d.error === 'string' ? d.error : 'Something went wrong. Please try again.')
      }
      ;(window as Window & { ttq?: { track: (e: string) => void } }).ttq?.track('Contact')
      setDone(true)
    } catch (err) {
      clearTimeout(timeout)
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out — please check your connection and try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <>
        <Navbar solid />
        <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment flex flex-col">
          <div className="flex-1 flex items-center justify-center px-8 py-20">
            <div className="max-w-md w-full text-center">
              <div className="w-14 h-14 rounded-full bg-hunter/10 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="1.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className="font-playfair text-[2rem] font-medium mb-3">
                Check your <em className="italic">new tab, {name.split(' ')[0]}.</em>
              </h1>
              <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed mb-6">
                We&apos;ve opened WhatsApp with your visit request already written. Just hit send.
              </p>
              <div className="border border-divider p-5 text-left mb-6">
                <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">Your request</p>
                <p className="font-sans text-[0.9rem] text-charcoal">{address}</p>
                {(preferredDate || preferredTime) && (
                  <p className="font-sans text-[0.8125rem] text-muted mt-1">
                    {[preferredDate, preferredTime].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <WhatsAppConfirmCTA message={waMessage} refLabel={waRef} label="Didn't open? Tap here" />
              </div>
              <Link
                href="/"
                className="
                  inline-block border border-charcoal text-charcoal px-10 py-4
                  font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
                  hover:bg-charcoal hover:text-parchment transition-colors
                "
              >
                Return Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">

        {/* Header */}
        <div className="px-8 lg:px-24 py-16 border-b border-divider">
          <Link href="/" className="font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors inline-block mb-6">
            ← Back
          </Link>
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-4">
            FINE TAILORS · CENTRAL LONDON
          </span>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium">
            Book a <br />
            <em className="font-playfair italic">Home Visit.</em>
          </h1>
          <p className="font-sans font-light text-[1.0625rem] text-muted mt-6 max-w-sm leading-relaxed">
            We come to you. Fill in your details and we&apos;ll confirm a convenient slot.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 lg:px-24 py-12 lg:py-16">
          <form onSubmit={submit} className="max-w-lg space-y-8">

            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-line w-full font-sans text-[1rem]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="input-line w-full font-sans text-[1rem]"
                placeholder="+44 7000 000000"
              />
            </div>

            <div>
              <label className={labelClass}>Email *</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-line w-full font-sans text-[1rem]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className={labelClass}>Collection Address *</label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full border-b border-divider bg-transparent font-sans text-[1rem] py-2 focus:outline-none focus:border-charcoal resize-none"
                placeholder="Flat / house number, street name, postcode"
              />
              <p className="font-sans text-[0.6875rem] text-muted mt-1">We come to this address to collect your garments.</p>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="input-line w-full font-sans text-[0.9375rem] bg-parchment"
                />
              </div>
              <div>
                <label className={labelClass}>Preferred Time</label>
                <select
                  value={preferredTime}
                  onChange={e => setPreferredTime(e.target.value)}
                  className="input-line w-full font-sans text-[0.9375rem] bg-parchment"
                >
                  <option value="">Flexible</option>
                  {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>What needs altering? <span className="normal-case font-light tracking-normal">(optional)</span></label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full border-b border-divider bg-transparent font-sans text-[1rem] py-2 focus:outline-none focus:border-charcoal resize-none"
                placeholder="e.g. Suit trousers need hemming, dress zip needs replacing…"
              />
            </div>

            {error && (
              <p className="font-sans text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-hunter text-parchment py-5
                font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
                hover:bg-[#1E3D17] transition-colors duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? 'Sending…' : 'Book My Visit →'}
            </button>

          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
