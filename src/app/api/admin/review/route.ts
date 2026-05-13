import { NextRequest, NextResponse } from 'next/server'
import { saveReview, deleteReview } from '@/lib/kv'
import type { Review } from '@/lib/kv'
import { isAdmin } from '@/lib/auth'

// POST /api/admin/review — add a review
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const author = String(body.author ?? '').trim()
  const quote  = String(body.quote  ?? '').trim()

  if (!author || !quote) {
    return NextResponse.json({ error: 'Author and quote are required' }, { status: 422 })
  }

  const stars = Number(body.stars ?? 5)
  const review: Review = {
    id:        crypto.randomUUID(),
    author,
    quote,
    stars:     Number.isInteger(stars) && stars >= 1 && stars <= 5 ? stars : 5,
    status:    'approved',  // admin-added reviews go live immediately
    createdAt: new Date().toISOString(),
  }

  try {
    await saveReview(review)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }

  return NextResponse.json({ ok: true, review })
}

// DELETE /api/admin/review — remove a review by id
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const id = String(body.id ?? '').trim()
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 422 })
  }

  try {
    await deleteReview(id)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
