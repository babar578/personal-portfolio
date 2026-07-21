import { useEffect } from 'react'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function ExperiencePage() {
  const { portfolio } = usePortfolio()
  useEffect(() => {
    applySeo({ title: `Experience | ${portfolio.profile.fullName}` })
  }, [portfolio.profile.fullName])
  return (
    <main className="pt-10">
      <ExperienceTimeline />
    </main>
  )
}
