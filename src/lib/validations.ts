import { z } from 'zod'

// ─────────────────────────────────────────────
// Regex Patterns
// ─────────────────────────────────────────────

/**
 * Brazilian phone number regex.
 * Accepts formats: (99) 98765-4321, (99)987654321, 99987654321, 9987654321
 */
const BR_PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/

// ─────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────

export const appointmentSchema = z.object({
  patientName: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(120, 'O nome deve ter no máximo 120 caracteres')
    .trim(),

  email: z
    .string()
    .email('Informe um e-mail válido')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(BR_PHONE_REGEX, 'Informe um telefone válido no formato brasileiro')
    .trim(),

  specialtyId: z
    .string()
    .min(1, 'Selecione uma especialidade'),

  locationId: z
    .string()
    .min(1, 'Selecione uma unidade'),

  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Informe a data no formato AAAA-MM-DD',
    ),

  timeSlot: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Informe um horário válido no formato HH:MM'),

  notes: z
    .string()
    .max(500, 'As observações devem ter no máximo 500 caracteres')
    .optional(),
})

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(120, 'O nome deve ter no máximo 120 caracteres')
    .trim(),

  email: z
    .string()
    .email('Informe um e-mail válido')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(BR_PHONE_REGEX, 'Informe um telefone válido no formato brasileiro')
    .trim()
    .optional()
    .or(z.literal('')),

  subject: z
    .string()
    .min(5, 'O assunto deve ter pelo menos 5 caracteres')
    .max(100, 'O assunto deve ter no máximo 100 caracteres')
    .trim(),

  message: z
    .string()
    .min(20, 'A mensagem deve ter pelo menos 20 caracteres')
    .max(1000, 'A mensagem deve ter no máximo 1000 caracteres')
    .trim(),
})

export const testimonialSchema = z.object({
  patientName: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(120, 'O nome deve ter no máximo 120 caracteres')
    .trim(),

  text: z
    .string()
    .min(20, 'O depoimento deve ter pelo menos 20 caracteres')
    .max(500, 'O depoimento deve ter no máximo 500 caracteres')
    .trim(),

  rating: z
    .number()
    .int('A avaliação deve ser um número inteiro')
    .min(1, 'A avaliação mínima é 1 estrela')
    .max(5, 'A avaliação máxima é 5 estrelas'),

  specialty: z
    .string()
    .max(80, 'A especialidade deve ter no máximo 80 caracteres')
    .trim()
    .optional(),
})

// ─────────────────────────────────────────────
// Exported Types
// ─────────────────────────────────────────────

export type AppointmentFormData = z.infer<typeof appointmentSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type TestimonialFormData = z.infer<typeof testimonialSchema>
