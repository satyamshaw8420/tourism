import fs from 'fs';
import path from 'path';

/**
 * Server-side utility functions for destination images
 * These should only be imported and used in server components or API routes
 */

/**
 * Get all image paths for a destination (server-side only)
 * @param destinationId The ID of the destination
 * @param destinationName The name of the destination
 * @returns Array of image paths
 */
export function getDestinationImagesServer(_destinationId: string, destinationName: string): string[] {
  try {
    // Convert destination name to folder name format
    const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
    
    // Path to the destination folder
    const destDir = path.join(process.cwd(), 'public', 'destinations', folderName);
    
    // Check if directory exists
    if (!fs.existsSync(destDir)) {
      // Try alternative folder names (handle special characters, etc.)
      const alternativeNames = [
        folderName.replace(/[^a-z0-9-]/g, ''), // Remove special characters
        folderName.replace(/-+/g, '-'), // Replace multiple dashes with single dash
        folderName.replace(/^-+|-+$/g, ''), // Remove leading/trailing dashes
      ];
      
      for (const altName of alternativeNames) {
        const altDir = path.join(process.cwd(), 'public', 'destinations', altName);
        if (fs.existsSync(altDir)) {
          return readImagesFromDirectory(altDir, folderName);
        }
      }
      
      return [];
    }
    
    // Check if the expected folder is empty
    const files = fs.readdirSync(destDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp';
    });
    
    // If the expected folder is empty, try to find images in alternative folders
    if (imageFiles.length === 0) {
      // For Mumbai City, check the "mumbai" folder
      if (folderName === 'mumbai-city') {
        const mumbaiDir = path.join(process.cwd(), 'public', 'destinations', 'mumbai');
        if (fs.existsSync(mumbaiDir)) {
          const mumbaiFiles = fs.readdirSync(mumbaiDir);
          const mumbaiImageFiles = mumbaiFiles.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp';
          });
          
          if (mumbaiImageFiles.length > 0) {
            return mumbaiImageFiles.map(file => `/destinations/mumbai/${file}`);
          }
        }
      }
      
      // Try other alternative folder names
      const alternativeNames = [
        folderName.split('-')[0], // Just the first part (e.g., "mumbai" from "mumbai-city")
        folderName.replace(/-city$/, ''), // Remove "-city" suffix
      ];
      
      for (const altName of alternativeNames) {
        if (altName === folderName) continue; // Skip the original folder name
        
        const altDir = path.join(process.cwd(), 'public', 'destinations', altName);
        if (fs.existsSync(altDir)) {
          const altFiles = fs.readdirSync(altDir);
          const altImageFiles = altFiles.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp';
          });
          
          if (altImageFiles.length > 0) {
            return altImageFiles.map(file => `/destinations/${altName}/${file}`);
          }
        }
      }
      
      return [];
    }
    
    return readImagesFromDirectory(destDir, folderName);
  } catch (_error) {
    console.error('Error reading destination images:', _error);
    return [];
  }
}

/**
 * Read images from a directory and return their paths (server-side only)
 * @param directoryPath The path to the directory
 * @param folderName The name of the folder for URL construction
 * @returns Array of image paths
 */
function readImagesFromDirectory(directoryPath: string, folderName: string): string[] {
  try {
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp';
    });
    
    // Sort files to ensure consistent ordering
    imageFiles.sort();
    
    // Return full paths for the images
    return imageFiles.map(file => `/destinations/${folderName}/${file}`);
  } catch (_error) {
    console.error('Error reading images from directory:', _error);
    return [];
  }
}

/**
 * Get the main image for a destination (server-side only)
 * @param destinationId The ID of the destination
 * @param destinationName The name of the destination
 * @returns Main image path
 */
export function getMainDestinationImageServer(destinationId: string, destinationName: string): string {
  const images = getDestinationImagesServer(destinationId, destinationName);
  return images.length > 0 ? images[0] : '/placeholder-destination.jpg';
}

/**
 * Check if a destination has a folder with images (server-side only)
 * @param destinationName The name of the destination
 * @returns Boolean indicating if the destination has a folder
 */
export function hasDestinationFolder(destinationName: string): boolean {
  try {
    const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
    const destDir = path.join(process.cwd(), 'public', 'destinations', folderName);
    return fs.existsSync(destDir);
  } catch (_error) {
    return false;
  }
}