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
        }
        @page { margin: 1.5cm; size: A4; }
      `}</style>

      {/* Top bar — actions, hidden on print */}
      <div className="no-print bg-hunter text-parchment px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-sans text-[0.75rem] uppercase tracking-widest">
          {BUSINESS.name} · Invoice
        </span>
        <div className="flex items-center gap-3">
          <PrintButton />
        </div>
      </div>

      {/* Invoice document */}
      <div className="invoice-shell min-h-screen bg-white py-10 px-6">
        <div className="max-w-[740px] mx-auto">

          {/* ── Header ──────────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p style={{ fontFamily: 'serif', fontSize: '22px', fontWeight: 400, color: '#1C1C1A', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {BUSINESS.name}
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#888', lineHeight: '1.6' }}>
                {BUSINESS.city}<br />
                {CONTACT_EMAIL}<br />
                {CONTACT_PHONE}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px' }}>
                Invoice
              </p>
              <p style={{ fontFamily: 'serif', fontSize: '24px', fontWeight: 400, color: '#1C1C1A', marginBottom: '4px' }}>
                {invoice.number}
              </p>
              <span style={{
                display: 'inline-block',
                background: STATUS_BG[invoice.status],
                color: STATUS_COLOR[invoice.status],
                padding: '2px 10px',
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

          {/* ── Dates row ────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '1px solid #E8E2D8', borderBottom: '1px solid #E8E2D8', marginBottom: '40px' }}>
            {[
              { label: 'Date Issued', value: fmtDate(invoice.createdAt) },
              { label: 'Due Date',    value: fmtDate(invoice.dueDate) },
              { label: 'Paid',        value: invoice.paidAt ? fmtDate(invoice.paidAt) : '—' },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: '16px 0', borderRight: '1px solid #E8E2D8' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', marginBottom: '4px' }}>
                  {label}
                </p>
                <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#1C1C1A' }}>
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
            <p style={{ fontFamily: 'serif', fontSize: '18px', color: '#1C1C1A', marginBottom: '4px' }}>
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
            {invoice.subtotal !== invoice.total && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0EBE0' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888' }}>Subtotal</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888' }}>£{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0EBE0' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888' }}>Discount</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888' }}>−£{(invoice.discount ?? 0).toFixed(2)}</span>
                </div>
              </>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                Total Due
              </span>
              <span style={{ fontFamily: 'serif', fontSize: '32px', color: '#1C1C1A', fontWeight: 400 }}>
                £{invoice.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* ── Payment Details ──────────────────────────────────── */}
          <div style={{ background: '#F5F0E8', padding: '24px', marginTop: '32px', marginBottom: '32px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '14px' }}>
              Payment
            </p>
            {invoice.paymentMethod === 'cash' ? (
              <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1C1C1A' }}>
                Cash on collection / delivery
              </p>
            ) : (
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
          <div style={{ borderTop: '1px solid #E8E2D8', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#888', lineHeight: '1.7' }}>
              Thank you for choosing {BUSINESS.name}.<br />
              For any questions, please contact us at{' '}
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
