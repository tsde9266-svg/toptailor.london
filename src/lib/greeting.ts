// Shared greeting message + WhatsApp link generation.
// Used by Telegram notifications, customer emails, and admin "Send greeting" buttons.

const GREETING_MESSAGE =
  `Thank you for contacting Fine Tailors! Someone will be in touch shortly to confirm the details of your appointment. In the meantime if you have any questions or changes to make feel free to message us.\n\n*Fine Tailors*\n_London's finest tailors, at your door_`

export const BUSINESS_WHATSAPP = '447438145169'

// Normalises any UK phone format to international (e.g. "07438..." -> "447438...")
export function normaliseUkPhone(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^0/, '44')
}

// Build a wa.me link the ADMIN clicks to send the customer the greeting.
// Opens the customer's WhatsApp with the greeting pre-filled.
export function adminGreetingLink(customerPhone: string): string {
  const num = normaliseUkPhone(customerPhone)
  return `https://wa.me/${num}?text=${encodeURIComponent(GREETING_MESSAGE)}`
}

// Build a wa.me link the CUSTOMER clicks to message the business.
export function customerToBusinessLink(prefilledText = ''): string {
  const text = prefilledText || 'Hi, I have a question about my booking.'
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`
}
