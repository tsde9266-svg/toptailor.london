// Server-side only — never import this in a client component.
import {
  Document, Page, View, Text, StyleSheet,
} from '@react-pdf/renderer'
import type { Invoice } from './kv'
import { BUSINESS } from './constants'

const GREEN  = '#1A3A12'
const GREEN2 = '#2A5220'
const PARCH  = '#F5F0E8'
const PARCH2 = '#F8F5EF'
const DARK   = '#1C1C1A'
const MUTED  = '#888888'
const FAINT  = '#bbbbbb'
const DIVID  = '#EDE8DF'
const ROW2   = '#FDFAF6'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

type ParsedItem = {
  original: Invoice['items'][number]
  garment:  string | null
  qty:      number | null
  service:  string
}

type Group = { key: string; garment: string | null; qty: number | null; items: ParsedItem[] }

function groupInvoiceItems(items: Invoice['items']): Group[] {
  const parsed: ParsedItem[] = items.map(item => {
    if (item.garment) {
      return { original: item, garment: item.garment, qty: item.qty ?? null, service: item.name }
    }
    const match = item.name.match(/^(\d+)[×x]\s*(.+?)(?:\s+[—\-]\s+(.+))?$/)
    if (match) {
      return { original: item, garment: match[2].trim(), qty: parseInt(match[1]), service: (match[3] ?? match[2]).trim() }
    }
    return { original: item, garment: null, qty: null, service: item.name }
  })

  const seen = new Set<string>()
  const order: string[] = []
  const groups: Record<string, Group> = {}

  for (const p of parsed) {
    const key = p.garment ? `${p.garment}::${p.qty}` : `__free::${p.service}`
    if (!seen.has(key)) { seen.add(key); order.push(key); groups[key] = { key, garment: p.garment, qty: p.qty, items: [] } }
    groups[key].items.push(p)
  }

  return order.map(k => groups[k])
}

