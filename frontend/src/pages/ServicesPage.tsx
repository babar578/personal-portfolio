import { useEffect } from 'react'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function ServicesPage() {
  const { portfolio } = usePortfolio()
  useEffect(() => {
    applySeo({ title: `Services | ${portfolio.profile.fullName}` })
  }, [portfolio.profile.fullName])
  return (
    <main className="pt-10">
      <ServicesGrid />
    </main>
  )
}
