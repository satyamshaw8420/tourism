'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Users, Globe, Lock, DollarSign, Calendar,
  MapPin, Target, Info, CheckCircle, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/sections/navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface GroupFormData {
  name: string
  description: string
  targetAmount: string
  maxMembers: string
  isPublic: boolean
  category: string
  destination: string
  travelDate: string
}

const categories = [
  'Beach & Coastal',
  'Mountain & Trekking', 
  'Heritage & Culture',
  'Adventure Sports',
  'City Exploration',
  'Wildlife & Nature',
  'Spiritual & Wellness',
  'Food & Culinary'
]

const popularDestinations = [
  'Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Uttarakhand',
  'Karnataka', 'Maharashtra', 'Gujarat', 'Andaman Islands', 'Ladakh',
  'Tamil Nadu', 'West Bengal', 'Assam', 'Sikkim', 'Other'
]

export default function CreateGroupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    targetAmount: '',
    maxMembers: '6',
    isPublic: true,
    category: '',
    destination: '',
    travelDate: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof GroupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Group name is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
      if (!formData.category) newErrors.category = 'Category is required'
    }

    if (step === 2) {
      if (!formData.destination) newErrors.destination = 'Destination is required'
      if (!formData.targetAmount) newErrors.targetAmount = 'Target amount is required'
      if (!formData.maxMembers) newErrors.maxMembers = 'Max members is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // In a real app, this would submit to API
      console.log('Creating group:', formData)
      router.push('/groups')
    }
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Group Name *
        </label>
        <Input
          placeholder="e.g., Goa Beach Squad"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          placeholder="Describe your travel plans, what you're looking for in group members, and what makes your trip special..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Travel Category *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleInputChange('category', category)}
              className={`p-3 text-sm border rounded-lg transition-all ${
                formData.category === category
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Destination *
        </label>
        <select
          value={formData.destination}
          onChange={(e) => handleInputChange('destination', e.target.value)}
          className={`w-full h-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.destination ? 'border-red-500' : ''}`}
        >
          <option value="">Select a destination</option>
          {popularDestinations.map((dest) => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
        {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Amount (₹) *
          </label>
          <Input
            type="number"
            placeholder="e.g., 30000"
            value={formData.targetAmount}
            onChange={(e) => handleInputChange('targetAmount', e.target.value)}
            className={`h-12 ${errors.targetAmount ? 'border-red-500' : ''}`}
          />
          {errors.targetAmount && <p className="text-red-500 text-sm mt-1">{errors.targetAmount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Members *
          </label>
          <select
            value={formData.maxMembers}
            onChange={(e) => handleInputChange('maxMembers', e.target.value)}
            className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {[2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
              <option key={num} value={num}>{num} members</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Travel Date (Optional)
        </label>
        <Input
          type="date"
          value={formData.travelDate}
          onChange={(e) => handleInputChange('travelDate', e.target.value)}
          className="h-12"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Group Visibility
        </label>
        <div className="grid gap-4">
          <button
            type="button"
            onClick={() => handleInputChange('isPublic', true)}
            className={`p-4 border rounded-lg text-left transition-all ${
              formData.isPublic
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Globe className={`w-5 h-5 ${formData.isPublic ? 'text-blue-600' : 'text-gray-500'}`} />
              <div>
                <h3 className="font-semibold text-gray-900">Public Group</h3>
                <p className="text-sm text-gray-600">Anyone can discover and request to join your group</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleInputChange('isPublic', false)}
            className={`p-4 border rounded-lg text-left transition-all ${
              !formData.isPublic
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Lock className={`w-5 h-5 ${!formData.isPublic ? 'text-blue-600' : 'text-gray-500'}`} />
              <div>
                <h3 className="font-semibold text-gray-900">Private Group</h3>
                <p className="text-sm text-gray-600">Only people you invite can join your group</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Group Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{formData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Destination:</span>
            <span className="font-medium">{formData.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Target Amount:</span>
            <span className="font-medium">₹{formData.targetAmount ? parseInt(formData.targetAmount).toLocaleString() : '0'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Max Members:</span>
            <span className="font-medium">{formData.maxMembers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Visibility:</span>
            <span className="font-medium">{formData.isPublic ? 'Public' : 'Private'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white pt-32 pb-12">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/groups" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Groups
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Create Travel Group</h1>
            <p className="text-lg md:text-xl opacity-90">
              Start your journey by creating a group to find travel companions and share costs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card className="p-8 border-0 shadow-lg">
            {/* Step Headers */}
            <div className="mb-6">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                  <p className="text-gray-600">Tell us about your travel group and what you're planning</p>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Details</h2>
                  <p className="text-gray-600">Where are you going and what's your budget?</p>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy & Review</h2>
                  <p className="text-gray-600">Choose your group settings and review your information</p>
                </div>
              )}
            </div>

            {/* Step Content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6"
                >
                  Create Group
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}