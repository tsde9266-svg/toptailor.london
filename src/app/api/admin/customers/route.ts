import { NextRequest, NextResponse } from 'next/server'
import { getAllInvoices } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'

export type CustomerRecord = {
  name:     string
  email:    string
  phone:    string
  address:  string
  lastSeen: string
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const invoices = await getAllInvoices()
    const map = new Map<string, CustomerRecord>()
    for (const inv of invoices) {
      const key = (inv.customer.email ?? inv.customer.name).toLowerCase().trim()
      if (!key) continue
      const existing = map.get(key)
      if (!existing || inv.createdAt > existing.lastSeen) {
        map.set(key, {
          name:     inv.customer.name    ?? '',
          email:    inv.customer.email   ?? '',
          phone:    inv.customer.phone   ?? '',
          address:  inv.customer.address ?? '',
          lastSeen: inv.createdAt,
        })
      } else {
        if (!existing.phone   && inv.customer.phone)   existing.phone   = inv.customer.phone
        if (!existing.address && inv.customer.address) existing.address = inv.customer.address
        if (!existing.email   && inv.customer.email)   existing.email   = inv.customer.email
      }
    }
    const customers = Array.from(map.values()).sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
    return NextResponse.json(customers)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
}
