'use client'

import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars, Float, Html, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Navigation, MapPin, Route, Clock, Star, Users, Calendar, 
  DollarSign, Plane, Hotel, Utensils, Camera, Info, BookOpen, 
  CreditCard, CheckCircle, AlertCircle, Wifi, Car, Shield 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDestinations, sampleTourPackages } from '@/data/sample-data'
import Link from 'next/link'

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
    highlights: ['Beaches', 'Nightlife', 'Water Sports'],
    accommodationType: 'Beach Resorts',
    avgStay: '4-7 days'
  },
  'Rajasthan': { 
    lat: 27.0238, 
    lng: 74.2179, 
    position: [0.7, -0.2, 0.7] as [number, number, number],
    budgetRange: { min: 12000, max: 35000 },
    bestTime: 'Oct-Mar',
    category: 'heritage',
    highlights: ['Palaces', 'Forts', 'Desert Safari'],
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
    highlights: ['Backwaters', 'Spices', 'Ayurveda'],
    accommodationType: 'Houseboats',
    avgStay: '6-8 days'
  },
  'Andaman Islands': { 
    lat: 11.7401, 
    lng: 92.6586, 
    position: [0.1, -0.7, 0.7] as [number, number, number],
    budgetRange: { min: 20000, max: 50000 },
    bestTime: 'Oct-May',
    category: 'island',
    highlights: ['Coral Reefs', 'Scuba Diving', 'Pristine Beaches'],
    accommodationType: 'Beach Resorts',
    avgStay: '5-7 days'
  },
  'Mumbai': { 
    lat: 19.0760, 
    lng: 72.8777, 
    position: [-0.4, 0.3, 0.9] as [number, number, number],
    budgetRange: { min: 15000, max: 40000 },
    bestTime: 'Nov-Feb',
    category: 'city',
    highlights: ['Bollywood', 'Street Food', 'Architecture'],
    accommodationType: 'City Hotels',
    avgStay: '3-5 days'
  },
  'Ladakh': { 
    lat: 34.1526, 
    lng: 77.5770, 
    position: [0.4, 0.9, 0.2] as [number, number, number],
    budgetRange: { min: 25000, max: 60000 },
    bestTime: 'Jun-Sep',
    category: 'adventure',
    highlights: ['High Altitude', 'Monasteries', 'Adventure Sports'],
    accommodationType: 'Camps & Guesthouses',
    avgStay: '8-12 days'
  }
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

