import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getReview, updateReview } from '@/lib/kv'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const review = await getReview(params.id).catch(() => null)
  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 })

  review.status = 'approved'
  await updateReview(review)

  return NextResponse.json({ ok: true })
}
