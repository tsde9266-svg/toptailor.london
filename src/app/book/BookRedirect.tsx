'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart }   from '@/context/CartContext'
import { HOME_VISIT_ITEM } from '@/data/services'

export default function BookRedirect() {
  const { add, has } = useCart()
  const router = useRouter()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!has(HOME_VISIT_ITEM.id)) add(HOME_VISIT_ITEM)
    setDone(true)
    // Small delay so the user sees the friendly message before being moved on
    const t = setTimeout(() => router.replace('/checkout'), 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-parchment flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-hunter/10 flex items-center justify-center mx-auto mb-6">
          {done ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="1.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg className="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A5220" strokeWidth="1.5">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          )}
        </div>
        <h1 className="font-playfair text-[1.75rem] font-medium mb-3">
          {done ? 'Home Visit added.' : 'Preparing your booking…'}
        </h1>
        <p className="font-sans font-light text-muted text-[0.9375rem] leading-relaxed">
          We&apos;ve added a Home Visit Consultation (£20) to your order.<br />
          Taking you to checkout to choose your slot.
        </p>
      </div>
    </main>
  )
}
