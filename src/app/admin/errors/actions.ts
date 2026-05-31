'use server'
import { revalidatePath } from 'next/cache'
import { clearAllErrors } from '@/lib/kv'

export async function clearErrors() {
  await clearAllErrors()
  revalidatePath('/admin/errors')
}
