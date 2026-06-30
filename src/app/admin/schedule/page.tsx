import Link from 'next/link'
import ScheduleView from './ScheduleView'

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment">
        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/admin" className="font-sans text-[0.6875rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors whitespace-nowrap">
            ← Admin
          </Link>
          <span className="font-playfair text-[1.125rem]">Schedule</span>
          <Link
            href="/admin/quick-book"
            className="font-sans text-[0.6875rem] uppercase tracking-widest bg-parchment text-hunter px-3 py-1.5 hover:bg-parchment/90 transition-colors whitespace-nowrap"
          >
            + Book
          </Link>
        </div>
      </div>
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <ScheduleView />
      </div>
    </div>
  )
}
