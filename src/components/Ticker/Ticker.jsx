import { useTickerShimmer } from '../../hooks/useTickerShimmer'

const arrow = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6"/></svg>

export default function Ticker() {
  const price = useTickerShimmer(5319.40)
  return (
    <div className="ticker">
      <div className="wrap">
        <div className="tk-left">
          <span>NSE: BRITANNIA</span><span className="sep"></span>
          <span>₹{price}</span>
          <span className="tk-up">0.60 (0.01%)</span>
        </div>
        <div className="tk-right">
          <span className="live">LIVE</span>
          <a href="#investors" className="tk-agm">Annual General Meeting 2026 {arrow}</a>
        </div>
        <div className="tk-mob">
          <div className="l">
            <span>NSE: BRITANNIA</span>
            <span><span>₹{price}</span> &nbsp;<span className="tk-up">0.60 (0.01%)</span></span>
          </div>
          <div className="r">
            <span className="live">LIVE</span>
            <a href="#investors" className="tk-agm">AGM 2026 {arrow}</a>
          </div>
        </div>
      </div>
    </div>
  )
}
