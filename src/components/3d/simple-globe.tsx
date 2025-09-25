'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Color themes for the globe
const colorThemes = {
  classic: {
    name: 'Classic Earth',
    ocean: '#1e40af',
    land: '#059669',
    atmosphere: '#60a5fa',
    background: '#000014'
  },
  dark: {
    name: 'Dark Ocean',
    ocean: '#0f172a',
    land: '#1e293b',
    atmosphere: '#334155',
    background: '#020617'
  },
  neon: {
    name: 'Neon Cyber',
    ocean: '#1a1a2e',
    land: '#16213e',
    atmosphere: '#0f3460',
    background: '#0d1117'
  },
  sunset: {
    name: 'Sunset Vibes',
    ocean: '#7c2d12',
    land: '#ea580c',
    atmosphere: '#fb923c',
    background: '#431407'
  },
  forest: {
    name: 'Deep Forest',
    ocean: '#064e3b',
    land: '#166534',
    atmosphere: '#22c55e',
    background: '#052e16'
  },
  arctic: {
    name: 'Arctic Blue',
    ocean: '#0c4a6e',
    land: '#0369a1',
    atmosphere: '#0ea5e9',
    background: '#082f49'
  }
}

function TravelPin({ position, label, color = '#ff6b6b' }: { position: [number, number, number], label: string, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.5 : 0.2} />
        </mesh>
        
        {hovered && (
          <Html>
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-800 transform -translate-x-1/2 -translate-y-8">
              {label}
            </div>
          </Html>
        )}
        
        <mesh>
          <ringGeometry args={[0.03, 0.05]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function EarthSphere({ colorTheme }: { colorTheme: keyof typeof colorThemes }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { mouse } = useThree()
  const theme = colorThemes[colorTheme]
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
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
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, theme.ocean)
    gradient.addColorStop(0.2, theme.ocean)
    gradient.addColorStop(0.4, theme.land)
    gradient.addColorStop(0.6, theme.land)
    gradient.addColorStop(0.8, theme.land)
    gradient.addColorStop(1, theme.ocean)
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 512)
    
    const landColor = new THREE.Color(theme.land)
    landColor.offsetHSL(0, 0, 0.1)
    ctx.fillStyle = landColor.getStyle()
    
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const size = Math.random() * 100 + 20
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
          opacity={0.9}
        />
      </Sphere>
      
      <Sphere args={[1.05, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color={theme.atmosphere} 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide}
        />
      </Sphere>
      
      <TravelPin position={[0.2, 0.8, 0.6]} label="Himalayas" color="#8b5cf6" />
      <TravelPin position={[-0.3, 0.5, 0.8]} label="Goa Beaches" color="#06b6d4" />
      <TravelPin position={[0.7, -0.2, 0.7]} label="Rajasthan" color="#f59e0b" />
      <TravelPin position={[-0.6, 0.1, 0.8]} label="Kerala" color="#10b981" />
      <TravelPin position={[0.1, -0.7, 0.7]} label="Andaman" color="#3b82f6" />
    </group>
  )
}

export default function SimpleGlobe() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [colorTheme, setColorTheme] = useState<keyof typeof colorThemes>('dark')
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
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
          saturation={0.2} 
          fade
          speed={0.5}
        />
        
        <EarthSphere colorTheme={colorTheme} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
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
            className="bg-white/10 backdrop-blur-md rounded-lg p-3 space-y-2 min-w-48 z-10"
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
      
      {/* Interactive hint */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
          🌍 Drag to explore • Scroll to zoom
        </div>
        <div className="bg-purple-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
          🎨 Try different color themes!
        </div>
      </div>
    </div>
  )
}