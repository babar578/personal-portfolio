import type {
  BlogPost,
  Certificate,
  ContactMessage,
  Experience,
  LoginRequest,
  LoginResponse,
  PortfolioData,
  Project,
  Service,
  SiteSettings,
  SkillCategory,
  Testimonial,
} from '@/types'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

function getToken() {
  return localStorage.getItem('portfolio_token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    let message = res.statusText
    try {
      const body = (await res.json()) as { message?: string }
      if (body.message) message = body.message
    } catch {
      /* ignore */
    }
    throw new ApiError(message || 'Request failed', res.status)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const api = {
  getPortfolio: () => request<PortfolioData>('/portfolio'),
  updatePortfolio: (data: PortfolioData) =>
    request<PortfolioData>('/portfolio', { method: 'PUT', body: JSON.stringify(data) }),

  getProjects: (category?: string) =>
    request<Project[]>(`/projects${category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : ''}`),
  getProject: (idOrSlug: string) => request<Project>(`/projects/${idOrSlug}`),
  createProject: (data: Project) =>
    request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: string, data: Project) =>
    request<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: string) => request<void>(`/projects/${id}`, { method: 'DELETE' }),

  getSkills: () => request<SkillCategory[]>('/skills'),
  updateSkills: (data: SkillCategory[]) =>
    request<SkillCategory[]>('/skills', { method: 'PUT', body: JSON.stringify(data) }),

  getExperience: () => request<Experience[]>('/experience'),
  createExperience: (data: Experience) =>
    request<Experience>('/experience', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id: string, data: Experience) =>
    request<Experience>(`/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id: string) => request<void>(`/experience/${id}`, { method: 'DELETE' }),
  replaceExperience: (data: Experience[]) =>
    request<Experience[]>('/experience', { method: 'PUT', body: JSON.stringify(data) }),

  getCertificates: () => request<Certificate[]>('/certificates'),
  createCertificate: (data: Certificate) =>
    request<Certificate>('/certificates', { method: 'POST', body: JSON.stringify(data) }),
  updateCertificate: (id: string, data: Certificate) =>
    request<Certificate>(`/certificates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCertificate: (id: string) => request<void>(`/certificates/${id}`, { method: 'DELETE' }),

  getBlogs: (params?: { search?: string; category?: string; tag?: string }) => {
    const q = new URLSearchParams()
    if (params?.search) q.set('search', params.search)
    if (params?.category) q.set('category', params.category)
    if (params?.tag) q.set('tag', params.tag)
    const qs = q.toString()
    return request<BlogPost[]>(`/blogs${qs ? `?${qs}` : ''}`)
  },
  getAllBlogsAdmin: () => request<BlogPost[]>('/blogs/all'),
  getBlog: (slug: string) => request<BlogPost>(`/blogs/${slug}`),
  createBlog: (data: BlogPost) =>
    request<BlogPost>('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: string, data: BlogPost) =>
    request<BlogPost>(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: string) => request<void>(`/blogs/${id}`, { method: 'DELETE' }),

  getTestimonials: () => request<Testimonial[]>('/testimonials'),
  createTestimonial: (data: Testimonial) =>
    request<Testimonial>('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: string, data: Testimonial) =>
    request<Testimonial>(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: string) => request<void>(`/testimonials/${id}`, { method: 'DELETE' }),

  getServices: () => request<Service[]>('/services'),
  updateServices: (data: Service[]) =>
    request<Service[]>('/services', { method: 'PUT', body: JSON.stringify(data) }),

  getSettings: () => request<SiteSettings>('/settings'),
  getAdminSettings: () => request<SiteSettings>('/settings/admin'),
  updateSettings: (data: SiteSettings) =>
    request<{ message: string }>('/settings', { method: 'PUT', body: JSON.stringify(data) }),

  login: (data: LoginRequest) =>
    request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request<{ username: string; role: string }>('/auth/me'),

  contact: (data: ContactMessage) =>
    request<{ message: string }>('/contact', { method: 'POST', body: JSON.stringify(data) }),

  upload: async (file: File, folder = 'general') => {
    const form = new FormData()
    form.append('file', file)
    return request<{ url: string; fileName: string }>(`/upload?folder=${encodeURIComponent(folder)}`, {
      method: 'POST',
      body: form,
    })
  },
}
