import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getInvoice, deleteInvoice } from '@/lib/kv'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  try { await deleteInvoice(params.invoiceId) } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
