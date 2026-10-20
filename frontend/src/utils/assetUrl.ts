/** Prefix site-relative paths with Vite `BASE_URL` (needed for GitHub Pages subpath). */
export function assetUrl(path?: string | null): string {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/i.test(path)) return path

  const base = import.meta.env.BASE_URL || '/'
  const cleaned = path.replace(/^\/+/, '')
  if (base === '/') return `/${cleaned}`
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${cleaned}`
}

export function withPortfolioAssetBase<T extends {
  profile: { avatar: string; heroImage: string }
  resume: { url: string }
  seo?: { ogImage?: string }
}>(data: T): T {
  return {
    ...data,
    profile: {
      ...data.profile,
      avatar: assetUrl(data.profile.avatar),
      heroImage: assetUrl(data.profile.heroImage),
    },
    resume: {
      ...data.resume,
      url: assetUrl(data.resume.url),
    },
    seo: data.seo
      ? {
          ...data.seo,
          ogImage: data.seo.ogImage ? assetUrl(data.seo.ogImage) : data.seo.ogImage,
        }
      : data.seo,
  }
}
