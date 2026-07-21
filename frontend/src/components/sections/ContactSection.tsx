import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'
import { api } from '@/services/api'

export function ContactSection() {
  const { portfolio, settings } = usePortfolio()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await api.contact(form)
      setStatus('success')
      setMessage(res.message)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const phoneTel = portfolio.profile.phone.replace(/\s+/g, '')
  const whatsAppNumber = (portfolio.profile.whatsApp || phoneTel).replace(/[^\d]/g, '')

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build the next enterprise system together."
        description="Available immediately for remote, international, and employment-visa opportunities."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <GlassPanel hover={false} className="h-full space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 text-[var(--accent)]" size={18} />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <a href={`mailto:${portfolio.profile.email}`} className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
                  {portfolio.profile.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 text-[var(--accent)]" size={18} />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <a href={`tel:${phoneTel}`} className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
                  {portfolio.profile.phone}
                </a>
                <a href="tel:+923024653297" className="mt-1 block text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
                  +92 302 4653297
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaWhatsapp className="mt-1 text-[var(--accent)]" size={18} />
              <div>
                <p className="text-sm font-semibold">WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsAppNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
                >
                  {portfolio.profile.phone}
                </a>
              </div>
            </div>
            {portfolio.social.linkedIn ? (
              <div className="flex items-start gap-3">
                <FaLinkedin className="mt-1 text-[var(--accent)]" size={18} />
                <div>
                  <p className="text-sm font-semibold">LinkedIn</p>
                  <a
                    href={portfolio.social.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
                  >
                    muhammad-babar-ali-98021b144
                  </a>
                </div>
              </div>
            ) : null}
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-[var(--accent)]" size={18} />
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm text-[var(--text-muted)]">{settings.map.address || portfolio.profile.location}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{portfolio.profile.availability}</p>
              </div>
            </div>
            {settings.map.embedUrl ? (
              <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <iframe
                  title="Map"
                  src={settings.map.embedUrl}
                  className="h-48 w-full grayscale invert-[0.85] contrast-125"
                  loading="lazy"
                />
              </div>
            ) : null}
          </GlassPanel>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <GlassPanel hover={false}>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-[var(--text-muted)]">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-[var(--text-muted)]">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-[var(--text-muted)]">Subject</span>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-[var(--text-muted)]">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-y rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2.5 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
                <Send size={16} />
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </Button>
              {message ? (
                <p className={`text-sm ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{message}</p>
              ) : null}
            </form>
          </GlassPanel>
        </ScrollReveal>
      </div>
    </section>
  )
}
