'use client'

import { sampleTourPackages } from '@/data/sample-data'
import Link from 'next/link'

export default function RajasthanTestPage() {
  // Find the Rajasthan Heritage tour
  const rajasthanTour = sampleTourPackages.find(tour => 
    tour.destination.name === 'Rajasthan Heritage'
  )
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Rajasthan Heritage Tour Test</h1>
      
      <div className="bg-white rounded-xl shadow-xl p-6">
        {rajasthanTour ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-green-600">✅ Tour Found!</h2>
              <p className="text-gray-600">The Rajasthan Heritage booking system is now working.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{rajasthanTour.title}</h3>
              <p className="text-gray-700 mb-4">{rajasthanTour.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">₹{rajasthanTour.price.toLocaleString()}</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {rajasthanTour.duration} days
                </span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link 
                href={`/tours/${rajasthanTour.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Tour Details
              </Link>
              <Link 
                href={`/booking/${rajasthanTour.id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Book This Tour
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-red-600">❌ Tour Not Found</h2>
            <p className="text-gray-600">The Rajasthan Heritage booking system is still not working.</p>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">All Tour Packages:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleTourPackages.map(tour => (   
              <li key={tour.id} className="border rounded-lg p-3">
                <div className="font-medium">{tour.title}</div>
                <div className="text-sm text-gray-600">Destination: {tour.destination.name}</div>
                <div className="text-sm text-gray-500">ID: {tour.id}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}