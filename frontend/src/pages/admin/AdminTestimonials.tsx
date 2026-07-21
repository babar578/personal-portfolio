import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { Testimonial } from '@/types'

const empty = (): Testimonial => ({
  id: '',
  name: '',
  role: '',
  company: '',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=New',
  content: '',
  rating: 5,
  type: 'Client',
  order: 0,
})

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [message, setMessage] = useState('')

  const load = async () => setItems(await api.getTestimonials())
  useEffect(() => {
    void load().catch((e: unknown) => setMessage(e instanceof Error ? e.message : 'Failed'))
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    if (editing.id) await api.updateTestimonial(editing.id, editing)
    else await api.createTestimonial(editing)
    setEditing(null)
    setMessage('Saved')
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-white">Testimonials</h1>
        <Button onClick={() => setEditing(empty())}>Add</Button>
      </div>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div>
              <p className="text-white">{item.name}</p>
              <p className="text-xs text-slate-500">{item.company}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(item)}>Edit</Button>
              <Button
                variant="danger"
                size="sm"
                onClick={async () => {
                  await api.deleteTestimonial(item.id)
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
          {(['name', 'role', 'company', 'avatar', 'type'] as const).map((field) => (
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
            content
            <textarea
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              rows={4}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
            />
          </label>
          <label className="block text-sm text-slate-300">
            rating
            <input
              type="number"
              min={1}
              max={5}
              value={editing.rating}
              onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
            />
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
