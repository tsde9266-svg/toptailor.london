import { NextRequest, NextResponse } from 'next/server'
import { saveBookVisit, logError } from '@/lib/kv'
import type { BookVisit } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  // Honeypot — bots fill this, humans don't see it
  if (body.website || body.url || body.company) {
    return NextResponse.json({ ok: true }) // silently discard
  }

  const name          = String(body.name          ?? '').trim()
  const phone         = String(body.phone         ?? '').trim()
  const email         = String(body.email         ?? '').trim()
  const address       = String(body.address       ?? '').trim()
  const preferredDate = String(body.preferredDate ?? '').trim()
  const preferredTime = String(body.preferredTime ?? '').trim()
  const notes         = String(body.notes         ?? '').trim()

  if (!name || !email || !address) {
    return NextResponse.json({ error: 'Name, email and address are required' }, { status: 422 })
  }

  const visit: BookVisit = {
    id:             crypto.randomUUID(),
    createdAt:      new Date().toISOString(),
    name,
    phone:          phone || undefined,
    email,
    address,
    preferredDate:  preferredDate || undefined,
    preferredTime:  preferredTime || undefined,
    notes:          notes         || undefined,
    status:         'new',
  }

  try {
    await saveBookVisit(visit)
  } catch (e) {
    console.error('[book-visit] KV save failed — proceeding with notification', e)
    logError({ route: '/api/book-visit', method: 'POST', status: 500, message: 'KV save failed', detail: String(e) }).catch(() => {})
  }

  const slotStr = [preferredDate, preferredTime].filter(Boolean).join(' · ') || 'Flexible'

  await notifyTelegram(
    `📅 <b>Book Visit Request</b>\n\n` +
    `👤 <b>Name:</b> ${escHtml(name)}\n` +
    `📞 <b>Phone:</b> ${phone ? escHtml(phone) : '—'}\n` +
    `📧 <b>Email:</b> ${escHtml(email)}\n` +
    `📍 <b>Address:</b> ${escHtml(address)}\n` +
    `🗓 <b>Slot:</b> ${escHtml(slotStr)}\n` +
    `💬 <b>Notes:</b> ${notes ? escHtml(notes) : '—'}`,
  )

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
