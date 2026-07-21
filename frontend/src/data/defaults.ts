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

import portfolioJson from './content/portfolio.json'
import projectsJson from './content/projects.json'
import experienceJson from './content/experience.json'
import skillsJson from './content/skills.json'
import servicesJson from './content/services.json'
import testimonialsJson from './content/testimonials.json'
import certificatesJson from './content/certificates.json'
import blogsJson from './content/blogs.json'
import settingsJson from './content/settings.json'

/** Static fallbacks = same content as Portfolio.API/Data (used on GitHub Pages when API is offline). */
export const defaultPortfolio = portfolioJson as PortfolioData
export const defaultProjects = projectsJson as Project[]
export const defaultExperience = experienceJson as Experience[]
export const defaultSkills = skillsJson as SkillCategory[]
export const defaultServices = servicesJson as Service[]
export const defaultTestimonials = testimonialsJson as Testimonial[]
export const defaultCertificates = certificatesJson as Certificate[]
export const defaultBlogs = blogsJson as BlogPost[]
export const defaultSettings = settingsJson as SiteSettings
