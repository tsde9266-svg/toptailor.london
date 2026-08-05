import { NextRequest, NextResponse } from 'next/server'
import { logWhatsAppClick } from '@/lib/kv'
import { BUSINESS_WHATSAPP } from '@/lib/greeting'

// Every "Confirm on WhatsApp" button on the site links here instead of
// straight to wa.me — lets us silently log who tapped through (customer-
// initiated, compliant), for internal record-keeping only. This does NOT
// ping Telegram: whether a customer who opens WhatsApp actually hits send
// is entirely their choice, not a sign of a broken form or a missed lead,
// so it shouldn't read as an actionable notification to staff. The real
// lead notification (name, phone, full details) is sent separately by the
// form's own submit handler (e.g. /api/inquiry, /api/book-visit,
// /api/phone-consultation) the moment the customer submits the form.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text') ?? ''
  const ref  = searchParams.get('ref')  ?? 'Unknown source'

  await logWhatsAppClick({ ref }).catch(() => {})

  const target = `https://wa.me/${BUSINESS_WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`
  return NextResponse.redirect(target)
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
