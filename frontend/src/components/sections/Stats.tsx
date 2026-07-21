import { Briefcase, Calendar, ChartColumn, Layers, Network } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePortfolio } from '@/hooks/usePortfolio'

const icons: Record<string, typeof Calendar> = {
  calendar: Calendar,
  briefcase: Briefcase,
  api: Network,
  chart: ChartColumn,
  modules: Layers,
}

export function Stats() {
  const { portfolio } = usePortfolio()

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <SectionHeading
        eyebrow="Impact"
        title="Numbers that reflect delivery under real enterprise pressure."
        description="Measured outcomes across platforms, APIs, and reporting systems."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {portfolio.statistics.map((stat, i) => {
          const Icon = icons[stat.icon] ?? Briefcase
          return (
            <ScrollReveal key={stat.id} delay={i * 0.05}>
              <GlassPanel className="text-center">
                <Icon className="mx-auto text-[var(--accent)]" size={20} />
                <p className="mt-4 text-3xl font-semibold text-[var(--text)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </GlassPanel>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
