import { useState } from 'react'
import TicTacToe from './TicTacToe'

const socials = [
  { label: 'Instagram', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
  { label: 'Facebook', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.3 2 10.8 3.4 10.8 5.9V8H8.2v3.2h2.6V22H14V11.2h2.6L17 8z"/></svg> },
  { label: 'YouTube', icon: <svg width="22" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg> },
  { label: 'LinkedIn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.8h4V21H3zM9.5 9.8h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg> },
  { label: 'X', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 2h3.4l-7.4 8.5L22.5 22h-6.8l-5.3-7-6.1 7H.9l7.9-9.1L.5 2h7l4.8 6.4zm-1.2 18h1.9L6.5 3.9H4.5z"/></svg> },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMsgType('error')
      setMsg('Please enter a valid email address.')
      return
    }
    setMsgType('success')
    setMsg("Thanks! You're on the list for all things Britannia.")
    setEmail('')
  }

  return (
    <>
      <div className="cnotch">
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ng2" x1="0" x2="1">
              <stop offset="0" stopColor="#E8D84A"/>
              <stop offset="1" stopColor="#8CC63F"/>
            </linearGradient>
          </defs>
          <path d="M0 -2C300 -2 640 0 700 24C705 30 735 30 740 24C800 0 1140 -2 1440 -2V52H0Z" fill="#FFF8E6"/>
          <path d="M0 4C300 4 640 6 700 30C705 36 735 36 740 30C800 6 1140 4 1440 4" fill="none" stroke="url(#ng2)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <footer className="footer" id="footer">
        <div className="wrap foot-grid">
          <div>
            <h2 className="reveal">Sign up for all things Britannia</h2>
            <form className="subscribe" noValidate onSubmit={handleSubmit}>
              <input type="email" placeholder="Drop your email here" aria-label="Email address" required value={email} onChange={e => setEmail(e.target.value)} />
              <button className="btn btn-red" type="submit" aria-label="Subscribe">
                <span className="t">Subscribe</span>{' '}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="arr"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
            <p className="sub-msg" style={{ color: msgType === 'error' ? 'var(--red)' : 'var(--green)' }} role="status">{msg}</p>
            <div className="cols">
              <div>
                <h4>QUICK LINKS</h4>
                <a href="#legacy">About</a><a href="#">Newsroom</a><a href="#recipes">Wisebite</a><a href="#">Blogs</a><a href="#careers">Careers</a><a href="#sustain">Sustainability</a>
              </div>
              <div>
                <h4>BRANDS</h4>
                <a href="#products">Biscuits</a><a href="#products">Dairy</a><a href="#products">Breads</a><a href="#products">Rusk</a><a href="#products">Cakes</a><a href="#products">Snacking</a>
              </div>
              <div>
                <h4>INVESTORS</h4>
                <a href="#investors">Financial Results</a><a href="#investors">Corporate Governance</a><a href="#investors">AGM &amp; Events</a><a href="#investors">ESG for Investors</a>
              </div>
              <div>
                <h4>CONTACT</h4>
                <a href="#">Consumer Feedback</a><a href="#">Link to Smart ODR</a><a href="#">Link to Scores 2.0</a><a href="#">Complaints Policy</a><a href="#">Suppliers</a><a href="#">Distributors</a>
              </div>
            </div>
            <div className="socials">
              {socials.map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label}>{icon}</a>
              ))}
            </div>
          </div>
          <TicTacToe />
        </div>
        <div className="legal">
          <div className="wrap">
            <nav>
              <a href="#">Disclaimers</a><a href="#">Privacy Policy</a><a href="#">Terms of Use</a><a href="#">Cookie Policy</a>
            </nav>
            <span>© Copyright 2026 Britannia Industries. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
