'use client'

import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Users, Award, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LocalVendorsSection() {
  const vendors = [
    {
      id: '1',
      name: 'Ranchi Tribal Crafts',
      description: 'Authentic tribal handicrafts from Ranchi including wooden sculptures and bamboo products',
      rating: 4.8,
      reviewCount: 124,
      specialties: ['Wooden crafts', 'Bamboo products', 'Tribal jewelry', 'Handwoven textiles'],
      image: '/vendors/tribal-crafts.jpg',
      location: 'Ranchi'
    },
    {
      id: '2',
      name: 'Deoghar Sweet House',
      description: 'Famous for authentic Deoghar peda and other traditional sweets',
      rating: 4.9,
      reviewCount: 256,
      specialties: ['Deoghar Peda', 'Traditional sweets', 'Dry fruits', 'Local delicacies'],
      image: '/vendors/sweets.jpg',
      location: 'Deoghar'
    },
    {
      id: '3',
      name: 'Hazaribagh Jungle Guides',
      description: 'Local guides offering personalized wildlife tours in Hazaribagh National Park',
      rating: 4.9,
      reviewCount: 210,
      specialties: ['Wildlife tours', 'Bird watching', 'Nature walks', 'Tribal village visits'],
      image: '/vendors/guides.jpg',
      location: 'Hazaribagh'
    },
    {
      id: '4',
      name: 'Jamshedpur Steel Art',
      description: 'Unique metal crafts made from recycled steel inspired by Tata Steel heritage',
      rating: 4.7,
      reviewCount: 156,
      specialties: ['Metal sculptures', 'Steel crafts', 'Industrial art', 'Home decor'],
      image: '/vendors/metal-crafts.jpg',
      location: 'Jamshedpur'
    },
    {
      id: '5',
      name: 'Baidyanath Local Guides',
      description: 'Expert guides for pilgrimage tours to Baidyanath Dham and surrounding temples',
      rating: 4.8,
      reviewCount: 189,
      specialties: ['Pilgrimage tours', 'Temple history', 'Local legends', 'Spiritual experiences'],
      image: '/vendors/pilgrimage-guides.jpg',
      location: 'Deoghar'
    },
    {
      id: '6',
      name: 'Netarhat Hill Farmers',
      description: 'Organic produce and local delicacies from the hills of Netarhat',
      rating: 4.6,
      reviewCount: 98,
      specialties: ['Organic honey', 'Hill vegetables', 'Local teas', 'Handmade preserves'],
      image: '/vendors/farmers.jpg',
      location: 'Netarhat'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="vendors" className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Support Local Communities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Local Vendors
            </span>
            <br />
            <span className="text-gray-900">Empowering Jharkhand Communities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            When you travel to Jharkhand, you're not just visiting a destination - you're supporting local communities. 
            These vendors offer authentic products and services that help sustain the local economy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {vendors.map((vendor) => (
            <motion.div key={vendor.id} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                <div className="h-40 bg-gradient-to-r from-green-400 to-teal-500 relative">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">{vendor.name}</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-green-600" />
                    <span>{vendor.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{vendor.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({vendor.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 mb-4">
                    <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specialties.map((specialty, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link href={`/vendors/${vendor.id}`} passHref>
                    <Button variant="outline" className="mt-auto border-green-200 text-green-700 hover:bg-green-50">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2,500+</h3>
              <p className="text-gray-600">Local Vendors</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <ShoppingCart className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">₹3.2Cr+</h3>
              <p className="text-gray-600">Revenue Generated</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">92%</h3>
              <p className="text-gray-600">Community Impact</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              By choosing local vendors, you're directly contributing to the economic empowerment of Jharkhand's communities. 
              Your purchases help preserve traditional crafts and support families who have been practicing these skills for generations.
            </p>
            <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
              Support Local Communities
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}