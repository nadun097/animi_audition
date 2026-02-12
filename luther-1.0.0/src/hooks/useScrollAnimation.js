import { useEffect } from 'react'

function useScrollAnimation(refs) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset

      refs.forEach((ref) => {
        const current = ref.current
        if (!current) return

        const viewportHeight = window.innerHeight
        const triggerTop = current.offsetTop + viewportHeight * 0.2 - viewportHeight
        const blockHeight = current.offsetHeight
        const blockSpace = triggerTop + blockHeight
        const inView = scrollY > triggerTop && scrollY <= blockSpace
        const isAnimated = current.classList.contains('ss-animated')

        if (inView && !isAnimated) {
          current.classList.add('ss-animated')
          const elements = current.querySelectorAll('[data-animate-el]')
          elements.forEach((el, index) => {
            el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${200 + index * 400}ms, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${200 + index * 400}ms`
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
        }
      })
    }

    // Set initial state for animated elements
    refs.forEach((ref) => {
      const current = ref.current
      if (!current) return
      const elements = current.querySelectorAll('[data-animate-el]')
      elements.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(100px)'
      })
    })

    window.addEventListener('scroll', handleScroll)
    // Trigger once on mount
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [refs])
}

export default useScrollAnimation
