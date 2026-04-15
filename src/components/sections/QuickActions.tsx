'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { FlaskConical, Scan, Stethoscope, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const quickActions = [
  {
    id: 'laboratorio',
    number: '01',
    eyebrow: 'Análises Clínicas',
    title: 'Exames Laboratoriais',
    subtitle: 'Resultados online em 24h. Coleta rápida, análise precisa, laudo digital.',
    icon: FlaskConical,
    buttonLabel: 'Agendar Exame',
    href: 'https://biodataweb.net/leao302/recursosCliente/agendaPaciente',
    blobs: [
      { color: 'rgba(27,99,163,0.55)',  size: 360, x: '-10%', y: '-20%', dur: 14, delay: 0 },
      { color: 'rgba(6,62,132,0.40)',   size: 280, x: '55%',  y: '30%',  dur: 18, delay: 3 },
      { color: 'rgba(122,184,232,0.20)',size: 200, x: '20%',  y: '60%',  dur: 11, delay: 6 },
    ],
    accentHex: '#1B63A3',
    // direção de entrada no scroll
    enterFrom: { x: -80, y: 0 },
  },
  {
    id: 'imagem',
    number: '02',
    eyebrow: 'Diagnóstico por Imagem',
    title: 'Exames de Imagem',
    subtitle: 'Raio-X e ultrassonografia com equipamentos modernos e laudos digitais.',
    icon: Scan,
    buttonLabel: 'Agendar Exame',
    href: 'https://biodataweb.net/leao302/recursosCliente/agendaPaciente',
    blobs: [
      { color: 'rgba(8,145,178,0.50)',  size: 340, x: '50%',  y: '-15%', dur: 16, delay: 1 },
      { color: 'rgba(3,105,161,0.35)',  size: 260, x: '-5%',  y: '40%',  dur: 20, delay: 4 },
      { color: 'rgba(34,211,238,0.18)', size: 180, x: '30%',  y: '55%',  dur: 12, delay: 7 },
    ],
    accentHex: '#0891B2',
    enterFrom: { x: 0, y: 50 },
  },
  {
    id: 'especialidades',
    number: '03',
    eyebrow: 'Consultas Médicas',
    title: 'Todas as Especialidades',
    subtitle: '15+ especialidades com profissionais qualificados e atendimento humanizado.',
    icon: Stethoscope,
    buttonLabel: 'Agendar Consulta',
    href: 'https://biodataweb.net/leao302/recursosCliente/agendaPaciente',
    blobs: [
      { color: 'rgba(36,114,182,0.50)', size: 380, x: '30%',  y: '-25%', dur: 13, delay: 2 },
      { color: 'rgba(1,58,110,0.45)',   size: 300, x: '-8%',  y: '50%',  dur: 17, delay: 5 },
      { color: 'rgba(99,102,241,0.15)', size: 220, x: '60%',  y: '45%',  dur: 10, delay: 8 },
    ],
    accentHex: '#2472B6',
    enterFrom: { x: 80, y: 0 },
  },
] as const

type QuickAction = typeof quickActions[number]

// ─────────────────────────────────────────────
// Animated gradient background
// ─────────────────────────────────────────────

function CardBackground({
  blobs,
  patternId,
}: {
  blobs: QuickAction['blobs']
  reduced: boolean
  patternId: string
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 65%)`,
            filter: 'blur(45px)',
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────
// Card — animação própria por scroll, sobe e volta
// ─────────────────────────────────────────────

function ActionCard({ action, reduced }: { action: QuickAction; reduced: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  // once: false → anima toda vez que entra/sai do viewport
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const Icon = action.icon

  return (
    <div ref={ref}>
      <motion.a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${action.buttonLabel} — ${action.title}`}
        initial={{ opacity: 0, x: action.enterFrom.x, y: action.enterFrom.y }}
        animate={
          inView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: action.enterFrom.x, y: action.enterFrom.y }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'group relative overflow-hidden cursor-pointer',
          'rounded-3xl bg-[#0a1628]',
          'border border-white/10',
          'h-[340px] md:h-[380px]',
          'hover:border-white/20',
          'transition-[box-shadow,border-color] duration-500',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
          'block',
        )}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
        onMouseEnter={(e) => {
          if (reduced) return
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = `0 0 0 1px ${action.accentHex}40, 0 20px 60px ${action.accentHex}30, 0 4px 12px rgba(0,0,0,0.4)`
          el.style.transform = 'translateY(-6px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)'
          el.style.transform = ''
        }}
      >
        <CardBackground blobs={action.blobs} reduced={reduced} patternId={`dots-qa-${action.id}`} />

        <span
          className="absolute bottom-2 right-5 font-heading font-bold text-white select-none pointer-events-none"
          aria-hidden="true"
          style={{ fontSize: '8.5rem', lineHeight: 1, opacity: 0.055, letterSpacing: '-0.04em' }}
        >
          {action.number}
        </span>

        <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8">
          <div
            className={cn(
              'flex items-center justify-center rounded-2xl',
              'bg-white/10 backdrop-blur-sm border border-white/12',
              'group-hover:bg-white/18 transition-colors duration-300',
              'h-[52px] w-[52px]',
            )}
          >
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>

          <div>
            <p className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase text-white/40 mb-2">
              {action.eyebrow}
            </p>
            <h3 className="font-heading text-2xl md:text-[1.65rem] font-bold text-white leading-snug mb-2.5">
              {action.title}
            </h3>
            <p className="font-body text-sm text-white/55 leading-relaxed mb-6 max-w-[22ch]">
              {action.subtitle}
            </p>
            <span
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full',
                'bg-white/10 backdrop-blur-sm border border-white/15',
                'font-body text-sm font-semibold text-white',
                'group-hover:bg-primary group-hover:border-primary',
                'transition-all duration-300',
              )}
            >
              {action.buttonLabel}
              <ArrowRight
                className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${action.accentHex}, transparent)` }}
          aria-hidden="true"
        />
      </motion.a>
    </div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function QuickActions() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const reduced = useSafeReducedMotion()

  return (
    <section
      className="relative py-16 md:py-20 bg-white overflow-hidden"
      aria-labelledby="quick-actions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={headerRef}
          className="mb-10"
          initial={{ opacity: 0, x: -40 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary text-xs tracking-[0.25em] uppercase font-body font-semibold mb-2">
            Acesso Rápido
          </p>
          <h2
            id="quick-actions-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628]"
          >
            O que você precisa hoje?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {quickActions.map((action) => (
            <ActionCard key={action.id} action={action} reduced={reduced} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default QuickActions
