export interface SeoPayload {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  author?: string
}

const DEFAULTS: Required<SeoPayload> = {
  title: 'Muhammad Babar Ali | Senior Full Stack .NET Engineer',
  description:
    'Senior Full Stack .NET Engineer with 7+ years building enterprise ERP, medical, supply chain, and cloud-ready systems.',
  keywords: 'Senior .NET Developer, ASP.NET Core, ERP Specialist, Full Stack Engineer, SQL Server, React',
  image: '/og-image.png',
  url: typeof window !== 'undefined' ? window.location.href : 'https://muhammadbabarali.dev',
  author: 'Muhammad Babar Ali',
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function applySeo(payload: SeoPayload = {}) {
  const seo = { ...DEFAULTS, ...payload }
  document.title = seo.title
  setMeta('name', 'description', seo.description)
  setMeta('name', 'keywords', seo.keywords)
  setMeta('name', 'author', seo.author)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:image', seo.image)
  setMeta('property', 'og:url', seo.url)
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setMeta('name', 'twitter:image', seo.image)
}

export function formatDate(value?: string | null, fallback = 'Present') {
  if (!value) return fallback
  const d = new Date(value.length === 7 ? `${value}-01` : value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
