'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, ShieldCheck, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'leao13-cookie-consent'

type ConsentState = 'accepted' | 'declined' | null

function getStored(): ConsentState {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(STORAGE_KEY) as ConsentState) ?? null
}

export function CookieBanner() {
  const [consent, setConsent] = React.useState<ConsentState>(getStored)
  const [expanded, setExpanded] = React.useState(false)

  const save = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
  }

  // Já decidiu — não exibe
  if (consent !== null) return null

  return (
    <AnimatePresence>
      <motion.div
        key="cookie-banner"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        className="fixed bottom-4 left-4 right-4 z-[9990] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px]"
        role="dialog"
        aria-label="Aviso de cookies"
        aria-modal="false"
      >
        <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-border/60 overflow-hidden">

          {/* Linha de destaque no topo */}
          <div className="h-1 w-full bg-gradient-to-r from-[#1B63A3] to-[#2472B6]" />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <Cookie className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-[#0a1628] leading-tight">
                    Privacidade &amp; Cookies
                  </p>
                  <p className="font-body text-[11px] text-muted mt-0.5">
                    Conforme a LGPD (Lei 13.709/2018)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => save('declined')}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-border/60 hover:text-text transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Fechar e recusar cookies"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Texto principal */}
            <p className="font-body text-xs text-muted leading-relaxed mb-3">
              Usamos cookies essenciais para o funcionamento do site e cookies
              analíticos para entender como você o utiliza, sempre respeitando
              sua privacidade.
            </p>

            {/* Expandir detalhes */}
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-1 font-body text-xs text-primary font-medium mb-3 hover:underline underline-offset-2 focus:outline-none"
              aria-expanded={expanded}
            >
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
              {expanded ? 'Ocultar detalhes' : 'Ver detalhes'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#f4f8fc] rounded-xl p-3 mb-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-body text-xs font-semibold text-[#0a1628]">Cookies essenciais</p>
                        <p className="font-body text-[11px] text-muted mt-0.5">
                          Necessários para navegação, segurança e funcionamento básico. Sempre ativos.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Cookie className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                      <div>
                        <p className="font-body text-xs font-semibold text-[#0a1628]">Cookies analíticos</p>
                        <p className="font-body text-[11px] text-muted mt-0.5">
                          Nos ajudam a entender o uso do site de forma anônima para melhorar sua experiência.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ações */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => save('declined')}
                className={cn(
                  'flex-1 h-11 rounded-xl border border-border',
                  'font-body text-xs font-semibold text-muted',
                  'hover:bg-border/40 hover:text-text transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
                )}
              >
                Só essenciais
              </button>
              <button
                type="button"
                onClick={() => save('accepted')}
                className={cn(
                  'flex-1 h-11 rounded-xl',
                  'bg-primary text-white font-body text-xs font-semibold',
                  'hover:bg-[#155291] transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
                )}
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieBanner
