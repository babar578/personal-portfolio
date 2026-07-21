import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  strong?: boolean
  hover?: boolean
}

export function GlassPanel({ className, strong, hover = true, children, ...props }: GlassPanelProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.25 }}
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-2xl p-6',
        hover && 'transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--accent)_28%,transparent)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
