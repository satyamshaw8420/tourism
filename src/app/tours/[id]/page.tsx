'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Star, Calendar, Users, Clock, Heart, Share2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleTourPackages } from '@/data/sample-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/sections/navbar'

interface TourDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  // Unwrap params using React.use()
  const { id } = use(params)
  const tour = sampleTourPackages.find(t => t.id === id)
  
  if (!tour) {
    notFound()
  }

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
      <div className="relative h-[70vh]">
        {tour.images && tour.images.length > 0 ? (
          <>
            <img 
              src={tour.images[0]} 
              alt={tour.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-destination.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
        )}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-4xl"
          >
            <Link href="/tours" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tours
            </Link>
            
            <div className="space-y-3 mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm capitalize font-medium">
                  {tour.destination.category}
                </span>
                {tour.featured && (
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                    ⭐ Popular Choice
                  </span>
                )}
                {tour.originalPrice && (
                  <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                    {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {tour.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90 leading-relaxed">
              {tour.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{tour.destination.location.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{tour.rating}</span>
                <span className="opacity-80">({tour.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{tour.duration} days</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{tour.minGroupSize}-{tour.maxGroupSize} people</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/booking/${tour.id}`}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Book Now - ₹{tour.price.toLocaleString()}
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-6 py-4 rounded-xl"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save Tour'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-6 py-4 rounded-xl"
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
            {/* Image Gallery */}
            {tour.images && tour.images.length > 0 && (
              <motion.div variants={itemVariants}>
                <Card className="p-4 border-0 shadow-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.images.slice(0, 3).map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${tour.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-destination.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
            
            {/* Overview */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 border-0 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {tour.description} This carefully crafted itinerary offers the perfect blend of adventure, 
                  culture, and relaxation. Our experienced guides will ensure you have an unforgettable experience 
                  while maintaining the highest safety standards.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      What&#39;s Included
                    </h3>
                    <ul className="space-y-3">
                      {tour.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <X className="w-5 h-5 text-red-500 mr-2" />
                      What&#39;s Not Included
                    </h3>
                    <ul className="space-y-3">
                      {tour.exclusions.map((exclusion, index) => (
                        <li key={index} className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{exclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Itinerary */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 border-0 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-blue-500 pl-6 pb-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 -ml-10">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{day.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Activities</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {day.activities.map((activity, index) => (
                              <li key={index}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Meals Included</h4>
                          <div className="flex gap-2">
                            {day.meals.map((meal, index) => (
                              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs capitalize">
                                {meal}
                              </span>
                            ))}
                          </div>
                          {day.accommodation && (
                            <div className="mt-2">
                              <h4 className="font-medium text-gray-900 mb-1">Accommodation</h4>
                              <span className="text-sm text-gray-600">{day.accommodation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg sticky top-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="text-3xl font-bold text-green-600">
                      ₹{tour.price.toLocaleString()}
                    </div>
                    {tour.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        ₹{tour.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-600">per person</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Choose your travel date</option>
                      {tour.availability.map((date, index) => (
                        <option key={index} value={date.toISOString()}>
                          {date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Travelers
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      {Array.from({ length: tour.maxGroupSize - tour.minGroupSize + 1 }, (_, i) => (
                        <option key={i} value={tour.minGroupSize + i}>
                          {tour.minGroupSize + i} {tour.minGroupSize + i === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Link href={`/booking/${tour.id}`}>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-bold text-lg">
                    Book This Tour
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Free cancellation up to 24 hours before the tour
                </p>
              </Card>
            </motion.div>

            {/* Quick Facts */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{tour.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group Size:</span>
                    <span className="font-medium">{tour.minGroupSize}-{tour.maxGroupSize} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{tour.rating}/5 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews:</span>
                    <span className="font-medium">{tour.reviewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Dates:</span>
                    <span className="font-medium">{tour.availability.length}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Have questions about this tour? Our travel experts are here to help!
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