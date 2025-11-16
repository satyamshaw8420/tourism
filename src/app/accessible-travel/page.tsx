'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plane, 
  Train, 
  User, 
  Heart, 
  Eye, 
  Ear, 
  Users, 
  Shield,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';
// import dynamic from 'next/dynamic' // Unused import - commented out to fix ESLint warning

// Dynamically import 3D components

const accessibilityFeatures = [
  {
    icon: User,
    title: "Wheelchair Accessible",
    description: "Special seating, ramps, and assistance for wheelchair users",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Eye,
    title: "Visual Assistance",
    description: "Audio guidance, braille materials, and dedicated support staff",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Ear,
    title: "Hearing Support",
    description: "Sign language interpreters and hearing loop systems",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Heart,
    title: "Medical Support",
    description: "Medical equipment storage and emergency assistance",
    color: "bg-red-100 text-red-600"
  }
];

const transportOptions = [
  {
    type: "flight",
    icon: Plane,
    title: "Accessible Flights",
    description: "Airlines with full accessibility features",
    features: ["Priority boarding", "Wheelchair assistance", "Special seating", "Medical equipment storage"]
  },
  {
    type: "train",
    icon: Train,
    title: "Accessible Trains",
    description: "Rail travel with accessibility accommodations",
    features: ["Level boarding", "Accessible restrooms", "Priority seating", "Audio announcements"]
  }
];

export default function AccessibleTravelPage() {
  const [selectedTransport, setSelectedTransport] = useState<'flight' | 'train'>('flight');
  const [bookingForm, setBookingForm] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    accessibilityNeeds: [] as string[],
    specialRequests: ''
  });

  const handleAccessibilityToggle = (need: string) => {
    setBookingForm(prev => ({
      ...prev,
      accessibilityNeeds: prev.accessibilityNeeds.includes(need)
        ? prev.accessibilityNeeds.filter(n => n !== need)
        : [...prev.accessibilityNeeds, need]
    }));
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking request:', bookingForm);
    alert('Booking request submitted! Our accessibility team will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Accessible Travel
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Travel should be for everyone. We provide comprehensive accessibility support to ensure your journey is comfortable, safe, and enjoyable.
          </p>
          
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>24/7 Accessibility Support: +91 93103 69192</span>
          </div>
        </motion.div>

        {/* Accessibility Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Accessibility Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                  <div className={`p-3 rounded-full w-fit mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transport Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Transport
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {transportOptions.map((option) => (
              <Card
                key={option.type}
                className={`p-6 cursor-pointer transition-all border-2 ${
                  selectedTransport === option.type
                    ? 'border-blue-500 bg-blue-50/80'
                    : 'border-gray-200 bg-white/80 hover:border-gray-300'
                } backdrop-blur-sm shadow-lg`}
                onClick={() => setSelectedTransport(option.type as 'flight' | 'train')}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full mr-4 ${
                    selectedTransport === option.type ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Book Accessible Travel
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={bookingForm.from}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, from: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Departure city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={bookingForm.to}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, to: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Destination city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={bookingForm.passengers}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Accessibility Needs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Accessibility Needs</label>
                  <div className="space-y-3">
                    {['Wheelchair assistance', 'Visual assistance', 'Hearing assistance', 'Medical equipment', 'Service animal'].map((need) => (
                      <label key={need} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={bookingForm.accessibilityNeeds.includes(need)}
                          onChange={() => handleAccessibilityToggle(need)}
                          className="mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{need}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                  <textarea
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe any specific accessibility requirements or assistance needed..."
                  />
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Request Accessible Booking
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}