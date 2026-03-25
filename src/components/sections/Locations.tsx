'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { useSafeReducedMotion } from '@/lib/useSafeReducedMotion'

// ─────────────────────────────────────────────
// Locations data
// ─────────────────────────────────────────────

const locations = [
  {
    id: 'pedreiras',
    name: 'Pedreiras',
    label: 'Unidade Principal',
    address: 'Av. Rio Branco, 838A',
    neighborhood: 'Centro',
    city: 'Pedreiras – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Av.+Rio+Branco,+838A,+Centro,+Pedreiras,+MA',
    accent: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    id: 'igarape-grande',
    name: 'Igarapé Grande',
    label: 'Unidade',
    address: 'Av. João Carvalho, 67',
    neighborhood: 'Centro',
    city: 'Igarapé Grande – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Av.+João+Carvalho,+67,+Centro,+Igarapé+Grande,+MA',
    accent: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  {
    id: 'pocao-de-pedra',
    name: 'Poção de Pedra',
    label: 'Unidade',
    address: 'Av. Manoel Máximo, 48',
    neighborhood: 'Centro',
    city: 'Poção de Pedra – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Av.+Manoel+Máximo,+48,+Centro,+Poção+de+Pedra,+MA',
    accent: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'joselandia',
    name: 'Joselândia',
    label: 'Unidade',
    address: 'Rua Dr. José Falcão',
    neighborhood: 'Centro',
    city: 'Joselândia – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Rua+Dr.+José+Falcão,+Centro,+Joselândia,+MA',
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
] as const

// ─────────────────────────────────────────────
// Radar background
// ─────────────────────────────────────────────

function RadarBackground({ reduced }: { reduced: boolean }) {
  if (reduced) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          top: '-25%', left: '-15%',
          background: 'radial-gradient(circle, rgba(27,99,163,0.07) 0%, transparent 65%)',
          filter: 'blur(70px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          bottom: '-20%', right: '-12%',
          background: 'radial-gradient(circle, rgba(36,114,182,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
          mixBlendMode: 'multiply',
        }}
        animate={{ x: [0, -45, 0], y: [0, -35, 0], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
          style={{ width: `${(i + 1) * 160}px`, height: `${(i + 1) * 160}px` }}
          animate={{ opacity: [0.06, 0.02, 0.06], scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
        animate={{ width: ['0px', '700px'], height: ['0px', '700px'], opacity: [0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', repeatDelay: 3 }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.022,
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// Location card — rises from below
// ─────────────────────────────────────────────

// Direção de entrada por card: esquerda, baixo, baixo, direita
const enterFromMap = [
  { x: -60, y: 0 },
  { x: 0,   y: 60 },
  { x: 0,   y: 60 },
  { x: 60,  y: 0  },
]

interface LocationCardProps {
  location: typeof locations[number]
  index: number
  reduced: boolean
}

function LocationCard({ location, index, reduced }: LocationCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })
  const enterFrom = enterFromMap[index] ?? { x: 0, y: 50 }

  return (
    <div ref={ref}>
    <motion.div
      initial={{ opacity: 0, x: enterFrom.x, y: enterFrom.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: enterFrom.x, y: enterFrom.y }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'bg-white rounded-2xl p-6',
        'border border-border/60 shadow-card',
        'flex flex-col gap-5',
        'hover:shadow-elevated hover:-translate-y-1 transition-all duration-300'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={cn(
          'flex h-10 w-10 items-center justify-center rounded-xl border shrink-0',
          location.accent
        )}>
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-[#0a1628] leading-tight">
            {location.name}
          </h3>
          <span className="font-body text-xs text-muted">{location.label}</span>
        </div>
      </div>

      {/* Address info */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-2.5">
          <MapPin className="h-4 w-4 text-muted mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-body text-sm text-text font-medium">{location.address}</p>
            <p className="font-body text-xs text-muted mt-0.5">
              {location.neighborhood} · {location.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 text-muted shrink-0" aria-hidden="true" />
          <a
            href={`tel:${location.phone.replace(/\D/g, '')}`}
            className="font-body text-sm text-text hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            {location.phone}
          </a>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock className="h-4 w-4 text-muted mt-0.5 shrink-0" aria-hidden="true" />
          <p className="font-body text-xs text-muted leading-relaxed">{location.hours}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1 border-t border-border/40">
        <a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg',
            'border border-border text-text font-body text-xs font-medium',
            'hover:bg-primary/5 hover:text-primary hover:border-primary/30',
            'transition-colors duration-200 cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
          )}
          aria-label={`Ver no mapa: ${location.name}`}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Ver no mapa
        </a>
        <a
          href={`https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
            `Olá! Gostaria de agendar uma consulta na unidade de ${location.name}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg',
            'bg-[#25D366] text-white font-body text-xs font-medium',
            'hover:bg-[#20b858] transition-colors duration-200 cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50'
          )}
          aria-label={`Agendar pelo WhatsApp na unidade ${location.name}`}
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Agendar
        </a>
      </div>
    </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function Locations() {
  const reduced = useSafeReducedMotion()
  const headerRef = React.useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: false, amount: 0.5 })

  return (
    <section
      className="relative py-16 md:py-24 bg-white overflow-hidden"
      aria-labelledby="locations-heading"
    >
      <RadarBackground reduced={reduced} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          initial={{ opacity: 0, x: -40 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-body font-semibold mb-2">
              Nossas Unidades
            </p>
            <h2
              id="locations-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight"
            >
              Escolha a unidade<br className="hidden sm:block" /> mais próxima de você
            </h2>
          </div>
          <p className="font-body text-sm text-muted max-w-xs sm:text-right leading-relaxed">
            4 unidades no interior do Maranhão para facilitar o seu atendimento
          </p>
        </motion.div>

        {/* All 4 locations — always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              index={index}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
