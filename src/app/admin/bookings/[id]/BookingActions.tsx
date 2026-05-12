'use client'

import { useState } from 'react'
import type { CalBooking } from '@/lib/kv'
import { fmtSlotDate, fmtSlotTime } from '@/lib/greeting'

type Props = { booking: CalBooking }

type SlotInput = { date: string; startTime: string; endTime: string }

const EMPTY_SLOT: SlotInput = { date: '', startTime: '', endTime: '' }

function WAButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 bg-[#25D366] text-white font-sans text-[0.75rem] uppercase tracking-widest px-5 py-3 hover:bg-[#1ebe5d] transition-colors"
    >
      💬 {label}
    </a>
  )
}

function ActionBtn({
  onClick, loading, children, variant = 'primary',
}: {
  onClick: () => void
  loading: boolean
  children: React.ReactNode
  variant?: 'primary' | 'outline'
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        font-sans text-[0.75rem] uppercase tracking-widest px-5 py-3 transition-colors disabled:opacity-50
        ${variant === 'primary'
          ? 'bg-hunter text-parchment hover:bg-hunter/90'
          : 'border border-hunter text-hunter hover:bg-hunter/5'}
      `}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}

export default function BookingActions({ booking }: Props) {
  const [status, setStatus]           = useState(booking.status)
  const [loading, setLoading]         = useState<string | null>(null)
  const [waLink, setWaLink]           = useState<string | null>(null)
  const [emailOk, setEmailOk]         = useState<boolean | null>(null)
  const [error, setError]             = useState<string | null>(null)

  // Propose-times form state
  const [showPropose, setShowPropose] = useState(false)
  const [slots, setSlots]             = useState<SlotInput[]>([{ ...EMPTY_SLOT }])
  const [adminNote, setAdminNote]     = useState('')

  // Live proposed times (may differ from booking prop after inline action)
  const [proposedTimes, setProposedTimes] = useState(booking.proposedTimes ?? [])

  // Confirm-slot state
  const [chosenSlot, setChosenSlot]   = useState<number>(0)

  // ── Approve ────────────────────────────────────────────────────────────────
  async function handleApprove() {
    setLoading('approve')
    setError(null)
    try {
      const res  = await fetch(`/api/admin/cal-bookings/${booking.id}/approve`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('approved')
      setWaLink(data.waLink ?? null)
      setEmailOk(data.emailSent)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // ── Propose times ──────────────────────────────────────────────────────────
  async function handlePropose() {
    const validSlots = slots.filter(s => s.date && s.startTime && s.endTime)
    if (!validSlots.length) { setError('Add at least one complete slot.'); return }
    setLoading('propose')
    setError(null)
    try {
      const res  = await fetch(`/api/admin/cal-bookings/${booking.id}/propose`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ slots: validSlots, adminNote }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('awaiting_customer')
      setWaLink(data.waLink ?? null)
      // Update local proposed times so the confirm UI shows them without a page reload
      const built = slots
        .filter(s => s.date && s.startTime && s.endTime)
        .map(s => ({ start: `${s.date}T${s.startTime}`, end: `${s.date}T${s.endTime}` }))
      setProposedTimes(built)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // ── Confirm slot ───────────────────────────────────────────────────────────
  async function handleConfirmSlot() {
    setLoading('confirm')
    setError(null)
    try {
      const res  = await fetch(`/api/admin/cal-bookings/${booking.id}/confirm-slot`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ slotIndex: chosenSlot }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('approved')
      setWaLink(data.waLink ?? null)
      setEmailOk(data.emailSent)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // ── Re-generate propose WhatsApp link ──────────────────────────────────────
  async function handleResendPropose() {
    setLoading('resend')
    setError(null)
    try {
      const res  = await fetch(`/api/admin/cal-bookings/${booking.id}/propose`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          slots:     proposedTimes.map(s => ({
            date:      s.start.split('T')[0],
            startTime: s.start.split('T')[1]?.slice(0, 5),
            endTime:   s.end.split('T')[1]?.slice(0, 5),
          })),
          adminNote: booking.adminNote ?? '',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setWaLink(data.waLink ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  function updateSlot(i: number, field: keyof SlotInput, value: string) {
    setSlots(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s))
  }

  // ── Result panel (shown after any action) ─────────────────────────────────
  if (status === 'approved' && (waLink !== null || emailOk !== null)) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 space-y-4">
        <p className="font-sans text-[0.875rem] text-green-800 font-medium">
          ✓ Booking confirmed
          {emailOk === true  && ' · Confirmation email sent to customer.'}
          {emailOk === false && ' · Email failed — send WhatsApp manually.'}
        </p>
        {waLink && <WAButton href={waLink} label="Send WhatsApp Confirmation" />}
      </div>
    )
  }

  // ── Pending state ──────────────────────────────────────────────────────────
  if (status === 'pending') {
    return (
      <div className="space-y-4">
        {error && (
          <p className="font-sans text-[0.8125rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <ActionBtn onClick={handleApprove} loading={loading === 'approve'} variant="primary">
            Approve Booking
          </ActionBtn>
          <ActionBtn
            onClick={() => { setShowPropose(p => !p); setError(null) }}
            loading={false}
            variant="outline"
          >
            {showPropose ? 'Cancel' : 'Propose New Times'}
          </ActionBtn>
        </div>

        {showPropose && (
          <div className="bg-white border border-divider p-6 space-y-5">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Alternative Time Slots</p>

            {slots.map((slot, i) => (
              <div key={i} className="space-y-2">
                <p className="font-sans text-[0.75rem] text-muted">Slot {i + 1}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-sans text-[0.6875rem] text-muted block mb-1">Date</label>
                    <input
                      type="date"
                      value={slot.date}
                      onChange={e => updateSlot(i, 'date', e.target.value)}
                      className="w-full border border-divider px-2 py-1.5 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[0.6875rem] text-muted block mb-1">Start</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={e => updateSlot(i, 'startTime', e.target.value)}
                      className="w-full border border-divider px-2 py-1.5 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[0.6875rem] text-muted block mb-1">End</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={e => updateSlot(i, 'endTime', e.target.value)}
                      className="w-full border border-divider px-2 py-1.5 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter"
                    />
                  </div>
                </div>
              </div>
            ))}

            {slots.length < 3 && (
              <button
                onClick={() => setSlots(p => [...p, { ...EMPTY_SLOT }])}
                className="font-sans text-[0.75rem] text-hunter underline underline-offset-2"
              >
                + Add another slot
              </button>
            )}

            <div>
              <label className="font-sans text-[0.6875rem] text-muted block mb-1">Note to customer (optional)</label>
              <textarea
                rows={2}
                value={adminNote}
                onChange={e => setAdminNote(e.target.value)}
                placeholder="e.g. We apologise for the inconvenience."
                className="w-full border border-divider px-3 py-2 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter resize-none"
              />
            </div>

            <ActionBtn onClick={handlePropose} loading={loading === 'propose'} variant="primary">
              Generate WhatsApp Message →
            </ActionBtn>
          </div>
        )}
      </div>
    )
  }

  // ── Awaiting customer state ────────────────────────────────────────────────
  if (status === 'awaiting_customer') {
    const proposed = proposedTimes
    return (
      <div className="space-y-4">
        {error && (
          <p className="font-sans text-[0.8125rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
        )}

        <div className="bg-blue-50 border border-blue-200 p-6 space-y-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-blue-700 mb-1">Proposed Times Sent</p>

          {/* Which slot did customer choose? */}
          <div className="space-y-2">
            <p className="font-sans text-[0.8125rem] text-charcoal font-medium">Which time did the customer choose?</p>
            {proposed.map((slot, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="slot"
                  value={i}
                  checked={chosenSlot === i}
                  onChange={() => setChosenSlot(i)}
                  className="accent-hunter"
                />
                <span className="font-sans text-[0.875rem] text-charcoal">
                  {fmtSlotDate(slot.start)}&nbsp; · &nbsp;{fmtSlotTime(slot.start)} – {fmtSlotTime(slot.end)}
                </span>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <ActionBtn onClick={handleConfirmSlot} loading={loading === 'confirm'} variant="primary">
              Confirm &amp; Send Email
            </ActionBtn>
            <ActionBtn onClick={handleResendPropose} loading={loading === 'resend'} variant="outline">
              Re-send WhatsApp
            </ActionBtn>
          </div>

          {waLink && <WAButton href={waLink} label="Open WhatsApp" />}
        </div>
      </div>
    )
  }

  // ── Approved (arrived here directly, no pending action) ───────────────────
  if (status === 'approved') {
    return (
      <div className="bg-green-50 border border-green-200 p-6">
        <p className="font-sans text-[0.875rem] text-green-800 font-medium">✓ This booking is confirmed.</p>
      </div>
    )
  }

  // ── Cancelled ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 border border-divider p-6">
      <p className="font-sans text-[0.875rem] text-muted">This booking has been cancelled.</p>
    </div>
  )
}
