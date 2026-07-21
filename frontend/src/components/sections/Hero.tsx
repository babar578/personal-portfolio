import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Download, Mail } from 'lucide-react'
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

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <ParticleBackground />
      {isDesktop && settings.enableAnimations ? (
        <div className="mouse-glow" style={{ left: glow.x, top: glow.y }} />
      ) : null}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
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
            <span className="mx-2 text-[var(--text-muted)]">·</span>
            <span className="text-[var(--accent)]">{portfolio.profile.yearsExperience}+ Years Experience</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-4 font-display text-2xl font-medium text-[var(--text-muted)] md:text-3xl"
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
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(14,165,233,0.28)]"
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
            <MagneticButton>
              <Link
                to="/contact"
                className="glass inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-[var(--text)]"
              >
                <Mail size={16} /> Contact Me
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-cyan-400/10" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.6rem] bg-gradient-to-b from-slate-900/40 to-slate-950/60 p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Senior Engineer</p>
                <p className="mt-4 font-display text-3xl font-semibold text-white">
                  Enterprise .NET systems that scale with the business.
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <p>ERP · Medical · Supply Chain · Reporting</p>
                <p className="text-cyan-300">{portfolio.profile.yearsExperience}+ years shipping production software</p>
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
