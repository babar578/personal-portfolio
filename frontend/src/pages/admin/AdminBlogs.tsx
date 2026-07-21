import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { BlogPost } from '@/types'

const empty = (): BlogPost => ({
  id: '',
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
  category: 'Architecture',
  tags: [],
  author: 'Muhammad Babar Ali',
  publishedAt: new Date().toISOString(),
  published: true,
  readTimeMinutes: 5,
})

export default function AdminBlogs() {
  const [items, setItems] = useState<BlogPost[]>([])
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [message, setMessage] = useState('')

  const load = async () => {
    try {
      setItems(await api.getAllBlogsAdmin())
    } catch {
      setItems(await api.getBlogs())
    }
  }

  useEffect(() => {
    void load().catch((e: unknown) => setMessage(e instanceof Error ? e.message : 'Failed'))
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    if (editing.id) await api.updateBlog(editing.id, editing)
    else await api.createBlog(editing)
    setEditing(null)
    setMessage('Saved')
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-white">Blogs</h1>
        <Button onClick={() => setEditing(empty())}>New post</Button>
      </div>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      <div className="mt-6 space-y-3">
        {items.map((post) => (
          <div key={post.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div>
              <p className="text-white">{post.title}</p>
              <p className="text-xs text-slate-500">
                {post.published ? 'Published' : 'Draft'} · {post.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(post)}>Edit</Button>
              <Button
                variant="danger"
                size="sm"
                onClick={async () => {
                  await api.deleteBlog(post.id)
                  await load()
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <form onSubmit={onSave} className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          {(['title', 'slug', 'category', 'excerpt', 'coverImage'] as const).map((field) => (
            <label key={field} className="block text-sm text-slate-300">
              {field}
              <input
                value={editing[field]}
                onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm text-slate-300">
            content (markdown)
            <textarea
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={8}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 font-mono text-xs"
            />
          </label>
          <label className="block text-sm text-slate-300">
            tags (comma-separated)
            <input
              value={editing.tags.join(', ')}
              onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
            />
            Published
          </label>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </form>
      ) : null}
    </div>
  )
}
