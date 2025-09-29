const fs = require('fs');
const path = require('path');

// Check if the Agra Heritage image file exists and is readable
const imagePath = path.join(__dirname, '..', 'public', 'destinations', 'agra-heritage', 'agra-heritage-main-attraction.jpg');

console.log('Checking Agra Heritage image...');

if (fs.existsSync(imagePath)) {
  console.log('✅ File exists');
  
  const stats = fs.statSync(imagePath);
  console.log(`📁 File size: ${stats.size} bytes (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  
  // Read the first few bytes to check if it's a valid JPG
  const buffer = fs.readFileSync(imagePath);
  console.log(`📊 File read successfully, ${buffer.length} bytes`);
  
  // Check JPG signature
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    console.log('✅ Valid JPG file (starts with JPEG signature)');
  } else {
    console.log('❌ File may not be a valid JPG (missing JPEG signature)');
    console.log(`First 10 bytes: ${buffer.slice(0, 10).join(' ')}`);
  }
} else {
  console.log('❌ File does not exist');
}

console.log('\nChecking if file is accessible via HTTP...');
console.log('You can test this by visiting:');
console.log('http://localhost:3001/destinations/agra-heritage/agra-heritage-main-attraction.jpg');