import { NextRequest, NextResponse } from 'next/server'
import { notifyTelegram, sendTelegramTo, escHtml } from '@/lib/telegram'
import { saveTelegramRelay, getTelegramRelay } from '@/lib/kv'

// Temporary stopgap while the WhatsApp Business number is blocked/under
// review: customers message @toptailorbot on Telegram instead. This webhook
// forwards their messages into the ops group, and relays a staff reply
// (typed as a reply-to on the forwarded message) back to the customer.
// Remove once WhatsApp is reinstated and the site button is switched back.

type TgUser = {
  id:         number
  first_name?: string
  last_name?:  string
  username?:   string
}

type TgMessage = {
  message_id: number
  from?:      TgUser
  chat:       { id: number; type: string }
  text?:      string
  reply_to_message?: { message_id: number }
}

type TgUpdate = { message?: TgMessage }

function labelFor(user?: TgUser): string {
  if (!user) return 'Unknown'
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Unknown'
  return user.username ? `${name} (@${user.username})` : name
}

export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret && req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let update: TgUpdate
  try {
    update = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }

  const msg = update.message
  if (!msg) return NextResponse.json({ ok: true })

  const opsChatId = process.env.TELEGRAM_CHAT_ID

  // ── Staff replied (reply-to) inside the ops group — relay it to the customer ──
  if (opsChatId && String(msg.chat.id) === opsChatId && msg.reply_to_message) {
    const relay = await getTelegramRelay(msg.reply_to_message.message_id).catch(() => null)
    if (relay && msg.text) {
      const result = await sendTelegramTo(relay.customerChatId, msg.text)
      await notifyTelegram(
        result.ok
          ? `↩️ Reply sent to ${escHtml(relay.customerLabel)} ✓`
          : `⚠️ Failed to send reply to ${escHtml(relay.customerLabel)} — ${escHtml(result.error ?? 'unknown error')}`
      )
    }
    return NextResponse.json({ ok: true })
  }

  // ── A private DM to the bot — forward it into the ops group ──────────────────
  if (msg.chat.type === 'private') {
    const label = labelFor(msg.from)
    const isStart = msg.text?.startsWith('/start')
    const body = isStart
      ? '👋 Opened a chat (tapped the website button) — say hi to get things started.'
      : msg.text
        ? escHtml(msg.text)
        : '📎 Sent something that isn\'t text (photo/voice/sticker) — ask them to describe it in words.'

    const groupMessageId = await notifyTelegram(
      `📩 <b>New Telegram message</b>\n\n` +
      `👤 ${escHtml(label)}\n\n` +
      `💬 ${body}\n\n` +
      `<i>Reply directly to THIS message (swipe/long-press → Reply) to send a reply back to them.</i>`
    )
    if (groupMessageId) {
      await saveTelegramRelay(groupMessageId, { customerChatId: msg.chat.id, customerLabel: label }).catch(() => {})
    }
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
