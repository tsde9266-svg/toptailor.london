'use client'
import { useRouter } from 'next/navigation'
import { useCart }   from '@/context/CartContext'
import { HOME_VISIT_ITEM } from '@/data/services'

export default function GetStartedQuickAdd() {
  const { add, has } = useCart()
  const router = useRouter()

  function handleClick() {
    if (!has(HOME_VISIT_ITEM.id)) add(HOME_VISIT_ITEM)
    router.push('/checkout')
  }

  return (
    <button
      onClick={handleClick}
      className="
        flex-shrink-0 w-full lg:w-auto
        bg-hunter text-parchment px-8 py-4
        font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase
        hover:bg-[#1E3D17] transition-colors duration-200
      "
    >
      Add Home Visit + Checkout →
    </button>
  )
}
