import { useEffect } from 'react'
import { SkillsCloud } from '@/components/sections/SkillsCloud'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function SkillsPage() {
  const { portfolio } = usePortfolio()
  useEffect(() => {
    applySeo({ title: `Skills | ${portfolio.profile.fullName}` })
  }, [portfolio.profile.fullName])
  return (
    <main className="pt-10">
      <SkillsCloud />
    </main>
  )
}
