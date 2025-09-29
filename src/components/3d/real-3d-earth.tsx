'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { sampleDestinations } from '@/data/sample-data';
import { motion } from 'framer-motion';
import { Plane, MapPin } from 'lucide-react';
import Link from 'next/link';
import DestinationImageViewer from '@/components/destination-image-viewer';

// Function to generate distinct colors based on destination category
const getCategoryColor = (category: string) => {
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

// Convert lat/lng to 3D position on the surface
const latLngToPosition = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  // Position directly on globe surface
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
};

// Floating Destination Point Component with moon-like orbital animation
const FloatingDestinationPoint: React.FC<{
  destination: typeof sampleDestinations[0];
  globeRadius: number;
  onHover: (name: string | null) => void;
  onClick: (destination: typeof sampleDestinations[0]) => void;
  isSelected: boolean;
  orbitSpeed: number;
  orbitRadius: number;
  orbitInclination: number;
}> = ({ destination, globeRadius, onHover, onClick, isSelected, orbitSpeed, orbitRadius, orbitInclination }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  // Initial position on the surface
  const initialPosition = useMemo(() => {
    return latLngToPosition(destination.location.lat, destination.location.lng, globeRadius);
  }, [destination.location.lat, destination.location.lng, globeRadius]);
  
  // Get color based on category
  const color = useMemo(() => getCategoryColor(destination.category), [destination.category]);
  
  useFrame((state) => {
    if (groupRef.current && meshRef.current) {
      // Moon-like orbital movement around the Earth
      const time = state.clock.elapsedTime;
      
      // Calculate orbital position around Earth
      const orbitAngle = time * orbitSpeed;
      
      // Apply orbital inclination
      const inclinedOrbitRadius = orbitRadius * Math.cos(orbitInclination);
      const verticalOffset = orbitRadius * Math.sin(orbitInclination) * Math.sin(orbitAngle);
      
      // Calculate position in orbital path
      const orbitPosition = new THREE.Vector3(
        Math.cos(orbitAngle) * inclinedOrbitRadius,
        verticalOffset,
        Math.sin(orbitAngle) * inclinedOrbitRadius
      );
      
      // Set the group position to follow the orbital path
      groupRef.current.position.copy(orbitPosition);
      
      // Always face the Earth
      groupRef.current.lookAt(0, 0, 0);
      
      // Gentle pulsing animation
      const pulse = 1 + Math.sin(time * 0.5 + destination.id.charCodeAt(0)) * 0.03;
      const finalScale = pulse * (isSelected ? 1.8 : hovered ? 1.5 : 1.2);
      
      // Apply scaling
      meshRef.current.scale.setScalar(finalScale);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={meshRef}>
        {/* Main marker with category-specific color */}
        <mesh 
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
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent
            opacity={isSelected ? 1 : 0.95}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
      
      {/* Label for the marker */}
      {(hovered || isSelected) && (
        <Html
          center
          distanceFactor={15}
          style={{
            background: 'rgb(252, 252, 252)5)',
            padding: '3px 6px', // Even smaller padding
            borderRadius: '3px', // Smaller border radius
            color: '#333',
            fontSize: '8px', // Even smaller font size
            fontWeight: '400', // Lighter font weight
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)', // Reduced shadow
            pointerEvents: 'none',
            border: `0.5px solid ${color}`, // Thinner border
            zIndex: 1000,
            maxWidth: '80px', // Smaller max width
            textAlign: 'center',
            backdropFilter: 'blur(1px)', // Minimal blur
            transform: 'translateY(-8px)', // Adjusted position
            transition: 'all 0.2s ease'
          }}
        >
          <div className="flex items-center gap-0.5">
            <div 
              className="w-1 h-1 rounded-full" // Smaller color dot
              style={{ backgroundColor: color }}
            ></div>
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

// Realistic Earth Globe Component with enhanced visuals
const EarthGlobe: React.FC<{ 
  radius: number; 
  isRotating: boolean;
}> = ({ radius, isRotating }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  
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
    
    // Detailed continent drawing with country-specific green patches
    
    // North America
    ctx.fillStyle = '#2e8b57';
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.bezierCurveTo(200, 100, 300, 100, 350, 180);
    ctx.bezierCurveTo(340, 220, 320, 240, 300, 250);
    ctx.bezierCurveTo(250, 270, 200, 250, 150, 150);
    ctx.fill();
    
    // Canada (northern green areas)
    ctx.fillStyle = '#3d9b6a';
    ctx.beginPath();
    ctx.moveTo(180, 120);
    ctx.bezierCurveTo(220, 80, 280, 90, 300, 130);
    ctx.bezierCurveTo(280, 140, 240, 150, 200, 140);
    ctx.bezierCurveTo(180, 135, 170, 130, 180, 120);
    ctx.fill();
    
    // United States (central areas)
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.moveTo(180, 180);
    ctx.bezierCurveTo(220, 160, 280, 170, 300, 200);
    ctx.bezierCurveTo(280, 210, 240, 220, 200, 210);
    ctx.bezierCurveTo(180, 205, 170, 190, 180, 180);
    ctx.fill();
    
    // Mexico (southern areas)
    ctx.fillStyle = '#5db663';
    ctx.beginPath();
    ctx.moveTo(150, 220);
    ctx.bezierCurveTo(180, 210, 220, 220, 240, 240);
    ctx.bezierCurveTo(220, 250, 180, 250, 160, 240);
    ctx.bezierCurveTo(150, 235, 140, 225, 150, 220);
    ctx.fill();
    
    // Greenland
    ctx.fillStyle = '#6ec274';
    ctx.beginPath();
    ctx.moveTo(350, 80);
    ctx.bezierCurveTo(370, 70, 390, 75, 400, 90);
    ctx.bezierCurveTo(390, 100, 370, 105, 350, 100);
    ctx.bezierCurveTo(340, 95, 340, 85, 350, 80);
    ctx.fill();
    
    // South America
    ctx.fillStyle = '#7fcc85';
    ctx.beginPath();
    ctx.moveTo(350, 300);
    ctx.bezierCurveTo(400, 250, 450, 350, 400, 500);
    ctx.bezierCurveTo(380, 480, 360, 450, 350, 400);
    ctx.bezierCurveTo(340, 350, 330, 320, 350, 300);
    ctx.fill();
    
    // Brazil (large central green area)
    ctx.fillStyle = '#2e8b57';
    ctx.beginPath();
    ctx.moveTo(420, 350);
    ctx.bezierCurveTo(460, 320, 500, 380, 470, 450);
    ctx.bezierCurveTo(450, 430, 430, 400, 420, 380);
    ctx.bezierCurveTo(410, 360, 400, 340, 420, 350);
    ctx.fill();
    
    // Europe
    ctx.fillStyle = '#8fd696';
    ctx.beginPath();
    ctx.moveTo(550, 100);
    ctx.bezierCurveTo(600, 80, 650, 120, 620, 180);
    ctx.bezierCurveTo(600, 170, 580, 160, 570, 150);
    ctx.bezierCurveTo(560, 140, 550, 120, 550, 100);
    ctx.fill();
    
    // Germany (central European green patch)
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.moveTo(570, 130);
    ctx.bezierCurveTo(580, 125, 590, 135, 585, 145);
    ctx.bezierCurveTo(575, 140, 565, 135, 570, 130);
    ctx.fill();
    
    // France (western European green patch)
    ctx.fillStyle = '#5db663';
    ctx.beginPath();
    ctx.moveTo(550, 140);
    ctx.bezierCurveTo(560, 135, 570, 145, 565, 155);
    ctx.bezierCurveTo(555, 150, 545, 145, 550, 140);
    ctx.fill();
    
    // Africa
    ctx.fillStyle = '#6ec274';
    ctx.beginPath();
    ctx.moveTo(600, 200);
    ctx.bezierCurveTo(650, 150, 700, 250, 680, 450);
    ctx.bezierCurveTo(660, 420, 640, 350, 620, 300);
    ctx.bezierCurveTo(610, 250, 600, 220, 600, 200);
    ctx.fill();
    
    // Congo Basin (central African rainforest)
    ctx.fillStyle = '#2e8b57';
    ctx.beginPath();
    ctx.moveTo(630, 280);
    ctx.bezierCurveTo(650, 270, 670, 290, 660, 310);
    ctx.bezierCurveTo(640, 300, 620, 290, 630, 280);
    ctx.fill();
    
    // Asia (enhanced with more green)
    ctx.fillStyle = '#7fcc85';
    ctx.beginPath();
    ctx.moveTo(700, 100);
    ctx.bezierCurveTo(850, 50, 950, 150, 900, 300);
    ctx.bezierCurveTo(870, 280, 840, 260, 800, 240);
    ctx.bezierCurveTo(760, 220, 730, 200, 700, 180);
    ctx.bezierCurveTo(680, 160, 670, 140, 700, 100);
    ctx.fill();
    
    // Detailed India shape (stylized)
    ctx.fillStyle = '#f59e0b'; // indian-golden color
    ctx.beginPath();
    // north-west corner (Rajasthan / Punjab region)
    ctx.moveTo(780, 220);
    ctx.bezierCurveTo(770, 225, 765, 235, 770, 245);
    // curve down along western coast (Gujarat -> Maharashtra)
    ctx.bezierCurveTo(775, 255, 785, 265, 795, 270);
    ctx.bezierCurveTo(800, 280, 800, 295, 800, 310);
    // tip of the peninsula (Karnataka -> Tamil Nadu -> Kerala curl)
    ctx.bezierCurveTo(802, 330, 810, 345, 822, 358);
    ctx.bezierCurveTo(834, 368, 854, 373, 872, 370);
    // eastern bay side (Andhra -> Odisha -> West Bengal)
    ctx.bezierCurveTo(880, 367, 890, 362, 897, 352);
    ctx.bezierCurveTo(910, 337, 915, 317, 920, 307);
    ctx.bezierCurveTo(927, 297, 940, 292, 952, 295);
    // north-east hill / Assam / Arunachal region (jagged)
    ctx.bezierCurveTo(970, 300, 980, 307, 985, 295);
    ctx.bezierCurveTo(987, 288, 987, 278, 985, 270);
    ctx.bezierCurveTo(982, 263, 975, 258, 970, 255);
    // north across the Himalaya (slight zig-zag)
    ctx.bezierCurveTo(960, 248, 940, 238, 915, 235);
    ctx.bezierCurveTo(900, 232, 885, 230, 870, 232);
    // go west across northern plains (Uttar Pradesh -> Haryana)
    ctx.bezierCurveTo(850, 235, 830, 235, 815, 232);
    ctx.bezierCurveTo(800, 230, 790, 222, 780, 220);
    ctx.closePath();
    ctx.fill();
    
    // add a darker stroke for definition
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.stroke();
    
    // draw Kashmir & Jammu small patch (north-west top)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(845, 205);
    ctx.bezierCurveTo(840, 200, 830, 199, 822, 202);
    ctx.bezierCurveTo(817, 205, 817, 210, 822, 212);
    ctx.bezierCurveTo(830, 215, 840, 215, 845, 210);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // draw Andaman & Nicobar islands (small circles)
    function drawIsland(x: number, y: number) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    drawIsland(955, 360);
    drawIsland(965, 375);
    drawIsland(972, 370);
    
    // China (eastern Asian green patch)
    ctx.fillStyle = '#5db663';
    ctx.beginPath();
    ctx.moveTo(820, 180);
    ctx.bezierCurveTo(840, 170, 860, 190, 850, 210);
    ctx.bezierCurveTo(830, 200, 810, 190, 820, 180);
    ctx.fill();
    
    // Additional green areas in Asia
    ctx.fillStyle = '#8fd696';
    ctx.beginPath();
    ctx.moveTo(800, 150);
    ctx.bezierCurveTo(820, 140, 840, 160, 830, 180);
    ctx.bezierCurveTo(810, 170, 790, 160, 800, 150);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(750, 200);
    ctx.bezierCurveTo(770, 190, 790, 210, 780, 230);
    ctx.bezierCurveTo(760, 220, 740, 210, 750, 200);
    ctx.fill();
    
    // Australia
    ctx.fillStyle = '#7fcc85';
    ctx.beginPath();
    ctx.moveTo(900, 450);
    ctx.bezierCurveTo(950, 400, 1000, 450, 980, 500);
    ctx.bezierCurveTo(960, 510, 940, 510, 920, 500);
    ctx.bezierCurveTo(910, 480, 900, 470, 900, 450);
    ctx.fill();
    
    // Eastern Australia (coastal forests)
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.moveTo(950, 470);
    ctx.bezierCurveTo(970, 460, 990, 480, 980, 500);
    ctx.bezierCurveTo(960, 490, 940, 480, 950, 470);
    ctx.fill();
    
    // Antarctica
    ctx.fillStyle = '#f0f8ff'; // Light blue/white for snow
    ctx.beginPath();
    ctx.moveTo(200, 900);
    ctx.bezierCurveTo(400, 950, 800, 950, 1000, 900);
    ctx.bezierCurveTo(950, 920, 800, 930, 600, 920);
    ctx.bezierCurveTo(400, 910, 300, 910, 200, 900);
    ctx.fill();
    
    // Snow caps on mountain ranges
    // Himalayas (between India and China)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(820, 175);
    ctx.bezierCurveTo(840, 170, 860, 180, 855, 190);
    ctx.bezierCurveTo(845, 185, 835, 180, 825, 180);
    ctx.closePath();
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
  
  // Create cloud texture
  const cloudsTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create a more detailed cloud texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add cloud formations
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 10 + Math.random() * 50;
      const opacity = 0.1 + Math.random() * 0.3;
      
      // Create fluffy cloud effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
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
    
    // Add snow caps for mountain ranges
    // Himalayas
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(790, 180);
    ctx.lineTo(810, 170);
    ctx.lineTo(830, 180);
    ctx.lineTo(820, 190);
    ctx.lineTo(800, 190);
    ctx.closePath();
    ctx.fill();
    
    // Antarctica snow
    ctx.beginPath();
    ctx.moveTo(200, 900);
    ctx.bezierCurveTo(400, 950, 800, 950, 1000, 900);
    ctx.bezierCurveTo(950, 920, 800, 930, 600, 920);
    ctx.bezierCurveTo(400, 910, 300, 910, 200, 900);
    ctx.fill();
    
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
  
  useFrame((state) => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += 0.002;
    }
    
    // Animate clouds
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.001;
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
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.005, 128, 128]} />
        <meshPhongMaterial 
          map={cloudsTexture}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
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

// Stars background component
const StarsBackground: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null!);
  
  const stars = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    // Create 5000 stars positioned behind the Earth
    for (let i = 0; i < 5000; i++) {
      // Position stars in a sphere around the scene, but further away to be behind the Earth
      const radius = 15 + Math.random() * 20; // Increased radius to place stars further away
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
      
      // Random star colors (mostly white with some blue/turquoise)
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        // White stars
        colors.push(1, 1, 1);
      } else if (colorChoice < 0.85) {
        // Blue stars
        colors.push(0.7, 0.7, 1);
      } else {
        // Turquoise stars
        colors.push(0.5, 1, 1);
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return { geometry };
  }, []);
  
  return (
    <points ref={starsRef}>
      <primitive object={stars.geometry} />
      <pointsMaterial 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Main Globe Component
const GlobeScene: React.FC<{ 
  isRotating: boolean;
  onDestinationHover: (name: string | null) => void;
  onDestinationClick: (destination: typeof sampleDestinations[0]) => void;
  selectedDestination: typeof sampleDestinations[0] | null;
}> = ({ isRotating, onDestinationHover, onDestinationClick, selectedDestination }) => {
  const globeRadius = 1; // Smaller globe for better fit
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />
      
      {/* Stars background */}
      <StarsBackground />
      
      <EarthGlobe 
        radius={globeRadius} 
        isRotating={isRotating}
      />
      
      {/* Render all floating destination points with moon-like orbital patterns */}
      {sampleDestinations.map((destination, index) => (
        <FloatingDestinationPoint
          key={destination.id}
          destination={destination}
          globeRadius={globeRadius}
          onHover={onDestinationHover}
          onClick={onDestinationClick}
          isSelected={selectedDestination?.id === destination.id}
          orbitSpeed={0.05 + (index * 0.01)} // Slow orbital speeds
          orbitRadius={1.3 + (index * 0.1)} // Orbital radius around Earth
          orbitInclination={(index * 0.2) - 0.5} // Varying orbital inclinations
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
        zoomSpeed={0.8} // Increased zoom speed for more responsive scrolling
        panSpeed={0.5}
      />
    </>
  );
};

// Main Real 3D Earth Component
const Real3DEarth: React.FC = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<typeof sampleDestinations[0] | null>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  
  const handleDestinationClick = (destination: typeof sampleDestinations[0]) => {
    setSelectedDestination(destination);
    setIsRotating(false);
    // Show image viewer when a destination is clicked
    setShowImageViewer(true);
  };
  
  const handleCloseInfo = () => {
    setSelectedDestination(null);
    setIsRotating(true);
  };
  
  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
    handleCloseInfo();
  };

  return (
    <div className="relative w-full h-[500px]">
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
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-gray-900 px-3 py-2 rounded text-sm font-medium border border-gray-200 shadow-sm z-50">
          {hoveredDestination}
        </div>
      )}
      
      {/* Destination Info Panel with Booking - Enhanced Design */}
      {selectedDestination && !showImageViewer && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl text-gray-900 p-4 rounded-2xl border border-white/50 shadow-2xl max-w-sm z-50"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3">
              <div 
                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" 
                style={{ backgroundColor: getCategoryColor(selectedDestination.category) }}
              ></div>
              <div>
                <h3 className="font-bold text-lg">{selectedDestination.name}</h3>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                  {selectedDestination.location.address}
                </p>
              </div>
            </div>
            <button 
              onClick={handleCloseInfo}
              className="p-1 h-auto hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{selectedDestination.description}</p>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCloseInfo}
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-sm py-2 px-3"
            >
              ← Back
            </Button>
            <Button 
              size="sm" 
              onClick={() => setShowImageViewer(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all text-sm py-2"
            >
              View Photos
            </Button>
            <Link href={`/destinations/${selectedDestination.id}`} passHref>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all text-sm py-2"
              >
                <Plane className="w-3 h-3 mr-1" />
                Book Now
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
      
      {/* Destination Image Viewer */}
      {showImageViewer && selectedDestination && (
        <DestinationImageViewer 
          selectedDestinationId={selectedDestination.id} 
          onClose={handleCloseImageViewer} 
        />
      )}
      
      {/* Controls - Enhanced Design */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-50">
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={() => setIsRotating(!isRotating)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-white/30 shadow-lg"
        >
          {isRotating ? 'Pause Rotation' : 'Start Rotation'}
        </Button>
        
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={() => {
            setSelectedDestination(null);
            setIsRotating(true);
          }}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-white/30 shadow-lg"
        >
          Reset View
        </Button>
      </div>
      
      {/* Zoom Hint */}
      <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full z-50">
        Scroll to zoom • Drag to rotate
      </div>
      
      {/* Legend - Enhanced Design */}
      <div className="absolute bottom-4 right-4 bg-gradient-to-br from-white/80 to-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/30 shadow-lg z-50">
        <h4 className="font-bold text-sm mb-3 text-gray-800">Destination Types</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-gray-700">Beach</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Mountain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-gray-700">Heritage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Adventure</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
            <span className="text-gray-700">City</span>
          </div>
        </div>
      </div>
      
      {/* Destination Image Viewer */}
      {showImageViewer && selectedDestination && (
        <DestinationImageViewer 
          selectedDestinationId={selectedDestination.id} 
          onClose={handleCloseImageViewer} 
        />
      )}
    </div>
  );
};

export default Real3DEarth;
