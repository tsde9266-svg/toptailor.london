'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Data ────────────────────────────────────────────────────────────────────

const AREAS = [
  { name: 'Mayfair',        postcode: 'W1K · W1J' },
  { name: 'Chelsea',        postcode: 'SW3 · SW10' },
  { name: 'Belgravia',      postcode: 'SW1W · SW1X' },
  { name: 'Knightsbridge',  postcode: 'SW1X · SW7' },
  { name: 'Kensington',     postcode: 'W8 · W14' },
  { name: 'City of London', postcode: 'EC1 · EC2' },
]

const TICKER = [...AREAS, ...AREAS] // double for seamless loop

const JOURNEY = [
  {
    id: 'collect',
    label: 'Collection',
    time: 'Day 0',
    line1: 'We arrive',
    line2: 'at your door',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'tailor',
    label: 'Alteration',
    time: 'Days 1–6',
    line1: 'We perfect',
    line2: 'every stitch',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20" />
      </svg>
    ),
  },
  {
    id: 'deliver',
    label: 'Delivery',
    time: 'Day 5–7',
    line1: 'Returned,',
    line2: 'pressed perfect',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H7v10a2 2 0 002 2h6a2 2 0 002-2V10h3.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function TailorJourney() {
  const [areaIdx,    setAreaIdx]    = useState(0)
  const [phase,      setPhase]      = useState<'in' | 'out'>('in')
  const [visible,    setVisible]    = useState(false)
  const [pathPct,    setPathPct]    = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // ── Cycling location animation ────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setPhase('out')
      setTimeout(() => {
        setAreaIdx(i => (i + 1) % AREAS.length)
        setPhase('in')
      }, 320)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  // ── Scroll-triggered reveal ───────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          // Animate path filling over 1.6s
          const start = performance.now()
          const duration = 1600
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            setPathPct(t)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const area = AREAS[areaIdx]

  return (
    <>
      {/* ── Keyframes ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes pinPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(3);   opacity: 0;   }
          100% { transform: scale(3);   opacity: 0;   }
        }
        @keyframes locIn {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes locOut {
          0%   { opacity: 1; transform: translateY(0);     }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes tickerRoll {
          0%   { transform: translateX(0);    }
          100% { transform: translateX(-50%); }
        }
        @keyframes dotDrop {
          0%   { transform: translateY(-12px) scale(0.5); opacity: 0; }
          60%  { transform: translateY(2px)   scale(1.1); opacity: 1; }
          100% { transform: translateY(0)     scale(1);   opacity: 1; }
        }
        @keyframes shimmer {
          0%   { opacity: 0.15; }
          50%  { opacity: 0.35; }
          100% { opacity: 0.15; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="border-t border-divider bg-parchment overflow-hidden"
        aria-label="Fine Tailors covers central London — see how the journey works"
      >

        {/* ══ MAIN CONTENT GRID ═══════════════════════════════════════════════ */}
        <div className="px-8 lg:px-24 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* ── LEFT: Animated location card ──────────────────────────────── */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease',
              }}
            >
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-8">
                Mobile Tailoring · Central London
              </span>

              <h2 className="font-playfair text-[2.25rem] lg:text-[3rem] leading-[1.08] font-medium text-charcoal mb-5">
                Your tailor<br />
                <em className="italic text-hunter">travels to you.</em>
              </h2>

              <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed mb-10 max-w-sm">
                No commute, no waiting room, no dry cleaner queues. We collect
                your garments from your door and return them altered, pressed and perfect.
              </p>

              {/* ── Location card ─────────────────────────────────────────── */}
              <div className="relative border border-divider bg-white overflow-hidden">

                {/* Subtle dot-grid background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #2A5220 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0,
                    animation: 'shimmer 4s ease-in-out infinite',
                  }}
                  aria-hidden="true"
                />

                <div className="relative px-8 pt-8 pb-8 lg:px-10 lg:pt-10 lg:pb-10">

                  <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-muted mb-7">
                    Currently Serving
                  </p>

                  {/* Location pin + name ─────────────────────────────────── */}
                  <div className="flex items-center gap-4 mb-3">
                    {/* Pulsing dot */}
                    <div className="relative flex-shrink-0" aria-hidden="true">
                      <div className="w-3 h-3 bg-hunter rounded-full relative z-10" />
                      <div
                        className="absolute inset-0 bg-hunter rounded-full"
                        style={{ animation: 'pinPulse 2.2s ease-out infinite' }}
                      />
                    </div>

                    {/* Location name */}
                    <div className="h-[2.8rem] overflow-hidden flex items-center">
                      <span
                        key={`loc-${areaIdx}`}
                        className="font-playfair text-[2rem] lg:text-[2.5rem] leading-none text-charcoal block"
                        style={{
                          animation: phase === 'in'
                            ? 'locIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards'
                            : 'locOut 0.28s ease-in forwards',
                        }}
                      >
                        {area.name}
                      </span>
                    </div>
                  </div>

                  {/* Postcode ─────────────────────────────────────────────── */}
                  <p
                    key={`pc-${areaIdx}`}
                    className="font-sans text-[0.6875rem] tracking-[0.25em] uppercase text-muted ml-7 mb-8"
                    style={{
                      animation: 'locIn 0.4s 0.08s cubic-bezier(0.22,1,0.36,1) forwards',
                      opacity: 0,
                    }}
                  >
                    {area.postcode}
                  </p>

                  {/* Progress indicators ──────────────────────────────────── */}
                  <div className="flex gap-1.5 ml-7" aria-hidden="true">
                    {AREAS.map((_, i) => (
                      <span
                        key={i}
                        className="block h-[2px] transition-all duration-500"
                        style={{
                          width:      i === areaIdx ? '28px' : '8px',
                          background: i === areaIdx ? '#2A5220' : '#C4B99A',
                        }}
                      />
                    ))}
                  </div>

                  {/* Bottom strip ─────────────────────────────────────────── */}
                  <div className="mt-8 pt-6 border-t border-divider flex items-center justify-between">
                    <p className="font-sans text-[0.75rem] font-light text-muted">
                      No travel. No waiting. Just your tailor — at your door.
                    </p>
                    <div className="w-2 h-2 bg-hunter/40 rounded-full animate-pulse flex-shrink-0 ml-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Journey steps with connecting line ─────────────────── */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.8s 0.25s ease, transform 0.8s 0.25s ease',
              }}
            >
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted block mb-10 lg:mb-12">
                The Journey
              </span>

              <div className="relative">
                {/* Vertical connecting line */}
                <div
                  className="absolute left-[15px] top-[30px] w-[1px] bg-divider"
                  style={{
                    height: 'calc(100% - 80px)',
                    transformOrigin: 'top',
                    transform: `scaleY(${pathPct})`,
                    transition: 'none',
                  }}
                  aria-hidden="true"
                />

                {/* Travelling dot on the line */}
                {visible && (
                  <div
                    className="absolute left-[12px] w-[7px] h-[7px] bg-hunter rounded-full z-10"
                    style={{
                      top: `calc(30px + ${pathPct} * (100% - 110px))`,
                      transition: 'none',
                      boxShadow: '0 0 0 3px rgba(42,82,32,0.15)',
                    }}
                    aria-hidden="true"
                  />
                )}

                <div className="space-y-10">
                  {JOURNEY.map((step, i) => {
                    const delay = 0.2 + i * 0.22
                    return (
                      <div
                        key={step.id}
                        className="flex gap-6 items-start"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? 'translateY(0)' : 'translateY(16px)',
                          transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
                        }}
                      >
                        {/* Icon circle */}
                        <div
                          className="relative z-10 flex-shrink-0 w-8 h-8 border border-divider bg-parchment flex items-center justify-center text-hunter"
                          style={{
                            background: visible ? (i === 0 ? '#2A5220' : '#F5F0E8') : '#F5F0E8',
                            borderColor: visible ? '#2A5220' : '#C4B99A',
                            color: visible && i === 0 ? '#F5F0E8' : '#2A5220',
                            transition: `background 0.4s ${delay + 0.1}s ease, border-color 0.4s ${delay}s ease, color 0.4s ${delay + 0.1}s ease`,
                          }}
                        >
                          {step.icon}
                        </div>

                        {/* Text */}
                        <div className="pt-0.5">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted">
                              {step.label}
                            </p>
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-hunter/60 border border-hunter/20 px-1.5 py-0.5">
                              {step.time}
                            </span>
                          </div>
                          <h3 className="font-playfair text-[1.25rem] lg:text-[1.375rem] text-charcoal leading-snug">
                            {step.line1}<br className="hidden sm:block" />{' '}{step.line2}
                          </h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA */}
              <div
                className="mt-12 pt-10 border-t border-divider flex items-center gap-6 flex-wrap"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.6s 0.85s ease',
                }}
              >
                <Link
                  href="/get-started"
                  className="
                    inline-block bg-hunter text-parchment
                    px-8 py-4
                    font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
                    hover:bg-[#1E3D17] transition-colors duration-200
                  "
                >
                  Book a Collection →
                </Link>
                <Link
                  href="/get-started/call"
                  className="
                    font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase text-muted
                    hover:text-charcoal transition-colors
                  "
                >
                  Or speak to a tailor
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ══ JOURNEY PATH BAR ════════════════════════════════════════════════ */}
        <div className="border-t border-divider bg-sage/20 px-8 lg:px-24 py-10 lg:py-14">

          {/* SVG connecting path (desktop) */}
          <div className="hidden lg:block relative mb-8">
            <svg
              viewBox="0 0 900 4"
              className="w-full"
              fill="none"
              aria-hidden="true"
              style={{ overflow: 'visible' }}
            >
              <line
                x1="80" y1="2" x2="820" y2="2"
                stroke="#C4B99A"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              {/* Animated fill */}
              <line
                x1="80" y1="2" x2="820" y2="2"
                stroke="#2A5220"
                strokeWidth="1.5"
                strokeDasharray={740}
                strokeDashoffset={740 - (pathPct * 740)}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
            {JOURNEY.map((stop, i) => (
              <div
                key={stop.id}
                className={`
                  flex flex-col items-start lg:items-center lg:text-center px-0 lg:px-8
                  ${i < JOURNEY.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-divider pb-8 lg:pb-0' : ''}
                `}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.5s ${0.3 + i * 0.15}s ease, transform 0.5s ${0.3 + i * 0.15}s ease`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 border border-divider flex items-center justify-center mb-4"
                  style={{
                    background: i === 0 ? '#2A5220' : i === 2 ? '#EAF0E2' : '#F5F0E8',
                    borderColor: i === 0 ? '#2A5220' : '#C4B99A',
                    color: i === 0 ? '#F5F0E8' : '#2A5220',
                    animation: visible && i === 1 ? 'dotDrop 0.5s 0.6s cubic-bezier(0.22,1,0.36,1) both' : undefined,
                  }}
                >
                  {stop.icon}
                </div>

                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-muted mb-1">
                  {stop.time}
                </p>
                <p className="font-playfair text-[1.125rem] text-charcoal mb-1">
                  {stop.line1} {stop.line2}
                </p>
                <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-hunter">
                  {stop.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TICKER STRIP ════════════════════════════════════════════════════ */}
        <div
          className="border-t border-divider overflow-hidden py-4 bg-hunter"
          aria-hidden="true"
        >
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'tickerRoll 28s linear infinite' }}
          >
            {TICKER.map((a, i) => (
              <span key={i} className="flex items-center flex-shrink-0">
                <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.35em] text-parchment/60 px-8">
                  {a.name}
                </span>
                <span className="text-green-bright/40 text-[10px]">·</span>
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}
