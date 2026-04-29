'use client'
import { useState } from 'react'

const BANK = { sortCode: '60-383-71', account: '19795111', name: 'One Click Tailor' }

export default function ApprovePanel({
  orderId,
  total,
}: {
  orderId: string
  total:   number
}) {
  const [step,      setStep]      = useState<'idle' | 'payment' | 'bank' | 'done'>('idle')
  const [method,    setMethod]    = useState<'door' | 'bank' | null>(null)
  const [bankDone,  setBankDone]  = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  async function confirm(payMethod: 'door' | 'bank') {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/quote/${orderId}/approve`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod: payMethod }),
      })
      if (!res.ok) throw new Error('server error')
      setStep('done')
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="border border-green-200 bg-green-50 p-6 text-center">
        <svg className="mx-auto mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <p className="font-playfair text-[1.25rem] text-green-800 mb-2">Quote Approved</p>
        <p className="font-sans text-[0.875rem] text-green-700">
          {method === 'bank'
            ? "Thank you. Once we've confirmed your transfer, we'll start work right away."
            : "Thank you. We'll complete your alterations and collect payment on delivery."}
        </p>
      </div>
    )
  }

  if (step === 'payment') {
    return (
      <div className="space-y-4">
        <p className="font-sans text-[0.8125rem] text-muted mb-4">
          How would you like to pay?
        </p>

        {error && (
          <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={() => { setMethod('door'); confirm('door') }}
          disabled={loading}
          className="w-full border border-hunter text-left p-5 hover:bg-hunter/5 transition-colors disabled:opacity-60"
        >
          <p className="font-playfair text-[1.0625rem] text-charcoal mb-0.5">Pay on Collection / Delivery</p>
          <p className="font-sans text-[0.8125rem] text-muted">Cash or card when we return your garments. Nothing needed now.</p>
        </button>

        <button
          onClick={() => { setMethod('bank'); setStep('bank') }}
          disabled={loading}
          className="w-full border border-divider text-left p-5 hover:border-hunter transition-colors disabled:opacity-60"
        >
          <p className="font-playfair text-[1.0625rem] text-charcoal mb-0.5">Bank Transfer</p>
          <p className="font-sans text-[0.8125rem] text-muted">Instant UK Faster Payments — free and direct.</p>
        </button>

        {loading && <p className="font-sans text-sm text-muted text-center">Confirming…</p>}
      </div>
    )
  }

  if (step === 'bank') {
    return (
      <div className="space-y-6">
        <div className="bg-[#f0ede5] border border-divider p-6">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Transfer Details</p>
          <div className="space-y-3">
            {[
              ['Name',        BANK.name],
              ['Sort Code',   BANK.sortCode],
              ['Account',     BANK.account],
              ['Amount',      `£${total}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="font-sans text-[0.8125rem] text-muted">{label}</span>
                <span className="font-sans text-[0.9rem] text-charcoal font-medium tracking-widest">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-sans text-[0.75rem] text-muted text-center">
          Use your name as the payment reference.
        </p>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={bankDone}
            onChange={e => setBankDone(e.target.checked)}
            className="mt-1 accent-hunter"
          />
          <span className="font-sans text-[0.875rem] text-charcoal">
            I have completed the bank transfer of £{total}
          </span>
        </label>

        {error && (
          <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
            {error}
          </p>
        )}

        <button
          disabled={!bankDone || loading}
          onClick={() => confirm('bank')}
          className="
            w-full bg-hunter text-parchment py-5
            font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
            hover:bg-[#1E3D17] transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? 'Confirming…' : 'Confirm Approval →'}
        </button>

        <button
          onClick={() => { setStep('payment'); setMethod(null); setBankDone(false) }}
          className="w-full text-center font-sans text-[0.75rem] text-muted hover:text-charcoal transition-colors"
        >
          ← Change payment method
        </button>
      </div>
    )
  }

  // idle — show approve button
  return (
    <div className="text-center">
      <p className="font-sans text-[0.8125rem] text-muted mb-6">
        Review the items above. When you&apos;re happy, approve the quote to confirm your order.
        You only pay after the work is complete.
      </p>
      <button
        onClick={() => setStep('payment')}
        className="
          w-full bg-hunter text-parchment py-5
          font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
        "
      >
        Approve This Quote →
      </button>
    </div>
  )
}
