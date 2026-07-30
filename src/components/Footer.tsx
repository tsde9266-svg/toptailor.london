import Image from 'next/image'
import { BUSINESS } from '@/lib/constants'

const links = {
  directives: [
    { label: 'ABOUT',        href: '/about'        },
    { label: 'HOW IT WORKS', href: '/how-it-works' },
    { label: 'BLOG',         href: '/blog'         },
    { label: 'CONTACT',      href: '/#book'        },
  ],
  legal: [
    { label: 'TERMS',   href: '/terms'   },
    { label: 'PRIVACY', href: '/privacy' },
  ],
  services: [
    { label: 'Suit Alterations',         href: '/suit-alterations-london'         },
    { label: 'Dress Alterations',        href: '/dress-alterations-london'        },
    { label: 'Trouser Alterations',      href: '/trouser-alterations-london'      },
    { label: 'Jacket Alterations',       href: '/jacket-alterations-london'       },
    { label: 'Coat Alterations',         href: '/coat-alterations-london'         },
    { label: 'Wedding Dress',            href: '/wedding-dress-alterations-london'},
    { label: 'Leather Jacket',           href: '/leather-jacket-alterations-london'},
    { label: 'Same Day Alterations',     href: '/same-day-alterations-london'     },
  ],
  locations: [
    { label: 'Tailor in Mayfair',        href: '/tailor-mayfair'        },
    { label: 'Tailor in Chelsea',        href: '/tailor-chelsea'        },
    { label: 'Tailor in Knightsbridge',  href: '/tailor-knightsbridge'  },
    { label: 'Tailor in Kensington',     href: '/tailor-kensington'     },
    { label: 'Tailor in Belgravia',      href: '/tailor-belgravia'      },
    { label: 'Tailor in Westminster',    href: '/tailor-westminster'    },
    { label: 'Tailor in Canary Wharf',   href: '/tailor-canary-wharf'   },
    { label: 'Tailor in Shoreditch',     href: '/tailor-shoreditch'     },
    { label: 'Tailor in City of London', href: '/tailor-city-of-london' },
    { label: 'Tailor in Islington',      href: '/tailor-islington'      },
    { label: 'Tailor in Notting Hill',   href: '/tailor-notting-hill'   },
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
          href="https://wa.me/447438145169?text=Hi%2C%20I%27d%20like%20to%20book%20a%20tailoring%20collection."
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

      {/* ══ DESKTOP — 4-column grid (≥ lg) ══════════════════ */}
      <div className="hidden lg:grid grid-cols-4 gap-10 px-24 py-24">
        {/* Col 1 — logo + tagline + phone */}
        <div>
          <div className="mb-8">
            <Image src="/logo-dark.png" alt="Fine Tailors" width={150} height={107} className="h-14 w-auto" />
          </div>
          <p className="font-sans text-sm font-light max-w-xs leading-relaxed mb-4">
            Collection-Based Tailoring &amp; Alterations — Central London
          </p>
          <p className="font-sans text-sm font-light max-w-xs leading-relaxed mb-6">
            We collect from your door, alter in our workshop, and return pressed and perfect in 5–7 days. No shop visit.
          </p>
          <a
            href="tel:+447438145169"
            className="
              inline-flex items-center gap-2
              font-sans text-sm font-medium text-parchment
              hover:text-green-bright transition-colors duration-200
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            +44 7438 145169
          </a>
          <a
            href={BUSINESS.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 mt-4
              font-sans text-sm font-medium text-parchment
              hover:text-green-bright transition-colors duration-200
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Leave us a review
          </a>
        </div>

        {/* Col 2 — services */}
        <div className="flex flex-col gap-3">
          <span className="font-sans text-[0.65rem] text-parchment tracking-widest uppercase mb-3">
            SERVICES
          </span>
          {links.services.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="
                font-sans text-sm font-light text-green-soft
                tracking-tight
                hover:text-parchment transition-colors duration-150
              "
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Col 3 — nav + legal */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[0.65rem] text-parchment tracking-widest uppercase mb-4">
            NAVIGATE
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
          <span className="font-sans text-[0.65rem] text-parchment tracking-widest uppercase mt-4 mb-2">
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

        {/* Col 4 — locations */}
        <div className="flex flex-col gap-3">
          <span className="font-sans text-[0.65rem] text-parchment tracking-widest uppercase mb-3">
            LOCATIONS
          </span>
          {links.locations.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="
                font-sans text-sm font-light text-green-soft
                tracking-tight
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
        <div>
          <Image src="/logo-dark.png" alt="Fine Tailors" width={130} height={92} className="h-10 w-auto" />
        </div>
        <p className="font-sans text-xs font-light text-green-soft/70 mt-2">
          Mobile Tailoring &amp; Alterations — Central London
        </p>
        <a
          href="tel:+447438145169"
          className="inline-flex items-center gap-2 mt-2 font-sans text-sm font-medium text-parchment hover:text-green-bright transition-colors duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          +44 7438 145169
        </a>
        <a
          href={BUSINESS.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 font-sans text-sm font-medium text-parchment hover:text-green-bright transition-colors duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Leave us a review
        </a>

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

        {/* Legal links */}
        <div className="flex gap-6 pt-2">
          {links.legal.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-sans text-[0.6875rem] uppercase tracking-wider text-parchment/40 hover:text-green-bright"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* padding for StickyBar */}
        <div className="h-14" />
      </div>

      {/* ── Service area text ─────────────────────── */}
      <div className="px-8 lg:px-24 py-4 border-t border-divider/20 text-center">
        <span className="font-sans text-[0.6rem] font-light tracking-[0.05em] text-green-soft/50">
          Collection Service Area: Mayfair · Chelsea · Knightsbridge · Kensington · Belgravia · Westminster · Marylebone · Soho · Covent Garden · Fitzrovia · Bloomsbury · Islington · Notting Hill · Paddington · Pimlico · Clerkenwell · Shoreditch · Canary Wharf · City of London · Central London
        </span>
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
          © {new Date().getFullYear()} FINE TAILORS. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  )
}
