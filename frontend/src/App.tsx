import { Suspense, lazy, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { PortfolioProvider } from '@/context/PortfolioContext'
import { ThemeProvider } from '@/context/ThemeContext'

const Home = lazy(() => import('@/pages/Home'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const ExperiencePage = lazy(() => import('@/pages/ExperiencePage'))
const SkillsPage = lazy(() => import('@/pages/SkillsPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const CertificatesPage = lazy(() => import('@/pages/CertificatesPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'))
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'))
const AdminExperience = lazy(() => import('@/pages/admin/AdminExperience'))
const AdminSkills = lazy(() => import('@/pages/admin/AdminSkills'))
const AdminBlogs = lazy(() => import('@/pages/admin/AdminBlogs'))
const AdminTestimonials = lazy(() => import('@/pages/admin/AdminTestimonials'))
const AdminCertificates = lazy(() => import('@/pages/admin/AdminCertificates'))
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'))

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-[var(--text-muted)]">
      Loading…
    </div>
  )
}

function PublicLayout() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
    </>
  )
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Loading />
  if (!isAuthenticated) return <Navigate to="/admin/login" replace state={{ from: location }} />
  return children
}

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <BrowserRouter basename={routerBasename}>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="experience" element={<ExperiencePage />} />
                  <Route path="skills" element={<SkillsPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="certificates" element={<CertificatesPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:slug" element={<BlogDetailPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="experience" element={<AdminExperience />} />
                  <Route path="skills" element={<AdminSkills />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="certificates" element={<AdminCertificates />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
