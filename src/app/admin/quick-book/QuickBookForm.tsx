'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const SERVICES = ['Suit & Jacket', 'Trousers', 'Dress/Skirt', 'Wedding', 'Leather', 'Mending', 'Other'] as const
type Service = typeof SERVICES[number]

const labelClass = 'block font-sans text-[0.6875rem] uppercase tracking-widest mb-2 text-charcoal/70'
const inputClass = 'w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white'

type CustomerHint = {
  name:     string
  phone:    string
  address:  string
  postcode: string
  lastServices: string[]
}

type CalEntry = {
  id:         string
  date:       string
  title:      string
  startTime?: string
  endTime?:   string
  type:       string
}

function todayISO() {
  return new Date().toLocaleDateString('en-CA') // YYYY-MM-DD in local time
}

export default function QuickBookForm() {
  const router = useRouter()

  const [phone,    setPhone]    = useState('')
  const [name,     setName]     = useState('')
  const [address,  setAddress]  = useState('')
  const [postcode, setPostcode] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const [date,     setDate]     = useState(todayISO())
  const [startTime, setStart]   = useState('09:00')
  const [endTime,   setEnd]     = useState('10:00')
  const [notes,    setNotes]    = useState('')

  const [hint,    setHint]    = useState<CustomerHint | null>(null)
  const [looking, setLooking] = useState(false)
  const [calEntries, setCalEntries] = useState<CalEntry[]>([])

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  const lookupTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lookupSeqRef = useRef(0) // prevents stale responses from overwriting newer results

  // ── Phone lookup ──────────────────────────────────────────────────────────
  const lookupPhone = useCallback(async (val: string) => {
    if (val.replace(/\D/g, '').length < 6) { setHint(null); return }
    const seq = ++lookupSeqRef.current
    setLooking(true)
    try {
      const res  = await fetch(`/api/admin/customers/search?phone=${encodeURIComponent(val)}`)
      const data = await res.json() as { customer: CustomerHint | null }
      if (seq !== lookupSeqRef.current) return // stale — a newer request is in flight
      if (data.customer) {
        setHint(data.customer)
        setName(data.customer.name)
        setAddress(data.customer.address)
        setPostcode(data.customer.postcode)
      } else {
        setHint(null)
      }
    } catch {
      if (seq === lookupSeqRef.current) setHint(null)
    }
    finally {
      if (seq === lookupSeqRef.current) setLooking(false)
    }
  }, [])

  function handlePhoneChange(val: string) {
    setPhone(val)
    if (val.replace(/\D/g, '').length < 6) setHint(null)
    if (lookupTimer.current) clearTimeout(lookupTimer.current)
    lookupTimer.current = setTimeout(() => lookupPhone(val), 600)
  }

  // ── Calendar entries for selected date ────────────────────────────────────
  useEffect(() => {
    if (!date) return
    fetch('/api/admin/calendar')
      .then(r => r.json())
      .then((d: { entries?: CalEntry[] }) => {
        const filtered = (d.entries ?? []).filter(e => e.date === date)
        setCalEntries(filtered)
      })
      .catch(() => {})
  }, [date])

  // ── Service toggle ────────────────────────────────────────────────────────
  function toggleService(s: Service) {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!services.length) { setError('Select at least one service'); return }
    if (endTime <= startTime) { setError('End time must be after start time'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/whatsapp-bookings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, address, postcode, services, date, startTime, endTime, notes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Save failed')
      setSuccess(true)
      setTimeout(() => router.push('/admin/schedule'), 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save. Try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">✓</div>
        <p className="font-playfair text-[1.25rem] text-charcoal mb-1">Booking saved</p>
        <p className="font-sans text-[0.875rem] text-muted">Tailor notified · Redirecting to Schedule…</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">

      {/* Phone — goes first */}
      <div className="bg-white border border-divider p-5">
        <label className={labelClass}>Phone number *</label>
        <div className="relative">
          <input
            required
            type="tel"
            value={phone}
            onChange={e => handlePhoneChange(e.target.value)}
            placeholder="07700 900123"
            className={inputClass}
            autoFocus
          />
          {looking && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[0.75rem] text-muted animate-pulse">
              Looking up…
            </span>
          )}
        </div>

        {hint && (
          <div className="mt-3 bg-green-50 border border-green-200 px-4 py-3">
            <p className="font-sans text-[0.75rem] uppercase tracking-widest text-green-700 mb-1">Returning customer found</p>
            <p className="font-sans text-[0.9375rem] text-charcoal font-medium">{hint.name}</p>
            <p className="font-sans text-[0.8125rem] text-muted">{hint.address}{hint.postcode ? `, ${hint.postcode}` : ''}</p>
            {hint.lastServices.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="font-sans text-[0.6875rem] text-muted self-center">Last services:</span>
                {hint.lastServices.map(s => {
                  const alreadySelected = services.includes(s as Service)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { if (!alreadySelected) setServices(p => [...p, s as Service]) }}
                      disabled={alreadySelected}
                      className={`font-sans text-[0.6875rem] uppercase tracking-wider px-2 py-1 border transition-colors ${
                        alreadySelected
                          ? 'border-green-600 bg-green-600 text-white cursor-default'
                          : 'border-green-400 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {alreadySelected ? '✓' : '+'} {s}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Customer details */}
      <div className="bg-white border border-divider p-5 space-y-4">
        <div>
          <label className={labelClass}>Full name *</label>
          <input
            required
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Address *</label>
          <input
            required
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="47 Belgrave Square"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Postcode *</label>
          <input
            required
            type="text"
            value={postcode}
            onChange={e => setPostcode(e.target.value.toUpperCase())}
            placeholder="SW1X 8QX"
            className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9375rem] focus:outline-none focus:border-hunter bg-white"
          />
        </div>
      </div>

      {/* Services — big tap buttons */}
      <div className="bg-white border border-divider p-5">
        <label className={labelClass}>Services * {services.length > 0 && <span className="text-hunter normal-case font-medium tracking-normal">({services.length} selected)</span>}</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SERVICES.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={`
                py-3.5 px-3 text-center font-sans text-[0.8125rem] font-medium border transition-colors
                ${services.includes(s)
                  ? 'bg-hunter text-parchment border-hunter'
                  : 'border-divider text-charcoal hover:border-hunter hover:text-hunter bg-white'
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Date + time */}
      <div className="bg-white border border-divider p-5 space-y-4">
        <div>
          <label className={labelClass}>Date *</label>
          <input
            required
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Existing calendar items for chosen date */}
        {calEntries.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-amber-700 mb-2">Already on calendar this day</p>
            <div className="space-y-1">
              {calEntries.map(e => (
                <p key={e.id} className="font-sans text-[0.8125rem] text-charcoal">
                  {e.startTime && e.endTime ? `${e.startTime}–${e.endTime} · ` : ''}{e.title}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Start time *</label>
            <input
              required
              type="time"
              value={startTime}
              onChange={e => setStart(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>End time *</label>
            <input
              required
              type="time"
              value={endTime}
              onChange={e => setEnd(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white border border-divider p-5">
        <label className={labelClass}>Notes <span className="normal-case font-light tracking-normal text-muted">(optional)</span></label>
        <textarea
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. prefers morning, pay on day, bring measurements"
          className="w-full border border-divider px-3 py-2.5 font-sans text-[0.875rem] focus:outline-none focus:border-hunter bg-white resize-none"
        />
      </div>

      {error && <p className="font-sans text-[0.875rem] text-red-600 px-1">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full bg-hunter text-parchment py-4
          font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
          hover:bg-[#1E3D17] transition-colors duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Saving…' : 'Log Booking & Notify Tailor →'}
      </button>
    </form>
  )
}
