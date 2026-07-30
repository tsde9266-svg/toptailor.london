import { NextRequest, NextResponse } from 'next/server'
import { logWhatsAppClick } from '@/lib/kv'
import { notifyTelegram, escHtml } from '@/lib/telegram'
import { BUSINESS_WHATSAPP } from '@/lib/greeting'

// Every "Confirm on WhatsApp" button on the site links here instead of
// straight to wa.me — lets us log who actually tapped through (customer-
// initiated, compliant) versus who didn't, so staff know who still needs a
// phone call rather than a cold WhatsApp message.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text') ?? ''
  const ref  = searchParams.get('ref')  ?? 'Unknown source'

  await Promise.allSettled([
    logWhatsAppClick({ ref }),
    notifyTelegram(`✅ <b>Tapped through to WhatsApp</b> — ${escHtml(ref)}`),
  ])

  const target = `https://wa.me/${BUSINESS_WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`
  return NextResponse.redirect(target)
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
