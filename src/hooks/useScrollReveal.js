import { useEffect } from 'react'

export function useScrollReveal(containerRef) {
  useEffect(() => {
    const observe = () => {
      const els = (containerRef?.current || document).querySelectorAll('.reveal:not(.in)')
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
        })
      }, { threshold: 0.15 })
      els.forEach((el) => io.observe(el))
      return io
    }
    const io = observe()
    return () => io.disconnect()
  }, [containerRef])
}
