type TgButton = { text: string; url: string }
type SendResult = { ok: boolean; messageId?: number; error?: string }

// Escape characters that break Telegram's HTML parse mode.
// Must be applied to ALL user-supplied strings embedded in Telegram messages.
export function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function callSendMessage(chatId: string | number, text: string, buttons?: TgButton[][]): Promise<SendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return { ok: false, error: 'TELEGRAM_BOT_TOKEN not set' }

  const body: Record<string, unknown> = { chat_id: chatId, text, parse_mode: 'HTML' }
  if (buttons?.length) body.reply_markup = { inline_keyboard: buttons }

  try {
    const res  = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const json = await res.json() as { ok: boolean; description?: string; result?: { message_id: number } }
    if (!json.ok) return { ok: false, error: json.description ?? JSON.stringify(json) }
    return { ok: true, messageId: json.result?.message_id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

// Sends to the fixed ops group (TELEGRAM_CHAT_ID). Returns the group message id
// so callers can map a later reply back to whoever the notification is about.
export async function notifyTelegram(text: string, buttons?: TgButton[][]): Promise<number | null> {
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!chatId) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping notification')
    return null
  }
  const result = await callSendMessage(chatId, text, buttons)
  if (!result.ok) console.error('[telegram] API error:', result.error)
  return result.messageId ?? null
}

// Sends to an arbitrary chat — e.g. a customer's private DM with the bot.
export async function sendTelegramTo(chatId: number | string, text: string): Promise<SendResult> {
  return callSendMessage(chatId, text)
}
