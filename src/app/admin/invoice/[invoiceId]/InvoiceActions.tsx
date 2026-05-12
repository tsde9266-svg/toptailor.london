'use client'
import { useState } from 'react'
import type { InvoiceStatus } from '@/lib/kv'

type Props = {
  invoiceId:     string
  invoiceUrl:    string
  waLink:        string
  status:        InvoiceStatus
  customerEmail: string
  customerPhone?: string
}

export default function InvoiceActions({ invoiceId, invoiceUrl, waLink, status, customerEmail, customerPhone }: Props) {
  const [sending,   setSending]   = useState(false)
  const [marking,   setMarking]   = useState(false)
  const [emailDone, setEmailDone] = useState(false)
  const [emailErr,  setEmailErr]  = useState('')
  const [paid,      setPaid]      = useState(status === 'paid')
  const [copied,    setCopied]    = useState(false)

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

      {/* WhatsApp — primary send action */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 font-sans text-[0.8125rem] font-medium tracking-widest uppercase hover:bg-[#1fad53] transition-colors"
      >
        💬 Send Invoice on WhatsApp
        {customerPhone && <span className="font-normal opacity-80 text-[0.6875rem] normal-case tracking-normal">→ {customerPhone}</span>}
      </a>

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
        <p className="font-sans text-[0.8125rem] text-green-700 bg-green-50 px-4 py-2.5 border border-green-200">
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
