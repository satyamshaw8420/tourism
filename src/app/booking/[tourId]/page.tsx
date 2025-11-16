'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, CreditCard, Shield, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { sampleTourPackages } from '@/data/sample-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/sections/navbar'

interface BookingPageProps {
  params: Promise<{
    tourId: string
  }>
}

export default function BookingPage({ params }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [travelers, setTravelers] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('full')
  const [emiDuration, setEmiDuration] = useState(3)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })

  // Unwrap params using React.use()
  const { tourId } = use(params)
  const tour = sampleTourPackages.find(t => t.id === tourId)
  
  if (!tour) {
    notFound()
  }

  const totalAmount = tour.price * travelers
  const emiAmount = paymentMethod === 'emi' ? Math.ceil(totalAmount / emiDuration) : 0

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    alert(`Booking confirmed for ${tour.title}!\nTotal: ₹${totalAmount.toLocaleString()}\nTravelers: ${travelers}\nDate: ${selectedDate}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link href={`/tours/${tourId}`} className="inline-flex items-center mb-4 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tour Details
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-xl opacity-90">You&#39;re just a few steps away from an amazing adventure!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Selection */}
            <Card className="p-6 border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Details</h2>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{tour.destination.name.slice(0, 2)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tour.title}</h3>
                  <p className="text-gray-600">{tour.destination.location.address}</p>
                  <p className="text-sm text-gray-500">{tour.duration} days • {tour.rating}⭐ ({tour.reviewCount} reviews)</p>
                </div>
              </div>
            </Card>

            {/* Travel Details */}
            <Card className="p-6 border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Choose your travel date</option>
                    {tour.availability.map((date, index) => (
                      <option key={index} value={date.toISOString()}>
                        {date.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Travelers
                  </label>
                  <select 
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {Array.from({ length: tour.maxGroupSize - tour.minGroupSize + 1 }, (_, i) => (
                      <option key={i} value={tour.minGroupSize + i}>
                        {tour.minGroupSize + i} {tour.minGroupSize + i === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6 border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className="h-12"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className="h-12"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="h-12"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-24 resize-none"
                />
              </div>
            </Card>

            {/* Payment Options */}
            <Card className="p-6 border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <CreditCard className="w-6 h-6 inline mr-2" />
                Payment Options
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="full"
                    checked={paymentMethod === 'full'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Pay Full Amount</div>
                    <div className="text-sm text-gray-600">Pay ₹{totalAmount.toLocaleString()} now</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="partial"
                    checked={paymentMethod === 'partial'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Pay Partial Amount</div>
                    <div className="text-sm text-gray-600">Pay ₹{Math.ceil(totalAmount * 0.3).toLocaleString()} now, rest before travel</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="emi"
                    checked={paymentMethod === 'emi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">EMI Option</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Pay in {emiDuration} monthly installments of ₹{emiAmount.toLocaleString()}
                    </div>
                    {paymentMethod === 'emi' && (
                      <select
                        value={emiDuration}
                        onChange={(e) => setEmiDuration(Number(e.target.value))}
                        className="p-2 border border-gray-300 rounded text-sm"
                      >
                        <option value={3}>3 months</option>
                        <option value={6}>6 months</option>
                        <option value={12}>12 months</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tour Price (per person):</span>
                  <span className="font-medium">₹{tour.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Travelers:</span>
                  <span className="font-medium">{travelers}</span>
                </div>
                {tour.originalPrice && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings:</span>
                    <span className="font-medium">₹{((tour.originalPrice - tour.price) * travelers).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {paymentMethod === 'partial' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Payment Schedule:</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <div>Now: ₹{Math.ceil(totalAmount * 0.3).toLocaleString()}</div>
                    <div>Before travel: ₹{Math.ceil(totalAmount * 0.7).toLocaleString()}</div>
                  </div>
                </div>
              )}

              {paymentMethod === 'emi' && (
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-purple-900 mb-2">EMI Details:</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <div>{emiDuration} monthly payments</div>
                    <div>₹{emiAmount.toLocaleString()} per month</div>
                    <div className="text-xs">*Interest rates may apply</div>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleBooking}
                disabled={!selectedDate || !formData.firstName || !formData.email}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </Button>
              
              <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                <Shield className="w-4 h-4 mr-2" />
                Secure payment • Free cancellation
              </div>
            </Card>
            
            {/* Trust Indicators */}
            <Card className="p-6 border-0 shadow-lg">
              <h4 className="font-medium text-gray-900 mb-3">Why Book With Us?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Experienced Local Guides</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Flexible Cancellation</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}