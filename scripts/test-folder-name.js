const fs = require('fs');
const path = require('path');

// Test the folder name conversion for Mumbai City
const destinationName = 'Mumbai City';
const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
console.log(`Original name: ${destinationName}`);
console.log(`Converted folder name: ${folderName}`);

// Check if the folder exists
const destDir = path.join(process.cwd(), 'public', 'destinations', folderName);
console.log(`Looking for folder: ${destDir}`);
console.log(`Folder exists: ${fs.existsSync(destDir)}`);

// Check the actual mumbai folder
const mumbaiDir = path.join(process.cwd(), 'public', 'destinations', 'mumbai');
console.log(`Looking for folder: ${mumbaiDir}`);
console.log(`Mumbai folder exists: ${fs.existsSync(mumbaiDir)}`);

// List files in the mumbai folder
if (fs.existsSync(mumbaiDir)) {
  const files = fs.readdirSync(mumbaiDir);
  console.log(`Files in mumbai folder: ${files}`);
}