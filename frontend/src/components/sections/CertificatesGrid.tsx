import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'
import { formatDate } from '@/utils/seo'

export function CertificatesGrid() {
  const { certificates } = usePortfolio()

  return (
    <section id="certificates" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="Certificates"
        title="Credentials that back the craft."
        description="Continuous learning across Azure, ASP.NET Core, and SQL Server."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((cert, i) => (
          <ScrollReveal key={cert.id} delay={i * 0.05}>
            <GlassPanel className="overflow-hidden p-0">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={cert.image} alt={cert.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="text-xs text-[var(--accent)]">{cert.issuer} · {formatDate(cert.issueDate)}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{cert.title}</h3>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
                  >
                    View credential <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            </GlassPanel>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
