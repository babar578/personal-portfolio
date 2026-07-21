import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { defaultBlogs } from '@/data/defaults'
import { usePortfolio } from '@/hooks/usePortfolio'
import { api } from '@/services/api'
import type { BlogPost } from '@/types'
import { applySeo, formatDate } from '@/utils/seo'

function renderMarkdown(content: string) {
  return content
    .split('\n')
    .map((line) => {
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`
      if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`
      if (/^\d+\.\s/.test(line)) return `<li>${line.replace(/^\d+\.\s/, '')}</li>`
      if (!line.trim()) return '<br/>'
      return `<p>${line}</p>`
    })
    .join('')
}

export default function BlogDetailPage() {
  const { slug = '' } = useParams()
  const { blogs } = usePortfolio()
  const [post, setPost] = useState<BlogPost | null>(
    () => blogs.find((b) => b.slug === slug || b.id === slug) ?? null,
  )

  useEffect(() => {
    let cancelled = false
    async function load() {
      const local = blogs.find((b) => b.slug === slug || b.id === slug)
      if (local) setPost(local)
      try {
        const data = await api.getBlog(slug)
        if (!cancelled) setPost(data)
      } catch {
        if (!local && !cancelled) setPost(defaultBlogs.find((b) => b.slug === slug) ?? null)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [slug, blogs])

  useEffect(() => {
    if (post) applySeo({ title: `${post.title} | Blog`, description: post.excerpt })
  }, [post])

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-32">
        <p>Post not found.</p>
        <Link to="/blog" className="mt-4 inline-flex text-[var(--accent)]">
          ← Back to blog
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 md:px-6">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
        <ArrowLeft size={14} /> All posts
      </Link>
      <img src={post.coverImage} alt={post.title} className="mt-6 aspect-[16/9] w-full rounded-3xl object-cover" />
      <p className="mt-8 text-xs text-[var(--accent)]">
        {post.category} · {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-3 text-[var(--text-muted)]">{post.excerpt}</p>
      <article
        className="prose-blog mt-10"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </main>
  )
}
