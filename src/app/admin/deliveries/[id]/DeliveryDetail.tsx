'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Delivery } from '@/lib/kv'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

function reviewWALink(name: string, phone: string, stopId: string) {
  const encodedName = encodeURIComponent(name)
  const url = `${BASE_URL}/review?name=${encodedName}&ref=${stopId}`
  const msg = `Hi ${name}, thank you for choosing Fine Tailors! We hope you're happy with your garments. We'd love to hear your feedback — it only takes 30 seconds 🌟\n\n${url}`
  const num = phone.replace(/\D/g, '').replace(/^0/, '44')
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
}

export default function DeliveryDetail({ delivery: initial }: { delivery: Delivery }) {
  const router  = useRouter()
  const [delivery, setDelivery] = useState(initial)
  const [loading,  setLoading]  = useState<string | null>(null)
  const [error,    setError]    = useState('')

  async function markDelivered(stopId: string) {
    if (!window.confirm('Mark this stop as delivered?')) return
    setLoading(stopId)
    setError('')
    try {
      const res = await fetch(`/api/admin/deliveries/${delivery.id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ stopId }),
      })
      if (!res.ok) throw new Error('Failed')
      setDelivery(prev => ({
        ...prev,
        stops: prev.stops.map(s =>
          s.id === stopId ? { ...s, status: 'delivered', deliveredAt: new Date().toISOString() } : s
        ),
      }))
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  async function markReviewSent(stopId: string) {
    await fetch(`/api/admin/deliveries/${delivery.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ reviewSentStopId: stopId }),
    }).catch(() => {})
    setDelivery(prev => ({
      ...prev,
      stops: prev.stops.map(s => s.id === stopId ? { ...s, reviewSent: true } : s),
    }))
  }

  async function handleDelete() {
    if (!window.confirm('Delete this delivery run? This cannot be undone.')) return
    await fetch(`/api/admin/deliveries/${delivery.id}`, { method: 'DELETE' })
    router.push('/admin/deliveries')
  }

  const allDone = delivery.stops.every(s => s.status === 'delivered')

  return (
    <div className="space-y-4">
      {error && (
        <p className="font-sans text-[0.875rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      {allDone && (
        <div className="bg-green-50 border border-green-200 px-5 py-4">
          <p className="font-sans text-[0.875rem] text-green-800 font-medium">✓ All stops delivered</p>
        </div>
      )}

      {delivery.stops.map(stop => (
        <div key={stop.id} className={`bg-white border p-5 space-y-3 ${stop.status === 'delivered' ? 'border-green-200' : 'border-divider'}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="font-sans text-[0.9375rem] font-medium text-charcoal">{stop.name}</p>
                <span className={`font-sans text-[0.6rem] font-medium uppercase tracking-wider px-2 py-0.5 ${
                  stop.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {stop.status === 'delivered' ? 'Delivered' : 'Pending'}
                </span>
              </div>
              <p className="font-sans text-[0.8125rem] text-muted">{stop.address}</p>
              {stop.items && <p className="font-sans text-[0.8125rem] text-muted">🧵 {stop.items}</p>}
              {stop.phone && <p className="font-sans text-[0.8125rem] text-muted">📞 {stop.phone}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            {stop.status === 'pending' && (
              <button
                onClick={() => markDelivered(stop.id)}
                disabled={loading === stop.id}
                className="font-sans text-[0.75rem] uppercase tracking-widest bg-hunter text-parchment px-4 py-2 hover:bg-[#1E3D17] transition-colors disabled:opacity-50"
              >
                {loading === stop.id ? 'Saving…' : 'Mark Delivered ✓'}
              </button>
            )}

            {stop.status === 'delivered' && stop.phone && !stop.reviewSent && (
              <a
                href={reviewWALink(stop.name, stop.phone, stop.id)}
                target="_blank"
                rel="noreferrer"
                onClick={() => markReviewSent(stop.id)}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-sans text-[0.75rem] uppercase tracking-widest px-4 py-2 hover:bg-[#1fad53] transition-colors"
              >
                💬 Send Review Request
              </a>
            )}

            {stop.status === 'delivered' && stop.reviewSent && (
              <span className="font-sans text-[0.75rem] text-muted px-4 py-2 border border-divider">
                Review request sent ✓
              </span>
            )}

            {stop.phone && (
              <a
                href={`https://wa.me/${stop.phone.replace(/\D/g, '').replace(/^0/, '44')}`}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[0.75rem] text-muted hover:text-charcoal underline underline-offset-2 py-2"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Delete */}
      <div className="pt-4 border-t border-divider">
        <button
          onClick={handleDelete}
          className="font-sans text-[0.6875rem] text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
        >
          Delete this delivery run
        </button>
      </div>
    </div>
  )
}
