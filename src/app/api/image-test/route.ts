import { NextResponse } from 'next/server'
import { sampleDestinations } from '@/data/sample-data'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Test the first few destinations
    const testDestinations = sampleDestinations.slice(0, 3)
    const results = []
    
    for (const destination of testDestinations) {
      const imagePath = path.join(process.cwd(), 'public', destination.image)
      const exists = fs.existsSync(imagePath)
      const stats = exists ? fs.statSync(imagePath) : null
      
      results.push({
        id: destination.id,
        name: destination.name,
        imagePath: destination.image,
        fileExists: exists,
        fileSize: stats ? `${(stats.size / 1024).toFixed(2)} KB` : 'N/A'
      })
    }
    
    return NextResponse.json({
      success: true,
      destinations: results
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}