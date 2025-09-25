'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Interactive3DPlaneProps {
  onPlaneClick?: () => void;
}

const Interactive3DPlane: React.FC<Interactive3DPlaneProps> = ({ onPlaneClick }) => {
  const planeRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state) => {
    if (planeRef.current) {
      // Gentle floating animation
      planeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      
      // Gentle rotation
      if (!isHovered) {
        planeRef.current.rotation.y += 0.01;
      }
      
      // Banking effect when hovered
      if (isHovered) {
        planeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        planeRef.current.rotation.z *= 0.95; // Smooth return to level
      }
    }
  });

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onPlaneClick?.();
  };

  return (
    <group
      ref={planeRef}
      onClick={handleClick}
      onPointerEnter={() => {
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setIsHovered(false);
        document.body.style.cursor = 'default';
      }}
      scale={isClicked ? [0.9, 0.9, 0.9] : isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    >
      {/* Fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.08, 2, 16]} />
        <meshPhongMaterial color={isHovered ? "#3b82f6" : "#e5e7eb"} />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0, 1.2]}>
        <coneGeometry args={[0.08, 0.4, 12]} />
        <meshPhongMaterial color={isHovered ? "#1d4ed8" : "#d1d5db"} />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, -0.05, 0.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2, 0.05, 0.4]} />
        <meshPhongMaterial color={isHovered ? "#2563eb" : "#9ca3af"} />
      </mesh>
      
      {/* Tail wing */}
      <mesh position={[0, 0.1, -0.8]} rotation={[Math.PI/2, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshPhongMaterial color={isHovered ? "#1e40af" : "#6b7280"} />
      </mesh>
      
      {/* Vertical tail */}
      <mesh position={[0, 0.2, -0.9]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.3]} />
        <meshPhongMaterial color={isHovered ? "#1e3a8a" : "#4b5563"} />
      </mesh>
      
      {/* Propeller (if clicked, spins fast) */}
      <mesh position={[0, 0, 1.4]} rotation={[0, 0, isClicked ? state.clock.elapsedTime * 20 : state.clock.elapsedTime * 5]}>
        <boxGeometry args={[0.02, 0.8, 0.02]} />
        <meshPhongMaterial color="#374151" />
      </mesh>
    </group>
  );
};

const Interactive3DPlaneScene: React.FC<Interactive3DPlaneProps> = ({ onPlaneClick }) => {
  const [clickCount, setClickCount] = useState(0);

  const handlePlaneInteraction = () => {
    setClickCount(prev => prev + 1);
    onPlaneClick?.();
  };

  return (
    <div className="relative w-full h-[300px] bg-gradient-to-br from-sky-50 to-blue-100 rounded-lg overflow-hidden border border-gray-200">
      <Canvas
        camera={{ position: [4, 2, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#f0f9ff']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
        />
        <pointLight position={[-5, 2, -5]} intensity={0.3} color="#60a5fa" />
        
        {/* Interactive Plane */}
        <Interactive3DPlane onPlaneClick={handlePlaneInteraction} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Interaction feedback */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg text-sm border border-gray-200">
        <p className="font-medium text-gray-900">✈️ Interactive Plane</p>
        <p className="text-xs text-gray-600 mt-1">Click to interact • Hover to highlight</p>
        {clickCount > 0 && (
          <p className="text-xs text-blue-600 mt-1">Interactions: {clickCount}</p>
        )}
      </div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute bottom-4 right-4 bg-blue-500/20 backdrop-blur-sm p-2 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default Interactive3DPlaneScene;