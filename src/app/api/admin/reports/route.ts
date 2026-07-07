import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { sendMail, type MailAttachment } from '@/lib/mail'
import { toCsv, toBase64 } from '@/lib/csv'
import {
  getAllInvoices, getAllOrders, getAllCalBookings, getAllConsultations,
  getAllDeliveries, getAllVouchers, getAllSurveys, getAllInquiries,
  getAllBookVisits, getAllWhatsAppBookings, getAllCalEntries,
} from '@/lib/kv'

export type ReportType =
  | 'customers' | 'revenue' | 'outstanding' | 'services'
  | 'orders' | 'bookings' | 'summary' | 'backup'

const REPORT_LABEL: Record<ReportType, string> = {
  customers:   'Customer List',
  revenue:     'Revenue & Invoices Report',
  outstanding: 'Outstanding Invoices Report',
  services:    'Top Services Report',
  orders:      'Orders Report',
  bookings:    'Bookings & Schedule Report',
  summary:     'Monthly Business Summary',
  backup:      'Full Data Backup',
}

function fmt(n: number) { return n.toFixed(2) }
function todayStamp() { return new Date().toISOString().slice(0, 10) }
function csvAttachment(name: string, csv: string): MailAttachment {
  return { filename: `${name}-${todayStamp()}.csv`, content: toBase64(csv) }
}

// ── Shared: aggregate customers from every source, same logic as /api/admin/customers ──
type CustomerRow = {
  name: string; email: string; phone: string; address: string
  lastSeen: string; source: string; totalSpent: number; invoiceCount: number
}

async function buildCustomers(): Promise<CustomerRow[]> {
  const [invoices, orders, bookings, consultations] = await Promise.all([
    getAllInvoices(), getAllOrders(), getAllCalBookings(), getAllConsultations(),
  ])
  const map = new Map<string, CustomerRow>()

  function upsert(key: string, patch: Omit<CustomerRow, 'totalSpent' | 'invoiceCount'>) {
    const k = key.toLowerCase().trim()
    if (!k) return
    const existing = map.get(k)
    if (!existing) { map.set(k, { ...patch, totalSpent: 0, invoiceCount: 0 }); return }
    if (patch.lastSeen > existing.lastSeen) existing.lastSeen = patch.lastSeen
    if (!existing.phone   && patch.phone)   existing.phone   = patch.phone
    if (!existing.address && patch.address) existing.address = patch.address
  }

  orders.forEach(o => o.customer.email && upsert(o.customer.email, {
    name: o.customer.name, email: o.customer.email, phone: o.customer.phone ?? '',
    address: [o.customer.address, o.customer.postcode].filter(Boolean).join(', '),
    lastSeen: o.createdAt, source: 'order',
  }))
  bookings.forEach(b => b.attendee.email && upsert(b.attendee.email, {
    name: b.attendee.name, email: b.attendee.email, phone: b.attendee.phone ?? '',
    address: '', lastSeen: b.createdAt, source: 'booking',
  }))
  consultations.forEach(c => c.email && upsert(c.email, {
    name: c.name, email: c.email, phone: c.phone ?? '',
    address: '', lastSeen: c.createdAt, source: 'consultation',
  }))
  invoices.forEach(inv => {
    const key = inv.customer.email || inv.customer.name
    if (!key) return
    upsert(key, {
      name: inv.customer.name, email: inv.customer.email ?? '', phone: inv.customer.phone ?? '',
      address: inv.customer.address ?? '', lastSeen: inv.createdAt, source: 'invoice',
    })
    const row = map.get(key.toLowerCase().trim())
    if (!row) return
    row.invoiceCount++
    if (inv.status === 'paid') row.totalSpent += inv.total
  })

  return Array.from(map.values())
    .filter(c => c.name.trim())
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
}

