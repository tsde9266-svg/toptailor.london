import { notFound } from 'next/navigation'
import { getInvoice } from '@/lib/kv'
import type { Metadata } from 'next'
import type { Invoice } from '@/lib/kv'
import PrintButton from './PrintButton'
import { BUSINESS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Invoice | Fine Tailors',
  robots: { index: false, follow: false },
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

type ParsedItem = {
  original: Invoice['items'][number]
  garment:  string | null
  qty:      number | null
  service:  string
}

type Group = {
  key:     string
  garment: string | null
  qty:     number | null
  items:   ParsedItem[]
}

const KNOWN_GARMENTS = [
  'Wedding Dress', 'Leather Jacket',
  'Trouser', 'Jeans', 'Jacket', 'Coat', 'Shirt',
  'Dress', 'Skirt', 'Waistcoat', 'Suit',
]

function parseOldName(name: string): { garment: string | null; service: string } {
  for (const g of KNOWN_GARMENTS) {
    if (name.toLowerCase().startsWith(g.toLowerCase())) {
      const rest = name.slice(g.length).replace(/^\s*[—\-\s]+/, '').trim()
      return { garment: g, service: rest || name }
    }
  }
  return { garment: null, service: name }
}

function groupInvoiceItems(items: Invoice['items']): Group[] {
  const parsed: ParsedItem[] = items.map(item => {
    if (item.garment) {
      return { original: item, garment: item.garment, qty: item.qty ?? null, service: item.name }
    }
    const match = item.name.match(/^(\d+)[×x]\s*(.+?)(?:\s+[—\-]\s+(.+))?$/)
    if (match && item.qty) {
      return { original: item, garment: match[2].trim(), qty: parseInt(match[1]), service: (match[3] ?? match[2]).trim() }
    }
    const { garment, service } = parseOldName(item.name)
    return { original: item, garment, qty: null, service }
  })

  const seen = new Set<string>()
  const order: string[] = []
  const groups: Record<string, Group> = {}

  for (const p of parsed) {
    const key = p.garment ? `${p.garment}::${p.qty ?? 'any'}` : `__free::${p.service}`
    if (!seen.has(key)) { seen.add(key); order.push(key); groups[key] = { key, garment: p.garment, qty: p.qty, items: [] } }
    groups[key].items.push(p)
  }

  return order.map(k => groups[k])
}

export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {
  let invoice
  try { invoice = await getInvoice(params.invoiceId) } catch { /* storage down */ }
  if (!invoice) notFound()

  const discountAmt      = invoice.discountAmount ?? invoice.discount
  const discountPct      = invoice.discountPercent ?? (discountAmt && invoice.subtotal > 0 ? Math.round(discountAmt / invoice.subtotal * 100) : undefined)
  const hasDiscount      = !!discountAmt && discountAmt > 0
  const isReturnCustomer = invoice.discountType === 'voucher' && invoice.voucherType === 'return_customer'
  const isPaid           = invoice.status === 'paid'

  const groups        = groupInvoiceItems(invoice.items)
  const computedTotal = groups.reduce((sum, g) => sum + (g.qty ?? g.items.length), 0)
  const totalItems    = invoice.itemCount ?? computedTotal

  const contactLine = [invoice.customer.email, invoice.customer.phone].filter(Boolean).join(' · ')

  return (
    <>
      <style>{`
        /* ── Print ───────────────────────────────────────────── */
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
        }
        @page { margin: 0; size: A4 portrait; }

        /* ── Responsive layout classes ───────────────────────── */
        .inv-header    { background: #1A3A12; padding: 28px 40px 24px; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; }
        .inv-body      { max-width: 780px; margin: 0 auto; padding: 36px 40px 52px; }
        .inv-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .inv-number    { color: #F5F0E8; font-family: Georgia, serif; font-size: 28px; margin: 0 0 4px; line-height: 1; }
        .inv-grand     { font-family: Georgia, serif; font-size: 42px; color: #1C1C1A; line-height: 1; }
        .inv-footer    { border-top: 2px solid #1A3A12; padding-top: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .inv-col-ti    { text-align: right; padding: 10px 14px; font-family: sans-serif; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(245,240,232,0.55); font-weight: 400; width: 14%; }
        .inv-td-ti     { padding: 4px 14px; }

        @media (max-width: 600px) {
          .inv-header    { padding: 18px 16px 16px; flex-wrap: wrap; gap: 12px; }
          .inv-brand-name{ font-size: 15px !important; letter-spacing: 0.06em !important; }
          .inv-brand-sub { font-size: 8px !important; }
          .inv-emblem    { width: 40px !important; height: 40px !important; }
          .inv-emblem-txt{ font-size: 15px !important; }
          .inv-number    { font-size: 20px !important; }
          .inv-inv-label { font-size: 8px !important; }
          .inv-inv-date  { font-size: 10px !important; }
          .inv-body      { padding: 22px 14px 40px; }
          .inv-info-grid { grid-template-columns: 1fr; gap: 20px; margin-bottom: 26px; }
          .inv-bill-name { font-size: 18px !important; }
          .inv-grand     { font-size: 32px !important; }
          .inv-footer    { flex-direction: column; align-items: flex-start; gap: 8px; }
          .inv-footer-right { text-align: left !important; }
          .inv-payment   { padding: 16px !important; margin: 20px 0 !important; }
          .inv-notes     { margin-bottom: 24px !important; }
          .inv-paid-stamp{ font-size: 20px !important; padding: 5px 16px !important; border-width: 2px !important; }
        }
      `}</style>

      {/* Top bar */}
      <div className="no-print bg-[#1A3A12] text-parchment/70 px-4 py-3 flex items-center justify-between">
        <span className="font-sans text-[0.6875rem] uppercase tracking-widest">Fine Tailors · Invoice</span>
        <PrintButton />
      </div>

      <div className="bg-white min-h-screen">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="inv-header">
          {/* Decorative rings */}
          <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
            <div className="inv-emblem" style={{ width: '50px', height: '50px', flexShrink: 0, border: '1.5px solid rgba(245,240,232,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="inv-emblem-txt" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', letterSpacing: '0.04em' }}>FT</span>
            </div>
            <div>
              <p className="inv-brand-name" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '20px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 3px', lineHeight: 1 }}>
                {BUSINESS.name}
              </p>
              <p className="inv-brand-sub" style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                Master Tailors · {BUSINESS.city}
              </p>
            </div>
          </div>

          {/* Invoice number / date */}
          <div style={{ textAlign: 'right', zIndex: 1 }}>
            <p className="inv-inv-label" style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 5px' }}>Invoice</p>
            <p className="inv-number">{invoice.number}</p>
            <p className="inv-inv-date" style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'sans-serif', fontSize: '11px', margin: 0 }}>{fmtDate(invoice.createdAt)}</p>
          </div>

          {/* Paid stamp */}
          {isPaid && (
            <div className="inv-paid-stamp" style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%) rotate(-11deg)',
              border: '3px solid rgba(134,239,172,0.65)', color: 'rgba(134,239,172,0.75)',
              padding: '7px 24px', fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 2,
            }}>
              Paid
            </div>
          )}
        </div>

        <div style={{ height: '3px', background: 'linear-gradient(to right, #1A3A12 0%, #5A9A47 40%, #E8E2D8 100%)' }} />

        {/* ── BODY ───────────────────────────────────────────────── */}
        <div className="inv-body">

          {/* Billed To / Dates */}
          <div className="inv-info-grid">
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>
                Billed To
              </p>
              <p className="inv-bill-name" style={{ fontFamily: 'Georgia, serif', fontSize: '21px', color: '#1C1C1A', margin: '0 0 8px', lineHeight: 1.2 }}>
                {invoice.customer.name}
              </p>
              {invoice.customer.address && (
                <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: 1.7, margin: '0 0 2px' }}>
                  {invoice.customer.address}
                </p>
              )}
              {contactLine && (
                <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: 1.7, margin: 0 }}>
                  {contactLine}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Date Issued', value: fmtDate(invoice.createdAt) },
                { label: 'Due Date',    value: fmtDate(invoice.dueDate) },
                ...(isPaid && invoice.paidAt ? [{ label: 'Paid On', value: fmtDate(invoice.paidAt) }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', margin: '0 0 3px' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', margin: 0, fontWeight: label === 'Paid On' ? 600 : 400 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SERVICES TABLE ────────────────────────────────────── */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
              <thead>
                <tr style={{ background: '#1A3A12' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400, width: '22%' }}>
                    Item
                  </th>
                  <th style={{ textAlign: 'center', padding: '10px 8px', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400, width: '8%' }}>
                    Qty
                  </th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400 }}>
                    Service
                  </th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400, width: '16%' }}>
                    Amount
                  </th>
                  <th className="inv-col-ti">
                    Total Items ({totalItems})
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, gi) =>
                  group.items.map((p, si) => {
                    const isFirst    = si === 0
                    const isLast     = si === group.items.length - 1
                    const hasGarment = !!group.garment
                    const rowBg      = gi % 2 === 1 ? '#FDFAF6' : '#ffffff'
                    const displayQty = group.qty ?? group.items.length
                    const itemCell   = hasGarment ? (isFirst ? group.garment! : '') : p.service
                    const qtyCell    = hasGarment && isFirst ? String(displayQty) : ''
                    const serviceCell = hasGarment ? p.service : ''
                    const itemBold   = hasGarment ? isFirst : true
                    return (
                      <tr key={`${gi}-${si}`} style={{
                        borderBottom: isLast ? '1px solid #EDE8DF' : '1px solid #F4F0E8',
                        background: rowBg,
                      }}>
                        <td style={{ padding: isFirst ? '12px 12px 4px' : '4px 12px', fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', verticalAlign: 'top', fontWeight: itemBold ? 500 : 400 }}>
                          {itemCell}
                        </td>
                        <td style={{ padding: isFirst ? '12px 8px 4px' : '4px 8px', fontFamily: 'sans-serif', fontSize: '13px', color: '#777', textAlign: 'center', verticalAlign: 'top' }}>
                          {qtyCell}
                        </td>
                        <td style={{ padding: isFirst ? '12px 12px 4px' : '4px 12px', fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', verticalAlign: 'top' }}>
                          {serviceCell}
                        </td>
                        <td style={{ padding: isFirst ? '12px 12px 4px' : '4px 12px', fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', textAlign: 'right', verticalAlign: 'top' }}>
                          £{p.original.price.toFixed(2)}
                        </td>
                        <td className="inv-td-ti" />
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── TOTALS ─────────────────────────────────────────────── */}
          <div style={{ background: '#F8F5EF', borderTop: '2px solid #1A3A12' }}>
            {hasDiscount && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid #EDE8DF' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#999' }}>Subtotal</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#999' }}>£{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderBottom: '1px solid #EDE8DF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#2A5220', fontWeight: 600 }}>
                      {isReturnCustomer ? '★ Loyalty Reward' : (invoice.voucherName ?? 'Discount')}
                      {discountPct ? ` — ${discountPct}% off` : ''}
                    </span>
                    {invoice.voucherCode && (
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#bbb' }}>{invoice.voucherCode}</span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#2A5220', fontWeight: 600 }}>
                    −£{discountAmt!.toFixed(2)}
                  </span>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '18px 14px' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#777' }}>Total Due</span>
              <span className="inv-grand">£{invoice.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Loyalty */}
          {isReturnCustomer && (
            <div style={{ background: 'linear-gradient(135deg, #EAF0E2, #F5F0E8)', borderLeft: '4px solid #2A5220', padding: '16px 18px', marginTop: '22px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2A5220', fontWeight: 700, margin: '0 0 6px' }}>
                ★ Loyalty Reward — Returning Customer
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: '#1C1C1A', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                Thank you for coming back to {BUSINESS.name}. This exclusive discount has been applied as our way of saying thank you for your continued loyalty.
              </p>
            </div>
          )}

          {/* Payment */}
          <div className="inv-payment" style={{ background: '#F5F0E8', borderLeft: '4px solid #1A3A12', padding: '18px 22px', margin: '24px 0' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 12px' }}>
              Payment
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A', margin: 0 }}>
              {invoice.paymentMethod === 'mobile'
                ? 'Collected via mobile / card (NFC) — no further action required.'
                : 'Cash or card on collection / delivery.'}
            </p>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="inv-notes" style={{ borderLeft: '3px solid #D9D3C3', paddingLeft: '16px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', margin: '0 0 6px' }}>
                Note from your tailor
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#666', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
                {invoice.notes}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="inv-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '26px', height: '26px', background: '#1A3A12', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '10px' }}>FT</span>
              </div>
              <span style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999' }}>
                {BUSINESS.name} · London&apos;s finest tailors, at your door
              </span>
            </div>
            <p className="inv-footer-right" style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999', margin: 0, textAlign: 'right', lineHeight: 1.6 }}>
              <a href={`mailto:${BUSINESS.email}`} style={{ color: '#2A5220', textDecoration: 'none' }}>{BUSINESS.email}</a>
              <span style={{ margin: '0 8px', color: '#ddd' }}>·</span>
              {BUSINESS.phone}
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
