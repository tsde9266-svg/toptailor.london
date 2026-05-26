import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getInvoice, updateInvoice } from '@/lib/kv'
import type { Invoice } from '@/lib/kv'

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
  if (invoice.status === 'paid') return NextResponse.json({ error: 'Paid invoices cannot be edited' }, { status: 422 })

  const customer = body.customer as Invoice['customer']
  const items    = body.items    as Invoice['items']

  if (!customer?.name || !items?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }
  if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return NextResponse.json({ error: 'Invalid customer email' }, { status: 422 })
  }
  if (items.some((i) => !Number.isFinite(i.price) || i.price < 0)) {
    return NextResponse.json({ error: 'Invalid item price' }, { status: 422 })
  }

  const discountPercent = body.discountPercent != null ? Number(body.discountPercent) : undefined
  const subtotal        = items.reduce((s, i) => s + i.price, 0)
  const discountAmount  = discountPercent ? Math.round(subtotal * discountPercent) / 100 : undefined
  const total           = discountAmount  ? Math.max(0, subtotal - discountAmount) : subtotal

  invoice.customer       = customer
  invoice.items          = items
  invoice.subtotal       = subtotal
  invoice.total          = total
  invoice.discountPercent = discountPercent
  invoice.discountAmount  = discountAmount
  invoice.discountType    = discountPercent && !body.voucherId ? 'manual' : invoice.discountType
  invoice.notes           = body.notes ? String(body.notes) : undefined
  invoice.itemCount       = body.itemCount != null && Number.isInteger(Number(body.itemCount)) && Number(body.itemCount) > 0
                              ? Number(body.itemCount) : undefined
  invoice.paymentMethod   = (['cash', 'mobile'] as const).includes(body.paymentMethod as 'cash' | 'mobile')
    ? body.paymentMethod as 'cash' | 'mobile'
    : invoice.paymentMethod
  invoice.dueDate         = body.dueDate ? String(body.dueDate) : invoice.dueDate

  try { await updateInvoice(invoice) } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 503 })
  }

  return NextResponse.json({ ok: true, id: invoice.id })
}
