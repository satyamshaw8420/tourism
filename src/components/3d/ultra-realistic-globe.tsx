'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Enhanced destination data with precise spherical coordinates
const destinations = [
  { 
    name: 'Paris', 
    country: 'France', 
    lat: 48.8566, 
    lng: 2.3522,
    phi: (90 - 48.8566) * (Math.PI / 180),
    theta: (2.3522 + 180) * (Math.PI / 180)
  },
  { 
    name: 'Tokyo', 
    country: 'Japan', 
    lat: 35.6762, 
    lng: 139.6503,
    phi: (90 - 35.6762) * (Math.PI / 180),
    theta: (139.6503 + 180) * (Math.PI / 180)
  },
  { 
    name: 'New York', 
    country: 'USA', 
    lat: 40.7128, 
    lng: -74.0060,
    phi: (90 - 40.7128) * (Math.PI / 180),
    theta: (-74.0060 + 180) * (Math.PI / 180)
  },
  { 
    name: 'Sydney', 
    country: 'Australia', 
    lat: -33.8688, 
    lng: 151.2093,
    phi: (90 - (-33.8688)) * (Math.PI / 180),
    theta: (151.2093 + 180) * (Math.PI / 180)
  },
  { 
    name: 'London', 
    country: 'UK', 
    lat: 51.5074, 
    lng: -0.1278,
    phi: (90 - 51.5074) * (Math.PI / 180),
    theta: (-0.1278 + 180) * (Math.PI / 180)
  },
  { 
    name: 'Rio de Janeiro', 
    country: 'Brazil', 
    lat: -22.9068, 
    lng: -43.1729,
    phi: (90 - (-22.9068)) * (Math.PI / 180),
    theta: (-43.1729 + 180) * (Math.PI / 180)
  }
];

// Generate ultra-realistic Earth texture
const generateEarthTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Create gradient background (ocean)
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGradient.addColorStop(0, '#001122');
  oceanGradient.addColorStop(0.3, '#003366');
  oceanGradient.addColorStop(0.7, '#004488');
  oceanGradient.addColorStop(1, '#001122');
  
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw continents with realistic shapes and colors
  const continents = [
    // North America
    { x: 200, y: 200, width: 300, height: 250, color: '#2d5016' },
    // South America  
    { x: 250, y: 450, width: 150, height: 300, color: '#3d6b1f' },
    // Europe
    { x: 600, y: 180, width: 120, height: 100, color: '#4a7c2a' },
    // Africa
    { x: 580, y: 280, width: 180, height: 350, color: '#8b6f28' },
    // Asia
    { x: 750, y: 150, width: 400, height: 300, color: '#2d5016' },
    // Australia
    { x: 950, y: 480, width: 120, height: 80, color: '#8b6f28' }
  ];

  continents.forEach(continent => {
    // Create continent gradient
    const continentGradient = ctx.createRadialGradient(
      continent.x + continent.width/2, 
      continent.y + continent.height/2, 
      0,
      continent.x + continent.width/2, 
      continent.y + continent.height/2, 
      Math.max(continent.width, continent.height)/2
    );
    continentGradient.addColorStop(0, continent.color);
    continentGradient.addColorStop(0.7, continent.color);
    continentGradient.addColorStop(1, '#1a3009');

    ctx.fillStyle = continentGradient;
    
    // Draw organic continent shapes
    ctx.beginPath();
    ctx.ellipse(
      continent.x + continent.width/2,
      continent.y + continent.height/2,
      continent.width/2,
      continent.height/2,
      0, 0, 2 * Math.PI
    );
    ctx.fill();

    // Add mountain ranges (darker spots)
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = '#1a3009';
      const mx = continent.x + Math.random() * continent.width;
      const my = continent.y + Math.random() * continent.height;
      ctx.beginPath();
      ctx.arc(mx, my, 5 + Math.random() * 10, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  // Add city lights (small bright spots)
  ctx.fillStyle = '#ffdd44';
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Add ice caps
  const iceGradient = ctx.createRadialGradient(canvas.width/2, 0, 0, canvas.width/2, 0, 100);
  iceGradient.addColorStop(0, '#ffffff');
  iceGradient.addColorStop(1, 'rgba(255,255,255,0)');
  
  ctx.fillStyle = iceGradient;
  ctx.fillRect(0, 0, canvas.width, 100);

  const iceGradientSouth = ctx.createRadialGradient(canvas.width/2, canvas.height, 0, canvas.width/2, canvas.height, 100);
  iceGradientSouth.addColorStop(0, '#ffffff');
  iceGradientSouth.addColorStop(1, 'rgba(255,255,255,0)');
  
  ctx.fillStyle = iceGradientSouth;
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  return new THREE.CanvasTexture(canvas);
};

// Generate cloud texture
const generateCloudTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create cloud patterns
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 20 + Math.random() * 40;
    const alpha = 0.1 + Math.random() * 0.3;
    
    const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    cloudGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = cloudGradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
};

// Generate normal map for realistic surface details
const generateNormalMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base normal color (pointing up)
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add surface variations
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 1 + Math.random() * 3;
    
    // Random normal direction
    const r = Math.floor(128 + Math.random() * 127);
    const g = Math.floor(128 + Math.random() * 127);
    const b = Math.floor(200 + Math.random() * 55);
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
};

