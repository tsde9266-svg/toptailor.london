'use client'
import { useState } from 'react'
import Link   from 'next/link'
import Navbar  from '@/components/Navbar'
import Footer  from '@/components/Footer'
import WhatsAppConfirmCTA from '@/components/WhatsAppConfirmCTA'

const DAYS  = ['Any weekday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIMES = ['Morning (9am – 12pm)', 'Afternoon (12pm – 5pm)', 'Evening (5pm – 8pm)', 'Anytime']

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'

type CommsPref = 'whatsapp' | 'email' | ''

export default function PhoneConsultationPage() {
  const [name,      setName]      = useState('')
  const [phone,     setPhone]     = useState('')
  const [email,     setEmail]     = useState('')
  const [day,       setDay]       = useState('')
  const [time,      setTime]      = useState('')
  const [commsPref, setCommsPref] = useState<CommsPref>('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [done,      setDone]      = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!commsPref) { setError("Please choose how you'd like us to contact you."); return }
    setLoading(true)
    setError('')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch('/api/phone-consultation', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, phone, email, day, time, commsPref }),
        signal:  controller.signal,
      })
      clearTimeout(timeout)
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as Record<string, unknown>
        throw new Error(typeof d.error === 'string' ? d.error : 'Something went wrong. Please try again or WhatsApp us directly.')
      }
      setDone(true)
    } catch (err) {
      clearTimeout(timeout)
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out — please check your connection and try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or WhatsApp us directly.')
      }
    } finally {
      setLoading(false)
    }
  }

  const waMessage = [
    name.trim() ? `Hi, I'm ${name}. I'd like to discuss my tailoring needs.` : `Hi, I'd like to discuss my tailoring needs.`,
    (day || time) ? `Best time to call: ${[day, time].filter(Boolean).join(', ')}.` : '',
  ].filter(Boolean).join(' ')
  const waRef = `${name} · ${phone} · Phone consultation`

  if (done) {
    return (
      <>
        <Navbar solid />
        <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment flex flex-col">
          <div className="flex-1 flex items-center justify-center px-8 py-20">
            <div className="max-w-md w-full text-center">
              <div className="w-12 h-12 rounded-full bg-hunter/10 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="1.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h1 className="font-playfair text-[2rem] font-medium mb-3">One more step, {name}.</h1>
              <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed mb-6">
                We&apos;ve logged your callback request for {phone}
                {day || time ? ` — ${[day, time].filter(Boolean).join(', ')}` : ' as soon as possible'}.
                Want to skip the wait? Tap below to message us on WhatsApp now — it&apos;s already written, just hit send.
              </p>

              <div className="mb-6">
                <WhatsAppConfirmCTA message={waMessage} refLabel={waRef} label="Confirm on WhatsApp" />
              </div>

              {commsPref === 'email' && (
                <p className="font-sans text-[0.8125rem] text-muted mb-6">
                  {email
                    ? `A confirmation has also been sent to ${email}.`
                    : "We'll also follow up with you directly after our call."}
                </p>
              )}

              <Link
                href="/"
                className="inline-block border border-charcoal text-charcoal px-10 py-4 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-charcoal hover:text-parchment transition-colors"
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
          <Link
            href="/get-started"
            className="font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors inline-block mb-6"
          >
            ← Back
          </Link>
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-4">
            FREE · NO OBLIGATION
          </span>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium">
            Schedule a <br />
            <em className="font-playfair italic">callback.</em>
          </h1>
          <p className="font-sans font-light text-[1.0625rem] text-muted mt-6 max-w-sm leading-relaxed">
            Fill in your details and we&apos;ll call you at your preferred time to discuss your tailoring needs.
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
              <p className="font-sans text-[0.6875rem] text-muted mt-1">We&apos;ll call you on this number.</p>
            </div>

            <div>
              <label className={labelClass}>Email <span className="normal-case font-light tracking-normal">(optional — for your confirmation)</span></label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-line w-full font-sans text-[1rem]"
                placeholder="your@email.com"
              />
            </div>

            {/* Preferred slot */}
            <div>
              <p className={labelClass}>When can we call?</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[0.6875rem] text-muted uppercase tracking-widest block mb-1">Day</label>
                  <select
                    value={day}
                    onChange={e => setDay(e.target.value)}
                    className="input-line w-full font-sans text-[0.9375rem] bg-parchment"
                  >
                    <option value="">Any day</option>
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-sans text-[0.6875rem] text-muted uppercase tracking-widest block mb-1">Time</label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="input-line w-full font-sans text-[0.9375rem] bg-parchment"
                  >
                    <option value="">Anytime</option>
                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Communication preference */}
            <div>
              <p className={labelClass}>After our call, how should we stay in touch? *</p>
              <div className="grid grid-cols-2 gap-3">
                {(['whatsapp', 'email'] as CommsPref[]).map(pref => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setCommsPref(pref)}
                    className={`
                      py-4 px-5 text-left border transition-colors duration-150
                      font-sans text-[0.8125rem]
                      ${commsPref === pref
                        ? 'border-hunter bg-hunter/5 text-hunter'
                        : 'border-divider text-muted hover:border-charcoal hover:text-charcoal'
                      }
                    `}
                  >
                    <span className="block font-medium capitalize mb-0.5">
                      {pref === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </span>
                    <span className="block text-[0.75rem] opacity-70">
                      {pref === 'whatsapp' ? 'Quick messages & updates' : 'Confirmations by email'}
                    </span>
                  </button>
                ))}
              </div>
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
              {loading ? 'Sending…' : 'Schedule My Call →'}
            </button>

            <p className="font-sans text-[0.75rem] text-muted text-center">
              Prefer to message us?{' '}
              <a
                href={`/api/go/whatsapp?text=${encodeURIComponent(waMessage || `Hi, I'd like a phone consultation.`)}&ref=${encodeURIComponent(`${name || 'Unknown'} · ${phone || '—'} · Phone consultation (direct link)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hunter underline underline-offset-2"
              >
                WhatsApp us instead →
              </a>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
