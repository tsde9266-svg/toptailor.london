import type { NextRequest } from 'next/server'

export function isAdmin(req: NextRequest): boolean {
  const session = req.cookies.get('admin_session')?.value
  const secret  = process.env.ADMIN_SECRET
  return Boolean(secret && session === secret)
}
