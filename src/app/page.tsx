'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/sections/navbar'
import HeroSection from '@/components/sections/hero-section'
import DestinationsShowcase from '@/components/sections/destinations-showcase'
import FeaturesSection from '@/components/sections/features-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import LocalVendorsSection from '@/components/sections/local-vendors-section'
import JharkhandBookingSection from '@/components/sections/jharkhand-booking-section'
import DigitalAlbumSection from '@/components/sections/digital-album-section'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="overflow-x-hidden">
      {isClient ? (
        <>
          <Navbar />
          <HeroSection />
          <DestinationsShowcase />
          <FeaturesSection />
          <JharkhandBookingSection />
          <LocalVendorsSection />
          <DigitalAlbumSection />
          <TestimonialsSection />
        </>
      ) : (
        // Show skeleton while loading to prevent hydration issues
        <>
          <div className="h-16 bg-gray-200 animate-pulse"></div>
          <div className="h-screen bg-gray-100 animate-pulse"></div>
          <div className="h-screen bg-gray-50 animate-pulse"></div>
          <div className="h-screen bg-gray-100 animate-pulse"></div>
          <div className="h-screen bg-gray-50 animate-pulse"></div>
          <div className="h-screen bg-gray-100 animate-pulse"></div>
          <div className="h-screen bg-gray-50 animate-pulse"></div>
          <div className="h-screen bg-gray-100 animate-pulse"></div>
        </>
      )}
    </main>
  );
}