// Animated Hand Component
interface AnimatedHandProps {
  targetDestination: typeof destinations[0] | null;
  globeRadius: number;
}

const AnimatedHand: React.FC<AnimatedHandProps> = ({ targetDestination, globeRadius }) => {
  const handRef = useRef<THREE.Group>(null);
  const [currentPosition, setCurrentPosition] = useState({ phi: 0, theta: 0 });
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    if (targetDestination && handRef.current) {
      setIsWalking(true);
      
      // Animate to target destination
      const startPhi = currentPosition.phi;
      const startTheta = currentPosition.theta;
      const targetPhi = targetDestination.phi;
      const targetTheta = targetDestination.theta;
      
      let progress = 0;
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        // Smooth interpolation
        const easeInOut = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentPhi = startPhi + (targetPhi - startPhi) * easeInOut;
        const currentTheta = startTheta + (targetTheta - startTheta) * easeInOut;
        
        setCurrentPosition({ phi: currentPhi, theta: currentTheta });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsWalking(false);
        }
      };
      
      animate();
    }
  }, [targetDestination, currentPosition.phi, currentPosition.theta]);

  useFrame((state) => {
    if (handRef.current) {
      const radius = globeRadius + 0.3;
      
      // Convert spherical to cartesian coordinates
      const x = radius * Math.sin(currentPosition.phi) * Math.cos(currentPosition.theta);
      const y = radius * Math.cos(currentPosition.phi);
      const z = radius * Math.sin(currentPosition.phi) * Math.sin(currentPosition.theta);
      
      handRef.current.position.set(x, y, z);
      
      // Make hand look at the globe center
      handRef.current.lookAt(0, 0, 0);
      
      // Add walking animation
      if (isWalking) {
        const walkCycle = Math.sin(state.clock.elapsedTime * 8) * 0.1;
        handRef.current.rotation.z += walkCycle;
      }
      
      // Pointing gesture when not walking
      if (!isWalking && targetDestination) {
        handRef.current.rotation.x = -Math.PI / 4; // Point downward
      }
    }
  });

  return (
    <group ref={handRef}>
      {/* Hand mesh */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.03, 0.1, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Fingers */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.005, 0.008, 0.03, 6]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Pointing finger (index) */}
      <mesh position={[0, 0.03, 0.02]} rotation={[-Math.PI/6, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.006, 0.04, 6]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Glove/sleeve */}
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.035, 0.025, 0.06, 8]} />
        <meshStandardMaterial color="#2c5aa0" />
      </mesh>
    </group>
  );
};

