'use client'

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Navigation, MapPin, Route, Clock, Star, Users, Calendar, 
  DollarSign, Plane, Hotel, Utensils, Camera, Info, BookOpen, 
  CreditCard, CheckCircle, AlertCircle, Wifi, Car, Shield, Palette 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDestinations, sampleTourPackages } from '@/data/sample-data'
import Link from 'next/link'

// Color themes for the globe
const colorThemes = {
  classic: {
    name: 'Classic Earth',
    ocean: '#1e40af',
    land: '#059669',
    atmosphere: '#60a5fa',
    background: '#000014',
    stars: '#ffffff'
  },
  dark: {
    name: 'Dark Ocean',
    ocean: '#0f172a',
    land: '#1e293b',
    atmosphere: '#334155',
    background: '#020617',
    stars: '#64748b'
  },
  neon: {
    name: 'Neon Cyber',
    ocean: '#1a1a2e',
    land: '#16213e',
    atmosphere: '#0f3460',
    background: '#0d1117',
    stars: '#00d4ff'
  },
  sunset: {
    name: 'Sunset Vibes',
    ocean: '#7c2d12',
    land: '#ea580c',
    atmosphere: '#fb923c',
    background: '#431407',
    stars: '#fbbf24'
  },
  forest: {
    name: 'Deep Forest',
    ocean: '#064e3b',
    land: '#166534',
    atmosphere: '#22c55e',
    background: '#052e16',
    stars: '#86efac'
  },
  arctic: {
    name: 'Arctic Blue',
    ocean: '#0c4a6e',
    land: '#0369a1',
    atmosphere: '#0ea5e9',
    background: '#082f49',
    stars: '#bae6fd'
  }
}

// Enhanced destination coordinates with budget information
const destinationData = {
  'Himalayas': { 
    lat: 28.2380, 
    lng: 83.9956, 
    position: [0.2, 0.8, 0.6] as [number, number, number],
    budgetRange: { min: 15000, max: 45000 },
    bestTime: 'Mar-May, Sep-Nov',
    category: 'mountain',
    highlights: ['Trekking', 'Mountain Views', 'Spiritual Experience'],
    accommodationType: 'Mountain Lodges',
    avgStay: '7-14 days'
  },
  'Goa Beaches': { 
    lat: 15.2993, 
    lng: 74.1240, 
    position: [-0.3, 0.5, 0.8] as [number, number, number],
    budgetRange: { min: 8000, max: 25000 },
    bestTime: 'Nov-Mar',
    category: 'beach',
    highlights: ['Beach Life', 'Water Sports', 'Nightlife'],
    accommodationType: 'Beach Resorts',
    avgStay: '3-7 days'
  },
  'Rajasthan': { 
    lat: 27.0238, 
    lng: 74.2179, 
    position: [0.7, -0.2, 0.7] as [number, number, number],
    budgetRange: { min: 12000, max: 35000 },
    bestTime: 'Oct-Mar',
    category: 'heritage',
    highlights: ['Palaces', 'Desert Safari', 'Cultural Heritage'],
    accommodationType: 'Heritage Hotels',
    avgStay: '5-10 days'
  },
  'Kerala': { 
    lat: 10.8505, 
    lng: 76.2711, 
    position: [-0.6, 0.1, 0.8] as [number, number, number],
    budgetRange: { min: 10000, max: 30000 },
    bestTime: 'Sep-Mar',
    category: 'nature',
    highlights: ['Backwaters', 'Hill Stations', 'Ayurveda'],
    accommodationType: 'Houseboats & Resorts',
    avgStay: '4-8 days'
  },
  'Andaman': { 
    lat: 11.7401, 
    lng: 92.6586, 
    position: [0.1, -0.7, 0.7] as [number, number, number],
    budgetRange: { min: 20000, max: 50000 },
    bestTime: 'Oct-May',
    category: 'island',
    highlights: ['Pristine Beaches', 'Scuba Diving', 'Marine Life'],
    accommodationType: 'Beach Resorts',
    avgStay: '5-7 days'
  },
  'Mumbai': { 
    lat: 19.0760, 
    lng: 72.8777, 
    position: [-0.4, 0.3, 0.9] as [number, number, number],
    budgetRange: { min: 6000, max: 20000 },
    bestTime: 'Nov-Feb',
    category: 'city',
    highlights: ['Bollywood', 'Street Food', 'Business Hub'],
    accommodationType: 'City Hotels',
    avgStay: '2-5 days'
  },
  'Delhi': { 
    lat: 28.7041, 
    lng: 77.1025, 
    position: [0.3, 0.6, 0.7] as [number, number, number],
    budgetRange: { min: 5000, max: 18000 },
    bestTime: 'Oct-Mar',
    category: 'heritage',
    highlights: ['Red Fort', 'India Gate', 'Historical Sites'],
    accommodationType: 'Heritage & Modern Hotels',
    avgStay: '2-4 days'
  },
  'Manali': { 
    lat: 32.2396, 
    lng: 77.1887, 
    position: [0.4, 0.7, 0.6] as [number, number, number],
    budgetRange: { min: 12000, max: 28000 },
    bestTime: 'May-Jun, Sep-Oct',
    category: 'adventure',
    highlights: ['Adventure Sports', 'Snow Activities', 'Hill Station'],
    accommodationType: 'Mountain Resorts',
    avgStay: '4-6 days'
  },
}

