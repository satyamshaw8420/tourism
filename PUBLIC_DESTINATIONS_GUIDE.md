# Public Destinations Folder Structure Guide

This document explains how to add pictures for all destinations in the Travel-Ease application.

## Folder Structure

All destination images are stored in the `public/destinations/` directory. Each destination has its own subfolder named after the destination with spaces replaced by hyphens and converted to lowercase.

Example structure:
```
public/
└── destinations/
    ├── goa-beaches/
    ├── himachal-pradesh/
    ├── rajasthan-heritage/
    ├── agra-heritage/
    ├── jharkhand-destinations/
    │   ├── ranchi-city/
    │   ├── hundru-falls/
    │   ├── dassam-falls/
    │   ├── jonha-falls/
    │   ├── netarhat/
    │   ├── betla-national-park/
    │   └── ... (all other Jharkhand destinations)
    └── ... (all other destinations)
```

## How to Add Images

1. **Navigate to the destination folder**: Go to `public/destinations/[destination-name]`

2. **Add JPG images**: Place your JPG files in the destination folder

3. **Use proper naming conventions**:
   - Use lowercase letters, numbers, and hyphens only
   - Be descriptive: `destination-name-main-attraction.jpg`
   - Examples:
     - ✅ `goa-beaches-palolem-beach.jpg`
     - ✅ `ranchi-city-hundru-falls.jpg`
     - ❌ `Goa Beach.jpg`
     - ❌ `ranchi_city.jpg`

4. **Update the data file**: Modify `src/data/sample-data.ts` to point to your images:
   ```javascript
   {
     id: '1',
     name: 'Goa Beaches',
     image: '/destinations/goa-beaches/palolem-beach.jpg', // Updated path
     // ...
   }
   ```

## Jharkhand Destinations

All Jharkhand destinations have been set up with their own folders:

- ranchi-city/
- hundru-falls/
- dassam-falls/
- jonha-falls/
- patratu-valley/
- netarhat/
- dimna-lake/
- topchanchi-lake/
- maithon-dam/
- tilaiya-dam/
- betla-national-park/
- hazaribagh-national-park/
- dalma-wildlife-sanctuary/
- baidyanath-dham/
- parasnath-hill/
- pahari-mandir/
- jagannath-temple/
- jamshedpur/
- dhanbad-city/
- hazaribagh-town/
- giridih-town/
- deoghar-town/
- chaibasa/
- palamu-fort/

## Image Requirements

- Format: JPG only
- Recommended size: 1920px width for best quality
- File naming: Descriptive and SEO-friendly
- Organization: Group related images in each destination folder

## Example Workflow

1. To add images for Ranchi City:
   - Navigate to `public/destinations/ranchi-city/`
   - Add JPG files like `ranchi-city-hundru-falls.jpg`, `ranchi-city-dassam-falls.jpg`
   - Update the image path in `src/data/sample-data.ts` for Ranchi City entry

2. To add images for Agra Heritage:
   - Navigate to `public/destinations/agra-heritage/`
   - Add JPG files like `agra-heritage-taj-mahal.jpg`, `agra-heritage-agra-fort.jpg`
   - Update the image path in `src/data/sample-data.ts` for Agra Heritage entry

The system is now ready for you to simply drop JPG images into the appropriate folders and update the paths in the data file.