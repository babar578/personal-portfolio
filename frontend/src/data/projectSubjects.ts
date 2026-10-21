/** Curated portfolio subjects for project tabs (not every raw tag). */
export type ProjectSubjectId =
  | 'all'
  | 'banking'
  | 'ai'
  | 'medical'
  | 'homecare'
  | 'erp'
  | 'cms'
  | 'biotech'
  | 'legal'
  | 'personal'

export interface ProjectSubjectTab {
  id: ProjectSubjectId
  label: string
  description: string
}

export const PROJECT_SUBJECT_TABS: ProjectSubjectTab[] = [
  { id: 'all', label: 'All', description: 'Full portfolio' },
  { id: 'banking', label: 'Banking & Finance', description: 'Banks, capital markets, investment' },
  { id: 'ai', label: 'AI & Agents', description: 'LLM, RAG, agents, AI products' },
  { id: 'medical', label: 'Medical', description: 'Clinics, oncology, clinical platforms' },
  { id: 'homecare', label: 'Home Care / Nursing', description: 'At-home care & nursing workflows' },
  { id: 'erp', label: 'ERP & Manufacturing', description: 'ERP, factory, inventory, retail ops' },
  { id: 'cms', label: 'CMS & Digital', description: 'Umbraco / enterprise web platforms' },
  { id: 'biotech', label: 'Biotech', description: 'Food & animal safety, hardware–software' },
  { id: 'legal', label: 'Legal', description: 'Legal operations & case systems' },
  { id: 'personal', label: 'Personal Products', description: 'Independent / personal builds' },
]

/** Primary subject tags per project slug (a project can appear in multiple tabs). */
export const PROJECT_SUBJECTS: Record<string, Exclude<ProjectSubjectId, 'all'>[]> = {
  'ajc-al-jazeera-capital': ['banking', 'cms'],
  'smart-rag-chatbot': ['ai'],
  'eme-event-inventory-erp': ['erp'],
  'subtrack-subscription-tracker': ['ai', 'personal'],
  'onco-clinics': ['medical', 'cms'],
  'sppc-corporate-cms': ['cms'],
  'aira-ai-assistant': ['ai', 'personal'],
  'meem-islamic-finance-cms': ['banking', 'cms'],
  'ithmaar-banking-cms': ['banking', 'cms'],
  'brand-color-qa-scan': ['ai'],
  'umbraco-base-cms-spark': ['cms'],
  'bxm-smartx-platform': ['erp'],
  'afg-investment-platform': ['banking', 'cms'],
  'sar-saudi-railway': ['cms'],
  'shahzad-oil-store': ['personal'],
  homecare: ['homecare', 'medical'],
  'brass-erp': ['erp'],
  'shifili-multihead-production-system': ['erp'],
  'dynamics-365-business-platform': ['erp'],
  'veterinary-erp': ['medical'],
  'ifp-legal-operations-platform': ['legal'],
  'pti-feed-management-system': ['erp'],
  'neogen-enterprise-product-portfolio': ['biotech'],
}

export function getProjectSubjects(slug: string, categories: string[] = []): Exclude<ProjectSubjectId, 'all'>[] {
  const mapped = PROJECT_SUBJECTS[slug]
  if (mapped?.length) return mapped

  const fallback: Exclude<ProjectSubjectId, 'all'>[] = []
  const cats = categories.map((c) => c.toLowerCase())
  if (cats.some((c) => /bank|finance|islamic|investment|cma/.test(c))) fallback.push('banking')
  if (cats.some((c) => /ai|llm|rag|agent|openai|python/.test(c))) fallback.push('ai')
  if (cats.some((c) => /health|medical|clinic|oncology|veterinary|biotech/.test(c))) fallback.push('medical')
  if (cats.some((c) => /erp|manufactur|inventory|shopify|textile|dynamics/.test(c))) fallback.push('erp')
  if (cats.some((c) => /cms|umbraco/.test(c))) fallback.push('cms')
  if (cats.some((c) => /legal/.test(c))) fallback.push('legal')
  if (cats.some((c) => /personal|saas|subscription/.test(c))) fallback.push('personal')
  return fallback.length ? fallback : ['cms']
}

export function projectMatchesSubject(
  slug: string,
  categories: string[],
  subject: ProjectSubjectId,
): boolean {
  if (subject === 'all') return true
  return getProjectSubjects(slug, categories).includes(subject)
}
