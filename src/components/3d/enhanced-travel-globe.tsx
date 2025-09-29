'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import { sampleDestinations } from '@/data/sample-data';

// Use all destination data from your project
const destinations = sampleDestinations.slice(0, 6).map(dest => ({
  id: dest.id,
  name: dest.name,
  lat: dest.location.lat,
  lng: dest.location.lng,
  color: dest.location.address.includes('Jharkhand') ? "#10b981" : "#ff6b6b", // Green for Jharkhand
  country: dest.location.address.split(',').pop()?.trim() || 'India',
  description: dest.description,
  isJharkhand: dest.location.address.includes('Jharkhand')
}));

// Main Component
const EnhancedTravelGlobeComponent: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  
  const handleDestinationClick = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination);
  };
  
  const handleCloseInfo = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-xl">
      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Travel Destinations</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">Explore amazing places around the world</p>
      </div>
      
      {/* Destinations Grid */}
      <div className="absolute top-20 left-0 right-0 bottom-0 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-xl shadow-md p-4 cursor-pointer border-2 ${
                selectedDestination?.id === dest.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleDestinationClick(dest)}
            >
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: dest.color }}></div>
                <div>
                  <h3 className="font-bold text-gray-800">{dest.name}</h3>
                  <p className="text-sm text-gray-600">{dest.country}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{dest.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Destination Info Panel with Booking */}
      {selectedDestination && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 p-4 rounded-lg border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold">{selectedDestination.name}</h3>
              <p className="text-sm text-gray-600">{selectedDestination.country}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">{selectedDestination.description}</p>
          
          <div className="flex gap-2">
            <Link href={`/destinations/${selectedDestination.id}`} passHref>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plane className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCloseInfo}
              className="px-3"
            >
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedTravelGlobeComponent;