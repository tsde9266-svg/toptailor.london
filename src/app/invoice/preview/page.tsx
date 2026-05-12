import type { Metadata } from 'next'
import PrintButton from '../[invoiceId]/PrintButton'
import { BUSINESS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Invoice Preview | Fine Tailors',
  robots: { index: false, follow: false },
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const SAMPLE = {
  number:        'FT-2026-007',
  status:        'sent' as 'draft' | 'sent' | 'paid',
  createdAt:     '2026-05-12T10:00:00.000Z',
  dueDate:       '2026-05-19',
  paidAt:        undefined as string | undefined,
  customer: {
    name:    'Syed Muhammad Taqi',
    email:   'taqi@example.com',
    phone:   '+44 7555 861851',
    address: '39 Majuba Road, Witton Street, Birmingham B16 0PD',
  },
  items: [
    { name: 'Suit Jacket — Sleeve Shortening (pair)',  price: 45.00 },
    { name: 'Trouser Hem — Machine Finish (pair)',      price: 20.00 },
    { name: 'Shirt — Collar Tightening',               price: 18.00 },
  ],
  subtotal:        83.00,
  discountPercent: 10,
  discountAmount:  8.30,
  discountType:    'voucher' as const,
  voucherCode:     'LOYAL10',
  voucherName:     'Loyal Customer',
  voucherType:     'return_customer' as const,
  total:           74.70,
  paymentMethod:   'mobile' as const,
  notes:           'A pleasure working with you — your garments will be ready for collection within 5 working days.',
}

export default function InvoicePreviewPage() {
  const invoice = SAMPLE
  const discountAmt      = invoice.discountAmount
  const discountPct      = invoice.discountPercent
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
        @page { margin: 0; size: A4 portrait; }
      `}</style>

      <div className="no-print bg-[#1A3A12] text-parchment/70 px-6 py-3 flex items-center justify-between">
        <span className="font-sans text-[0.6875rem] uppercase tracking-widest">Fine Tailors · Invoice Preview</span>
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
          <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
            <div style={{ width: '54px', height: '54px', flexShrink: 0, border: '1.5px solid rgba(245,240,232,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

          <div style={{ textAlign: 'right', zIndex: 1 }}>
            <p style={{ color: 'rgba(245,240,232,0.45)', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 6px' }}>Invoice</p>
            <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '30px', margin: '0 0 5px', lineHeight: 1 }}>{invoice.number}</p>
            <p style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'sans-serif', fontSize: '11px', margin: 0 }}>{fmtDate(invoice.createdAt)}</p>
          </div>

          {isPaid && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-11deg)', border: '3px solid rgba(134,239,172,0.65)', color: 'rgba(134,239,172,0.75)', padding: '7px 24px', fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 2 }}>
              Paid
            </div>
          )}
        </div>

        <div style={{ height: '3px', background: 'linear-gradient(to right, #1A3A12 0%, #5A9A47 40%, #E8E2D8 100%)' }} />

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 48px 52px' }}>

          {/* INFO ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '44px' }}>
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>Billed To</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#1C1C1A', margin: '0 0 8px', lineHeight: 1.2 }}>{invoice.customer.name}</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: 1.7, margin: '0 0 2px' }}>{invoice.customer.address}</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#5C5C52', lineHeight: 1.7, margin: 0 }}>
                {invoice.customer.email} · {invoice.customer.phone}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Date Issued', value: fmtDate(invoice.createdAt) },
                { label: 'Due Date',    value: fmtDate(invoice.dueDate) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', margin: '0 0 3px' }}>{label}</p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1A3A12' }}>
                <th style={{ textAlign: 'left', padding: '11px 16px', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400 }}>Service</th>
                <th style={{ textAlign: 'right', padding: '11px 16px', fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 400 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EDE8DF', background: i % 2 === 1 ? '#FDFAF6' : '#ffffff' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>{item.name}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>£{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTALS */}
          <div style={{ background: '#F8F5EF', borderTop: '2px solid #1A3A12' }}>
            {hasDiscount && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #EDE8DF' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#999' }}>Subtotal</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#999' }}>£{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 16px', borderBottom: '1px solid #EDE8DF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#2A5220', fontWeight: 600 }}>
                      {isReturnCustomer ? '★ Loyalty Reward' : (invoice.voucherName ?? 'Discount')}
                      {discountPct ? ` — ${discountPct}% off` : ''}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#bbb' }}>{invoice.voucherCode}</span>
                  </div>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#2A5220', fontWeight: 600 }}>−£{discountAmt!.toFixed(2)}</span>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 16px' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#777' }}>Total Due</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#1C1C1A', lineHeight: 1 }}>£{invoice.total.toFixed(2)}</span>
            </div>
          </div>

          {/* LOYALTY */}
          {isReturnCustomer && (
            <div style={{ background: 'linear-gradient(135deg, #EAF0E2, #F5F0E8)', borderLeft: '4px solid #2A5220', padding: '16px 20px', marginTop: '24px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2A5220', fontWeight: 700, margin: '0 0 6px' }}>
                ★ Loyalty Reward — Returning Customer
              </p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: '#1C1C1A', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                Thank you for coming back to {BUSINESS.name}. This exclusive discount has been applied as our way of saying thank you for your continued loyalty.
              </p>
            </div>
          )}

          {/* PAYMENT */}
          <div style={{ background: '#F5F0E8', borderLeft: '4px solid #1A3A12', padding: '20px 24px', margin: '28px 0' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 14px' }}>Payment</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A', margin: 0 }}>
              Collected via mobile / card (NFC) — no further action required.
            </p>
          </div>

          {/* NOTES */}
          {invoice.notes && (
            <div style={{ borderLeft: '3px solid #D9D3C3', paddingLeft: '16px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', margin: '0 0 6px' }}>Note from your tailor</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#666', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>{invoice.notes}</p>
            </div>
          )}

          {/* FOOTER */}
          <div style={{ borderTop: '2px solid #1A3A12', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', background: '#1A3A12', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '11px' }}>FT</span>
              </div>
              <span style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#999' }}>{BUSINESS.name} · London&apos;s finest tailors, at your door</span>
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
