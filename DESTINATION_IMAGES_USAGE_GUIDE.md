# Destination Images Usage Guide

This guide explains how to use the destination image components throughout the Travel-Ease application.

## Components Overview

### 1. DestinationImageGallery
A full-featured image gallery component with modal viewing capabilities.

**Props:**
- `destinationId` (string, required): The ID of the destination
- `destinationName` (string, required): The name of the destination
- `initialImages` (string[], optional): Preloaded images
- `maxImages` (number, optional, default: 8): Maximum images to display in grid
- `showImageCount` (boolean, optional, default: true): Show image count indicator

**Usage:**
```tsx
import DestinationImageGallery from '@/components/destination-image-gallery';

<DestinationImageGallery 
  destinationId={destination.id}
  destinationName={destination.name}
  initialImages={preloadedImages}
  maxImages={12}
/>
```

### 2. CompactDestinationGallery
A compact gallery for use in cards and lists.

**Props:**
- `destinationId` (string, required): The ID of the destination
- `destinationName` (string, required): The name of the destination
- `maxImages` (number, optional, default: 4): Maximum images to display
- `onClick` (function, optional): Click handler

**Usage:**
```tsx
import CompactDestinationGallery from '@/components/compact-destination-gallery';

<CompactDestinationGallery 
  destinationId={destination.id}
  destinationName={destination.name}
  maxImages={4}
  onClick={() => openImageViewer(destination.id)}
/>
```

### 3. DestinationImageViewer
A modal image viewer for detailed image viewing.

**Props:**
- `selectedDestinationId` (string | null, required): ID of selected destination
- `onClose` (function, required): Close handler

**Usage:**
```tsx
import DestinationImageViewer from '@/components/destination-image-viewer';

<DestinationImageViewer 
  selectedDestinationId={selectedDestinationId}
  onClose={() => setSelectedDestinationId(null)}
/>
```

## Library Functions

### Client-Side (Browser Safe)
- `getDestinationImages(destinationId, destinationName)`: Returns empty array (placeholder)
- `getMainDestinationImage(destinationId, destinationName)`: Returns placeholder image

### Server-Side (Node.js Environment)
- `getDestinationImagesServer(destinationId, destinationName)`: Returns all images for a destination
- `getMainDestinationImageServer(destinationId, destinationName)`: Returns the main image for a destination
- `hasDestinationFolder(destinationName)`: Checks if a destination has a folder

## API Routes

### GET /api/destination-images
Fetches images for a destination.

**Parameters:**
- `id` (string, required): Destination ID
- `name` (string, required): Destination name

**Response:**
```json
{
  "images": ["/destinations/destination-name/image1.jpg", ...]
}
```

## Implementation Examples

### 1. In Destination Detail Page (Server Component)
```tsx
// page.tsx (server component)
import { getDestinationImagesServer } from '@/lib/destination-images.server';

export default async function DestinationDetailPage({ params }) {
  const allImages = getDestinationImagesServer(destination.id, destination.name);
  
  return <DestinationDetailClient displayImages={allImages} />;
}

// page-client.tsx (client component)
import DestinationImageGallery from '@/components/destination-image-gallery';

<DestinationImageGallery 
  destinationId={destination.id} 
  destinationName={destination.name}
  initialImages={displayImages}
  maxImages={12}
/>
```

### 2. In Destination Cards (Server Component)
```tsx
// page.tsx (server component)
import { getMainDestinationImageServer } from '@/lib/destination-images.server';

export default async function DestinationsPage() {
  const destinationsWithImages = await Promise.all(
    sampleDestinations.map(async (destination) => {
      const mainImage = getMainDestinationImageServer(destination.id, destination.name);
      return { ...destination, mainImage };
    })
  );
  
  return <DestinationsPageClient destinationsWithImages={destinationsWithImages} />;
}

// page-client.tsx (client component)
<img src={destination.mainImage} alt={destination.name} />
```

### 3. With Image Viewer Modal
```tsx
// Client component
const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);

// In your component
<CompactDestinationGallery 
  destinationId={destination.id}
  destinationName={destination.name}
  onClick={() => setSelectedDestinationId(destination.id)}
/>

<DestinationImageViewer 
  selectedDestinationId={selectedDestinationId}
  onClose={() => setSelectedDestinationId(null)}
/>
```

## Best Practices

1. **Performance**: Use `maxImages` prop to limit the number of images displayed in grids
2. **Consistency**: Use the same component across the application for similar use cases
3. **Accessibility**: All image components include proper alt text
4. **Error Handling**: All components include fallback images for failed loads
5. **Responsive Design**: All components are designed to work on all screen sizes
6. **Server-Client Separation**: Use server-side functions for file operations and client-side for UI

## File Structure
```
public/
└── destinations/
    ├── destination-name-1/
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── ...
    ├── destination-name-2/
    │   ├── image1.jpg
    │   └── ...
    └── ...
```

## Adding New Images

1. Create a folder in `public/destinations/` with the destination name in kebab-case
2. Add images to the folder (jpg, jpeg, png, webp formats supported)
3. The system will automatically detect and display all images in the folder

## Troubleshooting

### Images Not Showing
1. Check that the destination folder exists in `public/destinations/`
2. Verify image file extensions are supported (jpg, jpeg, png, webp)
3. Ensure the destination name matches the folder name (case-insensitive)

### Performance Issues
1. Use the `maxImages` prop to limit displayed images
2. Optimize image sizes (recommended max 1920px width)
3. Use webp format for better compression

### Module not found: Can't resolve 'fs'
This error occurs when trying to use server-side modules in client components. 
Ensure you're using:
- `destination-images.server.ts` for server-side operations
- `destination-images.ts` for client-side operations
- API routes for client-server communication