const s = StyleSheet.create({
  page:      { backgroundColor: '#ffffff', fontFamily: 'Helvetica', fontSize: 10, color: DARK },

  header:    { backgroundColor: GREEN, paddingHorizontal: 40, paddingVertical: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  emblem:    { width: 44, height: 44, borderWidth: 1, borderColor: 'rgba(245,240,232,0.3)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emblemTxt: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 16 },
  brandCol:  { flexDirection: 'row', alignItems: 'center' },
  brandName: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 17, letterSpacing: 1.5, textTransform: 'uppercase' },
  brandSub:  { color: 'rgba(245,240,232,0.45)', fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', marginTop: 3 },
  invCol:    { alignItems: 'flex-end' },
  invLabel:  { color: 'rgba(245,240,232,0.45)', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 5 },
  invNumber: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 24 },
  invDate:   { color: 'rgba(245,240,232,0.5)', fontSize: 9, marginTop: 4 },
  invCount:  { color: 'rgba(245,240,232,0.3)', fontSize: 8, marginTop: 3 },

  accent:    { height: 3, backgroundColor: GREEN2 },
  body:      { paddingHorizontal: 40, paddingTop: 28, paddingBottom: 36 },

  infoRow:   { flexDirection: 'row', marginBottom: 32 },
  infoCol:   { flex: 1 },
  infoLabel: { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: FAINT, marginBottom: 8 },
  billName:  { fontFamily: 'Times-Roman', fontSize: 18, color: DARK, marginBottom: 6 },
  billLine:  { fontSize: 11, color: '#5C5C52', lineHeight: 1.6 },
  dateItem:  { marginBottom: 14 },
  dateLabel: { fontSize: 8, letterSpacing: 1.6, textTransform: 'uppercase', color: FAINT, marginBottom: 3 },
  dateValue: { fontSize: 11, color: DARK },

  tableHead:    { backgroundColor: GREEN, flexDirection: 'row', paddingHorizontal: 0, paddingVertical: 8 },
  thItem:       { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: PARCH, paddingHorizontal: 12, width: '22%' },
  thQty:        { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: PARCH, width: '8%', textAlign: 'center' },
  thService:    { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: PARCH, flex: 1, paddingHorizontal: 10 },
  thAmount:     { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: PARCH, width: '14%', textAlign: 'right', paddingHorizontal: 12 },

  tableRow:     { flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: DIVID },
  tableRowAlt:  { backgroundColor: ROW2 },
  tableRowSep:  { borderBottomColor: '#DDD8CE' },
  tdItem:       { fontSize: 12, color: DARK, paddingHorizontal: 12, width: '22%', paddingTop: 1 },
  tdItemFirst:  { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  tdQty:        { fontSize: 11, color: MUTED, width: '8%', textAlign: 'center', paddingTop: 1 },
  tdService:    { fontSize: 11, color: DARK, flex: 1, paddingHorizontal: 10, paddingTop: 1 },
  tdAmount:     { fontSize: 11, color: DARK, width: '14%', textAlign: 'right', paddingHorizontal: 12, paddingTop: 1 },

  totals:       { backgroundColor: PARCH2, borderTopWidth: 2, borderTopColor: GREEN },
  totalRow:     { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: DIVID },
  totalLabel:   { fontSize: 11, color: MUTED },
  totalValue:   { fontSize: 11, color: MUTED },
  discLabel:    { fontSize: 11, color: GREEN2, fontFamily: 'Helvetica-Bold' },
  discValue:    { fontSize: 11, color: GREEN2, fontFamily: 'Helvetica-Bold' },
  grandRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 14 },
  grandLabel:   { fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase', color: '#777' },
  grandValue:   { fontFamily: 'Times-Roman', fontSize: 34, color: DARK },

  loyalty:      { backgroundColor: '#EAF0E2', borderLeftWidth: 4, borderLeftColor: GREEN2, paddingHorizontal: 16, paddingVertical: 12, marginTop: 18 },
  loyaltyTitle: { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: GREEN2, fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  loyaltyText:  { fontSize: 11, color: DARK, lineHeight: 1.7, fontFamily: 'Times-Italic' },

  payment:      { backgroundColor: PARCH, borderLeftWidth: 4, borderLeftColor: GREEN, paddingHorizontal: 20, paddingVertical: 14, marginTop: 18 },
  payLabel:     { fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: FAINT, marginBottom: 10 },
  paySimple:    { fontSize: 12, color: DARK },

  notes:        { borderLeftWidth: 3, borderLeftColor: DIVID, paddingLeft: 14, marginTop: 18 },
  notesLabel:   { fontSize: 8, letterSpacing: 1.8, textTransform: 'uppercase', color: FAINT, marginBottom: 5 },
  notesText:    { fontSize: 11, color: '#666', fontFamily: 'Helvetica-Oblique', lineHeight: 1.7 },

  footer:       { borderTopWidth: 2, borderTopColor: GREEN, paddingTop: 14, marginTop: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerLeft:   { flexDirection: 'row', alignItems: 'center' },
  footerEmblem: { width: 24, height: 24, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  footerEmbTxt: { color: PARCH, fontFamily: 'Times-Roman', fontSize: 10 },
  footerName:   { fontSize: 10, color: MUTED },
  footerRight:  { fontSize: 10, color: MUTED, textAlign: 'right' },
})

export function InvoicePDF({ invoice }: { invoice: Invoice }) {
  const discountAmt      = invoice.discountAmount ?? invoice.discount
  const discountPct      = invoice.discountPercent
  const hasDiscount      = !!discountAmt && discountAmt > 0
  const isReturnCustomer = invoice.discountType === 'voucher' && invoice.voucherType === 'return_customer'
  const isPaid           = invoice.status === 'paid'

  const groups       = groupInvoiceItems(invoice.items)
  const garmentCount = groups.filter(g => g.garment).length
  const serviceCount = invoice.items.length

  const contactLine = [invoice.customer.email, invoice.customer.phone].filter(Boolean).join('  ·  ')

  return (
    <Document title={`Invoice ${invoice.number} — ${invoice.customer.name}`} author={BUSINESS.name}>
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View style={s.brandCol}>
            <View style={s.emblem}><Text style={s.emblemTxt}>FT</Text></View>
            <View>
              <Text style={s.brandName}>{BUSINESS.name}</Text>
              <Text style={s.brandSub}>Master Tailors · {BUSINESS.city}</Text>
            </View>
          </View>
          <View style={s.invCol}>
            <Text style={s.invLabel}>Invoice</Text>
            <Text style={s.invNumber}>{invoice.number}</Text>
            <Text style={s.invDate}>{fmtDate(invoice.createdAt)}</Text>
            <Text style={s.invCount}>
              {garmentCount > 0 ? `${garmentCount} garment${garmentCount !== 1 ? 's' : ''}  ·  ` : ''}{serviceCount} item{serviceCount !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View style={s.accent} />

        <View style={s.body}>

          {/* Info row */}
          <View style={s.infoRow}>
            <View style={s.infoCol}>
              <Text style={s.infoLabel}>Billed To</Text>
              <Text style={s.billName}>{invoice.customer.name}</Text>
              {!!invoice.customer.address && <Text style={s.billLine}>{invoice.customer.address}</Text>}
              {!!contactLine && <Text style={s.billLine}>{contactLine}</Text>}
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

          {/* Table header */}
          <View style={s.tableHead}>
            <Text style={s.thItem}>Item</Text>
            <Text style={s.thQty}>Qty</Text>
            <Text style={s.thService}>Service</Text>
            <Text style={s.thAmount}>Amount</Text>
          </View>

          {/* Table rows — grouped by garment */}
          {groups.map((group, gi) =>
            group.items.map((p, si) => {
              const isFirst    = si === 0
              const isLast     = si === group.items.length - 1
              const hasGarment = !!group.garment
              const altBg      = gi % 2 === 1 ? s.tableRowAlt : {}
              const sepStyle   = isLast ? s.tableRowSep : {}
              const itemCell    = hasGarment ? (isFirst ? group.garment! : '') : p.service
              const qtyCell     = hasGarment && isFirst && group.qty ? String(group.qty) : ''
              const serviceCell = hasGarment ? p.service : ''
              return (
                <View key={`${gi}-${si}`} style={[s.tableRow, altBg, sepStyle]}>
                  <Text style={[s.tdItem, (hasGarment ? isFirst : true) ? s.tdItemFirst : {}]}>
                    {itemCell}
                  </Text>
                  <Text style={s.tdQty}>{qtyCell}</Text>
                  <Text style={s.tdService}>{serviceCell}</Text>
                  <Text style={s.tdAmount}>£{p.original.price.toFixed(2)}</Text>
                </View>
              )
            })
          )}

          {/* Totals */}
          <View style={s.totals}>
            {hasDiscount && (
              <>
                <View style={s.totalRow}>
                  <Text style={s.totalLabel}>Subtotal</Text>
                  <Text style={s.totalValue}>£{invoice.subtotal.toFixed(2)}</Text>
                </View>
                <View style={[s.totalRow, { borderBottomWidth: 1, borderBottomColor: DIVID }]}>
                  <Text style={s.discLabel}>
                    {isReturnCustomer ? '★ Loyalty Reward' : (invoice.voucherName ?? 'Discount')}
                    {discountPct ? `  —  ${discountPct}% off` : ''}
                    {invoice.voucherCode ? `  (${invoice.voucherCode})` : ''}
                  </Text>
                  <Text style={s.discValue}>−£{discountAmt!.toFixed(2)}</Text>
                </View>
              </>
            )}
            <View style={s.grandRow}>
              <Text style={s.grandLabel}>Total Due</Text>
              <Text style={s.grandValue}>£{invoice.total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Loyalty */}
          {isReturnCustomer && (
            <View style={s.loyalty}>
              <Text style={s.loyaltyTitle}>★ Loyalty Reward — Returning Customer</Text>
              <Text style={s.loyaltyText}>
                Thank you for coming back to {BUSINESS.name}. This exclusive discount has been applied as our way of saying thank you for your continued loyalty.
              </Text>
            </View>
          )}

          {/* Payment */}
          <View style={s.payment}>
            <Text style={s.payLabel}>Payment</Text>
            {invoice.paymentMethod === 'cash' && (
              <Text style={s.paySimple}>Cash on collection or delivery.</Text>
            )}
            {invoice.paymentMethod === 'mobile' && (
              <Text style={s.paySimple}>Collected via mobile / contactless — no further action required.</Text>
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
              <View style={s.footerEmblem}><Text style={s.footerEmbTxt}>FT</Text></View>
              <Text style={s.footerName}>{BUSINESS.name} · London&apos;s finest tailors, at your door</Text>
            </View>
            <Text style={s.footerRight}>{BUSINESS.email}  ·  {BUSINESS.phone}</Text>
          </View>

        </View>
      </Page>
    </Document>
  )
}
