import { sampleDestinations } from '@/data/sample-data';
import { getMainDestinationImageServer } from '@/lib/destination-images.server';
import DestinationsShowcaseClient from './destinations-showcase';

// Define the type for our destination with preloaded image data
// This should match the interface in destinations-showcase.tsx
interface DestinationWithImages {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;                    
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: Date;
  mainImage: string;
}

// Preload images on the server side
async function getDestinationsWithImages() {
  const destinationsWithImages: DestinationWithImages[] = await Promise.all(
    sampleDestinations.map(async (destination) => {
      try {
        const mainImage = getMainDestinationImageServer(destination.id, destination.name);
        return {
          id: destination.id,
          name: destination.name,
          description: destination.description,
          image: destination.image,
          category: destination.category,
          location: {
            lat: destination.location.lat,
            lng: destination.location.lng,
            address: destination.location.address
          },
          rating: destination.rating,
          reviewCount: destination.reviewCount,
          featured: destination.featured ?? false, // Ensure featured is always boolean
          createdAt: destination.createdAt,
          mainImage: mainImage
        };
      } catch (error) {
        console.error(`Error loading image for destination ${destination.name}:`, error);
        // Return the destination with a fallback image
        return {
          id: destination.id,
          name: destination.name,
          description: destination.description,
          image: destination.image,
          category: destination.category,
          location: {
            lat: destination.location.lat,
            lng: destination.location.lng,
            address: destination.location.address
          },
          rating: destination.rating,
          reviewCount: destination.reviewCount,
          featured: destination.featured ?? false, // Ensure featured is always boolean
          createdAt: destination.createdAt,
          mainImage: destination.image || '/placeholder-destination.jpg'
        };
      }
    })
  );
  
  return destinationsWithImages;
}

export default async function DestinationsShowcaseServer() {
  const destinationsWithImages = await getDestinationsWithImages();
  
  // Get featured destinations (first 6 featured ones)
  let featuredDestinations = destinationsWithImages.filter(d => d.featured).slice(0, 6);
  
  // Ensure we have some Jharkhand destinations in the featured list
  const jharkhandDestinations = destinationsWithImages.filter(d => 
    d.location.address.includes('Jharkhand') && d.featured
  );
  
  // If we don't have enough Jharkhand destinations in featured, add some
  if (jharkhandDestinations.length > 0) {
    // Replace some of the existing featured destinations with Jharkhand ones
    const nonJharkhandFeatured = featuredDestinations.filter(d => 
      !d.location.address.includes('Jharkhand')
    );
    
    // Add at least 2 Jharkhand destinations to the featured list
    const jharkhandToAdd = jharkhandDestinations.slice(0, 2);
    featuredDestinations = [...jharkhandToAdd, ...nonJharkhandFeatured].slice(0, 6);
  }
  
  return <DestinationsShowcaseClient featuredDestinations={featuredDestinations} />;
}