// Ultra Realistic Globe Component
interface UltraRealisticGlobeProps {
  selectedDestination: string | null;
  onDestinationClick: (destination: string) => void;
}

const UltraRealisticGlobe: React.FC<UltraRealisticGlobeProps> = ({ 
  selectedDestination, 
  onDestinationClick 
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  const globeRadius = 2;
  
  // Generate textures
  const earthTexture = useMemo(() => generateEarthTexture(), []);
  const cloudTexture = useMemo(() => generateCloudTexture(), []);
  const normalMap = useMemo(() => generateNormalMap(), []);
  
  // Find target destination for hand animation
  const targetDestination = selectedDestination 
    ? destinations.find(dest => dest.name === selectedDestination) || null
    : null;

  useFrame((state) => {
    // Rotate globe slowly
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    
    // Rotate clouds slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.003;
    }
  });

  const handleGlobeClick = (event: any) => {
    event.stopPropagation();
    
    // Get intersection point
    const point = event.point;
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(point);
    
    // Convert to lat/lng
    const lat = 90 - (spherical.phi * 180) / Math.PI;
    const lng = ((spherical.theta * 180) / Math.PI) - 180;
    
    // Find closest destination
    let closestDest = destinations[0];
    let minDistance = Math.abs(lat - destinations[0].lat) + Math.abs(lng - destinations[0].lng);
    
    destinations.forEach(dest => {
      const distance = Math.abs(lat - dest.lat) + Math.abs(lng - dest.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestDest = dest;
      }
    });
    
    onDestinationClick(closestDest.name);
  };

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh
        ref={globeRef}
        onClick={handleGlobeClick}
      >
        <sphereGeometry args={[globeRadius, 64, 32]} />
        <meshStandardMaterial
          map={earthTexture}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[globeRadius + 0.01, 64, 32]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      
      {/* Destination markers */}
      {destinations.map((dest, index) => {
        const x = globeRadius * Math.sin(dest.phi) * Math.cos(dest.theta);
        const y = globeRadius * Math.cos(dest.phi);
        const z = globeRadius * Math.sin(dest.phi) * Math.sin(dest.theta);
        
        const isSelected = selectedDestination === dest.name;
        
        return (
          <group key={dest.name} position={[x, y, z]}>
            {/* Marker pin */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onDestinationClick(dest.name);
              }}
            >
              <coneGeometry args={[0.02, 0.08, 8]} />
              <meshStandardMaterial 
                color={isSelected ? "#ff4444" : "#ffaa00"}
                emissive={isSelected ? "#440000" : "#221100"}
              />
            </mesh>
            
            {/* Pulsing ring for selected destination */}
            {isSelected && (
              <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.05, 0]}>
                <ringGeometry args={[0.03, 0.06, 16]} />
                <meshBasicMaterial color="#ff4444" transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        );
      })}
      
      {/* Animated Hand */}
      <AnimatedHand 
        targetDestination={targetDestination}
        globeRadius={globeRadius}
      />
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4488ff" />
    </group>
  );
};

// Main Component
const UltraRealisticGlobeScene: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000011']} />
        
        {/* Stars background */}
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        
        {/* Ultra Realistic Globe */}
        <UltraRealisticGlobe
          selectedDestination={selectedDestination}
          onDestinationClick={setSelectedDestination}
        />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Destination Info Panel */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20"
        >
          <h3 className="text-lg font-bold">{selectedDestination}</h3>
          <p className="text-sm opacity-80">
            {destinations.find(d => d.name === selectedDestination)?.country}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs">Hand is walking to this destination</span>
          </div>
        </motion.div>
      )}
      
      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg text-sm">
        <p>Click on destinations to see the hand walk there!</p>
      </div>
    </div>
  );
};

export default UltraRealisticGlobeScene;