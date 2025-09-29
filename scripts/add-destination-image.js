#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to update image path in sample-data.ts
function updateImagePath(destinationName, imageName) {
  const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');
  let dataContent = fs.readFileSync(dataPath, 'utf8');
  
  // Convert destination name to folder name format
  const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
  
  // Find the destination in the file and update its image path
  const regex = new RegExp(`(id: '\\d+',\\s*name: '${destinationName.replace(/'/g, "\\'")}',[\\s\\S]*?image: ')[^']*(')`);
  
  if (regex.test(dataContent)) {
    const updatedContent = dataContent.replace(regex, `$1/destinations/${folderName}/${imageName}$2`);
    fs.writeFileSync(dataPath, updatedContent);
    console.log(`✅ Updated image path for ${destinationName} to /destinations/${folderName}/${imageName}`);
  } else {
    console.log(`❌ Could not find destination "${destinationName}" in sample-data.ts`);
    console.log('Please make sure the destination name matches exactly with the data file.');
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node add-destination-image.js "Destination Name" image-file-name.jpg');
    console.log('Example: node add-destination-image.js "Goa Beaches" goa-beaches-palolem.jpg');
    process.exit(1);
  }
  
  const destinationName = args[0];
  const imageName = args[1];
  
  // Verify the destination folder exists
  const destDir = path.join(__dirname, '..', 'public', 'destinations', destinationName.toLowerCase().replace(/\s+/g, '-'));
  
  if (!fs.existsSync(destDir)) {
    console.log(`❌ Destination folder does not exist: ${destDir}`);
    console.log('Please run the create-destination-files.js script first.');
    process.exit(1);
  }
  
  // Verify the image file exists in the destination folder
  const imagePath = path.join(destDir, imageName);
  if (!fs.existsSync(imagePath)) {
    console.log(`⚠️  Warning: Image file does not exist: ${imagePath}`);
    console.log('Please make sure the image file is placed in the destination folder.');
  }
  
  // Update the image path in the data file
  updateImagePath(destinationName, imageName);
  
  console.log('\n✅ Process completed!');
  console.log(`📁 Destination folder: ${destDir}`);
  console.log(`📄 Image file: ${imageName}`);
  console.log('📝 Data file updated: src/data/sample-data.ts');
}

main();