import Link from 'next/link'
import { getAllSurveys } from '@/lib/kv'
import { BUSINESS } from '@/lib/constants'

const HEARD_LABEL: Record<string, string> = {
  google:    'Google Search',
  referral:  'Friend / Referral',
  instagram: 'Instagram',
  returning: 'Returning Customer',
  other:     'Other',
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? `https://${BUSINESS.email.split('@')[1]}`

function Stars({ value }: { value: number }) {
  return (
    <span className="text-hunter">
      {'★'.repeat(value)}{'☆'.repeat(5 - value)}
    </span>
  )
}

function avg(nums: number[]) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

export default async function SurveysPage() {
  let surveys: Awaited<ReturnType<typeof getAllSurveys>> = []
  let kvError = false
  try { surveys = await getAllSurveys() } catch { kvError = true }

  const avgEase    = avg(surveys.map(s => s.bookingEase))
  const avgQuality = avg(surveys.map(s => s.serviceQuality))

  const heardBreakdown = surveys.reduce((acc, s) => {
    acc[s.heardFrom] = (acc[s.heardFrom] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const surveyLink = `${BASE_URL}/survey`

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-4 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Dashboard
        </Link>
        <span className="font-playfair text-[1.0625rem]">Customer Surveys</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto space-y-6">

        <div className="flex items-end justify-between">
          <h1 className="font-playfair text-[1.75rem]">Survey Results</h1>
          <p className="font-sans text-[0.75rem] text-muted">{surveys.length} response{surveys.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Share link */}
        <div className="border border-divider bg-white p-5">
          <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">Share Survey Link</p>
          <p className="font-sans text-[0.8125rem] text-muted mb-3">
            Send this link to customers after a delivery or appointment.
          </p>
          <div className="flex items-center gap-2">
            <code className="font-mono text-[0.8125rem] bg-parchment border border-divider px-3 py-2 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {surveyLink}
            </code>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hi! We'd love your feedback on your recent visit to Fine Tailors. It only takes 30 seconds 🌟\n\n${surveyLink}`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white font-sans text-[0.6875rem] uppercase tracking-widest px-4 py-2 hover:bg-[#1fad53] transition-colors whitespace-nowrap flex-shrink-0"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        {kvError && (
          <p className="font-sans text-[0.875rem] text-muted text-center py-8">Could not connect to storage.</p>
        )}

        {!kvError && surveys.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-[0.875rem] text-muted mb-3">No survey responses yet.</p>
            <p className="font-sans text-[0.8125rem] text-muted">Share the link above to start collecting feedback.</p>
          </div>
        )}

        {!kvError && surveys.length > 0 && (
          <>
            {/* Averages */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-divider bg-white p-5 text-center">
                <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">Booking Ease</p>
                <p className="font-playfair text-[2.5rem] text-hunter leading-none mb-1">{avgEase.toFixed(1)}</p>
                <Stars value={Math.round(avgEase)} />
                <p className="font-sans text-[0.6875rem] text-muted mt-1">out of 5</p>
              </div>
              <div className="border border-divider bg-white p-5 text-center">
                <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-2">Service Quality</p>
                <p className="font-playfair text-[2.5rem] text-hunter leading-none mb-1">{avgQuality.toFixed(1)}</p>
                <Stars value={Math.round(avgQuality)} />
                <p className="font-sans text-[0.6875rem] text-muted mt-1">out of 5</p>
              </div>
            </div>

            {/* How they heard */}
            <div className="border border-divider bg-white p-5">
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-4">How They Found Us</p>
              <div className="space-y-2">
                {Object.entries(heardBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, count]) => {
                    const pct = surveys.length ? Math.round((count / surveys.length) * 100) : 0
                    return (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="font-sans text-[0.8125rem] text-charcoal">{HEARD_LABEL[key] ?? key}</span>
                          <span className="font-sans text-[0.75rem] text-muted">{count} ({pct}%)</span>
                        </div>
                        <div className="h-1.5 bg-parchment">
                          <div className="h-full bg-hunter/50" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Individual responses */}
            <div>
              <p className="font-sans text-[0.6875rem] uppercase tracking-widest text-muted mb-3">All Responses</p>
              <div className="space-y-3">
                {surveys.map(s => (
                  <div key={s.id} className="border border-divider bg-white p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-sans text-[0.875rem] text-charcoal font-medium">
                          {s.customerName ?? 'Anonymous'}
                        </p>
                        <p className="font-sans text-[0.75rem] text-muted">
                          {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {' · '}{HEARD_LABEL[s.heardFrom] ?? s.heardFrom}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 space-y-0.5">
                        <div className="font-sans text-[0.625rem] uppercase tracking-wider text-muted">Booking</div>
                        <Stars value={s.bookingEase} />
                        <div className="font-sans text-[0.625rem] uppercase tracking-wider text-muted">Quality</div>
                        <Stars value={s.serviceQuality} />
                      </div>
                    </div>
                    {s.comments && (
                      <p className="font-sans text-[0.875rem] text-muted italic border-l-2 border-hunter/20 pl-3 leading-relaxed">
                        &ldquo;{s.comments}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
