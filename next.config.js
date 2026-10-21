/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  // Security + performance headers on every response
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Block clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stop MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Minimal referrer leakage
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for 1 year (+ subdomains)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Disable sensitive browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // XSS protection (legacy browsers)
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      // Long-lived cache for static assets (images, fonts, video)
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2|woff|mp4)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Merged area guides into their location pages
      { source: '/blog/tailor-near-me-belgravia', destination: '/tailor-belgravia', permanent: true },
      { source: '/blog/tailor-near-me-bloomsbury', destination: '/tailor-bloomsbury', permanent: true },
      { source: '/blog/tailor-near-me-canary-wharf', destination: '/tailor-canary-wharf', permanent: true },
      { source: '/blog/tailor-near-me-chelsea', destination: '/tailor-chelsea', permanent: true },
      { source: '/blog/tailor-near-me-city-of-london', destination: '/tailor-city-of-london', permanent: true },
      { source: '/blog/tailor-near-me-clerkenwell', destination: '/tailor-clerkenwell', permanent: true },
      { source: '/blog/tailor-near-me-covent-garden', destination: '/tailor-covent-garden', permanent: true },
      { source: '/blog/tailor-near-me-fitzrovia', destination: '/tailor-fitzrovia', permanent: true },
      { source: '/blog/tailor-near-me-fulham', destination: '/tailor-fulham', permanent: true },
      { source: '/blog/tailor-near-me-islington', destination: '/tailor-islington', permanent: true },
      { source: '/blog/tailor-near-me-kensington', destination: '/tailor-kensington', permanent: true },
      { source: '/blog/tailor-near-me-knightsbridge', destination: '/tailor-knightsbridge', permanent: true },
      { source: '/blog/tailor-near-me-marylebone', destination: '/tailor-marylebone', permanent: true },
      { source: '/blog/tailor-near-me-mayfair', destination: '/tailor-mayfair', permanent: true },
      { source: '/blog/tailor-near-me-notting-hill', destination: '/tailor-notting-hill', permanent: true },
      { source: '/blog/tailor-near-me-paddington', destination: '/tailor-paddington', permanent: true },
      { source: '/blog/tailor-near-me-pimlico', destination: '/tailor-pimlico', permanent: true },
      { source: '/blog/tailor-near-me-shoreditch', destination: '/tailor-shoreditch', permanent: true },
      { source: '/blog/tailor-near-me-soho', destination: '/tailor-soho', permanent: true },
      { source: '/blog/tailor-near-me-south-kensington', destination: '/tailor-south-kensington', permanent: true },
      { source: '/blog/tailor-near-me-victoria', destination: '/tailor-victoria', permanent: true },
      { source: '/blog/tailor-near-me-westminster', destination: '/tailor-westminster', permanent: true },
      // non-www → www (canonical domain)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'finetailors.co.uk' }],
        destination: 'https://www.finetailors.co.uk/:path*',
        permanent: true,
      },
      // Old domains → canonical domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.toptailor.london' }],
        destination: 'https://www.finetailors.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'toptailor.london' }],
        destination: 'https://www.finetailors.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.oneclicktailors.co.uk' }],
        destination: 'https://www.finetailors.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'oneclicktailors.co.uk' }],
        destination: 'https://www.finetailors.co.uk/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
