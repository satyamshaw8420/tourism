import { NextResponse } from 'next/server';
import { getDestinationImagesServer } from '@/lib/destination-images.server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destinationId = searchParams.get('id');
  const destinationName = searchParams.get('name');

  if (!destinationId || !destinationName) {
    return NextResponse.json(
      { error: 'Missing destination ID or name' },
      { status: 400 }
    );
  }

  try {
    const images = getDestinationImagesServer(destinationId, destinationName);
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching destination images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destination images' },
      { status: 500 }
    );
  }
}