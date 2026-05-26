import { NextRequest, NextResponse } from 'next/server'
import { getInvoice, updateInvoice } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { invoiceId: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: { itemCount?: number | null }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  const count = body.itemCount
  invoice.itemCount = count != null && Number.isInteger(count) && count > 0 ? count : undefined

  try { await updateInvoice(invoice) } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
