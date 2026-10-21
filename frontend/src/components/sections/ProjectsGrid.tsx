import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'
import { cn } from '@/utils/cn'
import {
  PROJECT_SUBJECT_TABS,
  projectMatchesSubject,
  type ProjectSubjectId,
} from '@/data/projectSubjects'

interface ProjectsGridProps {
  featuredOnly?: boolean
  limit?: number
  showFilters?: boolean
}

export function ProjectsGrid({ featuredOnly = false, limit, showFilters = true }: ProjectsGridProps) {
  const { projects } = usePortfolio()
  const [active, setActive] = useState<ProjectSubjectId>('all')

  const tabs = useMemo(() => {
    return PROJECT_SUBJECT_TABS.map((tab) => {
      const count =
        tab.id === 'all'
          ? projects.length
          : projects.filter((p) => projectMatchesSubject(p.slug, p.categories, tab.id)).length
      return { ...tab, count }
    }).filter((tab) => tab.id === 'all' || tab.count > 0)
  }, [projects])

  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0]

  const filtered = useMemo(() => {
    const filtering = active !== 'all'
    let list = featuredOnly && !filtering ? projects.filter((p) => p.featured) : projects
    if (filtering) {
      list = list.filter((p) => projectMatchesSubject(p.slug, p.categories, active))
    }
    if (typeof limit === 'number' && !filtering) {
      return list.slice(0, limit)
    }
    return list
  }, [projects, featuredOnly, active, limit])

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Case studies by domain — banking, AI, medical, ERP, and more."
          description={
            activeTab
              ? `${activeTab.description}. Select a subject tab to focus the portfolio.`
              : 'Architecture, modules, and business outcomes — grouped by subject.'
          }
        />
        {featuredOnly && active === 'all' ? (
          <Link to="/projects" className="text-sm text-[var(--accent)] hover:underline">
            View all projects →
          </Link>
        ) : null}
      </div>

      {showFilters ? (
        <div className="mt-8">
          <div
            role="tablist"
            aria-label="Project subjects"
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  'shrink-0 rounded-lg border px-3.5 py-2 text-sm transition',
                  active === tab.id
                    ? 'border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[color-mix(in_oklab,var(--text)_20%,transparent)] hover:text-[var(--text)]',
                )}
              >
                <span className="font-medium">{tab.label}</span>
                <span
                  className={cn(
                    'ml-2 text-xs tabular-nums',
                    active === tab.id ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]',
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          {active !== 'all' ? (
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Showing <span className="text-[var(--text)]">{filtered.length}</span> project
              {filtered.length === 1 ? '' : 's'} in <span className="text-[var(--text)]">{activeTab?.label}</span>
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.04}>
            <Link to={`/projects/${project.slug}`} className="group block h-full">
              <GlassPanel className="flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-[color-mix(in_oklab,var(--accent)_6%,var(--bg))]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className={
                      project.coverImage.includes('/uploads/brands/') &&
                      !project.coverImage.includes('-cover.')
                        ? 'h-full w-full object-contain p-8 transition duration-500 group-hover:scale-[1.02]'
                        : 'h-full w-full object-cover transition duration-500 group-hover:scale-105'
                    }
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&q=80'
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/45 px-2 py-1 text-[11px] text-stone-100 backdrop-blur">
                    {project.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                    <ArrowUpRight className="shrink-0 text-[var(--accent)] opacity-0 transition group-hover:opacity-100" size={18} />
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {project.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-[var(--text-muted)]">No projects in this subject yet.</p>
      ) : null}
    </section>
  )
}
