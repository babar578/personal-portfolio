import { useEffect } from 'react'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stats } from '@/components/sections/Stats'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { SkillsCloud } from '@/components/sections/SkillsCloud'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { CertificatesGrid } from '@/components/sections/CertificatesGrid'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { ContactSection } from '@/components/sections/ContactSection'
import { usePortfolio } from '@/hooks/usePortfolio'
import { applySeo } from '@/utils/seo'

export default function Home() {
  const { portfolio } = usePortfolio()

  useEffect(() => {
    applySeo({
      title: portfolio.seo.title,
      description: portfolio.seo.description,
      keywords: portfolio.seo.keywords,
      image: portfolio.seo.ogImage,
      author: portfolio.seo.author,
    })
  }, [portfolio.seo])

  return (
    <>
      <Hero />
      <About />
      <Stats />
      <ProjectsGrid featuredOnly limit={6} showFilters={false} />
      <ExperienceTimeline />
      <SkillsCloud />
      <ServicesGrid />
      <TestimonialsCarousel />
      <CertificatesGrid />
      <BlogPreview />
      <ContactSection />
    </>
  )
}
