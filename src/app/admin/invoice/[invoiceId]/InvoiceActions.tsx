'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { InvoiceStatus } from '@/lib/kv'

type Props = {
  invoiceId:      string
  invoiceNumber:  string
  invoiceUrl:     string
  status:         InvoiceStatus
  customerEmail?:  string
  customerPhone?: string
  notes?:         string
  itemCount?:     number
}

export default function InvoiceActions({
  invoiceId, invoiceNumber, invoiceUrl, status, customerEmail, customerPhone, notes: initialNotes, itemCount: initialItemCount,
}: Props) {
  const router = useRouter()
  const [sending,    setSending]    = useState(false)
  const [marking,    setMarking]    = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [emailDone,  setEmailDone]  = useState(false)
  const [emailErr,   setEmailErr]   = useState('')
  const [paid,       setPaid]       = useState(status === 'paid')
  const [copied,     setCopied]     = useState(false)
  const [pdfErr,     setPdfErr]     = useState('')
  const [deleting,   setDeleting]   = useState(false)
  const [deleteErr,  setDeleteErr]  = useState('')

  // Notes state
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes,        setNotes]        = useState(initialNotes ?? '')
  const [savedNotes,   setSavedNotes]   = useState(initialNotes ?? '')
  const [savingNotes,  setSavingNotes]  = useState(false)
  const [notesErr,     setNotesErr]     = useState('')

  // Item count state
  const [editingCount, setEditingCount] = useState(false)
  const [itemCount,    setItemCount]    = useState<number | ''>(initialItemCount ?? '')
  const [savedCount,   setSavedCount]   = useState<number | undefined>(initialItemCount)
  const [savingCount,  setSavingCount]  = useState(false)
  const [countErr,     setCountErr]     = useState('')

  async function handleSendPdf() {
    setPdfLoading(true)
    setPdfErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}/pdf`)
      if (!res.ok) throw new Error('Failed to generate PDF')
      const blob     = await res.blob()
      const filename = `Invoice-${invoiceNumber}.pdf`
      const file     = new File([blob], filename, { type: 'application/pdf' })
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `Invoice ${invoiceNumber}`, text: 'Please find your invoice attached.' })
      } else {
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href = url; a.download = filename; a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') setPdfErr('Could not generate PDF — try again.')
    } finally {
      setPdfLoading(false)
    }
  }

  async function sendEmail() {
    if (!window.confirm(`Send invoice email to ${customerEmail}?`)) return
    setSending(true); setEmailErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}/send`, { method: 'POST' })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setEmailErr(d.emailError ?? d.error ?? 'Failed to send.')
      } else {
        setEmailDone(true)
      }
    } catch { setEmailErr('Network error.') }
    finally  { setSending(false) }
  }

  async function markPaid() {
    if (!window.confirm('Mark this invoice as paid? This cannot be undone.')) return
    setMarking(true)
    try { await fetch(`/api/admin/invoice/${invoiceId}/mark-paid`, { method: 'POST' }); setPaid(true) }
    catch { /* ignore */ } finally { setMarking(false) }
  }

  async function saveNotes() {
    setSavingNotes(true); setNotesErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}/note`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ notes }),
      })
      if (!res.ok) { setNotesErr('Failed to save.'); return }
      setSavedNotes(notes)
      setEditingNotes(false)
    } catch { setNotesErr('Network error.') }
    finally  { setSavingNotes(false) }
  }

  async function saveItemCount() {
    setSavingCount(true); setCountErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}/item-count`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ itemCount: itemCount !== '' ? Number(itemCount) : null }),
      })
      if (!res.ok) { setCountErr('Failed to save.'); return }
      setSavedCount(itemCount !== '' ? Number(itemCount) : undefined)
      setEditingCount(false)
    } catch { setCountErr('Network error.') }
    finally  { setSavingCount(false) }
  }

  async function deleteInvoice() {
    if (!window.confirm(`Delete invoice ${invoiceNumber}? This cannot be undone.`)) return
    setDeleting(true); setDeleteErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}`, { method: 'DELETE' })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setDeleteErr(d.error ?? 'Failed to delete. Try again.')
        return
      }
      router.push('/admin/invoices')
    } catch {
      setDeleteErr('Network error. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(invoiceUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">

      {/* Main actions */}
      <div className="border border-divider bg-white p-5 space-y-3">
        <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">Actions</p>

        <button onClick={handleSendPdf} disabled={pdfLoading}
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 font-sans text-[0.8125rem] font-medium tracking-widest uppercase hover:bg-[#1fad53] transition-colors disabled:opacity-60">
          {pdfLoading ? (
            <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Generating PDF…</>
          ) : (
            <>💬 Send Invoice PDF on WhatsApp{customerPhone ? <span className="font-normal opacity-70 text-[0.6875rem] normal-case tracking-normal">→ {customerPhone}</span> : null}</>
          )}
        </button>
        {pdfErr && <p className="font-sans text-[0.75rem] text-red-600">{pdfErr}</p>}

        <div className="flex gap-2">
          <a href={invoiceUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center border border-charcoal text-charcoal py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors">
            View Invoice
          </a>
          <button onClick={() => window.open(invoiceUrl, '_blank')}
            className="flex-1 text-center border border-charcoal text-charcoal py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors">
            Print / PDF
          </button>
          <button onClick={copyLink}
            className="flex-1 text-center border border-divider text-muted py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-colors">
            {copied ? 'Copied ✓' : 'Copy Link'}
          </button>
        </div>

        {customerEmail ? (
          emailDone ? (
            <p className="font-sans text-[0.8125rem] text-green-700 bg-green-50 border border-green-200 px-4 py-2.5">
              Email sent to {customerEmail} ✓
            </p>
          ) : (
            <button onClick={sendEmail} disabled={sending}
              className="w-full text-center border border-hunter text-hunter py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-hunter hover:text-parchment transition-colors disabled:opacity-50">
              {sending ? 'Sending…' : `Email Invoice → ${customerEmail}`}
            </button>
          )
        ) : (
          <p className="font-sans text-[0.75rem] text-muted border border-divider px-4 py-2.5 text-center">
            No email on file — share the link instead
          </p>
        )}
        {emailErr && (
          <details className="mt-1">
            <summary className="font-sans text-[0.75rem] text-red-600 cursor-pointer">Email failed — see why</summary>
            <p className="font-sans text-[0.75rem] text-red-700 mt-1 leading-relaxed">{emailErr}</p>
          </details>
        )}

        {paid ? (
          <p className="font-sans text-[0.875rem] text-green-800 bg-green-50 border border-green-200 px-4 py-3 text-center font-medium">
            Marked as Paid ✓
          </p>
        ) : (
          <button onClick={markPaid} disabled={marking}
            className="w-full bg-hunter text-parchment py-3 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-50">
            {marking ? 'Saving…' : 'Mark as Paid'}
          </button>
        )}
      </div>

      {/* Notes — editable even when paid */}
      <div className="border border-divider bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">
            Tailor&apos;s Note {paid && <span className="normal-case tracking-normal text-muted">(editable even when paid)</span>}
          </p>
          {!editingNotes && (
            <button onClick={() => { setNotes(savedNotes); setEditingNotes(true) }}
              className="font-sans text-[0.6875rem] uppercase tracking-widest text-hunter border border-hunter/40 px-3 py-1 hover:bg-hunter/5 transition-colors">
              {savedNotes ? 'Edit Note' : '+ Add Note'}
            </button>
          )}
        </div>

        {editingNotes ? (
          <div className="space-y-3">
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Applied a spot discount on the day. Extra stitching on lapel included at no charge."
              autoFocus
              className="w-full border border-divider px-3 py-2.5 font-sans text-[0.9rem] focus:outline-none focus:border-hunter resize-none bg-white"
            />
            {notesErr && <p className="font-sans text-[0.75rem] text-red-600">{notesErr}</p>}
            <div className="flex gap-2">
              <button onClick={saveNotes} disabled={savingNotes}
                className="bg-hunter text-parchment px-5 py-2 font-sans text-[0.6875rem] tracking-widest uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-50">
                {savingNotes ? 'Saving…' : 'Save Note'}
              </button>
              <button onClick={() => { setEditingNotes(false); setNotesErr('') }}
                className="border border-divider text-muted px-5 py-2 font-sans text-[0.6875rem] tracking-widest uppercase hover:border-charcoal transition-colors">
                Cancel
              </button>
              {savedNotes && (
                <button onClick={() => { setNotes(''); saveNotes() }}
                  className="text-red-500 px-3 py-2 font-sans text-[0.6875rem] tracking-widest uppercase hover:text-red-700 transition-colors">
                  Clear
                </button>
              )}
            </div>
          </div>
        ) : savedNotes ? (
          <p className="font-sans text-[0.875rem] text-muted italic leading-relaxed">&ldquo;{savedNotes}&rdquo;</p>
        ) : (
          <p className="font-sans text-[0.8125rem] text-muted/60">No note added yet.</p>
        )}
      </div>

      {/* Items to Collect */}
      <div className="border border-hunter/30 bg-hunter/5 p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-hunter">Items to Collect</p>
          {!editingCount && (
            <button onClick={() => { setItemCount(savedCount ?? ''); setEditingCount(true) }}
              className="font-sans text-[0.6875rem] uppercase tracking-widest text-hunter border border-hunter/40 px-3 py-1 hover:bg-hunter/10 transition-colors">
              {savedCount != null ? 'Edit' : '+ Set Count'}
            </button>
          )}
        </div>

        {editingCount ? (
          <div className="space-y-3">
            <input
              type="number" min="1" step="1"
              value={itemCount}
              onChange={e => setItemCount(e.target.value === '' ? '' : Number(e.target.value))}
              autoFocus
              className="w-28 border border-hunter/40 px-3 py-2 font-sans text-[1.125rem] font-medium text-center text-hunter focus:outline-none focus:border-hunter bg-white"
            />
            {countErr && <p className="font-sans text-[0.75rem] text-red-600">{countErr}</p>}
            <div className="flex gap-2">
              <button onClick={saveItemCount} disabled={savingCount}
                className="bg-hunter text-parchment px-5 py-2 font-sans text-[0.6875rem] tracking-widest uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-50">
                {savingCount ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => { setEditingCount(false); setCountErr('') }}
                className="border border-divider text-muted px-5 py-2 font-sans text-[0.6875rem] tracking-widest uppercase hover:border-charcoal transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : savedCount != null ? (
          <p className="font-playfair text-[2.5rem] text-hunter leading-none">{savedCount}
            <span className="font-sans text-[0.75rem] text-muted ml-2 normal-case tracking-normal">
              garment{savedCount !== 1 ? 's' : ''}
            </span>
          </p>
        ) : (
          <p className="font-sans text-[0.8125rem] text-muted/60">Not set — tap &lsquo;+ Set Count&rsquo; to add.</p>
        )}
      </div>

      {/* Delete */}
      <div className="pt-2 border-t border-divider space-y-1">
        <button
          onClick={deleteInvoice}
          disabled={deleting}
          className="font-sans text-[0.6875rem] text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors disabled:opacity-50"
        >
          {deleting ? 'Deleting…' : 'Delete this invoice'}
        </button>
        {deleteErr && (
          <p className="font-sans text-[0.75rem] text-red-600">{deleteErr}</p>
        )}
      </div>

    </div>
  )
}
