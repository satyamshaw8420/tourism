#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'destinations');
const SAMPLE_DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'sample-data.ts');

// Create destinations directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  console.log('Created destinations directory');
}

// Function to create destination folder
function createDestinationFolder(destinationName) {
  const folderName = destinationName.toLowerCase().replace(/\s+/g, '-');
  const destDir = path.join(PUBLIC_DIR, folderName);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created folder for ${destinationName}: ${destDir}`);
  }
  
  return destDir;
}

// Function to list all destination folders
function listDestinationFolders() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log('Destinations directory does not exist');
    return [];
  }
  
  const folders = fs.readdirSync(PUBLIC_DIR).filter(file => 
    fs.statSync(path.join(PUBLIC_DIR, file)).isDirectory()
  );
  
  return folders;
}

// Function to count images in a destination folder
function countImagesInFolder(folderName) {
  const folderPath = path.join(PUBLIC_DIR, folderName);
  
  if (!fs.existsSync(folderPath)) {
    return 0;
  }
  
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp';
  });
  
  return imageFiles.length;
}

// Function to generate a report
function generateReport() {
  console.log('\n=== Destination Images Report ===\n');
  
  const folders = listDestinationFolders();
  let totalImages = 0;
  
  console.log('Destination Folders:');
  folders.forEach(folder => {
    const imageCount = countImagesInFolder(folder);
    totalImages += imageCount;
    console.log(`  ${folder}: ${imageCount} images`);
  });
  
  console.log(`\nTotal: ${folders.length} destinations, ${totalImages} images`);
  
  // Check for destinations in sample data without folders
  try {
    const sampleData = fs.readFileSync(SAMPLE_DATA_FILE, 'utf8');
    const destinationMatches = sampleData.match(/name: '([^']+)'/g);
    const destinationNames = destinationMatches ? 
      destinationMatches.map(match => match.replace("name: '", "").replace("'", "")) : [];
    
    console.log('\nDestinations in sample data:');
    destinationNames.forEach(name => {
      const folderName = name.toLowerCase().replace(/\s+/g, '-');
      const hasFolder = folders.includes(folderName);
      console.log(`  ${name}: ${hasFolder ? '✓' : '✗ (missing folder)'}`);
    });
  } catch (error) {
    console.log('Could not read sample data file for comparison');
  }
}

// Function to add placeholder images
function addPlaceholderImages() {
  const folders = listDestinationFolders();
  
  folders.forEach(folder => {
    const folderPath = path.join(PUBLIC_DIR, folder);
    const imageCount = countImagesInFolder(folder);
    
    // If no images, add a placeholder
    if (imageCount === 0) {
      const placeholderPath = path.join(folderPath, `${folder}-main-attraction.jpg`);
      
      // In a real implementation, we would copy a placeholder image
      // For now, we'll just log that we would do this
      console.log(`Would add placeholder image for ${folder}`);
    }
  });
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node manage-destination-images.js [command]');
    console.log('Commands:');
    console.log('  list    - List all destination folders');
    console.log('  report  - Generate a detailed report');
    console.log('  create  - Create folder for a new destination');
    console.log('  help    - Show this help message');
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'list':
      const folders = listDestinationFolders();
      console.log('Destination folders:');
      folders.forEach(folder => console.log(`  ${folder}`));
      break;
      
    case 'report':
      generateReport();
      break;
      
    case 'create':
      if (args.length < 2) {
        console.log('Usage: node manage-destination-images.js create "Destination Name"');
        return;
      }
      const destinationName = args.slice(1).join(' ');
      createDestinationFolder(destinationName);
      break;
      
    case 'help':
      console.log('Usage: node manage-destination-images.js [command]');
      console.log('Commands:');
      console.log('  list    - List all destination folders');
      console.log('  report  - Generate a detailed report');
      console.log('  create  - Create folder for a new destination');
      console.log('  help    - Show this help message');
      break;
      
    default:
      console.log(`Unknown command: ${command}`);
      console.log('Use "help" for available commands');
  }
}

// Run main function if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  createDestinationFolder,
  listDestinationFolders,
  countImagesInFolder,
  generateReport
};