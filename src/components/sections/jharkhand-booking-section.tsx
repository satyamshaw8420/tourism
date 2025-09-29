'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, CreditCard, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleTourPackages } from '@/data/sample-data'

export default function JharkhandBookingSection() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  
  // Filter Jharkhand tour packages
  const jharkhandPackages = sampleTourPackages.filter(packageItem => 
    packageItem.destination.location.address.includes('Jharkhand')
  )

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

  const handleBookNow = (packageItem: any) => {
    setSelectedPackage(packageItem)
  }

  const handleConfirmBooking = () => {
    if (selectedPackage && travelDate && travelers > 0) {
      // In a real app, this would redirect to a booking page or open a modal
      alert(`Booking confirmed for ${selectedPackage.title} on ${travelDate} for ${travelers} traveler(s)!`)
      setSelectedPackage(null)
      setTravelDate('')
      setTravelers(2)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
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
            <MapPin className="w-4 h-4" />
            <span>Explore Jharkhand</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Book Your
            </span>
            <br />
            <span className="text-gray-900">Jharkhand Adventure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our carefully curated tour packages and experience the natural beauty, 
            rich culture, and vibrant traditions of Jharkhand.
          </p>
        </motion.div>

        {selectedPackage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8 bg-white rounded-3xl shadow-2xl border-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPackage.title}</h3>
              <p className="text-gray-600 mb-6">{selectedPackage.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl mb-6">
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-2xl font-bold text-blue-600">₹{(selectedPackage.price * travelers).toLocaleString()}</p>
                  {selectedPackage.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">₹{(selectedPackage.originalPrice * travelers).toLocaleString()}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPackage.duration} Days</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={() => setSelectedPackage(null)}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {jharkhandPackages.map((packageItem, index) => (
              <motion.div key={packageItem.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{packageItem.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm mb-4 flex-1">{packageItem.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{packageItem.duration} Days</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{packageItem.minGroupSize}-{packageItem.maxGroupSize} People</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                        <span>{packageItem.rating} ({packageItem.reviewCount})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-green-500" />
                        <span>{packageItem.destination.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{packageItem.price.toLocaleString()}
                        </div>
                        {packageItem.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{packageItem.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleBookNow(packageItem)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {jharkhandPackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏞️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Jharkhand Tour Packages Coming Soon</h3>
            <p className="text-gray-600">We're working on creating amazing experiences for you in Jharkhand!</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}