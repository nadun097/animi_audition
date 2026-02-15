import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const onMouseMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      dot.style.opacity = '1'
    }

    const onMouseEnter = () => { dot.style.opacity = '1' }
    const onMouseLeave = () => { dot.style.opacity = '0' }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // hover effect for interactive elements — now includes modal interactive elements
    const hoverTargets = Array.from(document.querySelectorAll('a, button, input, textarea, [role="button"], .work-item, .modal-popup__details'))
    const enterHandler = () => dot.classList.add('is-hovered')
    const leaveHandler = () => dot.classList.remove('is-hovered')
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', enterHandler)
      el.addEventListener('mouseleave', leaveHandler)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', enterHandler)
        el.removeEventListener('mouseleave', leaveHandler)
      })
    }
  }, [])

  return <div className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
}

