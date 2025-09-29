#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the sample data file
const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract destination information
const destinationRegex = /id: '(\d+)',\s*name: '([^']*)',[\s\S]*?image: '([^']*)'/g;
const destinations = [];
let match;

console.log('=== DESTINATION IMAGE PATHS ===\n');

while ((match = destinationRegex.exec(dataContent)) !== null) {
  const id = match[1];
  const name = match[2];
  const imagePath = match[3];
  
  destinations.push({
    id,
    name,
    imagePath
  });
  
  console.log(`${id}. ${name}`);
  console.log(`   Image Path: ${imagePath}`);
  
  // Check if image file exists
  const fullPath = path.join(__dirname, '..', 'public', imagePath.substring(1));
  if (imagePath.startsWith('/destinations/') && fs.existsSync(fullPath)) {
    console.log(`   ✅ Image file exists`);
  } else if (imagePath.startsWith('/destinations/')) {
    console.log(`   ⚠️  Image file not found (expected at: ${fullPath})`);
  } else {
    console.log(`   ℹ️  Using default image path`);
  }
  console.log('');
}

console.log(`\nTotal destinations: ${destinations.length}`);
console.log('\nTo add images for a destination:');
console.log('1. Place JPG files in the appropriate folder under public/destinations/');
console.log('2. Run: node scripts/add-destination-image.js "Destination Name" image-file-name.jpg');