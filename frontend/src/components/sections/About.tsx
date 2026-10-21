import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'

export function About() {
  const { portfolio } = usePortfolio()
  const { about, profile } = portfolio
  const photo = profile.avatar || profile.heroImage

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="About"
        title={about.headline}
        description={about.summary}
      />

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <ScrollReveal>
          <div className="relative mx-auto max-w-[240px] lg:mx-0 md:max-w-[260px]">
            <figure className="relative overflow-hidden bg-[var(--bg)]">
              <img
                src={photo}
                alt={`${profile.fullName} professional headshot`}
                className="profile-photo profile-photo--hero aspect-[4/5] w-full"
                width={360}
                height={450}
                loading="lazy"
              />
              <figcaption className="relative -mt-14 bg-gradient-to-t from-[var(--bg)] via-[color-mix(in_oklab,var(--bg)_70%,transparent)] to-transparent px-3 pb-3 pt-10">
                <p className="font-display text-sm font-semibold">{profile.fullName}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{profile.title}</p>
              </figcaption>
            </figure>
          </div>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal delay={0.05}>
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

          <ScrollReveal delay={0.08}>
            <GlassPanel>
              <h3 className="font-display text-lg font-semibold">Focus Areas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-lg border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs text-[var(--text-muted)]"
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
                  <span key={industry} className="chip-accent rounded-lg px-3 py-1.5 text-xs">
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
                      className="rounded-lg border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs text-[var(--text-muted)]"
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
                    <span key={capability} className="chip-accent rounded-lg px-3 py-1.5 text-xs">
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