async function reportCustomers(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const customers = await buildCustomers()
  const csv = toCsv(customers, [
    { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' }, { key: 'address', label: 'Address' },
    { key: 'totalSpent', label: 'Total Spent (£)' }, { key: 'invoiceCount', label: 'Invoices' },
    { key: 'lastSeen', label: 'Last Seen' }, { key: 'source', label: 'Last Source' },
  ])
  return {
    subject: `Customer List — ${customers.length} customers`,
    html: `<p>Attached: your full customer list (${customers.length} customers).</p>`,
    attachments: [csvAttachment('customers', csv)],
  }
}

async function reportRevenue(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const invoices = await getAllInvoices()
  const csv = toCsv(invoices.map(i => ({
    number: i.number, status: i.status, customer: i.customer.name, email: i.customer.email ?? '',
    subtotal: fmt(i.subtotal), discount: fmt(i.discountAmount ?? i.discount ?? 0), total: fmt(i.total),
    paymentMethod: i.paymentMethod, createdAt: i.createdAt.slice(0, 10), dueDate: i.dueDate.slice(0, 10),
    paidAt: i.paidAt?.slice(0, 10) ?? '',
  })), [
    { key: 'number', label: 'Invoice #' }, { key: 'status', label: 'Status' },
    { key: 'customer', label: 'Customer' }, { key: 'email', label: 'Email' },
    { key: 'subtotal', label: 'Subtotal (£)' }, { key: 'discount', label: 'Discount (£)' },
    { key: 'total', label: 'Total (£)' }, { key: 'paymentMethod', label: 'Payment Method' },
    { key: 'createdAt', label: 'Created' }, { key: 'dueDate', label: 'Due' }, { key: 'paidAt', label: 'Paid' },
  ])
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
  return {
    subject: `Revenue Report — £${fmt(totalRevenue)} paid, ${invoices.length} invoices`,
    html: `<p>Attached: all ${invoices.length} invoices. Total paid revenue: £${fmt(totalRevenue)}.</p>`,
    attachments: [csvAttachment('revenue-invoices', csv)],
  }
}

async function reportOutstanding(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const invoices = (await getAllInvoices()).filter(i => i.status !== 'paid')
  const csv = toCsv(invoices.map(i => ({
    number: i.number, status: i.status, customer: i.customer.name, phone: i.customer.phone ?? '',
    email: i.customer.email ?? '', total: fmt(i.total), dueDate: i.dueDate.slice(0, 10),
    daysOverdue: Math.max(0, Math.floor((Date.now() - new Date(i.dueDate).getTime()) / 86400000)),
  })), [
    { key: 'number', label: 'Invoice #' }, { key: 'status', label: 'Status' },
    { key: 'customer', label: 'Customer' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' },
    { key: 'total', label: 'Total (£)' }, { key: 'dueDate', label: 'Due' }, { key: 'daysOverdue', label: 'Days Overdue' },
  ])
  const totalOwed = invoices.reduce((s, i) => s + i.total, 0)
  return {
    subject: `Outstanding Invoices — £${fmt(totalOwed)} unpaid (${invoices.length})`,
    html: `<p>Attached: ${invoices.length} unpaid invoices, totalling £${fmt(totalOwed)}.</p>`,
    attachments: invoices.length ? [csvAttachment('outstanding-invoices', csv)] : [],
  }
}

async function reportServices(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const invoices = await getAllInvoices()
  const counts = new Map<string, { count: number; revenue: number }>()
  invoices.filter(i => i.status === 'paid').forEach(inv => {
    inv.items.forEach(item => {
      const key = item.name.replace(/^\d+×\s*/, '').split(' — ').pop()?.trim() ?? item.name
      const cur = counts.get(key) ?? { count: 0, revenue: 0 }
      counts.set(key, { count: cur.count + (item.qty ?? 1), revenue: cur.revenue + item.price })
    })
  })
  const rows = Array.from(counts.entries())
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .map(([name, { count, revenue }]) => ({ name, count, revenue: fmt(revenue) }))
  const csv = toCsv(rows, [
    { key: 'name', label: 'Service' }, { key: 'count', label: 'Units Sold' }, { key: 'revenue', label: 'Revenue (£)' },
  ])
  return {
    subject: `Top Services Report — ${rows.length} services`,
    html: `<p>Attached: service performance ranked by revenue.</p>`,
    attachments: rows.length ? [csvAttachment('top-services', csv)] : [],
  }
}

async function reportOrders(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const orders = await getAllOrders()
  const csv = toCsv(orders.map(o => ({
    customer: o.customer.name, phone: o.customer.phone ?? '', email: o.customer.email,
    address: o.customer.address, postcode: o.customer.postcode, status: o.status,
    estimateTotal: fmt(o.estimateTotal), quoteTotal: o.quote ? fmt(o.quote.total) : '',
    createdAt: o.createdAt.slice(0, 10),
  })), [
    { key: 'customer', label: 'Customer' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' }, { key: 'postcode', label: 'Postcode' }, { key: 'status', label: 'Status' },
    { key: 'estimateTotal', label: 'Estimate (£)' }, { key: 'quoteTotal', label: 'Quote (£)' }, { key: 'createdAt', label: 'Created' },
  ])
  return {
    subject: `Orders Report — ${orders.length} orders`,
    html: `<p>Attached: all ${orders.length} online booking-form orders.</p>`,
    attachments: [csvAttachment('orders', csv)],
  }
}

async function reportBookings(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const [waBookings, calEntries] = await Promise.all([getAllWhatsAppBookings(), getAllCalEntries()])
  const csv = toCsv(waBookings.map(b => ({
    customer: b.customer.name, phone: b.customer.phone, address: b.customer.address, postcode: b.customer.postcode,
    services: b.services.join('; '), date: b.date, startTime: b.startTime, endTime: b.endTime, status: b.status,
  })), [
    { key: 'customer', label: 'Customer' }, { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' }, { key: 'postcode', label: 'Postcode' },
    { key: 'services', label: 'Services' }, { key: 'date', label: 'Date' },
    { key: 'startTime', label: 'Start' }, { key: 'endTime', label: 'End' }, { key: 'status', label: 'Status' },
  ])
  const upcoming = waBookings.filter(b => b.status === 'upcoming').length
  return {
    subject: `Bookings Report — ${waBookings.length} bookings (${upcoming} upcoming)`,
    html: `<p>Attached: all ${waBookings.length} WhatsApp bookings — ${upcoming} upcoming. (${calEntries.length} calendar entries also on file, not included in this CSV.)</p>`,
    attachments: waBookings.length ? [csvAttachment('bookings', csv)] : [],
  }
}

async function reportSummary(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const [invoices, orders, waBookings, consultations, customers] = await Promise.all([
    getAllInvoices(), getAllOrders(), getAllWhatsAppBookings(), getAllConsultations(), buildCustomers(),
  ])
  const thisMonth = new Date().toISOString().slice(0, 7)
  const paid = invoices.filter(i => i.status === 'paid')
  const monthPaid = paid.filter(i => (i.paidAt ?? i.createdAt).slice(0, 7) === thisMonth)
  const monthRevenue = monthPaid.reduce((s, i) => s + i.total, 0)
  const outstanding = invoices.filter(i => i.status !== 'paid')
  const outstandingTotal = outstanding.reduce((s, i) => s + i.total, 0)
  const newCustomersThisMonth = customers.filter(c => c.lastSeen.slice(0, 7) === thisMonth).length
  const returningCustomers = customers.filter(c => c.invoiceCount > 1).length
  const upcomingBookings = waBookings.filter(b => b.status === 'upcoming').length
  const pendingConsultations = consultations.filter(c => c.status === 'pending_call').length

  const serviceCounts = new Map<string, number>()
  paid.forEach(inv => inv.items.forEach(item => {
    const key = item.name.replace(/^\d+×\s*/, '').split(' — ').pop()?.trim() ?? item.name
    serviceCounts.set(key, (serviceCounts.get(key) ?? 0) + item.price)
  }))
  const topServices = Array.from(serviceCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const monthLabel = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#555">${label}</td><td style="padding:6px 12px;font-weight:600">${value}</td></tr>`

  const html = `
    <h2 style="font-family:Georgia,serif">Business Summary — ${monthLabel}</h2>
    <table cellpadding="0" cellspacing="0">
      ${row('Revenue this month', `£${fmt(monthRevenue)}`)}
      ${row('Total lifetime revenue', `£${fmt(paid.reduce((s, i) => s + i.total, 0))}`)}
      ${row('Outstanding (unpaid)', `£${fmt(outstandingTotal)} across ${outstanding.length} invoice(s)`)}
      ${row('Total customers on file', String(customers.length))}
      ${row('New customers this month', String(newCustomersThisMonth))}
      ${row('Returning customers', String(returningCustomers))}
      ${row('Upcoming bookings', String(upcomingBookings))}
      ${row('Callbacks awaiting you', String(pendingConsultations))}
      ${row('Online orders on file', String(orders.length))}
    </table>
    <h3 style="font-family:Georgia,serif;margin-top:20px">Top Services (all time, by revenue)</h3>
    <table cellpadding="0" cellspacing="0">
      ${topServices.map(([name, revenue]) => row(name, `£${fmt(revenue)}`)).join('')}
    </table>
  `
  return { subject: `Monthly Business Summary — ${monthLabel}`, html, attachments: [] }
}

async function reportBackup(): Promise<{ subject: string; html: string; attachments: MailAttachment[] }> {
  const [
    invoices, orders, calBookings, consultations, deliveries,
    vouchers, surveys, inquiries, bookVisits, waBookings, customers,
  ] = await Promise.all([
    getAllInvoices(), getAllOrders(), getAllCalBookings(), getAllConsultations(), getAllDeliveries(),
    getAllVouchers(), getAllSurveys(), getAllInquiries(), getAllBookVisits(), getAllWhatsAppBookings(), buildCustomers(),
  ])

  const attachments: MailAttachment[] = []

  attachments.push(csvAttachment('backup-customers', toCsv(customers, [
    { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' }, { key: 'totalSpent', label: 'Total Spent (£)' },
    { key: 'invoiceCount', label: 'Invoices' }, { key: 'lastSeen', label: 'Last Seen' },
  ])))

  attachments.push(csvAttachment('backup-invoices', toCsv(invoices.map(i => ({
    number: i.number, status: i.status, customer: i.customer.name, email: i.customer.email ?? '',
    phone: i.customer.phone ?? '', total: fmt(i.total), createdAt: i.createdAt, dueDate: i.dueDate, paidAt: i.paidAt ?? '',
  })), [
    { key: 'number', label: 'Number' }, { key: 'status', label: 'Status' }, { key: 'customer', label: 'Customer' },
    { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'total', label: 'Total (£)' },
    { key: 'createdAt', label: 'Created' }, { key: 'dueDate', label: 'Due' }, { key: 'paidAt', label: 'Paid' },
  ])))

  attachments.push(csvAttachment('backup-orders', toCsv(orders.map(o => ({
    customer: o.customer.name, email: o.customer.email, phone: o.customer.phone ?? '',
    address: o.customer.address, postcode: o.customer.postcode, status: o.status,
    estimateTotal: fmt(o.estimateTotal), createdAt: o.createdAt,
  })), [
    { key: 'customer', label: 'Customer' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' }, { key: 'postcode', label: 'Postcode' }, { key: 'status', label: 'Status' },
    { key: 'estimateTotal', label: 'Estimate (£)' }, { key: 'createdAt', label: 'Created' },
  ])))

  attachments.push(csvAttachment('backup-whatsapp-bookings', toCsv(waBookings.map(b => ({
    customer: b.customer.name, phone: b.customer.phone, address: b.customer.address,
    services: b.services.join('; '), date: b.date, startTime: b.startTime, endTime: b.endTime, status: b.status,
  })), [
    { key: 'customer', label: 'Customer' }, { key: 'phone', label: 'Phone' }, { key: 'address', label: 'Address' },
    { key: 'services', label: 'Services' }, { key: 'date', label: 'Date' }, { key: 'startTime', label: 'Start' },
    { key: 'endTime', label: 'End' }, { key: 'status', label: 'Status' },
  ])))

  attachments.push(csvAttachment('backup-cal-bookings', toCsv(calBookings.map(b => ({
    name: b.attendee.name, email: b.attendee.email, phone: b.attendee.phone,
    status: b.status, scheduledAt: b.scheduledAt, createdAt: b.createdAt,
  })), [
    { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status' }, { key: 'scheduledAt', label: 'Scheduled' }, { key: 'createdAt', label: 'Created' },
  ])))

  attachments.push(csvAttachment('backup-consultations', toCsv(consultations.map(c => ({
    name: c.name, phone: c.phone, email: c.email ?? '', status: c.status, createdAt: c.createdAt,
  })), [
    { key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' }, { key: 'createdAt', label: 'Created' },
  ])))

  attachments.push(csvAttachment('backup-deliveries', toCsv(
    deliveries.flatMap(d => d.stops.map(s => ({
      date: d.date, name: s.name, phone: s.phone, address: s.address, items: s.items, status: s.status,
    }))),
    [
      { key: 'date', label: 'Date' }, { key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' }, { key: 'items', label: 'Items' }, { key: 'status', label: 'Status' },
    ]
  )))

  attachments.push(csvAttachment('backup-vouchers', toCsv(vouchers.map(v => ({
    code: v.code, name: v.name, discountPercent: v.discountPercent, type: v.type,
    isActive: v.isActive, usageCount: v.usageCount, createdAt: v.createdAt,
  })), [
    { key: 'code', label: 'Code' }, { key: 'name', label: 'Name' }, { key: 'discountPercent', label: 'Discount %' },
    { key: 'type', label: 'Type' }, { key: 'isActive', label: 'Active' }, { key: 'usageCount', label: 'Uses' },
    { key: 'createdAt', label: 'Created' },
  ])))

  attachments.push(csvAttachment('backup-surveys', toCsv(surveys.map(s => ({
    customerName: s.customerName ?? '', source: s.source, bookingEase: s.bookingEase,
    serviceQuality: s.serviceQuality, heardFrom: s.heardFrom, comments: s.comments ?? '', createdAt: s.createdAt,
  })), [
    { key: 'customerName', label: 'Customer' }, { key: 'source', label: 'Source' },
    { key: 'bookingEase', label: 'Booking Ease' }, { key: 'serviceQuality', label: 'Service Quality' },
    { key: 'heardFrom', label: 'Heard From' }, { key: 'comments', label: 'Comments' }, { key: 'createdAt', label: 'Created' },
  ])))

  attachments.push(csvAttachment('backup-inquiries', toCsv(
    [...inquiries.map(i => ({ name: i.name, phone: i.phone, message: i.message ?? '', status: i.status, createdAt: i.createdAt })),
     ...bookVisits.map(b => ({ name: b.name, phone: b.phone ?? '', message: `${b.address} — visit request`, status: b.status, createdAt: b.createdAt }))],
    [
      { key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'message', label: 'Message' },
      { key: 'status', label: 'Status' }, { key: 'createdAt', label: 'Created' },
    ]
  )))

  return {
    subject: `Full Data Backup — ${todayStamp()}`,
    html: `<p>Attached: a complete export of every record in the system as of ${todayStamp()} — ${attachments.length} files covering customers, invoices, orders, bookings, consultations, deliveries, vouchers, surveys and inquiries.</p>`,
    attachments,
  }
}

const BUILDERS: Record<ReportType, () => Promise<{ subject: string; html: string; attachments: MailAttachment[] }>> = {
  customers:   reportCustomers,
  revenue:     reportRevenue,
  outstanding: reportOutstanding,
  services:    reportServices,
  orders:      reportOrders,
  bookings:    reportBookings,
  summary:     reportSummary,
  backup:      reportBackup,
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: { type?: string; email?: string | string[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const { type, email } = body
  if (!type || !(type in BUILDERS)) return NextResponse.json({ error: 'Unknown report type' }, { status: 400 })
  const emails = (Array.isArray(email) ? email : email ? [email] : []).filter(Boolean)
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emails.length || !emails.every(e => EMAIL_RE.test(e))) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  try {
    const { subject, html, attachments } = await BUILDERS[type as ReportType]()
    await sendMail({ to: emails, subject: `[Fine Tailors] ${subject}`, html, attachments })
    return NextResponse.json({ ok: true, label: REPORT_LABEL[type as ReportType] })
  } catch (e) {
    console.error('[reports] failed', e)
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to send report' }, { status: 500 })
  }
}
