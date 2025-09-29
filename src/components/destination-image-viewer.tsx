'use client';

import React, { useState } from 'react';
import { sampleDestinations } from '@/data/sample-data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DestinationImageViewerProps {
  selectedDestinationId: string | null;
  onClose: () => void;
}

const DestinationImageViewer: React.FC<DestinationImageViewerProps> = ({ 
  selectedDestinationId, 
  onClose 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Find the selected destination
  const selectedDestination = sampleDestinations.find(
    dest => dest.id === selectedDestinationId
  );
  
  // If no destination is selected, don't render anything
  if (!selectedDestinationId || !selectedDestination) {
    return null;
  }
  
  // Get images for this destination
  const images = [selectedDestination.image]; // For now, just the main image
  
  const goToPrevious = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all shadow-lg"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
          
          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button 
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
          
          {/* Image display */}
          <div className="relative h-[70vh]">
            <img 
              src={images[currentImageIndex] || '/placeholder-destination.jpg'} 
              alt={selectedDestination.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-destination.jpg';
              }}
            />
          </div>
          
          {/* Destination info */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDestination.name}</h2>
                <p className="text-gray-600 mt-1">{selectedDestination.location.address}</p>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow">
                <span className="text-sm font-medium text-gray-700">
                  {selectedDestination.rating} ★
                </span>
                <span className="text-xs text-gray-500">
                  ({selectedDestination.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            <p className="mt-4 text-gray-700">{selectedDestination.description}</p>
            
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg">
                Book Now
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DestinationImageViewer;