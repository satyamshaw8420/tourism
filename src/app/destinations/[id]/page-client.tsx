'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Star, Calendar, Users, Clock, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/sections/navbar'
import DestinationImageGallery from '@/components/destination-image-gallery'
import { Destination, TourPackage } from '@/types'

interface DestinationDetailClientProps {
  destination: Destination;
  displayImages: string[];
  relatedTours: TourPackage[];
}

export default function DestinationDetailClient({ 
  destination, 
  displayImages, 
  relatedTours 
}: DestinationDetailClientProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Local vendors data for Jharkhand destinations
  const getLocalVendors = () => {
    if (destination.location.address.includes('Ranchi')) {
      return [
        {
          id: '1',
          name: 'Ranchi Tribal Crafts',
          description: 'Authentic tribal handicrafts from Ranchi including wooden sculptures and bamboo products',
          rating: 4.8,
          reviewCount: 124,
          specialties: ['Wooden crafts', 'Bamboo products', 'Tribal jewelry', 'Handwoven textiles'],
          image: '/vendors/tribal-crafts.jpg'
        },
        {
          id: '2',
          name: 'Ranchi Hill Guides',
          description: 'Local guides offering personalized tours of waterfalls and natural sites',
          rating: 4.9,
          reviewCount: 210,
          specialties: ['Waterfall tours', 'Nature walks', 'Bird watching', 'Tribal village visits'],
          image: '/vendors/guides.jpg'
        }
      ];
    } else if (destination.location.address.includes('Deoghar')) {
      return [
        {
          id: '1',
          name: 'Deoghar Sweet House',
          description: 'Famous for authentic Deoghar peda and other traditional sweets',
          rating: 4.9,
          reviewCount: 256,
          specialties: ['Deoghar Peda', 'Traditional sweets', 'Dry fruits', 'Local delicacies'],
          image: '/vendors/sweets.jpg'
        },
        {
          id: '2',
          name: 'Baidyanath Local Guides',
          description: 'Expert guides for pilgrimage tours to Baidyanath Dham and surrounding temples',
          rating: 4.8,
          reviewCount: 189,
          specialties: ['Pilgrimage tours', 'Temple history', 'Local legends', 'Spiritual experiences'],
          image: '/vendors/pilgrimage-guides.jpg'
        }
      ];
    } else if (destination.location.address.includes('Hazaribagh')) {
      return [
        {
          id: '1',
          name: 'Hazaribagh Jungle Guides',
          description: 'Local guides offering personalized wildlife tours in Hazaribagh National Park',
          rating: 4.9,
          reviewCount: 210,
          specialties: ['Wildlife tours', 'Bird watching', 'Nature walks', 'Tribal village visits'],
          image: '/vendors/guides.jpg'
        }
      ];
    } else if (destination.location.address.includes('Jamshedpur')) {
      return [
        {
          id: '1',
          name: 'Jamshedpur Steel Art',
          description: 'Unique metal crafts made from recycled steel inspired by Tata Steel heritage',
          rating: 4.7,
          reviewCount: 156,
          specialties: ['Metal sculptures', 'Steel crafts', 'Industrial art', 'Home decor'],
          image: '/vendors/metal-crafts.jpg'
        }
      ];
    } else if (destination.location.address.includes('Dhanbad')) {
      return [
        {
          id: '1',
          name: 'Dhanbad Mining Heritage',
          description: 'Local guides offering tours of coal mines and mining heritage sites',
          rating: 4.6,
          reviewCount: 98,
          specialties: ['Mining tours', 'Historical sites', 'Local history', 'Industrial heritage'],
          image: '/vendors/mining.jpg'
        }
      ];
    } else if (destination.location.address.includes('Netarhat')) {
      return [
        {
          id: '1',
          name: 'Netarhat Hill Farmers',
          description: 'Organic produce and local delicacies from the hills of Netarhat',
          rating: 4.6,
          reviewCount: 98,
          specialties: ['Organic honey', 'Hill vegetables', 'Local teas', 'Handmade preserves'],
          image: '/vendors/farmers.jpg'
        }
      ];
    } else if (destination.location.address.includes('Latehar')) {
      return [
        {
          id: '1',
          name: 'Latehar Tribal Guides',
          description: 'Local guides offering tours of tribal villages and cultural sites',
          rating: 4.7,
          reviewCount: 112,
          specialties: ['Tribal village tours', 'Cultural experiences', 'Local crafts', 'Traditional music'],
          image: '/vendors/tribal-guides.jpg'
        }
      ];
    } else if (destination.location.address.includes('Giridih')) {
      return [
        {
          id: '1',
          name: 'Parasnath Trek Guides',
          description: 'Expert guides for trekking and pilgrimage tours to Parasnath Hill',
          rating: 4.8,
          reviewCount: 145,
          specialties: ['Trekking tours', 'Pilgrimage guidance', 'Jain history', 'Mountain trails'],
          image: '/vendors/trek-guides.jpg'
        }
      ];
    } else if (destination.location.address.includes('Ramgarh')) {
      return [
        {
          id: '1',
          name: 'Ramgarh Valley Guides',
          description: 'Local guides offering tours of Patratu Valley and surrounding attractions',
          rating: 4.6,
          reviewCount: 87,
          specialties: ['Valley tours', 'Dam visits', 'Scenic spots', 'Local history'],
          image: '/vendors/valley-guides.jpg'
        }
      ];
    } else if (destination.location.address.includes('Koderma')) {
      return [
        {
          id: '1',
          name: 'Koderma Gem Traders',
          description: 'Local traders specializing in mica and gemstone products',
          rating: 4.5,
          reviewCount: 76,
          specialties: ['Mica crafts', 'Gemstone jewelry', 'Local minerals', 'Traditional crafts'],
          image: '/vendors/gem-traders.jpg'
        }
      ];
    }
    
    // Default vendors if no specific location match
    return [
      {
        id: '1',
        name: 'Local Handicrafts',
        description: 'Authentic local handicrafts and souvenirs made by regional artisans',
        rating: 4.8,
        reviewCount: 124,
        specialties: ['Wooden crafts', 'Textiles', 'Jewelry', 'Pottery'],
        image: '/vendors/local-crafts.jpg'
      },
      {
        id: '2',
        name: 'Regional Guides',
        description: 'Local guides offering personalized tours of natural and cultural sites',
        rating: 4.9,
        reviewCount: 210,
        specialties: ['Sightseeing', 'Cultural tours', 'Nature walks', 'Historical sites'],
        image: '/vendors/regional-guides.jpg'
      }
    ];
  };

  const localVendors = getLocalVendors();

  // Check if this is a Jharkhand destination
  const isJharkhandDestination = destination.location.address.includes('Jharkhand');

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

  // Show skeleton while loading to prevent hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-96 bg-gray-200 animate-pulse"></div>
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl p-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
              {isJharkhandDestination && (
                <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  🌿 Jharkhand
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

      {/* Image Gallery Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
          <DestinationImageGallery 
            destinationId={destination.id} 
            destinationName={destination.name}
            initialImages={displayImages}
            maxImages={12}
            showImageCount={true}
          />
        </motion.div>
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

            {/* Local Vendors Section for Jharkhand Destinations */}
            {isJharkhandDestination && (
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Support Local Vendors</h2>
                <p className="text-gray-600 mb-6">
                  When you visit Jharkhand, you're not just experiencing natural beauty and culture - you're also supporting local communities. 
                  These local vendors offer authentic products and services that help sustain the local economy.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localVendors.map((vendor) => (
                    <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 bg-gradient-to-r from-green-400 to-blue-500 relative">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white font-bold text-lg">{vendor.name}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 text-sm mb-3">{vendor.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{vendor.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({vendor.reviewCount})</span>
                          </div>
                          <Button variant="outline" size="sm">View Profile</Button>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {vendor.specialties.map((specialty, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Support Local Communities</h3>
                  <p className="text-gray-600 mb-4">
                    By choosing local vendors, you're directly contributing to the economic empowerment of Jharkhand's communities. 
                    Your purchases help preserve traditional crafts and support families who have been practicing these skills for generations.
                  </p>
                  <div className="flex items-center text-green-700">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Thank you for supporting sustainable tourism!</span>
                  </div>
                </Card>
              </motion.div>
            )}

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
                  {isJharkhandDestination && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium text-green-600">Jharkhand</span>
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