'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Text3D, Center } from '@react-three/drei'
import { Star, Quote, ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { testimonials } from '@/data/sample-data'

function FloatingAvatar({ color, name, isActive }: { color: string, name: string, isActive: boolean }) {
  const meshRef = useRef<any>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.scale.setScalar(isActive ? 1.2 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef}>
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.8}
            distort={isActive ? 0.3 : 0.1}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        <Center position={[0, 0, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.05}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
          >
            {name.charAt(0)}
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>
      </group>
    </Float>
  )
}

function Interactive3DScene({ activeIndex }: { activeIndex: number }) {
  const colors = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899']
  
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      {testimonials.map((testimonial, index) => (
        <group key={testimonial.id} position={[
          Math.cos((index / testimonials.length) * Math.PI * 2) * 2,
          Math.sin((index / testimonials.length) * Math.PI * 2) * 2,
          0
        ]}>
          <FloatingAvatar 
            color={colors[index % colors.length]}
            name={testimonial.name}
            isActive={index === activeIndex}
          />
        </group>
      ))}
    </Canvas>
  )
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[activeTestimonial]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full filter blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>Traveler Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              What Our
            </span>
            <br />
            <span className="text-white">Travelers Say</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Real experiences from thousands of happy travelers who've discovered 
            the world with TravelTogether.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Interactive Avatars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px]"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
            <Interactive3DScene activeIndex={activeTestimonial} />
            
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-white scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Testimonial Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Quote className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < currentTestimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-lg leading-relaxed mb-4">
                        "{currentTestimonial.text}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold">{currentTestimonial.name}</h4>
                      <p className="text-white/60 flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{currentTestimonial.location}</span>
                      </p>
                      <p className="text-sm text-white/80 mt-1">
                        Tour: {currentTestimonial.tour}
                      </p>
                    </div>
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {currentTestimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
              
              <div className="text-center">
                <span className="text-white/60 text-sm">
                  {activeTestimonial + 1} of {testimonials.length}
                </span>
              </div>
              
              <Button
                onClick={nextTestimonial}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-sm text-white/60">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4.8⭐</div>
                <div className="text-sm text-white/60">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-sm text-white/60">Tours Completed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}