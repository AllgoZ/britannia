import { useEffect, useRef, useState } from 'react'
import { feed } from '../../data/feed'
import { useIsMobile } from '../../hooks/useIsMobile'

const igGlyph = (
  <svg className="glyph" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
)

const eyeIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 13s3.6-7 10-7 10 7 10 7"/>
    <circle cx="12" cy="14" r="3"/>
  </svg>
)

function IgItem({ f, dup }) {
  const vidRef = useRef(null)

  useEffect(() => {
    if (!vidRef.current) return
    const io = new IntersectionObserver(([e]) => {
      e.isIntersecting ? vidRef.current?.play().catch(() => {}) : vidRef.current?.pause()
    }, { threshold: 0.7 })
    io.observe(vidRef.current)
    return () => io.disconnect()
  }, [])

  if (f.text) {
    return (
      <a href="#" className={`ig text${dup ? ' dup' : ''}`}>
        <p>{f.text}</p>
        <time>{f.date}</time>
        <img src={`assets/img/${f.p}`} alt="" loading="lazy" />
      </a>
    )
  }

  return (
    <a href="#" className={`ig${dup ? ' dup' : ''}`}>
      <img src={`assets/img/${f.p}`} alt="" loading="lazy" />
      {f.v && (
        <video ref={vidRef} muted loop playsInline preload="none" poster={`assets/img/${f.p}`} src={`assets/video/${f.v}`}></video>
      )}
      {igGlyph}
      <span className="views">{eyeIcon} {f.views}</span>
    </a>
  )
}

export default function Instagram() {
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const isMobile = useIsMobile()

  const reveal = () => {
    if (revealed) return
    setRevealed(true)
  }

  useEffect(() => {
    if (isMobile) { reveal(); return }

    const onScroll = () => {
      if (!sectionRef.current) return
      if (sectionRef.current.getBoundingClientRect().top < -window.innerHeight * 0.5) {
        reveal()
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const allItems = [...feed, ...feed.map(f => ({ ...f, _dup: true }))]

  return (
    <section className={`insta${revealed ? ' revealed' : ''}`} ref={sectionRef} onClick={!revealed ? reveal : undefined}>
      <a className="handle reveal" href="#">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="1.7">
          <rect x="3" y="3" width="18" height="18" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="#1E1E1E"/>
        </svg>
        britannia.industries{' '}
        <svg width="14" height="14" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#3897F0"/>
          <path d="m7.5 12.5 3 3 6-6" stroke="#fff" strokeWidth="2.2" fill="none"/>
        </svg>
      </a>
      <h2 className="h2 reveal" data-d="1">From the shelf to the feed</h2>
      <div className="igrail" id="igrail">
        {allItems.map((f, i) => (
          <IgItem
            key={i}
            f={f}
            dup={i >= feed.length}
          />
        ))}
      </div>
    </section>
  )
}
