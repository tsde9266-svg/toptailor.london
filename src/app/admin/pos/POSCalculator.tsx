'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { services } from '@/data/services'

type Item = { id: string; name: string; price: number }

type Category = {
  category:  string
  icon:      string
  bg:        string
  accent:    string
  light:     string
  border:    string
  items:     Array<{ name: string; price: number }>
}

const CATEGORY_STYLE: Record<string, Omit<Category, 'category' | 'items'>> = {
  trousers: { icon: '👖', bg: '#3b82f6', accent: '#1d4ed8', light: '#eff6ff', border: '#bfdbfe' },
  jacket:   { icon: '🧥', bg: '#10b981', accent: '#065f46', light: '#ecfdf5', border: '#a7f3d0' },
  dress:    { icon: '👗', bg: '#ec4899', accent: '#9d174d', light: '#fdf2f8', border: '#fbcfe8' },
}

const QUICK_ITEMS: Category[] = [
  ...(['trousers', 'jacket', 'dress'] as const).flatMap(id => {
    const s   = CATEGORY_STYLE[id]
    const cat = services.find(c => c.id === id)
    if (!cat) return []
    return [{ ...s, category: cat.name, items: cat.items.filter(i => i.price > 0).map(i => ({ name: i.name, price: i.price })) }]
  }),
  { category: 'Custom', icon: '✂️', bg: '#8b5cf6', accent: '#4c1d95', light: '#f5f3ff', border: '#ddd6fe', items: [] },
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
  const [copied, setCopied]                 = useState(false)
  const customNameRef                       = useRef<HTMLInputElement>(null)

  function addItem(name: string, price: number) {
    setCart(p => [...p, { id: uid(), name, price }])
  }
  function removeItem(id: string) { setCart(p => p.filter(i => i.id !== id)) }

  function addCustom() {
    const price = parseFloat(customPrice)
    if (!customName.trim() || !price || price <= 0) return
    addItem(customName.trim(), price)
    setCustomName('')
    setCustomPrice('')
    customNameRef.current?.focus()
  }

  function clearAll() { setCart([]); setDiscountPct(0) }

  async function shareQuote() {
    const lines   = cart.map((i, idx) => `${idx + 1}. ${i.name} — £${i.price}`).join('\n')
    const summary = `FINE TAILORS — PRICE QUOTE\n${'─'.repeat(32)}\n${lines}\n${'─'.repeat(32)}\nSubtotal: £${subtotal.toFixed(2)}${discountAmt > 0 ? `\nDiscount (${discountPct}%): −£${discountAmt.toFixed(2)}` : ''}\nTOTAL: £${total.toFixed(2)}`
    if (navigator.share) {
      navigator.share({ title: 'Fine Tailors Quote', text: summary })
    } else {
      await navigator.clipboard?.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const subtotal    = cart.reduce((s, i) => s + i.price, 0)
  const discountAmt = discountPct > 0 ? Math.round(subtotal * discountPct) / 100 : 0
  const total       = Math.max(0, subtotal - discountAmt)
  const cat         = QUICK_ITEMS[activeCategory]
  const isCustom    = cat.items.length === 0

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/admin" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            ← Admin
          </Link>
          <div style={{ width: '1px', height: '18px', background: '#e2e8f0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: '#2A5220', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#F5F0E8', fontSize: '14px' }}>✂️</span>
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1 }}>Quick Calc</p>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, letterSpacing: '0.05em' }}>Fine Tailors POS</p>
            </div>
          </div>
        </div>
        {cart.length > 0 && (
          <button onClick={clearAll} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '6px 14px', fontSize: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Clear All
          </button>
        )}
      </div>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px', overflow: 'hidden', minHeight: 0 }}>

        {/* ── Left: item picker ─────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' }}>

          {/* Category tabs */}
          <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
            {QUICK_ITEMS.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                style={{
                  padding:       '12px 18px',
                  border:        'none',
                  borderBottom:  activeCategory === i ? `3px solid ${c.bg}` : '3px solid transparent',
                  background:    'transparent',
                  color:         activeCategory === i ? c.bg : '#64748b',
                  fontWeight:    activeCategory === i ? 700 : 500,
                  fontSize:      '13px',
                  cursor:        'pointer',
                  whiteSpace:    'nowrap',
                  transition:    'all 0.15s',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '6px',
                }}
              >
                <span style={{ fontSize: '16px' }}>{c.icon}</span>
                {c.category}
              </button>
            ))}
          </div>

          {/* Category header strip */}
          {!isCustom && (
            <div style={{ padding: '12px 16px', background: cat.light, borderBottom: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: cat.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                {cat.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: cat.accent }}>{cat.category}</p>
                <p style={{ margin: 0, fontSize: '11px', color: cat.bg }}>Tap to add to quote</p>
              </div>
            </div>
          )}

          {/* Items grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {isCustom ? (
              <div style={{ maxWidth: '500px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    ✂️ Add Custom Item
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      ref={customNameRef}
                      value={customName}
                      onChange={e => setCustomName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCustom()}
                      placeholder="Service description…"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', outline: 'none', color: '#0f172a', transition: 'border-color 0.15s' }}
                      onFocus={e => (e.target.style.borderColor = '#8b5cf6')}
                      onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 700, fontSize: '15px' }}>£</span>
                        <input
                          type="number" min="0" step="1"
                          value={customPrice}
                          onChange={e => setCustomPrice(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addCustom()}
                          placeholder="0"
                          style={{ border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '12px 14px 12px 28px', fontSize: '15px', outline: 'none', width: '100%', color: '#0f172a' }}
                          onFocus={e => (e.target.style.borderColor = '#8b5cf6')}
                          onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                        />
                      </div>
                      <button
                        onClick={addCustom}
                        style={{ background: '#8b5cf6', border: 'none', color: 'white', padding: '12px 22px', fontSize: '14px', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick prices */}
                <div style={{ marginTop: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
                    Quick prices
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[5, 8, 10, 15, 18, 20, 25, 28, 30, 35, 45, 50, 65, 75].map(p => (
                      <button
                        key={p}
                        onClick={() => setCustomPrice(String(p))}
                        style={{
                          background:   customPrice === String(p) ? '#8b5cf6' : 'white',
                          border:       `1.5px solid ${customPrice === String(p) ? '#8b5cf6' : '#e2e8f0'}`,
                          color:        customPrice === String(p) ? 'white' : '#374151',
                          padding:      '7px 14px',
                          fontSize:     '13px',
                          fontWeight:   600,
                          borderRadius: '8px',
                          cursor:       'pointer',
                          transition:   'all 0.15s',
                        }}
                      >
                        £{p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                {cat.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => addItem(item.name, item.price)}
                    style={{
                      background:   'white',
                      border:       `1.5px solid #e2e8f0`,
                      borderRadius: '10px',
                      padding:      '14px',
                      textAlign:    'left',
                      cursor:       'pointer',
                      transition:   'all 0.15s',
                      display:      'flex',
                      flexDirection:'column',
                      gap:          '8px',
                      boxShadow:    '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = cat.bg
                      e.currentTarget.style.boxShadow  = `0 4px 12px ${cat.bg}22`
                      e.currentTarget.style.transform  = 'translateY(-1px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#e2e8f0'
                      e.currentTarget.style.boxShadow  = '0 1px 3px rgba(0,0,0,0.04)'
                      e.currentTarget.style.transform  = 'translateY(0)'
                    }}
                  >
                    <span style={{ fontSize: '12px', lineHeight: '1.4', color: '#374151', fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: cat.bg }}>£{item.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right: cart & total ───────────────────────────────── */}
        <div style={{ background: 'white', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '-2px 0 8px rgba(0,0,0,0.04)' }}>

          {/* Cart header */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', letterSpacing: '0.04em' }}>
              🛒 Cart
            </span>
            <span style={{ background: cart.length ? '#2A5220' : '#e2e8f0', color: cart.length ? 'white' : '#94a3b8', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', minWidth: '24px', textAlign: 'center' }}>
              {cart.length}
            </span>
          </div>

          {/* Cart items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px', opacity: 0.3 }}>🧵</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Tap any item to add it</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {cart.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '8px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 700, minWidth: '18px' }}>{idx + 1}</span>
                    <span style={{ flex: 1, fontSize: '12px', color: '#374151', lineHeight: '1.4', fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#2A5220', minWidth: '44px', textAlign: 'right' }}>£{item.price}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', width: '24px', height: '24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount section */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
              Discount
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
              <button
                onClick={() => setDiscountPct(0)}
                style={{ background: discountPct === 0 ? '#0f172a' : 'white', border: `1.5px solid ${discountPct === 0 ? '#0f172a' : '#e2e8f0'}`, color: discountPct === 0 ? 'white' : '#374151', padding: '5px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}
              >
                None
              </button>
              {DISCOUNT_PRESETS.map(pct => (
                <button
                  key={pct}
                  onClick={() => setDiscountPct(pct)}
                  style={{ background: discountPct === pct ? '#10b981' : 'white', border: `1.5px solid ${discountPct === pct ? '#10b981' : '#e2e8f0'}`, color: discountPct === pct ? 'white' : '#374151', padding: '5px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="number" min="0" max="100"
                value={discountPct || ''}
                onChange={e => setDiscountPct(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                placeholder="Custom"
                style={{ border: '1.5px solid #e2e8f0', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', outline: 'none', width: '80px', color: '#0f172a' }}
              />
              <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 500 }}>% off</span>
            </div>
          </div>

          {/* Totals */}
          <div style={{ padding: '14px 16px', background: 'white', borderTop: '2px solid #f1f5f9' }}>
            {discountAmt > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>Subtotal</span>
                  <span style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>£{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600 }}>Discount {discountPct}%</span>
                  <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 700 }}>−£{discountAmt.toFixed(2)}</span>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: discountAmt > 0 ? '1px solid #f1f5f9' : 'none', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Total</span>
              <span style={{ fontSize: '36px', fontWeight: 900, color: '#2A5220', lineHeight: 1 }}>
                £{total.toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cart.length > 0 && (
                <a
                  href="/admin/invoice/new"
                  style={{ display: 'block', background: '#2A5220', color: 'white', textDecoration: 'none', padding: '13px', textAlign: 'center', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '10px' }}
                >
                  Create Invoice →
                </a>
              )}
              <button
                onClick={shareQuote}
                disabled={cart.length === 0}
                style={{
                  background:   cart.length === 0 ? '#f8fafc' : 'white',
                  border:       `1.5px solid ${cart.length === 0 ? '#e2e8f0' : '#2A5220'}`,
                  color:        cart.length === 0 ? '#cbd5e1' : '#2A5220',
                  padding:      '12px',
                  textAlign:    'center',
                  fontSize:     '13px',
                  fontWeight:   700,
                  borderRadius: '10px',
                  cursor:       cart.length === 0 ? 'default' : 'pointer',
                }}
              >
                {copied ? '✓ Copied!' : '📋 Share / Copy Quote'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
