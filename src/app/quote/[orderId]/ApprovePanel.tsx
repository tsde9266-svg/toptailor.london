'use client'
import { useState } from 'react'

export default function ApprovePanel({
  orderId,
  total,
}: {
  orderId: string
  total:   number
}) {
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleApprove() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/quote/${orderId}/approve`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ paymentMethod: 'door' }),
      })
      if (!res.ok) throw new Error('server error')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="border border-green-200 bg-green-50 p-6 text-center">
        <svg className="mx-auto mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <p className="font-playfair text-[1.25rem] text-green-800 mb-2">Quote Approved</p>
        <p className="font-sans text-[0.875rem] text-green-700">
          Thank you. We&apos;ll complete your alterations and collect payment — cash or card — on delivery.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <p className="font-sans text-[0.8125rem] text-muted mb-2">
        Review the items above. When you&apos;re happy, approve the quote to confirm your order.
      </p>
      <p className="font-sans text-[0.8125rem] text-hunter font-medium mb-6">
        Payment of £{total} is cash or card on collection — nothing needed now.
      </p>

      {error && (
        <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 mb-4">
          {error}
        </p>
      )}

      <button
        onClick={handleApprove}
        disabled={loading}
        className="
          w-full bg-hunter text-parchment py-5
          font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Confirming…' : 'Approve This Quote →'}
      </button>
    </div>
  )
}
