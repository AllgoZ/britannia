export default function MobileDrawer({ open, onClose }) {
  return (
    <div className={`drawer${open ? ' open' : ''}`} id="drawer">
      <div className="scrim" onClick={onClose}></div>
      <div className="panel">
        <button className="icon-btn close" aria-label="Close menu" onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
        <a href="#legacy" onClick={onClose}>About <span>→</span></a>
        <a href="#products" onClick={onClose}>Brands <span>→</span></a>
        <a href="#investors" onClick={onClose}>Investors <span>→</span></a>
        <a href="#recipes" onClick={onClose}>Wisebite <span>→</span></a>
        <a href="#careers" onClick={onClose}>Careers <span>→</span></a>
        <a href="#sustain" onClick={onClose}>Sustainability <span>→</span></a>
        <a href="#footer" onClick={onClose}>Contact Us <span>→</span></a>
      </div>
    </div>
  )
}
