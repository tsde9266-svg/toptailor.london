'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { services } from '@/data/services'
import {
  Ruler, Shirt, Sparkles, PenLine, ArrowLeft, ArrowRight,
  X, MoreHorizontal, ShoppingBag, Share2,
} from 'lucide-react'

// ── Design tokens (Atelier Precise) ────────────────────────────────────────────
const C = {
  bg:           '#f9faf4',
  surface:      '#ffffff',
  surfaceLow:   '#f3f4ef',
  surfaceMid:   '#edeee9',
  primary:      '#023616',
  primCont:     '#1e4d2b',
  onPrimary:    '#ffffff',
  onSurface:    '#191c19',
  onVariant:    '#414941',
  outline:      '#717970',
  outlineVar:   '#c1c9be',
  error:        '#ba1a1a',
}

// ── Category config ─────────────────────────────────────────────────────────
type CatConfig = {
  label:      string
  Icon:       React.ElementType
  iconBg:     string
  iconColor:  string
  pipColor:   string
  tabActive:  string
  cardBorder: string
  priceColor: string
  bannerBg:   string
  bannerText: string
}

const CATS: Record<string, CatConfig> = {
  trousers: {
    label: 'Trousers', Icon: Ruler,
    iconBg: '#eff6ff', iconColor: '#2563eb', pipColor: '#3b82f6',
    tabActive: '#3b82f6', cardBorder: '#bfdbfe', priceColor: '#1d4ed8',
    bannerBg: 'rgba(239,246,255,0.7)', bannerText: '#1e40af',
  },
  jacket: {
    label: 'Jackets & Coats', Icon: Shirt,
    iconBg: '#ecfdf5', iconColor: '#059669', pipColor: '#10b981',
    tabActive: '#10b981', cardBorder: '#a7f3d0', priceColor: '#065f46',
    bannerBg: 'rgba(236,253,245,0.7)', bannerText: '#065f46',
  },
  dress: {
    label: 'Dresses', Icon: Sparkles,
    iconBg: '#fff1f2', iconColor: '#e11d48', pipColor: '#ec4899',
    tabActive: '#ec4899', cardBorder: '#fecdd3', priceColor: '#be185d',
    bannerBg: 'rgba(255,241,242,0.7)', bannerText: '#9d174d',
  },
  custom: {
    label: 'Custom', Icon: PenLine,
    iconBg: '#f5f3ff', iconColor: '#7c3aed', pipColor: '#8b5cf6',
    tabActive: '#8b5cf6', cardBorder: '#ddd6fe', priceColor: '#6d28d9',
    bannerBg: 'rgba(245,243,255,0.7)', bannerText: '#5b21b6',
  },
}

const CATEGORY_ORDER = ['trousers', 'jacket', 'dress', 'custom'] as const
const DISCOUNT_PRESETS = [5, 10, 15, 20, 25, 30]

let _uid = 0
function uid() { return String(++_uid) }

type Item = { id: string; name: string; price: number; catId: string }

