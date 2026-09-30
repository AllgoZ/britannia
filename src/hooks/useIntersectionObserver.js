import { useState, useEffect, useRef } from 'react'

export function useIntersectionObserver(ref, threshold = 0.15) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const fired = useRef(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true
        setIsIntersecting(true)
        io.disconnect()
      }
    }, { threshold })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, threshold])
  return isIntersecting
}
