import { NextRequest, NextResponse } from 'next/server'
import { getVoucher } from '@/lib/kv'
import { sendMail } from '@/lib/mail'
import { BUSINESS } from '@/lib/constants'
import { isAdmin } from '@/lib/auth'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

export async function POST(req: NextRequest, { params }: { params: { voucherId: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const customerName  = String(body.customerName  ?? '').trim()
  const customerEmail = String(body.customerEmail ?? '').trim()
  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: 'Customer name and email required' }, { status: 422 })
  }

  let voucher
  try { voucher = await getVoucher(params.voucherId) } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!voucher) return NextResponse.json({ error: 'Voucher not found' }, { status: 404 })

  const isReturn = voucher.type === 'return_customer'
  const headline = isReturn
    ? `A loyalty reward from ${BUSINESS.name}`
    : `An exclusive offer from ${BUSINESS.name}`
  const intro = isReturn
    ? `Thank you for being a returning customer. As a token of our appreciation, we've prepared this exclusive loyalty voucher just for you.`
    : voucher.description
      ? voucher.description
      : `We'd love to have you as a customer. Here's an exclusive discount voucher just for you.`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0ede6;">

<div style="max-width:600px;margin:0 auto;background:#ffffff;font-family:Georgia,serif;">

  <!-- Header -->
  <div style="background:#2A5220;padding:36px 40px;text-align:center;">
    <p style="margin:0 0 6px;font-family:sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#a0d3a6;">Exclusive Voucher</p>
    <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#F5F0E8;letter-spacing:0.06em;text-transform:uppercase;">${BUSINESS.name}</p>
    <p style="margin:4px 0 0;font-family:sans-serif;font-size:11px;color:#a0d3a6;letter-spacing:0.1em;">London · Master Tailors</p>
  </div>

  <!-- Greeting -->
  <div style="padding:36px 40px 0;text-align:center;">
    <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;color:#1C1C1A;">Dear ${customerName},</p>
    <p style="margin:0;font-family:sans-serif;font-size:14px;color:#5C5C52;line-height:1.7;max-width:440px;margin:0 auto;">${intro}</p>
  </div>

  <!-- Voucher card -->
  <div style="margin:32px 40px;border:2px dashed #2A5220;background:#F9FAF4;">

    <!-- Top strip -->
    <div style="background:#2A5220;padding:10px 24px;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-family:sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#a0d3a6;">${voucher.name}</span>
      <span style="font-family:sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#a0d3a6;">Fine Tailors</span>
    </div>

    <!-- Discount display -->
    <div style="padding:36px 24px;text-align:center;">
      <p style="margin:0;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;">Your exclusive discount</p>
      <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:80px;font-weight:400;color:#2A5220;line-height:1;letter-spacing:-0.02em;">${voucher.discountPercent}%</p>
      <p style="margin:2px 0 0;font-family:sans-serif;font-size:15px;color:#5C5C52;letter-spacing:0.12em;text-transform:uppercase;">off your order</p>

      <!-- Divider -->
      <div style="margin:28px auto;width:60px;height:1px;background:#C4B99A;"></div>

      <!-- Code box -->
      <p style="margin:0 0 10px;font-family:sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Your voucher code</p>
      <div style="display:inline-block;background:#1C1C1A;padding:14px 36px;">
        <span style="font-family:'Courier New',monospace;font-size:22px;font-weight:700;color:#F5F0E8;letter-spacing:0.25em;">${voucher.code}</span>
      </div>
      <p style="margin:10px 0 0;font-family:sans-serif;font-size:11px;color:#888;">Enter this code when booking online</p>
    </div>

    <!-- Bottom strip -->
    <div style="background:#EAF0E2;padding:12px 24px;text-align:center;">
      <p style="margin:0;font-family:sans-serif;font-size:11px;color:#2A5220;letter-spacing:0.05em;">
        ${isReturn ? '🤍 Loyalty reward for returning customers' : '✨ Exclusive offer · Limited availability'}
      </p>
    </div>
  </div>

  <!-- CTA -->
  <div style="padding:0 40px 36px;text-align:center;">
    <p style="margin:0 0 20px;font-family:sans-serif;font-size:14px;color:#5C5C52;line-height:1.6;">
      Ready to use your voucher? Book your tailoring appointment online and enter the code at checkout.
    </p>
    <a href="${BASE_URL}/get-started"
       style="display:inline-block;background:#2A5220;color:#F5F0E8;text-decoration:none;padding:18px 48px;font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;">
      Book Online Now →
    </a>
  </div>

  <!-- Terms -->
  <div style="margin:0 40px;padding:20px 0;border-top:1px solid #E8E2D8;text-align:center;">
    <p style="margin:0;font-family:sans-serif;font-size:11px;color:#aaa;line-height:1.8;">
      This voucher is only applicable when making a booking online through the website.<br/>
      Cannot be combined with other offers or discounts. Subject to availability.<br/>
      One redemption per customer.
    </p>
  </div>

  <!-- Footer -->
  <div style="margin-top:24px;padding:20px 40px;background:#F5F0E8;text-align:center;">
    <p style="margin:0;font-family:sans-serif;font-size:12px;color:#888;">
      ${BUSINESS.name} · ${BUSINESS.city}<br/>
      <a href="${BASE_URL}" style="color:#2A5220;text-decoration:none;">${BASE_URL.replace('https://', '')}</a>
       ·
      <a href="mailto:${BUSINESS.email}" style="color:#2A5220;text-decoration:none;">${BUSINESS.email}</a>
    </p>
  </div>

</div>
</body>
</html>`

  try {
    await sendMail({
      to:      customerEmail,
      subject: `${voucher.discountPercent}% off your next tailoring order — ${BUSINESS.name}`,
      html,
      replyTo: BUSINESS.email,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: `Email failed: ${msg}` }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
