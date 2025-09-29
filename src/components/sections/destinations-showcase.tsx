'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Star, ArrowRight, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDestinations } from '@/data/sample-data'
import Link from 'next/link'
import Image from 'next/image'

function Interactive3DCard({ destination, isActive }: { destination: any, isActive: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-white rounded-xl transform transition-all duration-300 hover:shadow-xl">
        {/* Image Background */}
        <div className="absolute inset-0 h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="w-full h-full relative">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                console.error(`Failed to load image for ${destination.name}:`, destination.image);
              }}
            />
          </div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
          <motion.div
            style={{ transform: "translateZ(75px)" }}
            className="text-white"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize shadow-lg ${
                destination.category === 'beach' ? 'bg-cyan-500/90 shadow-cyan-500/30' :
                destination.category === 'mountain' ? 'bg-green-500/90 shadow-green-500/30' :
                destination.category === 'heritage' ? 'bg-yellow-500/90 shadow-yellow-500/30' :
                destination.category === 'adventure' ? 'bg-red-500/90 shadow-red-500/30' : 'bg-purple-500/90 shadow-purple-500/30'
              }`}>
                {destination.category}
              </span>
              {destination.featured && (
                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                  ⭐ Featured
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
            <p className="text-sm text-white/80 mb-3 line-clamp-2">
              {destination.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs">{destination.location.address.split(',')[0]}</span>
                </div>
              </div>
              
              <motion.div
                style={{ transform: "translateZ(50px)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/destinations/${destination.id}`}>
                  <Button 
                    size="sm" 
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function DestinationsShowcase() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = ['all', 'beach', 'mountain', 'heritage', 'adventure', 'city']
  
  // Get featured destinations (first 6 featured ones)
  let featuredDestinations = sampleDestinations.filter(d => d.featured).slice(0, 6)
  
  // Ensure we have some Jharkhand destinations in the featured list
  const jharkhandDestinations = sampleDestinations.filter(d => 
    d.location.address.includes('Jharkhand') && d.featured
  )
  
  // If we don't have enough Jharkhand destinations in featured, add some
  if (jharkhandDestinations.length > 0) {
    // Replace some of the existing featured destinations with Jharkhand ones
    const nonJharkhandFeatured = featuredDestinations.filter(d => 
      !d.location.address.includes('Jharkhand')
    )
    
    // Add at least 2 Jharkhand destinations to the featured list
    const jharkhandToAdd = jharkhandDestinations.slice(0, 2)
    featuredDestinations = [...jharkhandToAdd, ...nonJharkhandFeatured].slice(0, 6)
  }
  
  const filteredDestinations = activeCategory === 'all' 
    ? featuredDestinations 
    : featuredDestinations.filter(d => d.category === activeCategory)

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Travel Illustration Header */}
      <div className="relative mb-16">
        <div className="w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <img
              src="/travel-illustration.svg"
              alt="Travel Adventure Illustration"
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {/* Semi-transparent background for better text readability */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl -mx-8 -my-8"></div>
          
          <div className="relative z-10 py-8">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Plane className="w-4 h-4" />
              <span>Handpicked Destinations</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Featured
              </span>
              <br />
              <span className="text-gray-900">Destinations</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              Discover breathtaking locations with immersive experiences and 
              interactive previews that bring destinations to life.
            </p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12 relative"
        >
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl -mx-4 -my-2"></div>
          <div className="relative z-10 flex flex-wrap justify-center gap-3 py-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Destinations' : category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
            >
              <Interactive3DCard 
                destination={destination} 
                isActive={true}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/destinations">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <Plane className="w-5 h-5 mr-2" />
              Explore All Destinations
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}