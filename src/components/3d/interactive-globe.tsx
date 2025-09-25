'use client'

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Loader } from '@googlemaps/js-api-loader'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Navigation, MapPin, Route, Clock, Star, Users, Calendar, DollarSign, Plane, Hotel, Utensils, Camera, Info, BookOpen, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDestinations, sampleTourPackages } from '@/data/sample-data'

// Destination coordinates mapping
const destinationCoords = {
  'Himalayas': { lat: 28.2380, lng: 83.9956, position: [0.2, 0.8, 0.6] as [number, number, number] },
  'Goa Beaches': { lat: 15.2993, lng: 74.1240, position: [-0.3, 0.5, 0.8] as [number, number, number] },
  'Rajasthan': { lat: 27.0238, lng: 74.2179, position: [0.7, -0.2, 0.7] as [number, number, number] },
  'Kerala': { lat: 10.8505, lng: 76.2711, position: [-0.6, 0.1, 0.8] as [number, number, number] },
  'Andaman': { lat: 11.7401, lng: 92.6586, position: [0.1, -0.7, 0.7] as [number, number, number] },
  'Mumbai': { lat: 19.0760, lng: 72.8777, position: [-0.4, 0.3, 0.9] as [number, number, number] },
  'Delhi': { lat: 28.7041, lng: 77.1025, position: [0.3, 0.6, 0.7] as [number, number, number] },
  'Manali': { lat: 32.2396, lng: 77.1887, position: [0.4, 0.7, 0.6] as [number, number, number] },
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
            <div className={`px-3 py-2 rounded-lg shadow-lg text-sm font-medium transform -translate-x-1/2 -translate-y-8 ${
              isSelected ? 'bg-yellow-400 text-gray-900' : 'bg-white text-gray-800'
            }`}>
              {label}
              {isSelected && (
                <div className="text-xs mt-1">Click to view routes</div>
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

function RouteVisualization({ origin, destination }: { origin: string, destination: string }) {
  const lineRef = useRef<THREE.Line>(null!)
  
  const routeGeometry = useMemo(() => {
    const originCoords = destinationCoords[origin as keyof typeof destinationCoords]
    const destCoords = destinationCoords[destination as keyof typeof destinationCoords]
    
    if (!originCoords || !destCoords) return null
    
    const points = []
    const segments = 50
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      // Create a curved path between destinations
      const x = THREE.MathUtils.lerp(originCoords.position[0], destCoords.position[0], t)
      const y = THREE.MathUtils.lerp(originCoords.position[1], destCoords.position[1], t) + Math.sin(t * Math.PI) * 0.3
      const z = THREE.MathUtils.lerp(originCoords.position[2], destCoords.position[2], t)
      points.push(new THREE.Vector3(x, y, z))
    }
    
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [origin, destination])
  
  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })
  
  if (!routeGeometry) return null
  
  return (
    <line ref={lineRef} geometry={routeGeometry}>
      <lineBasicMaterial color="#fbbf24" transparent opacity={0.8} linewidth={3} />
    </line>
  )
}

function EarthSphere({ selectedDestination }: { selectedDestination: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null!)
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
  })

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Enhanced earth texture with more realistic colors
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, '#1e40af') // Deep ocean blue
    gradient.addColorStop(0.3, '#2563eb') // Ocean blue
    gradient.addColorStop(0.4, '#059669') // Forest green
    gradient.addColorStop(0.6, '#16a34a') // Land green
    gradient.addColorStop(0.7, '#ca8a04') // Desert yellow
    gradient.addColorStop(0.9, '#16a34a') // Land green
    gradient.addColorStop(1, '#1e40af') // Deep ocean blue
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)
    
    // Add realistic continent shapes
    ctx.fillStyle = '#15803d'
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 80 + 20
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Add mountain ranges
    ctx.fillStyle = '#78716c'
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 30 + 10
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Enhanced atmosphere glow */}
      <Sphere args={[1.08, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.15} 
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

interface GoogleMapModalProps {
  isOpen: boolean
  onClose: () => void
  origin: string
  destination: string
}

function GoogleMapModal({ isOpen, onClose, origin, destination }: GoogleMapModalProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [routeInfo, setRouteInfo] = useState<{
    distance: string
    duration: string
    flightTime: string
  } | null>(null)

  useEffect(() => {
    if (!isOpen || !mapRef.current) return

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY',
      version: 'weekly',
      libraries: ['places', 'geometry']
    })

    loader.load().then(() => {
      const originCoords = destinationCoords[origin as keyof typeof destinationCoords]
      const destCoords = destinationCoords[destination as keyof typeof destinationCoords]

      if (!originCoords || !destCoords) return

      const map = new google.maps.Map(mapRef.current!, {
        zoom: 6,
        center: { lat: (originCoords.lat + destCoords.lat) / 2, lng: (originCoords.lng + destCoords.lng) / 2 },
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#242f3e' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#746855' }]
          }
        ]
      })

      // Add markers
      new google.maps.Marker({
        position: { lat: originCoords.lat, lng: originCoords.lng },
        map,
        title: origin,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#10b981"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      })

      new google.maps.Marker({
        position: { lat: destCoords.lat, lng: destCoords.lng },
        map,
        title: destination,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ef4444"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      })

      // Calculate and display route
      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#fbbf24',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      })

      directionsRenderer.setMap(map)

      directionsService.route({
        origin: { lat: originCoords.lat, lng: originCoords.lng },
        destination: { lat: destCoords.lat, lng: destCoords.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result)
          
          const route = result.routes[0]
          const leg = route.legs[0]
          
          // Calculate flight time (approximate)
          const distance = leg.distance?.value || 0
          const flightTimeMinutes = Math.ceil(distance / 900000 * 60) // Rough calculation
          const flightHours = Math.floor(flightTimeMinutes / 60)
          const remainingMinutes = flightTimeMinutes % 60
          
          setRouteInfo({
            distance: leg.distance?.text || 'N/A',
            duration: leg.duration?.text || 'N/A',
            flightTime: flightHours > 0 ? `${flightHours}h ${remainingMinutes}m` : `${remainingMinutes}m`
          })
        }
      })
    })
  }, [isOpen, origin, destination])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Route Information</h2>
            <p className="text-gray-600">{origin} → {destination}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {routeInfo && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Route className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="text-lg font-semibold">{routeInfo.distance}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Driving Time</div>
                  <div className="text-lg font-semibold">{routeInfo.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Navigation className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Flight Time</div>
                  <div className="text-lg font-semibold">{routeInfo.flightTime}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={mapRef} className="flex-1 h-full" />
      </motion.div>
    </motion.div>
  )
}

export default function InteractiveGlobe() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [routeDestination, setRouteDestination] = useState<string | null>(null)
  const [showMapModal, setShowMapModal] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleDestinationClick = useCallback((destination: string) => {
    if (selectedDestination === destination) {
      // If clicking the same destination, deselect it
      setSelectedDestination(null)
      setRouteDestination(null)
    } else if (selectedDestination && selectedDestination !== destination) {
      // If a destination is already selected, set route and show map
      setRouteDestination(destination)
      setShowMapModal(true)
    } else {
      // Select first destination
      setSelectedDestination(destination)
    }
  }, [selectedDestination])

  const closeMapModal = useCallback(() => {
    setShowMapModal(false)
    setRouteDestination(null)
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
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
          
          <Stars 
            radius={300} 
            depth={60} 
            count={2000} 
            factor={8} 
            saturation={0.2} 
            fade
            speed={0.5}
          />
          
          <EarthSphere selectedDestination={selectedDestination} />
          
          {/* Interactive destination pins */}
          {Object.entries(destinationCoords).map(([destination, coords]) => (
            <InteractivePin
              key={destination}
              position={coords.position}
              label={destination}
              color={
                destination.includes('Beach') || destination.includes('Andaman') ? '#06b6d4' :
                destination.includes('Himalaya') || destination.includes('Manali') ? '#8b5cf6' :
                destination.includes('Rajasthan') ? '#f59e0b' :
                destination.includes('Kerala') ? '#10b981' : '#3b82f6'
              }
              onClick={handleDestinationClick}
              isSelected={selectedDestination === destination}
            />
          ))}
          
          {/* Route visualization */}
          {selectedDestination && routeDestination && (
            <RouteVisualization 
              origin={selectedDestination} 
              destination={routeDestination} 
            />
          )}
          
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
          {!selectedDestination && (
            <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
              📍 Click any destination to select
            </div>
          )}
          {selectedDestination && !routeDestination && (
            <div className="bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
              ✈️ Click another destination to see route
            </div>
          )}
        </div>
        
        {/* Selected destination info */}
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">{selectedDestination}</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedDestination(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Selected destination. Click another pin to see route and travel information.
            </p>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">
                {destinationCoords[selectedDestination as keyof typeof destinationCoords]?.lat.toFixed(2)}°, 
                {destinationCoords[selectedDestination as keyof typeof destinationCoords]?.lng.toFixed(2)}°
              </span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Google Maps Modal */}
      <AnimatePresence>
        {showMapModal && selectedDestination && routeDestination && (
          <GoogleMapModal
            isOpen={showMapModal}
            onClose={closeMapModal}
            origin={selectedDestination}
            destination={routeDestination}
          />
        )}
      </AnimatePresence>
    </>
  )
}