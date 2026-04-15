import * as React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB'
import { SmoothScroll } from '@/components/layout/SmoothScroll'

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </SmoothScroll>
  )
}

export default PageWrapper
