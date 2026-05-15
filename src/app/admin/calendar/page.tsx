import { getAllCalBookings, getAllDeliveries, getAllCalEntries } from '@/lib/kv'
import CalendarClient from './CalendarClient'
import type { CalEvent } from './CalendarClient'
import Link from 'next/link'

function toLocalYMD(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
}
function toLocalHHMM(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London', hour12: false })
}

export default async function CalendarPage() {
  const [bookings, deliveries, entries] = await Promise.all([
    getAllCalBookings().catch(() => []),
    getAllDeliveries().catch(() => []),
    getAllCalEntries().catch(() => []),
  ])

  const events: CalEvent[] = []

  // Bookings
  for (const b of bookings) {
    if (b.status === 'cancelled') continue
    const slot = b.confirmedTime ?? null
    const start = slot ? slot.start : b.scheduledAt
    const end   = slot ? slot.end   : b.endTime
    events.push({
      id:        b.id,
      title:     b.attendee.name,
      subtitle:  b.location || undefined,
      date:      toLocalYMD(start),
      startTime: toLocalHHMM(start),
      endTime:   toLocalHHMM(end),
      type:      b.status === 'approved' ? 'booking' : 'booking_pending',
      href:      `/admin/bookings/${b.id}`,
    })
  }

  // Deliveries
  for (const d of deliveries) {
    const names = d.stops.map(s => s.name).join(', ')
    events.push({
      id:        d.id,
      title:     `Delivery · ${d.stops.length} stop${d.stops.length !== 1 ? 's' : ''}`,
      subtitle:  names,
      date:      d.date,
      startTime: d.time ?? undefined,
      endTime:   undefined,
      allDay:    !d.time,
      type:      'delivery',
      href:      `/admin/deliveries/${d.id}`,
    })
  }

  // Personal / work / blocked entries
  for (const e of entries) {
    events.push({
      id:        e.id,
      title:     e.title,
      subtitle:  e.notes ?? undefined,
      date:      e.date,
      startTime: e.startTime ?? undefined,
      endTime:   e.endTime   ?? undefined,
      allDay:    e.allDay    ?? !e.startTime,
      type:      e.type,
      entryId:   e.id,
    })
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-parchment">
      {/* Admin nav strip */}
      <div className="bg-hunter text-parchment flex-shrink-0">
        <div className="px-4 py-2 flex items-center gap-3 overflow-x-auto">
          <Link href="/admin" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/70 hover:text-parchment whitespace-nowrap flex-shrink-0">
            ← Admin
          </Link>
          <span className="text-parchment/20 flex-shrink-0">|</span>
          <span className="font-playfair text-[1rem] text-parchment flex-shrink-0">Calendar</span>
        </div>
      </div>

      <CalendarClient events={events} />
    </div>
  )
}
