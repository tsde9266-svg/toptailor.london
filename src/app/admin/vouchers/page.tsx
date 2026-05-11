import Link from 'next/link'
import { getAllVouchers } from '@/lib/kv'
import type { Voucher } from '@/lib/kv'
import VouchersClient from './VouchersClient'

export default async function VouchersPage() {
  let vouchers: Voucher[] = []
  let error = false
  try { vouchers = await getAllVouchers() } catch { error = true }

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-hunter text-parchment px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
        <Link href="/admin" className="font-sans text-[0.75rem] uppercase tracking-widest text-parchment/70 hover:text-parchment transition-colors">
          ← Admin
        </Link>
        <span className="font-playfair text-[1.0625rem]">Vouchers</span>
        <span />
      </div>

      <div className="px-4 lg:px-8 py-8 max-w-3xl mx-auto">
        {error ? (
          <p className="font-sans text-sm text-muted text-center py-16">Storage unavailable.</p>
        ) : (
          <VouchersClient initialVouchers={vouchers} />
        )}
      </div>
    </div>
  )
}
