import { useState } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal'
import Ticker from './components/Ticker/Ticker'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import RedBridge from './components/RedBridge/RedBridge'
import Legacy from './components/Legacy/Legacy'
import Products from './components/Products/Products'
import Recipes from './components/Recipes/Recipes'
import Notch from './components/Notch/Notch'
import Sustainability from './components/Sustainability/Sustainability'
import RnI from './components/RnI/RnI'
import Investors from './components/Investors/Investors'
import Instagram from './components/Instagram/Instagram'
import Careers from './components/Careers/Careers'
import Footer from './components/Footer/Footer'

export default function App() {
  const [legacyVisible, setLegacyVisible] = useState(false)

  useScrollReveal(null)

  return (
    <>
      <Ticker />
      <Header />
      <Hero />
      <RedBridge onRevealLegacy={() => setLegacyVisible(true)} />
      <Legacy visible={legacyVisible} />
      <Products />
      <Recipes />
      <Notch gradId="ng" />
      <Sustainability />
      <RnI />
      <Investors />
      <Instagram />
      <Careers />
      <Footer />
    </>
  )
}
