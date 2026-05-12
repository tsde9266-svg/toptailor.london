import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getInvoice } from '@/lib/kv'
import { renderToBuffer } from '@react-pdf/renderer'
import { InvoicePDF } from '@/lib/invoice-pdf'
import React from 'react'

export async function GET(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const invoice = await getInvoice(params.invoiceId).catch(() => null)
  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  const buffer = await renderToBuffer(React.createElement(InvoicePDF, { invoice }))

  const filename = `Invoice-${invoice.number}-${invoice.customer.name.replace(/\s+/g, '-')}.pdf`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type':        'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length':      String(buffer.length),
      'Cache-Control':       'no-store',
    },
  })
}
