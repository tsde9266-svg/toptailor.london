import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { getRecentErrors, clearAllErrors } from '@/lib/kv'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    const errors = await getRecentErrors(100)
    return NextResponse.json(errors)
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  try {
    await clearAllErrors()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }
}
