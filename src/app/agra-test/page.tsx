'use client'

import { sampleDestinations } from '@/data/sample-data'
import Image from 'next/image'
import { useState } from 'react'

export default function AgraTestPage() {
  const agraDestination = sampleDestinations.find(d => d.id === '8') // Agra Heritage has id '8'
  
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  
  if (!agraDestination) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Agra Heritage destination not found!</h1>
      </div>
    )
  }
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Agra Heritage Image Test</h1>
      
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{agraDestination.name}</h2>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium">ID:</p>
                <p className="text-gray-700">{agraDestination.id}</p>
              </div>
              
              <div>
                <p className="font-medium">Image Path:</p>
                <p className="text-gray-700 break-all bg-gray-100 p-2 rounded">{agraDestination.image}</p>
              </div>
              
              <div>
                <p className="font-medium">Status:</p>
                <p className={`font-medium ${
                  imageStatus === 'loaded' ? 'text-green-600' : 
                  imageStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {imageStatus === 'loaded' ? '✅ Loaded' : 
                   imageStatus === 'error' ? '❌ Error' : '⏳ Loading...'}
                </p>
              </div>
              
              {imageDimensions && (
                <div>
                  <p className="font-medium">Dimensions:</p>
                  <p className="text-gray-700">{imageDimensions.width} × {imageDimensions.height} pixels</p>
                </div>
              )}
              
              <div>
                <p className="font-medium">Category:</p>
                <p className="text-gray-700">{agraDestination.category}</p>
              </div>
              
              <div>
                <p className="font-medium">Featured:</p>
                <p className="text-gray-700">{agraDestination.featured ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Image Preview</h3>
            <div className="border-2 border-dashed rounded-xl p-4 h-96 flex items-center justify-center">
              {agraDestination.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={agraDestination.image}
                    alt={agraDestination.name}
                    fill
                    className="object-contain rounded-lg"
                    onLoadingComplete={(img) => {
                      setImageStatus('loaded')
                      setImageDimensions({
                        width: img.naturalWidth,
                        height: img.naturalHeight
                      })
                    }}
                    onError={() => {
                      setImageStatus('error')
                      console.error('Failed to load image:', agraDestination.image)
                    }}
                  />
                </div>
              ) : (
                <p className="text-gray-500">No image path specified</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">File Verification</h3>
          <p>Checking if the image file exists at the specified path...</p>
          <p className="text-sm text-gray-600 mt-2">
            If you&#39;re seeing this page, the Next.js application is running correctly. 
            The issue might be with the image file itself or how it&#39;s being referenced.
          </p>
        </div>
      </div>
    </div>
  )
}