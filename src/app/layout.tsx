import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import WhatsAppButton  from '@/components/WhatsAppButton'
import CartDrawer      from '@/components/CartDrawer'
import { CartProvider } from '@/context/CartContext'
import CookieBanner    from '@/components/CookieBanner'

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
    default: "Mobile Tailor London | Suit Alterations & Home Visits | One Click Tailor",
  },
  description: "One Click Tailor — London's premier mobile tailoring service. Expert suit alterations, bespoke tailoring and clothing alterations at your door. Home visits across Mayfair, Chelsea, Knightsbridge and central London. Book a free home visit today.",
  keywords: [
    'mobile tailor London',
    'suit alterations London',
    'tailor home visit London',
    'door to door tailor London',
    'clothing alterations at home London',
    'bespoke suit London',
    'made to measure suit London',
    'dress alterations London',
    'seamstress London',
    'tailor near me London',
    'Mayfair tailor',
    'Chelsea tailor',
    'Knightsbridge tailor',
    'central London tailor',
    'suit fitting at home London',
    'mobile tailoring service London',
    'mens suit alterations London',
    'ladies alterations London',
    'wedding dress alterations London',
    'tailor comes to you London',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  authors: [{ name: 'One Click Tailor' }],
  creator: 'One Click Tailor',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.oneclicktailors.co.uk',
    siteName: 'One Click Tailor',
    title: "Mobile Tailor London | Suit Alterations & Home Visits | One Click Tailor",
    description: 'Expert suit alterations, bespoke tailoring and clothing alterations at your London door. Home visits across Mayfair, Chelsea, Knightsbridge and central London. Book a free home visit today.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'One Click Tailor — Mobile tailoring and suit alterations in central London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mobile Tailor London | Suit Alterations at Home | One Click Tailor",
    description: 'Expert suit alterations, bespoke tailoring and clothing alterations at your door in Mayfair, Chelsea & central London.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.oneclicktailors.co.uk',
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
  '@id': 'https://www.oneclicktailors.co.uk/#business',
  name: 'One Click Tailor',
  alternateName: 'One Click Tailors',
  url: 'https://www.oneclicktailors.co.uk',
  telephone: '+44 7438 145169',
  priceRange: '££',
  description: 'One Click Tailor is London\'s premier mobile tailoring service, offering expert suit alterations, bespoke tailoring and clothing alterations at your door. We visit homes and offices across Mayfair, Chelsea, Knightsbridge, Kensington, Belgravia and all central London postcodes.',
  image: 'https://www.oneclicktailors.co.uk/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  areaServed: [
    { '@type': 'City', name: 'London' },
    { '@type': 'Neighborhood', name: 'Mayfair' },
    { '@type': 'Neighborhood', name: 'Chelsea' },
    { '@type': 'Neighborhood', name: 'Knightsbridge' },
    { '@type': 'Neighborhood', name: 'Kensington' },
    { '@type': 'Neighborhood', name: 'Belgravia' },
    { '@type': 'Neighborhood', name: 'City of London' },
    { '@type': 'Neighborhood', name: 'Marylebone' },
    { '@type': 'Neighborhood', name: 'Fitzrovia' },
    { '@type': 'Neighborhood', name: 'Soho' },
    { '@type': 'Neighborhood', name: 'Covent Garden' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 51.5074, longitude: -0.1278 },
    geoRadius: '5000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mobile Tailoring & Alteration Services London',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Suit Alterations London', description: 'Expert suit alterations at your London home. Jacket, trouser and waistcoat alterations by a qualified mobile tailor.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dress Alterations London', description: 'Professional dress and occasion wear alterations collected from your home and returned within days.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Tailor Home Visit London', description: 'A professional tailor visits your home or office anywhere in central London for fitting, collection and delivery.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bespoke Suit London', description: 'Made-to-measure bespoke suits fitted and delivered to your London address.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trouser Hemming at Home', description: 'Trouser hemming and leg alterations collected and returned to your door.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Dress Alterations London', description: 'Specialist wedding and bridesmaid dress alterations with home collection across London.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Leather Jacket Alterations London', description: 'Expert leather garment alterations by specialist mobile tailor.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clothing Alterations at Home London', description: 'All clothing alterations and repairs collected from your London address.' } },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="video" href="/video/craft.mp4" type="video/mp4" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
          <CookieBanner />
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
