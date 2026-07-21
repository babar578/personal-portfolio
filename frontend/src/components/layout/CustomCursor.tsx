import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePortfolio } from '@/hooks/usePortfolio'
import { cn } from '@/utils/cn'

export function CustomCursor() {
  const { settings } = usePortfolio()
  const isDesktop = useMediaQuery('(pointer: fine) and (min-width: 768px)')
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (!isDesktop || !settings.enableCursor) return

    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let frame = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, [data-cursor="hover"]')
      setHover(Boolean(interactive))
    }

    const tick = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    frame = requestAnimationFrame(tick)
    document.body.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.style.cursor = ''
    }
  }, [isDesktop, settings.enableCursor])

  if (!isDesktop || !settings.enableCursor) return null

  return (
    <div className={cn('custom-cursor', hover && 'is-hover')} aria-hidden>
      <div ref={dot} className="custom-cursor__dot" />
      <div ref={ring} className="custom-cursor__ring" />
    </div>
  )
}
