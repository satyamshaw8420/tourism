'use client'

import { sampleDestinations } from '@/data/sample-data'

export default function DebugImagesPage() {
  // Get the first 5 destinations
  const testDestinations = sampleDestinations.slice(0, 5)
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Debug Images</h1>
      
      <div className="space-y-6">
        {testDestinations.map(destination => (
          <div key={destination.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{destination.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Image Information</h3>
                <ul className="space-y-2">
                  <li><strong>ID:</strong> {destination.id}</li>
                  <li><strong>Path:</strong> {destination.image}</li>
                  <li><strong>Category:</strong> {destination.category}</li>
                  <li><strong>Featured:</strong> {destination.featured ? 'Yes' : 'No'}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Image Preview</h3>
                <div className="border rounded p-4">
                  {destination.image ? (
                    <>
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="max-w-full h-auto rounded"
                        style={{ maxHeight: '200px' }}
                      />
                      <p className="mt-2 text-sm text-gray-600">If you see a broken image icon, the path is incorrect or file doesn't exist</p>
                    </>
                  ) : (
                    <p className="text-red-500">No image path specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}