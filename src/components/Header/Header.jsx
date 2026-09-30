import { useState, useEffect, useRef } from 'react'
import { useHeaderScroll } from '../../hooks/useHeaderScroll'
import MobileDrawer from './MobileDrawer'

const Logo = () => (
  <svg width="123" height="46" viewBox="0 0 123 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2069_3246" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="8" y="4" width="153" height="110"><path d="M160.859 4.59961H8.25781V113.368H160.859V4.59961Z" fill="white"/></mask>
    <g mask="url(#mask0_2069_3246)">
      <mask id="mask1_2069_3246" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="8" y="4" width="153" height="110"><path d="M8.25781 4.60742H160.848V113.374H8.25781V4.60742Z" fill="white"/></mask>
      <g mask="url(#mask1_2069_3246)">
        <path d="M107.984 10.4325C107.914 9.81563 107.46 9.31199 106.852 9.17948C102.465 8.22375 84.264 4.60742 60.2028 4.60742H58.2221C34.1607 4.60742 15.9595 8.22375 11.5728 9.17948C10.9653 9.31199 10.5111 9.81563 10.4403 10.4325L8.26625 29.4202C8.26111 29.4573 8.28826 29.4854 8.32569 29.4841C35.5959 28.1336 51.5732 34.377 57.0525 37.7387C58.3777 38.552 60.0485 38.552 61.3724 37.7387C66.8517 34.377 82.8288 28.1336 110.1 29.4841C110.137 29.4854 110.163 29.4573 110.159 29.4216L107.984 10.4325Z" fill="#EC2128"/>
        <path d="M8.26052 29.424L8.29758 29.0991C27.0823 27.2536 54.2247 28.2375 68.4153 36.2013C66.0489 37.1467 62.4538 39.1514 61.3662 39.8191C60.0436 40.6312 58.3716 40.6312 57.0477 39.8191C55.9615 39.1514 54.4593 38.3049 52.5391 37.3871C44.8274 33.7006 30.3469 28.8586 8.69401 29.885C8.42842 29.8974 8.23229 29.6775 8.26052 29.424Z" fill="#FAD706"/>
        <path d="M110.15 29.4195L110.113 29.0946C91.3281 27.2493 64.1437 28.2577 49.9531 36.2203C52.318 37.1662 55.9029 39.1221 57.0431 39.8146C58.4373 40.6598 60.039 40.6267 61.363 39.8146C62.4492 39.1469 63.9457 38.3486 65.8715 37.3827C73.5118 33.5477 88.0641 28.8589 109.717 29.8805C109.972 29.8914 110.183 29.6812 110.15 29.4195Z" fill="#81BD41"/>
        <path d="M21.2823 18.7818V21.2813H23.8742C24.6704 21.2813 25.1402 20.8127 25.1864 20.0789C25.2019 19.642 25.0301 19.2352 24.7028 19.0003C24.4362 18.8128 24.1259 18.7818 23.7656 18.7818H21.2823ZM21.2823 14.3918V16.8754H23.4215C24.218 16.8754 24.718 16.4384 24.7336 15.704C24.749 14.907 24.2331 14.3918 23.4215 14.3918H21.2823ZM25.9366 17.642C26.9523 18.0639 27.4989 18.9536 27.4989 20.0789C27.4989 21.9998 26.2173 23.312 24.0309 23.312H18.9531V12.3926H23.5934C25.5931 12.3926 27.031 13.5797 27.031 15.6257C27.031 16.4233 26.6239 17.2202 25.9366 17.642Z" fill="white"/>
        <path d="M33.648 17.7754C34.6332 17.7754 35.2728 17.0099 35.2579 16.0715C35.2579 15.1509 34.6486 14.4165 33.648 14.4165H31.3047V17.7754H33.648ZM38.0383 22.9787V23.3058H36.5983C35.4487 23.3058 34.9756 22.4023 34.9756 22.4023L33.2891 19.6968H31.3369V23.3058H28.9922V12.3713C30.5547 12.3713 32.1014 12.3533 33.6634 12.3713C36.1649 12.3713 37.5241 14.1828 37.5241 16.1196C37.5241 17.5101 36.82 18.7288 35.5696 19.3376L38.0383 22.9787Z" fill="white"/>
        <path d="M39.5312 23.3271H41.874V12.3926H39.5312V23.3271Z" fill="white"/>
        <path d="M84.7031 23.3271H87.0455V12.3926H84.7031V23.3271Z" fill="white"/>
        <path d="M43.3672 14.4228V12.3926H52.4028L51.7709 13.7529C51.5808 14.1623 51.1721 14.4228 50.7213 14.4228H48.6757V23.3271H46.4107V14.4228H43.3672Z" fill="white"/>
        <path d="M54.3047 19.5482H57.3355L55.821 15.9405L54.3047 19.5482ZM53.539 21.5179L52.6954 23.3287H50.2578V23.0176L55.2884 12.3008H56.3671L61.3668 23.0176V23.3287H58.9454L58.0859 21.5179H53.539Z" fill="white"/>
        <path d="M64.7501 17.0727V23.3204H62.4219V12.3379H63.1571L69.2968 18.5883V12.3858H71.6399V23.3534H70.9357L64.7501 17.0727Z" fill="white"/>
        <path d="M75.8979 17.0727V23.3204H73.5703V12.3379H74.3053L80.4438 18.5883V12.3858H82.7883V23.3534H82.0854L75.8979 17.0727Z" fill="white"/>
        <path d="M92.4061 19.5482H95.4369L93.922 15.9405L92.4061 19.5482ZM91.6404 21.5179L90.7961 23.3287H88.3594V23.0176L93.39 12.3008H94.4686L99.4678 23.0176V23.3287H97.0465L96.187 21.5179H91.6404Z" fill="white"/>
        <path d="M112.673 10.6851H112.944C113.332 10.6851 113.572 10.6713 113.665 10.6397C113.759 10.6108 113.832 10.5579 113.886 10.4838C113.94 10.4095 113.968 10.3244 113.968 10.2295C113.968 10.1389 113.941 10.0565 113.889 9.98434C113.836 9.91283 113.76 9.86199 113.663 9.82899C113.565 9.79884 113.325 9.78366 112.944 9.78366H112.673V10.6851ZM112.001 12.562V9.26018H112.673C113.3 9.26018 113.652 9.26293 113.728 9.26782C113.95 9.28696 114.122 9.33169 114.245 9.40035C114.368 9.46912 114.472 9.57555 114.554 9.71632C114.636 9.85924 114.679 10.0174 114.679 10.1904C114.679 10.4275 114.6 10.6328 114.445 10.8018C114.289 10.9708 114.071 11.0753 113.788 11.1165C113.889 11.1535 113.967 11.1941 114.02 11.2401C114.074 11.2842 114.149 11.3693 114.244 11.493C114.268 11.5253 114.349 11.6599 114.487 11.8948L114.877 12.562H114.049L113.773 12.026C113.586 11.6662 113.432 11.438 113.31 11.346C113.188 11.2526 113.033 11.2045 112.847 11.2045H112.673V12.562H112.001ZM113.411 8.39595C112.983 8.39595 112.573 8.50251 112.181 8.71611C111.788 8.92912 111.478 9.23685 111.252 9.63739C111.027 10.0379 110.914 10.4583 110.914 10.8967C110.914 11.333 111.024 11.7486 111.245 12.1429C111.466 12.5386 111.774 12.8465 112.169 13.0697C112.564 13.2902 112.978 13.4016 113.411 13.4016C113.847 13.4016 114.262 13.2902 114.656 13.0697C115.049 12.8465 115.357 12.5386 115.58 12.1429C115.802 11.7486 115.912 11.333 115.912 10.8967C115.912 10.4583 115.799 10.0379 115.574 9.63739C115.348 9.23685 115.038 8.92912 114.644 8.71611C114.25 8.50251 113.838 8.39595 113.411 8.39595ZM113.407 7.78516C113.94 7.78516 114.452 7.9185 114.941 8.18569C115.431 8.45228 115.817 8.83427 116.097 9.33301C116.378 9.83174 116.518 10.3525 116.518 10.8967C116.518 11.438 116.381 11.9533 116.106 12.4465C115.83 12.9357 115.448 13.3212 114.957 13.5953C114.465 13.87 113.949 14.0074 113.407 14.0074C112.866 14.0074 112.349 13.87 111.858 13.5953C111.367 13.3212 110.983 12.9357 110.709 12.4465C110.435 11.9533 110.297 11.438 110.297 10.8967C110.297 10.3525 110.437 9.83174 110.717 9.33301C110.997 8.83427 111.382 8.45228 111.872 8.18569C112.362 7.9185 112.874 7.78516 113.407 7.78516Z" fill="#EC232A"/>
      </g>
    </g>
  </svg>
)

