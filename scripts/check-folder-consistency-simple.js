const fs = require('fs');
const path = require('path');

// List all destination folders
const destinationsDir = path.join(process.cwd(), 'public', 'destinations');
const folders = fs.readdirSync(destinationsDir);

console.log('Destination folders and their contents:\n');

folders.forEach(folder => {
  const folderPath = path.join(destinationsDir, folder);
  const stat = fs.statSync(folderPath);
  
  if (stat.isDirectory()) {
    try {
      const files = fs.readdirSync(folderPath);
      console.log(`${folder}: ${files.length} files`);
      if (files.length > 0 && files[0]) {
        console.log(`  First file: ${files[0]}`);
      }
    } catch (err) {
      console.log(`${folder}: Error reading folder - ${err.message}`);
    }
  }
});