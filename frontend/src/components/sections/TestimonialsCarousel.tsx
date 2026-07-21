import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { usePortfolio } from '@/hooks/usePortfolio'

export function TestimonialsCarousel() {
  const { testimonials } = usePortfolio()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [testimonials.length])

  if (!testimonials.length) return null
  const item = testimonials[index]!

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by operators, engineers, and finance leaders."
        align="center"
      />

      <div className="relative mx-auto mt-12 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <GlassPanel hover={false} className="text-center">
              <div className="mb-4 flex justify-center gap-1 text-amber-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed text-[var(--text)] md:text-2xl">
                “{item.content}”
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img src={item.avatar} alt={item.name} className="h-12 w-12 rounded-full bg-slate-800" />
                <div className="text-left">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl"
            onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl"
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
