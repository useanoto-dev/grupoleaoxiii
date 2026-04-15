'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, MessageCircle, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const locations = [
  {
    id: 'pedreiras',
    name: 'Pedreiras',
    label: 'Unidade Principal',
    address: 'Av. Rio Branco, 838A – Centro',
    city: 'Pedreiras – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Av.+Rio+Branco,+838A,+Centro,+Pedreiras,+MA',
  },
  {
    id: 'igarape-grande',
    name: 'Igarapé Grande',
    label: 'Unidade',
    address: 'Av. João Carvalho, 67 – Centro',
    city: 'Igarapé Grande – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Av.+João+Carvalho,+67,+Centro,+Igarapé+Grande,+MA',
  },
  {
    id: 'pocao-de-pedra',
    name: 'Poção de Pedra',
    label: 'Unidade',
    address: 'Av. Manoel Máximo, 48 – Centro',
    city: 'Poção de Pedra – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Av.+Manoel+Máximo,+48,+Centro,+Poção+de+Pedra,+MA',
  },
  {
    id: 'joselandia',
    name: 'Joselândia',
    label: 'Unidade',
    address: 'Rua Dr. José Falcão – Centro',
    city: 'Joselândia – MA',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
    hours: 'Seg–Sex 07h–18h | Sáb 07h–12h',
    mapUrl: 'https://maps.google.com/?q=Rua+Dr.+José+Falcão,+Centro,+Joselândia,+MA',
  },
] as const

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Location card
// ─────────────────────────────────────────────

function LocationCard({ loc, index }: { loc: typeof locations[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'bg-white rounded-2xl p-6 border border-border/60 shadow-card',
        'hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300',
        'flex flex-col gap-4'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="font-heading text-base font-bold text-[#0a1628]">{loc.name}</p>
          <span className="text-xs text-muted font-body">{loc.label}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-body text-sm text-text">{loc.address}</p>
            <p className="font-body text-xs text-muted">{loc.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted shrink-0" aria-hidden="true" />
          <a
            href={`tel:${loc.phone.replace(/\D/g, '')}`}
            className="font-body text-sm text-text hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            {loc.phone}
          </a>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-muted mt-0.5 shrink-0" aria-hidden="true" />
          <p className="font-body text-xs text-muted">{loc.hours}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-border/40">
        <a
          href={`https://wa.me/${loc.whatsapp}?text=${encodeURIComponent(
            `Olá! Gostaria de agendar uma consulta na unidade de ${loc.name}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl',
            'bg-[#25D366] text-white font-body text-sm font-medium',
            'hover:bg-[#20b858] transition-colors duration-200 cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50'
          )}
          aria-label={`Agendar pelo WhatsApp em ${loc.name}`}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Agendar
        </a>
        <a
          href={loc.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl',
            'border border-border text-text font-body text-sm font-medium',
            'hover:bg-primary/5 hover:text-primary hover:border-primary/30',
            'transition-colors duration-200 cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
          )}
          aria-label={`Ver mapa de ${loc.name}`}
        >
          Ver no mapa
        </a>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────

export function ContactSection() {
  return (
    <section className="bg-background" aria-labelledby="contact-heading">
      {/* Hero banner — full width, no top gap so transparent header works */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-primary to-[#0a1628] pt-32 pb-20 md:pt-40 md:pb-28 mb-16">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern id="ct-cross" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <rect x="20" y="8" width="8" height="32" rx="2" fill="white" />
                <rect x="8" y="20" width="32" height="8" rx="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ct-cross)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-4 px-4 py-1.5 bg-white/15 text-white border-white/20 text-sm">
            Agendamento
          </Badge>
          <h1
            id="contact-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Agende sua consulta
          </h1>
          <p className="font-body text-lg text-white/75 leading-relaxed">
            Entre em contato com a unidade mais próxima de você ou fale com
            a gente pelo WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <a
            href={`https://wa.me/5599981905654?text=${encodeURIComponent('Olá! Gostaria de agendar uma consulta.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-4 p-5 rounded-2xl',
              'bg-[#25D366]/10 border border-[#25D366]/20 text-[#0a1628]',
              'hover:bg-[#25D366]/15 hover:border-[#25D366]/35',
              'transition-all duration-200 cursor-pointer group',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50'
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white shrink-0">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">WhatsApp</p>
              <p className="font-body text-xs text-muted">(99) 9 8190-5654</p>
            </div>
          </a>
          <a
            href="tel:+559936427578"
            className={cn(
              'flex items-center gap-4 p-5 rounded-2xl',
              'bg-primary/10 border border-primary/20 text-[#0a1628]',
              'hover:bg-primary/15 hover:border-primary/35',
              'transition-all duration-200 cursor-pointer group',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shrink-0">
              <Phone className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">Telefone</p>
              <p className="font-body text-xs text-muted">(99) 3642-7578</p>
            </div>
          </a>
          <div
            className={cn(
              'flex items-center gap-4 p-5 rounded-2xl',
              'bg-secondary/10 border border-secondary/20 text-[#0a1628]',
              'cursor-default'
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white shrink-0">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">Horário</p>
              <p className="font-body text-xs text-muted">Seg–Sex 07h–18h | Sáb 07h–12h</p>
            </div>
          </div>
        </div>

        {/* Location cards */}
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1628] mb-2">
            Escolha sua unidade
          </h2>
          <p className="font-body text-muted">Atendemos em 4 cidades no interior do Maranhão</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((loc, index) => (
            <LocationCard key={loc.id} loc={loc} index={index} />
          ))}
        </div>
      </div>
      <div className="pb-16 md:pb-24" />
    </section>
  )
}

export default ContactSection
