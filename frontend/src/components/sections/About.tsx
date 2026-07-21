import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'

export function About() {
  const { portfolio } = usePortfolio()
  const { about } = portfolio

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="About"
        title={about.headline}
        description={about.summary}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ScrollReveal>
          <GlassPanel hover={false} className="h-full">
            <h3 className="font-display text-xl font-semibold">Highlights</h3>
            <ul className="mt-5 space-y-4">
              {about.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--accent)]" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal delay={0.08}>
            <GlassPanel>
              <h3 className="font-display text-lg font-semibold">Focus Areas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs text-[var(--text-muted)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <GlassPanel>
              <h3 className="font-display text-lg font-semibold">Industries</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-lg bg-gradient-to-r from-sky-500/15 to-cyan-400/10 px-3 py-1.5 text-xs text-[var(--accent)]"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </ScrollReveal>
        </div>
      </div>

      {about.aiExperience ? (
        <ScrollReveal delay={0.16}>
          <GlassPanel hover={false} className="mt-6">
            <h3 className="font-display text-xl font-semibold">{about.aiExperience.headline}</h3>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)]">
              {about.aiExperience.summary}
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Tools</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {about.aiExperience.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs text-[var(--text-muted)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Capabilities</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {about.aiExperience.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="rounded-lg bg-gradient-to-r from-sky-500/15 to-cyan-400/10 px-3 py-1.5 text-xs text-[var(--accent)]"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </ScrollReveal>
      ) : null}
    </section>
  )
}
