import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'
import { formatDate } from '@/utils/seo'

export function ExperienceTimeline() {
  const { experience } = usePortfolio()

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="Experience"
        title="A career shaped by enterprise delivery."
        description="Roles spanning ERP, medical platforms, and high-stakes backend systems."
      />

      <div className="relative mt-12 space-y-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border)] md:before:left-1/2">
        {experience.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 0.05}>
            <div className={`relative md:flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
              <div className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(34,211,238,0.7)] md:left-1/2" />
              <GlassPanel className="ml-10 md:ml-0 md:w-[calc(50%-2rem)]">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--accent)]">
                  <span>
                    {formatDate(item.startDate)} — {item.isCurrent ? 'Present' : formatDate(item.endDate)}
                  </span>
                  <span className="text-[var(--text-muted)]">· {item.location}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">{item.role}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.achievements.slice(0, 3).map((a) => (
                    <li key={a} className="text-sm text-[var(--text-muted)] before:mr-2 before:text-[var(--accent)] before:content-['▸']">
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="rounded-md border border-[var(--border)] px-2 py-1 text-[11px] text-[var(--text-muted)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
