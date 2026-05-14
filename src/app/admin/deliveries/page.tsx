import Link from 'next/link'
import { getAllDeliveries } from '@/lib/kv'
import DeliveriesClient from './DeliveriesClient'

export default async function DeliveriesPage() {
  const all        = await getAllDeliveries().catch(() => [])
  // Earliest date first (soonest delivery at the top)
  const deliveries = [...all].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Admin
        </Link>
        <span className="font-playfair text-[1.0625rem]">Deliveries</span>
        <Link
          href="/admin/deliveries/new"
          className="font-sans text-[0.75rem] uppercase tracking-widest bg-parchment text-hunter px-3 py-1.5 hover:bg-parchment/90 transition-colors"
        >
          + New
        </Link>
      </div>

      <DeliveriesClient deliveries={deliveries} />
    </div>
  )
}
