'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'HOME',         href: '/'            },
  { label: 'SERVICES',     href: '/prices'      },
  { label: 'HOW IT WORKS', href: '/how-it-works' },
  { label: 'ABOUT',        href: '/about'        },
  { label: 'REVIEWS',      href: '/review'       },
  { label: 'PRICES',       href: '/prices'       },
]

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (solid) return
    const hero = document.getElementById('hero')
    if (!hero) { setPastHero(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [solid])

  const light = solid || pastHero

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`
          fixed top-0 w-full z-50
          flex justify-between items-center
          px-6 lg:px-8 py-4
          transition-colors duration-300
          ${light
            ? 'bg-parchment border-b border-divider'
            : 'bg-transparent lg:bg-parchment lg:border-b lg:border-divider'
          }
        `}
      >
        {/* Mobile: hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
        >
          <span className={`block h-px w-6 transition-colors duration-300 ${light ? 'bg-charcoal' : 'bg-parchment'}`} />
          <span className={`block h-px w-4 transition-colors duration-300 ${light ? 'bg-charcoal' : 'bg-parchment'}`} />
          <span className={`block h-px w-6 transition-colors duration-300 ${light ? 'bg-charcoal' : 'bg-parchment'}`} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0"
          aria-label="Fine Tailors — Home"
        >
          <Image
            src="/logo-green.png"
            alt="Fine Tailors"
            width={130}
            height={92}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-12 items-center">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="
                font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                text-charcoal hover:text-hunter transition-colors duration-200
              "
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/book-visit"
            className="
              hidden lg:inline-block
              bg-hunter text-parchment
              px-8 py-3
              font-sans text-[0.6875rem] font-medium tracking-[0.2em] uppercase
              hover:bg-[#1E3D17] transition-colors duration-200
            "
          >
            BOOK A VISIT
          </Link>
        </div>

        {/* Mobile right spacer (keeps logo centred now cart is gone) */}
        <div className="w-8 lg:hidden" aria-hidden="true" />
      </nav>

      {/* Mobile full-screen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-parchment flex flex-col px-8 pt-6 pb-12">
          <div className="flex justify-between items-center mb-8">
            <Image src="/logo-green.png" alt="Fine Tailors" width={130} height={92} className="h-10 w-auto" />
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-charcoal text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-10 mt-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="
                  font-sans text-[0.8125rem] font-medium tracking-widest uppercase
                  text-charcoal border-b border-divider pb-4
                "
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Phone number */}
          <a
            href="tel:+447438145169"
            className="mt-10 flex items-center gap-3 font-sans text-[0.875rem] text-charcoal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.22 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span>+44 7438 145169</span>
          </a>

          {/* Two-button stack */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/book-visit"
              onClick={() => setMenuOpen(false)}
              className="
                bg-hunter text-parchment
                py-5 w-full text-center
                font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
              "
            >
              📅 Book a Visit
            </Link>
            <Link
              href="/inquiry"
              onClick={() => setMenuOpen(false)}
              className="
                border border-charcoal text-charcoal
                py-5 w-full text-center
                font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
                hover:bg-charcoal hover:text-parchment transition-colors
              "
            >
              ⚡ Quick Inquiry
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
