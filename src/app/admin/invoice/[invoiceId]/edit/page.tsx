import Link from 'next/link'
import { Suspense } from 'react'
import { notFound, redirect } from 'next/navigation'
import { getInvoice } from '@/lib/kv'
import NewInvoiceForm from '../../new/NewInvoiceForm'

export default async function EditInvoicePage({ params }: { params: { invoiceId: string } }) {
  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch { /* storage down */ }
  if (!invoice) notFound()
  if (invoice.status === 'paid') redirect(`/admin/invoice/${params.invoiceId}`)

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href={`/admin/invoice/${params.invoiceId}`}
          className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Invoice
        </Link>
        <span className="font-playfair text-[1.0625rem]">Edit Invoice</span>
        <span className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/50">{invoice.number}</span>
      </div>

      <div className="px-4 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="font-playfair text-[1.75rem] mb-2">Edit Invoice</h1>
          <p className="font-sans text-[0.875rem] text-muted">
            Changes update the invoice immediately. The invoice number and creation date are locked.
          </p>
        </div>
        <Suspense fallback={null}>
          <NewInvoiceForm invoice={invoice} />
        </Suspense>
      </div>
    </div>
  )
}
