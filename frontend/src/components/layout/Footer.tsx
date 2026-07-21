import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { usePortfolio } from '@/hooks/usePortfolio'

export function Footer() {
  const { portfolio } = usePortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold">
            {portfolio.profile.fullName}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
            {portfolio.profile.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[var(--text-muted)]">
            <Link to="/projects" className="hover:text-[var(--text)]">Projects</Link>
            <Link to="/experience" className="hover:text-[var(--text)]">Experience</Link>
            <Link to="/blog" className="hover:text-[var(--text)]">Blog</Link>
            <Link to="/contact" className="hover:text-[var(--text)]">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Connect</p>
          <div className="mt-4 flex gap-3">
            {portfolio.social.linkedIn ? (
              <a
                href={portfolio.social.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
            ) : null}
            {portfolio.social.gitHub ? (
              <a
                href={portfolio.social.gitHub}
                target="_blank"
                rel="noreferrer"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
            ) : null}
            <a
              href={`mailto:${portfolio.profile.email}`}
              className="glass flex h-10 w-10 items-center justify-center rounded-xl"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-5 text-center text-xs text-[var(--text-muted)] md:px-6">
        © {year} {portfolio.profile.fullName}. Built with React, Vite & ASP.NET Core.
      </div>
    </footer>
  )
}
