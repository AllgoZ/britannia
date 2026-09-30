import { useState, useRef, useEffect } from 'react'
import { recipes } from '../../data/recipes'
import { useIsMobile } from '../../hooks/useIsMobile'

const KEYS = Object.keys(recipes)

const clock = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6M3 4v4h4"/>
    <path d="M12 8v4l3 2"/>
  </svg>
)

const aiBtn = (
  <a href="#recipes" className="btn ai-btn">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="11" cy="11" r="7"/>
      <path d="m20 20-3.5-3.5"/>
      <path d="M18 2.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5L16 4.6l1.4-.6z" fill="#FFDD55" stroke="none"/>
    </svg>
    Ask AI for snack ideas
  </a>
)

export default function Recipes() {
  const [activeKey, setActiveKey] = useState(KEYS[0])
  const [coverOpen, setCoverOpen] = useState(true)
  const railRef = useRef(null)
  const coverRef = useRef(null)
  const isMobile = useIsMobile()

  const handleCoverClick = () => {
    if (isMobile) return
    if (!coverRef.current || !railRef.current) return
    coverRef.current.onclick = null

    const clone = document.createElement('div')
    clone.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:80;overflow:hidden;pointer-events:none;border-radius:0;transition:top 1.3s cubic-bezier(.4,0,.2,1),left 1.3s cubic-bezier(.4,0,.2,1),width 1.3s cubic-bezier(.4,0,.2,1),height 1.3s cubic-bezier(.4,0,.2,1),border-radius 1.3s cubic-bezier(.4,0,.2,1)'
    const ci = document.createElement('img')
    ci.src = coverRef.current.querySelector('img').src
    ci.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;transition:none'
    clone.appendChild(ci)
    document.body.appendChild(clone)

    coverRef.current.style.height = '0'
    coverRef.current.style.overflow = 'hidden'
    setCoverOpen(false)

    const bigCard = railRef.current.querySelector('.rcard.big')
    if (bigCard) {
      const railRect = railRef.current.getBoundingClientRect()
      const cardRect = bigCard.getBoundingClientRect()
      railRef.current.scrollLeft += (cardRect.left + cardRect.width / 2) - (railRect.left + railRect.width / 2)
    }

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const ph = railRef.current?.querySelector('.rcard.big .ph')
      if (ph) {
        const pr = ph.getBoundingClientRect()
        clone.style.top = pr.top.toFixed(1) + 'px'
        clone.style.left = pr.left.toFixed(1) + 'px'
        clone.style.width = pr.width.toFixed(1) + 'px'
        clone.style.height = pr.height.toFixed(1) + 'px'
        clone.style.borderRadius = '44px 44px 18px 18px'
      }
      setTimeout(() => {
        clone.style.transition = 'opacity 0.3s'
        clone.style.opacity = '0'
        setTimeout(() => clone.remove(), 350)
      }, 1350)
    }))
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let rd = null
    const onDown = (e) => { if (e.pointerType !== 'mouse') return; rd = { x: e.clientX, s: rail.scrollLeft, moved: false } }
    const onMove = (e) => {
      if (!rd) return
      const dx = e.clientX - rd.x
      if (Math.abs(dx) > 4) { rd.moved = true; rail.classList.add('drag') }
      rail.scrollLeft = rd.s - dx
    }
    const onUp = () => {
      if (rd && rd.moved) rail.addEventListener('click', ev => ev.preventDefault(), { once: true, capture: true })
      rd = null; rail.classList.remove('drag')
    }
    rail.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      rail.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const items = recipes[activeKey]

  return (
    <section className="recipes" id="recipes">
      <div id="rec-cover" ref={coverRef} aria-label="Click to explore recipes" onClick={handleCoverClick}>
        <img src="assets/img/8580b441.webp" alt="" />
      </div>
      <div className="wrap">
        <p className="eyebrow">Recipes</p>
        <div className="top">
          <div>
            <h2 className="h2 reveal" style={{ fontSize: 'clamp(32px,3.4vw,48px)' }}>All the ways to love Britannia</h2>
            <div className="line-tabs">
              {KEYS.map((k) => (
                <button key={k} className={k === activeKey ? 'on' : ''} onClick={() => setActiveKey(k)}>{k}</button>
              ))}
            </div>
          </div>
          {aiBtn}
        </div>
      </div>
      <div className="rail" ref={railRef}>
        {items.map(([h, t, type, big], i) => (
          <a href="#recipes" key={`${activeKey}-${i}`} className={`rcard${big ? ' big' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="ph"><img src={`assets/img/${h}`} alt="" loading="lazy" draggable="false" /></div>
            <h3>
              {t}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9"/></svg>
            </h3>
            <div className="meta">{clock} {[10, 12, 7, 15][i % 4]} mins &nbsp;•&nbsp; {type}</div>
          </a>
        ))}
      </div>
      <div className="ai-mob">{aiBtn}</div>
    </section>
  )
}
