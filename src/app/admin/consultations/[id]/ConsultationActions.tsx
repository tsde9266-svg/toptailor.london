'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Consultation } from '@/lib/kv'

const STATUS_OPTIONS: Consultation['status'][] = ['pending_call', 'called', 'closed']

const STATUS_LABEL: Record<Consultation['status'], string> = {
  pending_call: 'Pending Call',
  called:       'Called',
  closed:       'Closed',
}

export default function ConsultationActions({ consultation }: { consultation: Consultation }) {
  const router = useRouter()
  const [status,  setStatus]  = useState<Consultation['status']>(consultation.status)
  const [notes,   setNotes]   = useState(consultation.notes ?? '')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState('')

  async function save() {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/admin/consultation', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: consultation.id, status, notes }),
      })
      if (!res.ok) throw new Error('save failed')
      setSaved(true)
      router.refresh()
    } catch {
      setError('Could not save. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="border border-divider p-5 bg-white">
      <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Update</p>

      {/* Status */}
      <div className="mb-5">
        <label className="font-sans text-[0.75rem] text-charcoal uppercase tracking-widest block mb-2">Status</label>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`
                font-sans text-[0.75rem] uppercase tracking-widest px-3 py-1.5 border transition-colors
                ${status === s
                  ? 'bg-hunter text-parchment border-hunter'
                  : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                }
              `}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <label className="font-sans text-[0.75rem] text-charcoal uppercase tracking-widest block mb-2">Call notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={5}
          placeholder="What did the customer say? What did you agree?"
          className="w-full border border-divider px-3 py-2 font-sans text-[0.875rem] focus:outline-none focus:border-hunter"
        />
      </div>

      {error && <p className="font-sans text-sm text-red-600 mb-3">{error}</p>}
      {saved && <p className="font-sans text-sm text-green-700 mb-3">Saved.</p>}

      <button
        onClick={save}
        disabled={saving}
        className="
          w-full bg-hunter text-parchment py-3
          font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  )
}
