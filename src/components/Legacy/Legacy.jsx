import { useState, useEffect, useRef } from 'react'
import { eras } from '../../data/eras'

const DUR = 6000

export default function Legacy({ visible }) {
  const [active, setActive] = useState(0)
  const [copyOut, setCopyOut] = useState(false)
  const timerRef = useRef(null)
  const listRef = useRef(null)
  const tabsRef = useRef(null)

  const goTo = (i, user = false) => {
    if (i === active) return
    setCopyOut(true)
    setTimeout(() => { setActive(i); setCopyOut(false) }, 300)

    if (user && tabsRef.current) {
      const tb = tabsRef.current.querySelectorAll('button')[i]
      if (tb && window.matchMedia('(max-width:820px)').matches) {
        tabsRef.current.scrollTo({ left: tb.offsetLeft - (tabsRef.current.offsetWidth - tb.offsetWidth) / 2, behavior: 'smooth' })
      }
    }
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => goTo((i + 1) % eras.length), DUR)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo((active + 1) % eras.length), DUR)
    return () => clearTimeout(timerRef.current)
  }, [active])

  return (
    <section className={`legacy${visible ? '' : ' legacy-hidden'}`} id="legacy">
      <div className="bg" id="legacyBg">
        {eras.map((e, i) => (
          <img key={e.img} src={`assets/img/${e.img}`} alt="" loading={i ? 'lazy' : 'eager'} className={i === active ? 'on' : ''} />
        ))}
      </div>
      <div className="wrap">
        <p className="eyebrow reveal">A legacy of unforgettable taste</p>
        <div className="era-tabs" ref={tabsRef}>
          {eras.map((e, i) => (
            <button key={e.y} className={i === active ? 'on' : ''} onClick={() => goTo(i, true)}>
              <b>{e.y}</b><span>{e.t}</span>
            </button>
          ))}
        </div>
        <ul className="eras" ref={listRef} style={{ '--dur': DUR + 'ms' }}>
          {eras.map((e, i) => (
            <li key={e.y} className={i === active ? 'on' : ''}>
              <button onClick={() => goTo(i, true)}><b>{e.y}</b> - {e.t}</button>
              <span className="bar"></span>
            </li>
          ))}
        </ul>
        <div className="era-copy">
          <p className={copyOut ? 'out' : ''}>{eras[active].c}</p>
        </div>
        <a href="#rni" className="link-arrow more">
          Explore our &nbsp;innovations{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
        </a>
      </div>
    </section>
  )
}