interface InteractivePinProps {
  position: [number, number, number]
  label: string
  color?: string
  onClick: (destination: string) => void
  isSelected: boolean
}

function InteractivePin({ position, label, color = '#ff6b6b', onClick, isSelected }: InteractivePinProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = isSelected ? 2 : hovered ? 1.5 : 1
      meshRef.current.scale.setScalar(scale)
      
      if (isSelected) {
        meshRef.current.rotation.y += 0.05
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => onClick(label)}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial 
            color={isSelected ? '#fbbf24' : color} 
            emissive={isSelected ? '#fbbf24' : color} 
            emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2} 
          />
        </mesh>
        
        {(hovered || isSelected) && (
          <Html>
            <div className={`px-3 py-2 rounded-lg shadow-lg text-sm font-medium transform -translate-x-1/2 -translate-y-8 whitespace-nowrap ${
              isSelected ? 'bg-yellow-400 text-gray-900' : 'bg-white text-gray-800'
            }`}>
              {label}
              {isSelected && (
                <div className="text-xs mt-1">Click for details</div>
              )}
            </div>
          </Html>
        )}
        
        {/* Enhanced ring effect */}
        <mesh>
          <ringGeometry args={[0.03, 0.05]} />
          <meshBasicMaterial 
            color={isSelected ? '#fbbf24' : color} 
            transparent 
            opacity={isSelected ? 1 : hovered ? 0.8 : 0.3} 
          />
        </mesh>
        
        {/* Pulsing outer ring for selected destination */}
        {isSelected && (
          <mesh>
            <ringGeometry args={[0.06, 0.08]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
          </mesh>
        )}
      </group>
    </Float>
  )
}

