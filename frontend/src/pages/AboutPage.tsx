import { useEffect } from 'react'
import { About } from '@/components/sections/About'
import { Stats } from '@/components/sections/Stats'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function AboutPage() {
  const { portfolio } = usePortfolio()

  useEffect(() => {
    applySeo({
      title: `About | ${portfolio.profile.fullName}`,
      description: portfolio.about.summary,
    })
  }, [portfolio])

  return (
    <main className="pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {portfolio.profile.fullName}
        </h1>
        <p className="mt-3 text-lg text-[var(--text-muted)]">{portfolio.profile.title}</p>
      </div>
      <About />
      <Stats />
    </main>
  )
}
