import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

interface TypingTextProps {
  texts: string[]
  className?: string
  interval?: number
}

export function TypingText({ texts, className, interval = 2600 }: TypingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (texts.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [texts, interval])

  const current = texts[index] ?? ''

  return (
    <span className={cn('inline-flex min-h-[1.2em] items-center', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
