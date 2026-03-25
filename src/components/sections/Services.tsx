'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import {
  Stethoscope,
  FlaskConical,
  Scan,
  CreditCard,
  Baby,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Service data
// ─────────────────────────────────────────────

const services = [
  {
    id: 'consultas',
    number: '01',
    title: 'Consultas Médicas',
    description: '15+ especialidades disponíveis com profissionais qualificados e atendimento humanizado.',
    icon: Stethoscope,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    iconStyle: { background: 'rgba(27,99,163,0.10)' },
    href: '/consultas-medicas',
  },
  {
    id: 'laboratorio',
    number: '02',
    title: 'Exames Laboratoriais',
    description: 'Resultados online em 24h. Coleta rápida e análise precisa no nosso laboratório.',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconStyle: { background: 'rgba(219,234,254,1)' },
    href: '/exames',
  },
  {
    id: 'imagem',
    number: '03',
    title: 'Exames de Imagem',
    description: 'Raio-X e ultrassonografia com equipamentos modernos e laudos digitais.',
    icon: Scan,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    iconStyle: { background: 'rgba(207,250,254,1)' },
    href: '/exames',
  },
  {
    id: 'convenios',
    number: '04',
    title: 'Convênios',
    description: 'Aceitamos os principais planos de saúde para facilitar o seu atendimento.',
    icon: CreditCard,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    iconStyle: { background: 'rgba(204,251,241,1)' },
    href: '/convenios',
  },
  {
    id: 'pediatria',
    number: '05',
    title: 'Pediatria',
    description: 'Especialistas em saúde infantil dedicados ao cuidado da sua criança.',
    icon: Baby,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconStyle: { background: 'rgba(243,232,255,1)' },
    href: '/consultas-medicas',
  },
  {
    id: 'urgencia',
    number: '06',
    title: 'Urgência e Emergência',
    description: 'Atendimento rápido quando você mais precisa. Equipe preparada para emergências.',
    icon: AlertCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    iconStyle: { background: 'rgba(254,226,226,1)' },
    href: '/contato',
  },
] as const

type Service = typeof services[number]

// ─────────────────────────────────────────────
// Animated background (preserved exactly)
// ─────────────────────────────────────────────

