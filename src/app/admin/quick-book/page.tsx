import Link from 'next/link'
import QuickBookForm from './QuickBookForm'

export default function QuickBookPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link href="/admin/schedule" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Schedule
        </Link>
        <span className="font-playfair text-[1.125rem]">Quick Book</span>
        <span />
      </div>
      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto">
        <QuickBookForm />
      </div>
    </div>
  )
}
