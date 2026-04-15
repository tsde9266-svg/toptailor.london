'use client'
import { useEffect, useState } from 'react'

/**
 * StickyBar — mobile only (hidden lg:hidden).
 *
 * Hidden until the hero CTA button (#hero-cta) scrolls out of viewport.
 * Uses IntersectionObserver on that element.
 * Slides up: translateY(100% → 0) + opacity 0→1 over 0.3s.
 *
 * Design (CONTEXT.md):
 *   bg #2A5220, height 52px
 *   left  — "Ready to book?" DM Sans 500 uppercase 9px, rgba(197,221,151,0.7)
 *   right — "Schedule a Collection →" DM Sans 500 11px #F5F0E8, arrow in #97C459
 */
export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cta = document.getElementById('hero-cta')
    if (!cta) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when CTA is NOT intersecting (has scrolled off screen)
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(cta)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="
        lg:hidden
        fixed bottom-0 left-0 w-full z-50
        flex items-center justify-between
        px-6
        border-t border-divider/30
      "
      style={{
        backgroundColor: '#133a0b',
        height: '52px',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
      aria-hidden={!visible}
    >
      {/* Left: calendar icon + label */}
      <div className="flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#97C459" strokeWidth="1.2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="0" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="16" y1="2" x2="16" y2="6" />
        </svg>
        <span
          className="font-sans font-medium uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: 'rgba(197,221,151,0.7)',
          }}
        >
          Ready to book?
        </span>
      </div>

      {/* Right */}
      <a
        href="/book"
        className="flex items-center gap-1"
        style={{ fontSize: '11px' }}
      >
        <span className="font-sans font-medium text-parchment uppercase tracking-wider">
          Schedule a Collection
        </span>
        <span
          className="font-sans font-medium"
          style={{ color: '#97C459' }}
        >
          →
        </span>
      </a>
    </div>
  )
}
