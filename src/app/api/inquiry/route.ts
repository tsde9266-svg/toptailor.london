import { NextRequest, NextResponse } from 'next/server'
import { saveInquiry, logError } from '@/lib/kv'
import type { QuickInquiry } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { normaliseUkPhone } from '@/lib/greeting'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const name    = String(body.name    ?? '').trim()
  const phone   = String(body.phone   ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 422 })
  }

  const inquiry: QuickInquiry = {
    id:        crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    message:   message || undefined,
    status:    'new',
  }

  try {
    await saveInquiry(inquiry)
  } catch (e) {
    console.error('[inquiry] KV save failed — proceeding with notification', e)
    logError({ route: '/api/inquiry', method: 'POST', status: 500, message: 'KV save failed', detail: String(e) }).catch(() => {})
  }

  const waPhone = normaliseUkPhone(phone)
  const waLink  = `https://wa.me/${waPhone}`

  await notifyTelegram(
    `⚡ <b>Quick Inquiry</b>\n\n` +
    `👤 <b>Name:</b> ${escHtml(name)}\n` +
    `📞 <b>Phone:</b> ${escHtml(phone)}\n` +
    `💬 <b>Message:</b> ${message ? escHtml(message) : '—'}\n\n` +
    `📲 Reply within 5 minutes!`,
    [[
      { text: '💬 Open WhatsApp', url: waLink },
    ]],
  )

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
