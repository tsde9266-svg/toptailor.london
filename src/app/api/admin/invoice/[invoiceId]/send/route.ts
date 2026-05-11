import { NextRequest, NextResponse } from 'next/server'
import { getInvoice, updateInvoice } from '@/lib/kv'
import { sendMail } from '@/lib/mail'
import { BUSINESS, BANK } from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
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

  const rows = invoice.items.map(i =>
    `<tr><td style="padding:10px 0;font-family:Georgia,serif;font-size:15px;color:#2C2C2C;border-bottom:1px solid #E8E2D8;">${i.name}</td><td style="padding:10px 0;text-align:right;font-family:Georgia,serif;font-size:15px;color:#2A5220;font-weight:600;border-bottom:1px solid #E8E2D8;">£${i.price}</td></tr>`
  ).join('')

  const discountRow = invoice.discount
    ? `<tr><td style="padding:8px 0;font-family:sans-serif;font-size:13px;color:#666;">Discount</td><td style="padding:8px 0;text-align:right;font-family:sans-serif;font-size:13px;color:#666;">−£${invoice.discount}</td></tr>`
    : ''

  const bankBlock = invoice.paymentMethod === 'bank' ? `
    <div style="background:#F5F0E8;padding:20px;margin-top:24px;">
      <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:12px;">Bank Transfer Details</p>
      <p style="font-family:sans-serif;font-size:13px;color:#444;margin-bottom:4px;">Name: <strong>${BANK.name}</strong></p>
      <p style="font-family:sans-serif;font-size:13px;color:#444;margin-bottom:4px;">Sort Code: <strong>${BANK.sortCode}</strong></p>
      <p style="font-family:sans-serif;font-size:13px;color:#444;margin-bottom:4px;">Account: <strong>${BANK.account}</strong></p>
      <p style="font-family:sans-serif;font-size:13px;color:#444;">Reference: <strong>${invoice.number}</strong></p>
    </div>` : `
    <p style="font-family:sans-serif;font-size:14px;color:#444;margin-top:24px;">Payment: <strong>Cash on collection / delivery</strong></p>`

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C;background:#ffffff;padding:48px 40px;">
      <table style="width:100%;margin-bottom:32px;">
        <tr>
          <td>
            <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:4px;">${BUSINESS.name}</p>
            <p style="font-family:sans-serif;font-size:11px;color:#aaa;">${BUSINESS.city}</p>
          </td>
          <td style="text-align:right;">
            <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:4px;">Invoice</p>
            <p style="font-family:Georgia,serif;font-size:18px;color:#2C2C2C;margin-bottom:2px;">${invoice.number}</p>
            <p style="font-family:sans-serif;font-size:12px;color:#888;">Due ${fmtDate(invoice.dueDate)}</p>
          </td>
        </tr>
      </table>

      <p style="font-family:sans-serif;font-size:14px;color:#444;margin-bottom:32px;">
        Hi <strong style="color:#2C2C2C;">${invoice.customer.name}</strong>, please find your invoice below.
      </p>

      <table style="width:100%;border-collapse:collapse;border-top:2px solid #2A5220;margin-bottom:4px;">
        ${rows}
        ${discountRow}
        <tr>
          <td style="padding:14px 0;font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;border-top:1px solid #D9D3C3;">Total Due</td>
          <td style="padding:14px 0;text-align:right;font-family:Georgia,serif;font-size:26px;color:#2C2C2C;border-top:1px solid #D9D3C3;">£${invoice.total}</td>
        </tr>
      </table>

      ${bankBlock}

      <div style="margin-top:32px;text-align:center;">
        <a href="${BASE_URL}/invoice/${invoice.id}" style="display:inline-block;background:#2A5220;color:#F5F0E8;text-decoration:none;padding:16px 40px;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">
          View Full Invoice →
        </a>
      </div>

      <p style="font-family:sans-serif;font-size:12px;color:#aaa;border-top:1px solid #E8E2D8;margin-top:40px;padding-top:20px;text-align:center;">
        Thank you for choosing ${BUSINESS.name} · Questions? Reply to this email.
      </p>
    </div>
  `

  let emailSent = true
  let emailError: string | undefined
  try {
    await sendMail({
      to:      invoice.customer.email,
      subject: `Your invoice — ${invoice.number} | ${BUSINESS.name}`,
      html,
    })
  } catch (e) {
    emailSent = false
    emailError = e instanceof Error ? e.message : String(e)
  }

  if (emailSent && invoice.status === 'draft') {
    invoice.status = 'sent'
    await updateInvoice(invoice).catch(() => {})
  }

  return NextResponse.json({ ok: true, emailSent, emailError })
}
