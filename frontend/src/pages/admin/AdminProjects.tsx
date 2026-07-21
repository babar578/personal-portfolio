import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { Project } from '@/types'

const emptyProject = (): Project => ({
  id: '',
  slug: '',
  title: '',
  company: '',
  industry: '',
  clientRegion: '',
  duration: '',
  categories: [],
  shortDescription: '',
  description: '',
  businessProblem: '',
  solution: '',
  responsibilities: [],
  technicalHighlights: [],
  database: '',
  deploymentEnvironment: '',
  results: '',
  coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
  gallery: [],
  technologies: [],
  architecture: '',
  modules: [],
  features: [],
  featured: false,
  order: 0,
})

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([])
  const [editing, setEditing] = useState<Project | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      setItems(await api.getProjects())
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    try {
      if (editing.id) await api.updateProject(editing.id, editing)
      else await api.createProject(editing)
      setEditing(null)
      setMessage('Saved')
      await load()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed')
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await api.deleteProject(id)
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-white">Projects</h1>
        <Button onClick={() => setEditing(emptyProject())}>Add project</Button>
      </div>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      {loading ? <p className="mt-6 text-slate-400">Loading…</p> : null}

      <div className="mt-6 space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div>
              <p className="font-medium text-white">{p.title}</p>
              <p className="text-xs text-slate-500">{p.industry} · {p.slug}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(p)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => void onDelete(p.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {editing ? (
        <form onSubmit={onSave} className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="font-display text-xl text-white">{editing.id ? 'Edit project' : 'New project'}</h2>
          {(['title', 'slug', 'industry', 'shortDescription', 'description', 'businessProblem', 'solution', 'coverImage', 'architecture'] as const).map((field) => (
            <label key={field} className="block text-sm text-slate-300">
              {field}
              <input
                value={editing[field] ?? ''}
                onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm text-slate-300">
            categories (comma-separated)
            <input
              value={editing.categories.join(', ')}
              onChange={(e) => setEditing({ ...editing, categories: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
            />
          </label>
          <label className="block text-sm text-slate-300">
            technologies (comma-separated)
            <input
              value={editing.technologies.join(', ')}
              onChange={(e) => setEditing({ ...editing, technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
            />
            Featured
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
