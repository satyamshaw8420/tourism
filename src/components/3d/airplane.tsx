'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function FlightPath({ points, color = '#3b82f6' }: { points: THREE.Vector3[], color?: string }) {
  const lineRef = useRef<THREE.Line>(null!)
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })
  
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points)
    return geom
  }, [points])
  
  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.5} linewidth={2} />
    </line>
  )
}

function AnimatedAirplane({ path, speed = 1, color = '#ffffff' }: { 
  path: THREE.Vector3[], 
  speed?: number, 
  color?: string 
}) {
  const meshRef = useRef<THREE.Group>(null!)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useFrame((state, delta) => {
    if (meshRef.current && path.length > 1) {
      const time = (state.clock.elapsedTime * speed) % path.length
      const index = Math.floor(time)
      const nextIndex = (index + 1) % path.length
      const t = time - index
      
      const currentPos = path[index]
      const nextPos = path[nextIndex]
      
      if (currentPos && nextPos) {
        meshRef.current.position.lerpVectors(currentPos, nextPos, t)
        
        // Calculate direction for airplane rotation
        const direction = new THREE.Vector3().subVectors(nextPos, currentPos).normalize()
        meshRef.current.lookAt(
          meshRef.current.position.x + direction.x,
          meshRef.current.position.y + direction.y,
          meshRef.current.position.z + direction.z
        )
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Trail width={0.05} length={10} color={color} attenuation={(t) => t * t}>
        <group ref={meshRef}>
          {/* Airplane body */}
          <mesh>
            <boxGeometry args={[0.4, 0.08, 0.08]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Wings */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.25, 0.02, 0.02]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Tail */}
          <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Engine glow */}
          <pointLight position={[0.2, 0, 0]} intensity={0.5} color="#60a5fa" distance={1} />
          
          {/* Sparkles for magical effect */}
          <Sparkles count={10} scale={0.3} size={2} speed={0.5} opacity={0.6} color="#fbbf24" />
        </group>
      </Trail>
    </Float>
  )
}

function CloudParticles() {
  const cloudsRef = useRef<THREE.Group>(null!)
  
  const cloudPositions = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.3
    }))
  }, [])
  
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.001
        cloud.rotation.y += 0.002
      })
    }
  })
  
  return (
    <group ref={cloudsRef}>
      {cloudPositions.map((cloud, i) => (
        <Float key={i} speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh position={cloud.position} scale={cloud.scale}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Enhanced3DAirplane() {
  // Define flight paths for multiple airplanes
  const flightPaths = useMemo(() => {
    const path1 = [
      new THREE.Vector3(-3, 0.5, 0),
      new THREE.Vector3(-1, 1, 1),
      new THREE.Vector3(1, 0.5, 0.5),
      new THREE.Vector3(3, 0, 0)
    ]
    
    const path2 = [
      new THREE.Vector3(-2, -0.5, 1),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(2, 0.5, 0.5),
      new THREE.Vector3(3, -0.2, -0.5)
    ]
    
    const path3 = [
      new THREE.Vector3(-3, 0, -1),
      new THREE.Vector3(-0.5, 0.8, 0),
      new THREE.Vector3(1.5, 0.2, 1),
      new THREE.Vector3(3, 0.5, 0.5)
    ]
    
    return [path1, path2, path3]
  }, [])

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#fbbf24" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#3b82f6" />
        
        {/* Background gradient sphere */}
        <mesh>
          <sphereGeometry args={[50]} />
          <meshBasicMaterial 
            color={new THREE.Color().setHSL(0.6, 0.3, 0.9)} 
            side={THREE.BackSide} 
            transparent 
            opacity={0.3}
          />
        </mesh>
        
        <CloudParticles />
        
        {/* Flight paths */}
        {flightPaths.map((path, i) => (
          <FlightPath 
            key={`path-${i}`} 
            points={path} 
            color={['#3b82f6', '#8b5cf6', '#ef4444'][i]} 
          />
        ))}
        
        {/* Animated airplanes */}
        <AnimatedAirplane path={flightPaths[0]} speed={0.8} color="#ffffff" />
        <AnimatedAirplane path={flightPaths[1]} speed={1.2} color="#fbbf24" />
        <AnimatedAirplane path={flightPaths[2]} speed={1.0} color="#8b5cf6" />
        
        {/* Floating particles */}
        <Sparkles 
          count={100} 
          scale={10} 
          size={3} 
          speed={0.2} 
          opacity={0.4} 
          color="#60a5fa"
        />
      </Canvas>
    </div>
  )
}