export default function Header() {
  const { scrolled, hidden } = useHeaderScroll()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
        if (searchInputRef.current) searchInputRef.current.value = ''
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [searchOpen])

  const cls = ['header', scrolled ? 'scrolled' : '', hidden ? 'hdr-hide' : ''].filter(Boolean).join(' ')

  return (
    <>
      <header className={cls} id="top">
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 7h16M4 12h11M4 17h16"/></svg>
            </button>
            <nav className="nav">
              <a href="#legacy">About</a>
              <a href="#products">Brands</a>
              <a href="#investors">Investors</a>
              <a href="#recipes">Wisebite</a>
            </nav>
          </div>
          <a href="/" className="logo" aria-label="Britannia home"><Logo /></a>
          <div className="nav nav-right" style={{ display: 'flex' }}>
            <nav className="nav">
              <a href="#careers">Careers</a>
              <a href="#sustain">Sustainability</a>
              <a href="#footer">Contact Us</a>
            </nav>
            <button className="icon-btn" aria-label="Search" onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 50) }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M18 2.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5L16 4.6l1.4-.6z" fill="#EC1C24" stroke="none"/></svg>
            </button>
            <button className="icon-btn" aria-label="Language" onClick={() => { window.location.href = 'https://britannia-international.tepros.in' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>
            </button>
          </div>
        </div>
        <div className={`search-panel${searchOpen ? ' open' : ''}`}>
          <div className="s-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B0A99A" strokeWidth="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input type="search" ref={searchInputRef} placeholder="Search Britannia…" aria-label="Search Britannia" autoComplete="off" />
            <button className="icon-btn s-close" aria-label="Close search" onClick={() => { setSearchOpen(false); if (searchInputRef.current) searchInputRef.current.value = '' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
