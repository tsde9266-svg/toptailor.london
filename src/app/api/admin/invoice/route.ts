import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder, saveInvoice, nextInvoiceNumber } from '@/lib/kv'
import type { Invoice } from '@/lib/kv'
import { randomUUID } from 'crypto'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

async function notifyTelegram(text: string) {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  }).catch(() => {})
}

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
      paymentMethod: order.customer.paymentPreference === 'bank' ? 'bank' : 'cash',
    }

    // Link order → invoice
    try {
      order.invoiceId = id
      await updateOrder(order)
    } catch { /* non-fatal */ }

  // ── Manual creation ───────────────────────────────────────────────────────
  } else {
    const customer = body.customer as Invoice['customer']
    const items    = body.items as Invoice['items']
    const discount = body.discount ? Number(body.discount) : undefined
    const dueDate  = String(body.dueDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

    if (!customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 422 })
    }

    const subtotal = items.reduce((s, i) => s + i.price, 0)
    const total    = discount ? Math.max(0, subtotal - discount) : subtotal

    invoice = {
      id, number, status: 'draft', createdAt: now, dueDate,
      customer,
      items,
      discount,
      subtotal,
      total,
      notes:         body.notes ? String(body.notes) : undefined,
      paymentMethod: body.paymentMethod === 'bank' ? 'bank' : 'cash',
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
