const links = {
  directives: [
    { label: 'THE ATELIER',     href: '#about'    },
    { label: 'BESPEAK PROCESS', href: '#services' },
    { label: 'ARCHIVE',         href: '#'         },
    { label: 'CONTACT',         href: '#book'     },
  ],
  legal: [
    { label: 'TERMS',   href: '/terms'   },
    { label: 'PRIVACY', href: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-green-soft border-t border-divider">

      {/* ══ WHATSAPP CTA — mobile only ══════════════════════ */}
      <div className="lg:hidden px-8 py-10 text-center border-b border-divider/20">
        <p className="font-playfair italic text-parchment text-lg mb-6">
          Prefer to message directly?
        </p>
        <a
          href="https://wa.me/447000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-3
            w-full bg-green-bright text-[#133a0b]
            py-4
            font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
            hover:opacity-90 transition-opacity duration-200
          "
        >
          {/* Chat bubble icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          WHATSAPP
        </a>
      </div>

      {/* ══ DESKTOP — 3-column grid (≥ lg) ══════════════════ */}
      <div className="hidden lg:grid grid-cols-3 gap-12 px-24 py-24">
        {/* Col 1 — logo + tagline */}
        <div>
          <div className="font-playfair text-2xl text-parchment mb-8">
            TOP TAILOR
          </div>
          <p className="font-sans text-sm font-light max-w-xs leading-relaxed">
            A modern atelier for the traditional aesthetic. Precision,
            permanence, and the art of the perfect fit.
          </p>
        </div>

        {/* Col 2 — nav links */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[0.65rem] text-parchment tracking-widest uppercase mb-4">
            DIRECTIVES
          </span>
          {links.directives.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="
                font-sans text-sm font-light text-green-soft
                uppercase tracking-tight
                hover:text-parchment transition-colors duration-150
              "
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Col 3 — legal */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[0.65rem] text-parchment tracking-widest uppercase mb-4">
            LEGAL
          </span>
          {links.legal.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="
                font-sans text-sm font-light text-green-soft
                uppercase tracking-tight
                hover:text-parchment transition-colors duration-150
              "
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* ══ MOBILE — logo + 2-col links (< lg) ══════════════ */}
      <div className="lg:hidden px-8 py-12 space-y-6">
        <div className="font-playfair text-2xl italic text-parchment">
          Top Tailor
        </div>

        <div className="border-t border-divider/20" />

        <div className="grid grid-cols-2 gap-8 py-2">
          <div className="space-y-4">
            {links.directives.slice(0, 2).map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block font-sans text-[0.6875rem] uppercase tracking-wider text-parchment/60 hover:text-green-bright"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="space-y-4">
            {links.directives.slice(2).map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block font-sans text-[0.6875rem] uppercase tracking-wider text-parchment/60 hover:text-green-bright"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* padding for StickyBar */}
        <div className="h-14" />
      </div>

      {/* ── Bottom bar — copyright ─────────────────────── */}
      <div
        className="
          px-8 lg:px-24 py-6
          border-t border-divider/20
          flex justify-center items-center
        "
      >
        <span
          className="font-sans text-[0.65rem] font-light tracking-[0.1em] text-green-soft/60"
          suppressHydrationWarning
        >
          © {new Date().getFullYear()} TOP TAILOR. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  )
}
