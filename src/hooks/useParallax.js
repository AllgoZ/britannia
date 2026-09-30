import { useEffect } from 'react'

export function useParallax(parRefs, floRefs) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onPar = () => {
      parRefs?.forEach((ref) => {
        if (!ref.current) return
        const el = ref.current
        const r = el.parentElement.getBoundingClientRect()
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        el.style.transform = `translateY(${Math.max(-9, Math.min(9, p * -9))}%)`
      })
      floRefs?.forEach((ref) => {
        if (!ref.current) return
        const el = ref.current
        const r = el.getBoundingClientRect()
        el.style.transform = `translateY(${(r.top - window.innerHeight / 2) * -0.05}px) rotate(${r.top * 0.004}deg)`
      })
    }
    const handler = () => requestAnimationFrame(onPar)
    window.addEventListener('scroll', handler, { passive: true })
    onPar()
    return () => window.removeEventListener('scroll', handler)
  }, [parRefs, floRefs])
}
