import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getCalEntry, updateCalEntry, deleteCalEntry } from '@/lib/kv'
import type { CalEntryType } from '@/lib/kv'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const existing = await getCalEntry(params.id)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const validTypes: CalEntryType[] = ['personal', 'work', 'blocked']
  const updated = {
    ...existing,
    title:     body.title     ? String(body.title).trim()  : existing.title,
    date:      body.date      ? String(body.date)          : existing.date,
    startTime: body.startTime ? String(body.startTime)     : undefined,
    endTime:   body.endTime   ? String(body.endTime)       : undefined,
    allDay:    body.allDay    ? true                       : undefined,
    type:      validTypes.includes(body.type as CalEntryType) ? body.type as CalEntryType : existing.type,
    notes:     body.notes     ? String(body.notes).trim()  : undefined,
  }

  await updateCalEntry(updated)
  return NextResponse.json({ ok: true, entry: updated })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await deleteCalEntry(params.id)
  return NextResponse.json({ ok: true })
}
