#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the sample data file
const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Function to get all images for a destination
function getDestinationImages(destinationName) {
  try {
    // Convert destination name to folder name format
    const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
    
    // Path to the destination folder
    const destDir = path.join(__dirname, '..', 'public', 'destinations', folderName);
    
    // Check if directory exists
    if (!fs.existsSync(destDir)) {
      return [];
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(destDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png')
    );
    
    // Return full paths for the images
    return imageFiles.map(file => `/destinations/${folderName}/${file}`);
  } catch (error) {
    console.error('Error reading destination images:', error);
    return [];
  }
}

// Extract destination information using regex
const destinationRegex = /id: '(\d+)',\s*name: '([^']*)',[\s\S]*?image: '([^']*)'/g;
const destinations = [];
let match;

console.log('=== UPDATING DESTINATION IMAGES ===\n');

while ((match = destinationRegex.exec(dataContent)) !== null) {
  const id = match[1];
  const name = match[2];
  const currentImagePath = match[3];
  
  // Get all images for this destination
  const images = getDestinationImages(name);
  
  if (images.length > 1) {
    console.log(`${id}. ${name}`);
    console.log(`   Current image: ${currentImagePath}`);
    console.log(`   Found ${images.length} images`);
    
    // Create the images array string
    const imagesArray = `[${images.map(img => `'${img}'`).join(', ')}]`;
    
    // Update the data content to include the images array
    const destinationPattern = new RegExp(
      `(id: '${id}',\\s*name: '${name.replace(/'/g, "\\'")}',[\\s\\S]*?image: '${currentImagePath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}',[\\s\\S]*?)(category:)`,
      'g'
    );
    
    dataContent = dataContent.replace(
      destinationPattern,
      `$1images: ${imagesArray},\n    $2`
    );
    
    console.log(`   ✅ Updated with ${images.length} images\n`);
  } else if (images.length === 1 && images[0] !== currentImagePath) {
    console.log(`${id}. ${name}`);
    console.log(`   Current image: ${currentImagePath}`);
    console.log(`   Found 1 image: ${images[0]}`);
    
    // Update the main image path
    const destinationPattern = new RegExp(
      `(id: '${id}',\\s*name: '${name.replace(/'/g, "\\'")}',[\\s\\S]*?image: ')${currentImagePath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}('[\\s\\S]*?)(category:)`,
      'g'
    );
    
    dataContent = dataContent.replace(
      destinationPattern,
      `$1${images[0]}$2$3`
    );
    
    console.log(`   ✅ Updated main image path\n`);
  } else {
    console.log(`${id}. ${name} - No additional images found or already up to date`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(dataPath, dataContent);
console.log('✅ All destination images updated successfully!');
console.log('\n📝 Data file updated: src/data/sample-data.ts');