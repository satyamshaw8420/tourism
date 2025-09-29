'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane, MapPin } from 'lucide-react';
import Link from 'next/link';
import { sampleDestinations } from '@/data/sample-data';

// Function to generate distinct colors based on destination category
const getCategoryColor = (category: string, isJharkhand: boolean) => {
  if (isJharkhand) return "#10b981"; // Green for Jharkhand
  
  const colors: Record<string, string> = {
    beach: "#38bdf8",      // Blue
    mountain: "#22c55e",   // Green
    heritage: "#f59e0b",   // Amber
    adventure: "#ef4444",  // Red
    city: "#8b5cf6",       // Violet
    default: "#ff6b6b"     // Default red
  };
  
  return colors[category] || colors.default;
};

// Filter destinations to only show Jharkhand locations with proper spacing
const jharkhandDestinations = sampleDestinations
  .filter(dest => dest.location.address.includes('Jharkhand'))
  .map(dest => ({
    id: dest.id,
    name: dest.name,
    lat: dest.location.lat,
    lng: dest.location.lng,
    color: getCategoryColor(dest.category, true),
    country: dest.location.address.split(',').pop()?.trim() || 'India',
    description: dest.description,
    isJharkhand: true,
    category: dest.category
  }));

// Use only Jharkhand destinations for better organization and proper spacing
const destinations = sampleDestinations
  .filter(dest => dest.location.address.includes('Jharkhand'))
  .map((dest, index) => ({
    id: dest.id,
    name: dest.name,
    lat: dest.location.lat,
    lng: dest.location.lng,
    color: getCategoryColor(dest.category, true),
    country: dest.location.address.split(',').pop()?.trim() || 'India',
    description: dest.description,
    isJharkhand: true,
    category: dest.category
  }));

// Convert lat/lng to 3D position
const latLngToPosition = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Destination Point Component
const DestinationPoint: React.FC<{
  destination: typeof destinations[0];
  globeRadius: number;
  onHover: (name: string | null) => void;
  onClick: (destination: typeof destinations[0]) => void;
  isSelected: boolean;
  time?: number; // Make time optional
}> = ({ destination, globeRadius, onHover, onClick, isSelected, time = 0 }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  // Calculate position on globe surface
  const position = useMemo(() => {
    return latLngToPosition(destination.lat, destination.lng, globeRadius);
  }, [destination.lat, destination.lng, globeRadius]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Update position each frame
      meshRef.current.position.copy(position);
      
      // Pulsing animation
      const scale = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      const finalScale = isSelected ? scale * 1.5 : hovered ? scale * 1.3 : scale;
      meshRef.current.scale.setScalar(finalScale);
    }
  });

  return (
    <group position={position}>
      {/* Main point - smaller and on surface */}
      <mesh 
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(destination.name);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(destination);
        }}
      >
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial 
          color={destination.color} 
          transparent
          opacity={isSelected ? 1 : 0.8}
        />
      </mesh>
      
      {/* Outer glow ring - smaller and more subtle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.02, 0.025, 16]} />
        <meshBasicMaterial 
          color={destination.color} 
          transparent 
          opacity={hovered || isSelected ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Label - smaller and more compact */}
      {(hovered || isSelected) && (
        <Html
          center
          distanceFactor={8}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#333',
            fontSize: '10px',
            fontWeight: '500',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            pointerEvents: 'none',
            transform: 'translateY(-6px)',
            border: '1px solid #10b981',
            zIndex: 1000,
            maxWidth: '120px',
            textAlign: 'center',
            backdropFilter: 'blur(1px)'
          }}
        >
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            <span style={{ 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis' 
            }}>
              {destination.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
};

