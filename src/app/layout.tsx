import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import WhatsAppButton  from '@/components/WhatsAppButton'
import CartDrawer      from '@/components/CartDrawer'
import { CartProvider } from '@/context/CartContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://toptailor.london'),
  title: 'Top Tailor — Bespoke Tailoring, Brought to Your Door',
  description:
    'Premium personal tailoring service in central London. Alterations, repairs, and bespoke commissions — collected and delivered to your door.',
  openGraph: {
    title: 'Top Tailor — Bespoke Tailoring, Brought to Your Door',
    description: 'Premium personal tailoring, door-to-door in central London.',
    url: 'https://toptailor.london',
    siteName: 'Top Tailor',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Tailor — Bespoke Tailoring, Brought to Your Door',
    description: 'Premium personal tailoring, door-to-door in central London.',
  },
  alternates: {
    canonical: 'https://toptailor.london',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
