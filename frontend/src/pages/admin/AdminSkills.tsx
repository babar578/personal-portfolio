import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { SkillCategory } from '@/types'

export default function AdminSkills() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [raw, setRaw] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    void api
      .getSkills()
      .then((data) => {
        setCategories(data)
        setRaw(JSON.stringify(data, null, 2))
      })
      .catch((e: unknown) => setMessage(e instanceof Error ? e.message : 'Failed'))
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const parsed = JSON.parse(raw) as SkillCategory[]
      const saved = await api.updateSkills(parsed)
      setCategories(saved)
      setMessage('Skills updated')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Invalid JSON or save failed')
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-white">Skills</h1>
      <p className="mt-2 text-sm text-slate-400">
        Edit skill categories as JSON. {categories.length} categories loaded.
      </p>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      <form onSubmit={onSave} className="mt-6">
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="min-h-[420px] w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 font-mono text-xs text-slate-200"
        />
        <Button type="submit" className="mt-4">
          Save skills
        </Button>
      </form>
    </div>
  )
}
