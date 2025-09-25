'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Accessible Flight Interior Component
const AccessibleFlightInterior: React.FC = () => {
  const flightRef = useRef<THREE.Group>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  useFrame(() => {
    if (flightRef.current) {
      flightRef.current.rotation.y += 0.002;
    }
  });

  // Aircraft fuselage
  const AircraftBody = () => (
    <group>
      {/* Main fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 8, 32]} />
        <meshPhongMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0, 4.5]}>
        <coneGeometry args={[1.5, 1.5, 16]} />
        <meshPhongMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0, -4.5]}>
        <coneGeometry args={[1.5, 1, 16]} />
        <meshPhongMaterial color="#d0d0d0" />
      </mesh>
    </group>
  );

  // Wings
  const Wings = () => (
    <group>
      {/* Left wing */}
      <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[6, 0.2, 2]} />
        <meshPhongMaterial color="#c0c0c0" />
      </mesh>
      
      {/* Right wing */}
      <mesh position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[6, 0.2, 2]} />
        <meshPhongMaterial color="#c0c0c0" />
      </mesh>
    </group>
  );

  // Accessible seating areas
  const AccessibleSeats = () => {
    const seats = [];
    
    // Wheelchair accessible area
    seats.push(
      <group key="wheelchair-area" position={[0, -0.5, 1]}>
        <mesh
          onClick={() => setSelectedFeature('wheelchair')}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'default'}
        >
          <boxGeometry args={[1.5, 0.3, 1]} />
          <meshPhongMaterial color="#4ade80" />
        </mesh>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="#059669"
          anchorX="center"
          anchorY="middle"
        >
          Wheelchair Area
        </Text>
      </group>
    );

    // Priority seating
    for (let i = 0; i < 6; i++) {
      const x = (i % 2 === 0 ? -0.5 : 0.5);
      const z = 2 - (Math.floor(i / 2) * 0.8);
      
      seats.push(
        <group key={`priority-seat-${i}`} position={[x, -0.3, z]}>
          <mesh
            onClick={() => setSelectedFeature('priority')}
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
          >
            <boxGeometry args={[0.4, 0.6, 0.4]} />
            <meshPhongMaterial color="#3b82f6" />
          </mesh>
        </group>
      );
    }

    return <group>{seats}</group>;
  };

  // Accessible features
  const AccessibleFeatures = () => (
    <group>
      {/* Wide aisle */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[0.8, 0.1, 6]} />
        <meshPhongMaterial color="#f3f4f6" />
      </mesh>
      
      {/* Accessible restroom */}
      <mesh 
        position={[0.8, -0.2, -2]}
        onClick={() => setSelectedFeature('restroom')}
        onPointerEnter={() => document.body.style.cursor = 'pointer'}
        onPointerLeave={() => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[0.6, 1, 0.8]} />
        <meshPhongMaterial color="#fbbf24" />
      </mesh>
      <Text
        position={[0.8, 0.3, -2]}
        fontSize={0.15}
        color="#d97706"
        anchorX="center"
        anchorY="middle"
      >
        Accessible Restroom
      </Text>
      
      {/* Medical equipment storage */}
      <mesh 
        position={[-0.8, -0.2, -1]}
        onClick={() => setSelectedFeature('medical')}
        onPointerEnter={() => document.body.style.cursor = 'pointer'}
        onPointerLeave={() => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[0.4, 0.8, 0.6]} />
        <meshPhongMaterial color="#ef4444" />
      </mesh>
      <Text
        position={[-0.8, 0.2, -1]}
        fontSize={0.15}
        color="#dc2626"
        anchorX="center"
        anchorY="middle"
      >
        Medical Storage
      </Text>
    </group>
  );

  return (
    <group ref={flightRef}>
      <AircraftBody />
      <Wings />
      <AccessibleSeats />
      <AccessibleFeatures />
    </group>
  );
};

// Main component
const AccessibleFlightModel: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const featureInfo = {
    wheelchair: {
      title: "Wheelchair Accessible Area",
      description: "Dedicated space for wheelchair users with easy boarding access and secure positioning."
    },
    priority: {
      title: "Priority Seating", 
      description: "Reserved seats with extra legroom and easy aisle access for passengers with mobility needs."
    },
    restroom: {
      title: "Accessible Restroom",
      description: "Wheelchair accessible restroom with grab bars and emergency assistance button."
    },
    medical: {
      title: "Medical Equipment Storage",
      description: "Climate-controlled storage for medical devices and medications with easy access."
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-sky-100 to-blue-200 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [8, 4, 8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#dbeafe']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        {/* Aircraft */}
        <AccessibleFlightInterior />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Feature Information Panel */}
      {selectedFeature && featureInfo[selectedFeature as keyof typeof featureInfo] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-sm"
        >
          <h3 className="font-bold text-gray-900 mb-2">
            {featureInfo[selectedFeature as keyof typeof featureInfo].title}
          </h3>
          <p className="text-sm text-gray-600">
            {featureInfo[selectedFeature as keyof typeof featureInfo].description}
          </p>
          <button
            onClick={() => setSelectedFeature(null)}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Close
          </button>
        </motion.div>
      )}
      
      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg text-sm">
        <p className="font-medium text-gray-900">✈️ Interactive Aircraft</p>
        <p className="text-xs text-gray-600 mt-1">Click colored areas to learn about accessibility features</p>
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg text-xs">
        <p className="font-medium text-gray-900 mb-2">Accessibility Features:</p>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
            <span>Wheelchair Area</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Priority Seating</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
            <span>Accessible Restroom</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Medical Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibleFlightModel;