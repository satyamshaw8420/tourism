const fs = require('fs');
const path = require('path');
const { sampleDestinations } = require('../src/data/sample-data');

// Check folder consistency for all destinations
console.log('Checking folder consistency for all destinations...\n');

sampleDestinations.forEach(destination => {
  const expectedFolderName = destination.name.toLowerCase().replace(/\s+/g, '-');
  const expectedFolderPath = path.join(process.cwd(), 'public', 'destinations', expectedFolderName);
  const expectedFolderExists = fs.existsSync(expectedFolderPath);
  
  console.log(`${destination.name}:`);
  console.log(`  Expected folder: ${expectedFolderName}`);
  console.log(`  Folder exists: ${expectedFolderExists}`);
  
  if (expectedFolderExists) {
    try {
      const files = fs.readdirSync(expectedFolderPath);
      console.log(`  Files in folder: ${files.length} files`);
      if (files.length > 0) {
        console.log(`    First file: ${files[0]}`);
      }
    } catch (err) {
      console.log(`  Error reading folder: ${err.message}`);
    }
  } else {
    // Check if there's a folder with a similar name
    const alternativeFolderName = expectedFolderName.split('-')[0]; // Just the first part
    const alternativeFolderPath = path.join(process.cwd(), 'public', 'destinations', alternativeFolderName);
    const alternativeFolderExists = fs.existsSync(alternativeFolderPath);
    
    if (alternativeFolderExists) {
      console.log(`  Alternative folder found: ${alternativeFolderName}`);
      try {
        const files = fs.readdirSync(alternativeFolderPath);
        console.log(`    Files in alternative folder: ${files.length} files`);
        if (files.length > 0) {
          console.log(`      First file: ${files[0]}`);
        }
      } catch (err) {
        console.log(`    Error reading alternative folder: ${err.message}`);
      }
    }
  }
  console.log('');
});