import { useEffect, useState } from 'react'

/** True while the user is actively scrolling — use to pause heavy WebGL / motion. */
export function useScrollPause(delay = 120) {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let timeout
    const onScroll = () => {
      setIsScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsScrolling(false), delay)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
    }
  }, [delay])

  return isScrolling
}
