'use client'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type CartItem = {
  id:           string
  categoryId:   string
  categoryName: string
  name:         string
  price:        number
}

type CartCtx = {
  items:       CartItem[]
  add:         (item: CartItem) => void
  remove:      (id: string) => void
  clear:       () => void
  has:         (id: string) => boolean
  total:       number
  count:       number
  drawerOpen:  boolean
  openDrawer:  () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items,      setItems]      = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hydrated,   setHydrated]   = useState(false)

  // Restore cart from localStorage on first render
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tt_cart')
      if (raw) setItems(JSON.parse(raw))
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])

  // Persist whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('tt_cart', JSON.stringify(items))
  }, [items, hydrated])

  const add = useCallback((item: CartItem) => {
    setItems(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item])
  }, [])

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const clear = useCallback(() => {
    setItems([])
    localStorage.removeItem('tt_cart')
  }, [])

  const has = useCallback((id: string) => items.some(i => i.id === id), [items])

  const total = items.reduce((sum, i) => sum + i.price, 0)
  const count = items.length

  return (
    <CartContext.Provider value={{
      items, add, remove, clear, has, total, count,
      drawerOpen,
      openDrawer:  () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
