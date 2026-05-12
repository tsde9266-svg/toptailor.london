import { notFound } from 'next/navigation'
import { getInvoice } from '@/lib/kv'
import type { Metadata } from 'next'
import PrintButton from './PrintButton'
import { BUSINESS, BANK } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Invoice | Fine Tailors',
  robots: { index: false, follow: false },
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
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

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
        }
        @page { margin: 1.2cm; size: A4 portrait; }
      `}</style>

      {/* Screen-only top bar */}
      <div className="no-print bg-[#1A3A12] text-parchment/70 px-6 py-3 flex items-center justify-between">
        <span className="font-sans text-[0.6875rem] uppercase tracking-widest">Fine Tailors · Invoice</span>
        <PrintButton />
      </div>

      <div className="bg-white min-h-screen">

        {/* ── HEADER BAND ─────────────────────────────────────────── */}
        <div style={{
          background: '#1A3A12',
          padding: '30px 48px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle texture rings */}
          <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          {/* Left: Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
            <div style={{
              width: '54px', height: '54px', flexShrink: 0,
              border: '1.5px solid rgba(245,240,232,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '20px', letterSpacing: '0.04em' }}>FT</span>
            </div>
            <div>
              <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '21px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 4px', lineHeight: 1 }}>
                {BUSINESS.name}
              </p>
              <p style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                Master Tailors · {BUSINESS.city}
              </p>
            </div>
          </div>

          {/* Right: Invoice number */}
          <div style={{ textAlign: 'right', zIndex: 1 }}>
            <p style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 6px' }}>Invoice</p>
            <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '30px', margin: '0 0 5px', lineHeight: 1 }}>{invoice.number}</p>
            <p style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'sans-serif', fontSize: '11px', margin: 0 }}>{fmtDate(invoice.createdAt)}</p>
          </div>

          {/* PAID stamp — rotated overlay inside header */}
          {isPaid && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%) rotate(-11deg)',
              border: '3px solid rgba(134,239,172,0.65)',
              color: 'rgba(134,239,172,0.75)',
              padding: '7px 24px',
              fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 2,
            }}>
              Paid
            </div>
          )}
        </div>

        {/* Accent gradient line */}
        <div style={{ height: '3px', background: 'linear-gradient(to right, #1A3A12 0%, #5A9A47 40%, #E8E2D8 100%)' }} />

        {/* ── DOCUMENT BODY ───────────────────────────────────────── */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 48px 52px' }}>

          {/* INFO ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '44px' }}>

            {/* Bill To */}
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>
                Billed To
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#1C1C1A', margin: '0 0 8px', lineHeight: 1.2 }}>
                {invoice.customer.name}
              </p>
              {invoice.customer.address && (
                <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: 1.7, margin: '0 0 2px' }}>
                  {invoice.customer.address}
                </p>
              )}
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: 1.7, margin: 0 }}>
                {invoice.customer.email}
                {invoice.customer.phone ? ` · ${invoice.customer.phone}` : ''}
              </p>
            </div>

            {/* Dates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Date Issued', value: fmtDate(invoice.createdAt) },
                { label: 'Due Date',    value: fmtDate(invoice.dueDate) },
                ...(isPaid && invoice.paidAt ? [{ label: 'Paid On', value: fmtDate(invoice.paidAt) }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', margin: '0 0 3px' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', margin: 0, fontWeight: label === 'Paid On' ? 600 : 400 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SERVICES TABLE ───────────────────────────────────── */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0' }}>
            <thead>
              <tr style={{ background: '#1A3A12' }}>
                <th style={{ textAlign: 'left', padding: '11px 16px', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400 }}>
                  Service
                </th>
                <th style={{ textAlign: 'right', padding: '11px 16px', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400 }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EDE8DF', background: i % 2 === 1 ? '#FDFAF6' : '#ffffff' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>
                    £{item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── TOTALS ───────────────────────────────────────────── */}
          <div style={{ background: '#F8F5EF', borderTop: '2px solid #1A3A12' }}>
            {hasDiscount && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #EDE8DF' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#999' }}>Subtotal</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#999' }}>£{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 16px', borderBottom: '1px solid #EDE8DF' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 16px' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#777' }}>
                Total Due
              </span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#1C1C1A', lineHeight: 1 }}>
                £{invoice.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* ── LOYALTY MESSAGE ──────────────────────────────────── */}
          {isReturnCustomer && (
            <div style={{
              background: 'linear-gradient(135deg, #EAF0E2, #F5F0E8)',
              borderLeft: '4px solid #2A5220',
              padding: '16px 20px', marginTop: '24px',
            }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2A5220', fontWeight: 700, margin: '0 0 6px' }}>
                ★ Loyalty Reward — Returning Customer
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: '#1C1C1A', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                Thank you for coming back to {BUSINESS.name}. This exclusive discount has been applied as our way of saying thank you for your continued loyalty.
              </p>
            </div>
          )}

          {/* ── PAYMENT DETAILS ──────────────────────────────────── */}
          <div style={{ background: '#F5F0E8', borderLeft: '4px solid #1A3A12', padding: '20px 24px', margin: '28px 0' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 14px' }}>
              Payment
            </p>
            {invoice.paymentMethod === 'cash' && (
              <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A', margin: 0 }}>
                Cash on collection or delivery.
              </p>
            )}
            {invoice.paymentMethod === 'mobile' && (
              <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A', margin: 0 }}>
                Collected via mobile / contactless — no further action required.
              </p>
            )}
            {invoice.paymentMethod === 'bank' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 20px' }}>
                {[
                  ['Method',       'Bank Transfer'],
                  ['Account Name', BANK.name],
                  ['Sort Code',    BANK.sortCode],
                  ['Account No.',  BANK.account],
                  ['Reference',    invoice.number],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 2px' }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', fontWeight: 600, margin: 0, letterSpacing: label === 'Reference' ? '0.05em' : 'normal' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── NOTES ───────────────────────────────────────────── */}
          {invoice.notes && (
            <div style={{ borderLeft: '3px solid #D9D3C3', paddingLeft: '16px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', margin: '0 0 6px' }}>
                Note from your tailor
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#666', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
                {invoice.notes}
              </p>
            </div>
          )}

          {/* ── FOOTER ───────────────────────────────────────────── */}
          <div style={{ borderTop: '2px solid #1A3A12', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', background: '#1A3A12', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '11px' }}>FT</span>
              </div>
              <span style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999' }}>
                {BUSINESS.name} · London's finest tailors, at your door
              </span>
            </div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999', margin: 0, textAlign: 'right', lineHeight: 1.6 }}>
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
