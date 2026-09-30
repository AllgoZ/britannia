export default function Hero() {
  return (
    <section className="hero">
      <img className="poster" src="assets/img/a7d5c618.webp" alt="" />
      <video autoPlay muted loop playsInline preload="auto" poster="assets/img/a7d5c618.webp">
        <source src="assets/video/08de0ac6.mp4" type="video/mp4" />
      </video>
      <div className="hero-inner wrap">
        <h1>
          <span className="ln"><span>A legacy of</span></span>
          <span className="ln"><span>unforgettable</span></span>
          <span className="ln"><span>taste</span></span>
        </h1>
      </div>
      <a href="#legacy" className="btn story">
        Our story{' '}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
      </a>
      <span className="scroll-cue" aria-hidden="true"></span>
    </section>
  )
}
