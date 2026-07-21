import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import type { SiteSettings } from '@/types'
import { defaultSettings } from '@/data/defaults'

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [message, setMessage] = useState('')

  useEffect(() => {
    void api
      .getAdminSettings()
      .then(setSettings)
      .catch(() =>
        api.getSettings().then(setSettings).catch((e: unknown) => {
          setMessage(e instanceof Error ? e.message : 'Failed to load settings')
        }),
      )
  }, [])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.updateSettings(settings)
      setMessage('Settings saved')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed')
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-white">Settings</h1>
      {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
      <form onSubmit={onSave} className="mt-6 max-w-2xl space-y-4">
        <label className="block text-sm text-slate-300">
          Site name
          <input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Default theme
          <select
            value={settings.defaultTheme}
            onChange={(e) => setSettings({ ...settings, defaultTheme: e.target.value })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          >
            <option value="dark">dark</option>
            <option value="light">light</option>
          </select>
        </label>
        <label className="block text-sm text-slate-300">
          Primary color
          <input
            value={settings.primaryColor}
            onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Accent color
          <input
            value={settings.accentColor}
            onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Contact email
          <input
            value={settings.contact.email}
            onChange={(e) =>
              setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })
            }
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Map address
          <input
            value={settings.map.address}
            onChange={(e) => setSettings({ ...settings, map: { ...settings.map, address: e.target.value } })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Map embed URL
          <input
            value={settings.map.embedUrl}
            onChange={(e) => setSettings({ ...settings, map: { ...settings.map, embedUrl: e.target.value } })}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
          />
        </label>

        <div className="space-y-2 text-sm text-slate-300">
          {(
            [
              ['enableAnimations', 'Enable animations'],
              ['enableCursor', 'Enable custom cursor'],
              ['enableParticles', 'Enable particles'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
              />
              {label}
            </label>
          ))}
        </div>

        <Button type="submit">Save settings</Button>
      </form>
    </div>
  )
}
