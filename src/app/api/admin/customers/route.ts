import { NextRequest, NextResponse } from 'next/server'
import { getAllInvoices, getAllOrders, getAllCalBookings, getAllConsultations, getAllWhatsAppBookings } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'

export type CustomerRecord = {
  name:     string
  email:    string
  phone:    string
  address:  string
  lastSeen: string
  source:   'invoice' | 'order' | 'booking' | 'consultation' | 'whatsapp'
}

function upsert(
  map: Map<string, CustomerRecord>,
  key: string,
  record: CustomerRecord,
) {
  const existing = map.get(key)
  if (!existing) {
    map.set(key, record)
    return
  }
  // keep the most recent date
  if (record.lastSeen > existing.lastSeen) existing.lastSeen = record.lastSeen
  // fill in any missing fields from this record
  if (!existing.phone   && record.phone)   existing.phone   = record.phone
  if (!existing.email   && record.email)   existing.email   = record.email
  if (!existing.address && record.address) existing.address = record.address
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const [invoices, orders, bookings, consultations, waBookings] = await Promise.all([
      getAllInvoices(),
      getAllOrders(),
      getAllCalBookings(),
      getAllConsultations(),
      getAllWhatsAppBookings(),
    ])

    const map = new Map<string, CustomerRecord>()

    // ── Invoices ─────────────────────────────────────────────────────────────
    for (const inv of invoices) {
      const key = (inv.customer.email || inv.customer.name).toLowerCase().trim()
      if (!key) continue
      upsert(map, key, {
        name:     inv.customer.name    ?? '',
        email:    inv.customer.email   ?? '',
        phone:    inv.customer.phone   ?? '',
        address:  inv.customer.address ?? '',
        lastSeen: inv.createdAt,
        source:   'invoice',
      })
    }

    // ── Online orders (booking form) ──────────────────────────────────────────
    for (const ord of orders) {
      const key = (ord.customer.email || ord.customer.name).toLowerCase().trim()
      if (!key) continue
      upsert(map, key, {
        name:     ord.customer.name    ?? '',
        email:    ord.customer.email   ?? '',
        phone:    ord.customer.phone   ?? '',
        address:  [ord.customer.address, ord.customer.postcode].filter(Boolean).join(', '),
        lastSeen: ord.createdAt,
        source:   'order',
      })
    }

    // ── Cal.com bookings ──────────────────────────────────────────────────────
    for (const bk of bookings) {
      const key = (bk.attendee.email || bk.attendee.name).toLowerCase().trim()
      if (!key) continue
      upsert(map, key, {
        name:     bk.attendee.name  ?? '',
        email:    bk.attendee.email ?? '',
        phone:    bk.attendee.phone ?? '',
        address:  '',
        lastSeen: bk.createdAt,
        source:   'booking',
      })
    }

    // ── WhatsApp bookings (quick-book / schedule) ───────────────────────────────
    for (const wb of waBookings) {
      const key = wb.customer.name.toLowerCase().trim()
      if (!key) continue
      upsert(map, key, {
        name:     wb.customer.name ?? '',
        email:    '',
        phone:    wb.customer.phone ?? '',
        address:  [wb.customer.address, wb.customer.postcode].filter(Boolean).join(', '),
        lastSeen: wb.createdAt,
        source:   'whatsapp',
      })
    }

    // ── Phone consultations ───────────────────────────────────────────────────
    for (const con of consultations) {
      const key = (con.email || con.name).toLowerCase().trim()
      if (!key) continue
      upsert(map, key, {
        name:     con.name  ?? '',
        email:    con.email ?? '',
        phone:    con.phone ?? '',
        address:  '',
        lastSeen: con.createdAt,
        source:   'consultation',
      })
    }

    const customers = Array.from(map.values())
      .filter(c => c.name.trim())
      .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))

    return NextResponse.json(customers)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
}