// Realistic Earth Globe Component using NASA Blue Marble texture
const EarthGlobe: React.FC<{ 
  radius: number; 
  isRotating: boolean;
}> = ({ radius, isRotating }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Create realistic Earth texture using NASA Blue Marble
  const earthTexture = useMemo(() => {
    // In a real implementation, we would load the NASA Blue Marble texture
    // For now, we'll create a more realistic procedural texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Create a gradient for the oceans
    const oceanGradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    oceanGradient.addColorStop(0, '#1e40af');
    oceanGradient.addColorStop(1, '#0c4a6e');
    
    // Draw ocean background
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Improved continent drawing with more details
    // North America
    ctx.fillStyle = '#2e8b57';
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.bezierCurveTo(200, 100, 300, 100, 350, 180);
    ctx.bezierCurveTo(340, 220, 320, 240, 300, 250);
    ctx.bezierCurveTo(250, 270, 200, 250, 150, 150);
    ctx.fill();
    
    // Greenland
    ctx.beginPath();
    ctx.moveTo(350, 80);
    ctx.bezierCurveTo(370, 70, 390, 75, 400, 90);
    ctx.bezierCurveTo(390, 100, 370, 105, 350, 100);
    ctx.bezierCurveTo(340, 95, 340, 85, 350, 80);
    ctx.fill();
    
    // South America
    ctx.fillStyle = '#3d9b6a';
    ctx.beginPath();
    ctx.moveTo(350, 300);
    ctx.bezierCurveTo(400, 250, 450, 350, 400, 500);
    ctx.bezierCurveTo(380, 480, 360, 450, 350, 400);
    ctx.bezierCurveTo(340, 350, 330, 320, 350, 300);
    ctx.fill();
    
    // Europe
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.moveTo(550, 100);
    ctx.bezierCurveTo(600, 80, 650, 120, 620, 180);
    ctx.bezierCurveTo(600, 170, 580, 160, 570, 150);
    ctx.bezierCurveTo(560, 140, 550, 120, 550, 100);
    ctx.fill();
    
    // Africa
    ctx.fillStyle = '#5db663';
    ctx.beginPath();
    ctx.moveTo(600, 200);
    ctx.bezierCurveTo(650, 150, 700, 250, 680, 450);
    ctx.bezierCurveTo(660, 420, 640, 350, 620, 300);
    ctx.bezierCurveTo(610, 250, 600, 220, 600, 200);
    ctx.fill();
    
    // Asia
    ctx.fillStyle = '#6ec274';
    ctx.beginPath();
    ctx.moveTo(700, 100);
    ctx.bezierCurveTo(850, 50, 950, 150, 900, 300);
    ctx.bezierCurveTo(870, 280, 840, 260, 800, 240);
    ctx.bezierCurveTo(760, 220, 730, 200, 700, 180);
    ctx.bezierCurveTo(680, 160, 670, 140, 700, 100);
    ctx.fill();
    
    // Australia
    ctx.fillStyle = '#7fcc85';
    ctx.beginPath();
    ctx.moveTo(900, 450);
    ctx.bezierCurveTo(950, 400, 1000, 450, 980, 500);
    ctx.bezierCurveTo(960, 510, 940, 510, 920, 500);
    ctx.bezierCurveTo(910, 480, 900, 470, 900, 450);
    ctx.fill();
    
    // Antarctica
    ctx.fillStyle = '#8fd696';
    ctx.beginPath();
    ctx.moveTo(200, 900);
    ctx.bezierCurveTo(400, 950, 800, 950, 1000, 900);
    ctx.bezierCurveTo(950, 920, 800, 930, 600, 920);
    ctx.bezierCurveTo(400, 910, 300, 910, 200, 900);
    ctx.fill();
    
    // Add more detailed cloud-like texture details
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 8;
      const opacity = 0.1 + Math.random() * 0.2;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Create bump map for terrain with more detail
  const bumpTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a more detailed bump map with varied terrain
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 3
    );
    gradient.addColorStop(0, '#999');
    gradient.addColorStop(1, '#333');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some terrain variations
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 5 + Math.random() * 20;
      const height = 0.2 + Math.random() * 0.8;
      const grayValue = Math.floor(128 + (height * 127));
      ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Create specular map for water reflections with more detail
  const specularTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a specular map with brighter areas for water
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#888888');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add specular highlights for water reflections
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 2 + Math.random() * 10;
      const brightness = 0.7 + Math.random() * 0.3;
      const grayValue = Math.floor(brightness * 255);
      ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Create an atmospheric glow effect
  const atmosphereTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create a radial gradient for atmospheric glow
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width / 4,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(100, 150, 255, 0)');
    gradient.addColorStop(1, 'rgba(100, 150, 255, 0.3)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  useFrame(() => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 128, 128]} />
        <meshPhongMaterial 
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.08}
          specularMap={specularTexture}
          specular={new THREE.Color(0x444444)}
          shininess={40}
          transparent={true}
          opacity={0.95}
        />
      </mesh>
      
      {/* Atmospheric glow effect */}
      <mesh>
        <sphereGeometry args={[radius * 1.02, 64, 64]} />
        <meshBasicMaterial 
          map={atmosphereTexture}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

// Main Globe Component
const GlobeScene: React.FC<{ 
  isRotating: boolean;
  onDestinationHover: (name: string | null) => void;
  onDestinationClick: (destination: typeof destinations[0]) => void;
  selectedDestination: typeof destinations[0] | null;
}> = ({ isRotating, onDestinationHover, onDestinationClick, selectedDestination }) => {
  const globeRadius = 1; // Smaller globe for better fit
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />
      
      <EarthGlobe 
        radius={globeRadius} 
        isRotating={isRotating}
      />
      
      {/* Render destination points with proper spacing */}
      {destinations.map((destination) => (
        <DestinationPoint
          key={destination.id}
          destination={destination}
          globeRadius={globeRadius}
          onHover={onDestinationHover}
          onClick={onDestinationClick}
          isSelected={selectedDestination?.id === destination.id}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        minDistance={1.2}
        maxDistance={2.5}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        panSpeed={0.5}
      />
    </>
  );
};

// Main Travel Globe Component
const TravelGlobe: React.FC = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  
  const handleDestinationClick = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination);
    setIsRotating(false);
  };
  
  const handleCloseInfo = () => {
    setSelectedDestination(null);
    setIsRotating(true);
  };

  return (
    <div className="relative w-full h-[300px]" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'transparent',
          position: 'relative',
          zIndex: 50
        }}
        frameloop="always"
      >
        <color attach="background" args={[0, 0, 0]} />
        <GlobeScene 
          isRotating={isRotating} 
          onDestinationHover={setHoveredDestination}
          onDestinationClick={handleDestinationClick}
          selectedDestination={selectedDestination}
        />
      </Canvas>
      
      {/* Optional: Display hovered destination name */}
      {hoveredDestination && !selectedDestination && (
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-gray-900 px-2 py-1 rounded text-xs font-medium border border-gray-200 shadow-sm z-50">
          {hoveredDestination}
        </div>
      )}
      
      {/* Destination Info Panel with Booking - smaller size */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded border border-gray-200 shadow-md max-w-[250px] z-50"
        >
          <div className="flex items-start gap-1.5 mb-1.5">
            <MapPin className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm leading-tight">{selectedDestination.name}</h3>
              <p className="text-xs text-gray-600">Jharkhand, India</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-700 mb-2 leading-relaxed">{selectedDestination.description.substring(0, 80)}...</p>
          
          <div className="flex gap-1.5">
            <Link href={`/destinations/${selectedDestination.id}`} passHref>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs py-1"
              >
                <Plane className="w-2.5 h-2.5 mr-1" />
                Book
              </Button>
            </Link>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCloseInfo}
              className="px-1.5 py-1 text-xs"
            >
              ✕
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Instructions - smaller and more compact */}
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded text-xs border border-gray-200 shadow-sm z-50">
        <p className="font-medium">🌍 Jharkhand</p>
        <p className="text-[10px] mt-0.5 text-gray-600">{destinations.length} locations</p>
        {selectedDestination && (
          <p className="text-[10px] mt-1 text-green-600 font-medium">
            {selectedDestination.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default TravelGlobe;