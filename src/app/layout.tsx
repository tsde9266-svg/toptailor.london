import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import WhatsAppButton  from '@/components/WhatsAppButton'
import CartDrawer      from '@/components/CartDrawer'
import CartFloat       from '@/components/CartFloat'
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
  metadataBase: new URL('https://www.finetailors.co.uk'),
  title: {
    template: '%s | Fine Tailors',
    default: "Mobile Tailor Central London | Suit & Clothing Alterations | Fine Tailors",
  },
  description: "London's collection-based tailoring service. We collect from your door in Mayfair, Westminster, Knightsbridge & all Central London postcodes — returned perfect in 5–7 days.",
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
      { url: '/logo-icon.png', type: 'image/png', sizes: '192x192' },
      { url: '/logo-icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/logo-icon.png',
    apple: [{ url: '/logo-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  authors: [{ name: 'Fine Tailors' }],
  creator: 'Fine Tailors',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.finetailors.co.uk',
    siteName: 'Fine Tailors',
    title: "Mobile Tailor Central London | Fine Tailors",
    description: 'Expert suit alterations and bespoke tailoring collected from your Central London door. No shop visit, no stranger in your home. Returned pressed and perfect.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fine Tailors — Collection-based tailoring and suit alterations in Central London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mobile Tailor Central London | Fine Tailors",
    description: 'Expert suit alterations and bespoke tailoring collected from your Central London door. No shop visit. Returned pressed and perfect in 5–7 days.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.finetailors.co.uk',
  },
  other: {
    'geo.region':    'GB-ENG',
    'geo.placename': 'London',
    'geo.position':  '51.5074;-0.1278',
    'ICBM':          '51.5074, -0.1278',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.finetailors.co.uk/#website',
  url: 'https://www.finetailors.co.uk',
  name: 'Fine Tailors',
  description: 'London\'s premier mobile tailoring service — expert suit alterations, bespoke tailoring and clothing alterations at your door.',
  publisher: { '@id': 'https://www.finetailors.co.uk/#business' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.finetailors.co.uk/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.finetailors.co.uk/#organization',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  logo: 'https://www.finetailors.co.uk/logo-icon.png',
  image: 'https://www.finetailors.co.uk/og-image.png',
  telephone: '+447438145169',
  description: 'Fine Tailors are a collection-based tailoring service operating across Central London since 2014. We collect garments from your door, alter them, and return them pressed and perfect in 5–7 days.',
  areaServed: { '@type': 'City', name: 'London' },
  sameAs: [
    'https://www.instagram.com/oneclicktailor',
    'https://www.facebook.com/oneclicktailor',
  ],
  knowsAbout: [
    'Suit Alterations',
    'Bespoke Tailoring',
    'Clothing Alterations',
    'Dress Alterations',
    'Mobile Tailoring',
    'Made to Measure Suits',
    'Wedding Dress Alterations',
    'Leather Garment Alterations',
    'Trouser Alterations',
    'Jacket Alterations',
    'Coat Alterations',
    'Shirt Alterations',
  ],
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.finetailors.co.uk/#business',
  name: 'Fine Tailors',
  url: 'https://www.finetailors.co.uk',
  telephone: '+447438145169',
  priceRange: '££',
  description: 'Fine Tailors is London\'s collection-based tailoring service. We collect garments from your door across Mayfair, Westminster, Knightsbridge, Kensington, Chelsea, Belgravia and all Central London postcodes — altered and returned pressed and perfect in 5–7 days.',
  image: 'https://www.finetailors.co.uk/og-image.png',
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
    { '@type': 'Neighborhood', name: 'Westminster' },
    { '@type': 'Neighborhood', name: 'Bloomsbury' },
    { '@type': 'Neighborhood', name: 'Islington' },
    { '@type': 'Neighborhood', name: 'Paddington' },
    { '@type': 'Neighborhood', name: 'Pimlico' },
    { '@type': 'Neighborhood', name: 'Clerkenwell' },
    { '@type': 'Neighborhood', name: 'Shoreditch' },
    { '@type': 'Neighborhood', name: 'Canary Wharf' },
    { '@type': 'Neighborhood', name: 'Notting Hill' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 51.5074, longitude: -0.1278 },
    geoRadius: '10000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Collection-Based Tailoring & Alteration Services, Central London',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Suit Alterations London', description: 'Expert suit alterations collected from your Central London door. Jacket, trouser and waistcoat alterations returned in 5–7 days.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dress Alterations London', description: 'Professional dress and occasion wear alterations collected from your door and returned within 5–7 days.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trouser Alterations London', description: 'Trouser hemming, tapering and waist adjustments collected from your Central London address.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bespoke Tailoring London', description: 'Made-to-measure bespoke suits and garments, collected and delivered to your Central London address.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shirt Alterations London', description: 'Shirt alterations including sleeve shortening, body tapering and collar adjustments, collected from your door.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Dress Alterations London', description: 'Specialist wedding and bridesmaid dress alterations collected from your Central London door.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jacket Alterations London', description: 'Jacket sleeve, body and lining alterations collected from your door and returned in 5–7 days.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Coat Alterations London', description: 'Coat shortening and body alterations collected from your Central London address.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Leather Jacket Alterations London', description: 'Specialist leather garment alterations, quoted on inspection, collected from your door.' } },
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
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-icon.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <CartFloat />
          <WhatsAppButton />
          <CookieBanner />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wqp1fj5h4b");`,
          }}
        />

      </body>
    </html>
  )
}
