import Link from 'next/link'
import {
  getAllInvoices, getAllOrders, getAllCalBookings,
  getAllDeliveries, getAllConsultations,
} from '@/lib/kv'

function fmt(n: number) {
  return n.toFixed(2).replace(/\.00$/, '')
}

function monthLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

function thisMonthKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function isoToMonthKey(iso: string) {
  return iso.slice(0, 7)
}

export default async function DashboardPage() {
  let invoices:      Awaited<ReturnType<typeof getAllInvoices>>      = []
  let orders:        Awaited<ReturnType<typeof getAllOrders>>        = []
  let bookings:      Awaited<ReturnType<typeof getAllCalBookings>>   = []
  let deliveries:    Awaited<ReturnType<typeof getAllDeliveries>>    = []
  let consultations: Awaited<ReturnType<typeof getAllConsultations>> = []
  let kvError = false

  try {
    ;[invoices, orders, bookings, deliveries, consultations] = await Promise.all([
      getAllInvoices(), getAllOrders(), getAllCalBookings(),
      getAllDeliveries(), getAllConsultations(),
    ])
  } catch { kvError = true }

  // ── Revenue stats ──────────────────────────────────────────────────────────
  const paidInvoices  = invoices.filter(i => i.status === 'paid')
  const totalRevenue  = paidInvoices.reduce((s, i) => s + i.total, 0)
  const outstanding   = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0)
  const thisMonth     = thisMonthKey()
  const monthRevenue  = paidInvoices.filter(i => isoToMonthKey(i.paidAt ?? i.createdAt) === thisMonth)
    .reduce((s, i) => s + i.total, 0)
  const avgOrderValue = paidInvoices.length ? totalRevenue / paidInvoices.length : 0

  // ── Orders by status ───────────────────────────────────────────────────────
  const orderCounts = {
    pending_collection: orders.filter(o => o.status === 'pending_collection').length,
    quote_sent:         orders.filter(o => o.status === 'quote_sent').length,
    quote_approved:     orders.filter(o => o.status === 'quote_approved').length,
    complete:           orders.filter(o => o.status === 'complete').length,
  }

  // ── Unique customers ───────────────────────────────────────────────────────
  const emails = new Set<string>()
  invoices.forEach(i => i.customer.email && emails.add(i.customer.email.toLowerCase()))
  orders.forEach(o => o.customer.email && emails.add(o.customer.email.toLowerCase()))
  bookings.forEach(b => b.attendee.email && emails.add(b.attendee.email.toLowerCase()))
  const customerCount = emails.size

  // ── Revenue by month (last 6 months) ──────────────────────────────────────
  const monthMap = new Map<string, number>()
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    monthMap.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, 0)
  }
  paidInvoices.forEach(inv => {
    const k = isoToMonthKey(inv.paidAt ?? inv.createdAt)
    if (monthMap.has(k)) monthMap.set(k, (monthMap.get(k) ?? 0) + inv.total)
  })
  const monthData = Array.from(monthMap.entries()).map(([key, value]) => ({ key, value }))
  const maxMonthValue = Math.max(...monthData.map(m => m.value), 1)

  // ── Top services ──────────────────────────────────────────────────────────
  const serviceCounts = new Map<string, { count: number; revenue: number }>()
  paidInvoices.forEach(inv => {
    inv.items.forEach(item => {
      const key = item.name.replace(/^\d+×\s*/, '').split(' — ').pop()?.trim() ?? item.name
      const cur = serviceCounts.get(key) ?? { count: 0, revenue: 0 }
      serviceCounts.set(key, { count: cur.count + (item.qty ?? 1), revenue: cur.revenue + item.price })
    })
  })
  const topServices = Array.from(serviceCounts.entries())
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)

  // ── Recent activity ────────────────────────────────────────────────────────
  type Activity = { date: string; label: string; sub: string; href?: string }
  const activity: Activity[] = []
  invoices.slice(0, 5).forEach(i => activity.push({
    date: i.createdAt, label: `Invoice ${i.number}`, sub: `${i.customer.name} · £${fmt(i.total)}`,
    href: `/admin/invoice/${i.id}`,
  }))
  bookings.slice(0, 3).forEach(b => activity.push({
    date: b.createdAt, label: `Booking — ${b.attendee.name}`, sub: b.status,
    href: `/admin/bookings/${b.id}`,
  }))
  orders.slice(0, 3).forEach(o => activity.push({
    date: o.createdAt, label: `Order — ${o.customer.name}`, sub: o.status,
    href: `/admin/order/${o.id}`,
  }))
  activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const recentActivity = activity.slice(0, 10)

  const statCard = (label: string, value: string, sub?: string) => (
    <div className="border border-divider bg-white p-5">
      <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">{label}</p>
      <p className="font-playfair text-[2rem] text-charcoal leading-none mb-1">{value}</p>
      {sub && <p className="font-sans text-[0.75rem] text-muted">{sub}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Orders
        </Link>
        <span className="font-playfair text-[1.0625rem]">Dashboard</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-4xl mx-auto space-y-8">

        {kvError && (
          <div className="bg-amber-50 border border-amber-200 px-5 py-4">
            <p className="font-sans text-[0.875rem] text-amber-800">Could not connect to storage.</p>
          </div>
        )}

        <h1 className="font-playfair text-[1.75rem]">Business Overview</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCard('Total Revenue', `£${fmt(totalRevenue)}`, `${paidInvoices.length} paid invoices`)}
          {statCard('This Month', `£${fmt(monthRevenue)}`, monthLabel(new Date().toISOString()))}
          {statCard('Outstanding', `£${fmt(outstanding)}`, `${invoices.filter(i => i.status !== 'paid').length} unpaid`)}
          {statCard('Customers', String(customerCount), `avg £${fmt(avgOrderValue)} per invoice`)}
        </div>

        {/* System counts */}
        <div className="border border-divider bg-white p-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">System Overview</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            {[
              { label: 'Orders',         count: orders.length,        href: '/admin' },
              { label: 'Invoices',       count: invoices.length,      href: '/admin/invoices' },
              { label: 'Bookings',       count: bookings.length,      href: '/admin/bookings' },
              { label: 'Deliveries',     count: deliveries.length,    href: '/admin/deliveries' },
              { label: 'Consultations',  count: consultations.length, href: '/admin/consultations' },
            ].map(({ label, count, href }) => (
              <Link key={label} href={href} className="group">
                <p className="font-playfair text-[1.75rem] text-charcoal group-hover:text-hunter transition-colors">{count}</p>
                <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Revenue chart */}
          <div className="border border-divider bg-white p-5">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Revenue — Last 6 Months</p>
            <div className="flex items-end gap-1.5 h-32">
              {monthData.map(({ key, value }) => {
                const heightPct = maxMonthValue > 0 ? (value / maxMonthValue) * 100 : 0
                const label     = new Date(key + '-01').toLocaleDateString('en-GB', { month: 'short' })
                return (
                  <div key={key} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full relative flex items-end" style={{ height: '96px' }}>
                      <div
                        className={`w-full transition-all ${key === thisMonth ? 'bg-hunter' : 'bg-hunter/30'}`}
                        style={{ height: `${Math.max(heightPct, value > 0 ? 4 : 0)}%` }}
                        title={`£${fmt(value)}`}
                      />
                    </div>
                    <span className="font-sans text-[0.6rem] uppercase tracking-wider text-muted">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Orders breakdown */}
          <div className="border border-divider bg-white p-5">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Orders by Status</p>
            <div className="space-y-3">
              {[
                { label: 'Pending Collection', count: orderCounts.pending_collection, color: 'bg-amber-400' },
                { label: 'Quote Sent',         count: orderCounts.quote_sent,         color: 'bg-blue-400' },
                { label: 'Quote Approved',     count: orderCounts.quote_approved,     color: 'bg-green-400' },
                { label: 'Complete',           count: orderCounts.complete,           color: 'bg-gray-300' },
              ].map(({ label, count, color }) => {
                const pct = orders.length ? (count / orders.length) * 100 : 0
                return (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-sans text-[0.75rem] text-charcoal">{label}</span>
                      <span className="font-sans text-[0.75rem] text-muted">{count}</span>
                    </div>
                    <div className="h-1.5 bg-parchment rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top services */}
          {topServices.length > 0 && (
            <div className="border border-divider bg-white p-5">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Top Services (by revenue)</p>
              <div className="space-y-2">
                {topServices.map(([name, { count, revenue }]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="font-sans text-[0.8125rem] text-charcoal truncate mr-4">{name}</span>
                    <div className="text-right flex-shrink-0">
                      <span className="font-sans text-[0.875rem] text-hunter font-medium">£{fmt(revenue)}</span>
                      <span className="font-sans text-[0.6875rem] text-muted ml-2">×{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent activity */}
          <div className="border border-divider bg-white p-5">
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Recent Activity</p>
            {recentActivity.length === 0 ? (
              <p className="font-sans text-[0.8125rem] text-muted">No activity yet.</p>
            ) : (
              <div className="space-y-2.5">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {a.href ? (
                        <Link href={a.href} className="font-sans text-[0.8125rem] text-charcoal hover:text-hunter transition-colors truncate block">
                          {a.label}
                        </Link>
                      ) : (
                        <p className="font-sans text-[0.8125rem] text-charcoal truncate">{a.label}</p>
                      )}
                      <p className="font-sans text-[0.75rem] text-muted">{a.sub}</p>
                    </div>
                    <span className="font-sans text-[0.6875rem] text-muted flex-shrink-0">
                      {new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="border border-divider bg-white p-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Quick Actions</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/admin/invoice/new',  label: '+ New Invoice' },
              { href: '/admin/bookings',     label: 'Bookings' },
              { href: '/admin/customers',    label: 'Customers' },
              { href: '/admin/deliveries',   label: 'Deliveries' },
              { href: '/admin/vouchers',     label: 'Vouchers' },
              { href: '/admin/surveys',      label: 'Surveys' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="font-sans text-[0.6875rem] uppercase tracking-widest px-4 py-2 border border-divider text-muted hover:border-hunter hover:text-charcoal transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
