import { Link } from 'react-router-dom'
import { usePortfolio } from '@/hooks/usePortfolio'

export default function AdminDashboard() {
  const { projects, experience, blogs, testimonials, certificates, skills, loading, error, refresh } =
    usePortfolio()

  const cards = [
    { label: 'Projects', value: projects.length, to: '/admin/projects' },
    { label: 'Experience', value: experience.length, to: '/admin/experience' },
    { label: 'Skill categories', value: skills.length, to: '/admin/skills' },
    { label: 'Blog posts', value: blogs.length, to: '/admin/blogs' },
    { label: 'Testimonials', value: testimonials.length, to: '/admin/testimonials' },
    { label: 'Certificates', value: certificates.length, to: '/admin/certificates' },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Overview of portfolio content.</p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
        >
          Refresh data
        </button>
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-400">Loading…</p> : null}
      {error ? <p className="mt-4 text-sm text-amber-300">{error}</p> : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-cyan-400/30"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{card.label}</p>
            <p className="mt-3 font-display text-3xl font-semibold text-white">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
