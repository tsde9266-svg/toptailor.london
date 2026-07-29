import Link from 'next/link'
import { getConsultation } from '@/lib/kv'
import { customerFollowUpLink, normaliseUkPhone } from '@/lib/greeting'
import ConsultationActions from './ConsultationActions'

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long',
    year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/London',
  })
}

export default async function ConsultationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  let c = null
  let kvError = false
  try {
    c = await getConsultation(params.id)
  } catch {
    kvError = true
  }

  if (kvError) {
    return (
      <div className="min-h-screen bg-parchment px-6 py-16 text-center">
        <p className="font-sans text-muted">Could not load consultation.</p>
        <Link href="/admin/consultations" className="font-sans text-hunter underline mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  if (!c) {
    return (
      <div className="min-h-screen bg-parchment px-6 py-16 text-center">
        <p className="font-sans text-muted">Consultation not found.</p>
        <Link href="/admin/consultations" className="font-sans text-hunter underline mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  const waChat = `https://wa.me/${normaliseUkPhone(c.phone)}`
  // Nudges the CUSTOMER to message first — texting them a link is fine (SMS,
  // not WhatsApp); it's the only compliant way to "start" the WhatsApp thread
  // when we're the ones following up. Never message the customer's WhatsApp
  // number directly first — see greeting.ts for why.
  const waLink   = customerFollowUpLink('phone consultation request', c.name)
  const smsBody  = `Hi ${c.name}, thanks for your consultation request with Fine Tailors! You can message us anytime on WhatsApp: ${waLink}`
  const smsNudge = `sms:+${normaliseUkPhone(c.phone)}?body=${encodeURIComponent(smsBody)}`

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between">
        <Link href="/admin/consultations" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Consultations
        </Link>
        <span className="font-playfair text-[1.0625rem]">Consultation</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-1">
              Ref #{c.id.slice(0, 8).toUpperCase()}
            </p>
            <p className="font-sans text-[0.8125rem] text-muted">{fmtDate(c.createdAt)}</p>
          </div>
          <span className={`font-sans text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
            c.status === 'pending_call' ? 'bg-amber-100 text-amber-800' :
            c.status === 'called'       ? 'bg-blue-100 text-blue-800'   :
                                          'bg-gray-100 text-gray-600'
          }`}>
            {c.status.replace('_', ' ')}
          </span>
        </div>

        {/* Customer card */}
        <div className="border border-divider p-5 mb-6 bg-white">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">Customer</p>
          <div className="space-y-2 mb-4">
            {[
              ['Name',     c.name],
              ['Phone',    c.phone],
              ['Email',    c.email     ?? '—'],
              ['Best time', [c.day, c.time].filter(Boolean).join(', ') || '—'],
              ['Prefers',  c.commsPref ? (c.commsPref === 'whatsapp' ? 'WhatsApp' : 'Email') : '—'],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4">
                <span className="font-sans text-[0.8125rem] text-muted w-20 flex-shrink-0">{label}</span>
                <span className="font-sans text-[0.9rem] text-charcoal break-all">{val}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-divider">
            <a
              href={smsNudge}
              className="text-center bg-[#25D366] text-white py-3 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-[#1fad53] transition-colors"
            >
              Text WhatsApp Link
            </a>
            <a
              href={waChat}
              target="_blank" rel="noopener noreferrer"
              title="Only reply here if they've already messaged you — don't send the first message"
              className="text-center border border-charcoal text-charcoal py-3 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors"
            >
              Open Chat
            </a>
            <a
              href={`tel:${c.phone}`}
              className="text-center border border-charcoal text-charcoal py-3 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors"
            >
              Call
            </a>
            {c.email && (
              <a
                href={`mailto:${c.email}`}
                className="text-center border border-charcoal text-charcoal py-3 font-sans text-[0.6875rem] font-medium tracking-widest uppercase hover:bg-charcoal hover:text-parchment transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </div>

        {/* Status & notes editor (client component) */}
        <ConsultationActions consultation={c} />
      </div>
    </div>
  )
}
