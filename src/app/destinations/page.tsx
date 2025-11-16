import { sampleDestinations } from '@/data/sample-data'
import DestinationsPageClient from './page-client'
import { getMainDestinationImageServer } from '@/lib/destination-images.server'
import { Destination } from '@/types'

// Define the type for our destination with preloaded image data
interface DestinationWithImage extends Destination {
  mainImage: string;
}

// Preload images on the server side
async function getDestinationsWithImages(): Promise<DestinationWithImage[]> {
  const destinationsWithImages: DestinationWithImage[] = await Promise.all(
    sampleDestinations.map(async (destination) => {
      const mainImage = getMainDestinationImageServer(destination.id, destination.name);
      return {
        ...destination,
        mainImage,
        // Ensure featured is always a boolean
        featured: destination.featured ?? false
      };
    })
  );
  
  return destinationsWithImages;
}

export default async function DestinationsPage() {
  const destinationsWithImages = await getDestinationsWithImages();
  
  return <DestinationsPageClient destinationsWithImages={destinationsWithImages} />;
}