'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import WhatsAppConfirmCTA from '@/components/WhatsAppConfirmCTA'

function buildWaMessage(data: Record<string, FormDataEntryValue>): string {
  const name     = String(data.name     ?? '')
  const service  = String(data.service  ?? '')
  const day      = String(data.day      ?? '')
  const address  = String(data.address  ?? '')
  const postcode = String(data.postcode ?? '')
  const notes    = String(data.notes    ?? '')

  return [
    `Hi, I'm ${name}.`,
    service ? `I'd like to book: ${service}.` : `I'd like to book a tailoring collection.`,
    day ? `Preferred day: ${day}.` : '',
    (address || postcode) ? `Address: ${[address, postcode].filter(Boolean).join(', ')}.` : '',
    notes ? `Notes: ${notes}` : '',
  ].filter(Boolean).join('\n')
}

const serviceOptions = [
  'Trousers & Jeans',
  'Jackets & Coats',
  'Dresses',
  'Leather Jacket',
  'Wedding / Occasion Wear',
  'Repairs & Zips',
  'Multiple items',
  'Something else / not sure',
]

const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Flexible',
]

const labelClass =
  'block font-sans font-medium text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'

const inputClass =
  'input-line font-sans text-[1rem] focus:border-b-2'

export default function BookingForm() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [waMessage, setWaMessage] = useState('')
  const [waRef, setWaRef] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json.error ?? 'Something went wrong. Please try again.')
        return
      }

      setWaMessage(buildWaMessage(data))
      setWaRef(`${data.name ?? 'Unknown'} · ${data.phone ?? data.email ?? ''} · Booking form`)
      setSubmitted(true)
      // Fire Google Ads contact/lead conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-18127638127/SsX4CLuIgqUcEO-c98ND',
        })
      }
    } catch (_e) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="book"
      ref={sectionRef}
      className="reveal-on-scroll px-8 py-24 lg:px-24 lg:py-32 border-t border-divider"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* ── Left: heading + description ─────────────────── */}
        <div className="lg:w-1/2 lg:sticky lg:top-32">
          {/* Mobile heading */}
          <div className="lg:hidden mb-8">
            <h2 className="font-playfair text-[2rem] leading-[1.1] font-medium mb-4">
              Inquiry
            </h2>
            <p className="font-sans font-light text-[0.9375rem] text-muted leading-relaxed">
              Leave your details and a specialist will contact you within the hour.
            </p>
            <p className="font-sans font-light text-[0.8125rem] text-muted leading-relaxed mt-4 border-l-2 border-divider pl-3">
              All visits and consultations are chargeable. We do not offer free assessments.
            </p>
          </div>
          {/* Desktop heading */}
          <div className="hidden lg:block">
            <h2 className="font-playfair text-[3.5rem] leading-[1.1] font-medium mb-12">
              Arrange <br />
              <em className="font-playfair italic">the Collection.</em>
            </h2>
            <p className="font-sans font-light text-[1.0625rem] text-muted max-w-sm leading-relaxed">
              We come to your residence or workplace to perform measurements and
              collect your items.
            </p>
            <p className="font-sans font-light text-[0.8125rem] text-muted max-w-sm leading-relaxed mt-6 border-l-2 border-divider pl-4">
              All home visits and consultations are chargeable. We do not offer
              free assessments — our team will share full pricing when they get
              in touch.
            </p>
          </div>
        </div>

        {/* ── Right: form ──────────────────────────────────── */}
        <div className="lg:w-1/2 w-full">
          {submitted ? (
            <div className="py-16 text-center">
              <p className="font-playfair text-xl italic text-hunter mb-3">
                One more step.
              </p>
              <p className="font-sans text-sm text-muted mb-8 max-w-sm mx-auto leading-relaxed">
                Tap below to send us your request on WhatsApp — it&apos;s already written, just hit send.
                We reply fastest this way.
              </p>
              <div className="max-w-sm mx-auto">
                <WhatsAppConfirmCTA message={waMessage} refLabel={waRef} label="Confirm on WhatsApp" />
              </div>
            </div>
          ) : (
            <>
              {error && (
                <p className="font-sans text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200 mb-6">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass}
                    placeholder="+44 7000 000000"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>

              {/* Service dropdown */}
              <div>
                <label htmlFor="service" className={labelClass}>
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 3: Preferred day + Postcode */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <label htmlFor="day" className={labelClass}>
                    Preferred Day
                  </label>
                  <select
                    id="day"
                    name="day"
                    defaultValue=""
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select a day…
                    </option>
                    {dayOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="postcode" className={labelClass}>
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    autoComplete="postal-code"
                    className={inputClass}
                    placeholder="e.g. W1S 1RE"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label htmlFor="address" className={labelClass}>
                  Full Address
                  <span className="ml-2 normal-case tracking-normal font-light text-muted">
                    (required for home visit bookings)
                  </span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  className={`${inputClass} resize-none`}
                  placeholder="e.g. 12 Sloane Street, Chelsea, London"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className={labelClass}>
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Describe your garments or any special requirements…"
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-hunter text-parchment
                    py-5
                    font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
                    hover:bg-[#1E3D17] transition-colors duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {loading ? 'Sending…' : 'SEND INQUIRY'}
                </button>
                <p className="font-sans text-[0.75rem] text-muted mt-4 text-center leading-relaxed">
                  We typically respond within a few hours.
                  <br />
                  No payment is taken at this stage.
                </p>
              </div>
            </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
