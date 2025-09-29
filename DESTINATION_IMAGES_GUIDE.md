# Destination Images Guide

This document explains how to add real JPG images for all destinations in the Travel-Ease application.

## Current Setup

All destination folders have been created in `public/destinations/` with placeholder JPG files. You can now simply replace these placeholder files with your actual JPG images.

## How to Add Real Images

1. **Navigate to the destination folder**: Go to `public/destinations/[destination-folder]`

2. **Replace the placeholder image**: Delete the placeholder file and add your actual JPG image with the same name or a different name

3. **Update the data file**: Modify `src/data/sample-data.ts` to point to your images:
   ```javascript
   {
     id: '1',
     name: 'Goa Beaches',
     image: '/destinations/goa-beaches/your-real-image.jpg', // Updated path
     // ...
   }
   ```

## Example Workflow

1. For Goa Beaches:
   - Go to `public/destinations/goa-beaches/`
   - Delete `goa-beaches-main-attraction.jpg` (the placeholder)
   - Add your real image, e.g., `palolem-beach.jpg`
   - Update `src/data/sample-data.ts`:
     ```javascript
     {
       id: '1',
       name: 'Goa Beaches',
       image: '/destinations/goa-beaches/palolem-beach.jpg',
       // ...
     }
     ```

2. For Ranchi City (Jharkhand):
   - Go to `public/destinations/ranchi-city/`
   - Delete `ranchi-city-main-attraction.jpg` (the placeholder)
   - Add your real image, e.g., `ranchi-waterfalls.jpg`
   - Update `src/data/sample-data.ts`:
     ```javascript
     {
       id: '34',
       name: 'Ranchi City',
       image: '/destinations/ranchi-city/ranchi-waterfalls.jpg',
       // ...
     }
     ```

## All Jharkhand Destinations

The following Jharkhand destinations are ready for your images:

- `public/destinations/dassam-falls/`
- `public/destinations/hundru-falls/`
- `public/destinations/jonha-falls/`
- `public/destinations/patratu-valley/`
- `public/destinations/netarhat/`
- `public/destinations/dimna-lake/`
- `public/destinations/topchanchi-lake/`
- `public/destinations/maithon-dam/`
- `public/destinations/tilaiya-dam/`
- `public/destinations/betla-national-park/`
- `public/destinations/hazaribagh-national-park/`
- `public/destinations/dalma-wildlife-sanctuary/`
- `public/destinations/baidyanath-dham/`
- `public/destinations/parasnath-hill/`
- `public/destinations/pahari-mandir/`
- `public/destinations/jagannath-temple/`
- `public/destinations/rajrappa-mandir/`
- `public/destinations/ranchi-city/`
- `public/destinations/jamshedpur/`
- `public/destinations/dhanbad-city/`
- `public/destinations/hazaribagh-town/`
- `public/destinations/giridih-town/`
- `public/destinations/deoghar-town/`
- `public/destinations/chaibasa/`
- `public/destinations/palamu-fort/`

## Image Requirements

- Format: JPG only
- Recommended size: 1920px width for best quality
- File naming: Descriptive and SEO-friendly (e.g., `ranchi-hundru-falls-sunset.jpg`)

## Quick Update Script

You can also use the helper script to update image paths:
```bash
node scripts/add-destination-image.js "Destination Name" your-image-file.jpg
```

Example:
```bash
node scripts/add-destination-image.js "Ranchi City" ranchi-waterfalls.jpg
```

The system is now ready for you to add real JPG images to all destinations!