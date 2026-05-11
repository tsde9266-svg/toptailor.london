import { NextRequest, NextResponse } from 'next/server'
import { getInvoice, updateInvoice } from '@/lib/kv'

function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

export async function POST(req: NextRequest, { params }: { params: { invoiceId: string } }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  invoice.status = 'paid'
  invoice.paidAt = new Date().toISOString()

  try {
    await updateInvoice(invoice)
  } catch {
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
