import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getInvoice, updateInvoice } from '@/lib/kv'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  invoice.notes = typeof body.notes === 'string' ? (body.notes.trim() || undefined) : invoice.notes

  try { await updateInvoice(invoice) } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