// ── Icon Box component ────────────────────────────────────────────────────────
function IconBox({
  Icon, bg, color, size = 'sm',
}: { Icon: React.ElementType; bg: string; color: string; size?: 'sm' | 'md' }) {
  const dim   = size === 'md' ? 36 : 28
  const iSize = size === 'md' ? 16 : 13
  return (
    <div style={{
      width: dim, height: dim, borderRadius: 10,
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon size={iSize} color={color} strokeWidth={2.2} />
    </div>
  )
}

// ── Cart item row ─────────────────────────────────────────────────────────────
function CartRow({ item, index, onRemove, cat }: {
  item: Item; index: number; onRemove: () => void; cat: CatConfig
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px',
      background: index % 2 === 0 ? 'rgba(255,255,255,0.45)' : 'transparent',
      borderBottom: `1px solid ${C.outlineVar}1a`,
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = C.surface)}
      onMouseLeave={e => (e.currentTarget.style.background = index % 2 === 0 ? 'rgba(255,255,255,0.45)' : 'transparent')}
    >
      <span style={{ fontSize: 11, fontWeight: 600, color: `${C.onVariant}66`, minWidth: 20, letterSpacing: '0.05em' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: C.onSurface, margin: 0, lineHeight: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </p>
        <p style={{ fontSize: 11, color: C.onVariant, margin: 0 }}>{cat.label}</p>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.onSurface, flexShrink: 0 }}>
        £{item.price.toFixed(2)}
      </span>
      <button
        onClick={onRemove}
        style={{
          width: 32, height: 32, borderRadius: '50%', border: 'none',
          background: 'transparent', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#ffdad6'; (e.currentTarget.querySelector('svg') as SVGElement | null)?.setAttribute('color', '#93000a') }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; (e.currentTarget.querySelector('svg') as SVGElement | null)?.setAttribute('color', C.onVariant) }}
      >
        <X size={16} color={C.onVariant} strokeWidth={2} />
      </button>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function POSCalculator() {
  const router                        = useRouter()
  const [cart, setCart]               = useState<Item[]>([])
  const [activeCat, setActiveCat]     = useState<typeof CATEGORY_ORDER[number]>('trousers')
  const [discountPct, setDiscountPct] = useState(0)
  const [customName, setCustomName]   = useState('')
  const [customPrice, setCustomPrice] = useState('')
  const [copied, setCopied]           = useState(false)
  const [showCart, setShowCart]       = useState(false)
  const customNameRef                 = useRef<HTMLInputElement>(null)

  function goToInvoice() {
    sessionStorage.setItem('pos_draft', JSON.stringify({
      items: cart.map(i => ({ name: i.name, price: i.price })),
      discountPercent: discountPct,
    }))
    router.push('/admin/invoice/new')
  }

  const cat = CATS[activeCat]

  // Build service list for active category
  const catServices = activeCat === 'custom'
    ? []
    : (services.find(s => s.id === activeCat)?.items ?? []).filter(i => i.price > 0)

  function addItem(name: string, price: number) {
    setCart(p => [...p, { id: uid(), name, price, catId: activeCat }])
  }
  function removeItem(id: string) { setCart(p => p.filter(i => i.id !== id)) }
  function clearAll() { setCart([]); setDiscountPct(0); setCustomName(''); setCustomPrice('') }

  function addCustom() {
    const price = parseFloat(customPrice)
    if (!customName.trim() || !price || price <= 0) return
    addItem(customName.trim(), price)
    setCustomName('')
    setCustomPrice('')
    customNameRef.current?.focus()
  }

  async function shareQuote() {
    const lines = cart.map((i, n) => `${n + 1}. ${i.name} — £${i.price.toFixed(2)}`).join('\n')
    const text  = `FINE TAILORS — PRICE QUOTE\n${'─'.repeat(30)}\n${lines}\n${'─'.repeat(30)}\nSubtotal: £${subtotal.toFixed(2)}${discountAmt > 0 ? `\nDiscount (${discountPct}%): −£${discountAmt.toFixed(2)}` : ''}\nTOTAL: £${total.toFixed(2)}`
    if (navigator.share) { navigator.share({ title: 'Fine Tailors Quote', text }) }
    else { await navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const subtotal    = cart.reduce((s, i) => s + i.price, 0)
  const discountAmt = discountPct > 0 ? Math.round(subtotal * discountPct) / 100 : 0
  const total       = Math.max(0, subtotal - discountAmt)

  // ── Cart panel (shared between desktop sidebar + mobile sheet) ───────────────
  const CartPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Cart header */}
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${C.outlineVar}1a` }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.onSurface, display: 'flex', alignItems: 'center', gap: 8 }}>
          Order
          <span style={{ background: C.primCont, color: '#8bbd92', padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
            {cart.length}
          </span>
        </h2>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.onVariant }}>
          <MoreHorizontal size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {cart.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <ShoppingBag size={32} color={`${C.outlineVar}`} strokeWidth={1} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 13, color: C.onVariant, margin: 0 }}>Tap items to add them</p>
          </div>
        ) : (
          cart.map((item, idx) => (
            <CartRow
              key={item.id}
              item={item}
              index={idx}
              onRemove={() => removeItem(item.id)}
              cat={CATS[item.catId] ?? cat}
            />
          ))
        )}
      </div>

      {/* Discount */}
      <div style={{ padding: '14px 16px', borderTop: `1px solid ${C.outlineVar}26`, background: 'rgba(255,255,255,0.3)' }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.onVariant, display: 'block', marginBottom: 10 }}>
          Discount
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 10 }}>
          <button
            onClick={() => setDiscountPct(0)}
            style={{ padding: '6px 14px', borderRadius: 999, border: `1px solid ${C.outlineVar}4d`, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: discountPct === 0 ? C.primary : 'transparent', color: discountPct === 0 ? C.onPrimary : C.onVariant, transition: 'all 0.15s' }}
          >
            None
          </button>
          {DISCOUNT_PRESETS.map(p => (
            <button
              key={p}
              onClick={() => setDiscountPct(p)}
              style={{ padding: '6px 14px', borderRadius: 999, border: `1px solid ${C.outlineVar}4d`, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: discountPct === p ? C.primary : 'transparent', color: discountPct === p ? C.onPrimary : C.onVariant, transition: 'all 0.15s' }}
            >
              {p}%
            </button>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <label style={{ position: 'absolute', top: -8, left: 10, background: C.surface, padding: '0 4px', fontSize: 11, color: C.onVariant, zIndex: 1 }}>
            Custom %
          </label>
          <input
            type="number" min="0" max="100"
            value={discountPct > 0 && !DISCOUNT_PRESETS.includes(discountPct) ? discountPct : ''}
            onChange={e => setDiscountPct(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
            placeholder="Enter amount"
            style={{ width: '100%', border: `1px solid ${C.outlineVar}33`, borderRadius: 8, padding: '12px 14px', fontSize: 13, outline: 'none', background: 'rgba(255,255,255,0.5)', color: C.onSurface, boxSizing: 'border-box' as const }}
          />
        </div>
      </div>

      {/* Totals */}
      <div style={{ padding: '16px', background: C.surface, borderTop: `1px solid ${C.outlineVar}33` }}>
        {discountAmt > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.onVariant }}>Subtotal</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.onSurface }}>£{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: C.onVariant }}>Discount ({discountPct}%)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.error }}>−£{discountAmt.toFixed(2)}</span>
            </div>
          </>
        )}
        <div style={{ paddingTop: 14, borderTop: `1px solid ${C.outlineVar}0d`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.onVariant, paddingBottom: 6 }}>Total</span>
          <span style={{ fontSize: 44, fontWeight: 600, color: C.primary, lineHeight: 1, letterSpacing: '-0.02em' }}>
            £{total.toFixed(2)}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <button
            onClick={goToInvoice}
            disabled={cart.length === 0}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: cart.length === 0 ? '#ccc' : C.primary, color: C.onPrimary, border: 'none', padding: '15px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: cart.length === 0 ? 'default' : 'pointer', boxShadow: cart.length === 0 ? 'none' : '0 4px 14px rgba(2,54,22,0.25)', transition: 'all 0.15s' }}
          >
            Create Invoice <ArrowRight size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={shareQuote}
            disabled={cart.length === 0}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', border: `1.5px solid ${C.outline}`, color: cart.length === 0 ? C.outlineVar : C.onVariant, padding: '13px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: cart.length === 0 ? 'default' : 'pointer', transition: 'all 0.15s' }}
          >
            {copied ? '✓ Copied!' : <><Share2 size={15} strokeWidth={2} /> Share Quote</>}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ height: '100svh', display: 'flex', flexDirection: 'column', background: C.bg, fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>

      {/* ── Top app bar ──────────────────────────────────────────────────────── */}
      <header style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: C.surface, borderBottom: `1px solid ${C.outlineVar}26`, flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', color: C.primary, textDecoration: 'none' }}>
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
          <span style={{ fontSize: 18, fontWeight: 700, color: C.primary, letterSpacing: '-0.01em' }}>Fine Tailors</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Desktop nav — hidden on mobile */}
          <nav style={{ display: 'flex', gap: 24 }} className="hidden md:flex">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.primary }}>Catalog</span>
            <Link href="/admin/invoices" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: C.onVariant, textDecoration: 'none' }}>Invoices</Link>
          </nav>

          {/* Mobile: cart badge button */}
          <button
            onClick={() => setShowCart(v => !v)}
            className="flex md:hidden"
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: C.primary, padding: 4 }}
          >
            <ShoppingBag size={22} strokeWidth={1.8} />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: -2, right: -4, background: C.primCont, color: '#8bbd92', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cart.length}
              </span>
            )}
          </button>

          {cart.length > 0 && (
            <button
              onClick={clearAll}
              style={{ padding: '7px 16px', borderRadius: 999, border: `1px solid ${C.outlineVar}4d`, fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', background: 'transparent', color: C.onVariant, cursor: 'pointer', transition: 'all 0.15s' }}
            >
              Clear
            </button>
          )}
        </div>
      </header>

      {/* ── Body (desktop: side-by-side | mobile: stacked) ───────────────────── */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* ── LEFT PANEL: catalog ───────────────────────────────────────── */}
        <section style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: C.surface }} className="w-full md:w-[65%]">

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${C.outlineVar}1a`, padding: '0 16px', overflowX: 'auto', flexShrink: 0 }}>
            {CATEGORY_ORDER.map(id => {
              const c      = CATS[id]
              const active = activeCat === id
              return (
                <button
                  key={id}
                  onClick={() => setActiveCat(id)}
                  style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           8,
                    padding:       '14px 16px',
                    border:        'none',
                    borderBottom:  `2.5px solid ${active ? c.tabActive : 'transparent'}`,
                    background:    'transparent',
                    cursor:        'pointer',
                    whiteSpace:    'nowrap',
                    transition:    'all 0.15s',
                    color:         active ? C.onSurface : C.onVariant,
                    fontWeight:    active ? 600 : 500,
                    fontSize:      13,
                    fontFamily:    'Inter, system-ui, sans-serif',
                  }}
                >
                  {/* Icon box */}
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: active ? c.iconBg : `${C.surfaceMid}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s', flexShrink: 0 }}>
                    <c.Icon size={14} color={active ? c.iconColor : C.outlineVar} strokeWidth={2.2} />
                  </div>
                  {c.label}
                </button>
              )
            })}
          </div>

          {/* Category banner strip */}
          {activeCat !== 'custom' && (
            <div style={{ background: cat.bannerBg, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${C.outlineVar}0d`, flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.pipColor, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: cat.bannerText }}>
                {cat.label}: tap to add to quote
              </span>
            </div>
          )}

          {/* Grid / Custom form */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {activeCat === 'custom' ? (

              /* Custom item form */
              <div style={{ maxWidth: 480 }}>
                <div style={{ background: C.surface, borderRadius: 16, padding: 20, border: `1px solid ${C.outlineVar}26`, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <IconBox Icon={PenLine} bg={CATS.custom.iconBg} color={CATS.custom.iconColor} size="md" />
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.onSurface }}>Add Custom Item</p>
                      <p style={{ margin: 0, fontSize: 11, color: C.onVariant }}>Enter a service not in the catalog</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input
                      ref={customNameRef}
                      value={customName}
                      onChange={e => setCustomName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCustom()}
                      placeholder="Service description"
                      style={{ border: `1.5px solid ${C.outlineVar}4d`, borderRadius: 10, padding: '12px 14px', fontSize: 14, outline: 'none', color: C.onSurface, fontFamily: 'Inter, system-ui, sans-serif', transition: 'border-color 0.15s' }}
                      onFocus={e => (e.target.style.borderColor = CATS.custom.iconColor)}
                      onBlur={e => (e.target.style.borderColor = `${C.outlineVar}4d`)}
                    />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: C.outlineVar, fontWeight: 700, fontSize: 15 }}>£</span>
                        <input
                          type="number" min="0" step="1"
                          value={customPrice}
                          onChange={e => setCustomPrice(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addCustom()}
                          placeholder="0"
                          style={{ border: `1.5px solid ${C.outlineVar}4d`, borderRadius: 10, padding: '12px 14px 12px 28px', fontSize: 15, fontWeight: 600, outline: 'none', width: '100%', color: C.onSurface, fontFamily: 'Inter, system-ui, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                          onFocus={e => (e.target.style.borderColor = CATS.custom.iconColor)}
                          onBlur={e => (e.target.style.borderColor = `${C.outlineVar}4d`)}
                        />
                      </div>
                      <button
                        onClick={addCustom}
                        style={{ background: CATS.custom.iconColor, border: 'none', color: '#fff', padding: '0 22px', fontSize: 14, fontWeight: 700, borderRadius: 10, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick price chips */}
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.onVariant, marginBottom: 10 }}>Quick prices</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[5, 8, 10, 15, 18, 20, 25, 28, 30, 35, 45, 50, 65, 75].map(p => (
                    <button
                      key={p}
                      onClick={() => setCustomPrice(String(p))}
                      style={{
                        background:    customPrice === String(p) ? CATS.custom.iconColor : C.surface,
                        border:        `1.5px solid ${customPrice === String(p) ? CATS.custom.iconColor : C.outlineVar}4d`,
                        color:         customPrice === String(p) ? '#fff' : C.onSurface,
                        padding:       '7px 14px',
                        fontSize:      13,
                        fontWeight:    600,
                        borderRadius:  999,
                        cursor:        'pointer',
                        transition:    'all 0.15s',
                        fontFamily:    'Inter, system-ui, sans-serif',
                      }}
                    >
                      £{p}
                    </button>
                  ))}
                </div>
              </div>

            ) : (

              /* Service card grid */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {catServices.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => addItem(item.name, item.price)}
                    style={{
                      background:    C.surface,
                      border:        `1px solid ${C.outlineVar}26`,
                      borderRadius:  16,
                      padding:       '18px 16px',
                      textAlign:     'left',
                      cursor:        'pointer',
                      display:       'flex',
                      flexDirection: 'column',
                      justifyContent:'space-between',
                      minHeight:     140,
                      boxShadow:     '0 4px 12px rgba(0,0,0,0.03)',
                      transition:    'all 0.15s',
                      fontFamily:    'Inter, system-ui, sans-serif',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = cat.cardBorder
                      e.currentTarget.style.boxShadow  = `0 6px 18px ${cat.pipColor}22`
                      e.currentTarget.style.transform  = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `${C.outlineVar}26`
                      e.currentTarget.style.boxShadow  = '0 4px 12px rgba(0,0,0,0.03)'
                      e.currentTarget.style.transform  = 'translateY(0)'
                    }}
                    onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)' }}
                    onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.onSurface, lineHeight: '18px' }}>
                        {item.name}
                      </span>
                      {/* Premium icon box — category indicator */}
                      <IconBox Icon={cat.Icon} bg={cat.iconBg} color={cat.iconColor} />
                    </div>
                    <span style={{ fontSize: 22, fontWeight: 600, color: cat.priceColor, lineHeight: '28px' }}>
                      £{item.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── RIGHT PANEL: cart (desktop only) ─────────────────────────── */}
        <aside
          className="hidden md:flex"
          style={{ width: 380, flexDirection: 'column', background: C.surfaceLow, borderLeft: `1px solid ${C.outlineVar}26`, boxShadow: '-4px 0 12px rgba(0,0,0,0.02)', flexShrink: 0 }}
        >
          {CartPanel}
        </aside>

      </main>

      {/* ── Mobile: sticky bottom bar ────────────────────────────────────────── */}
      <div className="flex md:hidden" style={{ background: C.surface, borderTop: `1px solid ${C.outlineVar}26`, padding: '12px 16px', flexShrink: 0, gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.onVariant }}>Total</p>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: C.primary, lineHeight: 1 }}>£{total.toFixed(2)}</p>
        </div>
        <button
          onClick={() => setShowCart(true)}
          style={{ background: C.surfaceLow, border: `1px solid ${C.outlineVar}4d`, color: C.onVariant, padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Order ({cart.length})
        </button>
        <button
          onClick={goToInvoice}
          disabled={cart.length === 0}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: cart.length === 0 ? '#ccc' : C.primary, color: C.onPrimary, border: 'none', padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, system-ui, sans-serif', cursor: cart.length === 0 ? 'default' : 'pointer' }}
        >
          Invoice <ArrowRight size={15} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Mobile: cart sheet overlay ───────────────────────────────────────── */}
      {showCart && (
        <div
          className="flex md:hidden"
          style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(25,28,25,0.5)' }}
          onClick={() => setShowCart(false)}
        >
          <div
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.surfaceLow, borderRadius: '20px 20px 0 0', maxHeight: '90svh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: 40, height: 4, borderRadius: 999, background: C.outlineVar }} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {CartPanel}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
