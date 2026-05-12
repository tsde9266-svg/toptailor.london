// Server-side only — never import this in a client component.
import {
  Document, Page, View, Text, StyleSheet,
} from '@react-pdf/renderer'
import type { Invoice } from './kv'
import { BUSINESS, BANK } from './constants'

const GREEN  = '#1A3A12'
const GREEN2 = '#2A5220'
const PARCH  = '#F5F0E8'
const PARCH2 = '#F8F5EF'
const DARK   = '#1C1C1A'
const MUTED  = '#888888'
const FAINT  = '#bbbbbb'
const DIVID  = '#EDE8DF'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const s = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontFamily: 'Helvetica', fontSize: 10, color: DARK },

  // ── Header ──────────────────────────────────────────────────────
  header: { backgroundColor: GREEN, paddingHorizontal: 40, paddingVertical: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  emblem: { width: 44, height: 44, borderWidth: 1, borderColor: 'rgba(245,240,232,0.3)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emblemTxt: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 16 },
  brandCol: { flexDirection: 'row', alignItems: 'center' },
  brandName: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 17, letterSpacing: 1.5, textTransform: 'uppercase' },
  brandSub: { color: 'rgba(245,240,232,0.45)', fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', marginTop: 3 },
  invLabel: { color: 'rgba(245,240,232,0.45)', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 5, textAlign: 'right' },
  invNumber: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 24, textAlign: 'right' },
  invDate: { color: 'rgba(245,240,232,0.5)', fontSize: 9, textAlign: 'right', marginTop: 4 },

  // ── Accent line ─────────────────────────────────────────────────
  accent: { height: 3, backgroundColor: GREEN2 },

  // ── Body ────────────────────────────────────────────────────────
  body: { paddingHorizontal: 40, paddingTop: 28, paddingBottom: 36 },

  // ── Info row ────────────────────────────────────────────────────
  infoRow: { flexDirection: 'row', marginBottom: 32 },
  infoCol: { flex: 1 },
  infoLabel: { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: FAINT, marginBottom: 8 },
  billName: { fontFamily: 'Times-Roman', fontSize: 18, color: DARK, marginBottom: 6 },
  billLine: { fontSize: 11, color: '#5C5C52', lineHeight: 1.6 },
  dateItem: { marginBottom: 14 },
  dateLabel: { fontSize: 8, letterSpacing: 1.6, textTransform: 'uppercase', color: FAINT, marginBottom: 3 },
  dateValue: { fontSize: 11, color: DARK },

  // ── Table ───────────────────────────────────────────────────────
  tableHead: { backgroundColor: GREEN, flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 9 },
  tableHeadTxt: { fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: PARCH, fontFamily: 'Helvetica' },
  tableRow: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: DIVID },
  tableRowAlt: { backgroundColor: '#FDFAF6' },
  tableService: { fontSize: 12, color: DARK, flex: 1 },
  tableAmount: { fontSize: 12, color: DARK },

  // ── Totals ──────────────────────────────────────────────────────
  totals: { backgroundColor: PARCH2, borderTopWidth: 2, borderTopColor: GREEN },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: DIVID },
  totalLabel: { fontSize: 11, color: MUTED },
  totalValue: { fontSize: 11, color: MUTED },
  discountLabel: { fontSize: 11, color: GREEN2, fontFamily: 'Helvetica-Bold' },
  discountValue: { fontSize: 11, color: GREEN2, fontFamily: 'Helvetica-Bold' },
  grandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 14, paddingTop: 14, paddingBottom: 16 },
  grandLabel: { fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: '#777' },
  grandValue: { fontFamily: 'Times-Roman', fontSize: 36, color: DARK },

  // ── Loyalty ─────────────────────────────────────────────────────
  loyalty: { backgroundColor: '#EAF0E2', borderLeftWidth: 4, borderLeftColor: GREEN2, paddingHorizontal: 16, paddingVertical: 12, marginTop: 20 },
  loyaltyTitle: { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: GREEN2, fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  loyaltyText: { fontSize: 11, color: DARK, lineHeight: 1.7, fontFamily: 'Times-Italic' },

  // ── Payment ─────────────────────────────────────────────────────
  payment: { backgroundColor: PARCH, borderLeftWidth: 4, borderLeftColor: GREEN, paddingHorizontal: 20, paddingVertical: 16, marginTop: 20 },
  payLabel: { fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: FAINT, marginBottom: 12 },
  payGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  payItem: { width: '33.33%', marginBottom: 10 },
  payItemLabel: { fontSize: 8, letterSpacing: 1.4, textTransform: 'uppercase', color: FAINT, marginBottom: 2 },
  payItemValue: { fontSize: 11, color: DARK, fontFamily: 'Helvetica-Bold' },
  paySimple: { fontSize: 12, color: DARK },

  // ── Notes ───────────────────────────────────────────────────────
  notes: { borderLeftWidth: 3, borderLeftColor: DIVID, paddingLeft: 14, marginTop: 20 },
  notesLabel: { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: FAINT, marginBottom: 5 },
  notesText: { fontSize: 11, color: '#666', fontFamily: 'Helvetica-Oblique', lineHeight: 1.7 },

  // ── Footer ──────────────────────────────────────────────────────
  footer: { borderTopWidth: 2, borderTopColor: GREEN, paddingTop: 16, marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  footerEmblem: { width: 26, height: 26, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  footerEmblemTxt: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 10 },
  footerName: { fontSize: 10, color: MUTED },
  footerContact: { fontSize: 10, color: MUTED, textAlign: 'right' },
})

