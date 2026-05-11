import { NextRequest, NextResponse } from 'next/server'
import { getVoucher, updateVoucher, deleteVoucher } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { voucherId: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  let voucher
  try { voucher = await getVoucher(params.voucherId) } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
  if (!voucher) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (body.name !== undefined)            voucher.name            = String(body.name).trim()
  if (body.code !== undefined)            voucher.code            = String(body.code).trim().toUpperCase()
  if (body.description !== undefined)     voucher.description     = String(body.description).trim() || undefined
  if (body.discountPercent !== undefined) voucher.discountPercent = Number(body.discountPercent)
  if (body.type !== undefined)            voucher.type            = body.type as typeof voucher.type
  if (body.isActive !== undefined)        voucher.isActive        = Boolean(body.isActive)

  try {
    await updateVoucher(voucher)
    return NextResponse.json({ ok: true, voucher })
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { voucherId: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    await deleteVoucher(params.voucherId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 503 })
  }
}
