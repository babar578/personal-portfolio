import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'
import { formatDate } from '@/utils/seo'

export function BlogPreview() {
  const { blogs } = usePortfolio()
  const posts = blogs.slice(0, 3)

  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Blog"
          title="Notes on architecture, APIs, and ERP performance."
          description="Practical writing from shipping enterprise .NET systems."
        />
        <Link to="/blog" className="text-sm text-[var(--accent)] hover:underline">
          All articles →
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <ScrollReveal key={post.id} delay={i * 0.05}>
            <Link to={`/blog/${post.slug}`} className="group block h-full">
              <GlassPanel className="flex h-full flex-col overflow-hidden p-0">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-[var(--accent)]">
                    {post.category} · {formatDate(post.publishedAt)} · {post.readTimeMinutes} min
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-[var(--accent)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)]">
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </GlassPanel>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
