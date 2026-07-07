import Link from 'next/link'
import { Suspense } from 'react'
import NewInvoiceForm from './NewInvoiceForm'

export default function NewInvoicePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/invoices" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Invoices
        </Link>
        <span className="font-playfair text-[1.0625rem]">New Invoice</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="font-playfair text-[1.75rem] mb-2">Create Invoice</h1>
          <p className="font-sans text-[0.875rem] text-muted">
            Enter customer details and services. A professional invoice will be generated instantly.
          </p>
        </div>
        <Suspense fallback={null}>
          <NewInvoiceForm />
        </Suspense>
      </div>
    </div>
  )
}
