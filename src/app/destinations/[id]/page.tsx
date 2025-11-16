import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Star, Calendar, Users, Clock, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDestinations, sampleTourPackages } from '@/data/sample-data'
import { notFound } from 'next/navigation'
import DestinationDetailClient from './page-client'
import { getDestinationImagesServer } from '@/lib/destination-images.server'

interface DestinationDetailPageProps {
  params: {
    id: string
  }
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { id } = params
  const destination = sampleDestinations.find(d => d.id === id)
  
  if (!destination) {
    notFound()
  }

  // Get all images for this destination
  const allImages = getDestinationImagesServer(destination.id, destination.name);
  
  // If no additional images found, use the main image
  const displayImages = allImages.length > 0 
    ? allImages 
    : [destination.image];
  
  // Find tours for this destination
  const relatedTours = sampleTourPackages.filter(tour => 
    tour.destination.id === destination.id
  )

  return (
    <DestinationDetailClient 
      destination={destination}
      displayImages={displayImages}
      relatedTours={relatedTours}
    />
  )
}