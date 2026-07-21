import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-[var(--text-muted)]">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link to="/" className="mt-8">
        <Button>Back home</Button>
      </Link>
    </main>
  )
}
