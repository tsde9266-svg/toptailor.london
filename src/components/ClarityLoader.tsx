'use client'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

// Only load Clarity on public pages — never on admin or invoice pages
export default function ClarityLoader() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin') || pathname.startsWith('/invoice') || pathname.startsWith('/quote')) {
    return null
  }
  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wqp1fj5h4b");`,
      }}
    />
  )
}
