// ─── Shared Resend email helper ───────────────────────────────────────────────
// Reads MAIL_FROM env so we can move off Resend's sandbox sender (onboarding@resend.dev)
// without touching every call site. The sandbox sender only delivers to the
// Resend account owner — *not* to real customers. Once you've verified a domain
// in the Resend dashboard, set:
//
//   MAIL_FROM='Fine Tailors <hello@finetailors.co.uk>'
//
// and customers will start receiving emails.
//
// On Resend HTTP error (4xx/5xx), this *throws* with the response body so callers
// can decide whether to fail the request or just log. The previous inline fetches
// silently swallowed errors, which is why "Quote Sent ✓" appeared even when Resend
// had rejected the send.

const RESEND_URL = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'Fine Tailors <onboarding@resend.dev>'

export type SendMailInput = {
  to:       string | string[]
  subject:  string
  html?:    string
  text?:    string
  replyTo?: string
}

export class MailNotConfiguredError extends Error {
  constructor() { super('RESEND_API_KEY is not set') }
}

/**
 * Send an email via Resend.
 *
 * Returns silently if RESEND_API_KEY is missing (so dev/local doesn't crash).
 * Throws on Resend HTTP error so the caller can decide how to handle it.
 */
export async function sendMail({ to, subject, html, text, replyTo }: SendMailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[mail] RESEND_API_KEY missing — skipping send to', to)
    return
  }

  const from = process.env.MAIL_FROM?.trim() || DEFAULT_FROM
  const recipients = Array.isArray(to) ? to : [to]

  const res = await fetch(RESEND_URL, {
    method:  'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      ...(html    ? { html }            : {}),
      ...(text    ? { text }            : {}),
      ...(replyTo ? { reply_to: replyTo }: {}),
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const usingSandbox = from.includes('onboarding@resend.dev')
    const hint = usingSandbox
      ? ' (Hint: you are using Resend\'s sandbox sender onboarding@resend.dev, which only delivers to the Resend account owner. Verify a domain in the Resend dashboard and set MAIL_FROM to a verified address.)'
      : ''
    const err = new Error(
      `Resend send failed (${res.status}) to ${recipients.join(', ')} from "${from}" — ${body || '(no body)'}${hint}`
    )
    console.error('[mail] failed:', err.message)
    throw err
  }
}
