'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InvoiceDeleteButton({ invoiceId, invoiceNumber }: { invoiceId: string; invoiceNumber: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm(`Delete invoice ${invoiceNumber}?`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/invoice/${invoiceId}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
    } catch { /* ignore */ } finally {
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      title="Delete invoice"
      className="shrink-0 w-7 h-7 flex items-center justify-center text-muted hover:text-red-500 transition-colors disabled:opacity-40"
      aria-label="Delete invoice"
    >
      {deleting ? (
        <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin inline-block" />
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      )}
    </button>
  )
}
