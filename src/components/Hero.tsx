'use client'
import Link from 'next/link'

/**
 * Hero — ONE video element repositioned via CSS between two layouts:
 *
 * Mobile (< lg):   video panel is `absolute inset-0` → full-viewport bg
 *                  text content sits on top with `relative z-10`
 *
 * Desktop (≥ lg):  section becomes a 2-col grid.
 *                  video panel is `relative` → right grid cell.
 *                  text content is left grid cell.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="
        relative min-h-screen overflow-hidden
        lg:min-h-[870px] lg:grid lg:grid-cols-2
        border-b border-divider
      "
    >
      {/* ── Text content — left col on desktop, over video on mobile ── */}
      <div
        className="
          relative z-10
          flex flex-col justify-end pb-24 pt-32 px-8
          min-h-screen
          lg:min-h-0 lg:justify-center lg:px-24 lg:py-24 lg:pb-24
          lg:border-r lg:border-divider
        "
      >
        {/* Eyebrow */}
        <span
          className="
            font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] mb-6 block
            text-[#97C459] lg:text-hunter
            animate-fade-in-up
          "
          style={{ animationDelay: '0.2s' }}
        >
          <span className="lg:hidden">Personal tailoring · Central London</span>
          <span className="hidden lg:inline">THE BESPOKE MANUSCRIPT</span>
        </span>

        {/* H1 — desktop */}
        <h1
          className="
            hidden lg:block
            font-playfair text-[3.5rem] leading-[1.1] font-medium tracking-tight
            text-charcoal mb-8
          "
        >
          <span className="block overflow-hidden">
            <span
              className="block animate-clip-reveal"
              style={{ animationDelay: '0.3s' }}
            >
              Perfect fit,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block animate-clip-reveal"
              style={{ animationDelay: '0.46s' }}
            >
              <em className="font-playfair italic not-italic">effortlessly</em>{' '}
              realized.
            </span>
          </span>
        </h1>

        {/* H1 — mobile */}
        <h1
          className="
            lg:hidden
            font-playfair text-[2.75rem] leading-[1.1] font-medium
            text-parchment mb-6
          "
        >
          <span className="block overflow-hidden">
            <span
              className="block animate-clip-reveal"
              style={{ animationDelay: '0.3s' }}
            >
              Your wardrobe,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block animate-clip-reveal"
              style={{ animationDelay: '0.46s' }}
            >
              at its best.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block animate-clip-reveal"
              style={{ animationDelay: '0.62s' }}
            >
              At your door.
            </span>
          </span>
        </h1>

        {/* Subtext — desktop */}
        <p
          className="
            hidden lg:block
            font-sans font-light text-lg max-w-md mb-10 leading-relaxed text-muted
            animate-fade-in-up-16
          "
          style={{ animationDelay: '0.5s' }}
        >
          High-end tailoring brought to your door. We master the architecture
          of garments to elevate your personal silhouette through precision
          measurement and heritage technique.
        </p>

        {/* Subtext — mobile */}
        <p
          className="
            lg:hidden
            font-sans text-[0.9375rem] leading-relaxed
            text-parchment/80 max-w-[280px] mb-8
            animate-fade-in-up-16
          "
          style={{ animationDelay: '0.5s' }}
        >
          Bespoke alterations and garment care, collected and delivered to
          your London residence.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <a
            id="hero-cta"
            href="/book"
            className="
              w-full lg:w-auto text-center
              bg-green-bright text-[#133a0b] lg:bg-hunter lg:text-parchment
              px-10 py-5
              font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
              hover:opacity-90 lg:hover:bg-[#1E3D17] transition-colors duration-200
            "
          >
            SCHEDULE A COLLECTION
          </a>
          <a
            href="#services"
            className="
              hidden lg:inline-block
              font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase
              text-charcoal border-b border-divider pb-px
              hover:text-hunter transition-colors duration-200
            "
          >
            VIEW SERVICES
          </a>
        </div>

        {/* Scroll hint — mobile only */}
        <p className="
          lg:hidden absolute bottom-10 left-0 right-0 text-center
          font-sans text-[0.625rem] uppercase tracking-[0.3em] text-parchment/40
        ">
          Scroll to explore
        </p>
      </div>

      {/* ── Video panel ─────────────────────────────────────────────────
          Mobile: absolute inset-0 (sits behind text above)
          Desktop: relative → occupies col 2 of the grid
         ───────────────────────────────────────────────────────────────── */}
      <div
        className="
          absolute inset-0
          lg:relative lg:inset-auto
          bg-[#133a0b] overflow-hidden
        "
      >
        {/* Single video element — works for both layouts */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 lg:opacity-100"
          preload="auto"
        >
          <source src="/video/craft.mp4" type="video/mp4" />
        </video>

        {/* Mobile gradient overlay: green-tinted bottom scrim */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(19,58,11,0.9) 0%, rgba(19,58,11,0.4) 40%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Desktop flat overlay: rgba(0,0,0,0.18) */}
        <div
          className="absolute inset-0 hidden lg:block bg-black/[0.18]"
          aria-hidden="true"
        />

        {/* Desktop ghost "craft" watermark */}
        <div
          className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-playfair italic text-white opacity-[0.025] select-none"
            style={{ fontSize: '120px' }}
          >
            craft
          </span>
        </div>

        {/* Desktop caption strip */}
        <div className="absolute bottom-12 left-12 right-12 z-10 hidden lg:block">
          <div className="rule-h opacity-20 mb-4" />
          <div className="flex justify-between items-center">
            <span className="font-sans text-[0.65rem] text-divider uppercase tracking-widest">
              Process 01: The Assessment
            </span>
            <span className="font-sans text-[0.65rem] text-divider">00:42</span>
          </div>
        </div>
      </div>
    </section>
  )
}
