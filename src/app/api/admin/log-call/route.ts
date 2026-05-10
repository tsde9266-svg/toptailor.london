import { NextRequest, NextResponse } from 'next/server'
import { saveConsultation } from '@/lib/kv'
import type { Consultation } from '@/lib/kv'

function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}

function uuid() {
  return crypto.randomUUID()
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const name   = String(body.name   ?? '').trim()
  const phone  = String(body.phone  ?? '').trim()
  const email  = String(body.email  ?? '').trim()
  const notes  = String(body.notes  ?? '').trim()
  const status = String(body.status ?? 'called').trim()

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 422 })
  }

  const consultation: Consultation = {
    id:        uuid(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    email:  email || undefined,
    notes:  notes || undefined,
    status: ['pending_call', 'called', 'closed'].includes(status)
      ? status as Consultation['status']
      : 'called',
  }

  await saveConsultation(consultation)
  return NextResponse.json({ ok: true, id: consultation.id })
}
