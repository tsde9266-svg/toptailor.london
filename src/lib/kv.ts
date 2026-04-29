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
  customer: {
    name:     string
    email:    string
    phone?:   string
    address:  string
    postcode: string
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
  await redis.set(`order:${order.id}`, order)
  await redis.lpush('orders', order.id)
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
