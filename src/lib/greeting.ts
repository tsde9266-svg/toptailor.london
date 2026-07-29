// Shared greeting message + WhatsApp link generation.
// Used by Telegram notifications, customer emails, and admin "Send greeting" buttons.
//
// IMPORTANT — WhatsApp policy: a business may only *initiate* a WhatsApp
// conversation via an approved Message Template on the paid Business Platform.
// The plain WhatsApp Business App (what we use) has no template mechanism at
// all, so a business sending the first message to someone who hasn't messaged
// first is a policy violation regardless of wording — this got our number
// blocked once already. Every link below that is meant to open a *new*
// conversation must be built to be sent BY THE CUSTOMER, addressed to
// BUSINESS_WHATSAPP. Only reply-style links (used once a customer has already
// messaged in) may be addressed to the customer's own number.

export const BUSINESS_WHATSAPP = '447438145169'

// Normalises any UK phone format to international (e.g. "07438..." -> "447438...")
export function normaliseUkPhone(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^0/, '44')
}

// Build a wa.me link the CUSTOMER clicks to message the business.
export function customerToBusinessLink(prefilledText = ''): string {
  const text = prefilledText || 'Hi, I have a question about my booking.'
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`
}

// Build a wa.me link the CUSTOMER clicks to follow up after submitting a web
// form (contact/consultation/etc). Puts the customer in the initiating seat
// so the conversation is compliant from message one, rather than a member of
// staff messaging them first.
export function customerFollowUpLink(context: string, name?: string): string {
  const text = `Hi${name ? ` ${name}` : ''}, I just submitted a ${context} on your website — following up here.`
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`
}

// ─── Booking date/time formatters ─────────────────────────────────────────────

// For UTC ISO strings from cal.com webhook — displays in London timezone.
// Format: "Wednesday 13 May 2026" (no ordinal suffix)
export function fmtBookingDate(iso: string): string {
  const d  = new Date(iso)
  const tz = 'Europe/London'
  return [
    new Intl.DateTimeFormat('en-GB', { weekday: 'long',    timeZone: tz }).format(d),
    new Intl.DateTimeFormat('en-GB', { day:     'numeric', timeZone: tz }).format(d),
    new Intl.DateTimeFormat('en-GB', { month:   'long',    timeZone: tz }).format(d),
    new Intl.DateTimeFormat('en-GB', { year:    'numeric', timeZone: tz }).format(d),
  ].join(' ')
}

// For UTC ISO strings from cal.com webhook — "9am", "10:30am" in London timezone.
export function fmt12h(iso: string): string {
  const d     = new Date(iso)
  const parts = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Europe/London',
  }).formatToParts(d)
  const hour   = parts.find(p => p.type === 'hour')?.value      ?? ''
  const minute = parts.find(p => p.type === 'minute')?.value    ?? '00'
  const period = (parts.find(p => p.type === 'dayPeriod')?.value ?? '').toLowerCase()
  return minute === '00' ? `${hour}${period}` : `${hour}:${minute}${period}`
}

// For admin-entered local datetime strings like "2026-05-13T09:00" — no timezone shift.
// Format: "Wednesday 13 May 2026" (no ordinal suffix)
export function fmtSlotDate(localDt: string): string {
  const datePart = localDt.split('T')[0] ?? localDt
  const [y, m, d] = datePart.split('-').map(Number)
  const date = new Date(y ?? 2000, (m ?? 1) - 1, d ?? 1)
  return [
    date.toLocaleDateString('en-GB', { weekday: 'long' }),
    String(d ?? 1),
    date.toLocaleDateString('en-GB', { month:   'long' }),
    String(y ?? ''),
  ].join(' ')
}

export function fmtSlotTime(localDt: string): string {
  const raw  = localDt.includes('T') ? (localDt.split('T')[1] ?? '') : localDt
  const time = raw.slice(0, 5)
  const [h, m] = time.split(':').map(Number)
  const period = (h ?? 0) >= 12 ? 'pm' : 'am'
  const hour12 = (h ?? 0) % 12 || 12
  return (m ?? 0) === 0
    ? `${hour12}${period}`
    : `${hour12}:${String(m ?? 0).padStart(2, '0')}${period}`
}

