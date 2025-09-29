'use client'

import { sampleDestinations } from '@/data/sample-data'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ImageTestPage() {
  const [imageStatus, setImageStatus] = useState<Record<string, string>>({})
  
  useEffect(() => {
    // Test image loading
    sampleDestinations.slice(0, 5).forEach(destination => {
      const img = new window.Image()
      img.onload = () => {
        setImageStatus(prev => ({
          ...prev,
          [destination.id]: 'loaded'
        }))
      }
      img.onerror = () => {
        setImageStatus(prev => ({
          ...prev,
          [destination.id]: 'error'
        }))
      }
      img.src = destination.image
    })
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleDestinations.slice(0, 5).map(destination => (
          <div key={destination.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
            <p className="text-gray-600 mb-2">Path: {destination.image}</p>
            
            <div className="relative h-48 mb-4">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  console.error(`Failed to load image for ${destination.name}:`, destination.image)
                  setImageStatus(prev => ({
                    ...prev,
                    [destination.id]: 'error'
                  }))
                }}
                onLoad={() => {
                  setImageStatus(prev => ({
                    ...prev,
                    [destination.id]: 'loaded'
                  }))
                }}
              />
            </div>
            
            <p className="text-sm">
              Status: {imageStatus[destination.id] === 'loaded' ? (
                <span className="text-green-600">✅ Loaded</span>
              ) : imageStatus[destination.id] === 'error' ? (
                <span className="text-red-600">❌ Error</span>
              ) : (
                <span className="text-yellow-600">⏳ Loading...</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}