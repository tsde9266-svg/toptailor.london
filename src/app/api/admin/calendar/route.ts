import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getAllCalEntries, saveCalEntry } from '@/lib/kv'
import type { CalEntry, CalEntryType } from '@/lib/kv'
import { randomUUID } from 'crypto'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const entries = await getAllCalEntries().catch(() => [])
  return NextResponse.json({ entries })
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const title = String(body.title ?? '').trim()
  const date  = String(body.date  ?? '').trim()
  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 422 })
  if (!date)  return NextResponse.json({ error: 'Date required' },  { status: 422 })

  const validTypes: CalEntryType[] = ['personal', 'work', 'blocked']
  const type: CalEntryType = validTypes.includes(body.type as CalEntryType)
    ? body.type as CalEntryType
    : 'personal'

  const entry: CalEntry = {
    id:         randomUUID(),
    createdAt:  new Date().toISOString(),
    title,
    date,
    startTime:  body.startTime ? String(body.startTime) : undefined,
    endTime:    body.endTime   ? String(body.endTime)   : undefined,
    allDay:     body.allDay    ? true                   : undefined,
    type,
    notes:      body.notes     ? String(body.notes).trim() : undefined,
  }

  await saveCalEntry(entry)
  return NextResponse.json({ ok: true, entry })
}
