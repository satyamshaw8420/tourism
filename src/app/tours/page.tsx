'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Clock, Users, Star, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { sampleTourPackages } from '@/data/sample-data'
import Link from 'next/link'
import Navbar from '@/components/sections/navbar'

const categories = ['all', 'beach', 'mountain', 'heritage', 'adventure', 'city']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹20,000', min: 0, max: 20000 },
  { label: '₹20,000 - ₹40,000', min: 20000, max: 40000 },
  { label: '₹40,000 - ₹60,000', min: 40000, max: 60000 },
  { label: 'Above ₹60,000', min: 60000, max: Infinity },
]

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])

  const filteredTours = sampleTourPackages.filter((tour) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tour.destination.category === selectedCategory
    const matchesPrice = tour.price >= selectedPriceRange.min && tour.price <= selectedPriceRange.max
    return matchesSearch && matchesCategory && matchesPrice
  })

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
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white pt-24 pb-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full opacity-20" />
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Discover Amazing Adventures</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Premium Tour
              </span>
              <br />
              <span className="text-white">Packages</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Curated experiences with professional guides, premium accommodations,
              <br className="hidden md:block" />
              and unforgettable memories waiting for you
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
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tours, destinations, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {category === 'all' ? 'All Tours' : category}
                </Button>
              ))}
            </div>
            
            <select
              value={selectedPriceRange.label}
              onChange={(e) => {
                const range = priceRanges.find(r => r.label === e.target.value) || priceRanges[0]
                setSelectedPriceRange(range)
              }}
              className="px-6 py-3 h-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium min-w-[180px]"
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>

      {/* Tours Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {filteredTours.length} Premium Tours Available
            </h2>
            <p className="text-gray-600">Handpicked experiences for unforgettable journeys</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 h-12 px-6 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Sort by Price
            </Button>
            <Button variant="outline" className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 h-12 px-6 rounded-xl">
              <Star className="w-4 h-4 mr-2" />
              Sort by Rating
            </Button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredTours.map((tour) => (
            <motion.div key={tour.id} variants={itemVariants}>
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:scale-[1.02]">
                <div className="relative">
                  <div className="aspect-[16/10] relative overflow-hidden">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{tour.destination.name}</h3>
                      <p className="text-white/80 text-sm">{tour.destination.location.address}</p>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {tour.destination.category}
                    </span>
                    {tour.featured && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ Popular
                      </span>
                    )}
                  </div>
                  
                  {/* Discount Badge */}
                  {tour.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">{tour.duration} days</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="text-sm font-medium">{tour.minGroupSize}-{tour.maxGroupSize} people</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <span className="text-sm font-medium">{tour.rating} ({tour.reviewCount})</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium">{tour.availability.length} dates</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{tour.price.toLocaleString()}
                        </div>
                        {tour.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                    
                    <Link href={`/tours/${tour.id}`}>
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold group-hover:shadow-lg transition-all duration-200"
                      >
                        Explore Tour
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTours.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
              <div className="text-6xl">🗺️</div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No tours match your criteria</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to discover more amazing destinations
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedPriceRange(priceRanges[0])
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}