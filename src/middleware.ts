import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Redis-backed rate limiter — works across all Vercel serverless instances
const redis = new Redis({
  url:   process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Booking/inquiry forms: max 3 submissions per IP per hour
const formLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  prefix:  'rl:form',
})

// General public API: max 30 requests per IP per minute
const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  prefix:  'rl:api',
})

const FORM_ROUTES = [
  '/api/book-visit',
  '/api/inquiry',
  '/api/phone-consultation',
  '/api/contact',
  '/api/order',
  '/api/survey',
  '/api/review/submit',
]

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin auth ────────────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get('admin_session')?.value
    const secret  = process.env.ADMIN_SECRET
    if (!secret || session !== secret) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // ── Rate-limit public API routes (admin APIs are cookie-protected, skip them) ─
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/admin/') && !pathname.startsWith('/api/cron/')) {
    const ip = getIp(request)

    const isForm = FORM_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))
    const { success, remaining } = isForm
      ? await formLimiter.limit(ip)
      : await apiLimiter.limit(ip)

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type':          'application/json',
            'Retry-After':           isForm ? '3600' : '60',
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    const res = NextResponse.next()
    res.headers.set('X-RateLimit-Remaining', String(remaining))
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/admin', '/admin/:path*'],
}
