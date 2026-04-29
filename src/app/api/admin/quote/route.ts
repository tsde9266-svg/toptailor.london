import { NextRequest, NextResponse } from 'next/server'
import { getOrder, updateOrder } from '@/lib/kv'
import type { QuoteItem } from '@/lib/kv'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.oneclicktailors.co.uk'

// ─── Auth helper ──────────────────────────────────────────────────────────────
function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

// ─── Email via Resend ─────────────────────────────────────────────────────────
async function sendQuoteEmail(
  to: string, name: string, orderId: string, items: QuoteItem[], total: number, notes?: string
) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const rows = items.map(i =>
    `<tr><td style="padding:8px 0;font-family:Georgia,serif;font-size:15px;color:#2C2C2C;">${i.name}</td><td style="padding:8px 0;text-align:right;font-family:Georgia,serif;font-size:15px;color:#2A5220;font-weight:600;">£${i.price}</td></tr>`
  ).join('')

  const notesBlock = notes
    ? `<p style="font-family:sans-serif;font-size:13px;color:#666;border-left:3px solid #2A5220;padding-left:12px;margin:24px 0;font-style:italic;">${notes}</p>`
    : ''

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C;background:#F5F0E8;padding:40px 32px;">
      <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin-bottom:8px;">One Click Tailor</p>
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

  await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from:    'One Click Tailor <onboarding@resend.dev>',
      to:      [to],
      subject: `Your confirmed quote — One Click Tailor`,
      html,
    }),
  })
}

// ─── Telegram ─────────────────────────────────────────────────────────────────
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

  // Send email to customer
  try {
    await sendQuoteEmail(order.customer.email, order.customer.name, orderId, items, total, notes || undefined)
  } catch (e) {
    console.error('[quote] email failed', e)
  }

  // Notify tailor on Telegram
  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  await notifyTelegram(
    `📤 <b>Quote Sent</b> — ${order.customer.name}\n\n` +
    `💰 <b>Total:</b> £${total}\n` +
    `📧 <b>To:</b> ${order.customer.email}\n` +
    `⏱ <b>Sent:</b> ${ts}\n\n` +
    `Waiting for customer approval.`
  )

  return NextResponse.json({ ok: true })
}
