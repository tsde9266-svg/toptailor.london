'use client'

import { usePathname } from 'next/navigation'

// Temporary stopgap while the WhatsApp Business number is blocked/under
// review — swap back to WhatsApp once it's reinstated.
const TELEGRAM_USERNAME = 'toptailorbot'

export default function TelegramButton() {
  const pathname = usePathname()

  // Hide on any page a customer receives — invoices, quotes, and admin
  if (
    pathname.startsWith('/invoice') ||
    pathname.startsWith('/quote') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/review')
  ) return null

  const url = `https://t.me/${TELEGRAM_USERNAME}?start=website`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on Telegram"
      className="
        fixed bottom-[72px] lg:bottom-6 right-4 lg:right-6 z-[55]
        flex items-center justify-center
        w-12 h-12 lg:w-14 lg:h-14 rounded-full
        shadow-lg
        hover:scale-110 transition-transform duration-200
      "
      style={{ backgroundColor: '#229ED9' }}
    >
      {/* Telegram SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="26"
        height="26"
        aria-hidden="true"
      >
        <path d="M21.05 3.157L17.86 19.79c-.24 1.06-.87 1.32-1.76.82l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.98 9.06-8.19c.39-.35-.09-.55-.61-.2L5.4 12.94l-4.9-1.53c-1.06-.33-1.08-1.06.22-1.57L19.73 2.2c.88-.33 1.65.2 1.32 1.66z"/>
      </svg>
    </a>
  )
}
