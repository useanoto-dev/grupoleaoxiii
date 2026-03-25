'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

// ─────────────────────────────────────────────
// Medical cross pattern (SVG)
// ─────────────────────────────────────────────

function MedicalCrossPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="cta-cross-pattern"
          x="0"
          y="0"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect x="20" y="8" width="8" height="32" rx="2" fill="white" />
          <rect x="8" y="20" width="32" height="8" rx="2" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-cross-pattern)" />
    </svg>
  )
}

export function CtaBanner() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      className="py-16 md:py-20"
      aria-label="Agende sua consulta"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063E84] via-primary to-secondary px-8 py-14 md:px-16 md:py-16"
        >
          <MedicalCrossPattern />

          {/* Blobs */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-6 lg:flex-row lg:text-left lg:justify-between">
            {/* Text */}
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                Pronto para cuidar da sua saúde?
              </h2>
              <p className="font-body text-base text-white/80 leading-relaxed">
                Agende sua consulta agora. Atendimento humanizado em 4 unidades
                no Maranhão, com ou sem convênio.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://biodataweb.net/leao302/recursosCliente/agendaPaciente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-primary px-7 text-sm font-semibold font-body hover:bg-white/90 shadow-floating transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
              >
                Agendar Consulta
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={`https://wa.me/5599981905654?text=${encodeURIComponent(
                  'Olá! Gostaria de agendar uma consulta.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 text-sm font-semibold font-body text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
                aria-label="Agendar pelo WhatsApp"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                WhatsApp
              </a>

              <a
                href="tel:+559936427578"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 text-sm font-semibold font-body text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
                aria-label="Ligar para a clínica"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ligar
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CtaBanner
