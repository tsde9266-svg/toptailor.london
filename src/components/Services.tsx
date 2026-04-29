'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCart } from '@/context/CartContext'
import { services } from '@/data/services'

// ─── Category icons ────────────────────────────────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  'trousers': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M12 2L2 22H22L12 2Z" />
    </svg>
  ),
  'jacket': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <rect width="16" height="16" x="4" y="4" />
      <path d="M4 4L20 20M20 4L4 20" />
    </svg>
  ),
  'dress': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M6 2L18 2L21 22H3L6 2Z" />
    </svg>
  ),
  'leather': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <ellipse cx="12" cy="12" rx="8" ry="10" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  'occasion': (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path d="M12 2L4 8V22H20V8L12 2Z" />
    </svg>
  ),
}

function fmt(price: number, note?: string) {
  if (note === 'quote') return 'Quote'
  return note === 'from' ? `from £${price}` : `£${price}`
}

function AddButton({ itemId, categoryId, categoryName, name, price, isQuote }: {
  itemId: string; categoryId: string; categoryName: string; name: string; price: number; isQuote?: boolean
}) {
  const { add, remove, has } = useCart()
  const inCart = has(itemId)

  if (isQuote) {
    return (
      <button
        onClick={() => inCart ? remove(itemId) : add({ id: itemId, categoryId, categoryName, name, price: 0 })}
        aria-label={inCart ? `Remove ${name}` : `Request quote for ${name}`}
        className={`
          flex-shrink-0 px-2 h-7 rounded-full border flex items-center justify-center
          transition-all duration-200 text-[0.65rem] font-sans tracking-wide
          ${inCart
            ? 'bg-hunter border-hunter text-parchment'
            : 'border-divider text-muted hover:border-hunter hover:text-hunter'
          }
        `}
      >
        {inCart ? '✓' : 'Ask'}
      </button>
    )
  }

  function toggle() {
    if (inCart) {
      remove(itemId)
    } else {
      add({ id: itemId, categoryId, categoryName, name, price })
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={inCart ? `Remove ${name}` : `Add ${name} to cart`}
      className={`
        flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center
        transition-all duration-200 text-[0.75rem]
        ${inCart
          ? 'bg-hunter border-hunter text-parchment'
          : 'border-divider text-muted hover:border-hunter hover:text-hunter'
        }
      `}
    >
      {inCart ? '✓' : '+'}
    </button>
  )
}

export default function Services() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <section id="services" ref={sectionRef} className="reveal-on-scroll">

      {/* ══ DESKTOP layout (≥ lg) ══════════════════════════════════════════ */}
      <div className="hidden lg:flex gap-24 px-24 py-24">

        {/* Left: intro */}
        <div className="w-1/3 sticky top-32 self-start">
          <h2 className="font-playfair text-[1.75rem] font-medium mb-6">
            SERVICES &amp;<br />
            <em className="font-playfair italic">Mastery</em>
          </h2>
          <div className="rule-h mb-8" />
          <p className="font-sans font-light text-sm leading-loose text-muted mb-8">
            Select the work you need below. Prices shown are a guide — specialist
            items are quoted on inspection. Minimum order £20.
          </p>
          <Link
            href="/book"
            className="
              inline-block font-sans text-[0.6875rem] font-medium tracking-widest uppercase
              text-muted border-b border-divider pb-px
              hover:text-hunter transition-colors duration-200
            "
          >
            Not sure? Book a consultation →
          </Link>
        </div>

        {/* Right: expandable list */}
        <div className="w-2/3">
          {services.map((cat, i) => (
            <div key={cat.id} className="reveal-on-scroll" style={{ transitionDelay: `${i * 50}ms` }}>
              {/* Category row */}
              <button
                onClick={() => toggle(cat.id)}
                className="
                  w-full flex items-center gap-6 py-6
                  border-b border-divider text-left
                  group hover:text-hunter transition-colors duration-200
                "
              >
                <span className="text-hunter opacity-60 group-hover:opacity-100 transition-opacity">
                  {icons[cat.id]}
                </span>
                <span className="flex-1">
                  <span className="font-playfair text-[1.0625rem] block">{cat.name}</span>
                  <span className="font-sans text-[0.6875rem] text-muted uppercase tracking-wider">{cat.subtitle}</span>
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.2"
                  className={`flex-shrink-0 transition-transform duration-300 text-muted ${openId === cat.id ? 'rotate-90' : ''}`}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Sub-items */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openId === cat.id ? `${cat.items.length * 56}px` : '0px' }}
              >
                {cat.items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-12 py-3 border-b border-divider/50 last:border-0"
                  >
                    <span className="flex-1 font-sans text-[0.9375rem] text-charcoal">{item.name}</span>
                    <span className={`font-sans text-[0.875rem] font-medium w-24 text-right ${item.note === 'quote' ? 'text-muted italic' : 'text-hunter'}`}>
                      {fmt(item.price, item.note)}
                    </span>
                    <AddButton
                      itemId={item.id}
                      categoryId={cat.id}
                      categoryName={cat.name}
                      name={item.name}
                      price={item.price}
                      isQuote={item.note === 'quote'}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MOBILE layout (< lg) ══════════════════════════════════════════ */}
      <div className="lg:hidden bg-parchment py-20 px-8">
        <div className="mb-12">
          <h2 className="font-playfair text-[2rem] text-hunter italic">Our Atelier</h2>
          <div className="w-12 h-px bg-hunter mt-2" />
          <p className="font-sans text-[0.8125rem] text-muted mt-4 leading-relaxed">
            Tap a category to see services and add to your order.
          </p>
        </div>

        <div>
          {services.map((cat, i) => (
            <div key={cat.id} className="reveal-on-scroll" style={{ transitionDelay: `${i * 50}ms` }}>
              {/* Category row */}
              <button
                onClick={() => toggle(cat.id)}
                className="
                  w-full grid items-center py-5 hairline-t last:hairline-b text-left
                "
                style={{ gridTemplateColumns: '36px 1fr 24px' }}
              >
                <span className="text-hunter">{icons[cat.id]}</span>
                <span className="px-4">
                  <span className="font-playfair text-[1rem] text-charcoal block">{cat.name}</span>
                  <span className="font-sans text-[0.6875rem] text-muted uppercase tracking-wider">{cat.subtitle}</span>
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#C4B99A" strokeWidth="1"
                  className={`transition-transform duration-300 ${openId === cat.id ? 'rotate-90' : ''}`}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Sub-items */}
              <div
                className="overflow-hidden transition-all duration-300 bg-parchment"
                style={{ maxHeight: openId === cat.id ? `${cat.items.length * 60}px` : '0px' }}
              >
                {cat.items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 pl-12 pr-2 py-3 border-b border-divider/30 last:border-0"
                  >
                    <span className="flex-1 font-sans text-[0.9rem] text-charcoal">{item.name}</span>
                    <span className={`font-sans text-[0.875rem] font-medium whitespace-nowrap ${item.note === 'quote' ? 'text-muted italic' : 'text-hunter'}`}>
                      {fmt(item.price, item.note)}
                    </span>
                    <AddButton
                      itemId={item.id}
                      categoryId={cat.id}
                      categoryName={cat.name}
                      name={item.name}
                      price={item.price}
                      isQuote={item.note === 'quote'}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Consultation link */}
        <div className="mt-10 pt-8 border-t border-divider">
          <p className="font-sans text-[0.8125rem] text-muted mb-3">
            Not sure what you need?
          </p>
          <Link
            href="/book"
            className="
              font-sans text-[0.8125rem] font-medium text-hunter
              underline underline-offset-4
            "
          >
            Book a free consultation →
          </Link>
        </div>
      </div>
    </section>
  )
}
