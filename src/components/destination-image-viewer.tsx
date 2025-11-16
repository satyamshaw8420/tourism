'use client';

import React, { useState, useEffect } from 'react';
import { sampleDestinations } from '@/data/sample-data';
import { X, ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDestinationImages } from '@/lib/destination-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DestinationImageViewerProps {
  selectedDestinationId: string | null;
  onClose: () => void;
}

const DestinationImageViewer: React.FC<DestinationImageViewerProps> = ({ 
  selectedDestinationId, 
  onClose 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  
  // Find the selected destination
  const selectedDestination = sampleDestinations.find(
    dest => dest.id === selectedDestinationId
  );
  
  // If no destination is selected, don't render anything
  if (!selectedDestinationId || !selectedDestination) {
    return null;
  }
  
  // Load images when destination changes
  useEffect(() => {
    if (selectedDestination) {
      const images = getDestinationImages(selectedDestination.id, selectedDestination.name);
      const displayImages = images.length > 0 
        ? images 
        : [selectedDestination.image];
      setAllImages(displayImages);
      setCurrentImageIndex(0);
    }
  }, [selectedDestination]);
  
  const goToPrevious = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex(prev => 
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    }
  };
  
  const goToNext = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex(prev => 
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages, currentImageIndex]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-6xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all shadow-lg"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          {/* Navigation buttons */}
          {allImages.length > 1 && (
            <>
              <button 
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
          
          {/* Image display */}
          <div className="relative h-[70vh] flex items-center justify-center">
            {allImages.length > 0 && (
              <img 
                src={allImages[currentImageIndex] || '/placeholder-destination.jpg'} 
                alt={`${selectedDestination.name} - Image ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-destination.jpg';
                }}
              />
            )}
          </div>
          
          {/* Destination info */}
          <div className="p-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{selectedDestination.name}</h2>
                <p className="text-white/80 mt-1">{selectedDestination.location.address}</p>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedDestination.rating}</span>
                    <span className="text-sm text-white/70">
                      ({selectedDestination.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{selectedDestination.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link href={`/destinations/${selectedDestination.id}`}>
                  <Button 
                    variant="default"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-medium"
                  >
                    View Details
                  </Button>
                </Link>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all"
                >
                  Close
                </button>
              </div>
            </div>
            
            {/* Image counter */}
            {allImages.length > 1 && (
              <div className="mt-4 text-center text-white/80">
                Image {currentImageIndex + 1} of {allImages.length}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DestinationImageViewer;