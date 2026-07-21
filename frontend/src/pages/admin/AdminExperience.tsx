import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { Experience } from '@/types'

const empty = (): Experience => ({
  id: '',
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: null,
  isCurrent: false,
  description: '',
  achievements: [],
  technologies: [],
  logo: null,
  order: 0,
})

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([])
  const [editing, setEditing] = useState<Experience | null>(null)
  const [message, setMessage] = useState('')

  const load = async () => setItems(await api.getExperience())
  useEffect(() => {
    void load().catch((e: unknown) => setMessage(e instanceof Error ? e.message : 'Failed'))
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    if (editing.id) await api.updateExperience(editing.id, editing)
    else await api.createExperience(editing)
    setEditing(null)
    setMessage('Saved')
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-white">Experience</h1>
        <Button onClick={() => setEditing(empty())}>Add role</Button>
      </div>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div>
              <p className="text-white">{item.role}</p>
              <p className="text-xs text-slate-500">{item.company}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(item)}>Edit</Button>
              <Button
                variant="danger"
                size="sm"
                onClick={async () => {
                  await api.deleteExperience(item.id)
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
          {(['company', 'role', 'location', 'startDate', 'description'] as const).map((field) => (
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
            endDate
            <input
              value={editing.endDate ?? ''}
              onChange={(e) => setEditing({ ...editing, endDate: e.target.value || null })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
            />
          </label>
          <label className="block text-sm text-slate-300">
            achievements (one per line)
            <textarea
              value={editing.achievements.join('\n')}
              onChange={(e) => setEditing({ ...editing, achievements: e.target.value.split('\n').filter(Boolean) })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
              rows={4}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={editing.isCurrent}
              onChange={(e) => setEditing({ ...editing, isCurrent: e.target.checked })}
            />
            Current role
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
