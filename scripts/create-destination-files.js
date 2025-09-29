const fs = require('fs');
const path = require('path');

// Read the sample data file
const dataPath = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract destination information using regex
const destinationRegex = /id: '(\d+)',\s*name: '([^']*)',[\s\S]*?description: '([^']*)',[\s\S]*?category: '([^']*)',[\s\S]*?address: '([^']*)'/g;
const destinations = [];
let match;

while ((match = destinationRegex.exec(dataContent)) !== null) {
  destinations.push({
    id: match[1],
    name: match[2],
    description: match[3],
    category: match[4],
    address: match[5]
  });
}

// Create destination directories and README files
const destDir = path.join(__dirname, '..', 'public', 'destinations');

// Ensure directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Create a directory and README for each destination
destinations.forEach(dest => {
  // Create directory name (lowercase, spaces to hyphens)
  const dirName = dest.name.toLowerCase().replace(/\s+/g, '-');
  const destPath = path.join(destDir, dirName);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }
  
  // Create README.md content
  const readmeContent = `# ${dest.name}

Location: ${dest.address}
Category: ${dest.category.charAt(0).toUpperCase() + dest.category.slice(1)}

## Adding Images

To add images for this destination:

1. Place your JPG files in this directory
2. Use descriptive filenames:
   - ${dirName}-main-attraction.jpg
   - ${dirName}-local-culture.jpg
   - ${dirName}-accommodation.jpg
   - ${dirName}-activities.jpg

3. Update the image path in \`src/data/sample-data.ts\`:
   \`\`\`javascript
   {
     id: '${dest.id}',
     name: '${dest.name}',
     // Change the image path to point to your JPG file
     image: '/destinations/${dirName}/your-image-name.jpg',
     // ...
   }
   \`\`\`

## Suggested Image Types

- **Landmarks/Attractions**: Main sights and tourist spots
- **Activities**: Things to do in this destination
- **Culture**: Local traditions, food, markets
- **Accommodation**: Hotels, resorts, unique stays
- **Experiences**: Unique local experiences

## Image Naming Convention

Use lowercase letters, numbers, and hyphens only:
- ✅ ${dirName}-main-attraction.jpg
- ✅ ${dirName}-local-culture.jpg
- ❌ ${dest.name}.jpg
- ❌ ${dirName}_main_attraction.jpg

Place your JPG files in this folder and update the paths in the sample data file.`;

  // Write README.md file
  const readmePath = path.join(destPath, 'README.md');
  fs.writeFileSync(readmePath, readmeContent);
  
  console.log(`Created directory and README for: ${dest.name}`);
});

console.log(`\nCreated directories and README files for ${destinations.length} destinations in ${destDir}`);
console.log('You can now add JPG images to these directories and update the paths in src/data/sample-data.ts');