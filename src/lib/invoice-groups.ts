// Turns an invoice's items into the rows shown on the invoice table.
//
// Invoices created with the item-groups editor carry an explicit `itemGroups`
// structure — garment and service are never guessed, so resolveInvoiceGroups()
// just maps it straight across. Invoices created before that existed have no
// `itemGroups`; for those we fall back to the old best-effort text-matching
// guess so historical invoices keep rendering exactly as before.
import type { Invoice, InvoiceItemGroup, QuoteItem } from './kv'

export type DisplayServiceRow = {
  service:        string
  amount:         number
  appliesToNote?: string   // e.g. "1 of 2" — only set when a service applies to fewer than the item's full qty
}

export type DisplayGroup = {
  key:     string
  number:  number | null   // sequence shown as "1 · Trouser" — null for legacy/ungrouped rows
  garment: string | null
  qty:     number | null
  rows:    DisplayServiceRow[]
}

// ── Legacy best-effort grouping (pre-itemGroups invoices) ──────────────────

type LegacyParsedItem = {
  original: Invoice['items'][number]
  garment:  string | null
  qty:      number | null
  service:  string
}
type LegacyGroup = { key: string; garment: string | null; qty: number | null; items: LegacyParsedItem[] }

const KNOWN_GARMENTS = [
  'Wedding Dress', 'Leather Jacket',
  'Trouser', 'Jeans', 'Jacket', 'Coat', 'Shirt',
  'Dress', 'Skirt', 'Waistcoat', 'Suit',
  'Ladies Suit', 'Jumpsuit',
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

function legacyGroupItems(items: Invoice['items']): LegacyGroup[] {
  const parsed: LegacyParsedItem[] = items.map(item => {
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
  const groups: Record<string, LegacyGroup> = {}

  for (const p of parsed) {
    const key = p.garment ? `${p.garment}::${p.qty ?? 'any'}` : `__free::${p.service}`
    if (!seen.has(key)) { seen.add(key); order.push(key); groups[key] = { key, garment: p.garment, qty: p.qty, items: [] } }
    groups[key].items.push(p)
  }

  return order.map(k => groups[k])
}

// ── Unified resolver ─────────────────────────────────────────────────────

export function resolveInvoiceGroups(invoice: Invoice): DisplayGroup[] {
  if (invoice.itemGroups && invoice.itemGroups.length > 0) {
    return invoice.itemGroups.map((g, gi) => ({
      key:     g.id,
      number:  gi + 1,
      garment: g.garment,
      qty:     g.qty,
      rows:    g.services.map(s => ({
        service:       s.name,
        amount:        Math.round(s.priceEach * s.appliesTo * 100) / 100,
        appliesToNote: s.appliesTo < g.qty ? `${s.appliesTo} of ${g.qty}` : undefined,
      })),
    }))
  }

  return legacyGroupItems(invoice.items).map(g => ({
    key:     g.key,
    number:  null,
    garment: g.garment,
    qty:     g.qty,
    rows:    g.items.map(p => ({ service: p.service, amount: p.original.price })),
  }))
}

export function computeTotalItems(invoice: Invoice): number {
  if (invoice.itemGroups && invoice.itemGroups.length > 0) {
    return invoice.itemGroups.reduce((sum, g) => sum + g.qty, 0)
  }
  return legacyGroupItems(invoice.items).reduce((sum, g) => sum + (g.qty ?? g.items.length), 0)
}

// Reconstructs an editable, explicit itemGroups structure from an old flat
// items array — used the first time a legacy invoice (created before
// itemGroups existed) is opened in the editor. Rows that share an explicit
// garment + qty (the common case — the admin form has always saved a
// `garment` per row) collapse back into one item, exactly as they were
// entered. Rows with no reliable garment/qty signal are kept as separate
// items instead of merged, so nothing is double-counted or silently
// combined with an unrelated row that happens to share the same text.
export function legacyToItemGroups(items: Invoice['items']): InvoiceItemGroup[] {
  const result: InvoiceItemGroup[] = []
  for (const g of legacyGroupItems(items)) {
    if (g.garment) {
      const qty = g.qty ?? 1
      result.push({
        id:      g.key,
        garment: g.garment,
        qty,
        services: g.items.map(p => ({
          name:      p.service,
          priceEach: p.original.priceEach ?? (qty > 0 ? p.original.price / qty : p.original.price),
          appliesTo: qty,
        })),
      })
    } else {
      g.items.forEach((p, i) => {
        const qty = p.original.qty ?? 1
        result.push({
          id:      `${g.key}-${i}`,
          garment: '',
          qty,
          services: [{
            name:      p.service,
            priceEach: p.original.priceEach ?? (qty > 0 ? p.original.price / qty : p.original.price),
            appliesTo: qty,
          }],
        })
      })
    }
  }
  return result
}

// ── Explicit itemGroups helpers ─────────────────────────────────────────────

export function flattenItemGroups(groups: InvoiceItemGroup[]): Invoice['items'] {
  const items: Invoice['items'] = []
  for (const g of groups) {
    for (const s of g.services) {
      items.push({
        name:      s.name,
        price:     Math.round(s.priceEach * s.appliesTo * 100) / 100,
        qty:       s.appliesTo,
        priceEach: s.priceEach,
        garment:   g.garment || undefined,
      })
    }
  }
  return items
}

// Category names come from src/data/services.ts. "Specialist Repairs" and
// "Consultation" are intentionally left unmapped — they aren't a single
// garment, so the item is left blank for staff to fill in when reviewing.
const CATEGORY_TO_GARMENT: Record<string, string> = {
  'Trousers & Jeans':        'Trouser',
  'Jackets & Coats':         'Jacket',
  'Shirts':                  'Shirt',
  'Dresses':                 'Dress',
  'Skirts':                  'Skirt',
  'Ladies Suits':            'Ladies Suit',
  'Jumpsuits & Playsuits':   'Jumpsuit',
  'Fur & Sheepskin Coats':   'Fur / Sheepskin Coat',
  'Wedding & Occasion Wear': 'Occasion Wear',
  'Leather & Suede':         'Leather / Suede',
}

// One quote line = one item group, one service, qty 1. Never merges lines
// together — staff can combine them explicitly when reviewing the invoice.
export function buildItemGroupsFromQuote(items: QuoteItem[]): InvoiceItemGroup[] {
  return items.map((item, i) => ({
    id:      `q${i}`,
    garment: (item.categoryName && CATEGORY_TO_GARMENT[item.categoryName]) || '',
    qty:     1,
    services: [{ name: item.name, priceEach: item.price, appliesTo: 1 }],
  }))
}
