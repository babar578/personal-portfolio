export interface Profile {
  fullName: string
  firstName: string
  lastName: string
  title: string
  tagline: string
  location: string
  email: string
  phone: string
  whatsApp: string
  avatar: string
  heroImage: string
  yearsExperience: number
  availability: string
}

export interface SocialLinks {
  linkedIn: string
  gitHub: string
  twitter: string
  youTube: string
  website: string
}

export interface ResumeInfo {
  url: string
  fileName: string
  updatedAt?: string | null
}

export interface AboutSection {
  headline: string
  summary: string
  focusAreas: string[]
  industries: string[]
  highlights: string[]
  aiExperience?: {
    headline: string
    summary: string
    tools: string[]
    capabilities: string[]
  }
}

export interface Statistic {
  id: string
  label: string
  value: number
  suffix: string
  icon: string
}

export interface SeoMeta {
  title: string
  description: string
  keywords: string
  ogImage: string
  siteUrl: string
  author: string
}

export interface PortfolioData {
  profile: Profile
  rotatingTitles: string[]
  social: SocialLinks
  resume: ResumeInfo
  about: AboutSection
  statistics: Statistic[]
  seo: SeoMeta
}

export interface CaseStudy {
  problem: string
  challenges: string[]
  architecture: string
  database: string
  api: string
  performance: string
  businessValue: string
  lessonsLearned: string[]
  flowDiagrams: string[]
  images: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  company?: string
  industry: string
  clientRegion?: string
  duration?: string
  categories: string[]
  shortDescription: string
  description: string
  businessProblem: string
  solution: string
  responsibilities?: string[]
  technicalHighlights?: string[]
  database?: string
  deploymentEnvironment?: string
  results?: string
  coverImage: string
  gallery: string[]
  videoUrl?: string | null
  gitHubUrl?: string | null
  liveDemoUrl?: string | null
  technologies: string[]
  architecture: string
  modules: string[]
  features: string[]
  caseStudy?: CaseStudy | null
  featured: boolean
  order: number
  completedAt?: string | null
}

export interface Skill {
  id: string
  name: string
  level: number
  icon: string
  color: string
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  skills: Skill[]
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string | null
  order: number
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string | null
  credentialId?: string | null
  credentialUrl?: string | null
  image: string
  downloadUrl?: string | null
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  published: boolean
  readTimeMinutes: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  type: string
  order: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  order: number
}

export interface GalleryItem {
  id: string
  title: string
  image: string
  projectId?: string | null
  category: string
  order: number
}

export interface ContactSettings {
  email: string
  formEndpoint: string
  enableForm: boolean
}

export interface MapSettings {
  latitude: number
  longitude: number
  embedUrl: string
  address: string
}

export interface AdminSettings {
  username: string
  passwordHash?: string
}

export interface SiteSettings {
  siteName: string
  defaultTheme: string
  enableAnimations: boolean
  enableCursor: boolean
  enableParticles: boolean
  primaryColor: string
  accentColor: string
  contact: ContactSettings
  map: MapSettings
  admin?: AdminSettings
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  expiresAt: string
  username: string
}

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

export type Theme = 'dark' | 'light'
