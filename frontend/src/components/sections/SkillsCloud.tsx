import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'

export function SkillsCloud() {
  const { skills } = usePortfolio()

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="Skills"
        title="A toolkit built for enterprise .NET systems."
        description="Backend depth, data craft, and frontend fluency for end-to-end delivery."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {skills.map((category, i) => (
          <ScrollReveal key={category.id} delay={i * 0.05}>
            <GlassPanel>
              <h3 className="font-display text-xl font-semibold">{category.name}</h3>
              <div className="mt-5 space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-[var(--text)]">{skill.name}</span>
                      <span className="text-[var(--text-muted)]">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={`${skill.id}-chip`}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                    style={{ boxShadow: `inset 0 0 0 1px ${skill.color}22` }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
