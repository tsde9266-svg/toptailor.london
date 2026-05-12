import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/kv'
import type { QuoteItem } from '@/lib/kv'
import { sendMail } from '@/lib/mail'
import { isAdmin } from '@/lib/auth'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { quoteWALink } from '@/lib/greeting'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

// ─── Email via Resend ─────────────────────────────────────────────────────────
async function sendQuoteEmail(
  to: string, name: string, orderId: string, items: QuoteItem[], total: number, notes?: string
) {
  const rows = items.map(i =>
    `<tr><td style="padding:8px 0;font-family:Georgia,serif;font-size:15px;color:#2C2C2C;">${i.name}</td><td style="padding:8px 0;text-align:right;font-family:Georgia,serif;font-size:15px;color:#2A5220;font-weight:600;">£${i.price}</td></tr>`
  ).join('')

  const notesBlock = notes
    ? `<p style="font-family:sans-serif;font-size:13px;color:#666;border-left:3px solid #2A5220;padding-left:12px;margin:24px 0;font-style:italic;">${notes}</p>`
    : ''

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C;background:#F5F0E8;padding:40px 32px;">
      <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin-bottom:8px;">Fine Tailors</p>
      <h1 style="font-size:28px;font-weight:400;margin-bottom:8px;color:#2C2C2C;">Your Confirmed Quote</h1>
      <p style="font-family:sans-serif;font-size:14px;color:#666;margin-bottom:32px;">Hi ${name}, our tailor has inspected your garments and prepared your confirmed quote.</p>

      <table style="width:100%;border-collapse:collapse;border-top:1px solid #D9D3C3;border-bottom:1px solid #D9D3C3;margin-bottom:8px;">
        ${rows}
        <tr style="border-top:1px solid #D9D3C3;">
          <td style="padding:12px 0;font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Total</td>
          <td style="padding:12px 0;text-align:right;font-family:Georgia,serif;font-size:22px;color:#2C2C2C;">£${total}</td>
        </tr>
      </table>

      ${notesBlock}

      <p style="font-family:sans-serif;font-size:13px;color:#444;margin:24px 0 8px;">We haven't started work yet. Click below to review and approve:</p>
      <a href="${BASE_URL}/quote/${orderId}" style="display:inline-block;background:#2A5220;color:#F5F0E8;text-decoration:none;padding:14px 32px;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:32px;">
        Review &amp; Approve Quote →
      </a>

      <p style="font-family:sans-serif;font-size:12px;color:#888;border-top:1px solid #D9D3C3;padding-top:24px;">Once approved, we'll complete your alterations and return your garments within 5–7 working days. Questions? WhatsApp us.</p>
    </div>
  `

  await sendMail({
    to,
    subject: `Your confirmed quote — Fine Tailors`,
    html,
    replyTo: 'tsde9266@gmail.com',
  })
}

// ─── POST /api/admin/quote ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const orderId = String(body.orderId ?? '')
  const items   = (body.items ?? []) as QuoteItem[]
  const notes   = String(body.notes ?? '').trim()

  if (!orderId || !items.length) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 422 })
  }

  let order
  try {
    order = await getOrder(orderId)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const total = items.reduce((s, i) => s + i.price, 0)
  const now   = new Date().toISOString()

  order.quote = { sentAt: now, items, total, notes: notes || undefined }
  order.status = 'quote_sent'

  try {
    await updateOrder(order)
  } catch {
    return NextResponse.json({ error: 'Failed to save quote' }, { status: 503 })
  }

  // Email disabled — quotes are sent via WhatsApp only.
  // Re-enable once finetailors.co.uk domain is verified in Resend.
  // try { await sendQuoteEmail(...) } catch { ... }
  const emailSent: boolean = false
  const emailError: string | undefined = undefined

  // Build WhatsApp quote link (works whether email sent or not)
  const waLink = order.customer.phone
    ? quoteWALink(order.customer.phone, {
        name:  order.customer.name,
        items,
        total,
        notes: notes || undefined,
      })
    : null

  // Notify tailor on Telegram with inline WhatsApp button
  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  const tgText =
    (emailSent
      ? `📤 <b>Quote Sent</b> — ${escHtml(order.customer.name)}\n\n`
      : `⚠️ <b>Quote saved — EMAIL FAILED</b> — ${escHtml(order.customer.name)}\n\n`) +
    `💰 <b>Total:</b> £${total}\n` +
    `📧 <b>To:</b> ${escHtml(order.customer.email)}\n` +
    `⏱ <b>Sent:</b> ${ts}\n` +
    (emailSent
      ? `\nSend the quote breakdown via WhatsApp below.`
      : `\n<b>Email failed — send via WhatsApp instead.</b>\n<i>Reason:</i> ${escHtml(emailError ?? 'unknown')}`)

  const tgButtons = waLink
    ? [[{ text: '💬 Send Quote on WhatsApp', url: waLink }]]
    : undefined

  await notifyTelegram(tgText, tgButtons)

  const quoteLink = `${BASE_URL}/quote/${orderId}`
  return NextResponse.json({
    ok: true,
    emailSent,
    emailError,
    quoteLink,
    waLink,
  })
}
