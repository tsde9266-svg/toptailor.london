import LogCallForm from './LogCallForm'
import Link        from 'next/link'

export default function LogCallPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/consultations" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Consultations
        </Link>
        <span className="font-playfair text-[1.0625rem]">Log a Call</span>
        <span />
      </div>
      <div className="px-4 lg:px-8 py-8 max-w-xl mx-auto">
        <p className="font-sans text-[0.875rem] text-muted mb-6">
          Use this form when a customer calls or messages directly (not through the website).
          The record will appear in the consultations list.
        </p>
        <LogCallForm />
      </div>
    </div>
  )
}
