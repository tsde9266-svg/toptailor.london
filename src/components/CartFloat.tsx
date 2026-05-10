'use client'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const HIDDEN_PATHS = ['/checkout', '/admin', '/quote']

export default function CartFloat() {
  const { count, total, openDrawer, drawerOpen } = useCart()
  const pathname = usePathname() ?? ''

  if (count === 0) return null
  if (drawerOpen) return null
  if (HIDDEN_PATHS.some(p => pathname.startsWith(p))) return null

  const hasQuotes = total === 0 || (count > 0 && total >= 0)

  return (
    <button
      onClick={openDrawer}
      aria-label={`Open cart — ${count} item${count !== 1 ? 's' : ''}`}
      className="
        fixed z-40
        bottom-6 left-6
        lg:bottom-6 lg:left-6
        bg-hunter text-parchment
        px-5 py-3
        flex items-center gap-3
        font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase
        shadow-lg
        hover:bg-[#1E3D17] transition-colors duration-200
      "
    >
      <span className="relative flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-green-bright text-[#133a0b] text-[0.625rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span>View Cart</span>
        <span className="font-light text-[0.6875rem] tracking-normal normal-case opacity-90">
          {total > 0 ? `£${total}` : ''}
          {total > 0 && count > 0 ? ` · ${count} item${count !== 1 ? 's' : ''}` : `${count} item${count !== 1 ? 's' : ''}`}
        </span>
      </span>
      <span className="ml-2">→</span>
    </button>
  )
}
