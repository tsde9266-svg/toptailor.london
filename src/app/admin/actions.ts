'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const password = (formData.get('password') as string) ?? ''
  const secret   = process.env.ADMIN_SECRET

  if (!secret)           return { error: 'Admin not configured — set ADMIN_SECRET env var.' }
  if (password !== secret) return { error: 'Wrong password.' }

  cookies().set('admin_session', secret, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   60 * 60 * 24 * 7,   // 7 days
    path:     '/',
  })
  redirect('/admin')
}

export async function signOut() {
  cookies().delete('admin_session')
  redirect('/admin/login')
}
