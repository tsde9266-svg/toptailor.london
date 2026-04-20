'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

const BANK = { sortCode: '60-383-71', account: '19795111', name: 'One Click Tailor' }

type Step      = 'details' | 'book' | 'payment' | 'done'
type PayMethod = 'door' | 'bank'

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'

export default function CheckoutPage() {
  const { items, total, count, clear } = useCart()

  const [step,      setStep]      = useState<Step>('details')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [payMethod, setPayMethod] = useState<PayMethod | null>(null)
  const [bankDone,  setBankDone]  = useState(false)

  const [customer, setCustomer] = useState({
    name: '', email: '', phone: '', address: '', postcode: '',
  })

  // ── Cal.com embed — reinitialises every time step becomes 'book' ──────────────
  // We cannot use Next.js <Script> here because it caches by ID and never
  // re-executes on a second visit. useEffect + dynamic <script> runs fresh each time.
  useEffect(() => {
    if (step !== 'book') return

    const initCal = () => {
      const w = window as any
      if (!w.Cal) return

      // Clear any previous embed content
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

    // If already loaded just re-init; otherwise load the script first
    if ((window as any).Cal) {
      initCal()
    } else {
      const s = document.createElement('script')
      s.src   = 'https://app.cal.com/embed/embed.js'
      s.async = true
      s.onload = initCal
      document.head.appendChild(s)
    }
  }, [step]) // only re-run when step changes, not on every customer keystroke

  // ── Empty cart guard ──────────────────────────────────────────────────────────
  if (count === 0 && step === 'details') {
    return (
      <>
        <Navbar solid />
        <main className="pt-[57px] lg:pt-[65px] min-h-screen bg-parchment flex flex-col items-center justify-center px-8 text-center gap-6">
          <p className="font-playfair text-[1.5rem]">Your order is empty.</p>
          <p className="font-sans text-sm text-muted">Select services first, then come back here.</p>
          <Link href="/#services" className="bg-hunter text-parchment px-8 py-4 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors">
            Browse Services
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  // ── Submit order ──────────────────────────────────────────────────────────────
  async function submitOrder(method: PayMethod) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items, total, paymentMethod: method }),
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

  function handlePayChoice(method: PayMethod) {
    setPayMethod(method)
    if (method === 'door') submitOrder('door')
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

      {/* Order summary */}
      <div className="border border-divider p-6 mb-10">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Your Order</p>
        <ul className="space-y-3 mb-4">
          {items.map(item => (
            <li key={item.id} className="flex justify-between font-sans text-[0.9rem]">
              <span className="text-charcoal">{item.name}</span>
              <span className="text-hunter font-medium">£{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-divider pt-3 flex justify-between">
          <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Total</span>
          <span className="font-playfair text-[1.125rem] text-charcoal">£{total}</span>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); setStep('book') }} className="space-y-6">
        {/* Name */}
        <div>
          <label className={labelClass}>Full Name *</label>
          <input required type="text" value={customer.name}
            onChange={set('name')} className="input-line w-full font-sans text-[1rem]"
            placeholder="Your full name" />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email *</label>
          <input required type="email" value={customer.email}
            onChange={set('email')} className="input-line w-full font-sans text-[1rem]"
            placeholder="your@email.com" />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone</label>
          <input type="tel" value={customer.phone}
            onChange={set('phone')} className="input-line w-full font-sans text-[1rem]"
            placeholder="+44 7000 000000" />
        </div>

        {/* Address — critical for the visit */}
        <div>
          <label className={labelClass}>Collection Address *</label>
          <input required type="text" value={customer.address}
            onChange={set('address')} className="input-line w-full font-sans text-[1rem]"
            placeholder="Flat / house number and street name"
            autoComplete="street-address" />
          <p className="font-sans text-[0.6875rem] text-muted mt-1">
            We come to you — this is where we will collect your garments.
          </p>
        </div>

        {/* Postcode */}
        <div>
          <label className={labelClass}>Postcode *</label>
          <input required type="text" value={customer.postcode}
            onChange={set('postcode')} className="input-line w-full font-sans text-[1rem]"
            placeholder="e.g. W1S 1RE"
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
    </div>
  )

  // ══ STEP: book ═══════════════════════════════════════════════════════════════
  const bookStep = (
    <div>
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">Step 2 of 3</p>
      <h2 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-4">
        Book Your Slot
      </h2>
      <p className="font-sans font-light text-muted mb-8">
        Choose a time. We will come to <strong className="font-medium text-charcoal">{customer.address}, {customer.postcode}</strong>.
      </p>

      {/* Cal.com embed — populated by useEffect above */}
      <div id="cal-checkout" className="w-full mb-8" style={{ minHeight: '650px' }} />

      <div className="border border-divider p-6 text-center">
        <p className="font-sans text-[0.875rem] text-charcoal mb-1">
          Booked your slot above?
        </p>
        <p className="font-sans text-[0.75rem] text-muted mb-5">
          Once you have confirmed your time in the calendar, click below.
        </p>
        <button
          onClick={() => setStep('payment')}
          className="
            bg-hunter text-parchment px-10 py-4
            font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
            hover:bg-[#1E3D17] transition-colors duration-200
          "
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  )

  // ══ STEP: payment ════════════════════════════════════════════════════════════
  const paymentStep = (
    <div className="max-w-lg mx-auto">
      <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">Step 3 of 3</p>
      <h2 className="font-playfair text-[2rem] lg:text-[2.75rem] leading-[1.1] font-medium mb-4">
        Payment
      </h2>

      <div className="border border-divider p-5 mb-8">
        <div className="flex justify-between items-center">
          <span className="font-sans text-[0.75rem] uppercase tracking-widest text-muted">Order Total</span>
          <span className="font-playfair text-[1.5rem] text-charcoal">£{total}</span>
        </div>
      </div>

      {error && (
        <p className="font-sans text-sm text-red-600 bg-red-50 px-4 py-3 border border-red-200 mb-6">
          {error}
        </p>
      )}

      {!payMethod && (
        <div className="space-y-4">
          <p className="font-sans text-[0.8125rem] text-muted mb-6">How would you like to pay?</p>

          <button onClick={() => handlePayChoice('door')} disabled={loading}
            className="w-full border border-hunter text-left p-6 hover:bg-hunter/5 transition-colors duration-200 disabled:opacity-60">
            <p className="font-playfair text-[1.0625rem] text-charcoal mb-1">Pay on Door</p>
            <p className="font-sans text-[0.8125rem] text-muted">
              Cash or card reader when we arrive. Nothing needed now.
            </p>
          </button>

          <button onClick={() => handlePayChoice('bank')} disabled={loading}
            className="w-full border border-divider text-left p-6 hover:border-hunter transition-colors duration-200 disabled:opacity-60">
            <p className="font-playfair text-[1.0625rem] text-charcoal mb-1">Pay by Bank Transfer</p>
            <p className="font-sans text-[0.8125rem] text-muted">
              Instant UK bank transfer — free, secure, direct to us.
            </p>
          </button>
        </div>
      )}

      {payMethod === 'bank' && (
        <div className="space-y-6">
          <div className="bg-[#f0ede5] border border-divider p-6">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Transfer Details</p>
            <div className="space-y-3">
              {[
                ['Name',         BANK.name],
                ['Sort Code',    BANK.sortCode],
                ['Account',      BANK.account],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="font-sans text-[0.8125rem] text-muted">{label}</span>
                  <span className="font-sans text-[0.9rem] text-charcoal font-medium tracking-widest">{value}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-divider pt-3">
                <span className="font-sans text-[0.8125rem] text-muted">Amount</span>
                <span className="font-playfair text-[1.125rem] text-hunter">£{total}</span>
              </div>
            </div>
          </div>

          <p className="font-sans text-[0.75rem] text-muted text-center">
            Use your name as the payment reference. Arrives instantly via UK Faster Payments.
          </p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={bankDone}
              onChange={e => setBankDone(e.target.checked)} className="mt-1 accent-hunter" />
            <span className="font-sans text-[0.875rem] text-charcoal">
              I have completed the bank transfer of £{total}
            </span>
          </label>

          <button disabled={!bankDone || loading} onClick={() => submitOrder('bank')}
            className="
              w-full bg-hunter text-parchment py-5
              font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
              hover:bg-[#1E3D17] transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            ">
            {loading ? 'Confirming…' : 'Confirm Order →'}
          </button>

          <button onClick={() => { setPayMethod(null); setBankDone(false) }}
            className="w-full text-center font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors">
            ← Change payment method
          </button>
        </div>
      )}

      {loading && payMethod === 'door' && (
        <p className="font-sans text-sm text-muted text-center mt-6">Confirming your order…</p>
      )}
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
      <h2 className="font-playfair text-[2rem] font-medium mb-4">Order Confirmed</h2>
      <p className="font-sans font-light text-muted leading-relaxed mb-2">
        Thank you, <strong className="font-medium text-charcoal">{customer.name}</strong>.
      </p>
      <p className="font-sans text-[0.875rem] text-muted mb-2">
        We will visit you at:
      </p>
      <p className="font-sans text-[0.9rem] text-charcoal font-medium mb-6">
        {customer.address}, {customer.postcode}
      </p>
      {payMethod === 'bank' ? (
        <p className="font-sans text-[0.875rem] text-muted mb-8">
          Bank transfer of <strong className="text-charcoal">£{total}</strong> received. We will confirm your visit shortly.
        </p>
      ) : (
        <p className="font-sans text-[0.875rem] text-muted mb-8">
          Payment of <strong className="text-charcoal">£{total}</strong> will be collected on arrival.
        </p>
      )}
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
          {step === 'payment' && paymentStep}
          {step === 'done'    && doneStep}
        </div>
      </main>
      <Footer />
    </>
  )
}