// ─── WhatsApp reply builders ───────────────────────────────────────────────────
// These build BUSINESS -> CUSTOMER links (admin sends first). Only safe to use
// as a REPLY inside an already-open 24h customer service window — i.e. the
// customer messaged this number first (e.g. the WhatsAppBooking flow, where
// step one is always "customer messages on WhatsApp"). Never wire these into
// a flow whose only prior contact was a website form — see customerFollowUpLink
// above for that case instead.

// Confirmation template (user's exact wording, auto-filled with booking data).
// Used when admin approves — opens WhatsApp pre-filled, ready to send.
export function bookingConfirmationWALink(phone: string, params: {
  startTime: string  // UTC ISO from cal.com
  endTime:   string
  location:  string
}): string {
  const { startTime, endTime, location } = params
  const num = normaliseUkPhone(phone)
  const msg = [
    `Thank you for booking with Fine Tailors.`,
    `Your pick up has been confirmed for`,
    `Date: ${fmtBookingDate(startTime)}`,
    `Time: ${fmt12h(startTime)} - ${fmt12h(endTime)}`,
    ...(location ? [`Location: ${location}`] : []),
    ...(phone    ? [`Contact: ${phone}`]     : []),
    `If you would like to make any changes please contact us.`,
  ].join('\n')
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
}

// Confirmation for an admin-chosen slot (local datetime strings).
export function slotConfirmationWALink(phone: string, params: {
  start:    string  // local datetime "2026-05-13T09:00"
  end:      string
  location: string
}): string {
  const { start, end, location } = params
  const num = normaliseUkPhone(phone)
  const msg = [
    `Thank you for booking with Fine Tailors.`,
    `Your pick up has been confirmed for`,
    `Date: ${fmtSlotDate(start)}`,
    `Time: ${fmtSlotTime(start)} - ${fmtSlotTime(end)}`,
    ...(location ? [`Location: ${location}`] : []),
    ...(phone    ? [`Contact: ${phone}`]     : []),
    `If you would like to make any changes please contact us.`,
  ].join('\n')
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
}

// Quote breakdown — sent to customer via WhatsApp instead of a link.
// Customer replies YES to approve or describes what they want changed.
export function quoteWALink(phone: string, params: {
  name:   string
  items:  Array<{ name: string; price: number }>
  total:  number
  notes?: string
}): string {
  const { name, items, total, notes } = params
  const lines = [
    `Hi ${name},`,
    ``,
    `Here is your quote from Fine Tailors:`,
    ``,
    ...items.map(i => `• ${i.name} — £${i.price}`),
    ``,
    `Total: £${total}`,
  ]
  if (notes?.trim()) lines.push(``, notes.trim())
  lines.push(
    ``,
    `Reply *YES* to approve, or let us know what you'd like to add or remove and we'll update it for you.`,
    ``,
    `*Fine Tailors*`,
    `_London's finest tailors, at your door_`,
  )
  const num = normaliseUkPhone(phone)
  return `https://wa.me/${num}?text=${encodeURIComponent(lines.join('\n'))}`
}

// Proposed-times template — admin sends this when offering alternative slots.
export function proposeTimesWALink(phone: string, params: {
  name:       string
  slots:      Array<{ start: string; end: string }>  // local datetime strings
  adminNote?: string
}): string {
  const { name, slots, adminNote } = params
  const icons = ['1️⃣', '2️⃣', '3️⃣']
  const slotLines = slots.map((s, i) =>
    `${icons[i] ?? `${i + 1}.`} ${fmtSlotDate(s.start)} · ${fmtSlotTime(s.start)} – ${fmtSlotTime(s.end)}`
  ).join('\n')

  const lines = [
    `Hello ${name},`,
    ``,
    `Thank you for booking with Fine Tailors. Unfortunately we are unable to confirm your original appointment time.`,
    ``,
    `We have the following alternative slots available — please reply with your preferred option:`,
    ``,
    slotLines,
  ]
  if (adminNote) lines.push(``, adminNote)
  lines.push(``, `Please reply with your choice and we’ll confirm your booking right away.`, ``, `*Fine Tailors*`, `_London’s finest tailors, at your door_`)

  return `https://wa.me/${normaliseUkPhone(phone)}?text=${encodeURIComponent(lines.join('\n'))}`
}
