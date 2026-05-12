'use client'
import { useState } from 'react'
import type { InvoiceStatus } from '@/lib/kv'

type Props = {
  invoiceId:      string
  invoiceNumber:  string
  invoiceUrl:     string
  status:         InvoiceStatus
  customerEmail:  string
  customerPhone?: string
}

export default function InvoiceActions({
  invoiceId, invoiceNumber, invoiceUrl, status, customerEmail, customerPhone,
}: Props) {
  const [sending,    setSending]    = useState(false)
  const [marking,    setMarking]    = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [emailDone,  setEmailDone]  = useState(false)
  const [emailErr,   setEmailErr]   = useState('')
  const [paid,       setPaid]       = useState(status === 'paid')
  const [copied,     setCopied]     = useState(false)
  const [pdfErr,     setPdfErr]     = useState('')

  // ── Send PDF: download + share (Web Share API on mobile, download on desktop) ─
  async function handleSendPdf() {
    setPdfLoading(true)
    setPdfErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}/pdf`)
      if (!res.ok) throw new Error('Failed to generate PDF')
      const blob = await res.blob()
      const filename = `Invoice-${invoiceNumber}.pdf`
      const file = new File([blob], filename, { type: 'application/pdf' })

      // Web Share API with files only works reliably on mobile (iOS/Android).
      // Windows/macOS show a native share dialog that doesn't include WhatsApp,
      // so we fall back to a direct download on non-mobile platforms.
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      if (isMobile && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Invoice ${invoiceNumber}`,
          text:  'Please find your invoice attached.',
        })
      } else {
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href     = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      // navigator.share throws AbortError when user cancels — not a real error
      if (e instanceof Error && e.name !== 'AbortError') {
        setPdfErr('Could not generate PDF — try again.')
      }
    } finally {
      setPdfLoading(false)
    }
  }

  // ── Send email invoice ─────────────────────────────────────────────────────
  async function sendEmail() {
    if (!window.confirm(`Send invoice email to ${customerEmail}?`)) return
    setSending(true)
    setEmailErr('')
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}/send`, { method: 'POST' })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setEmailErr(d.emailError ?? d.error ?? 'Failed to send.')
      } else {
        setEmailDone(true)
      }
    } catch {
      setEmailErr('Network error.')
    } finally {
      setSending(false)
    }
  }

  // ── Mark paid ──────────────────────────────────────────────────────────────
  async function markPaid() {
    if (!window.confirm('Mark this invoice as paid? This cannot be undone.')) return
    setMarking(true)
    try {
      await fetch(`/api/admin/invoice/${invoiceId}/mark-paid`, { method: 'POST' })
      setPaid(true)
    } catch { /* ignore */ } finally {
      setMarking(false)
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(invoiceUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-divider bg-white p-5 space-y-3">
      <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">Actions</p>

      {/* Primary — Send PDF on WhatsApp */}
      <button
        onClick={handleSendPdf}
        disabled={pdfLoading}
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 font-sans text-[0.8125rem] font-medium tracking-widest uppercase hover:bg-[#1fad53] transition-colors disabled:opacity-60"
      >
        {pdfLoading ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            Generating PDF…
          </>
        ) : (
          <>💬 Send Invoice PDF on WhatsApp{customerPhone ? <span className="font-normal opacity-70 text-[0.6875rem] normal-case tracking-normal">→ {customerPhone}</span> : null}</>
        )}
      </button>
      {pdfErr && <p className="font-sans text-[0.75rem] text-red-600">{pdfErr}</p>}

      {/* Secondary actions */}
      <div className="flex gap-2">
        <a
          href={invoiceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center border border-charcoal text-charcoal py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors"
        >
          View Invoice
        </a>
        <button
          onClick={() => window.open(invoiceUrl, '_blank')}
          className="flex-1 text-center border border-charcoal text-charcoal py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors"
        >
          Print / PDF
        </button>
        <button
          onClick={copyLink}
          className="flex-1 text-center border border-divider text-muted py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:border-charcoal hover:text-charcoal transition-colors"
        >
          {copied ? 'Copied ✓' : 'Copy Link'}
        </button>
      </div>

      {/* Email */}
      {emailDone ? (
        <p className="font-sans text-[0.8125rem] text-green-700 bg-green-50 border border-green-200 px-4 py-2.5 border">
          Email sent to {customerEmail} ✓
        </p>
      ) : (
        <button
          onClick={sendEmail}
          disabled={sending}
          className="w-full text-center border border-hunter text-hunter py-2.5 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-hunter hover:text-parchment transition-colors disabled:opacity-50"
        >
          {sending ? 'Sending…' : `Email Invoice → ${customerEmail}`}
        </button>
      )}
      {emailErr && (
        <details className="mt-1">
          <summary className="font-sans text-[0.75rem] text-red-600 cursor-pointer">Email failed — see why</summary>
          <p className="font-sans text-[0.75rem] text-red-700 mt-1 leading-relaxed">{emailErr}</p>
        </details>
      )}

      {/* Mark paid */}
      {paid ? (
        <p className="font-sans text-[0.875rem] text-green-800 bg-green-50 border border-green-200 px-4 py-3 text-center font-medium">
          Marked as Paid ✓
        </p>
      ) : (
        <button
          onClick={markPaid}
          disabled={marking}
          className="w-full bg-hunter text-parchment py-3 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase hover:bg-[#1E3D17] transition-colors disabled:opacity-50"
        >
          {marking ? 'Saving…' : 'Mark as Paid'}
        </button>
      )}
    </div>
  )
}
