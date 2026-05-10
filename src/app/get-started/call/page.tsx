'use client'
import { useState } from 'react'
import Link   from 'next/link'
import Navbar  from '@/components/Navbar'
import Footer  from '@/components/Footer'

const DAYS  = ['Any weekday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIMES = ['Morning (9am – 12pm)', 'Afternoon (12pm – 5pm)', 'Evening (5pm – 8pm)', 'Anytime']

const WA_NUMBER = '447438145169'

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
    try {
      const res = await fetch('/api/phone-consultation', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, day, time, commsPref }),
      })
      if (!res.ok) throw new Error('server error')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  const waPhone = phone.replace(/\D/g, '').replace(/^0/, '44') || WA_NUMBER
  const waLink  = `https://wa.me/${waPhone}?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20tailoring%20needs.`

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

              <h1 className="font-playfair text-[2rem] font-medium mb-3">We&apos;ll call you, {name}.</h1>
              <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed mb-8">
                We&apos;ve received your request and will call {phone}
                {day || time ? ` — ${[day, time].filter(Boolean).join(', ')}` : ' as soon as possible'}.
              </p>

              {/* Communication preference result */}
              {commsPref === 'whatsapp' ? (
                <div className="border border-divider p-6 mb-8 text-left">
                  <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">
                    You chose WhatsApp updates
                  </p>
                  <p className="font-sans text-[0.875rem] text-charcoal mb-5">
                    We&apos;ll follow up on WhatsApp after our call. You can also message us now:
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1fad53] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M11.5 2C6.253 2 2 6.253 2 11.5c0 1.91.524 3.698 1.434 5.229L2 22l5.432-1.418A9.45 9.45 0 0011.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2zm0 17.25a7.74 7.74 0 01-3.964-1.093l-.284-.169-2.942.767.789-2.877-.185-.296A7.71 7.71 0 013.75 11.5C3.75 7.168 7.168 3.75 11.5 3.75s7.75 3.418 7.75 7.75-3.418 7.75-7.75 7.75z"/>
                    </svg>
                    Open WhatsApp
                  </a>
                </div>
              ) : (
                <div className="border border-divider p-6 mb-8 text-left">
                  <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">
                    You chose email updates
                  </p>
                  <p className="font-sans text-[0.875rem] text-charcoal">
                    {email
                      ? `A confirmation has been sent to ${email}. We'll also follow up by email after our call.`
                      : "We'll follow up with you directly after our call."}
                  </p>
                </div>
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
                href={`https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27d%20like%20a%20phone%20consultation.`}
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
