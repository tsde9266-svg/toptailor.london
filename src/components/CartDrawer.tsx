'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { items, remove, clear, total, count, drawerOpen, closeDrawer } = useCart()
  const router   = useRouter()
  const pathname = usePathname()

  const onCheckout = pathname === '/checkout'

  if (!drawerOpen) return null

  function proceed() {
    closeDrawer()
    if (!onCheckout) router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-[2px]"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className="
          fixed top-0 right-0 bottom-0 z-[80]
          w-full max-w-sm
          bg-parchment
          flex flex-col
          shadow-2xl
        "
        role="dialog"
        aria-label="Your order"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-divider">
          <div>
            <h2 className="font-playfair text-[1.125rem]">Your Order</h2>
            {count > 0 && (
              <p className="font-sans text-[0.75rem] text-muted mt-0.5">
                {count} item{count !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="w-8 h-8 flex items-center justify-center text-charcoal hover:text-hunter transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {count === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-16">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4B99A" strokeWidth="0.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-sans text-[0.875rem] text-muted">Your order is empty.</p>
              <button
                onClick={closeDrawer}
                className="font-sans text-[0.75rem] font-medium text-hunter underline underline-offset-4"
              >
                Browse services →
              </button>
            </div>
          ) : (
            <ul className="space-y-0">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 py-4 border-b border-divider/50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[0.9rem] text-charcoal leading-snug">{item.name}</p>
                    <p className="font-sans text-[0.6875rem] text-muted uppercase tracking-wider mt-0.5">
                      {item.categoryName}
                    </p>
                  </div>
                  <span className="font-sans text-[0.9rem] font-medium whitespace-nowrap text-hunter">
                    {item.price === 0 ? <em className="text-muted not-italic">Quote</em> : `£${item.price}`}
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-muted hover:text-charcoal transition-colors mt-0.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {count > 0 && (
          <div className="px-6 py-5 border-t border-divider space-y-3">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-sans text-[0.8125rem] text-muted uppercase tracking-widest">Estimate</span>
              <span className="font-playfair text-[1.25rem] text-charcoal">
                £{total}{items.some(i => i.price === 0) ? ' + quotes' : ''}
              </span>
            </div>
            <p className="font-sans text-[0.6875rem] text-muted">Minimum order £20</p>

            {/* Proceed CTA */}
            <button
              onClick={proceed}
              className="
                w-full bg-hunter text-parchment py-4
                font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase
                hover:bg-[#1E3D17] transition-colors duration-200
              "
            >
              {onCheckout ? 'Continue Below ↓' : 'Request Collection →'}
            </button>

            {/* Clear */}
            <button
              onClick={clear}
              className="
                w-full text-center font-sans text-[0.6875rem] text-muted
                hover:text-charcoal transition-colors underline-offset-2 hover:underline
              "
            >
              Clear order
            </button>
          </div>
        )}
      </div>
    </>
  )
}
