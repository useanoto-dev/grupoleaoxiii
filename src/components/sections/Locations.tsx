'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

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
// Location card — static, no per-card observer
// ─────────────────────────────────────────────

interface LocationCardProps {
  location: typeof locations[number]
  index: number
  isInView: boolean
}

function LocationCard({ location, index, isInView }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
            className="font-body text-sm text-text hover:text-primary transition-colors duration-200"
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
            'transition-colors duration-200',
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
            'hover:bg-[#20b858] transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50'
          )}
          aria-label={`Agendar pelo WhatsApp na unidade ${location.name}`}
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Agendar
        </a>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Section — single observer at section level
// ─────────────────────────────────────────────

export function Locations() {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  // once: true — anima apenas uma vez, nunca mais re-anima
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-white overflow-hidden"
      aria-labelledby="locations-heading"
    >
      {/* CSS-only background blobs — zero JS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="aurora-blob svc-blob-1" />
        <div className="aurora-blob svc-blob-2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
