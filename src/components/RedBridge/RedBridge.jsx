import { useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function RedBridge({ onRevealLegacy }) {
  const rbRef = useRef(null)
  const isMobile = useIsMobile()

  const handleOpen = () => {
    if (isMobile) return
    onRevealLegacy()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (rbRef.current) rbRef.current.classList.add('rb-gone')
      })
    })
    setTimeout(() => {
      if (rbRef.current) rbRef.current.style.display = 'none'
    }, 1100)
  }

  return (
    <div className="red-bridge" ref={rbRef}>
      <video autoPlay muted loop playsInline preload="auto">
        <source src="assets/video/190db544.mp4" type="video/mp4" />
      </video>
      <div className="rb-inner reveal">
        <p className="rb-eye">A Legacy of Unforgettable Taste</p>
        <h2 className="rb-h">
          We've grown alongside India, becoming part of the moments, rituals and traditions that bring people together. Along the way, we've helped make these experiences worth remembering
        </h2>
        <button className="btn btn-white rb-btn" onClick={handleOpen}>
          Know about us{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
        </button>
      </div>
    </div>
  )
}
