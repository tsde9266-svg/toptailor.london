import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { isAdmin } from '@/lib/auth'
import {
  saveWhatsAppBooking,
  getAllWhatsAppBookings,
  saveCalEntry,
  type WhatsAppBooking,
  type WhatsAppBookingService,
  type CalEntry,
} from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'

const VALID_SERVICES: WhatsAppBookingService[] = [
  'Suit & Jacket', 'Trousers', 'Dress/Skirt', 'Wedding', 'Leather', 'Mending', 'Other',
]

function formatDate(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function fmt12(time: string) {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, '0')}${suffix}`
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const bookings = await getAllWhatsAppBookings().catch(() => [])
  return NextResponse.json({ bookings })
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const name     = String(body.name     ?? '').trim()
  const phone    = String(body.phone    ?? '').trim()
  const address  = String(body.address  ?? '').trim()
  const postcode = String(body.postcode ?? '').trim()
  const date     = String(body.date     ?? '').trim()
  const start    = String(body.startTime ?? '').trim()
  const end      = String(body.endTime   ?? '').trim()
  const notes    = body.notes ? String(body.notes).trim() : undefined

  const rawServices = Array.isArray(body.services) ? body.services : []
  const services = rawServices.filter((s): s is WhatsAppBookingService =>
    VALID_SERVICES.includes(s as WhatsAppBookingService)
  )

  if (!name)     return NextResponse.json({ error: 'Name required' },     { status: 422 })
  if (!phone)    return NextResponse.json({ error: 'Phone required' },    { status: 422 })
  if (!address)  return NextResponse.json({ error: 'Address required' },  { status: 422 })
  if (!date)     return NextResponse.json({ error: 'Date required' },     { status: 422 })
  if (!start)    return NextResponse.json({ error: 'Start time required' }, { status: 422 })
  if (!end)      return NextResponse.json({ error: 'End time required' },   { status: 422 })
  if (!services.length) return NextResponse.json({ error: 'At least one service required' }, { status: 422 })

  // ── Create cal entry ──────────────────────────────────────────────────────
  const calEntry: CalEntry = {
    id:        randomUUID(),
    createdAt: new Date().toISOString(),
    title:     `${name} — ${services.join(', ')}`,
    date,
    startTime: start,
    endTime:   end,
    type:      'work',
    notes:     [address, postcode].filter(Boolean).join(', ') + (notes ? ` · ${notes}` : ''),
  }
  await saveCalEntry(calEntry)

  // ── Save booking ──────────────────────────────────────────────────────────
  const booking: WhatsAppBooking = {
    id:        randomUUID(),
    createdAt: new Date().toISOString(),
    status:    'upcoming',
    customer:  { name, phone, address, postcode },
    services,
    date,
    startTime: start,
    endTime:   end,
    notes,
    calEntryId: calEntry.id,
  }
  await saveWhatsAppBooking(booking)

  // ── Telegram notification ─────────────────────────────────────────────────
  const mapsUrl  = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([address, postcode].filter(Boolean).join(', '))}`
  const waPhone  = phone.replace(/\D/g, '')
  const waUrl    = `https://wa.me/${waPhone.startsWith('44') ? waPhone : '44' + waPhone.replace(/^0/, '')}`
  const fullAddr = escHtml([address, postcode].filter(Boolean).join(', '))

  const msg = [
    `🗓 <b>New Booking</b>`,
    ``,
    `<b>${escHtml(name)}</b>`,
    `📞 ${escHtml(phone)}`,
    `📍 ${fullAddr}`,
    `📅 ${escHtml(formatDate(date))} · ${fmt12(start)}–${fmt12(end)}`,
    `✂️ ${escHtml(services.join(', '))}`,
    notes ? `📝 ${escHtml(notes)}` : null,
  ].filter((s): s is string => s !== null).join('\n')

  await notifyTelegram(msg, [
    [
      { text: `💬 WhatsApp ${name.split(' ')[0]}`, url: waUrl },
      { text: '🗺 Google Maps', url: mapsUrl },
    ],
  ])

  return NextResponse.json({ ok: true, booking })
}
