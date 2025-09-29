const fs = require('fs');
const path = require('path');

// Read the sample data file
const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract destination information
const destinationRegex = /id: '(\d+)',\s*name: '([^']*)',[\s\S]*?image: '([^']*)'/g;
const destinations = [];
let match;

console.log('=== VERIFYING ALL DESTINATION IMAGES ===\n');

while ((match = destinationRegex.exec(dataContent)) !== null) {
  const id = match[1];
  const name = match[2];
  const imagePath = match[3];
  
  destinations.push({
    id,
    name,
    imagePath
  });
  
  // Check if image file exists
  const fullPath = path.join(__dirname, '..', 'public', imagePath.substring(1));
  
  if (imagePath.startsWith('/destinations/')) {
    if (fs.existsSync(fullPath)) {
      // Read file to check format
      try {
        const buffer = fs.readFileSync(fullPath);
        const ext = path.extname(fullPath).toLowerCase();
        
        let format = 'unknown';
        let isValid = true;
        
        if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
          format = 'JPEG';
          if (ext !== '.jpg' && ext !== '.jpeg') {
            isValid = false;
          }
        } else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
          format = 'PNG';
          if (ext !== '.png') {
            isValid = false;
          }
        } else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
          format = 'GIF';
          if (ext !== '.gif') {
            isValid = false;
          }
        }
        
        if (isValid) {
          console.log(`${id}. ${name}`);
          console.log(`   ✅ ${format} file with correct extension (${ext})`);
        } else {
          console.log(`${id}. ${name}`);
          console.log(`   ⚠️  File is ${format} but has ${ext} extension`);
          console.log(`   Expected: ${fullPath.replace(ext, format === 'JPEG' ? '.jpg' : format === 'PNG' ? '.png' : '.gif')}`);
        }
      } catch (err) {
        console.log(`${id}. ${name}`);
        console.log(`   ❌ Error reading file: ${err.message}`);
      }
    } else {
      console.log(`${id}. ${name}`);
      console.log(`   ❌ Image file not found (expected at: ${fullPath})`);
    }
  } else {
    console.log(`${id}. ${name}`);
    console.log(`   ℹ️  Using default image path`);
  }
  console.log('');
}

console.log(`\nTotal destinations: ${destinations.length}`);