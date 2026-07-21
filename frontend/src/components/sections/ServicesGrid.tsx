import {
  Building2,
  ChartColumn,
  Cloud,
  Compass,
  Database,
  Layers,
  Network,
  Sparkles,
  Zap,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'

const iconMap: Record<string, typeof Building2> = {
  building: Building2,
  layers: Layers,
  app: Sparkles,
  api: Network,
  database: Database,
  zap: Zap,
  chart: ChartColumn,
  cloud: Cloud,
  compass: Compass,
}

export function ServicesGrid() {
  const { services } = usePortfolio()

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="Services"
        title="How I help teams ship reliable enterprise software."
        description="From architecture workshops to production delivery and performance tuning."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Sparkles
          return (
            <ScrollReveal key={service.id} delay={i * 0.04}>
              <GlassPanel className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-[var(--accent)]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{service.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="text-xs text-[var(--text-muted)] before:mr-2 before:text-[var(--accent)] before:content-['•']">
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
