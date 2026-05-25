import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllInvoices, getAllOrders, getAllCalBookings,
  getAllDeliveries, getAllConsultations,
} from '@/lib/kv'

function decodeEmail(id: string) {
  try { return Buffer.from(id, 'base64url').toString('utf-8') } catch { return null }
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const STATUS_COLOR: Record<string, string> = {
  draft:              'bg-gray-100 text-gray-600',
  sent:               'bg-blue-100 text-blue-700',
  paid:               'bg-green-100 text-green-800',
  pending:            'bg-amber-100 text-amber-800',
  pending_collection: 'bg-amber-100 text-amber-800',
  complete:           'bg-gray-100 text-gray-500',
  delivered:          'bg-green-100 text-green-800',
}

export default async function CustomerProfilePage({ params }: { params: { id: string } }) {
  const email = decodeEmail(params.id)
  if (!email) notFound()

  const emailLower = email.toLowerCase()

  let invoices:      Awaited<ReturnType<typeof getAllInvoices>>      = []
  let orders:        Awaited<ReturnType<typeof getAllOrders>>        = []
  let bookings:      Awaited<ReturnType<typeof getAllCalBookings>>   = []
  let deliveries:    Awaited<ReturnType<typeof getAllDeliveries>>    = []
  let consultations: Awaited<ReturnType<typeof getAllConsultations>> = []

  try {
    ;[invoices, orders, bookings, deliveries, consultations] = await Promise.all([
      getAllInvoices(), getAllOrders(), getAllCalBookings(),
      getAllDeliveries(), getAllConsultations(),
    ])
  } catch { notFound() }

  const myInvoices      = invoices.filter(i => i.customer.email?.toLowerCase() === emailLower)
  const myOrders        = orders.filter(o => o.customer.email.toLowerCase() === emailLower)
  const myBookings      = bookings.filter(b => b.attendee.email.toLowerCase() === emailLower)
  const myConsultations = consultations.filter(c => c.email?.toLowerCase() === emailLower)

  // Find customer name from most recent record
  const allNames = [
    ...myInvoices.map(i => ({ name: i.customer.name, date: i.createdAt })),
    ...myOrders.map(o => ({ name: o.customer.name, date: o.createdAt })),
    ...myBookings.map(b => ({ name: b.attendee.name, date: b.createdAt })),
  ].sort((a, b) => b.date.localeCompare(a.date))
  const customerName = allNames[0]?.name ?? email

  const phone = (
    myInvoices.find(i => i.customer.phone)?.customer.phone ??
    myOrders.find(o => o.customer.phone)?.customer.phone ??
    myBookings.find(b => b.attendee.phone)?.attendee.phone
  )

  const address = myInvoices.find(i => i.customer.address)?.customer.address ??
    myOrders.find(o => o.customer.address)?.customer.address

  const totalSpent    = myInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
  const outstanding   = myInvoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.total, 0)

  // Delivery stops linked to customer orders
  const orderIds = new Set(myOrders.map(o => o.id))
  const myStops  = deliveries.flatMap(d => d.stops.filter(s => s.orderId && orderIds.has(s.orderId)).map(s => ({ ...s, deliveryDate: d.date })))

  if (myInvoices.length === 0 && myOrders.length === 0 && myBookings.length === 0 && myConsultations.length === 0) {
    notFound()
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-divider bg-white p-5">
      <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">{title}</p>
      {children}
    </div>
  )

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link href="/admin/customers" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Customers
        </Link>
        <span className="font-playfair text-[1.0625rem]">Customer Profile</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-playfair text-[1.75rem] text-charcoal">{customerName}</h1>
            <p className="font-sans text-[0.875rem] text-muted">{email}</p>
            {phone   && <p className="font-sans text-[0.875rem] text-muted">{phone}</p>}
            {address && <p className="font-sans text-[0.875rem] text-muted">{address}</p>}
          </div>
          {totalSpent > 0 && (
            <div className="text-right">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">Total Spent</p>
              <p className="font-playfair text-[2rem] text-hunter">£{totalSpent.toFixed(2)}</p>
              {outstanding > 0 && (
                <p className="font-sans text-[0.75rem] text-amber-700">£{outstanding.toFixed(2)} outstanding</p>
              )}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 flex-wrap">
          <Link href={`/admin/invoice/new`}
            className="font-sans text-[0.6875rem] uppercase tracking-widest px-4 py-2 bg-hunter text-parchment hover:bg-[#1E3D17] transition-colors">
            + New Invoice
          </Link>
          {phone && (
            <a href={`https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '44')}`} target="_blank" rel="noreferrer"
              className="font-sans text-[0.6875rem] uppercase tracking-widest px-4 py-2 bg-[#25D366] text-white hover:bg-[#1fad53] transition-colors">
              WhatsApp
            </a>
          )}
        </div>

        {/* Invoices */}
        {myInvoices.length > 0 && (
          <Section title={`Invoices (${myInvoices.length})`}>
            <div className="space-y-2">
              {myInvoices.map(inv => (
                <Link key={inv.id} href={`/admin/invoice/${inv.id}`}
                  className="flex items-center justify-between p-3 border border-divider hover:border-hunter transition-colors">
                  <div>
                    <span className="font-sans text-[0.6875rem] text-muted">{inv.number}</span>
                    <p className="font-sans text-[0.875rem] text-charcoal">{inv.items.map(i => i.name).join(', ')}</p>
                    <p className="font-sans text-[0.75rem] text-muted">{fmt(inv.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-playfair text-[1.125rem] text-hunter">£{inv.total.toFixed(2)}</p>
                    <span className={`font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 ${STATUS_COLOR[inv.status]}`}>
                      {inv.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Bookings */}
        {myBookings.length > 0 && (
          <Section title={`Bookings (${myBookings.length})`}>
            <div className="space-y-2">
              {myBookings.map(b => (
                <Link key={b.id} href={`/admin/bookings/${b.id}`}
                  className="flex items-center justify-between p-3 border border-divider hover:border-hunter transition-colors">
                  <div>
                    <p className="font-sans text-[0.875rem] text-charcoal">
                      {new Date(b.scheduledAt).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    {b.notes && <p className="font-sans text-[0.75rem] text-muted truncate max-w-xs">{b.notes}</p>}
                  </div>
                  <span className={`font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 ${STATUS_COLOR[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {b.status}
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Orders */}
        {myOrders.length > 0 && (
          <Section title={`Orders (${myOrders.length})`}>
            <div className="space-y-2">
              {myOrders.map(o => (
                <Link key={o.id} href={`/admin/order/${o.id}`}
                  className="flex items-center justify-between p-3 border border-divider hover:border-hunter transition-colors">
                  <div>
                    <p className="font-sans text-[0.875rem] text-charcoal">{o.estimate.length} item{o.estimate.length !== 1 ? 's' : ''}</p>
                    <p className="font-sans text-[0.75rem] text-muted">{fmt(o.createdAt)}</p>
                  </div>
                  <span className={`font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 ${STATUS_COLOR[o.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {o.status.replace(/_/g, ' ')}
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Consultations */}
        {myConsultations.length > 0 && (
          <Section title={`Phone Consultations (${myConsultations.length})`}>
            <div className="space-y-1">
              {myConsultations.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 border border-divider">
                  <p className="font-sans text-[0.875rem] text-charcoal">{fmt(c.createdAt)}</p>
                  <span className={`font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 ${STATUS_COLOR[c.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Delivery stops */}
        {myStops.length > 0 && (
          <Section title={`Deliveries (${myStops.length})`}>
            <div className="space-y-1">
              {myStops.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 border border-divider">
                  <div>
                    <p className="font-sans text-[0.875rem] text-charcoal">{s.items}</p>
                    <p className="font-sans text-[0.75rem] text-muted">{s.address} · {s.deliveryDate}</p>
                  </div>
                  <span className={`font-sans text-[0.5625rem] uppercase tracking-wider px-1.5 py-0.5 ${STATUS_COLOR[s.status]}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

      </div>
    </div>
  )
}
