'use client'
import { useState, useEffect } from 'react'
import Script from 'next/script'

const CONSENT_KEY = 'oct_cookie_consent'

type ConsentState = { analytics: boolean; marketing: boolean }

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        setConsent(JSON.parse(stored))
      } else {
        setShowBanner(true)
      }
    } catch {
      setShowBanner(true)
    }
  }, [])

  function save(c: ConsentState) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)) } catch {}
    setConsent(c)
    setShowBanner(false)
  }

  return (
    <>
      {consent?.marketing && (
        <>
          <Script
            id="gtag-ads-src"
            src="https://www.googletagmanager.com/gtag/js?id=AW-18127638127"
            strategy="afterInteractive"
          />
          <Script
            id="gtag-ads-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18127638127');`,
            }}
          />
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 lg:bottom-0 left-0 right-0 z-[200] bg-charcoal border-t border-white/10 px-6 py-5"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-sans text-[0.8125rem] font-light text-parchment/80 flex-1 leading-relaxed">
              We use cookies to improve your experience and show relevant ads.
              You can accept all cookies or only essential ones.{' '}
              <a href="/privacy" className="underline hover:text-parchment transition-colors">
                Privacy Policy
              </a>
            </p>
            <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => save({ analytics: false, marketing: false })}
                className="
                  flex-1 sm:flex-none
                  font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                  text-parchment/70 border border-white/20
                  px-5 py-3
                  hover:text-parchment hover:border-white/40
                  transition-colors duration-200
                "
              >
                Essential Only
              </button>
              <button
                onClick={() => save({ analytics: true, marketing: true })}
                className="
                  flex-1 sm:flex-none
                  font-sans text-[0.6875rem] font-medium tracking-widest uppercase
                  bg-hunter text-parchment
                  px-5 py-3
                  hover:bg-[#1E3D17]
                  transition-colors duration-200
                "
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
