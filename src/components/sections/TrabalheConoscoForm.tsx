'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mail, MapPin, Send, Paperclip, Info } from 'lucide-react'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const units = [
  {
    id: 'pedreiras',
    name: 'Pedreiras',
    email: 'pedreiras@clinicaleaoxiii.com.br',
  },
  {
    id: 'igarape-grande',
    name: 'Igarapé Grande',
    email: 'igarape@clinicaleaoxiii.com.br',
  },
  {
    id: 'pocao-de-pedra',
    name: 'Poção de Pedra',
    email: 'pocao@clinicaleaoxiii.com.br',
  },
  {
    id: 'joselandia',
    name: 'Joselândia',
    email: 'joselandia@clinicaleaoxiii.com.br',
  },
] as const

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function TrabalheConoscoForm() {
  const [fileName, setFileName] = React.useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 font-body">
                Formulário
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1628] mb-2">
                Envie seu currículo
              </h2>
              <p className="font-body text-muted text-base leading-relaxed">
                Preencha o formulário abaixo e entraremos em contato caso
                surja uma oportunidade adequada ao seu perfil.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Formulário de envio de currículo"
              noValidate
            >
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="tc-name" required>
                  Nome completo
                </Label>
                <Input
                  id="tc-name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tc-phone" required>
                    Telefone / WhatsApp
                  </Label>
                  <Input
                    id="tc-phone"
                    name="phone"
                    type="tel"
                    placeholder="(99) 9 0000-0000"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tc-email" required>
                    E-mail
                  </Label>
                  <Input
                    id="tc-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Specialty */}
              <div className="space-y-1.5">
                <Label htmlFor="tc-specialty" required>
                  Especialidade / Área de atuação
                </Label>
                <Input
                  id="tc-specialty"
                  name="specialty"
                  type="text"
                  placeholder="Ex: Enfermagem, Medicina, Recepção, TI…"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="tc-message">Mensagem (opcional)</Label>
                <Textarea
                  id="tc-message"
                  name="message"
                  placeholder="Fale um pouco sobre você, sua experiência ou disponibilidade…"
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* File upload */}
              <div className="space-y-1.5">
                <Label htmlFor="tc-cv" required>
                  Currículo (PDF ou Word)
                </Label>
                <label
                  htmlFor="tc-cv"
                  className={cn(
                    'flex items-center gap-3 h-11 w-full rounded-lg border border-border bg-surface px-4',
                    'text-sm font-body cursor-pointer',
                    'hover:border-primary/50 hover:bg-primary/5',
                    'transition-all duration-200',
                    'focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary'
                  )}
                >
                  <Paperclip
                    className="h-4 w-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <span className={cn(fileName ? 'text-text' : 'text-muted')}>
                    {fileName ?? 'Selecionar arquivo…'}
                  </span>
                  <input
                    id="tc-cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                <p className="font-body text-xs text-muted">
                  Formatos aceitos: .pdf, .doc, .docx — máximo 5 MB
                </p>
              </div>

              {/* LGPD notice */}
              <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/15 p-4">
                <Info
                  className="h-4 w-4 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="font-body text-xs text-muted leading-relaxed">
                  <strong className="text-text font-medium">
                    Aviso LGPD —{' '}
                  </strong>
                  Ao preencher os dados o usuário concorda com o tratamento de
                  seus dados pessoais para finalidade específica, em
                  conformidade com a{' '}
                  <strong className="text-text font-medium">
                    Lei nº 13.709 (Lei Geral de Proteção de Dados Pessoais)
                  </strong>
                  .
                </p>
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" className="w-full sm:w-auto gap-2">
                <Send className="h-4 w-4" aria-hidden="true" />
                Enviar currículo
              </Button>
            </form>
          </div>

          {/* ── Contact info sidebar ── */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 font-body">
                Contato direto
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a1628] mb-2">
                Fale com nossas unidades
              </h2>
              <p className="font-body text-muted text-base leading-relaxed">
                Prefere enviar diretamente para uma unidade específica? Use os
                e-mails abaixo.
              </p>
            </div>

            {/* General email */}
            <a
              href="mailto:contato@clinicaleaoxiii.com.br"
              className={cn(
                'flex items-center gap-4 p-5 rounded-2xl mb-4',
                'bg-primary text-white',
                'hover:bg-primary/90 transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 shrink-0">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-sm font-bold leading-none mb-1">
                  E-mail geral
                </p>
                <p className="font-body text-sm text-white/80 truncate">
                  contato@clinicaleaoxiii.com.br
                </p>
              </div>
            </a>

            {/* Unit cards */}
            <div className="space-y-3">
              {units.map((unit) => (
                <a
                  key={unit.id}
                  href={`mailto:${unit.email}`}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-2xl',
                    'bg-white border border-border/60 shadow-sm',
                    'hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <MapPin
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-bold text-[#0a1628] leading-none mb-1">
                      {unit.name}
                    </p>
                    <p className="font-body text-xs text-muted truncate">
                      {unit.email}
                    </p>
                  </div>
                  <Mail
                    className="h-4 w-4 text-muted ml-auto shrink-0"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
