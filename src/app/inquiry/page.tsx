'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppConfirmCTA from '@/components/WhatsAppConfirmCTA'

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

  const waMessage = [
    name.trim() ? `Hi, I'm ${name}.` : `Hi,`,
    message.trim() ? message.trim() : `I'd like to enquire about your tailoring services.`,
  ].join(' ')
  const waRef = `${name} · ${phone} · Quick inquiry`

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
                One more <em className="italic">step.</em>
              </h1>
              <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed mb-8">
                Thanks, {name.split(' ')[0]} — tap below to send us your inquiry on WhatsApp. It&apos;s already written, just hit send. We reply in under 5 minutes during business hours.
              </p>
              <div className="mb-4">
                <WhatsAppConfirmCTA message={waMessage} refLabel={waRef} label="Confirm on WhatsApp" />
              </div>
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
                href={`/api/go/whatsapp?text=${encodeURIComponent(waMessage)}&ref=${encodeURIComponent(`${name || 'Unknown'} · ${phone || '—'} · Quick inquiry (direct link)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hunter underline underline-offset-2"
              >
                Message us on WhatsApp →
              </a>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
