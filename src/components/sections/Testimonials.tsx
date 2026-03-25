'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const testimonials = [
  { id: '1', patientName: 'Maria das Graças S.', text: 'Atendimento excelente! Os médicos são muito atenciosos e o ambiente é muito limpo e organizado. Me senti muito bem cuidada.', rating: 5, specialty: 'Clínica Geral' },
  { id: '2', patientName: 'João Pedro M.', text: 'Realizei vários exames laboratoriais e os resultados ficaram prontos online no mesmo dia. Muito prático e eficiente!', rating: 5, specialty: 'Laboratório' },
  { id: '3', patientName: 'Ana Beatriz C.', text: 'Minha filha faz acompanhamento pediátrico aqui há dois anos. A doutora é incrível, muito carinhosa e competente.', rating: 5, specialty: 'Pediatria' },
  { id: '4', patientName: 'Roberto L.', text: 'Agendei minha consulta pelo WhatsApp em menos de 5 minutos. No dia, não precisei esperar muito. Recomendo demais!', rating: 5, specialty: 'Cardiologia' },
  { id: '5', patientName: 'Francisca O.', text: 'Sempre fui bem atendida em todas as visitas. A equipe de enfermagem é muito prestativa e gentil com os pacientes.', rating: 5, specialty: 'Ginecologia' },
  { id: '6', patientName: 'Antônio R.', text: 'Excelente clínica! Equipamentos modernos, profissionais qualificados e atendimento humanizado. Vale cada visita.', rating: 5, specialty: 'Ortopedia' },
] as const

// ─────────────────────────────────────────────
// Aurora background
// screen blend mode = glow real em fundo escuro
// ─────────────────────────────────────────────

function AuroraBackground({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
    </div>
  )
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn('h-4 w-4', i < rating ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10')} aria-hidden="true" />
      ))}
    </div>
  )
}

function BigQuote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M0 60V36.923C0 25.897 2.051 17.077 6.154 10.462 10.256 3.487 16.923 0 26.154 0L30 7.385C24.103 8.615 19.744 11.41 16.923 15.769 14.103 20.128 12.692 25.026 12.692 30.462H26.154V60H0ZM50 60V36.923C50 25.897 52.051 17.077 56.154 10.462 60.256 3.487 66.923 0 76.154 0L80 7.385C74.103 8.615 69.744 11.41 66.923 15.769 64.103 20.128 62.692 25.026 62.692 30.462H76.154V60H50Z" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────

interface CardProps {
  testimonial: typeof testimonials[number]
}

function TestimonialCard({ testimonial }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white/[0.05] border border-white/10 rounded-2xl p-6',
        'hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300',
        'flex flex-col gap-4 backdrop-blur-sm h-full'
      )}
    >
      <StarRating rating={testimonial.rating} />
      <p className="font-body text-white/80 text-sm md:text-base leading-relaxed italic flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/30 text-white font-heading font-bold text-sm shrink-0">
          {testimonial.patientName.charAt(0)}
        </div>
        <div className="min-w-0">
          <span className="text-white font-semibold text-sm block leading-tight">{testimonial.patientName}</span>
          {testimonial.specialty && <span className="text-white/40 text-xs">· {testimonial.specialty}</span>}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Static grid (reduced-motion fallback)
// ─────────────────────────────────────────────

