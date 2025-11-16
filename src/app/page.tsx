import Navbar from '@/components/sections/navbar'
import HeroSection from '@/components/sections/hero-section'
import FeaturesSection from '@/components/sections/features-section'
import DestinationsShowcaseServer from '@/components/sections/destinations-showcase-server'
import TestimonialsSection from '@/components/sections/testimonials-section'
import JharkhandBookingSection from '@/components/sections/jharkhand-booking-section'
import DigitalAlbumSection from '@/components/sections/digital-album-section'
import LocalVendorsSection from '@/components/sections/local-vendors-section'
import ConvexClientProvider from '@/components/convex-client-provider'

export default function Home() {
  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <DestinationsShowcaseServer />
          <JharkhandBookingSection />
        
        <LocalVendorsSection />
        <FeaturesSection />
         <DigitalAlbumSection />
          <TestimonialsSection />
      </div>
    </ConvexClientProvider>
  )
}