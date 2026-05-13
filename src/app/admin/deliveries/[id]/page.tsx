import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDelivery } from '@/lib/kv'
import DeliveryDetail from './DeliveryDetail'

function fmtDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function DeliveryDetailPage({ params }: { params: { id: string } }) {
  const delivery = await getDelivery(params.id).catch(() => null)
  if (!delivery) notFound()

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/deliveries" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Deliveries
        </Link>
        <span className="font-playfair text-[1.0625rem]">Delivery Run</span>
        <span className="w-20" />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">
            {delivery.stops.filter(s => s.status === 'delivered').length}/{delivery.stops.length} delivered
          </p>
          <h1 className="font-playfair text-[1.75rem] text-charcoal">{fmtDate(delivery.date)}</h1>
          {delivery.notes && (
            <p className="font-sans text-[0.875rem] text-muted mt-1">{delivery.notes}</p>
          )}
        </div>

        <DeliveryDetail delivery={delivery} />
      </div>
    </div>
  )
}
