import { useEffect } from 'react'
import { CertificatesGrid } from '@/components/sections/CertificatesGrid'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function CertificatesPage() {
  const { portfolio } = usePortfolio()
  useEffect(() => {
    applySeo({ title: `Certificates | ${portfolio.profile.fullName}` })
  }, [portfolio.profile.fullName])
  return (
    <main className="pt-10">
      <CertificatesGrid />
    </main>
  )
}
