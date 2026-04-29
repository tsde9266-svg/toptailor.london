import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Collection — One Click Tailor',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
