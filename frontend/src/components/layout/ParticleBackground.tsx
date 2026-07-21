import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'

export function ParticleBackground() {
  const { settings } = usePortfolio()
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 4),
        duration: 8 + (i % 7),
        delay: (i % 5) * 0.4,
      })),
    [],
  )

  if (!settings.enableParticles) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="grid-overlay absolute inset-0 opacity-60" />
      <div className="noise" />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-400/40"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -24, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  )
}
