import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '@/hooks/usePortfolio'

export function ParticleBackground() {
  const { settings } = usePortfolio()
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 3),
        duration: 8 + (i % 7),
        delay: (i % 5) * 0.4,
      })),
    [],
  )

  if (!settings.enableParticles) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="grid-overlay absolute inset-0 opacity-50" />
      <div className="noise" />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'color-mix(in oklab, var(--accent) 45%, transparent)',
          }}
          animate={{ y: [0, -24, 0], opacity: [0.12, 0.55, 0.12] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div
        className="absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'color-mix(in oklab, var(--accent) 10%, transparent)' }}
      />
      <div
        className="absolute -right-16 bottom-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'color-mix(in oklab, var(--accent-soft) 8%, transparent)' }}
      />
    </div>
  )
}
