import { useState, useEffect } from 'react'

export function useTickerShimmer(base = 5319.40) {
  const [price, setPrice] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setPrice(base + (Math.random() - 0.5) * 1.2)
    }, 4000)
    return () => clearInterval(id)
  }, [base])
  return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
