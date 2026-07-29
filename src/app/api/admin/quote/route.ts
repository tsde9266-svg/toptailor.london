import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/kv'
import type { QuoteItem } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { quoteWALink } from '@/lib/greeting'
import { sendMail } from '@/lib/mail'
import { BUSINESS } from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

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
  if (items.some(i => !Number.isFinite(i.price) || i.price < 0)) {
    return NextResponse.json({ error: 'Invalid item price' }, { status: 422 })
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

  order.quote  = { sentAt: now, items, total, notes: notes || undefined }
  order.status = 'quote_sent'

  try {
    await updateOrder(order)
  } catch {
    return NextResponse.json({ error: 'Failed to save quote' }, { status: 503 })
  }

  const waLink    = order.customer.phone
    ? quoteWALink(order.customer.phone, {
        name:  order.customer.name,
        items,
        total,
        notes: notes || undefined,
      })
    : null
  const quoteLink = `${BASE_URL}/quote/${order.id}`

  // Email is the compliant default delivery channel — WhatsApp may only be
  // used to reply inside a conversation the customer already started.
  let emailSent = true
  let emailError: string | undefined
  try {
    const rows = items.map(i =>
      `<tr><td style="padding:8px 0;font-family:Georgia,serif;font-size:15px;color:#2C2C2C;border-bottom:1px solid #E8E2D8;">${escHtml(i.name)}</td><td style="padding:8px 0;text-align:right;font-family:Georgia,serif;font-size:15px;color:#2A5220;font-weight:600;border-bottom:1px solid #E8E2D8;">£${i.price}</td></tr>`
    ).join('')
    await sendMail({
      to:      order.customer.email,
      subject: `Your quote is ready — ${BUSINESS.name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C;background:#ffffff;padding:48px 40px;">
          <p style="font-family:sans-serif;font-size:14px;color:#444;margin-bottom:24px;">
            Hi <strong style="color:#2C2C2C;">${escHtml(order.customer.name)}</strong>, here is your quote from ${BUSINESS.name}.
          </p>
          <table style="width:100%;border-collapse:collapse;border-top:2px solid #2A5220;margin-bottom:4px;">
            ${rows}
            <tr>
              <td style="padding:14px 0;font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;border-top:1px solid #D9D3C3;">Total</td>
              <td style="padding:14px 0;text-align:right;font-family:Georgia,serif;font-size:26px;color:#2C2C2C;border-top:1px solid #D9D3C3;">£${total}</td>
            </tr>
          </table>
          ${notes ? `<p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:20px;">${escHtml(notes)}</p>` : ''}
          <div style="margin-top:32px;text-align:center;">
            <a href="${quoteLink}" style="display:inline-block;background:#2A5220;color:#F5F0E8;text-decoration:none;padding:16px 40px;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">
              View &amp; Approve Quote →
            </a>
          </div>
          <p style="font-family:sans-serif;font-size:12px;color:#aaa;border-top:1px solid #E8E2D8;margin-top:40px;padding-top:20px;text-align:center;">
            Questions? Reply to this email.
          </p>
        </div>
      `,
      replyTo: BUSINESS.email,
    })
  } catch (e) {
    emailSent = false
    emailError = e instanceof Error ? e.message : String(e)
  }

  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  await notifyTelegram(
    `📤 <b>Quote Ready</b> — ${escHtml(order.customer.name)}\n\n` +
    `💰 <b>Total:</b> £${total}\n` +
    `📧 <b>Customer:</b> ${escHtml(order.customer.email)}\n` +
    `⏱ ${ts}\n\n` +
    (emailSent
      ? `Quote emailed to the customer. `
      : `⚠️ <b>Quote email failed to send</b> — share the link below manually.\n`) +
    `⚠️ <i>Only use the WhatsApp button below if this customer has already messaged you on WhatsApp — sending it cold risks another ban.</i>`,
    waLink ? [[{ text: '💬 WhatsApp (reply only)', url: waLink }]] : undefined,
  )

  return NextResponse.json({ ok: true, waLink, quoteLink, emailSent, emailError })
}
