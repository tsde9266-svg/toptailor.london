import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder, saveInvoice, nextInvoiceNumber, getVoucher, updateVoucher } from '@/lib/kv'
import type { Invoice } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'
import { notifyTelegram } from '@/lib/telegram'
import { randomUUID } from 'crypto'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const number = await nextInvoiceNumber()
  const id     = randomUUID()
  const now    = new Date().toISOString()

  let invoice: Invoice

  // ── Generate from existing order ──────────────────────────────────────────
  if (body.orderId) {
    const orderId = String(body.orderId)
    let order
    try { order = await getOrder(orderId) } catch {
      return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
    }
    if (!order?.quote) {
      return NextResponse.json({ error: 'Order or approved quote not found' }, { status: 404 })
    }
    if (order.invoiceId) {
      return NextResponse.json({ error: 'Invoice already exists for this order', invoiceId: order.invoiceId }, { status: 409 })
    }

    const subtotal = order.quote.total
    const due = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    invoice = {
      id, number, status: 'draft', createdAt: now, dueDate: due,
      orderId,
      customer: {
        name:    order.customer.name,
        email:   order.customer.email,
        phone:   order.customer.phone,
        address: `${order.customer.address}, ${order.customer.postcode}`.trim(),
      },
      items:         order.quote.items,
      subtotal,
      total:         subtotal,
      notes:         order.quote.notes,
      paymentMethod: order.customer.paymentPreference === 'bank' ? 'bank' : 'cash' as 'bank' | 'cash' | 'mobile',
    }

    try {
      order.invoiceId = id
      await updateOrder(order)
    } catch (e) {
      console.error('[invoice] failed to link invoice to order', e)
    }

  // ── Manual creation ───────────────────────────────────────────────────────
  } else {
    const customer        = body.customer as Invoice['customer']
    const items           = body.items as Invoice['items']
    const dueDate         = String(body.dueDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    const discountPercent = body.discountPercent != null ? Number(body.discountPercent) : undefined
    const voucherId       = body.voucherId ? String(body.voucherId) : undefined

    if (!customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      return NextResponse.json({ error: 'Invalid customer email' }, { status: 422 })
    }
    if (items.some((i: { price: number }) => !Number.isFinite(i.price) || i.price < 0)) {
      return NextResponse.json({ error: 'Invalid item price' }, { status: 422 })
    }
    if (discountPercent !== undefined && (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100)) {
      return NextResponse.json({ error: 'Invalid discount percent' }, { status: 422 })
    }

    const subtotal = items.reduce((s: number, i: { price: number }) => s + i.price, 0)

    let finalDiscountPercent = discountPercent
    let voucherCode: string | undefined
    let voucherName: string | undefined
    let voucherType: import('@/lib/kv').VoucherType | undefined
    let discountType: 'voucher' | 'manual' | undefined

    if (voucherId) {
      let voucher
      try { voucher = await getVoucher(voucherId) } catch {
        return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
      }
      if (!voucher) {
        return NextResponse.json({ error: 'Voucher not found' }, { status: 422 })
      }
      if (voucher.isActive) {
        finalDiscountPercent = voucher.discountPercent
        voucherCode          = voucher.code
        voucherName          = voucher.name
        discountType         = 'voucher'
        voucherType          = voucher.type
        voucher.usageCount   = (voucher.usageCount ?? 0) + 1
        await updateVoucher(voucher).catch(() => {})
      }
    } else if (discountPercent) {
      discountType = 'manual'
    }

    const discountAmount = finalDiscountPercent
      ? Math.round(subtotal * finalDiscountPercent) / 100
      : undefined
    const total = discountAmount ? Math.max(0, subtotal - discountAmount) : subtotal

    invoice = {
      id, number, status: 'draft', createdAt: now, dueDate,
      customer,
      items,
      discountPercent:  finalDiscountPercent,
      discountAmount,
      discountType,
      voucherId,
      voucherCode,
      voucherName,
      voucherType,
      subtotal,
      total,
      notes:         body.notes ? String(body.notes) : undefined,
      paymentMethod: (['bank', 'cash', 'mobile'] as const).includes(body.paymentMethod as 'bank' | 'cash' | 'mobile')
        ? body.paymentMethod as 'bank' | 'cash' | 'mobile'
        : 'cash',
    }
  }

  try {
    await saveInvoice(invoice)
  } catch {
    return NextResponse.json({ error: 'Failed to save invoice' }, { status: 503 })
  }

  const invoiceLink = `${BASE_URL}/invoice/${id}`
  await notifyTelegram(`🧾 <b>Invoice Created</b> — ${invoice.number}\n👤 ${invoice.customer.name}\n💰 £${invoice.total}\n🔗 ${invoiceLink}`)

  return NextResponse.json({ ok: true, id, number, invoiceLink })
}
