import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { products } from '../../data/products'
import { useIsMobile } from '../../hooks/useIsMobile'

const KEYS = Object.keys(products)

export default function Products() {
  const [tabKey, setTabKey] = useState(KEYS[0])
  const [fanOffset, setFanOffset] = useState(0)
  const [pageNum, setPageNum] = useState('1 / 6')
  const fanRef = useRef(null)
  const fanOffsetRef = useRef(0)
  const timerRef = useRef(null)
  const isMobile = useIsMobile()
  const tabsRef = useRef(null)
  const pointerStartX = useRef(null)

  const items = products[tabKey]

  const layoutFan = () => {
    if (!fanRef.current) return
    const cards = [...fanRef.current.querySelectorAll('.card')]
    const n = cards.length
    if (!n) return
    const s = isMobile ? 19 : 16
    const offset = fanOffsetRef.current
    cards.forEach((c, k) => {
      let d = k - offset
      d = ((d % n) + n) % n
      if (d > n / 2) d -= n
      const prevD = c._d
      if (prevD !== undefined && Math.abs(d - prevD) > 1) {
        c.style.transition = 'none'
        c.style.opacity = '0'
        c.style.transform = `rotate(${d * s}deg) translateY(${Math.abs(d) < 0.5 ? 0 : 24}px)`
        c.offsetHeight
        c.style.transition = ''
      }
      c._d = d
      c.classList.toggle('center', Math.abs(d) < 0.5)
      c.style.transform = `rotate(${d * s}deg) translateY(${Math.abs(d) < 0.5 ? 0 : 24}px)`
      c.style.opacity = Math.abs(d) > 3 ? '0' : '1'
      c.style.zIndex = 10 - Math.round(Math.abs(d))
    })
    const ci = ((Math.round(offset) % n) + n) % n
    setPageNum(`${ci + 1} / ${n}`)
  }

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      fanOffsetRef.current += 1
      layoutFan()
    }, 3000)
  }

  const prev = () => { fanOffsetRef.current -= 1; layoutFan(); resetTimer() }
  const next = () => { fanOffsetRef.current += 1; layoutFan(); resetTimer() }

  useLayoutEffect(() => {
    fanOffsetRef.current = 0
    requestAnimationFrame(() => requestAnimationFrame(layoutFan))
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [tabKey, isMobile])

  useEffect(() => {
    window.addEventListener('resize', layoutFan)
    return () => window.removeEventListener('resize', layoutFan)
  }, [])

  const handleTabClick = (k, btn) => {
    setTabKey(k)
    fanOffsetRef.current = 0
    if (tabsRef.current && btn) {
      tabsRef.current.scrollTo({ left: btn.offsetLeft - (tabsRef.current.offsetWidth - btn.offsetWidth) / 2, behavior: 'smooth' })
    }
  }

  const handleCardClick = (k) => {
    const n = items.length
    let d = k - ((fanOffsetRef.current % n) + n) % n
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    if (Math.abs(d) > 0.4) { fanOffsetRef.current += d; layoutFan(); resetTimer() }
  }

  const onPointerDown = (e) => { pointerStartX.current = e.clientX; clearInterval(timerRef.current) }
  const onPointerUp = (e) => {
    if (pointerStartX.current === null) return
    const dx = e.clientX - pointerStartX.current
    pointerStartX.current = null
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
    } else {
      resetTimer()
    }
  }

  return (
    <section className="products" id="products">
      <p className="eyebrow reveal">From the familiar to the contemporary</p>
      <h2 className="h2 reveal" data-d="1">A taste for every chapter</h2>
      <div className="pill-tabs reveal" data-d="2" ref={tabsRef}>
        {KEYS.map((k, i) => (
          <button key={k} className={k === tabKey ? 'on' : ''} onClick={(e) => handleTabClick(k, e.currentTarget)}>{k}</button>
        ))}
      </div>
      <div className="fan" ref={fanRef} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {items.map(([h, n, c], k) => (
          <div className="card" key={`${tabKey}-${k}`} onClick={() => handleCardClick(k)}>
            <img src={`assets/img/${h}`} alt={n} />
            <div className="lbl" style={{ background: c }}>{n}</div>
          </div>
        ))}
      </div>
      <div className="pager">
        <button className="round" aria-label="Previous" onClick={prev}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 6-6 6 6 6"/></svg>
        </button>
        <span>{pageNum}</span>
        <button className="round" aria-label="Next" onClick={next}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6"/></svg>
        </button>
      </div>
      <a href="#products" className="btn btn-red">
        View all products{' '}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
      </a>
    </section>
  )
}
