'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  variant?: 'primary' | 'outline' | 'danger'
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        font-sans text-[0.75rem] uppercase tracking-widest px-5 py-3 transition-colors disabled:opacity-50
        ${variant === 'primary' ? 'bg-hunter text-parchment hover:bg-hunter/90' : ''}
        ${variant === 'outline' ? 'border border-hunter text-hunter hover:bg-hunter/5' : ''}
        ${variant === 'danger'  ? 'border border-red-400 text-red-600 hover:bg-red-50' : ''}
      `}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-sans text-[0.6875rem] text-muted block mb-1">{label}</label>
      {children}
    </div>
  )
}

const INPUT = 'w-full border border-divider px-3 py-2 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter'

export default function BookingActions({ booking }: Props) {
  const router = useRouter()

  const [status, setStatus]   = useState(booking.status)
  const [loading, setLoading] = useState<string | null>(null)
  const [waLink, setWaLink]   = useState<string | null>(null)
  const [error, setError]     = useState<string | null>(null)

  // Propose-times form
  const [showPropose, setShowPropose]     = useState(false)
  const [slots, setSlots]                 = useState<SlotInput[]>([{ ...EMPTY_SLOT }])
  const [adminNote, setAdminNote]         = useState('')
  const [proposedTimes, setProposedTimes] = useState(booking.proposedTimes ?? [])
  const [chosenSlot, setChosenSlot]       = useState<number>(0)

  // Edit form
  const [showEdit, setShowEdit] = useState(false)
  const [editName, setEditName]         = useState(booking.attendee.name)
  const [editEmail, setEditEmail]       = useState(booking.attendee.email)
  const [editPhone, setEditPhone]       = useState(booking.attendee.phone)
  const [editLocation, setEditLocation] = useState(booking.location)
  const [editNotes, setEditNotes]       = useState(booking.notes)
  const [editError, setEditError]       = useState<string | null>(null)

  // ── Edit ───────────────────────────────────────────────────────────────────
  async function handleEdit() {
    setLoading('edit')
    setEditError(null)
    try {
      const res = await fetch(`/api/admin/cal-bookings/${booking.id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name: editName, email: editEmail, phone: editPhone,
          location: editLocation, notes: editNotes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setShowEdit(false)
      router.refresh()
    } catch (e) {
      setEditError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // ── Cancel ─────────────────────────────────────────────────────────────────
  async function handleCancel() {
    if (!window.confirm('Cancel this booking? The customer will NOT be notified automatically — contact them by email or phone (only use WhatsApp if they\'ve already messaged you there).')) return
    setLoading('cancel')
    setError(null)
    try {
      const res = await fetch(`/api/admin/cal-bookings/${booking.id}/cancel`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('cancelled')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete() {
    if (!window.confirm('Permanently delete this booking? This cannot be undone.')) return
    if (!window.confirm('Are you sure? The booking record will be gone forever.')) return
    setLoading('delete')
    setError(null)
    try {
      const res = await fetch(`/api/admin/cal-bookings/${booking.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      router.push('/admin/bookings')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(null)
    }
  }

  // ── Approve ────────────────────────────────────────────────────────────────
  async function handleApprove() {
    if (!window.confirm('Approve this booking? A confirmation email will be sent to the customer.')) return
    setLoading('approve')
    setError(null)
    try {
      const res  = await fetch(`/api/admin/cal-bookings/${booking.id}/approve`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      setStatus('approved')
      setWaLink(data.waLink ?? null)
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
    if (!window.confirm('Confirm this slot? This will mark the booking as approved.')) return
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
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // ── Re-send propose ────────────────────────────────────────────────────────
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

  // ── Edit form (shown when showEdit is true) ────────────────────────────────
  const editForm = showEdit && (
    <div className="bg-white border border-divider p-6 space-y-4">
      <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">Edit Booking Details</p>
      {editError && (
        <p className="font-sans text-[0.8125rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">{editError}</p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Name">
          <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className={INPUT} />
        </Field>
        <Field label="Phone">
          <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} className={INPUT} />
        </Field>
        <Field label="Email" >
          <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} className={`${INPUT} sm:col-span-2`} />
        </Field>
      </div>
      <Field label="Collection address">
        <input type="text" value={editLocation} onChange={e => setEditLocation(e.target.value)} className={INPUT} />
      </Field>
      <Field label="Notes">
        <textarea rows={3} value={editNotes} onChange={e => setEditNotes(e.target.value)} className={`${INPUT} resize-none`} />
      </Field>
      <div className="flex gap-3">
        <ActionBtn onClick={handleEdit} loading={loading === 'edit'} variant="primary">Save changes</ActionBtn>
        <ActionBtn onClick={() => { setShowEdit(false); setEditError(null) }} loading={false} variant="outline">Cancel</ActionBtn>
      </div>
    </div>
  )

  // ── Admin toolbar (edit / cancel / delete) — always visible ───────────────
  const adminToolbar = (
    <div className="flex flex-wrap gap-2 pt-2 border-t border-divider mt-4">
      <button
        onClick={() => { setShowEdit(p => !p); setEditError(null) }}
        className="font-sans text-[0.6875rem] text-muted hover:text-charcoal underline underline-offset-2 transition-colors"
      >
        {showEdit ? 'Close edit' : 'Edit details'}
      </button>
      {status !== 'cancelled' && (
        <button
          onClick={handleCancel}
          disabled={loading === 'cancel'}
          className="font-sans text-[0.6875rem] text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors disabled:opacity-50"
        >
          Cancel booking
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={loading === 'delete'}
        className="font-sans text-[0.6875rem] text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {error && (
        <p className="font-sans text-[0.8125rem] text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      {/* Result panel after approve/confirm */}
      {status === 'approved' && waLink !== null && (
        <div className="bg-green-50 border border-green-200 p-6 space-y-3">
          <p className="font-sans text-[0.875rem] text-green-800 font-medium">✓ Booking confirmed — confirmation email sent</p>
          <p className="font-sans text-[0.75rem] text-amber-700">
            Only use WhatsApp below if this customer has already messaged you there — sending it cold risks another ban.
          </p>
          <WAButton href={waLink} label="WhatsApp (reply only)" />
        </div>
      )}

      {/* Pending */}
      {status === 'pending' && (
        <div className="space-y-4">
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
                    <Field label="Date">
                      <input type="date" value={slot.date} onChange={e => updateSlot(i, 'date', e.target.value)}
                        className="w-full border border-divider px-2 py-1.5 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter" />
                    </Field>
                    <Field label="Start">
                      <input type="time" value={slot.startTime} onChange={e => updateSlot(i, 'startTime', e.target.value)}
                        className="w-full border border-divider px-2 py-1.5 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter" />
                    </Field>
                    <Field label="End">
                      <input type="time" value={slot.endTime} onChange={e => updateSlot(i, 'endTime', e.target.value)}
                        className="w-full border border-divider px-2 py-1.5 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter" />
                    </Field>
                  </div>
                </div>
              ))}
              {slots.length < 3 && (
                <button onClick={() => setSlots(p => [...p, { ...EMPTY_SLOT }])}
                  className="font-sans text-[0.75rem] text-hunter underline underline-offset-2">
                  + Add another slot
                </button>
              )}
              <div>
                <label className="font-sans text-[0.6875rem] text-muted block mb-1">Note to customer (optional)</label>
                <textarea rows={2} value={adminNote} onChange={e => setAdminNote(e.target.value)}
                  placeholder="e.g. We apologise for the inconvenience."
                  className="w-full border border-divider px-3 py-2 font-sans text-[0.8125rem] text-charcoal focus:outline-none focus:border-hunter resize-none" />
              </div>
              <ActionBtn onClick={handlePropose} loading={loading === 'propose'} variant="primary">
                Generate WhatsApp Message →
              </ActionBtn>
            </div>
          )}
        </div>
      )}

      {/* Awaiting customer */}
      {status === 'awaiting_customer' && (
        <div className="bg-blue-50 border border-blue-200 p-6 space-y-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-blue-700">Proposed Times Sent</p>
          <p className="font-sans text-[0.75rem] text-charcoal">
            Confirm on whichever channel the customer actually replied on (email or WhatsApp) — don&apos;t WhatsApp them cold if they replied by email.
          </p>
          <div className="space-y-2">
            <p className="font-sans text-[0.8125rem] text-charcoal font-medium">Which time did the customer choose?</p>
            {proposedTimes.map((slot, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="slot" value={i} checked={chosenSlot === i}
                  onChange={() => setChosenSlot(i)} className="accent-hunter" />
                <span className="font-sans text-[0.875rem] text-charcoal">
                  {fmtSlotDate(slot.start)}&nbsp;·&nbsp;{fmtSlotTime(slot.start)} – {fmtSlotTime(slot.end)}
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionBtn onClick={handleConfirmSlot} loading={loading === 'confirm'} variant="primary">
              Customer chose — confirm &amp; notify →
            </ActionBtn>
            <ActionBtn onClick={handleResendPropose} loading={loading === 'resend'} variant="outline">
              Re-send propose message
            </ActionBtn>
          </div>
          {waLink && <WAButton href={waLink} label="WhatsApp (reply only)" />}
        </div>
      )}

      {/* Approved (no pending action) */}
      {status === 'approved' && waLink === null && (
        <div className="bg-green-50 border border-green-200 p-6">
          <p className="font-sans text-[0.875rem] text-green-800 font-medium">✓ This booking is confirmed.</p>
        </div>
      )}

      {/* Cancelled */}
      {status === 'cancelled' && (
        <div className="bg-gray-50 border border-divider p-6">
          <p className="font-sans text-[0.875rem] text-muted">This booking has been cancelled.</p>
        </div>
      )}

      {/* Edit form */}
      {editForm}

      {/* Admin toolbar */}
      {adminToolbar}
    </div>
  )
}
