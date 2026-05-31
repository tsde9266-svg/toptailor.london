import { NextRequest, NextResponse } from 'next/server'
import { saveSurvey, logError } from '@/lib/kv'
import type { Survey, SurveySource } from '@/lib/kv'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const bookingEase    = Number(body.bookingEase)
  const serviceQuality = Number(body.serviceQuality)
  const heardFrom      = String(body.heardFrom ?? '').trim()

  if (!bookingEase    || bookingEase    < 1 || bookingEase    > 5) return NextResponse.json({ error: 'Invalid bookingEase' },    { status: 422 })
  if (!serviceQuality || serviceQuality < 1 || serviceQuality > 5) return NextResponse.json({ error: 'Invalid serviceQuality' }, { status: 422 })
  if (!heardFrom) return NextResponse.json({ error: 'heardFrom required' }, { status: 422 })

  const validSources: SurveySource[] = ['delivery', 'booking', 'general']
  const source: SurveySource = validSources.includes(body.source as SurveySource)
    ? body.source as SurveySource
    : 'general'

  const survey: Survey = {
    id:             randomUUID(),
    createdAt:      new Date().toISOString(),
    source,
    ref:            body.ref ? String(body.ref) : undefined,
    customerName:   body.customerName ? String(body.customerName).trim() : undefined,
    bookingEase,
    serviceQuality,
    heardFrom,
    comments:       body.comments ? String(body.comments).trim() : undefined,
  }

  try { await saveSurvey(survey) } catch (e) {
    logError({ route: '/api/survey', method: 'POST', status: 503, message: 'KV save failed', detail: String(e) }).catch(() => {})
    return NextResponse.json({ error: 'Failed to save' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
