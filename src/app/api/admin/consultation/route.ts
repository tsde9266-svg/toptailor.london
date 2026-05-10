import { NextRequest, NextResponse } from 'next/server'
import { getConsultation, updateConsultation } from '@/lib/kv'

function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const id     = String(body.id     ?? '').trim()
  const status = String(body.status ?? '').trim()
  const notes  = String(body.notes  ?? '').trim()

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 422 })
  if (!['pending_call', 'called', 'closed'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 422 })
  }

  const c = await getConsultation(id)
  if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updated = {
    ...c,
    status: status as 'pending_call' | 'called' | 'closed',
    notes:  notes || undefined,
  }
  await updateConsultation(updated)

  return NextResponse.json({ ok: true })
}
