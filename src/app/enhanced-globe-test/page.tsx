'use client'

import { useState, useEffect } from 'react'
import EnhancedTravelGlobeComponent from '@/components/3d/enhanced-travel-globe'

export default function EnhancedGlobeTest() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-8 text-gray-800">Enhanced Travel Globe Test</h1>
        
        {isClient ? (
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <EnhancedTravelGlobeComponent />
          </div>
        ) : (
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
            <p className="text-gray-600">Loading 3D Globe...</p>
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-600">
          <p>Interactive 3D globe with Jharkhand destinations highlighted in green.</p>
          <p className="mt-2">Click on the green dots to see destination details and booking options.</p>
        </div>
      </div>
    </div>
  )
}