function RealisticEarthSphere({ selectedDestination }: { selectedDestination: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const atmosphereRef = useRef<THREE.Mesh>(null!)
  const { mouse } = useThree()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slower rotation when destination is selected
      const rotationSpeed = selectedDestination ? 0.05 : 0.15
      meshRef.current.rotation.y += delta * rotationSpeed
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.1,
        0.02
      )
    }
    
    // Animate atmosphere
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.1
    }
  })

  // Create realistic Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    
    // Base ocean color with depth variation
    const oceanGradient = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 1024)
    oceanGradient.addColorStop(0, '#1e3a8a') // Deep blue center
    oceanGradient.addColorStop(0.3, '#1e40af') // Medium blue
    oceanGradient.addColorStop(0.6, '#2563eb') // Lighter blue
    oceanGradient.addColorStop(1, '#1e3a8a') // Deep blue edges
    
    ctx.fillStyle = oceanGradient
    ctx.fillRect(0, 0, 2048, 1024)
    
    // More detailed continent shapes based on actual Earth geography
    const continents = [
      // North America - more detailed shape
      { x: 150, y: 200, width: 280, height: 220, color: '#2d5016', name: 'North America' },
      { x: 120, y: 150, width: 200, height: 120, color: '#3d6019', name: 'Canada' }, // Canada
      { x: 50, y: 280, width: 80, height: 60, color: '#4a7c20', name: 'Alaska' }, // Alaska
      
      // South America - elongated continent
      { x: 350, y: 500, width: 140, height: 380, color: '#2d5016', name: 'South America' },
      { x: 320, y: 480, width: 60, height: 100, color: '#3d6019', name: 'Colombia/Venezuela' },
      
      // Europe - smaller, detailed
      { x: 850, y: 180, width: 140, height: 100, color: '#3d6019', name: 'Europe' },
      { x: 800, y: 160, width: 80, height: 60, color: '#4a7c20', name: 'Scandinavia' },
      
      // Asia - large and diverse
      { x: 1000, y: 120, width: 600, height: 350, color: '#2d5016', name: 'Asia' },
      { x: 1200, y: 80, width: 300, height: 120, color: '#4a7c20', name: 'Siberia' },
      { x: 1100, y: 200, width: 80, height: 120, color: '#8b7355', name: 'India' },
      { x: 1300, y: 180, width: 200, height: 180, color: '#3d6019', name: 'China' },
      
      // Africa - distinctive shape
      { x: 820, y: 350, width: 180, height: 400, color: '#3d6019', name: 'Africa' },
      { x: 800, y: 320, width: 120, height: 80, color: '#ca8a04', name: 'Sahara' }, // Sahara Desert
      { x: 860, y: 600, width: 100, height: 120, color: '#2d5016', name: 'Southern Africa' },
      
      // Australia and Oceania
      { x: 1400, y: 650, width: 180, height: 120, color: '#4a7c20', name: 'Australia' },
      { x: 1500, y: 550, width: 40, height: 30, color: '#3d6019', name: 'New Guinea' },
      
      // Greenland - ice covered
      { x: 550, y: 80, width: 120, height: 180, color: '#e5e7eb', name: 'Greenland' },
      
      // Antarctica - ice continent
      { x: 0, y: 900, width: 2048, height: 124, color: '#f3f4f6', name: 'Antarctica' }
    ]
    
    // Draw continents with more realistic coloring
    continents.forEach(continent => {
      ctx.fillStyle = continent.color
      
      // Create more organic continent shapes
      ctx.beginPath()
      ctx.roundRect(continent.x, continent.y, continent.width, continent.height, 10)
      ctx.fill()
      
      // Add coastal variations and islands
      for (let i = 0; i < 25; i++) {
        const x = continent.x + Math.random() * continent.width
        const y = continent.y + Math.random() * continent.height
        const size = Math.random() * 15 + 3
        
        ctx.fillStyle = continent.color
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Add small islands around continents
      for (let i = 0; i < 8; i++) {
        const offsetX = (Math.random() - 0.5) * continent.width * 0.3
        const offsetY = (Math.random() - 0.5) * continent.height * 0.3
        const x = continent.x + continent.width / 2 + offsetX
        const y = continent.y + continent.height / 2 + offsetY
        const size = Math.random() * 8 + 2
        
        ctx.fillStyle = continent.color
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    })
    
    // Add major mountain ranges with realistic placement
    const mountainRanges = [
      // Himalayas
      { x: 1150, y: 280, width: 250, height: 25, color: '#6b7280' },
      // Andes
      { x: 365, y: 500, width: 15, height: 350, color: '#6b7280' },
      // Rocky Mountains
      { x: 170, y: 200, width: 25, height: 180, color: '#6b7280' },
      // Alps
      { x: 880, y: 200, width: 60, height: 15, color: '#6b7280' },
      // Urals
      { x: 1020, y: 140, width: 15, height: 120, color: '#6b7280' },
      // Atlas Mountains
      { x: 780, y: 330, width: 80, height: 15, color: '#6b7280' }
    ]
    
    mountainRanges.forEach(range => {
      // Create mountain gradient
      const mountainGradient = ctx.createLinearGradient(
        range.x, range.y, 
        range.x + range.width, range.y + range.height
      )
      mountainGradient.addColorStop(0, '#9ca3af')
      mountainGradient.addColorStop(0.5, '#6b7280')
      mountainGradient.addColorStop(1, '#4b5563')
      
      ctx.fillStyle = mountainGradient
      ctx.fillRect(range.x, range.y, range.width, range.height)
    })
    
    // Add major rivers
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    
    // Amazon River
    ctx.beginPath()
    ctx.moveTo(350, 580)
    ctx.quadraticCurveTo(400, 570, 450, 580)
    ctx.stroke()
    
    // Nile River
    ctx.beginPath()
    ctx.moveTo(900, 380)
    ctx.lineTo(920, 500)
    ctx.stroke()
    
    // Add atmospheric/cloud effects
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 2048
      const y = Math.random() * 1024
      const width = Math.random() * 120 + 30
      const height = Math.random() * 40 + 10
      
      // Create cloud-like shapes
      ctx.beginPath()
      ctx.roundRect(x, y, width, height, height / 2)
      ctx.fill()
    }
    
    // Add city lights effect (small bright dots)
    ctx.fillStyle = 'rgba(255, 255, 150, 0.8)'
    const majorCities = [
      { x: 200, y: 250 }, // New York
      { x: 380, y: 600 }, // São Paulo
      { x: 900, y: 220 }, // London
      { x: 1200, y: 250 }, // Beijing
      { x: 1450, y: 680 }, // Sydney
      { x: 850, y: 450 }, // Cairo
    ]
    
    majorCities.forEach(city => {
      ctx.beginPath()
      ctx.arc(city.x, city.y, 3, 0, Math.PI * 2)
      ctx.fill()
    })
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  // Create normal map for surface details
  const normalTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Create height variation for normal mapping
    const imageData = ctx.createImageData(1024, 512)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = Math.random() * 0.3 + 0.7
      imageData.data[i] = noise * 255     // R
      imageData.data[i + 1] = noise * 255 // G  
      imageData.data[i + 2] = 255         // B
      imageData.data[i + 3] = 255         // A
    }
    ctx.putImageData(imageData, 0, 0)
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <group>
      {/* Main Earth sphere */}
      <Sphere ref={meshRef} args={[1, 128, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial 
          map={earthTexture}
          normalMap={normalTexture}
          normalScale={new THREE.Vector2(0.4, 0.4)}
          shininess={30}
          specular={new THREE.Color('#6bb6ff')}
          transparent
          opacity={0.98}
        />
      </Sphere>
      
      {/* Inner atmosphere - subtle blue glow */}
      <Sphere args={[1.01, 64, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.08} 
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Mid atmosphere - slightly more visible */}
      <Sphere args={[1.04, 64, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#4a90e2" 
          transparent 
          opacity={0.06} 
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer atmosphere glow - creates the atmospheric rim */}
      <Sphere ref={atmosphereRef} args={[1.08, 64, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#2563eb" 
          transparent 
          opacity={0.04} 
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Cloud layer - rotating clouds */}
      <Sphere args={[1.003, 64, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15}
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

  if (!destData) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="relative z-10 p-8 text-white h-full flex items-end">
            <div>
              <h2 className="text-3xl font-bold mb-2">{destination}</h2>
              <div className="flex items-center space-x-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {destData.category.charAt(0).toUpperCase() + destData.category.slice(1)}
                </span>
                <span className="text-sm opacity-90">Best time: {destData.bestTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Quick Info Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
                <h3 className="text-lg font-semibold">Budget Range</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ₹{destData.budgetRange.min.toLocaleString()} - ₹{destData.budgetRange.max.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-1">Per person for {destData.avgStay}</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Hotel className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold">Accommodation</h3>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {destData.accommodationType}
              </div>
              <p className="text-sm text-gray-600 mt-1">Average stay: {destData.avgStay}</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
                <h3 className="text-lg font-semibold">Rating</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-yellow-600">
                  {destinationInfo?.rating || 4.5}
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {destinationInfo?.reviewCount || 1250} reviews
              </p>
            </Card>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-purple-600" />
              Key Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {destData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Tours */}
          {availableTours.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Available Tours
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {availableTours.slice(0, 4).map((tour, index) => (
                  <Card key={index} className="p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900 line-clamp-2">{tour.title}</h4>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{tour.price.toLocaleString()}</div>
                        {tour.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">₹{tour.originalPrice.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tour.duration} days
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Max {tour.maxGroupSize}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({tour.reviewCount})</span>
                      </div>
                      <Link href={`/tours/${tour.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/destinations?search=${encodeURIComponent(destination)}`} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Explore Destination
              </Button>
            </Link>
            <Link href={`/tours?destination=${encodeURIComponent(destination)}`} className="flex-1">
              <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
                <Plane className="w-4 h-4 mr-2" />
                Browse Tours
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RealisticInteractiveGlobe() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [showDestinationInfo, setShowDestinationInfo] = useState(false)

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

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <div className="h-full w-full relative">
        <Canvas 
          camera={{ position: [0, 0, 3], fov: 60 }}
          className="cursor-pointer"
        >
          {/* Enhanced lighting setup for realistic Earth */}
          <ambientLight intensity={0.2} color="#ffffff" />
          
          {/* Main sun light - directional light */}
          <directionalLight 
            position={[5, 3, 5]} 
            intensity={3.0} 
            castShadow 
            color="#ffffff"
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Secondary fill light - subtle blue */}
          <pointLight 
            position={[-3, -2, -3]} 
            intensity={0.8} 
            color="#4a90e2" 
            distance={10}
          />
          
          {/* Rim light for atmospheric effect */}
          <pointLight 
            position={[0, 5, -5]} 
            intensity={0.6} 
            color="#87ceeb" 
            distance={8}
          />
          
          <Stars 
            radius={300} 
            depth={60} 
            count={2000} 
            factor={8} 
            saturation={0.2} 
            fade
            speed={0.5}
          />
          
          <Suspense fallback={null}>
            <RealisticEarthSphere selectedDestination={selectedDestination} />
          </Suspense>
          
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
        
        {/* Interactive instructions */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
            🌍 Drag to explore • Scroll to zoom
          </div>
          <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
            📍 Click any destination for detailed info
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