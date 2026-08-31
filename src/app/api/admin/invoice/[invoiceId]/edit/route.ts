import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getInvoice, updateInvoice } from '@/lib/kv'
import type { Invoice, InvoiceItemGroup } from '@/lib/kv'
import { flattenItemGroups } from '@/lib/invoice-groups'

function validateItemGroups(groups: unknown): groups is InvoiceItemGroup[] {
  if (!Array.isArray(groups) || groups.length === 0) return false
  return (groups as Array<Record<string, unknown>>).every(g => {
    if (typeof g.garment !== 'string' || !g.garment.trim()) return false
    if (typeof g.qty !== 'number' || !Number.isInteger(g.qty) || g.qty <= 0) return false
    if (!Array.isArray(g.services) || g.services.length === 0) return false
    return (g.services as Array<Record<string, unknown>>).every(s =>
      typeof s.name === 'string' && s.name.trim() &&
      typeof s.priceEach === 'number' && Number.isFinite(s.priceEach) && s.priceEach >= 0 &&
      typeof s.appliesTo === 'number' && Number.isInteger(s.appliesTo) && s.appliesTo >= 1 && s.appliesTo <= (g.qty as number)
    )
  })
}

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

  if (!customer?.name || !validateItemGroups(body.itemGroups)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
  }
  if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return NextResponse.json({ error: 'Invalid customer email' }, { status: 422 })
  }

  const itemGroups = body.itemGroups as InvoiceItemGroup[]
  const items      = flattenItemGroups(itemGroups)

  const discountPercent   = body.discountPercent != null ? Number(body.discountPercent) : undefined
  const discountFlatInput = body.discountAmount  != null ? Number(body.discountAmount)  : undefined
  if (discountPercent !== undefined && (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100)) {
    return NextResponse.json({ error: 'Invalid discount percent' }, { status: 422 })
  }
  if (discountFlatInput !== undefined && (isNaN(discountFlatInput) || discountFlatInput < 0)) {
    return NextResponse.json({ error: 'Invalid discount amount' }, { status: 422 })
  }

  const subtotal       = items.reduce((s, i) => s + i.price, 0)
  const finalFlat       = discountFlatInput ? Math.min(discountFlatInput, subtotal) : undefined
  const finalPercent    = finalFlat !== undefined ? undefined : discountPercent
  const discountAmount  = finalFlat ?? (finalPercent ? Math.round(subtotal * finalPercent) / 100 : undefined)
  const total           = discountAmount  ? Math.max(0, subtotal - discountAmount) : subtotal

  invoice.customer       = customer
  invoice.items          = items
  invoice.itemGroups     = itemGroups
  invoice.subtotal       = subtotal
  invoice.total          = total
  invoice.discountPercent = finalPercent
  invoice.discountAmount  = discountAmount
  invoice.discountType    = (finalPercent || finalFlat) && !body.voucherId ? 'manual' : invoice.discountType
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
