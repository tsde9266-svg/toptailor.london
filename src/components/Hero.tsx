'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Covered postcode prefixes ────────────────────────────────────────────────
const COVERED = [
  'W1A','W1B','W1C','W1D','W1F','W1G','W1H','W1J','W1K','W1S','W1T','W1U','W1W','W1',
  'SW1A','SW1E','SW1H','SW1P','SW1V','SW1W','SW1X','SW1Y','SW1',
  'SW3','SW5','SW6','SW7','SW10',
  'W2','W8','W11',
  'N1',
  'WC1A','WC1B','WC1E','WC1H','WC1N','WC1R','WC1V','WC1X','WC1',
  'WC2A','WC2B','WC2E','WC2H','WC2N','WC2R','WC2',
  'EC1A','EC1M','EC1N','EC1R','EC1V','EC1Y','EC1',
  'EC2A','EC2M','EC2N','EC2R','EC2V','EC2Y','EC2',
  'EC3A','EC3M','EC3N','EC3R','EC3V','EC3',
  'EC4A','EC4M','EC4N','EC4R','EC4V','EC4Y','EC4',
  'E1','E2','E14',
]

function isCovered(raw: string): boolean {
  const clean   = raw.trim().toUpperCase().replace(/\s+/g, '')
  const outward = clean.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/)?.[1] ?? clean.slice(0, 4)
  return COVERED.some(c => outward === c || outward.startsWith(c))
}

const TICKER_AREAS = [
  'Mayfair','Chelsea','Knightsbridge','Belgravia','Kensington','Westminster',
  'Marylebone','Notting Hill','Canary Wharf','City of London','Islington',
  'Shoreditch','Covent Garden','Fitzrovia','Bloomsbury','Paddington','Pimlico',
  'South Kensington','Fulham','Clerkenwell','Soho',
]

// ─── Rotating attention phrases ───────────────────────────────────────────────
const PHRASES = [
  'Have clothes that don\'t quite fit?',
  'Suit jacket sleeves too long?',
  'Going shopping? Get it fitted right.',
  'Jeans too long? Sorted in days.',
  'That dress you never wear? We\'ll fix it.',
  'Wardrobe full of things that don\'t fit?',
  'Buying a suit? Book a tailor first.',
  'Alterations, collected from your door.',
]

