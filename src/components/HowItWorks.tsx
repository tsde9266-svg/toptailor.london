'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Book a Visit',
    body: 'Select a time and place for a visit. The atelier comes to your home or office — bring nothing but your garments.',
    cta: true,
  },
  {
    num: '02',
    title: 'Fitting & Collection',
    body: 'Each garment is assessed personally — pinned, measured, and reviewed for the perfect archival fit.',
    cta: false,
  },
  {
    num: '03',
    title: 'Hand-Delivery',
    body: 'Within 7 days, your garments are returned, pressed and perfected, ready for your next occasion.',
    cta: false,
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-hunter text-parchment reveal-on-scroll"
    >
      {/* ══ DESKTOP — 3 columns side by side (≥ lg) ══════════ */}
      <div className="hidden lg:block px-24 py-24">
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-green-bright/70 block mb-16">
          THE PROCESS
        </span>
        <div className="grid grid-cols-3 gap-0 border-t border-parchment/20">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="
                relative pt-12 pr-16 pb-12
                border-r border-parchment/20 last:border-r-0
                reveal-on-scroll
              "
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Ghost number */}
              <span
                className="
                  absolute top-4 right-8
                  font-playfair text-[80px] leading-none
                  text-green-bright/20 select-none
                "
              >
                {step.num}
              </span>

              <h3 className="font-playfair text-[1.5rem] mb-4">{step.title}</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed opacity-80 mb-8 max-w-[240px]">
                {step.body}
              </p>

              {step.cta && (
                <a
                  href="#book"
                  className="
                    inline-block border border-parchment/60
                    px-8 py-4
                    font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                    text-parchment
                    hover:bg-parchment hover:text-hunter transition-colors duration-200
                  "
                >
                  SCHEDULE NOW
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ══ MOBILE — vertical stack (< lg) ════════════════════ */}
      <div className="lg:hidden py-24 px-8">
        <h2 className="font-playfair text-[2rem] mb-16 italic">The Process</h2>

        <div className="space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative pt-8 reveal-on-scroll"
              style={{
                borderTop: '0.5px solid #C4B99A',
                borderBottom: i === steps.length - 1 ? '0.5px solid #C4B99A' : undefined,
                paddingBottom: i === steps.length - 1 ? '2rem' : undefined,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Ghost number */}
              <span
                className="
                  absolute -top-6 right-0
                  font-playfair text-[80px] leading-none
                  text-green-bright/20 select-none
                "
              >
                {step.num}
              </span>

              <h3 className="font-playfair text-[1.5rem] mb-4">{step.title}</h3>
              <p className="font-sans text-[0.9375rem] opacity-80 leading-relaxed mb-8">
                {step.body}
              </p>

              {step.cta && (
                <a
                  href="#book"
                  className="
                    inline-block border border-parchment/60
                    py-4 px-8
                    font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                    hover:bg-parchment hover:text-hunter transition-colors duration-200
                  "
                >
                  SCHEDULE NOW
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
