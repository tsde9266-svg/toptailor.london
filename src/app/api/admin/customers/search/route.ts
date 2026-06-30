import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getAllOrders, getAllInvoices, getAllWhatsAppBookings } from '@/lib/kv'

function normalisePhone(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('44')) digits = digits.slice(2)
  if (digits.startsWith('0'))  digits = digits.slice(1)
  return digits
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const raw = req.nextUrl.searchParams.get('phone') ?? ''
  if (raw.trim().length < 5) return NextResponse.json({ customer: null })

  const needle = normalisePhone(raw.trim())

  const [orders, invoices, wabookings] = await Promise.all([
    getAllOrders().catch(() => []),
    getAllInvoices().catch(() => []),
    getAllWhatsAppBookings().catch(() => []),
  ])

  // Search WhatsApp bookings first (most complete customer data), newest first
  const reversed = wabookings.slice().reverse()
  for (const b of reversed) {
    if (normalisePhone(b.customer.phone) === needle) {
      // Collect services from newest → oldest, pick first occurrence of each (most recent wins)
      const allServices = reversed
        .filter(x => normalisePhone(x.customer.phone) === needle)
        .flatMap(x => x.services)
      const seen = new Set<string>()
      const uniqueServices = allServices.filter(s => seen.has(s) ? false : (seen.add(s), true)).slice(0, 3)
      return NextResponse.json({
        customer: {
          name:     b.customer.name,
          phone:    b.customer.phone,
          address:  b.customer.address,
          postcode: b.customer.postcode,
          lastServices: uniqueServices,
        },
      })
    }
  }

  // Search orders
  for (const o of orders) {
    if (o.customer.phone && normalisePhone(o.customer.phone) === needle) {
      return NextResponse.json({
        customer: {
          name:     o.customer.name,
          phone:    o.customer.phone ?? raw,
          address:  o.customer.address,
          postcode: o.customer.postcode,
          lastServices: [],
        },
      })
    }
  }

  // Search invoices
  for (const inv of invoices) {
    if (inv.customer.phone && normalisePhone(inv.customer.phone) === needle) {
      return NextResponse.json({
        customer: {
          name:     inv.customer.name,
          phone:    inv.customer.phone ?? raw,
          address:  inv.customer.address ?? '',
          postcode: '',
          lastServices: [],
        },
      })
    }
  }

  return NextResponse.json({ customer: null })
}
