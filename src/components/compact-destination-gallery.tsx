'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface CompactDestinationGalleryProps {
  destinationId: string;
  destinationName: string;
  maxImages?: number;
  onClick?: () => void;
}

const CompactDestinationGallery: React.FC<CompactDestinationGalleryProps> = ({ 
  destinationId,
  destinationName,
  maxImages = 4,
  onClick
}) => {
  const [allImages, setAllImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Load images dynamically
  useEffect(() => {
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
  }, [destinationId, destinationName]);
  
  // Limit images displayed
  const displayImages = allImages.slice(0, maxImages);
  const remainingImages = allImages.length - maxImages;

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Don't render if there are no images
  if (allImages.length === 0) {
    return null;
  }

  return (
    <div 
      className={`grid gap-1 ${onClick ? 'cursor-pointer' : ''}`}
      style={{ 
        gridTemplateColumns: `repeat(${Math.min(displayImages.length, 2)}, 1fr)`,
        width: '100%',
        height: '100%'
      }}
      onClick={onClick}
    >
      {displayImages.map((image, index) => (
        <div 
          key={index}
          className="relative aspect-square rounded overflow-hidden"
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
          {index === 0 && allImages.length > 1 && (
            <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded flex items-center">
              <ImageIcon className="w-2 h-2 mr-0.5" />
              {allImages.length}
            </div>
          )}
          {index === displayImages.length - 1 && remainingImages > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center text-xs font-bold">
                +{remainingImages}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompactDestinationGallery;