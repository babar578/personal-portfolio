import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { Certificate } from '@/types'

const empty = (): Certificate => ({
  id: '',
  title: '',
  issuer: '',
  issueDate: '',
  expiryDate: null,
  credentialId: null,
  credentialUrl: null,
  image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  downloadUrl: null,
})

export default function AdminCertificates() {
  const [items, setItems] = useState<Certificate[]>([])
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [message, setMessage] = useState('')

  const load = async () => setItems(await api.getCertificates())
  useEffect(() => {
    void load().catch((e: unknown) => setMessage(e instanceof Error ? e.message : 'Failed'))
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    if (editing.id) await api.updateCertificate(editing.id, editing)
    else await api.createCertificate(editing)
    setEditing(null)
    setMessage('Saved')
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-white">Certificates</h1>
        <Button onClick={() => setEditing(empty())}>Add</Button>
      </div>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div>
              <p className="text-white">{item.title}</p>
              <p className="text-xs text-slate-500">{item.issuer}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(item)}>Edit</Button>
              <Button
                variant="danger"
                size="sm"
                onClick={async () => {
                  await api.deleteCertificate(item.id)
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
          {(['title', 'issuer', 'issueDate', 'image'] as const).map((field) => (
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
            credentialUrl
            <input
              value={editing.credentialUrl ?? ''}
              onChange={(e) => setEditing({ ...editing, credentialUrl: e.target.value || null })}
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
