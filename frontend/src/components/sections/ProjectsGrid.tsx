import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'
import { cn } from '@/utils/cn'

interface ProjectsGridProps {
  featuredOnly?: boolean
  limit?: number
  showFilters?: boolean
}

export function ProjectsGrid({ featuredOnly = false, limit, showFilters = true }: ProjectsGridProps) {
  const { projects } = usePortfolio()
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      set.add(p.industry)
      p.categories.forEach((c) => set.add(c))
    })
    return ['all', ...Array.from(set)]
  }, [projects])

  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    let list = featuredOnly ? projects.filter((p) => p.featured) : projects
    if (active !== 'all') {
      list = list.filter(
        (p) =>
          p.industry.toLowerCase() === active.toLowerCase() ||
          p.categories.some((c) => c.toLowerCase() === active.toLowerCase()),
      )
    }
    return typeof limit === 'number' ? list.slice(0, limit) : list
  }, [projects, featuredOnly, active, limit])

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Enterprise case studies across ERP, healthcare, legal, CMS, and manufacturing."
          description="Architecture, modules, and business outcomes — presented as premium software case studies."
        />
        {!featuredOnly ? null : (
          <Link to="/projects" className="text-sm text-[var(--accent)] hover:underline">
            View all projects →
          </Link>
        )}
      </div>

      {showFilters ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs capitalize transition',
                active === cat
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.04}>
            <Link to={`/projects/${project.slug}`} className="group block h-full">
              <GlassPanel className="flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&q=80'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-1 text-[11px] text-cyan-200 backdrop-blur">
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
    </section>
  )
}