function AnimatedBg({ reduced }: { reduced: boolean }) {
  if (reduced) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* Blob 1 — top-left, primary blue, multiply */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          top: '-25%', left: '-15%',
          background: 'radial-gradient(circle, rgba(27,99,163,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ x: [0, 60, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 2 — bottom-right, cyan tint */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          bottom: '-20%', right: '-12%',
          background: 'radial-gradient(circle, rgba(36,114,182,0.07) 0%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
      />

      {/* Blob 3 — centre, whisper blue */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500,
          top: '30%', left: '35%',
          background: 'radial-gradient(circle, rgba(122,184,232,0.06) 0%, transparent 65%)',
          filter: 'blur(50px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ scale: [1, 1.3, 1], x: [-30, 30, -30] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
        <defs>
          <pattern id="svc-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#1B63A3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#svc-dots)" />
      </svg>

      {/* Grain overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.025,
        }}
      />

      {/* Horizontal accent lines */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          top: '28%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(27,99,163,0.12) 50%, transparent 100%)',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          top: '72%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(27,99,163,0.10) 50%, transparent 100%)',
        }}
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Vertical light beam that drifts across */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(27,99,163,0.10) 50%, transparent 100%)',
        }}
        animate={{ left: ['-2%', '102%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 12 }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// Mobile row — slides in from LEFT (original behaviour)
// ─────────────────────────────────────────────

interface ServiceRowProps {
  service: Service
  index: number
  isInView: boolean
  reduced: boolean
}

function ServiceRow({ service, index, isInView, reduced }: ServiceRowProps) {
  const Icon = service.icon

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -160 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={service.href}
        className={cn(
          'group flex items-center gap-6 py-6 border-b border-border/60',
          'hover:bg-primary/[0.02] -mx-4 px-4 rounded-lg',
          'transition-all duration-200 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
        )}
        aria-label={service.title}
      >
        {/* Number */}
        <span className="font-heading text-2xl font-bold text-border group-hover:text-primary/30 transition-colors w-8 shrink-0 tabular-nums">
          {service.number}
        </span>

        {/* Icon */}
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl shrink-0',
          service.iconBg
        )}>
          <Icon className={cn('h-6 w-6', service.iconColor)} aria-hidden="true" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-bold text-[#0a1628] group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="font-body text-sm text-muted leading-relaxed mt-1">
            {service.description}
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight
          className="h-5 w-5 text-primary ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 shrink-0"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Desktop right panel — active service detail
// ─────────────────────────────────────────────

interface ActivePanelProps {
  service: Service
  activeIndex: number
  total: number
}

function ActivePanel({ service, activeIndex, total }: ActivePanelProps) {
  const Icon = service.icon
  const progressPct = ((activeIndex + 1) / total) * 100

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col justify-between h-full px-12 py-14 overflow-hidden select-none"
      >
        {/* Large ghost number in background */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-bold pointer-events-none leading-none"
          style={{
            fontSize: '15vw',
            opacity: 0.05,
            color: '#1B63A3',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {service.number}
        </span>

        {/* Content area */}
        <div className="relative z-10 flex flex-col gap-8 flex-1 justify-center">
          {/* Icon circle */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-elevated"
            style={service.iconStyle}
          >
            <Icon className={cn('h-10 w-10', service.iconColor)} aria-hidden="true" />
          </div>

          {/* Number label */}
          <span className="font-body text-xs tracking-[0.25em] uppercase font-semibold text-muted">
            {service.number} / {String(total).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3 className="font-heading text-4xl font-bold text-[#0a1628] leading-tight max-w-sm">
            {service.title}
          </h3>

          {/* Description */}
          <p className="font-body text-base text-muted leading-relaxed max-w-md">
            {service.description}
          </p>

          {/* CTA link */}
          <Link
            href={service.href}
            className={cn(
              'inline-flex items-center gap-2 text-sm font-semibold text-primary',
              'group w-fit transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm'
            )}
          >
            Saiba mais
            <ArrowRight
              className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Progress bar at the base */}
        <div className="relative z-10 mt-10">
          {/* Dots */}
          <div className="flex gap-2 mb-3">
            {services.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-400"
                style={{
                  flex: i === activeIndex ? 2 : 1,
                  background: i === activeIndex ? '#1B63A3' : '#d0dde8',
                  transition: 'flex 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease',
                }}
              />
            ))}
          </div>
          {/* Bar track */}
          <div className="relative h-px bg-border/60 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: '#1B63A3' }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="font-body text-xs text-muted mt-2">
            {activeIndex + 1} de {total} serviços
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────
// Desktop scroll-pin timeline
// ─────────────────────────────────────────────

function DesktopTimeline({ reduced }: { reduced: boolean }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll 0→1 across services.length segments
  const activeIndexMv = useTransform(
    scrollYProgress,
    [0, 1],
    [0, services.length - 1]
  )

  useMotionValueEvent(activeIndexMv, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(services.length - 1, Math.round(latest)))
    setActiveIndex(clamped)
  })

  return (
    <div
      ref={containerRef}
      style={{ height: `${services.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: 'white' }}
      >
        <AnimatedBg reduced={reduced} />

        {/* Inner layout */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          {/* Section header */}
          <div className="pt-16 pb-8 flex items-end justify-between">
            <div>
              <p className="text-primary text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3">
                Nossos Serviços
              </p>
              <h2
                id="services-heading"
                className="font-heading text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight max-w-lg"
              >
                O que oferecemos para você
              </h2>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-1 pb-1">
              <p className="text-sm text-muted font-body">
                Agende pelo sistema online ou pelo WhatsApp
              </p>
              <Link
                href="/contato"
                className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all"
              >
                → Agendar
              </Link>
            </div>
          </div>

          {/* Two-column body */}
          <div className="flex flex-1 min-h-0 gap-0">
            {/* Left: service list (40%) */}
            <div className="w-[40%] flex flex-col justify-center gap-1 border-r border-border/40 pr-8 overflow-y-auto py-4">
              {services.map((service, index) => {
                const isActive = index === activeIndex
                const Icon = service.icon

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      // Jump scroll position to bring this item active
                      if (!containerRef.current) return
                      const rect = containerRef.current.getBoundingClientRect()
                      const containerTop = window.scrollY + rect.top
                      const segmentH = (services.length * window.innerHeight) / services.length
                      const targetY = containerTop + segmentH * index
                      window.scrollTo({ top: targetY, behavior: 'smooth' })
                    }}
                    aria-label={`Ver serviço: ${service.title}`}
                    className={cn(
                      'group flex items-center gap-4 py-4 px-3 rounded-xl text-left',
                      'border-l-4 transition-all duration-300 cursor-pointer',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                      isActive
                        ? 'border-primary bg-primary/[0.04]'
                        : 'border-transparent hover:border-border hover:bg-primary/[0.02]'
                    )}
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  >
                    {/* Number */}
                    <span
                      className={cn(
                        'font-heading text-xl font-bold tabular-nums w-8 shrink-0 transition-colors duration-300',
                        isActive ? 'text-primary' : 'text-border'
                      )}
                    >
                      {service.number}
                    </span>

                    {/* Icon */}
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg shrink-0 transition-all duration-300',
                        isActive ? service.iconBg : 'bg-border/30'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 transition-colors duration-300',
                          isActive ? service.iconColor : 'text-muted'
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'font-heading text-sm font-bold transition-colors duration-300 leading-snug',
                          isActive ? 'text-primary' : 'text-[#0a1628]'
                        )}
                      >
                        {service.title}
                      </p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="font-body text-xs text-muted mt-0.5 leading-relaxed line-clamp-2"
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </div>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="active-dot"
                        className="h-2 w-2 rounded-full bg-primary shrink-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right: active service detail (60%) */}
            <div className="w-[60%] relative">
              <ActivePanel
                service={services[activeIndex]}
                activeIndex={activeIndex}
                total={services.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Section — root export
// ─────────────────────────────────────────────

export function Services() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useSafeReducedMotion()

  // Reduced motion OR mobile: render simple list
  // Desktop (lg+) AND no reduced motion: render sticky timeline
  // We use CSS to hide/show depending on breakpoint, but the sticky behaviour
  // requires JS-driven scroll tracking so we also need a client-side breakpoint check.
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Simple list layout (mobile / reduced motion)
  const simpleLayout = (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-white overflow-hidden"
      aria-labelledby="services-heading"
    >
      <AnimatedBg reduced={reduced} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-16">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-body font-semibold mb-3">
              Nossos Serviços
            </p>
            <h2
              id="services-heading"
              className="font-heading text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight max-w-lg"
            >
              O que oferecemos para você
            </h2>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col items-end gap-1 pb-1"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm text-muted font-body">
              Agende pelo sistema online ou pelo WhatsApp
            </p>
            <Link
              href="/contato"
              className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all"
            >
              → Agendar
            </Link>
          </motion.div>
        </div>

        {/* Services list */}
        <div>
          {services.map((service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )

  // Desktop sticky timeline
  const desktopLayout = (
    <section
      className="relative bg-white"
      aria-labelledby="services-heading"
    >
      <DesktopTimeline reduced={reduced} />
    </section>
  )

  // On the server (SSR), always render simple layout to avoid hydration mismatch.
  // On client, switch to desktop timeline when breakpoint is met and motion is allowed.
  if (reduced) return simpleLayout
  if (!isDesktop) return simpleLayout
  return desktopLayout
}

export default Services
