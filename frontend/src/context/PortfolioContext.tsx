import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultBlogs,
  defaultCertificates,
  defaultExperience,
  defaultPortfolio,
  defaultProjects,
  defaultServices,
  defaultSettings,
  defaultSkills,
  defaultTestimonials,
} from '@/data/defaults'
import { api } from '@/services/api'
import type {
  BlogPost,
  Certificate,
  Experience,
  PortfolioData,
  Project,
  Service,
  SiteSettings,
  SkillCategory,
  Testimonial,
} from '@/types'

interface PortfolioContextValue {
  portfolio: PortfolioData
  projects: Project[]
  experience: Experience[]
  skills: SkillCategory[]
  services: Service[]
  testimonials: Testimonial[]
  certificates: Certificate[]
  blogs: BlogPost[]
  settings: SiteSettings
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolio)
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [experience, setExperience] = useState<Experience[]>(defaultExperience)
  const [skills, setSkills] = useState<SkillCategory[]>(defaultSkills)
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates)
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await Promise.allSettled([
        api.getPortfolio(),
        api.getProjects(),
        api.getExperience(),
        api.getSkills(),
        api.getServices(),
        api.getTestimonials(),
        api.getCertificates(),
        api.getBlogs(),
        api.getSettings(),
      ])

      const [p, pr, ex, sk, sv, te, ce, bl, se] = results
      if (p.status === 'fulfilled') setPortfolio(p.value)
      if (pr.status === 'fulfilled') setProjects(pr.value)
      if (ex.status === 'fulfilled') setExperience(ex.value)
      if (sk.status === 'fulfilled') setSkills(sk.value)
      if (sv.status === 'fulfilled') setServices(sv.value)
      if (te.status === 'fulfilled') setTestimonials(te.value)
      if (ce.status === 'fulfilled') setCertificates(ce.value)
      if (bl.status === 'fulfilled') setBlogs(bl.value)
      if (se.status === 'fulfilled') setSettings(se.value)

      const failed = results.filter((r) => r.status === 'rejected').length
      if (failed === results.length) {
        setError('API unavailable — showing local defaults.')
      } else if (failed > 0) {
        setError('Some data failed to load — using defaults where needed.')
      }
    } catch {
      setError('API unavailable — showing local defaults.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      portfolio,
      projects,
      experience,
      skills,
      services,
      testimonials,
      certificates,
      blogs,
      settings,
      loading,
      error,
      refresh,
    }),
    [
      portfolio,
      projects,
      experience,
      skills,
      services,
      testimonials,
      certificates,
      blogs,
      settings,
      loading,
      error,
      refresh,
    ],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolioContext() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolioContext must be used within PortfolioProvider')
  return ctx
}
