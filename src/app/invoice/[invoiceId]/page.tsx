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

  const CONTACT_EMAIL = BUSINESS.email
  const CONTACT_PHONE = BUSINESS.phone
  const bankName      = BANK.name
  const bankSort      = BANK.sortCode
  const bankAccount   = BANK.account
  const hasBankInfo   = invoice.paymentMethod === 'bank'

  // Resolve discount fields (support both old and new format)
  const discountPct    = invoice.discountPercent ?? (invoice.discount && invoice.subtotal > 0 ? Math.round(invoice.discount / invoice.subtotal * 100) : undefined)
  const discountAmt    = invoice.discountAmount ?? invoice.discount
  const hasDiscount    = discountAmt != null && discountAmt > 0
  const isReturnCustomer = invoice.discountType === 'voucher' && invoice.voucherType === 'return_customer'

  const STATUS_LABEL: Record<string, string> = {
    draft: 'Draft',
    sent:  'Awaiting Payment',
    paid:  'Paid',
  }
  const STATUS_COLOR: Record<string, string> = {
    draft: '#888',
    sent:  '#1d4ed8',
    paid:  '#166534',
  }
  const STATUS_BG: Record<string, string> = {
    draft: '#f3f4f6',
    sent:  '#dbeafe',
    paid:  '#dcfce7',
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; }
          .invoice-shell { box-shadow: none !important; padding: 0 !important; }
          .invoice-watermark { opacity: 0.04 !important; }
        }
        @page { margin: 1.5cm; size: A4; }
      `}</style>

      {/* Top bar */}
      <div className="no-print bg-hunter text-parchment px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-sans text-[0.75rem] uppercase tracking-widest">
          {BUSINESS.name} · Invoice
        </span>
        <div className="flex items-center gap-3">
          <PrintButton />
        </div>
      </div>

      {/* Invoice document */}
      <div className="invoice-shell min-h-screen bg-white py-10 px-6" style={{ position: 'relative' }}>

        {/* Watermark logo */}
        <div className="invoice-watermark" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '120px',
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          color: '#2A5220',
          opacity: 0.04,
          pointerEvents: 'none',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          zIndex: 0,
        }}>
          {BUSINESS.name}
        </div>

        <div className="max-w-[740px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Header ──────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              {/* Logo / brand */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Emblem */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: '#2A5220',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 400 }}>
                      FT
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 400, color: '#1C1C1A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
                      {BUSINESS.name}
                    </p>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      Master Tailors · London
                    </p>
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#888', lineHeight: '1.6', marginTop: '8px' }}>
                {BUSINESS.city}<br />
                {CONTACT_EMAIL}<br />
                {CONTACT_PHONE}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px' }}>
                Invoice
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 400, color: '#1C1C1A', marginBottom: '6px' }}>
                {invoice.number}
              </p>
              <span style={{
                display: 'inline-block',
                background: STATUS_BG[invoice.status],
                color: STATUS_COLOR[invoice.status],
                padding: '3px 12px',
                fontFamily: 'sans-serif',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                {STATUS_LABEL[invoice.status]}
              </span>
            </div>
          </div>

          {/* Decorative rule */}
          <div style={{ height: '3px', background: 'linear-gradient(to right, #2A5220, #EAF0E2)', marginBottom: '32px' }} />

          {/* ── Dates row ────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '1px solid #E8E2D8', borderBottom: '1px solid #E8E2D8', marginBottom: '40px' }}>
            {[
              { label: 'Date Issued', value: fmtDate(invoice.createdAt) },
              { label: 'Due Date',    value: fmtDate(invoice.dueDate) },
              { label: 'Paid',        value: invoice.paidAt ? fmtDate(invoice.paidAt) : '—' },
            ].map(({ label, value }, idx) => (
              <div key={label} style={{
                padding: '16px 20px 16px 0',
                borderRight: idx < 2 ? '1px solid #E8E2D8' : 'none',
                paddingLeft: idx > 0 ? '20px' : '0',
              }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', marginBottom: '4px' }}>
                  {label}
                </p>
                <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', fontWeight: idx === 2 && invoice.paidAt ? 600 : 400 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Bill To ──────────────────────────────────────────── */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '12px' }}>
              Billed To
            </p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#1C1C1A', marginBottom: '4px' }}>
              {invoice.customer.name}
            </p>
            {invoice.customer.address && (
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: '1.6' }}>
                {invoice.customer.address}
              </p>
            )}
            <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: '1.6' }}>
              {invoice.customer.email}
              {invoice.customer.phone ? ` · ${invoice.customer.phone}` : ''}
            </p>
          </div>

          {/* ── Services Table ───────────────────────────────────── */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #2A5220' }}>
                <th style={{ textAlign: 'left', padding: '0 0 10px', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', fontWeight: 400 }}>
                  Service
                </th>
                <th style={{ textAlign: 'right', padding: '0 0 10px', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', fontWeight: 400 }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F0EBE0' }}>
                  <td style={{ padding: '14px 0', fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>
                    £{item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Totals ───────────────────────────────────────────── */}
          <div style={{ borderTop: '1px solid #E8E2D8', marginTop: '0' }}>
            {hasDiscount && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0EBE0' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888' }}>Subtotal</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888' }}>£{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F0EBE0' }}>
                  <div>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#2A5220', fontWeight: 600 }}>
                      {invoice.discountType === 'voucher' && invoice.voucherName
                        ? `${invoice.voucherName}`
                        : 'Discount'}
                      {discountPct ? ` (${discountPct}% off)` : ''}
                    </span>
                    {invoice.voucherCode && (
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#aaa', marginLeft: '8px' }}>
                        {invoice.voucherCode}
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#2A5220', fontWeight: 600 }}>
                    −£{discountAmt!.toFixed(2)}
                  </span>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                Total Due
              </span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: '#1C1C1A', fontWeight: 400 }}>
                £{invoice.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* ── Return customer loyalty message ─────────────────── */}
          {isReturnCustomer && (
            <div style={{
              background: 'linear-gradient(135deg, #EAF0E2 0%, #F5F0E8 100%)',
              border: '1px solid #2A5220',
              borderLeft: '4px solid #2A5220',
              padding: '18px 20px',
              marginBottom: '28px',
              marginTop: '-8px',
            }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2A5220', marginBottom: '6px', fontWeight: 600 }}>
                Loyalty Reward · Returning Customer
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#1C1C1A', lineHeight: '1.6', fontStyle: 'italic' }}>
                Thank you for coming back to {BUSINESS.name}. This exclusive discount has been applied as our way of saying thank you for your continued trust and loyalty.
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#5C5C52', marginTop: '6px' }}>
                We look forward to serving you again. 🤍
              </p>
            </div>
          )}

          {/* ── Payment Details ──────────────────────────────────── */}
          <div style={{ background: '#F5F0E8', padding: '24px', marginTop: hasDiscount && !isReturnCustomer ? '20px' : '8px', marginBottom: '32px', borderLeft: '3px solid #2A5220' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '14px' }}>
              Payment
            </p>
            {invoice.paymentMethod === 'cash' && (
              <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>
                Cash on collection / delivery
              </p>
            )}
            {invoice.paymentMethod === 'mobile' && (
              <div style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '6px' }}>Method: <strong>Mobile Payment</strong></p>
                <p style={{ color: '#5C5C52', fontSize: '13px' }}>
                  Payment collected via mobile / contactless (NFC). No further action required.
                </p>
              </div>
            )}
            {invoice.paymentMethod === 'bank' && (
              <div style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A', lineHeight: '2' }}>
                <p>Method: <strong>Bank Transfer</strong></p>
                {bankName     && <p>Bank: <strong>{bankName}</strong></p>}
                {bankSort     && <p>Sort Code: <strong>{bankSort}</strong></p>}
                {bankAccount  && <p>Account Number: <strong>{bankAccount}</strong></p>}
                {!hasBankInfo && <p style={{ color: '#888', fontStyle: 'italic' }}>Bank details to follow from your tailor.</p>}
                <p style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #D9D3C3' }}>
                  Reference: <strong>{invoice.number}</strong>
                </p>
              </div>
            )}
          </div>

          {/* ── Notes ───────────────────────────────────────────── */}
          {invoice.notes && (
            <div style={{ borderLeft: '3px solid #2A5220', paddingLeft: '16px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px' }}>
                Note from your tailor
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', fontStyle: 'italic', lineHeight: '1.6' }}>
                {invoice.notes}
              </p>
            </div>
          )}

          {/* ── Footer ──────────────────────────────────────────── */}
          <div style={{ borderTop: '2px solid #2A5220', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#2A5220',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '13px' }}>FT</span>
              </div>
              <span style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#888' }}>{BUSINESS.name}</span>
            </div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#888', textAlign: 'right', lineHeight: '1.6' }}>
              Thank you for your trust.{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#2A5220', textDecoration: 'none' }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
