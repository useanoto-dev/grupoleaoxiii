// Force static generation — no dynamic data on this page
export const dynamic = 'force-static'

import { PageWrapper } from '@/components/layout/PageWrapper'
import { Hero } from '@/components/sections/Hero'
import { QuickActions } from '@/components/sections/QuickActions'
import { Testimonials } from '@/components/sections/Testimonials'
import { Gallery } from '@/components/sections/Gallery'
import { Locations } from '@/components/sections/Locations'
import { InsurancePlans } from '@/components/sections/InsurancePlans'
import { CtaBanner } from '@/components/sections/CtaBanner'

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <QuickActions />
      <Testimonials />
      <Gallery />
      <Locations />
      <InsurancePlans />
      <CtaBanner />
    </PageWrapper>
  )
}
