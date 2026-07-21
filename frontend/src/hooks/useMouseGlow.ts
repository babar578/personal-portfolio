import { useEffect, useState } from 'react'

export function useMouseGlow(enabled = true) {
  const [pos, setPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  return pos
}