// ─── Trust badges shown below headline ────────────────────────────────────────
const TRUST = [
  { icon: '🛡️', text: 'Fully insured' },
  { icon: '🪡',  text: 'One tailor, start to finish' },
  { icon: '📦', text: '5–7 day return' },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Rotating phrase animation
  const [phraseIdx,   setPhraseIdx]   = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseVisible(false)
      setTimeout(() => {
        setPhraseIdx(i => (i + 1) % PHRASES.length)
        setPhraseVisible(true)
      }, 500)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  // Postcode checker
  const [postcode,  setPostcode]  = useState('')
  const [checking,  setChecking]  = useState(false)
  const [coverage,  setCoverage]  = useState<'covered' | 'uncovered' | null>(null)

  // Mini lead form (shown after covered result)
  const [leadName,  setLeadName]  = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [sending,   setSending]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const play = () => v.play().catch(() => {})
    play()
    document.addEventListener('touchstart', play, { once: true })
    return () => document.removeEventListener('touchstart', play)
  }, [])

  function handleCheck() {
    if (!postcode.trim()) return
    setChecking(true)
    setCoverage(null)
    setSent(false)
    setTimeout(() => {
      setCoverage(isCovered(postcode) ? 'covered' : 'uncovered')
      setChecking(false)
    }, 900)
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setFormError('')
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch('/api/inquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:    leadName,
          phone:   leadPhone,
          message: `Postcode ${postcode.toUpperCase()} confirmed covered — ready to book.`,
        }),
        signal: controller.signal,
      })
      clearTimeout(t)
      if (!res.ok) throw new Error('failed')
      setSent(true)
    } catch {
      clearTimeout(t)
      setFormError('Something went wrong — please try again.')
    } finally {
      setSending(false)
    }
  }

  const tickerLoop = [...TICKER_AREAS, ...TICKER_AREAS]

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '100svh' }}
    >

      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          poster="/images/tailor.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
        >
          <source src="/video/craft.mp4" type="video/mp4" />
        </video>
        {/* Heavy dark overlay for premium dark look */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,8,0.60) 0%, rgba(10,10,8,0.82) 45%, rgba(10,10,8,0.97) 100%)',
          }}
        />
      </div>

      {/* ── Main content — centred single column ── */}
      <div
        id="hero-cta"
        className="relative z-10 flex-1 flex flex-col items-center justify-start sm:justify-center px-5 pt-16 sm:pt-20 pb-8 sm:pb-12 w-full"
        style={{ maxWidth: '460px', margin: '0 auto' }}
      >

        {/* ① Rotating attention phrase */}
        <div className="mb-3 sm:mb-6 text-center" style={{ minHeight: '24px' }}>
          <p
            className="font-playfair italic text-parchment/80 transition-opacity duration-500"
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.25rem)',
              opacity: phraseVisible ? 1 : 0,
            }}
          >
            {PHRASES[phraseIdx]}
          </p>
        </div>

        {/* Star rating + social proof */}
        <div className="mb-3 sm:mb-5 text-center">
          <div className="mb-1.5" style={{ color: '#c9a84c', fontSize: '20px', letterSpacing: '4px' }}>
            ★★★★★
          </div>
          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-parchment/65">
            Rated 5.0 · 100+ Central London clients
          </p>
        </div>

        {/* ② Headline */}
        <h1 className="text-center mb-2 sm:mb-4">
          <span
            className="block font-playfair font-medium text-parchment leading-[1.05]"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Your Tailor.
          </span>
          <span
            className="block font-playfair font-medium leading-[1.05]"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 4rem)', letterSpacing: '-0.02em', color: '#97C459' }}
          >
            Your Door.
          </span>
        </h1>

        {/* ③ Sub-headline */}
        <p className="font-sans text-[0.8125rem] text-parchment/60 leading-relaxed text-center mb-3 sm:mb-5" style={{ maxWidth: '340px' }}>
          Expert alterations collected from Chelsea · Knightsbridge · Mayfair · Belgravia · and all Central London postcodes
        </p>

        {/* ④ Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          {TRUST.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-parchment/50"
            >
              <span>{icon}</span>{text}
            </span>
          ))}
        </div>

        {/* ⑤ Postcode checker */}
        <div className="w-full mb-3 sm:mb-4">
          <div className="flex gap-0">
            <input
              type="text"
              value={postcode}
              onChange={e => { setPostcode(e.target.value); setCoverage(null); setSent(false) }}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="YOUR POSTCODE — E.G. SW3"
              maxLength={8}
              className="hero-input flex-1 h-[52px] px-4 font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] focus:outline-none transition-colors"
              style={{
                background:  'rgba(10,10,8,0.55)',
                border:      '1px solid rgba(245,240,232,0.18)',
                borderRight: 'none',
                color:       '#F5F0E8',
              }}
            />
            <button
              onClick={handleCheck}
              disabled={checking || !postcode.trim()}
              className="h-[52px] px-5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap"
              style={{ background: '#2A5220', color: '#F5F0E8', minWidth: '130px', border: '1px solid #2A5220' }}
            >
              {checking
                ? <><span className="hero-spin">⟳</span> Checking</>
                : <>Check Coverage →</>
              }
            </button>
          </div>

          {/* Feedback line */}
          {!coverage && (
            <p className="mt-2 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-parchment/35 text-center">
              We also collect from offices &amp; hotels
            </p>
          )}

          {/* ── COVERED result ── */}
          {coverage === 'covered' && !sent && (
            <div className="mt-3">
              <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] mb-4 text-center" style={{ color: '#97C459' }}>
                ✓ We collect from {postcode.toUpperCase()} — book your visit below
              </p>
              <form onSubmit={handleLeadSubmit} className="space-y-2">
                <input
                  required
                  type="text"
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  placeholder="Your name"
                  className="hero-input w-full h-[48px] px-4 font-sans text-[0.875rem] focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(10,10,8,0.55)',
                    border:     '1px solid rgba(245,240,232,0.18)',
                    color:      '#F5F0E8',
                  }}
                />
                <input
                  required
                  type="tel"
                  value={leadPhone}
                  onChange={e => setLeadPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="hero-input w-full h-[48px] px-4 font-sans text-[0.875rem] focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(10,10,8,0.55)',
                    border:     '1px solid rgba(245,240,232,0.18)',
                    color:      '#F5F0E8',
                  }}
                />
                {formError && (
                  <p className="font-sans text-[0.75rem] text-red-400">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-[52px] font-sans text-[0.8125rem] font-medium uppercase tracking-[0.15em] transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: '#97C459', color: '#0F1F09' }}
                >
                  {sending ? 'Sending…' : '⚡ Book My Visit — We Reply in 5 Minutes'}
                </button>
              </form>
            </div>
          )}

          {/* ── COVERED + sent ── */}
          {coverage === 'covered' && sent && (
            <div
              className="mt-3 p-4 text-center"
              style={{ border: '1px solid rgba(151,196,89,0.3)', background: 'rgba(151,196,89,0.08)' }}
            >
              <p className="font-playfair text-[1.125rem] text-parchment mb-1">We&apos;ll WhatsApp you shortly.</p>
              <p className="font-sans text-[0.75rem] text-parchment/55">
                Our team replies within 5 minutes during business hours.
              </p>
            </div>
          )}

          {/* ── NOT COVERED result ── */}
          {coverage === 'uncovered' && (
            <div className="mt-3 text-center">
              <p className="font-sans text-[0.6875rem] uppercase tracking-[0.1em] text-parchment/45 mb-3">
                We may not cover {postcode.toUpperCase()} yet — WhatsApp us to confirm
              </p>
              <a
                href={`https://wa.me/447438145169?text=Hi%2C%20do%20you%20cover%20${encodeURIComponent(postcode.toUpperCase())}%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full h-[48px] font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors"
                style={{ background: '#25D366', color: '#fff' }}
              >
                💬 Ask on WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* ── Divider + action buttons (shown when no coverage checked) ── */}
        {!coverage && (
          <>
            <div className="flex items-center gap-3 w-full my-2 sm:my-4">
              <div className="flex-1 h-px" style={{ background: 'rgba(245,240,232,0.1)' }} />
              <span className="font-sans text-[0.5625rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.25)' }}>or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(245,240,232,0.1)' }} />
            </div>

            <div className="w-full flex flex-col gap-2 sm:gap-2.5 mb-3 sm:mb-5">
              {/* Quick Enquiry */}
              <Link
                href="/inquiry"
                className="flex items-center justify-center gap-2 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors"
                style={{ background: '#2A5220', color: '#F5F0E8', height: '48px' }}
              >
                ⚡ Quick Enquiry
              </Link>
              {/* Book a Visit */}
              <Link
                href="/book-visit"
                className="flex items-center justify-center gap-2 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors"
                style={{ background: 'transparent', border: '1px solid rgba(245,240,232,0.22)', color: '#F5F0E8', height: '48px' }}
              >
                📅 Book a Visit
              </Link>
              {/* Prices */}
              <Link
                href="/prices"
                className="flex items-center justify-center gap-1.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.15em] transition-colors"
                style={{ background: 'transparent', border: '1px solid rgba(245,240,232,0.08)', color: 'rgba(229,226,222,0.5)', height: '40px' }}
              >
                View Alteration Prices from £8
                <span style={{ color: '#97C459' }}>→</span>
              </Link>
            </div>
          </>
        )}

        {/* ⑥ Phone fallback */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-sans text-[0.5625rem] uppercase tracking-[0.15em]" style={{ color: 'rgba(245,240,232,0.35)' }}>
            Or call directly
          </span>
          <a
            href="tel:+447438145169"
            className="font-sans text-[0.6875rem] font-medium tracking-[0.12em] transition-colors"
            style={{ color: '#97C459', textDecoration: 'none' }}
          >
            +44 7438 145169
          </a>
        </div>

      </div>

      {/* ── Ticker strip at bottom ── */}
      <div
        className="relative z-20 h-10 overflow-hidden flex items-center flex-shrink-0"
        style={{
          background:     'rgba(10,10,8,0.75)',
          backdropFilter: 'blur(8px)',
          borderTop:      '1px solid rgba(245,240,232,0.08)',
        }}
      >
        <div className="hero-ticker-track">
          {tickerLoop.map((area, i) => (
            <span key={i} className="flex items-center">
              <span
                className="px-5 font-sans font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#97C459' }}
              >
                {area}
              </span>
              <span style={{ color: 'rgba(245,240,232,0.2)', fontSize: '10px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