// ─── PDF Document ─────────────────────────────────────────────────────────────
export function InvoicePDF({ invoice }: { invoice: Invoice }) {
  const discountAmt      = invoice.discountAmount ?? invoice.discount
  const discountPct      = invoice.discountPercent
  const hasDiscount      = !!discountAmt && discountAmt > 0
  const isReturnCustomer = invoice.discountType === 'voucher' && invoice.voucherType === 'return_customer'
  const isPaid           = invoice.status === 'paid'

  return (
    <Document title={`Invoice ${invoice.number} — ${invoice.customer.name}`} author={BUSINESS.name}>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.brandCol}>
            <View style={s.emblem}><Text style={s.emblemTxt}>FT</Text></View>
            <View>
              <Text style={s.brandName}>{BUSINESS.name}</Text>
              <Text style={s.brandSub}>Master Tailors · {BUSINESS.city}</Text>
            </View>
          </View>
          <View>
            <Text style={s.invLabel}>Invoice</Text>
            <Text style={s.invNumber}>{invoice.number}</Text>
            <Text style={s.invDate}>{fmtDate(invoice.createdAt)}</Text>
          </View>
        </View>

        {/* ── Accent line ── */}
        <View style={s.accent} />

        {/* ── Body ── */}
        <View style={s.body}>

          {/* Info row */}
          <View style={s.infoRow}>
            <View style={s.infoCol}>
              <Text style={s.infoLabel}>Billed To</Text>
              <Text style={s.billName}>{invoice.customer.name}</Text>
              {!!invoice.customer.address && (
                <Text style={s.billLine}>{invoice.customer.address}</Text>
              )}
              <Text style={s.billLine}>
                {invoice.customer.email}{invoice.customer.phone ? `  ·  ${invoice.customer.phone}` : ''}
              </Text>
            </View>
            <View style={[s.infoCol, { paddingLeft: 20 }]}>
              {[
                { label: 'Date Issued', value: fmtDate(invoice.createdAt) },
                { label: 'Due Date',    value: fmtDate(invoice.dueDate) },
                ...(isPaid && invoice.paidAt ? [{ label: 'Paid On', value: fmtDate(invoice.paidAt) }] : []),
              ].map(({ label, value }) => (
                <View key={label} style={s.dateItem}>
                  <Text style={s.dateLabel}>{label}</Text>
                  <Text style={[s.dateValue, label === 'Paid On' ? { fontFamily: 'Helvetica-Bold' } : {}]}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Services table */}
          <View style={s.tableHead}>
            <Text style={[s.tableHeadTxt, { flex: 1 }]}>Service</Text>
            <Text style={s.tableHeadTxt}>Amount</Text>
          </View>
          {invoice.items.map((item, i) => (
            <View key={i} style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
              <Text style={s.tableService}>{item.name}</Text>
              <Text style={s.tableAmount}>£{item.price.toFixed(2)}</Text>
            </View>
          ))}

          {/* Totals */}
          <View style={s.totals}>
            {hasDiscount && (
              <>
                <View style={s.totalRow}>
                  <Text style={s.totalLabel}>Subtotal</Text>
                  <Text style={s.totalValue}>£{invoice.subtotal.toFixed(2)}</Text>
                </View>
                <View style={[s.totalRow, { borderBottomWidth: 1, borderBottomColor: DIVID }]}>
                  <Text style={s.discountLabel}>
                    {isReturnCustomer ? '★ Loyalty Reward' : (invoice.voucherName ?? 'Discount')}
                    {discountPct ? `  —  ${discountPct}% off` : ''}
                    {invoice.voucherCode ? `  (${invoice.voucherCode})` : ''}
                  </Text>
                  <Text style={s.discountValue}>−£{discountAmt!.toFixed(2)}</Text>
                </View>
              </>
            )}
            <View style={s.grandRow}>
              <Text style={s.grandLabel}>Total Due</Text>
              <Text style={s.grandValue}>£{invoice.total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Loyalty message */}
          {isReturnCustomer && (
            <View style={s.loyalty}>
              <Text style={s.loyaltyTitle}>★ Loyalty Reward — Returning Customer</Text>
              <Text style={s.loyaltyText}>
                Thank you for coming back to {BUSINESS.name}. This exclusive discount has been applied as our way of saying thank you for your continued loyalty.
              </Text>
            </View>
          )}

          {/* Payment details */}
          <View style={s.payment}>
            <Text style={s.payLabel}>Payment</Text>
            {invoice.paymentMethod === 'cash' && (
              <Text style={s.paySimple}>Cash on collection or delivery.</Text>
            )}
            {invoice.paymentMethod === 'mobile' && (
              <Text style={s.paySimple}>Collected via mobile / contactless — no further action required.</Text>
            )}
            {invoice.paymentMethod === 'bank' && (
              <View style={s.payGrid}>
                {[
                  ['Method',       'Bank Transfer'],
                  ['Account Name', BANK.name],
                  ['Sort Code',    BANK.sortCode],
                  ['Account No.',  BANK.account],
                  ['Reference',    invoice.number],
                ].map(([label, value]) => (
                  <View key={label} style={s.payItem}>
                    <Text style={s.payItemLabel}>{label}</Text>
                    <Text style={s.payItemValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Notes */}
          {!!invoice.notes && (
            <View style={s.notes}>
              <Text style={s.notesLabel}>Note from your tailor</Text>
              <Text style={s.notesText}>{invoice.notes}</Text>
            </View>
          )}

          {/* Footer */}
          <View style={s.footer}>
            <View style={s.footerLeft}>
              <View style={s.footerEmblem}><Text style={s.footerEmblemTxt}>FT</Text></View>
              <Text style={s.footerName}>{BUSINESS.name} · London's finest tailors, at your door</Text>
            </View>
            <Text style={s.footerContact}>{BUSINESS.email}  ·  {BUSINESS.phone}</Text>
          </View>

        </View>
      </Page>
    </Document>
  )
}
