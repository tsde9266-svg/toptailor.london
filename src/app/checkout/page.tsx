'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

type Step = 'details' | 'book' | 'review' | 'done'

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'

export default function CheckoutPage() {
  const { items, total, count, clear } = useCart()

  const [step,    setStep]    = useState<Step>('details')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const [customer, setCustomer] = useState({
    name: '', email: '', phone: '', address: '', postcode: '',
  })

  const hasQuoteItems = items.some(i => i.price === 0)

  // ── Cal.com embed ─────────────────────────────────────────────────────────────
  // embed.js requires window.Cal to already exist as a command queue before it
  // loads. We recreate the official Cal.com inline snippet here so that
  // Cal('inline', ...) calls are queued immediately and replayed once the
  // script loads — avoiding the "Cal is not defined" error.
  useEffect(() => {
    if (step !== 'book') return

    const w = window as any

    function mountEmbed() {
      const el = document.getElementById('cal-checkout')
      if (el) el.innerHTML = ''
      w.Cal('init', { origin: 'https://cal.com' })
      w.Cal('inline', {
        elementOrSelector: '#cal-checkout',
        calLink: 'toptailor/toptailor.london',
        config: { name: customer.name, email: customer.email },
        layout: 'month_view',
      })
      w.Cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#2A5220' } },
        hideEventTypeDetails: false,
      })
    }

    if (w.Cal) {
      // Script already loaded from a previous visit — just remount
      mountEmbed()
      return
    }

    // Official Cal.com init snippet: creates window.Cal as a command queue.
    // embed.js is loaded lazily; queued commands are replayed when it arrives.
    ;(function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar)
      C.Cal = function (this: unknown) {
        const cal = C.Cal
        const ar  = arguments
        if (!cal.loaded) {
          cal.ns  = {}
          cal.q   = cal.q || []
          const s = C.document.createElement('script')
          s.src   = A
          s.async = true
          C.document.head.appendChild(s)
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments) }
          const ns  = ar[1]
          api.q = api.q || []
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api
            p(cal.ns[ns], ar)
            p(cal, ['-1', ar])
          } else {
            p(cal, ar)
          }
          return
        }
        p(cal, ar)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    mountEmbed()
  // customer.name/email are captured at mount time intentionally — we don't
  // want to remount the Cal embed on every keystroke while the user types.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // ── Empty cart guard ──────────────────────────────────────────────────────────
  if (count === 0 && step === 'details') {
    return (
      <>
        <Navbar solid />
        <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment flex flex-col items-center justify-center px-8 text-center gap-6">
          <p className="font-playfair text-[1.5rem]">Your estimate is empty.</p>
          <p className="font-sans text-sm text-muted">Select services first, then come back here.</p>
          <Link href="/#services" className="bg-hunter text-parchment px-8 py-4 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors">
            Browse Services
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  // ── Submit collection request ─────────────────────────────────────────────────
  async function submitRequest() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items, total }),
      })
      if (!res.ok) throw new Error('server error')
      clear()
      setStep('done')
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  const set = (k: keyof typeof customer) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setCustomer(p => ({ ...p, [k]: e.target.value }))

  // ══ STEP: details ════════════════════════════════════════════════════════════
  const detailsStep = (
    <div className="max-w-lg mx-auto">
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">Step 1 of 3</p>
      <h1 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-10">
        Your Details
      </h1>

      {/* Estimate summary */}
      <div className="border border-divider p-6 mb-10">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Your Estimate</p>
        <ul className="space-y-3 mb-4">
          {items.map(item => (
            <li key={item.id} className="flex justify-between font-sans text-[0.9rem]">
              <span className="text-charcoal">{item.name}</span>
              <span className={item.price === 0 ? 'text-muted italic' : 'text-hunter font-medium'}>
                {item.price === 0 ? 'Quote' : `£${item.price}`}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t border-divider pt-3 flex justify-between">
          <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Estimate</span>
          <span className="font-playfair text-[1.125rem] text-charcoal">
            £{total}{hasQuoteItems ? ' + quote items' : ''}
          </span>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); setStep('book') }} className="space-y-6">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input required type="text" value={customer.name} onChange={set('name')}
            className="input-line w-full font-sans text-[1rem]" placeholder="Your full name" />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input required type="email" value={customer.email} onChange={set('email')}
            className="input-line w-full font-sans text-[1rem]" placeholder="your@email.com" />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input type="tel" value={customer.phone} onChange={set('phone')}
            className="input-line w-full font-sans text-[1rem]" placeholder="+44 7000 000000" />
        </div>
        <div>
          <label className={labelClass}>Collection Address *</label>
          <input required type="text" value={customer.address} onChange={set('address')}
            className="input-line w-full font-sans text-[1rem]"
            placeholder="Flat / house number and street name" autoComplete="street-address" />
          <p className="font-sans text-[0.6875rem] text-muted mt-1">
            We come to you — this is where we will collect your garments.
          </p>
        </div>
        <div>
          <label className={labelClass}>Postcode *</label>
          <input required type="text" value={customer.postcode} onChange={set('postcode')}
            className="input-line w-full font-sans text-[1rem]" placeholder="e.g. W1S 1RE"
            autoComplete="postal-code" />
        </div>
        <button type="submit" className="
          w-full bg-hunter text-parchment py-5
          font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
        ">
          Continue — Choose Your Slot →
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/#services"
          className="font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors"
        >
          ← Back to services
        </Link>
      </div>
    </div>
  )

  // ══ STEP: book ═══════════════════════════════════════════════════════════════
  const bookStep = (
    <div>
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">Step 2 of 3</p>
      <h2 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-4">
        Book Collection Slot
      </h2>
      <p className="font-sans font-light text-muted mb-8">
        Choose a time and we will come to{' '}
        <strong className="font-medium text-charcoal">{customer.address}, {customer.postcode}</strong>.
      </p>

      <div id="cal-checkout" className="w-full mb-4" style={{ minHeight: '650px' }} />

      {/* Fallback if Cal.com embed is blocked or slow */}
      <p className="font-sans text-[0.75rem] text-muted text-center mb-8">
        Calendar not loading?{' '}
        <a
          href="https://wa.me/447000000000?text=Hi%2C%20I%27d%20like%20to%20book%20a%20collection%20slot."
          target="_blank"
          rel="noopener noreferrer"
          className="text-hunter underline underline-offset-2"
        >
          Book via WhatsApp →
        </a>
      </p>

      <div className="border border-divider p-6 text-center">
        <p className="font-sans text-[0.875rem] text-charcoal mb-1">Booked your slot above?</p>
        <p className="font-sans text-[0.75rem] text-muted mb-5">
          Once you have confirmed your time in the calendar, click below.
        </p>
        <button
          onClick={() => setStep('review')}
          className="
            bg-hunter text-parchment px-10 py-4
            font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
            hover:bg-[#1E3D17] transition-colors duration-200
          "
        >
          Review & Submit →
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setStep('details')}
          className="font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors"
        >
          ← Change your details
        </button>
      </div>
    </div>
  )

  // ══ STEP: review ═════════════════════════════════════════════════════════════
  const reviewStep = (
    <div className="max-w-lg mx-auto">
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">Step 3 of 3</p>
      <h2 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-10">
        Review Your Request
      </h2>

      {/* Estimate */}
      <div className="border border-divider p-6 mb-6">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Your Estimate</p>
        <ul className="space-y-3 mb-4">
          {items.map(item => (
            <li key={item.id} className="flex justify-between font-sans text-[0.9rem]">
              <span className="text-charcoal">{item.name}</span>
              <span className={item.price === 0 ? 'text-muted italic' : 'text-hunter font-medium'}>
                {item.price === 0 ? 'Quote' : `£${item.price}`}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t border-divider pt-3 flex justify-between">
          <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Estimate</span>
          <span className="font-playfair text-[1.125rem] text-charcoal">
            £{total}{hasQuoteItems ? ' + quote items' : ''}
          </span>
        </div>
      </div>

      {/* Collection address */}
      <div className="border border-divider p-5 mb-8">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">Collection from</p>
        <p className="font-sans text-[0.9rem] text-charcoal">
          {customer.address}, {customer.postcode}
        </p>
        <p className="font-sans text-[0.8125rem] text-muted mt-0.5">{customer.name} · {customer.email}</p>
      </div>

      {/* Process info */}
      <div className="bg-hunter/5 border border-divider p-6 mb-8">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">
          What happens after you submit
        </p>
        <ol className="space-y-3">
          {[
            'We collect your garments at your booked slot',
            'Our tailor inspects everything at home',
            'You receive a confirmed quote by email — approve it in one click',
            'We complete the work and return your garments within 5–7 working days',
          ].map((s, i) => (
            <li key={i} className="flex gap-4 font-sans text-[0.875rem] text-muted">
              <span className="font-playfair text-hunter text-[1rem] w-4 flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="font-sans text-[0.8125rem] text-hunter font-medium mt-5">
          You only pay after approving the final quote. No surprises.
        </p>
      </div>

      {error && (
        <p className="font-sans text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200 mb-6">
          {error}
        </p>
      )}

      <button
        onClick={submitRequest}
        disabled={loading}
        className="
          w-full bg-hunter text-parchment py-5
          font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Submitting…' : 'Submit Collection Request →'}
      </button>

      <button
        onClick={() => setStep('book')}
        className="w-full text-center font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors mt-4"
      >
        ← Change collection slot
      </button>
    </div>
  )

  // ══ STEP: done ═══════════════════════════════════════════════════════════════
  const doneStep = (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="w-12 h-12 rounded-full bg-hunter/10 flex items-center justify-center mx-auto mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="1.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="font-playfair text-[2rem] font-medium mb-4">Request Submitted</h2>
      <p className="font-sans font-light text-muted leading-relaxed mb-2">
        Thank you, <strong className="font-medium text-charcoal">{customer.name}</strong>.
      </p>
      <p className="font-sans text-[0.875rem] text-muted mb-2">We will collect from:</p>
      <p className="font-sans text-[0.9rem] text-charcoal font-medium mb-8">
        {customer.address}, {customer.postcode}
      </p>

      <div className="text-left border border-divider p-6 mb-8">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">What happens next</p>
        <ol className="space-y-3">
          {[
            'We collect your garments at your booked slot',
            'Our tailor inspects and prepares your confirmed quote',
            `You receive the quote at ${customer.email} — approve in one click`,
            'We complete the work and return your garments',
          ].map((s, i) => (
            <li key={i} className="flex gap-4 font-sans text-[0.875rem] text-muted">
              <span className="font-playfair text-hunter text-[1rem] w-4 flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="font-sans text-[0.8125rem] text-hunter font-medium mt-5">
          You only pay after approving the final quote.
        </p>
      </div>

      <Link href="/" className="
        inline-block bg-hunter text-parchment px-10 py-4
        font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
        hover:bg-[#1E3D17] transition-colors duration-200
      ">
        Return Home
      </Link>
    </div>
  )

  return (
    <>
      <Navbar solid />
      <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment">
        <div className="px-8 lg:px-24 py-16 lg:py-24">
          {step === 'details' && detailsStep}
          {step === 'book'    && bookStep}
          {step === 'review'  && reviewStep}
          {step === 'done'    && doneStep}
        </div>
      </main>
      <Footer />
    </>
  )
}
