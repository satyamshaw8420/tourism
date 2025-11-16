'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface DestinationImageGalleryProps {
  destinationId: string;
  destinationName: string;
  initialImages?: string[];
  maxImages?: number; // Limit the number of images displayed in the grid
  showImageCount?: boolean; // Show/hide image count indicator
}

const DestinationImageGallery: React.FC<DestinationImageGalleryProps> = ({ 
  destinationId, 
  destinationName,
  initialImages = [],
  maxImages = 8,
  showImageCount = true
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [allImages, setAllImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(false);
  
  // Load images dynamically if not provided
  useEffect(() => {
    if (initialImages.length === 0) {
      setLoading(true);
      fetch(`/api/destination-images?id=${destinationId}&name=${encodeURIComponent(destinationName)}`)
        .then(response => response.json())
        .then(data => {
          if (data.images && data.images.length > 0) {
            setAllImages(data.images);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching destination images:', error);
          setLoading(false);
        });
    }
  }, [destinationId, destinationName, initialImages]);
  
  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };
  
  const closeImage = () => {
    setSelectedImageIndex(null);
  };
  
  const goToPrevious = () => {
    if (selectedImageIndex !== null && allImages.length > 0) {
      setSelectedImageIndex(prev => 
        prev === 0 ? allImages.length - 1 : (prev || 0) - 1
      );
    }
  };
  
  const goToNext = () => {
    if (selectedImageIndex !== null && allImages.length > 0) {
      setSelectedImageIndex(prev => 
        prev === allImages.length - 1 ? 0 : (prev || 0) + 1
      );
    }
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'Escape') {
          closeImage();
        } else if (e.key === 'ArrowLeft') {
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Don't render if there are no images and not loading
  if (!loading && allImages.length === 0) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Limit images displayed in the grid
  const displayImages = allImages.slice(0, maxImages);
  const remainingImages = allImages.length - maxImages;
  
  return (
    <div className="w-full">
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayImages.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md group"
            onClick={() => openImage(index)}
          >
            <img 
              src={image} 
              alt={`${destinationName} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-destination.jpg';
              }}
            />
            {index === 0 && showImageCount && allImages.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <ImageIcon className="w-3 h-3 mr-1" />
                {allImages.length}
              </div>
            )}
            {index === displayImages.length - 1 && remainingImages > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <span className="text-lg font-bold">+{remainingImages}</span>
                  <span className="block text-xs">more photos</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center p-4"
            onClick={closeImage}
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
                onClick={closeImage}
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
              <div className="relative h-[80vh] flex items-center justify-center">
                <img 
                  src={allImages[selectedImageIndex]} 
                  alt={`${destinationName} - Image ${selectedImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-destination.jpg';
                  }}
                />
              </div>
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">{destinationName}</h3>
                    <p className="text-gray-300">
                      Image {selectedImageIndex + 1} of {allImages.length}
                    </p>
                  </div>
                  <button 
                    onClick={closeImage}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationImageGallery;