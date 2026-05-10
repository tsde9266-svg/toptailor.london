'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const labelClass = 'block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal'

export default function LogCallForm() {
  const router = useRouter()
  const [name,   setName]   = useState('')
  const [phone,  setPhone]  = useState('')
  const [email,  setEmail]  = useState('')
  const [notes,  setNotes]  = useState('')
  const [status, setStatus] = useState<'pending_call' | 'called' | 'closed'>('called')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/log-call', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, notes, status }),
      })
      if (!res.ok) throw new Error('save failed')
      const data = await res.json()
      router.push(`/admin/consultations/${data.id}`)
    } catch {
      setError('Could not save. Try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6 bg-white border border-divider p-6">
      <div>
        <label className={labelClass}>Name *</label>
        <input
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-divider px-3 py-2 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter"
        />
      </div>

      <div>
        <label className={labelClass}>Phone *</label>
        <input
          required
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+44 7000 000000"
          className="w-full border border-divider px-3 py-2 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter"
        />
      </div>

      <div>
        <label className={labelClass}>Email <span className="normal-case font-light tracking-normal">(optional)</span></label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-divider px-3 py-2 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter"
        />
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <div className="flex flex-wrap gap-2">
          {([
            ['pending_call', 'Pending Call'],
            ['called',       'Called'],
            ['closed',       'Closed'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStatus(key)}
              className={`
                font-sans text-[0.75rem] uppercase tracking-widest px-3 py-1.5 border transition-colors
                ${status === key
                  ? 'bg-hunter text-parchment border-hunter'
                  : 'border-divider text-muted hover:border-hunter hover:text-charcoal'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          rows={5}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="What did they want? What did you agree?"
          className="w-full border border-divider px-3 py-2 font-sans text-[0.875rem] focus:outline-none focus:border-hunter"
        />
      </div>

      {error && <p className="font-sans text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full bg-hunter text-parchment py-3
          font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Saving…' : 'Save Call →'}
      </button>
    </form>
  )
}
