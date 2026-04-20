import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://www.oneclicktailors.co.uk'),
  title: {
    template: '%s | One Click Tailor',
    default: "London's Finest Tailors at Your Door | One Click Tailor",
  },
  description: "London's finest tailors at your door. One Click Tailor visits your home in Mayfair, Chelsea, Knightsbridge & central London. Expert tailoring & alterations with 10+ years experience. Book your home visit today.",
  keywords: ['door to door tailor London', 'tailor home visit London', 'clothing alterations at home', 'Mayfair tailor', 'Chelsea tailor', 'central London tailor', 'suit alterations home visit'],
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  authors: [{ name: 'One Click Tailor' }],
  creator: 'One Click Tailor',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.oneclicktailors.co.uk',
    siteName: 'One Click Tailor',
    title: "London's Finest Tailors at Your Door",
    description: 'Expert tailoring & alterations at your home in Mayfair, Chelsea, Knightsbridge & central London. 10+ years experience.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'One Click Tailor — Premium door-to-door tailoring in central London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "London's Finest Tailors at Your Door | One Click Tailor",
    description: 'Expert tailoring at your home in Mayfair, Chelsea & central London.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.oneclicktailors.co.uk',
  },
  verification: {
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
  },
  other: {
    'geo.region':    'GB-ENG',
    'geo.placename': 'London',
    'geo.position':  '51.5074;-0.1278',
    'ICBM':          '51.5074, -0.1278',
  },
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'One Click Tailor',
  url: 'https://www.oneclicktailors.co.uk',
  telephone: '+44-XXXX-XXXXXX',
  priceRange: '££££',
  description: 'Premium door-to-door tailoring and alterations service visiting homes across central London with 10+ years of experience.',
  image: 'https://www.oneclicktailors.co.uk/og-image.jpg',
  areaServed: ['Mayfair', 'Chelsea', 'Knightsbridge', 'Kensington', 'Belgravia', 'City of London', 'Marylebone', 'Fitzrovia'],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 51.5074, longitude: -0.1278 },
    geoRadius: '5000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tailoring Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Suit Alterations at Home' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dress Alterations Home Visit' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Garment Collection and Return' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bespoke Fitting at Your Door' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trouser Hemming at Home' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Dress Alterations London' } },
    ],
  },
  foundingDate: '2014',
  sameAs: [
    'https://www.instagram.com/oneclicktailor',
    'https://www.facebook.com/oneclicktailor',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="video" href="/video/Craft.mp4" type="video/mp4" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
        <Script
          id="schema-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </body>
    </html>
  )
}
