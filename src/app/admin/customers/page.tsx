import Link from 'next/link'
import {
  getAllInvoices, getAllOrders, getAllCalBookings, getAllConsultations,
} from '@/lib/kv'

type CustomerRow = {
  id:          string  // base64 email
  email:       string
  name:        string
  phone?:      string
  totalSpent:  number
  invoiceCount: number
  lastSeen:    string
  tags:        string[]
}

function encodeId(email: string) {
  return Buffer.from(email.toLowerCase()).toString('base64url')
}

export default async function CustomersPage() {
  let invoices:      Awaited<ReturnType<typeof getAllInvoices>>      = []
  let orders:        Awaited<ReturnType<typeof getAllOrders>>        = []
  let bookings:      Awaited<ReturnType<typeof getAllCalBookings>>   = []
  let consultations: Awaited<ReturnType<typeof getAllConsultations>> = []
  let kvError = false

  try {
    ;[invoices, orders, bookings, consultations] = await Promise.all([
      getAllInvoices(), getAllOrders(), getAllCalBookings(), getAllConsultations(),
    ])
  } catch { kvError = true }

  // ── Aggregate by email ────────────────────────────────────────────────────
  const map = new Map<string, CustomerRow>()

  function upsert(email: string, name: string, phone?: string, date?: string) {
    const key = email.toLowerCase().trim()
    if (!key) return
    const existing = map.get(key)
    if (!existing) {
      map.set(key, {
        id: encodeId(key), email: key, name, phone,
        totalSpent: 0, invoiceCount: 0, lastSeen: date ?? new Date().toISOString(), tags: [],
      })
    } else {
      if (!existing.phone && phone) existing.phone = phone
      if (date && date > existing.lastSeen) existing.lastSeen = date
    }
  }

  orders.forEach(o       => upsert(o.customer.email, o.customer.name, o.customer.phone, o.createdAt))
  bookings.forEach(b     => upsert(b.attendee.email,  b.attendee.name, b.attendee.phone, b.createdAt))
  consultations.forEach(c => c.email && upsert(c.email, c.name, c.phone, c.createdAt))

  invoices.forEach(inv => {
    if (!inv.customer.email) return
    const key = inv.customer.email.toLowerCase().trim()
    upsert(inv.customer.email, inv.customer.name, inv.customer.phone, inv.createdAt)
    const row = map.get(key)
    if (!row) return
    row.invoiceCount++
    if (inv.status === 'paid') row.totalSpent += inv.total
    if (inv.createdAt > row.lastSeen) row.lastSeen = inv.createdAt
  })

  // Tags
  const emailInvoiceCounts = new Map<string, number>()
  invoices.forEach(inv => {
    if (!inv.customer.email) return
    const k = inv.customer.email.toLowerCase()
    emailInvoiceCounts.set(k, (emailInvoiceCounts.get(k) ?? 0) + 1)
  })
  map.forEach(row => {
    if ((emailInvoiceCounts.get(row.email) ?? 0) > 1) row.tags.push('returning')
    if (row.totalSpent > 200) row.tags.push('high value')
  })

  const customers = Array.from(map.values())
    .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())

  function fmt(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Dashboard
        </Link>
        <span className="font-playfair text-[1.0625rem]">Customers</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <h1 className="font-playfair text-[1.75rem]">All Customers</h1>
          <p className="font-sans text-[0.75rem] text-muted">{customers.length} total</p>
        </div>

        {kvError && (
          <p className="font-sans text-[0.875rem] text-muted text-center py-16">Could not connect to storage.</p>
        )}

        {!kvError && customers.length === 0 && (
          <p className="font-sans text-[0.875rem] text-muted text-center py-16">No customers yet.</p>
        )}

        {!kvError && customers.length > 0 && (
          <div className="space-y-2">
            {customers.map(c => (
              <Link key={c.id} href={`/admin/customers/${c.id}`}
                className="block border border-divider bg-white p-5 hover:border-hunter transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-playfair text-[1.0625rem] text-charcoal">{c.name}</p>
                    <p className="font-sans text-[0.8125rem] text-muted">{c.email}</p>
                    {c.phone && <p className="font-sans text-[0.75rem] text-muted">{c.phone}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    {c.totalSpent > 0 && (
                      <p className="font-playfair text-[1.25rem] text-hunter">£{c.totalSpent.toFixed(2)}</p>
                    )}
                    <p className="font-sans text-[0.6875rem] text-muted">{c.invoiceCount} invoice{c.invoiceCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  {c.tags.map(tag => (
                    <span key={tag} className={`font-sans text-[0.5625rem] uppercase tracking-wider px-2 py-0.5 ${
                      tag === 'returning' ? 'bg-amber-100 text-amber-800' : 'bg-hunter/10 text-hunter'
                    }`}>{tag}</span>
                  ))}
                  <span className="font-sans text-[0.6875rem] text-muted ml-auto">Last seen {fmt(c.lastSeen)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
