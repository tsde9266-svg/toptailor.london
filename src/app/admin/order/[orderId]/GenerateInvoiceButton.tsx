'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GenerateInvoiceButton({ orderId }: { orderId: string }) {
  const router  = useRouter()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function generate() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/invoice', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error ?? 'Failed.'); return }
      router.push(`/admin/invoice/${data.id}`)
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={generate}
        disabled={loading}
        className="flex-shrink-0 bg-hunter text-parchment px-5 py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-50"
      >
        {loading ? 'Generating…' : 'Generate Invoice'}
      </button>
      {error && <p className="font-sans text-[0.75rem] text-red-600 mt-1">{error}</p>}
    </div>
  )
}
