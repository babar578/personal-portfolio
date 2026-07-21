import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo, formatDate } from '@/utils/seo'

export default function BlogPage() {
  const { blogs, portfolio } = usePortfolio()
  const [search, setSearch] = useState('')

  useEffect(() => {
    applySeo({
      title: `Blog | ${portfolio.profile.fullName}`,
      description: 'Architecture, APIs, and ERP performance notes.',
    })
  }, [portfolio.profile.fullName])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return blogs
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [blogs, search])

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-6">
      <SectionHeading
        eyebrow="Blog"
        title="Writing from the trenches of enterprise .NET."
        description="Search articles on architecture, SQL performance, and integrations."
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts…"
        className="mt-8 w-full max-w-md rounded-xl border border-[var(--border)] bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <GlassPanel className="h-full overflow-hidden p-0">
              <img src={post.coverImage} alt={post.title} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs text-[var(--accent)]">
                  {post.category} · {formatDate(post.publishedAt)}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
              </div>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </main>
  )
}