function EarthSphere({ selectedDestination, colorTheme }: { selectedDestination: string | null, colorTheme: keyof typeof colorThemes }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { mouse } = useThree()
  const theme = colorThemes[colorTheme]
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const rotationSpeed = selectedDestination ? 0.05 : 0.15
      meshRef.current.rotation.y += delta * rotationSpeed
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.1,
        0.02
      )
    }
  })

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Create gradient based on theme
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, theme.ocean)
    gradient.addColorStop(0.3, theme.ocean)
    gradient.addColorStop(0.4, theme.land)
    gradient.addColorStop(0.6, theme.land)
    gradient.addColorStop(0.7, theme.ocean)
    gradient.addColorStop(0.9, theme.land)
    gradient.addColorStop(1, theme.ocean)
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)
    
    // Add land masses with theme colors
    const landColor = new THREE.Color(theme.land)
    landColor.offsetHSL(0, 0, 0.1) // Slightly lighter for variation
    ctx.fillStyle = landColor.getStyle()
    
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 80 + 20
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Add smaller land details
    const detailColor = new THREE.Color(theme.land)
    detailColor.offsetHSL(0, 0, -0.1) // Slightly darker
    ctx.fillStyle = detailColor.getStyle()
    
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 30 + 10
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [theme])

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Atmosphere with theme color */}
      <Sphere args={[1.08, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color={theme.atmosphere} 
          transparent 
          opacity={0.15} 
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

interface DestinationInfoModalProps {
  isOpen: boolean
  onClose: () => void
  destination: string
}

function DestinationInfoModal({ isOpen, onClose, destination }: DestinationInfoModalProps) {
  const destData = destinationData[destination as keyof typeof destinationData]
  const destinationInfo = sampleDestinations.find(d => 
    d.name.toLowerCase().includes(destination.toLowerCase()) ||
    destination.toLowerCase().includes(d.name.toLowerCase())
  )
  const availableTours = sampleTourPackages.filter(tour => 
    tour.destination.name.toLowerCase().includes(destination.toLowerCase()) ||
    destination.toLowerCase().includes(tour.destination.name.toLowerCase())
  )

  if (!isOpen || !destData) return null

  const budgetBreakdown = {
    accommodation: Math.round(destData.budgetRange.min * 0.4),
    food: Math.round(destData.budgetRange.min * 0.25),
    transport: Math.round(destData.budgetRange.min * 0.20),
    activities: Math.round(destData.budgetRange.min * 0.15)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 right-4">
            <Button variant="outline" size="sm" onClick={onClose} className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{destination}</h1>
            <div className="flex items-center space-x-4 text-lg">
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5" />
                <span>{destData.lat.toFixed(2)}°, {destData.lng.toFixed(2)}°</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-5 h-5" />
                <span>Best: {destData.bestTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-blue-600" />
                  Destination Overview
                </h2>
                <p className="text-gray-600 mb-4">
                  {destinationInfo?.description || `Experience the best of ${destination} with its unique attractions and cultural heritage.`}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Best Time</div>
                    <div className="text-sm text-gray-600">{destData.bestTime}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Duration</div>
                    <div className="text-sm text-gray-600">{destData.avgStay}</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Hotel className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Stay Type</div>
                    <div className="text-sm text-gray-600">{destData.accommodationType}</div>
                  </div>
                </div>
              </Card>

              {/* Highlights & Activities */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-purple-600" />
                  Top Highlights
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {destData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Available Tours */}
              {availableTours.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                    Available Tour Packages
                  </h3>
                  <div className="space-y-4">
                    {availableTours.slice(0, 3).map((tour) => (
                      <div key={tour.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{tour.title}</h4>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">₹{tour.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">per person</div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{tour.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                              {tour.rating}
                            </span>
                          </div>
                          <Link href={`/tours/${tour.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Budget Information */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-green-600" />
                  Budget Guide
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₹{destData.budgetRange.min.toLocaleString()} - ₹{destData.budgetRange.max.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Estimated budget range</div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Budget Breakdown:</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Hotel className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Accommodation</span>
                        </div>
                        <span className="font-medium text-gray-900">₹{budgetBreakdown.accommodation.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Utensils className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-gray-600">Food & Dining</span>
                        </div>
                        <span className="font-medium text-gray-900">₹{budgetBreakdown.food.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Car className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">Transport</span>
                        </div>
                        <span className="font-medium text-gray-900">₹{budgetBreakdown.transport.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-600">Activities</span>
                        </div>
                        <span className="font-medium text-gray-900">₹{budgetBreakdown.activities.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Travel Tips */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-blue-600" />
                  Travel Tips
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Best Season</div>
                      <div className="text-sm text-gray-600">Visit during {destData.bestTime} for optimal weather conditions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Advance Booking</div>
                      <div className="text-sm text-gray-600">Book accommodations 2-3 weeks in advance for better rates</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Wifi className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Connectivity</div>
                      <div className="text-sm text-gray-600">Good network coverage available in most areas</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/destinations" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Explore More Destinations
                    </Button>
                  </Link>
                  
                  <Link href="/tours" className="block">
                    <Button variant="outline" className="w-full">
                      <Plane className="w-4 h-4 mr-2" />
                      Browse All Tours
                    </Button>
                  </Link>
                  
                  {availableTours.length > 0 && (
                    <Link href={`/booking/${availableTours[0].id}`} className="block">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EnhancedInteractiveGlobe() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [showDestinationInfo, setShowDestinationInfo] = useState(false)
  const [colorTheme, setColorTheme] = useState<keyof typeof colorThemes>('dark')
  const [showThemeSelector, setShowThemeSelector] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleDestinationClick = useCallback((destination: string) => {
    setSelectedDestination(destination)
    setShowDestinationInfo(true)
  }, [])

  const closeInfoModal = useCallback(() => {
    setShowDestinationInfo(false)
    setSelectedDestination(null)
  }, [])

  const currentTheme = colorThemes[colorTheme]

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center" style={{ backgroundColor: currentTheme.background }}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <div className="h-full w-full relative" style={{ backgroundColor: currentTheme.background }}>
        <Canvas 
          camera={{ position: [0, 0, 3], fov: 60 }}
          className="cursor-pointer"
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.0} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color={currentTheme.atmosphere} />
          
          <Stars 
            radius={300} 
            depth={60} 
            count={2000} 
            factor={8} 
            saturation={0.3} 
            fade
            speed={0.5}
          />
          
          <EarthSphere selectedDestination={selectedDestination} colorTheme={colorTheme} />
          
          {/* Interactive destination pins */}
          {Object.entries(destinationData).map(([destination, coords]) => (
            <InteractivePin
              key={destination}
              position={coords.position}
              label={destination}
              color={
                coords.category === 'beach' || coords.category === 'island' ? '#06b6d4' :
                coords.category === 'mountain' || coords.category === 'adventure' ? '#8b5cf6' :
                coords.category === 'heritage' ? '#f59e0b' :
                coords.category === 'nature' ? '#10b981' : '#3b82f6'
              }
              onClick={handleDestinationClick}
              isSelected={selectedDestination === destination}
            />
          ))}
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={selectedDestination ? 0.1 : 0.3}
            minDistance={2}
            maxDistance={5}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
        
        {/* Color Theme Selector */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
            size="sm"
          >
            <Palette className="w-4 h-4 mr-2" />
            {currentTheme.name}
          </Button>
          
          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-3 space-y-2 min-w-48"
            >
              {Object.entries(colorThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    setColorTheme(key as keyof typeof colorThemes)
                    setShowThemeSelector(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                    colorTheme === key
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.atmosphere }}
                    />
                    <span>{theme.name}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Interactive instructions */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
            🌍 Drag to explore • Scroll to zoom
          </div>
          <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
            📍 Click any destination for detailed info
          </div>
          <div className="bg-purple-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
            🎨 Try different color themes!
          </div>
        </div>
      </div>
      
      {/* Destination Information Modal */}
      <AnimatePresence>
        {showDestinationInfo && selectedDestination && (
          <DestinationInfoModal
            isOpen={showDestinationInfo}
            onClose={closeInfoModal}
            destination={selectedDestination}
          />
        )}
      </AnimatePresence>
    </>
  )
}