function StaticGrid({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t, index) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 70 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <TestimonialCard testimonial={t} />
        </motion.div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// Progress bar
// ─────────────────────────────────────────────

const AUTOPLAY_INTERVAL = 4000

function ProgressBar({ running }: { running: boolean }) {
  const [animKey, setAnimKey] = React.useState(0)

  React.useEffect(() => {
    if (running) setAnimKey((k) => k + 1)
  }, [running])

  return (
    <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden mb-4" aria-hidden="true">
      {running && (
        <div
          key={animKey}
          className="h-full bg-[#7ab8e8] rounded-full"
          style={{ animation: `testimonial-progress ${AUTOPLAY_INTERVAL}ms linear forwards` }}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Carousel
// ─────────────────────────────────────────────

function EmblaCarousel({ isInView }: { isInView: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  // Autoplay state
  const [paused, setPaused] = React.useState(false)
  const [progressRunning, setProgressRunning] = React.useState(false)
  const autoplayTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const resumeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Sync Embla state ──
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  // ── Autoplay ──
  const scheduleNext = React.useCallback(() => {
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current)
    autoplayTimerRef.current = setTimeout(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, AUTOPLAY_INTERVAL)
  }, [emblaApi])

  // Start / stop progress bar in sync with autoplay
  React.useEffect(() => {
    if (!emblaApi) return

    const restart = () => {
      setProgressRunning(false)
      // Micro-tick so the bar resets before restarting
      requestAnimationFrame(() => setProgressRunning(true))
      scheduleNext()
    }

    if (!paused) {
      restart()
      emblaApi.on('select', restart)
    } else {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current)
      setProgressRunning(false)
    }

    return () => {
      emblaApi.off('select', restart)
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current)
    }
  }, [emblaApi, paused, scheduleNext])

  // ── Pause / resume helpers ──
  const pauseAutoplay = React.useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    setPaused(true)
  }, [])

  const resumeAfterDelay = React.useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => setPaused(false), 6000)
  }, [])

  // ── Nav handlers ──
  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev()
    pauseAutoplay()
    resumeAfterDelay()
  }, [emblaApi, pauseAutoplay, resumeAfterDelay])

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext()
    pauseAutoplay()
    resumeAfterDelay()
  }, [emblaApi, pauseAutoplay, resumeAfterDelay])

  const scrollTo = React.useCallback((index: number) => {
    emblaApi?.scrollTo(index)
    pauseAutoplay()
    resumeAfterDelay()
  }, [emblaApi, pauseAutoplay, resumeAfterDelay])

  // ── Touch events (pause on touch, resume after 6s) ──
  const handleTouchStart = React.useCallback(() => {
    pauseAutoplay()
  }, [pauseAutoplay])

  const handleTouchEnd = React.useCallback(() => {
    resumeAfterDelay()
  }, [resumeAfterDelay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      <ProgressBar running={progressRunning} />

      {/* Embla viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Depoimentos de pacientes"
      >
        <div className="flex">
          {testimonials.map((t) => (
            <div
              key={t.id}
              // 1 slide on mobile, 2 on md, 3 on lg
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
              role="group"
              aria-roledescription="slide"
              aria-label={`Depoimento de ${t.patientName}`}
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <div className="flex items-center justify-between mt-6">
        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Ir para slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className="rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7ab8e8]"
              style={{
                width: index === selectedIndex ? 8 : 6,
                height: index === selectedIndex ? 8 : 6,
                backgroundColor: index === selectedIndex ? '#7ab8e8' : 'rgba(255,255,255,0.20)',
                transform: index === selectedIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Slide anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7ab8e8]"
          >
            <ChevronLeft className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Próximo slide"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7ab8e8]"
          >
            <ChevronRight className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Social proof bar
// ─────────────────────────────────────────────

const proofItems = [
  { value: '4.9/5', label: 'Avaliação média' },
  { value: '500+',  label: 'Avaliações' },
  { value: '10 anos', label: 'de confiança' },
] as const

function SocialProofBar({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center"
    >
      {proofItems.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1">
          <span className="text-white font-bold text-2xl font-heading leading-none">{item.value}</span>
          <span className="text-white/40 text-xs font-body">{item.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function Testimonials() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useSafeReducedMotion()

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#0a1628] overflow-hidden" aria-labelledby="testimonials-heading">
      <AuroraBackground reduced={reduced} />

      <BigQuote className="text-white/[0.06] absolute top-8 left-4 w-24 h-24 md:w-32 md:h-32 pointer-events-none select-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            className="text-white/40 text-xs tracking-[0.25em] uppercase font-body mb-3"
            initial={{ opacity: 0, y: -40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Depoimentos
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight max-w-2xl"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Quem cuida sabe. Quem veio, voltou.
          </motion.h2>
        </div>

        {reduced ? (
          <StaticGrid isInView={isInView} />
        ) : (
          <EmblaCarousel isInView={isInView} />
        )}

        <SocialProofBar isInView={isInView} />
      </div>
    </section>
  )
}

export default Testimonials
