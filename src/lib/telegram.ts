type TgButton = { text: string; url: string }

// Escape characters that break Telegram's HTML parse mode.
// Must be applied to ALL user-supplied strings embedded in Telegram messages.
export function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function notifyTelegram(text: string, buttons?: TgButton[][]): Promise<void> {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const body: Record<string, unknown> = { chat_id: chatId, text, parse_mode: 'HTML' }
  if (buttons?.length) {
    body.reply_markup = { inline_keyboard: buttons }
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  }).catch(() => {})
}
