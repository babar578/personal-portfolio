import { useEffect } from 'react'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function ProjectsPage() {
  const { portfolio } = usePortfolio()

  useEffect(() => {
    applySeo({
      title: `Projects | ${portfolio.profile.fullName}`,
      description: 'Enterprise ERP, medical, and supply chain case studies.',
    })
  }, [portfolio.profile.fullName])

  return (
    <main className="pt-10">
      <ProjectsGrid />
    </main>
  )
}
