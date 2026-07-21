import { useLenis } from '@/hooks/useLenis'
import { usePortfolio } from '@/hooks/usePortfolio'
import type { ReactNode } from 'react'

export function SmoothScroll({ children }: { children?: ReactNode }) {
  const { settings } = usePortfolio()
  useLenis(settings.enableAnimations)
  return children ?? null
}
