import { useEffect, useRef } from 'react'

function useScrollAnimation(refs) {
  // Store refs in a stable ref so the effect doesn't re-run on every render
  const stableRefs = useRef(refs)
  stableRefs.current = refs

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      stableRefs.current.forEach((ref) => {
        const current = ref.current
        if (!current) return

        const rect = current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const inView = rect.top < viewportHeight * 0.8 && rect.bottom > 0
        const isAnimated = current.classList.contains('ss-animated')

        if (inView && !isAnimated) {
          current.classList.add('ss-animated')
          const elements = current.querySelectorAll('[data-animate-el]')
          elements.forEach((el, index) => {
            /* speed: durations halved (0.8s -> 0.4s) and stagger delays halved */
            el.style.transition = `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${100 + index * 200}ms, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${100 + index * 200}ms`
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
        }
      })
    }

    // Set initial state for animated elements
    stableRefs.current.forEach((ref) => {
      const current = ref.current
      if (!current) return
      // Clear previous animation state so re-runs work correctly
      current.classList.remove('ss-animated')
      const elements = current.querySelectorAll('[data-animate-el]')
      elements.forEach((el) => {
        el.style.opacity = '0'
        /* reduce translate distance so animation feels faster */
        el.style.transform = 'translateY(50px)'
      })
    })

    window.addEventListener('scroll', handleScroll)
    // Trigger once on mount
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // empty deps — runs once, uses stableRefs for current values
}

export default useScrollAnimation
