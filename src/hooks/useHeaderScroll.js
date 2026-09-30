import { useState, useEffect, useRef } from 'react'

export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > 100) setHidden(y > lastY.current)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return { scrolled, hidden }
}
