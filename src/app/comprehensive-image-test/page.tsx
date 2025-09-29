'use client'

import { sampleDestinations } from '@/data/sample-data'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ComprehensiveImageTestPage() {
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, { status: 'loading' | 'loaded' | 'error', width?: number, height?: number }>>({})
  
  // Test the first 10 destinations
  const testDestinations = sampleDestinations.slice(0, 10)
  
  useEffect(() => {
    // Initialize all images as loading
    const initialStatus: Record<string, { status: 'loading' | 'loaded' | 'error', width?: number, height?: number }> = {}
    testDestinations.forEach(dest => {
      initialStatus[dest.id] = { status: 'loading' }
    })
    setImageLoadStatus(initialStatus)
  }, [])
  
  const handleImageLoad = (id: string, width?: number, height?: number) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [id]: { status: 'loaded', width, height }
    }))
  }
  
  const handleImageError = (id: string) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [id]: { status: 'error' }
    }))
  }
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Comprehensive Image Loading Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testDestinations.map(destination => (
          <div key={destination.id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
            <p className="text-gray-600 text-sm mb-3">ID: {destination.id}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Image Path:</p>
              <p className="text-xs bg-gray-100 p-2 rounded break-all">{destination.image}</p>
            </div>
            
            <div className="relative h-48 mb-4 rounded overflow-hidden border">
              {destination.image ? (
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                  onLoadingComplete={(img) => {
                    handleImageLoad(destination.id, img.naturalWidth, img.naturalHeight)
                  }}
                  onError={() => {
                    handleImageError(destination.id)
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">No image path</p>
                </div>
              )}
            </div>
            
            <div className="text-sm">
              <p className="font-medium mb-1">Status:</p>
              {imageLoadStatus[destination.id]?.status === 'loaded' ? (
                <p className="text-green-600">✅ Loaded ({imageLoadStatus[destination.id]?.width}×{imageLoadStatus[destination.id]?.height})</p>
              ) : imageLoadStatus[destination.id]?.status === 'error' ? (
                <p className="text-red-600">❌ Error loading image</p>
              ) : (
                <p className="text-yellow-600">⏳ Loading...</p>
              )}
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              <p>Featured: {destination.featured ? 'Yes' : 'No'}</p>
              <p>Category: {destination.category}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">Total Images:</p>
            <p>{testDestinations.length}</p>
          </div>
          <div>
            <p className="font-medium">Loaded:</p>
            <p className="text-green-600">{Object.values(imageLoadStatus).filter(s => s.status === 'loaded').length}</p>
          </div>
          <div>
            <p className="font-medium">Errors:</p>
            <p className="text-red-600">{Object.values(imageLoadStatus).filter(s => s.status === 'error').length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}