#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the sample data file to get all destinations
const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract destination names and create folder names
const destinationRegex = /id: '\d+',\s*name: '([^']*)'/g;
const destinations = [];
let match;

while ((match = destinationRegex.exec(dataContent)) !== null) {
  const name = match[1];
  const folderName = name.toLowerCase().replace(/\s+/g, '-');
  destinations.push({
    name,
    folderName
  });
}

// Create a simple JPG placeholder content (this is just a text placeholder, not a real JPG)
const jpgPlaceholderContent = '// This is a placeholder for an actual JPG image file\n// In a real scenario, you would place your actual JPG image here\n';

// Process each destination
destinations.forEach(dest => {
  const destPath = path.join(__dirname, '..', 'public', 'destinations', dest.folderName);
  
  // Check if directory exists
  if (fs.existsSync(destPath)) {
    // Create a placeholder image file
    const placeholderFileName = `${dest.folderName}-main-attraction.jpg`;
    const placeholderFilePath = path.join(destPath, placeholderFileName);
    
    // Write the placeholder file
    fs.writeFileSync(placeholderFilePath, jpgPlaceholderContent);
    console.log(`✅ Created placeholder image for: ${dest.name} (${placeholderFileName})`);
    
    // Remove the README.md file
    const readmePath = path.join(destPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      fs.unlinkSync(readmePath);
      console.log(`🗑️  Removed README.md for: ${dest.name}`);
    }
  } else {
    console.log(`⚠️  Directory not found for: ${dest.name} (${destPath})`);
  }
});

console.log(`\n✅ Processed ${destinations.length} destinations`);
console.log('✅ Placeholder JPG files created in each destination folder');
console.log('🗑️  README.md files removed from all destination folders');
console.log('\nNow you can simply replace these placeholder files with your actual JPG images!');