'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { sampleDestinations } from '@/data/sample-data';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, Plane } from 'lucide-react';

// Use actual destination data from your project
const destinations = sampleDestinations.slice(0, 10).map(dest => ({
  id: dest.id,
  name: dest.name,
  country: dest.location.address.split(',').pop()?.trim() || 'India',
  lat: dest.location.lat,
  lng: dest.location.lng,
  category: dest.category,
  image: dest.image
}));

// Generate high-quality world map texture
const generateWorldMapTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Ocean background
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGradient.addColorStop(0, '#1e3a8a');
  oceanGradient.addColorStop(0.5, '#1e40af');
  oceanGradient.addColorStop(1, '#1e3a8a');
  
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Detailed continent shapes
  const continents = [
    { 
      path: [[150, 200], [300, 180], [450, 220], [400, 350], [200, 380], [120, 300]],
      color: '#166534'
    },
    { 
      path: [[280, 450], [350, 430], [380, 550], [340, 700], [280, 720], [250, 600]],
      color: '#15803d'
    },
    { 
      path: [[580, 160], [680, 140], [720, 180], [700, 220], [600, 240], [560, 200]],
      color: '#16a34a'
    },
    { 
      path: [[580, 280], [680, 260], [720, 350], [700, 550], [620, 580], [560, 400]],
      color: '#ca8a04'
    },
    { 
      path: [[720, 140], [1100, 120], [1200, 200], [1150, 350], [900, 380], [750, 300]],
      color: '#166534'
    },
    { 
      path: [[1000, 480], [1100, 470], [1120, 520], [1080, 550], [980, 540]],
      color: '#dc2626'
    }
  ];

  continents.forEach(continent => {
    ctx.fillStyle = continent.color;
    ctx.beginPath();
    ctx.moveTo(continent.path[0][0], continent.path[0][1]);
    
    for (let i = 1; i < continent.path.length; i++) {
      ctx.lineTo(continent.path[i][0], continent.path[i][1]);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = '#065f46';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  return new THREE.CanvasTexture(canvas);
};

// Convert lat/lng to spherical coordinates
const latLngToSphere = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return { x, y, z };
};

// Floating Marker Component
interface FloatingMarkerProps {
  dest: any;
  index: number;
  globeRadius: number;
  isSelected: boolean;
  hoveredDestination: string | null;
  onDestinationClick: (name: string) => void;
  onDestinationHover: (name: string | null) => void;
}

const FloatingMarker: React.FC<FloatingMarkerProps> = ({
  dest,
  index,
  globeRadius,
  isSelected,
  hoveredDestination,
  onDestinationClick,
  onDestinationHover
}) => {
  const markerRef = useRef<THREE.Group>(null);
  const basePosition = latLngToSphere(dest.lat, dest.lng, globeRadius + 0.08);

  useFrame((state) => {
    if (markerRef.current) {
      const time = state.clock.elapsedTime;
      // Floating animation
      const floatY = Math.sin(time * 2 + index * 0.5) * 0.05;
      const floatX = Math.cos(time * 1.5 + index * 0.3) * 0.02;
      const floatZ = Math.sin(time * 1.8 + index * 0.8) * 0.02;
      const rotateY = Math.sin(time * 0.8 + index * 0.7) * 0.1;
      
      markerRef.current.position.set(
        basePosition.x + floatX,
        basePosition.y + floatY,
        basePosition.z + floatZ
      );
      markerRef.current.rotation.y = rotateY;
    }
  });

  return (
    <group ref={markerRef}>
      {/* Simple floating marker sphere */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onDestinationClick(dest.name);
        }}
        onPointerEnter={() => onDestinationHover(dest.name)}
        onPointerLeave={() => onDestinationHover(null)}
      >
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshPhongMaterial 
          color={isSelected ? "#ff0000" : (hoveredDestination === dest.name ? "#ffaa00" : "#00aaff")}
          emissive={isSelected ? "#440000" : (hoveredDestination === dest.name ? "#442200" : "#002244")}
        />
      </mesh>
      
      {/* Subtle glow effect for selected destination */}
      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial 
            color="#ff0000" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// High Quality Globe Component
interface HighQualityGlobeProps {
  selectedDestination: string | null;
  onDestinationClick: (destination: string) => void;
  hoveredDestination: string | null;
  onDestinationHover: (destination: string | null) => void;
}

const HighQualityGlobe: React.FC<HighQualityGlobeProps> = ({ 
  selectedDestination, 
  onDestinationClick,
  hoveredDestination,
  onDestinationHover
}) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const globeRadius = 2;
  
  // Generate high-quality world map texture
  const worldMapTexture = useMemo(() => generateWorldMapTexture(), []);

  useFrame(() => {
    // Slow rotation
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Main Earth sphere with world map */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[globeRadius, 64, 32]} />
        <meshPhongMaterial
          map={worldMapTexture}
          shininess={100}
          specular={new THREE.Color(0x111111)}
        />
      </mesh>
      
      {/* Floating Destination markers */}
      {destinations.map((dest, index) => {
        const isSelected = selectedDestination === dest.name;
        
        return (
          <FloatingMarker
            key={dest.name}
            dest={dest}
            index={index}
            globeRadius={globeRadius}
            isSelected={isSelected}
            hoveredDestination={hoveredDestination}
            onDestinationClick={onDestinationClick}
            onDestinationHover={onDestinationHover}
          />
        );
      })}
      
      {/* Basic lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
      />
    </group>
  );
};

// Main Component
const SimpleHighQualityGlobe: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const router = useRouter();

  const handleBookNow = () => {
    const dest = destinations.find(d => d.name === selectedDestination);
    if (dest?.id) {
      router.push(`/destinations/${dest.id}`);
    } else {
      router.push('/destinations');
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* High Quality Globe */}
        <HighQualityGlobe
          selectedDestination={selectedDestination}
          onDestinationClick={setSelectedDestination}
          hoveredDestination={hoveredDestination}
          onDestinationHover={setHoveredDestination}
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
      
      {/* Destination Info Panel with Booking */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 p-4 rounded-lg border border-gray-200 shadow-lg max-w-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold">{selectedDestination}</h3>
              <p className="text-sm text-gray-600">
                {destinations.find(d => d.name === selectedDestination)?.country}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleBookNow}
            >
              <Plane className="w-4 h-4 mr-2" />
              Book Now
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedDestination(null)}
              className="px-3"
            >
              ✕
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Hover Info */}
      {hoveredDestination && hoveredDestination !== selectedDestination && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-lg text-sm font-medium border border-gray-200 shadow-md"
        >
          {hoveredDestination}
        </motion.div>
      )}
      
      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-lg text-sm border border-gray-200 shadow-md">
        <p className="font-medium">🌍 Interactive Globe</p>
        <p className="text-xs mt-1 text-gray-600">Click floating dots to book destinations!</p>
        {selectedDestination && (
          <p className="text-xs mt-2 text-blue-600 font-medium">
            Selected: {selectedDestination}
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleHighQualityGlobe;