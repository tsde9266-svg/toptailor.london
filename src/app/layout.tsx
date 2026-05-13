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
    default: "Mobile Tailor London | Suit Alterations & Home Visits | Fine Tailors",
  },
  description: "Fine Tailors — London's premier mobile tailoring service. Expert suit alterations, bespoke tailoring and clothing alterations at your door. Home visits across Mayfair, Chelsea, Knightsbridge and central London. Book your home visit today.",
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
  authors: [{ name: 'Fine Tailors' }],
  creator: 'Fine Tailors',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.finetailors.co.uk',
    siteName: 'Fine Tailors',
    title: "Mobile Tailor London | Suit Alterations & Home Visits | Fine Tailors",
    description: 'Expert suit alterations, bespoke tailoring and clothing alterations at your London door. Home visits across Mayfair, Chelsea, Knightsbridge and central London. Book your home visit today.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Fine Tailors — Mobile tailoring and suit alterations in central London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mobile Tailor London | Suit Alterations at Home | Fine Tailors",
    description: 'Expert suit alterations, bespoke tailoring and clothing alterations at your door in Mayfair, Chelsea & central London.',
    images: ['/og-image.jpg'],
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
  alternateName: 'Fine Tailorss',
  url: 'https://www.finetailors.co.uk',
  logo: 'https://www.finetailors.co.uk/icon-512.png',
  image: 'https://www.finetailors.co.uk/og-image.jpg',
  telephone: '+44 7438 145169',
  description: 'Fine Tailors are a professional mobile tailoring service based in London. Specialising in suit alterations, bespoke tailoring and clothing alterations with home visits across central London since 2014.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
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
  ],
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.finetailors.co.uk/#business',
  name: 'Fine Tailors',
  alternateName: 'Fine Tailorss',
  url: 'https://www.finetailors.co.uk',
  telephone: '+44 7438 145169',
  priceRange: '££',
  description: 'Fine Tailors are London\'s premier mobile tailoring service, offering expert suit alterations, bespoke tailoring and clothing alterations at your door. We visit homes and offices across Mayfair, Chelsea, Knightsbridge, Kensington, Belgravia and all central London postcodes.',
  image: 'https://www.finetailors.co.uk/og-image.jpg',
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
        <Script
          id="schema-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
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
