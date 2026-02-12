import { useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

function AnimatedSection({ children, className, ...props }) {
  const ref = useRef(null)
  useScrollAnimation([ref])

  return (
    <div ref={ref} data-animate-block className={className} {...props}>
      {children}
    </div>
  )
}

export default AnimatedSection
