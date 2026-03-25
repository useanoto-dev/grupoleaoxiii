import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, handling conflicts correctly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to Brazilian Portuguese long format.
 * Example: "21 de março de 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Formats Brazilian phone numbers.
 * Handles 10-digit (landline) and 11-digit (mobile) numbers.
 * Input: "99981905654" → Output: "(99) 98190-5654"
 * Input: "9936427578"  → Output: "(99) 3642-7578"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.length === 11) {
    // Mobile: (XX) XXXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  } else if (digits.length === 10) {
    // Landline: (XX) XXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  // Return as-is if format is unrecognised
  return phone
}

/**
 * Converts a string to a URL-safe slug, handling Portuguese characters.
 * Example: "Clínica Leão XIII" → "clinica-leao-xiii"
 */
export function slugify(text: string): string {
  const map: Record<string, string> = {
    á: 'a', à: 'a', â: 'a', ã: 'a', ä: 'a',
    é: 'e', è: 'e', ê: 'e', ë: 'e',
    í: 'i', ì: 'i', î: 'i', ï: 'i',
    ó: 'o', ò: 'o', ô: 'o', õ: 'o', ö: 'o',
    ú: 'u', ù: 'u', û: 'u', ü: 'u',
    ç: 'c', ñ: 'n',
    Á: 'a', À: 'a', Â: 'a', Ã: 'a', Ä: 'a',
    É: 'e', È: 'e', Ê: 'e', Ë: 'e',
    Í: 'i', Ì: 'i', Î: 'i', Ï: 'i',
    Ó: 'o', Ò: 'o', Ô: 'o', Õ: 'o', Ö: 'o',
    Ú: 'u', Ù: 'u', Û: 'u', Ü: 'u',
    Ç: 'c', Ñ: 'n',
  }

  return text
    .split('')
    .map((char) => map[char] ?? char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Generates an array of time slot strings between startHour and endHour
 * at the given interval in minutes.
 * Example: generateTimeSlots(7, 18, 30) → ["07:00", "07:30", ..., "17:30"]
 */
export function generateTimeSlots(
  startHour = 7,
  endHour = 18,
  intervalMinutes = 30,
): string[] {
  const slots: string[] = []
  let currentMinutes = startHour * 60

  while (currentMinutes < endHour * 60) {
    const hours = Math.floor(currentMinutes / 60)
    const minutes = currentMinutes % 60
    slots.push(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
    )
    currentMinutes += intervalMinutes
  }

  return slots
}

// ─────────────────────────────────────────────
// Static Data Constants
// ─────────────────────────────────────────────

export const SPECIALTIES = [
  { id: 'clinico-geral', name: 'Clínico Geral', icon: 'Stethoscope' },
  { id: 'cardiologia', name: 'Cardiologia', icon: 'Heart' },
  { id: 'dermatologia', name: 'Dermatologia', icon: 'Sparkles' },
  { id: 'ginecologia', name: 'Ginecologia e Obstetrícia', icon: 'Baby' },
  { id: 'ortopedia', name: 'Ortopedia', icon: 'Bone' },
  { id: 'pediatria', name: 'Pediatria', icon: 'Baby' },
  { id: 'oftalmologia', name: 'Oftalmologia', icon: 'Eye' },
  { id: 'neurologia', name: 'Neurologia', icon: 'Brain' },
  { id: 'urologia', name: 'Urologia', icon: 'Shield' },
  { id: 'endocrinologia', name: 'Endocrinologia', icon: 'Activity' },
  { id: 'laboratorio', name: 'Exames Laboratoriais', icon: 'FlaskConical' },
  { id: 'imagem', name: 'Exames de Imagem', icon: 'Scan' },
] as const

export const LOCATIONS = [
  {
    id: 'pedreiras',
    name: 'Pedreiras',
    address: 'Av. Rio Branco, 838A, Centro',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
  },
  {
    id: 'igarape-grande',
    name: 'Igarapé Grande',
    address: 'Av. João Carvalho, 67, Centro',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
  },
  {
    id: 'pocao-de-pedra',
    name: 'Poção de Pedra',
    address: 'Av. Manoel Máximo, 48, Centro',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
  },
  {
    id: 'joselandia',
    name: 'Joselândia',
    address: 'Rua Dr. José Falcão, Centro',
    phone: '(99) 3642-7578',
    whatsapp: '5599981905654',
  },
] as const
