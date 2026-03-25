// ─────────────────────────────────────────────
// Appointment
// ─────────────────────────────────────────────

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ─────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  href: string
  color: string
}

// ─────────────────────────────────────────────
// Doctor
// ─────────────────────────────────────────────

export interface DoctorProfile {
  id: string
  name: string
  specialty: string
  crm: string
  bio: string | null
  photoUrl: string | null
  location: string
  available: boolean
}

// ─────────────────────────────────────────────
// Location
// ─────────────────────────────────────────────

export interface LocationInfo {
  id: string
  name: string
  address: string
  phone: string
  email: string | null
  whatsapp: string | null
  mapUrl: string | null
  hours: string
}

// ─────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────

export interface TestimonialItem {
  id: string
  patientName: string
  text: string
  rating: number
  specialty: string | null
  createdAt: Date | string
}

// ─────────────────────────────────────────────
// Blog
// ─────────────────────────────────────────────

export interface BlogPostPreview {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImageUrl: string | null
  category: string
  authorName: string
  publishedAt: Date | string | null
}

// ─────────────────────────────────────────────
// Insurance Plans
// ─────────────────────────────────────────────

export interface InsurancePlanItem {
  id: string
  name: string
  logoUrl: string | null
  category: string
}

// ─────────────────────────────────────────────
// Site Config
// ─────────────────────────────────────────────

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  phone: string
  whatsapp: string
  email: string
  instagram: string
  facebook: string
  address: string
  cnpj: string
  hours: string
  scheduleUrl: string
  worklabUrl: string
}
