'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type Step = {
  num: string
  label: string
  title: string
  body: string
  note?: string
  icon: React.ReactNode
}

const CalendarIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <rect x="3" y="4" width="18" height="17" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <circle cx="8" cy="14" r="0.8" fill="currentColor" />
    <circle cx="12" cy="14" r="0.8" fill="currentColor" />
    <circle cx="16" cy="14" r="0.8" fill="currentColor" />
  </svg>
)

const PinIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <path d="M5.5 4.5L19.5 18.5" />
    <path d="M5.5 4.5L9 8" />
    <path d="M14 14L9 19" />
    <circle cx="7.25" cy="6.25" r="1.75" />
    <path d="M15 19.5l-3.5-3.5" />
    <path d="M18.5 19l-3-3" />
  </svg>
)

const DeliveryIcon = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <path d="M3 7h13v10H3z" />
    <path d="M16 10h4l1 3v4h-5" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="18" cy="18" r="1.6" />
    <path d="M3 11h13" strokeDasharray="1 2" />
  </svg>
)

const steps: Step[] = [
  {
    num: '01',
    label: 'Book',
    title: 'Book a slot — from your sofa.',
    body:
      'Choose a pickup time that fits your schedule and book online from the comfort of your home. No calls, no chasing — pick the moment, we will come to you.',
    icon: CalendarIcon,
  },
  {
    num: '02',
    label: 'Pin & Quote',
    title: 'Our tailor arrives and pins.',
    body:
      'On the day, our tailor visits your door and pins each garment exactly the way you want it. You will then receive a clear estimate of pricing and a delivery date.',
    note: 'A rough estimate — sometimes a piece needs more work than first appears. We will always talk it through with you before lifting a needle.',
    icon: PinIcon,
  },
  {
    num: '03',
    label: 'Deliver',
    title: 'Delivered, ready to wear.',
    body:
      'Our tailor returns your clothing to your door, pressed and perfected. Payment is taken on delivery — only after you are happy with the work.',
    icon: DeliveryIcon,
  },
]

export default function ProcessInteractive() {
  const [active, setActive] = useState(0)
  const ref = useScrollReveal<HTMLElement>()
  const step = steps[active]

  return (
    <section
      ref={ref}
      className="px-8 lg:px-24 py-16 lg:py-24 reveal-on-scroll"
      aria-label="How our process works in three steps"
    >
      {/* ── Tabs row: 01 / 02 / 03 ────────────────────────────── */}
      <div className="grid grid-cols-3 gap-0 border-t border-divider">
        {steps.map((s, i) => {
          const isActive = i === active
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={`Show step ${s.num}: ${s.label}`}
              className={`
                group relative text-left
                pt-6 lg:pt-8 pb-6 lg:pb-8
                px-4 lg:px-8
                border-r border-divider last:border-r-0
                transition-colors duration-300
                ${isActive ? 'bg-hunter text-parchment' : 'bg-parchment text-charcoal hover:bg-hunter/[0.04]'}
              `}
            >
              <span
                className={`
                  font-sans text-[9px] font-medium uppercase tracking-[0.3em] block mb-3 lg:mb-4
                  ${isActive ? 'text-green-bright' : 'text-muted'}
                `}
              >
                Step {s.num}
              </span>
              <span
                className={`
                  font-playfair text-[2.25rem] lg:text-[3.5rem] leading-none block
                  ${isActive ? 'text-parchment' : 'text-charcoal/30 group-hover:text-charcoal/60'}
                  transition-colors duration-300
                `}
              >
                {s.num}
              </span>
              <span
                className={`
                  font-sans text-[0.75rem] lg:text-[0.8125rem] font-medium uppercase tracking-[0.2em] mt-3 lg:mt-4 block
                  ${isActive ? 'text-parchment' : 'text-charcoal'}
                `}
              >
                {s.label}
              </span>

              {/* Active underline accent */}
              <span
                className={`
                  absolute left-0 bottom-0 h-[2px] bg-green-bright transition-all duration-500
                  ${isActive ? 'w-full' : 'w-0'}
                `}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>

      {/* ── Detail panel ─────────────────────────────────────── */}
      <div
        key={step.num}
        className="
          mt-0 border-x border-b border-divider
          grid grid-cols-1 lg:grid-cols-[260px_1fr]
          animate-fade-in-up-16
        "
      >
        {/* Icon column */}
        <div className="flex items-center justify-center bg-sage/40 py-10 lg:py-0 lg:border-r lg:border-divider text-hunter">
          <div className="lg:py-16">{step.icon}</div>
        </div>

        {/* Body column */}
        <div className="p-8 lg:p-14">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted mb-3">
            {step.label}
          </p>
          <h2 className="font-playfair text-[1.75rem] lg:text-[2.25rem] leading-[1.15] font-medium mb-5 lg:mb-6 max-w-xl">
            {step.title}
          </h2>
          <p className="font-sans font-light text-[0.9375rem] lg:text-[1rem] text-muted leading-relaxed max-w-xl">
            {step.body}
          </p>

          {step.note && (
            <p className="mt-6 pl-4 border-l-2 border-divider font-sans font-light text-[0.8125rem] text-muted/90 leading-relaxed max-w-xl italic">
              <span className="text-hunter mr-1">*</span>
              {step.note}
            </p>
          )}

          {/* Step pager */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-divider gap-4">
            <button
              type="button"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="
                font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase
                text-muted hover:text-hunter disabled:opacity-30 disabled:hover:text-muted
                transition-colors
              "
            >
              ← Previous
            </button>

            {/* Dot indicator */}
            <div className="flex gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.num}
                  className={`
                    block h-[3px] transition-all duration-500
                    ${i === active ? 'w-8 bg-hunter' : 'w-3 bg-divider'}
                  `}
                />
              ))}
            </div>

            {active < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                className="
                  font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase
                  text-hunter hover:text-charcoal transition-colors
                "
              >
                Next step →
              </button>
            ) : (
              <Link
                href="/get-started"
                className="
                  font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase
                  text-hunter hover:text-charcoal transition-colors
                "
              >
                Book a slot →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
