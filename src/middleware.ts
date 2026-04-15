import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter for the /api/* routes.
// On Vercel each serverless instance has its own memory, so this is
// per-instance (fine for abuse prevention on a low-traffic API).
// For strict global rate limiting swap this for @upstash/ratelimit + Vercel KV.

const WINDOW_MS = 60_000   // 1 minute
const MAX_REQUESTS = 10    // max 10 form submissions per IP per minute

const ipMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = ipMap.get(ip)

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only rate-limit API routes
  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1'

    const { allowed, remaining } = rateLimit(ip)

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please wait a minute.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': String(MAX_REQUESTS),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    const res = NextResponse.next()
    res.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS))
    res.headers.set('X-RateLimit-Remaining', String(remaining))
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
