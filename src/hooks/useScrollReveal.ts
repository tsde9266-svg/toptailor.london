'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.12
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal the section itself
          el.classList.add('is-revealed')
          // Cascade to all child stagger items so they animate in
          // (each child has its own transition-delay for the stagger effect)
          el.querySelectorAll<HTMLElement>('.reveal-on-scroll').forEach(
            (child) => child.classList.add('is-revealed')
          )
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
