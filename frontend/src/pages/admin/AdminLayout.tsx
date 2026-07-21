import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Award,
  Briefcase,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Settings,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/cn'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/certificates', label: 'Certificates', icon: Award },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="admin-shell flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950/80 p-5 lg:block">
        <p className="font-display text-lg font-semibold text-white">Portfolio Admin</p>
        <p className="mt-1 text-xs text-slate-500">Signed in as {username}</p>
        <nav className="mt-8 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white',
                  isActive && 'bg-cyan-400/10 text-cyan-300',
                )
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/admin/login')
          }}
          className="mt-8 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-rose-300"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/80">Admin</p>
            <p className="font-display text-lg text-white lg:hidden">Portfolio CMS</p>
          </div>
          <div className="flex gap-2 overflow-x-auto lg:hidden">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs text-slate-400',
                    isActive && 'bg-cyan-400/10 text-cyan-300',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
