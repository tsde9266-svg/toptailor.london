'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { services } from '@/data/services'

type Item = { id: string; name: string; price: number }

type Category = {
  category:     string
  icon:         string
  accent:       string
  borderAccent: string
  items:        Array<{ name: string; price: number }>
}

const CATEGORY_STYLE: Record<string, { icon: string; accent: string; borderAccent: string }> = {
  trousers: { icon: '👖', accent: '#60a5fa', borderAccent: '#3b82f6' },
  jacket:   { icon: '🧥', accent: '#34d399', borderAccent: '#10b981' },
  dress:    { icon: '👗', accent: '#f9a8d4', borderAccent: '#ec4899' },
}

const QUICK_ITEMS: Category[] = [
  ...(['trousers', 'jacket', 'dress'] as const).flatMap(id => {
    const style = CATEGORY_STYLE[id]
    const cat   = services.find(s => s.id === id)
    if (!cat) return []
    return [{
      category:     cat.name,
      icon:         style.icon,
      accent:       style.accent,
      borderAccent: style.borderAccent,
      items:        cat.items.filter(i => i.price > 0).map(i => ({ name: i.name, price: i.price })),
    }]
  }),
  { category: 'Custom', icon: '✂️', accent: '#c4b5fd', borderAccent: '#8b5cf6', items: [] },
]

const DISCOUNT_PRESETS = [5, 10, 15, 20, 25, 30]

let _uid = 0
function uid() { return String(++_uid) }

