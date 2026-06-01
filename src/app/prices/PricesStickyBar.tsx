'use client'

export default function PricesStickyBar() {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex items-center justify-between px-6 border-t border-divider/30"
      style={{ backgroundColor: '#133a0b', height: '52px' }}
    >
      <span className="font-sans font-medium uppercase text-parchment/60" style={{ fontSize: '9px', letterSpacing: '0.1em' }}>
        Ready to book?
      </span>
      <a
        href="/book-visit"
        className="font-sans font-medium text-parchment uppercase tracking-wider"
        style={{ fontSize: '11px' }}
      >
        Book a Visit <span style={{ color: '#97C459' }}>→</span>
      </a>
    </div>
  )
}
