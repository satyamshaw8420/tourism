#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to copy images to destination directories
function addMultipleImages(destinationName, imagePaths) {
  try {
    // Convert destination name to folder name format
    const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
    
    // Path to the destination folder
    const destDir = path.join(__dirname, '..', 'public', 'destinations', folderName);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`📁 Created directory: ${destDir}`);
    }
    
    // Copy each image to the destination folder
    imagePaths.forEach((imagePath, index) => {
      if (fs.existsSync(imagePath)) {
        const fileName = path.basename(imagePath);
        const destPath = path.join(destDir, fileName);
        
        // Copy the file
        fs.copyFileSync(imagePath, destPath);
        console.log(`✅ Copied ${fileName} to ${destDir}`);
      } else {
        console.log(`⚠️  Image not found: ${imagePath}`);
      }
    });
    
    console.log(`\n✅ Added ${imagePaths.length} images to ${destinationName}`);
    console.log(`📁 Destination folder: ${destDir}`);
    console.log('\nTo update the data file, run: node scripts/update-destination-images.js');
  } catch (error) {
    console.error('❌ Error adding images:', error);
  }
}

// Example usage:
// addMultipleImages("Goa Beaches", [
//   "path/to/goa1.jpg",
//   "path/to/goa2.jpg",
//   "path/to/goa3.jpg"
// ]);

console.log('=== ADD MULTIPLE DESTINATION IMAGES ===\n');
console.log('To use this script, edit it to add your image paths and destination names.');
console.log('Then run: node scripts/add-multiple-destination-images.js\n');

module.exports = { addMultipleImages };