export default function POSCalculator() {
  const [cart, setCart]                     = useState<Item[]>([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [discountPct, setDiscountPct]       = useState(0)
  const [customName, setCustomName]         = useState('')
  const [customPrice, setCustomPrice]       = useState('')
  const customNameRef                       = useRef<HTMLInputElement>(null)

  function addItem(name: string, price: number) {
    setCart(p => [...p, { id: uid(), name, price }])
  }

  function removeItem(id: string) {
    setCart(p => p.filter(i => i.id !== id))
  }

  function addCustom() {
    const price = parseFloat(customPrice)
    if (!customName.trim() || !price || price <= 0) return
    addItem(customName.trim(), price)
    setCustomName('')
    setCustomPrice('')
    customNameRef.current?.focus()
  }

  function clearAll() {
    setCart([])
    setDiscountPct(0)
  }

  const subtotal    = cart.reduce((s, i) => s + i.price, 0)
  const discountAmt = discountPct > 0 ? Math.round(subtotal * discountPct) / 100 : 0
  const total       = Math.max(0, subtotal - discountAmt)
  const cat         = QUICK_ITEMS[activeCategory]
  const isCustom    = cat.items.length === 0

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/admin" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.05em' }}>
            ← Admin
          </Link>
          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.05em' }}>✂️ Quick Calc</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Fine Tailors POS</span>
        </div>
        {cart.length > 0 && (
          <button onClick={clearAll} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '6px 14px', fontSize: '12px', borderRadius: '6px', cursor: 'pointer', letterSpacing: '0.05em' }}>
            Clear All
          </button>
        )}
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', overflow: 'hidden' }}>

        {/* Left — item picker */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Category tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto', padding: '0 16px' }}>
            {QUICK_ITEMS.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                style={{
                  background:   activeCategory === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border:       'none',
                  borderBottom: activeCategory === i ? '3px solid #60a5fa' : '3px solid transparent',
                  color:        activeCategory === i ? 'white' : 'rgba(255,255,255,0.5)',
                  padding:      '14px 20px',
                  fontSize:     '14px',
                  fontWeight:   activeCategory === i ? 700 : 400,
                  cursor:       'pointer',
                  whiteSpace:   'nowrap',
                  transition:   'all 0.15s',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '8px',
                }}
              >
                <span>{c.icon}</span>
                <span>{c.category}</span>
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {isCustom ? (
              <div style={{ maxWidth: '480px' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Add a custom item
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    ref={customNameRef}
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustom()}
                    placeholder="Service description"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '14px 16px', fontSize: '16px', borderRadius: '8px', outline: 'none' }}
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>£</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={customPrice}
                        onChange={e => setCustomPrice(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addCustom()}
                        placeholder="0"
                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '14px 16px 14px 32px', fontSize: '16px', borderRadius: '8px', outline: 'none', width: '100%' }}
                      />
                    </div>
                    <button onClick={addCustom} style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', color: 'white', padding: '14px 28px', fontSize: '16px', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      + Add
                    </button>
                  </div>
                </div>

                {/* Quick price buttons */}
                <div style={{ marginTop: '24px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Quick prices</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[5, 8, 10, 15, 18, 20, 25, 28, 30, 35, 45, 50, 65, 75].map(p => (
                      <button
                        key={p}
                        onClick={() => setCustomPrice(String(p))}
                        style={{
                          background: customPrice === String(p) ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)',
                          border:     `1px solid ${customPrice === String(p) ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                          color:      'white',
                          padding:    '8px 14px',
                          fontSize:   '14px',
                          borderRadius: '6px',
                          cursor:     'pointer',
                        }}
                      >
                        £{p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                {cat.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => addItem(item.name, item.price)}
                    style={{
                      background:      'rgba(255,255,255,0.05)',
                      border:          `1px solid rgba(255,255,255,0.1)`,
                      borderLeft:      `3px solid ${cat.borderAccent}`,
                      color:           'white',
                      padding:         '14px 16px',
                      textAlign:       'left',
                      borderRadius:    '8px',
                      cursor:          'pointer',
                      transition:      'background 0.15s',
                      display:         'flex',
                      flexDirection:   'column',
                      gap:             '6px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  >
                    <span style={{ fontSize: '13px', lineHeight: '1.4', fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: cat.accent }}>£{item.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — cart & total */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Cart header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Cart ({cart.length})
            </span>
          </div>

          {/* Cart items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧵</div>
                <p style={{ fontSize: '14px' }}>Tap items to add them</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cart.map((item, idx) => (
                  <div key={item.id} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', minWidth: '20px' }}>{idx + 1}</span>
                    <span style={{ flex: 1, fontSize: '13px', lineHeight: '1.4' }}>{item.name}</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#60a5fa', minWidth: '48px', textAlign: 'right' }}>£{item.price}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', width: '26px', height: '26px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
              Discount
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
              <button
                onClick={() => setDiscountPct(0)}
                style={{ background: discountPct === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${discountPct === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`, color: 'white', padding: '6px 12px', fontSize: '13px', borderRadius: '6px', cursor: 'pointer' }}
              >
                None
              </button>
              {DISCOUNT_PRESETS.map(pct => (
                <button
                  key={pct}
                  onClick={() => setDiscountPct(pct)}
                  style={{ background: discountPct === pct ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)', border: `1px solid ${discountPct === pct ? '#10b981' : 'rgba(255,255,255,0.1)'}`, color: discountPct === pct ? '#6ee7b7' : 'white', padding: '6px 12px', fontSize: '13px', borderRadius: '6px', cursor: 'pointer', fontWeight: discountPct === pct ? 700 : 400 }}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPct || ''}
                onChange={e => setDiscountPct(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                placeholder="Custom %"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '8px 12px', fontSize: '14px', borderRadius: '6px', outline: 'none', width: '90px' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>% discount</span>
            </div>
          </div>

          {/* Totals */}
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {discountAmt > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Subtotal</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>£{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#6ee7b7', fontSize: '14px' }}>Discount ({discountPct}%)</span>
                  <span style={{ color: '#6ee7b7', fontSize: '14px', fontWeight: 700 }}>−£{discountAmt.toFixed(2)}</span>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontSize: '40px', fontWeight: 800, background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                £{total.toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cart.length > 0 && (
                <a
                  href="/admin/invoice/new"
                  style={{ display: 'block', background: 'linear-gradient(135deg, #2A5220, #3B6D11)', color: 'white', textDecoration: 'none', padding: '14px', textAlign: 'center', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '8px' }}
                >
                  Create Invoice →
                </a>
              )}
              <button
                onClick={() => {
                  const lines   = cart.map((i, idx) => `${idx + 1}. ${i.name} — £${i.price}`).join('\n')
                  const summary = `FINE TAILORS — PRICE QUOTE\n${'─'.repeat(32)}\n${lines}\n${'─'.repeat(32)}\nSubtotal: £${subtotal.toFixed(2)}${discountAmt > 0 ? `\nDiscount (${discountPct}%): −£${discountAmt.toFixed(2)}` : ''}\nTOTAL: £${total.toFixed(2)}`
                  if (navigator.share) {
                    navigator.share({ title: 'Fine Tailors Quote', text: summary })
                  } else {
                    navigator.clipboard?.writeText(summary)
                  }
                }}
                disabled={cart.length === 0}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: cart.length === 0 ? 'rgba(255,255,255,0.2)' : 'white', padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', borderRadius: '8px', cursor: cart.length === 0 ? 'default' : 'pointer' }}
              >
                Share / Copy Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
