'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Star, Calendar, Users, Clock, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDestinations, sampleTourPackages } from '@/data/sample-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/sections/navbar'

interface DestinationDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Unwrap params using React.use()
  const { id } = use(params)
  const destination = sampleDestinations.find(d => d.id === id)
  
  if (!destination) {
    notFound()
  }

  // Find tours for this destination
  const relatedTours = sampleTourPackages.filter(tour => 
    tour.destination.id === destination.id
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-4xl"
          >
            <Link href="/destinations" className="inline-flex items-center mb-4 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Destinations
            </Link>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm capitalize">
                {destination.category}
              </span>
              {destination.featured && (
                <span className="bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {destination.name}
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {destination.description}
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{destination.location.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{destination.rating}</span>
                <span className="opacity-80">({destination.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="gradient" 
                size="lg"
                className="shadow-lg hover:shadow-xl"
              >
                Book Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-12"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={itemVariants}>
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {destination.name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {destination.description} Discover the beauty and culture of this amazing destination 
                  with our carefully curated travel experiences. From stunning landscapes to rich cultural 
                  heritage, {destination.name} offers something special for every traveler.
                </p>
                
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Highlights</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Unique cultural experiences
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Stunning natural beauty
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Professional local guides
                      </li>
                      <li className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Safe and comfortable travel
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Best Time to Visit</h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Peak Season: October - March
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Ideal Duration: 3-7 days
                      </p>
                      <p className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Perfect for: All age groups
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Available Tours */}
            {relatedTours.length > 0 && (
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Tours</h2>
                <div className="space-y-6">
                  {relatedTours.map((tour) => (
                    <Card key={tour.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                          <p className="text-gray-600 mb-4">{tour.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {tour.duration} days
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {tour.minGroupSize}-{tour.maxGroupSize} people
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400" />
                              {tour.rating} ({tour.reviewCount})
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-blue-600">
                              ₹{tour.price.toLocaleString()}
                            </div>
                            {tour.originalPrice && (
                              <div className="text-lg text-gray-500 line-through">
                                ₹{tour.originalPrice.toLocaleString()}
                              </div>
                            )}
                            {tour.featured && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
                          <Link href={`/tours/${tour.id}`}>
                            <Button variant="gradient" className="w-full md:w-auto">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{destination.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{destination.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews:</span>
                    <span className="font-medium">{destination.reviewCount}</span>
                  </div>
                  {destination.featured && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-yellow-600">Featured</span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Have questions about this destination? Our travel experts are here to help!
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}