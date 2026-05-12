// Vercel Cron — runs once a day (configured in vercel.json) and posts a
// summary of the last 24h to the Telegram group.
//
// Auth: Vercel Cron jobs send a Bearer token in the Authorization header
// matching CRON_SECRET. We reject anything else so the endpoint can't be
// hit by random callers.

import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, getAllConsultations, getAllCalBookings } from '@/lib/kv'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.finetailors.co.uk'

async function notifyTelegram(text: string) {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  }).catch(() => {})
}

function authorised(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  // Vercel cron sends: Authorization: Bearer <CRON_SECRET>
  const header = req.headers.get('authorization') ?? ''
  return header === `Bearer ${secret}`
}

export async function GET(req: NextRequest) {
  if (!authorised(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const since = Date.now() - 24 * 60 * 60 * 1000

  let orders        = []
  let consultations = []
  let calBookings   = []
  try {
    [orders, consultations, calBookings] = await Promise.all([
      getAllOrders(),
      getAllConsultations(),
      getAllCalBookings(),
    ])
  } catch (e) {
    console.error('[daily-digest] KV read failed', e)
    return NextResponse.json({ error: 'KV read failed' }, { status: 500 })
  }

  const recentOrders        = orders.filter(o => new Date(o.createdAt).getTime() >= since)
  const recentConsultations = consultations.filter(c => new Date(c.createdAt).getTime() >= since)

  const ordersByStatus = {
    pending_collection: recentOrders.filter(o => o.status === 'pending_collection').length,
    quote_sent:         recentOrders.filter(o => o.status === 'quote_sent').length,
    quote_approved:     recentOrders.filter(o => o.status === 'quote_approved').length,
    complete:           recentOrders.filter(o => o.status === 'complete').length,
  }

  const consByStatus = {
    pending: recentConsultations.filter(c => c.status === 'pending_call').length,
    called:  recentConsultations.filter(c => c.status === 'called').length,
    closed:  recentConsultations.filter(c => c.status === 'closed').length,
  }

  // Pending items still open (any age) — these are the things that need attention
  const stillPendingOrders        = orders.filter(o => o.status === 'pending_collection').length
  const stillPendingConsultations = consultations.filter(c => c.status === 'pending_call').length
  const pendingCalBookings        = calBookings.filter(b => b.status === 'pending').length
  const awaitingCalBookings       = calBookings.filter(b => b.status === 'awaiting_customer').length

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/London',
  })

  const message =
    `📊 <b>Daily Digest — ${today}</b>\n\n` +
    `🛒 <b>Last 24h orders:</b> ${recentOrders.length}\n` +
    (recentOrders.length > 0
      ? `  • Pending: ${ordersByStatus.pending_collection}\n` +
        `  • Quoted: ${ordersByStatus.quote_sent}\n` +
        `  • Approved: ${ordersByStatus.quote_approved}\n` +
        `  • Complete: ${ordersByStatus.complete}\n\n`
      : '\n') +
    `📞 <b>Last 24h callbacks:</b> ${recentConsultations.length}\n` +
    (recentConsultations.length > 0
      ? `  • Pending: ${consByStatus.pending}\n` +
        `  • Called: ${consByStatus.called}\n` +
        `  • Closed: ${consByStatus.closed}\n\n`
      : '\n') +
    `⏳ <b>Still needs action:</b>\n` +
    `  • ${stillPendingOrders} order${stillPendingOrders !== 1 ? 's' : ''} awaiting collection\n` +
    `  • ${stillPendingConsultations} callback${stillPendingConsultations !== 1 ? 's' : ''} pending\n` +
    (pendingCalBookings  > 0 ? `  • ${pendingCalBookings} booking${pendingCalBookings !== 1 ? 's' : ''} awaiting your approval\n` : '') +
    (awaitingCalBookings > 0 ? `  • ${awaitingCalBookings} booking${awaitingCalBookings !== 1 ? 's' : ''} awaiting customer reply\n` : '') +
    `\n`+
    `🔗 <a href="${BASE_URL}/admin">Open admin</a>`

  await notifyTelegram(message)
  return NextResponse.json({ ok: true, sent: true })
}
