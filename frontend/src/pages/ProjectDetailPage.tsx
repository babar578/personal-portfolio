import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { defaultProjects } from '@/data/defaults'
import { usePortfolio } from '@/hooks/usePortfolio'
import { api } from '@/services/api'
import type { Project } from '@/types'
import { applySeo } from '@/utils/seo'

function MetaItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 text-sm text-[var(--text)]">{value}</p>
    </div>
  )
}

function BulletPanel({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <GlassPanel hover={false}>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm leading-relaxed text-[var(--text-muted)] before:mr-2 before:text-[var(--accent)] before:content-['▸']"
          >
            {item}
          </li>
        ))}
      </ul>
    </GlassPanel>
  )
}

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const { projects } = usePortfolio()
  const [project, setProject] = useState<Project | null>(
    () => projects.find((p) => p.slug === slug || p.id === slug) ?? null,
  )
  const [loading, setLoading] = useState(!project)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const local = projects.find((p) => p.slug === slug || p.id === slug)
      if (local) {
        setProject(local)
        setLoading(false)
      }
      try {
        const data = await api.getProject(slug)
        if (!cancelled) setProject(data)
      } catch {
        if (!local && !cancelled) {
          setProject(defaultProjects.find((p) => p.slug === slug) ?? null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [slug, projects])

  useEffect(() => {
    if (project) {
      applySeo({ title: `${project.title} | Projects`, description: project.shortDescription })
    }
  }, [project])

  if (loading) {
    return <main className="mx-auto max-w-5xl px-4 py-32 text-[var(--text-muted)]">Loading project…</main>
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-32">
        <p>Project not found.</p>
        <Link to="/projects" className="mt-4 inline-flex text-[var(--accent)]">
          ← Back to projects
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-28 md:px-6">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
        <ArrowLeft size={14} /> All projects
      </Link>

      {/* Hero Banner */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-[var(--border)]">
        <img
          src={project.coverImage}
          alt={project.title}
          className="max-h-[420px] w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&q=80'
          }}
        />
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{project.industry}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
      {project.company ? (
        <p className="mt-2 text-sm text-[var(--text-muted)]">{project.company}</p>
      ) : null}
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)]">{project.shortDescription}</p>

      <div className="mt-6 grid gap-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] p-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetaItem label="Industry" value={project.industry} />
        <MetaItem label="Client Region" value={project.clientRegion} />
        <MetaItem label="Duration" value={project.duration || '—'} />
        <MetaItem label="Company" value={project.company} />
      </div>

      <GlassPanel hover={false} className="mt-5">
        <h2 className="font-display text-lg font-semibold">Business Overview</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>
      </GlassPanel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <GlassPanel hover={false}>
          <h2 className="font-display text-lg font-semibold">Business Problem</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.businessProblem}</p>
        </GlassPanel>
        <GlassPanel hover={false}>
          <h2 className="font-display text-lg font-semibold">Solution</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.solution}</p>
        </GlassPanel>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <BulletPanel title="Features" items={project.features} />
        <BulletPanel title="Modules" items={project.modules} />
      </div>

      <GlassPanel hover={false} className="mt-5">
        <h2 className="font-display text-lg font-semibold">Architecture</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.architecture}</p>
      </GlassPanel>

      {/* Technology Stack / Tech Icons */}
      <GlassPanel hover={false} className="mt-5">
        <h2 className="font-display text-lg font-semibold">Technology Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-medium text-[var(--accent)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </GlassPanel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <BulletPanel title="My Role" items={project.responsibilities} />
        <BulletPanel title="Technical Highlights" items={project.technicalHighlights} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <GlassPanel hover={false}>
          <h2 className="font-display text-lg font-semibold">Database</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {project.database || project.caseStudy?.database || '—'}
          </p>
        </GlassPanel>
        <GlassPanel hover={false}>
          <h2 className="font-display text-lg font-semibold">Deployment Environment</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {project.deploymentEnvironment || '—'}
          </p>
        </GlassPanel>
      </div>

      {project.caseStudy?.challenges?.length ? (
        <div className="mt-5">
          <BulletPanel title="Challenges" items={project.caseStudy.challenges} />
        </div>
      ) : null}

      {project.results ? (
        <GlassPanel hover={false} className="mt-5">
          <h2 className="font-display text-lg font-semibold">Results</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.results}</p>
        </GlassPanel>
      ) : null}

      {project.caseStudy?.businessValue ? (
        <GlassPanel hover={false} className="mt-5 space-y-3">
          <h2 className="font-display text-xl font-semibold">Business Impact</h2>
          <p className="text-sm text-[var(--text-muted)]">{project.caseStudy.businessValue}</p>
          {project.caseStudy.performance ? (
            <p className="text-sm text-[var(--text-muted)]">
              <strong className="text-[var(--text)]">Performance: </strong>
              {project.caseStudy.performance}
            </p>
          ) : null}
        </GlassPanel>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {project.gitHubUrl ? (
          <a href={project.gitHubUrl} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
            <FaGithub size={14} /> GitHub
          </a>
        ) : null}
        {project.liveDemoUrl ? (
          <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
            <ExternalLink size={14} /> Live demo
          </a>
        ) : null}
      </div>

      {/* Image Gallery */}
      <GlassPanel hover={false} className="mt-8">
        <h2 className="font-display text-lg font-semibold">Image Gallery</h2>
        {project.gallery?.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img) => (
              <img key={img} src={img} alt={`${project.title} gallery`} className="h-48 w-full rounded-2xl border border-[var(--border)] object-cover" />
            ))}
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] text-xs text-[var(--text-muted)]">
              Screenshot placeholder 1
            </div>
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] text-xs text-[var(--text-muted)]">
              Screenshot placeholder 2
            </div>
          </div>
        )}
      </GlassPanel>
    </main>
  )
}
