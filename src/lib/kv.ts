// Storage layer using @upstash/redis (replaces deprecated @vercel/kv)
// Setup:
//   1. Vercel dashboard → Storage → Upstash for Redis → Create free DB → Connect to project
//   2. Vercel auto-adds UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
//   3. Pull env vars locally: vercel env pull .env.local

import { Redis } from '@upstash/redis'

// Uses the existing KV_REST_API_URL / KV_REST_API_TOKEN env vars
// (set automatically by the previous Vercel KV — same Upstash database, still running)
const redis = new Redis({
  url:   process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export type OrderStatus =
  | 'pending_collection'
  | 'quote_sent'
  | 'quote_approved'
  | 'complete'

export type QuoteItem = {
  name:  string
  price: number
}

export type Order = {
  id:            string
  status:        OrderStatus
  createdAt:     string
  invoiceId?:    string
  customer: {
    name:      string
    email:     string
    phone?:    string
    address:   string
    postcode:  string
    commsPref?:          'whatsapp' | 'email'
    paymentPreference?:  'day' | 'bank'
  }
  estimate: Array<{
    id:           string
    name:         string
    categoryName: string
    price:        number
  }>
  estimateTotal: number
  quote?: {
    sentAt:         string
    items:          QuoteItem[]
    total:          number
    notes?:         string
    approvedAt?:    string
    paymentMethod?: 'door' | 'bank'
  }
}

export async function saveOrder(order: Order): Promise<void> {
  await redis.pipeline().set(`order:${order.id}`, order).lpush('orders', order.id).exec()
}

export async function getOrder(id: string): Promise<Order | null> {
  return redis.get<Order>(`order:${id}`)
}

export async function updateOrder(order: Order): Promise<void> {
  await redis.set(`order:${order.id}`, order)
}

export async function getAllOrders(): Promise<Order[]> {
  const ids = await redis.lrange<string>('orders', 0, -1)
  if (!ids.length) return []
  const orders = await Promise.all(ids.map(id => redis.get<Order>(`order:${id}`)))
  return orders
    .filter((o): o is Order => o !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// ─── Phone Consultations ─────────────────────────────────────────────────────

export type Consultation = {
  id:        string
  createdAt: string
  name:      string
  phone:     string
  email?:    string
  day?:      string
  time?:     string
  commsPref?: 'whatsapp' | 'email'
  notes?:    string
  status:    'pending_call' | 'called' | 'closed'
}

export async function saveConsultation(c: Consultation): Promise<void> {
  await redis.pipeline().set(`consultation:${c.id}`, c).lpush('consultations', c.id).exec()
}

export async function getConsultation(id: string): Promise<Consultation | null> {
  return redis.get<Consultation>(`consultation:${id}`)
}

export async function updateConsultation(c: Consultation): Promise<void> {
  await redis.set(`consultation:${c.id}`, c)
}

export async function getAllConsultations(): Promise<Consultation[]> {
  const ids = await redis.lrange<string>('consultations', 0, -1)
  if (!ids.length) return []
  const list = await Promise.all(ids.map(id => redis.get<Consultation>(`consultation:${id}`)))
  return list
    .filter((c): c is Consultation => c !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export type Review = {
  id:        string
  author:    string
  quote:     string
  createdAt: string
}

export async function saveReview(review: Review): Promise<void> {
  await redis.pipeline().set(`review:${review.id}`, review).lpush('reviews', review.id).exec()
}

export async function getAllReviews(): Promise<Review[]> {
  const ids = await redis.lrange<string>('reviews', 0, -1)
  if (!ids.length) return []
  const reviews = await Promise.all(ids.map(id => redis.get<Review>(`review:${id}`)))
  return reviews
    .filter((r): r is Review => r !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function deleteReview(id: string): Promise<void> {
  await redis.del(`review:${id}`)
  await redis.lrem('reviews', 0, id)
}

// ─── Vouchers ─────────────────────────────────────────────────────────────────

export type VoucherType = 'return_customer' | 'special' | 'general'

export type Voucher = {
  id:              string
  code:            string
  name:            string
  description?:    string
  discountPercent: number
  type:            VoucherType
  isActive:        boolean
  createdAt:       string
  usageCount:      number
}

export async function saveVoucher(v: Voucher): Promise<void> {
  await redis.pipeline().set(`voucher:${v.id}`, v).lpush('vouchers', v.id).exec()
}

export async function getVoucher(id: string): Promise<Voucher | null> {
  return redis.get<Voucher>(`voucher:${id}`)
}

export async function updateVoucher(v: Voucher): Promise<void> {
  await redis.set(`voucher:${v.id}`, v)
}

export async function deleteVoucher(id: string): Promise<void> {
  await redis.del(`voucher:${id}`)
  await redis.lrem('vouchers', 0, id)
}

export async function getAllVouchers(): Promise<Voucher[]> {
  const ids = await redis.lrange<string>('vouchers', 0, -1)
  if (!ids.length) return []
  const vouchers = await Promise.all(ids.map(id => redis.get<Voucher>(`voucher:${id}`)))
  return vouchers
    .filter((v): v is Voucher => v !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export type InvoiceStatus = 'draft' | 'sent' | 'paid'

export type Invoice = {
  id:              string
  number:          string
  status:          InvoiceStatus
  createdAt:       string
  dueDate:         string
  orderId?:        string
  customer: {
    name:     string
    email:    string
    phone?:   string
    address?: string
  }
  items:           Array<{ name: string; price: number }>
  discountPercent?: number
  discountAmount?:  number
  discountType?:   'voucher' | 'manual'
  voucherId?:      string
  voucherCode?:    string
  voucherName?:    string
  voucherType?:    VoucherType
  discount?:       number  // legacy field — superseded by discountAmount, kept for old records
  subtotal:        number
  total:           number
  notes?:          string
  paymentMethod:   'bank' | 'cash' | 'mobile'
  paidAt?:         string
}

async function nextInvoiceNumber(): Promise<string> {
  const seq  = await redis.incr('invoice:seq')
  const year = new Date().getFullYear()
  return `FT-${year}-${String(seq).padStart(3, '0')}`
}

export async function saveInvoice(invoice: Invoice): Promise<void> {
  await redis.pipeline().set(`invoice:${invoice.id}`, invoice).lpush('invoices', invoice.id).exec()
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  return redis.get<Invoice>(`invoice:${id}`)
}

export async function updateInvoice(invoice: Invoice): Promise<void> {
  await redis.set(`invoice:${invoice.id}`, invoice)
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const ids = await redis.lrange<string>('invoices', 0, -1)
  if (!ids.length) return []
  const invoices = await Promise.all(ids.map(id => redis.get<Invoice>(`invoice:${id}`)))
  return invoices
    .filter((inv): inv is Invoice => inv !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export { nextInvoiceNumber }

// ─── Cal.com Bookings (manual approval flow) ─────────────────────────────────

export type CalBookingStatus = 'pending' | 'awaiting_customer' | 'approved' | 'cancelled'

export type CalBookingSlot = {
  start: string  // local datetime string "2026-05-13T09:00"
  end:   string
}

export type CalBooking = {
  id:          string
  calUid:      string  // full cal.com booking UID for deduplication
  status:      CalBookingStatus
  createdAt:   string
  attendee: {
    name:  string
    email: string
    phone: string
  }
  scheduledAt: string  // UTC ISO from cal.com webhook
  endTime:     string  // UTC ISO from cal.com webhook
  location:    string
  notes:       string
  // Set by admin when proposing alternative times:
  proposedTimes?: CalBookingSlot[]
  adminNote?:     string
  // Set on resolution:
  approvedAt?:    string
  confirmedTime?: CalBookingSlot  // null means original scheduledAt/endTime confirmed
}

export async function saveCalBooking(b: CalBooking): Promise<void> {
  const p = redis.pipeline().set(`calbooking:${b.id}`, b).lpush('calbookings', b.id)
  if (b.calUid) p.set(`calbooking:uid:${b.calUid}`, b.id)
  await p.exec()
}

export async function getCalBooking(id: string): Promise<CalBooking | null> {
  return redis.get<CalBooking>(`calbooking:${id}`)
}

export async function getCalBookingByCalUid(calUid: string): Promise<CalBooking | null> {
  const id = await redis.get<string>(`calbooking:uid:${calUid}`)
  if (!id) return null
  return redis.get<CalBooking>(`calbooking:${id}`)
}

export async function updateCalBooking(b: CalBooking): Promise<void> {
  await redis.set(`calbooking:${b.id}`, b)
}

export async function deleteCalBooking(id: string, calUid?: string): Promise<void> {
  await redis.del(`calbooking:${id}`)
  await redis.lrem('calbookings', 0, id)
  if (calUid) await redis.del(`calbooking:uid:${calUid}`)
}

export async function getAllCalBookings(): Promise<CalBooking[]> {
  const ids = await redis.lrange<string>('calbookings', 0, -1)
  if (!ids.length) return []
  const bookings = await Promise.all(ids.map(id => redis.get<CalBooking>(`calbooking:${id}`)))
  return bookings
    .filter((b): b is CalBooking => b !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
