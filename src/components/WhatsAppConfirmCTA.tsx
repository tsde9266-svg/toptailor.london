// Customer-initiated "confirm on WhatsApp" button used at the end of every
// booking/inquiry form. Routes through /api/go/whatsapp so staff get a ping
// when someone taps through — and, for anyone who doesn't, know to call them
// instead of messaging cold. Never point this (or any button like it)
// directly at a link that opens WhatsApp addressed to the CUSTOMER — see
// src/lib/greeting.ts for why.

type Props = {
  message:  string   // pre-filled text, written as if the CUSTOMER is sending it
  refLabel: string   // shown to staff in the click Telegram ping, e.g. "Jane Doe · 07123456789 · Booking form"
  label?:   string
}

export default function WhatsAppConfirmCTA({ message, refLabel, label = 'Confirm on WhatsApp' }: Props) {
  const href = `/api/go/whatsapp?text=${encodeURIComponent(message)}&ref=${encodeURIComponent(refLabel)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-4 font-sans text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[#1fad53] transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M11.5 2C6.253 2 2 6.253 2 11.5c0 1.91.524 3.698 1.434 5.229L2 22l5.432-1.418A9.45 9.45 0 0011.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2zm0 17.25a7.74 7.74 0 01-3.964-1.093l-.284-.169-2.942.767.789-2.877-.185-.296A7.71 7.71 0 013.75 11.5C3.75 7.168 7.168 3.75 11.5 3.75s7.75 3.418 7.75 7.75-3.418 7.75-7.75 7.75z"/>
      </svg>
      {label} →
    </a>
  )
}
