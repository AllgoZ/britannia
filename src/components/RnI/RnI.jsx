import { useRef } from 'react'
import { useParallax } from '../../hooks/useParallax'
import Notch from '../Notch/Notch'

export default function RnI() {
  const floRef = useRef(null)
  useParallax([], [floRef])

  return (
    <section className="rni" id="rni">
      <img className="crumbs" src="assets/img/0d863f1d.webp" alt="" ref={floRef} />
      <div className="wrap">
        <div className="rni-card reveal">
          <div className="txt">
            <p className="eyebrow">Research &amp; Innovation</p>
            <h2>Thinking ahead with a changing India</h2>
            <a href="#rni" className="link-arrow">
              Explore our &nbsp;innovations{' '}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
            </a>
          </div>
          <div className="media">
            <img src="assets/img/cd23c8aa.webp" alt="Robotic arms placing biscuits on a production line" />
          </div>
        </div>
        <Notch gradId="ng3" style={{ marginTop: 0 }} />
      </div>
    </section>
  )
}
