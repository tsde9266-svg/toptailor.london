import { NextRequest, NextResponse } from 'next/server'
import { getAllVouchers, saveVoucher } from '@/lib/kv'
import type { Voucher } from '@/lib/kv'
import { randomUUID } from 'crypto'

function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const vouchers = await getAllVouchers()
    return NextResponse.json(vouchers)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const name            = String(body.name ?? '').trim()
  const code            = String(body.code ?? '').trim().toUpperCase()
  const discountPercent = Number(body.discountPercent)
  const type            = String(body.type ?? 'general') as Voucher['type']
  const description     = body.description ? String(body.description).trim() : undefined

  if (!name || !code) return NextResponse.json({ error: 'Name and code required' }, { status: 422 })
  if (!discountPercent || discountPercent < 1 || discountPercent > 100) {
    return NextResponse.json({ error: 'Discount must be 1–100%' }, { status: 422 })
  }

  const voucher: Voucher = {
    id:              randomUUID(),
    code,
    name,
    description,
    discountPercent,
    type,
    isActive:        true,
    createdAt:       new Date().toISOString(),
    usageCount:      0,
  }

  try {
    await saveVoucher(voucher)
    return NextResponse.json({ ok: true, voucher })
  } catch {
    return NextResponse.json({ error: 'Failed to save voucher' }, { status: 503 })
  }
}
