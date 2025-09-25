'use client'

import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plane, MapPin, Users, Sparkles, Play, ArrowDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef, useState } from 'react'

// Dynamically import 3D components to avoid SSR issues
const SimpleHighQualityGlobe = dynamic(() => import('@/components/3d/simple-high-quality-globe'), { ssr: false })
const AnimatedAirplane = dynamic(() => import('@/components/3d/airplane'), { ssr: false })

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.section 
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            delay: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20"
        />
        
        {/* Gradient Orbs with enhanced animation */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        {/* Particle System - Fixed positions to prevent hydration mismatch */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            // Create deterministic positions based on index
            const leftPosition = ((i * 37) % 100); // Use prime number for better distribution
            const topPosition = ((i * 73) % 100);  // Use different prime for Y
            const duration = 3 + ((i * 13) % 20) / 10; // Duration between 3-5 seconds
            const delay = (i * 7) % 20 / 10; // Delay between 0-2 seconds
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-300 rounded-full"
                style={{
                  left: `${leftPosition}%`,
                  top: `${topPosition}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            )
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Travel Recommendations</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  Travel Together,
                </motion.span>
                <br />
                <motion.span 
                  className="text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Dream Bigger
                </motion.span>
              </h1>
            </motion.div>

            <motion.p 
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              Create groups, pool funds, and explore the world with friends. 
              Our platform makes group travel financing seamless with EMI options and AI recommendations.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link href="/destinations">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="xl"
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Explore Destinations</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Plane className="w-5 h-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                      initial={{ x: "100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Create Group
                </Button>
              </motion.div>
              
              <motion.button
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-3 bg-white shadow-lg rounded-full">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-2"
                >
                  10K+
                </motion.div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">16+</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-green-600 mb-2">₹2Cr+</div>
                <div className="text-sm text-gray-600">Funds Managed</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Right Content - 3D Globe */}
          <motion.div 
            className="relative h-96 lg:h-[600px]"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="relative z-10 h-full">
              <SimpleHighQualityGlobe />
            </div>
            
            {/* Enhanced Floating Elements */}
            <motion.div
              className="absolute top-10 left-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-blue-100"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm font-bold text-gray-900">Live Booking</div>
                  <div className="text-xs text-gray-600">Goa Beach Resort</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-20 right-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-purple-100"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -3, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="text-sm font-bold text-gray-900">Group Formed</div>
                  <div className="text-xs text-gray-600">5 travelers joined</div>
                </div>
              </div>
            </motion.div>
            
            {/* Success Notification */}
            <motion.div
              className="absolute top-1/2 right-4 bg-green-500 text-white rounded-xl shadow-xl p-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <div className="text-xs font-medium">✨ Trip Booked!</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Airplane Section */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-48 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <AnimatedAirplane />
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2 text-gray-500">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            className="bg-white rounded-xl p-8 max-w-2xl mx-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Coming Soon!</h3>
            <p className="text-gray-600 mb-4">
              Our demo video is currently in production. Stay tuned for an amazing preview 
              of how TravelTogether is revolutionizing group travel!
            </p>
            <Button onClick={() => setShowVideo(false)}>Close</Button>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  )
}