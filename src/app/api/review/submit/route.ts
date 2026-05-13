import { NextRequest, NextResponse } from 'next/server'
import { saveReview } from '@/lib/kv'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const author      = String(body.author      ?? '').trim().slice(0, 100)
  const quote       = String(body.quote       ?? '').trim().slice(0, 1000)
  const stars       = Number(body.stars)
  const deliveryRef = body.deliveryRef ? String(body.deliveryRef).slice(0, 40) : undefined

  if (!author || !quote) {
    return NextResponse.json({ error: 'Name and review are required' }, { status: 422 })
  }
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return NextResponse.json({ error: 'Stars must be 1–5' }, { status: 422 })
  }

  try {
    await saveReview({
      id:          crypto.randomUUID(),
      author,
      quote,
      stars,
      status:      'pending',
      createdAt:   new Date().toISOString(),
      deliveryRef,
    })
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
