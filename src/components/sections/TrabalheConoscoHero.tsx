'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

// Foto real da fachada da Clínica Leão XIII (inauguração)
const BUILDING_PHOTO = 'https://clinicaleaoxiii.com.br/wp-content/uploads/2021/09/IMG_9456.jpg'

export function TrabalheConoscoHero() {
  return (
    <div className="relative overflow-hidden py-24 md:py-36 min-h-[420px] flex items-center">
      {/* ── Foto real da fachada como background ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={BUILDING_PHOTO}
          alt="Fachada da Clínica Leão XIII"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Overlay escuro forte para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#013A6E]/70 to-[#0a1628]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/60 via-transparent to-[#0a1628]/30" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,22,40,0.6)_100%)]" />
      </div>

      {/* ── Cruz decorativa sutil ── */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <pattern id="tc-cross" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect x="20" y="8" width="8" height="32" rx="2" fill="white" />
              <rect x="8" y="20" width="32" height="8" rx="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tc-cross)" />
        </svg>
      </div>

      {/* ── Conteúdo ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="mb-5 px-4 py-1.5 bg-white/15 text-white border-white/20 text-sm backdrop-blur-sm">
            Junte-se a nós
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
        >
          Trabalhe Conosco
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg text-white/80 leading-relaxed max-w-xl mx-auto"
        >
          Faça parte do nosso banco de talentos e contribua com a saúde de
          milhares de pessoas no interior do Maranhão.
        </motion.p>

        {/* Subtle stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '4', label: 'Unidades' },
            { value: '20+', label: 'Anos no mercado' },
            { value: '18+', label: 'Especialidades' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-0.5">
              <span className="font-heading text-2xl font-bold text-[#7ab8e8] leading-none">
                {item.value}
              </span>
              <span className="font-body text-xs text-white/50 uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40L48 36.7C96 33.3 192 26.7 288 26.7C384 26.7 480 33.3 576 35C672 36.7 768 33.3 864 30C960 26.7 1056 23.3 1152 23.3C1248 23.3 1344 26.7 1392 28.3L1440 30V40H0Z"
            fill="#f4f8fc"
          />
        </svg>
      </div>
    </div>
  )
}
