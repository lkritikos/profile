import { useEffect } from 'react'

/**
 * Subtle "fade + rise" entrance for elements marked with `data-reveal`, played
 * once as each scrolls into view.
 *
 * Progressive enhancement: the hidden initial state lives in CSS under the
 * `reveal-ready` class, which this hook only adds when JS is running *and*
 * motion is allowed. So with no JS, or under `prefers-reduced-motion`, every
 * `[data-reveal]` element is simply visible — nothing is ever hidden behind an
 * animation that might not play.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (targets.length === 0) return

    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target) // play once
        }
      },
      // Trigger a touch before the element is fully on screen.
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
