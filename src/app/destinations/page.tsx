'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { sampleDestinations } from '@/data/sample-data'
import { Destination } from '@/types'
import Link from 'next/link'
import Navbar from '@/components/sections/navbar'

const categories = ['all', 'beach', 'mountain', 'heritage', 'adventure', 'city']

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredDestinations = sampleDestinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.location.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (destinationId: string) => {
    setFavorites(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    )
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

  // Show skeleton while loading to prevent hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 bg-gray-200 animate-pulse"></div>
        <div className="h-96 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 animate-pulse"></div>
        <div className="container mx-auto px-4 -mt-12">
          <div className="h-48 bg-white rounded-3xl shadow-2xl animate-pulse mb-12"></div>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white pt-24 pb-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>Explore Incredible Places</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Amazing
              </span>
              <br />
              <span className="text-white">Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Discover breathtaking locations across India with our handpicked
              <br className="hidden md:block" />
              collection of premium destinations
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search destinations, locations, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize h-12 px-6 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category === 'all' ? 'All Places' : category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore Destinations</h2>
          <div className="text-sm text-gray-500">
            Showing {filteredDestinations.length} destinations
          </div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredDestinations.map((destination) => (
            <motion.div key={destination.id} variants={itemVariants}>
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:scale-[1.03] hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
                    {/* Placeholder for image with better design */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-16 z-20">
                      <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{destination.name}</h3>
                    </div>
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(destination.id)}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-lg"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-200 ${
                        favorites.includes(destination.id) 
                          ? 'text-red-500 fill-current scale-110' 
                          : 'text-gray-600 hover:text-red-400'
                      }`} 
                    />
                  </button>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-3 right-3 z-30">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-lg">
                      {destination.category}
                    </span>
                  </div>
                  
                  {/* Featured Badge */}
                  {destination.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}
                  
                  {/* Jharkhand Special Badge */}
                  {destination.location.address.includes('Jharkhand') && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      🌿 Jharkhand
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">{destination.location.address}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{destination.rating}</span>
                      <span className="text-sm text-gray-500">({destination.reviewCount})</span>
                    </div>
                    
                    <Link href={`/destinations/${destination.id}`}>
                      <Button 
                        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold group-hover:shadow-lg transition-all duration-200"
                      >
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredDestinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏝️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}