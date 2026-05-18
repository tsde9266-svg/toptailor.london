/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
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
