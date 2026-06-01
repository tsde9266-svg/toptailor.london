'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const WA_NUMBER = '447438145169'
const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'

export default function InquiryPage() {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [done,    setDone]    = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch('/api/inquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, phone, message }),
        signal:  controller.signal,
      })
      clearTimeout(timeout)
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as Record<string, unknown>
        throw new Error(typeof d.error === 'string' ? d.error : 'Something went wrong. Please try again.')
      }
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

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I'd like to enquire about your tailoring services.`)}`

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
                We&apos;ll WhatsApp you <em className="italic">shortly.</em>
              </h1>
              <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed mb-8">
                We&apos;ve received your inquiry, {name.split(' ')[0]}. Our team replies in under 5 minutes during business hours.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1fad53] transition-colors mb-4"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.5 2C6.253 2 2 6.253 2 11.5c0 1.91.524 3.698 1.434 5.229L2 22l5.432-1.418A9.45 9.45 0 0011.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2zm0 17.25a7.74 7.74 0 01-3.964-1.093l-.284-.169-2.942.767.789-2.877-.185-.296A7.71 7.71 0 013.75 11.5C3.75 7.168 7.168 3.75 11.5 3.75s7.75 3.418 7.75 7.75-3.418 7.75-7.75 7.75z"/>
                </svg>
                Message us on WhatsApp
              </a>
              <Link
                href="/"
                className="block font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors"
              >
                ← Return Home
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
            FINE TAILORS · LONDON
          </span>
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-medium">
            We reply in <br />
            <em className="font-playfair italic">5 minutes.</em>
          </h1>
          <p className="font-sans font-light text-[1.0625rem] text-muted mt-6 max-w-sm leading-relaxed">
            Leave your name and number. We&apos;ll WhatsApp you back immediately.
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
              <p className="font-sans text-[0.6875rem] text-muted mt-1">We&apos;ll WhatsApp or call this number.</p>
            </div>

            <div>
              <label className={labelClass}>Message <span className="normal-case font-light tracking-normal">(optional)</span></label>
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full border-b border-divider bg-transparent font-sans text-[1rem] py-2 focus:outline-none focus:border-charcoal resize-none"
                placeholder="What do you need altering? Any details help."
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
              {loading ? 'Sending…' : 'Send Inquiry →'}
            </button>

            <p className="font-sans text-[0.75rem] text-muted text-center">
              Or WhatsApp us directly:{' '}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hunter underline underline-offset-2"
              >
                wa.me/447438145169 →
              </a>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
