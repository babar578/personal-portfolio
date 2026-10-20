import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { ParticleBackground } from '@/components/layout/ParticleBackground'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TypingText } from '@/components/ui/TypingText'
import { useMouseGlow } from '@/hooks/useMouseGlow'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function Hero() {
  const { portfolio, settings } = usePortfolio()
  const isDesktop = useMediaQuery('(pointer: fine) and (min-width: 768px)')
  const glow = useMouseGlow(isDesktop && settings.enableAnimations)
  const photo = portfolio.profile.heroImage || portfolio.profile.avatar

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <ParticleBackground />
      {isDesktop && settings.enableAnimations ? (
        <div className="mouse-glow" style={{ left: glow.x, top: glow.y }} />
      ) : null}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
          >
            {portfolio.profile.availability}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl"
          >
            {portfolio.profile.fullName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg font-medium text-[var(--text)] md:text-xl"
          >
            {portfolio.profile.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-3 font-display text-xl font-medium text-[var(--text-muted)] md:text-2xl"
          >
            <TypingText texts={portfolio.rotatingTitles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg"
          >
            {portfolio.profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <Link
                to="/contact"
                className="btn-primary inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold"
              >
                Hire Me <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href={portfolio.resume.url}
                className="glass inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-[var(--text)]"
              >
                <Download size={16} /> Download Resume
              </a>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/projects"
                className="glass inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-[var(--text)]"
              >
                View Projects
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            className="absolute -inset-3 rounded-[2rem] opacity-70 blur-2xl"
            style={{
              background:
                'radial-gradient(circle at 40% 30%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 62%)',
            }}
          />
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)]"
            style={{ boxShadow: `0 0 0 1px var(--photo-ring), var(--shadow)` }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={photo}
                alt={`${portfolio.profile.fullName} — professional portrait`}
                className="profile-photo h-full w-full"
                width={720}
                height={900}
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--bg)_92%,#000)] via-[color-mix(in_oklab,var(--bg)_35%,transparent)] to-transparent px-5 pb-5 pt-24">
                <p className="font-display text-lg font-semibold text-[var(--text)]">
                  {portfolio.profile.firstName} {portfolio.profile.lastName}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {portfolio.profile.yearsExperience}+ years · {portfolio.profile.location}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
