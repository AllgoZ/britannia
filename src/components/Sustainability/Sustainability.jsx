import { useState, useRef } from 'react'
import { sustainability } from '../../data/sustainability'
import { useParallax } from '../../hooks/useParallax'
import { useIsMobile } from '../../hooks/useIsMobile'

const KEYS = Object.keys(sustainability)

export default function Sustainability() {
  const [activeKey, setActiveKey] = useState('For the People')
  const imgRef = useRef(null)
  const isMobile = useIsMobile()

  useParallax([imgRef], [])

  const pillars = sustainability[activeKey]

  const [openPillar, setOpenPillar] = useState(0)

  const handleTabClick = (k, btn) => {
    setActiveKey(k)
    setOpenPillar(0)
    const tabs = btn.closest('.w-tabs')
    if (tabs) tabs.scrollTo({ left: btn.offsetLeft - (tabs.offsetWidth - btn.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <section className="sustain" id="sustain">
      <img src="assets/img/d8e867de.webp" alt="Tractors harvesting a field, aerial view" ref={imgRef} />
      <div className="wrap">
        <div>
          <p className="eyebrow reveal">Growing responsibly</p>
          <h2 className="h2 reveal" data-d="1">Making choices for the story ahead</h2>
          <div className="w-tabs reveal" data-d="2">
            {KEYS.map((k) => (
              <button key={k} className={k === activeKey ? 'on' : ''} onClick={(e) => handleTabClick(k, e.currentTarget)}>{k}</button>
            ))}
          </div>
        </div>
        <div className="pillars swap" key={activeKey}>
          {pillars.map(([h, p], i) => (
            <div key={h} className={`pillar${i === openPillar ? ' open' : ''}`}>
              <h3 onClick={() => { if (isMobile) setOpenPillar(i === openPillar ? -1 : i) }}>
                {h}
                <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m6 9 6 6 6-6"/></svg>
              </h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <div className="sus-left-bottom reveal">
          <p>As we grow, we're looking at better ways to make, work and give back, with people and the planet in mind</p>
          <a href="#sustain" className="link-arrow">
            Explore our efforts{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
