import { useEffect } from 'react'
import { ContactSection } from '@/components/sections/ContactSection'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function ContactPage() {
  const { portfolio } = usePortfolio()
  useEffect(() => {
    applySeo({
      title: `Contact | ${portfolio.profile.fullName}`,
      description: 'Get in touch for enterprise .NET architecture and delivery.',
    })
  }, [portfolio.profile.fullName])
  return (
    <main className="pt-10">
      <ContactSection />
    </main>
  )
}
