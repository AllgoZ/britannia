import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const arrowSm = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
const dlIcon = <svg className="dl" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 4v11m-5-5 5 5 5-5M4 20h16"/></svg>
const docIc = <span className="ic"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M5 8h10M5 12h14M5 16h8"/></svg></span>

function CountUp({ to }) {
  const ref = useRef(null)
  const seen = useIntersectionObserver(ref, 0.6)

  useEffect(() => {
    if (!seen || !ref.current) return
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1400)
      const v = Math.round(to * (1 - Math.pow(1 - p, 3)))
      if (ref.current) ref.current.textContent = '₹' + v.toLocaleString('en-IN')
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [seen, to])

  return <span className="px js-count" data-to={to} ref={ref}>₹{to.toLocaleString('en-IN')}</span>
}

export default function Investors() {
  return (
    <section className="investors" id="investors">
      <div className="wrap">
        <p className="eyebrow reveal">Investor highlights</p>
        <h2 className="h2 reveal" data-d="1">Rooted in today. Building for tomorrow</h2>
        <div className="inv-grid">
          <div className="ql reveal">
            <h3>Quick Links</h3>
            <ul>
              {['Investor Centre','Stock Exchange Filings','Press Release Q4 FY25-26','Corporate Governance','Stock Information'].map(l => (
                <li key={l}><a href="#investors">{l} {arrowSm}</a></li>
              ))}
            </ul>
          </div>
          <div className="bcard reveal" data-d="1">
            <img src="assets/img/64a1a380.webp" alt="" />
            <svg className="bmark" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="w1"><rect x="62" y="30" width="96" height="70" rx="6"/></clipPath>
                <clipPath id="w2"><rect x="62" y="116" width="45" height="44" rx="5"/></clipPath>
                <clipPath id="w3"><rect x="113" y="116" width="50" height="44" rx="5"/></clipPath>
                <clipPath id="w4"><rect x="62" y="166" width="45" height="44" rx="5"/></clipPath>
                <clipPath id="w5"><rect x="113" y="166" width="50" height="44" rx="5"/></clipPath>
              </defs>
              <path d="M28 8h110c34 0 52 18 52 46 0 18-9 32-24 38 22 7 34 24 34 48 0 36-24 62-66 62H28z" fill="#E31E24"/>
              <path d="M28 8h14v202H28z" fill="#B8141A"/>
              <image href="assets/img/2cf81789.webp" x="62" y="20" width="96" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#w1)"/>
              <image href="assets/img/a130a112.webp" x="62" y="116" width="45" height="44" preserveAspectRatio="xMidYMid slice" clipPath="url(#w2)"/>
              <image href="assets/img/3e109e05.webp" x="113" y="116" width="50" height="44" preserveAspectRatio="xMidYMid slice" clipPath="url(#w3)"/>
              <image href="assets/img/601bff41.webp" x="62" y="166" width="45" height="44" preserveAspectRatio="xMidYMid slice" clipPath="url(#w4)"/>
              <image href="assets/img/90e5a20d.webp" x="113" y="166" width="50" height="44" preserveAspectRatio="xMidYMid slice" clipPath="url(#w5)"/>
              <path d="M28 210h110c20 0 36-6 46-18l-2 22c-10 12-26 20-46 20H28z" fill="#FFD200"/>
              <path d="M28 222h108c22 0 38-8 46-20l-4 22c-10 12-24 18-42 18H28z" fill="#5BAE3C"/>
            </svg>
            <div className="stock">
              <small>NSE: BRITANNIA</small>
              <div className="row">
                <CountUp to={5358} />
                <span className="chg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 17 6-6 4 4 8-8M15 7h6v6"/></svg>
                  +0.60 &nbsp;(+0.01%)
                </span>
              </div>
            </div>
          </div>
          <div className="side-col reveal" data-d="2">
            <div className="news">
              <h3>Latest News</h3>
              <a href="#investors"><div>Kids learn through interactive means: Archana Balaraman<time>01 Aug 2026</time></div>{arrowSm}</a>
              <a href="#investors"><div>Britannia Milk Bikis turns Thirukkural into a learning experience<time>09 Jul 2026</time></div>{arrowSm}</a>
            </div>
            <div className="fin">
              <h3>Financial Reports</h3>
              <a href="#investors">{docIc}Results Q4 FY25-26{dlIcon}</a>
              <a href="#investors">{docIc}Half-Yearly Report FY25-26{dlIcon}</a>
              <a href="#investors">{docIc}Annual Report FY25-26{dlIcon}</a>
            </div>
          </div>
        </div>
        <a href="#investors" className="btn btn-red">
          Explore investor relations{' '}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
        </a>
      </div>
    </section>
  )
}
