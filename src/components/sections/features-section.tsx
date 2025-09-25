'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Text3D, Center, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import { Wallet, Users, Bot, Shield, CreditCard, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'

function FloatingIcon({ icon: Icon, color, position }: { 
  icon: any, 
  color: string, 
  position: [number, number, number] 
}) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Interactive3DScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Central floating sphere */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshDistortMaterial
            color="#3b82f6"
            transparent
            opacity={0.8}
            distort={0.2}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      {/* Floating feature icons */}
      <FloatingIcon icon={Wallet} color="#10b981" position={[-2, 1, 0]} />
      <FloatingIcon icon={Users} color="#8b5cf6" position={[2, 1, 0]} />
      <FloatingIcon icon={Bot} color="#f59e0b" position={[0, 2, 0]} />
      <FloatingIcon icon={Shield} color="#ef4444" position={[-1.5, -1, 0]} />
      <FloatingIcon icon={CreditCard} color="#06b6d4" position={[1.5, -1, 0]} />
      <FloatingIcon icon={Globe} color="#ec4899" position={[0, -2, 0]} />
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  
  const features = [
    {
      icon: Wallet,
      title: "Group Wallet System",
      description: "Pool funds together securely with friends and track expenses in real-time",
      color: "from-green-500 to-emerald-600",
      details: "Split costs, manage group budgets, and ensure transparent financial planning for every trip."
    },
    {
      icon: Users,
      title: "Smart Group Formation",
      description: "Create or join travel groups with like-minded adventurers",
      color: "from-purple-500 to-violet-600",
      details: "Match with travelers based on interests, budget, and destination preferences."
    },
    {
      icon: Bot,
      title: "AI Travel Assistant",
      description: "Get personalized recommendations based on your preferences and budget",
      color: "from-yellow-500 to-orange-600",
      details: "Our AI analyzes your travel history and preferences to suggest perfect destinations."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Bank-grade security for all transactions and bookings",
      color: "from-red-500 to-pink-600",
      details: "End-to-end encryption, fraud protection, and secure payment processing."
    },
    {
      icon: CreditCard,
      title: "Flexible EMI Options",
      description: "Split your travel costs into affordable monthly payments",
      color: "from-cyan-500 to-blue-600",
      details: "Choose from 3, 6, or 12-month EMI plans with competitive interest rates."
    },
    {
      icon: Globe,
      title: "Global Destinations",
      description: "Explore amazing destinations across India and beyond",
      color: "from-pink-500 to-rose-600",
      details: "Curated experiences from beaches to mountains, heritage sites to adventure sports."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Revolutionary Travel Platform</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="text-gray-900">TravelTogether?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of group travel with cutting-edge technology, 
            seamless financial management, and AI-powered recommendations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Interactive Scene */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm" />
            <Interactive3DScene />
            
            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Tracking</span>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">₹2Cr+ Managed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setActiveFeature(index)}
                className="group"
              >
                <Card className={`p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  activeFeature === index 
                    ? 'bg-gradient-to-r ' + feature.color + ' text-white transform scale-[1.02]' 
                    : 'bg-white hover:bg-gray-50'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === index 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-gradient-to-r ' + feature.color
                    }`}>
                      <feature.icon className={`w-6 h-6 ${
                        activeFeature === index ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${
                        activeFeature === index ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm mb-3 ${
                        activeFeature === index ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                      
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: activeFeature === index ? 'auto' : 0,
                          opacity: activeFeature === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-white/80 leading-relaxed">
                          {feature.details}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}