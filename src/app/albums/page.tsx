'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Heart, 
  Share2, 
  Download, 
  Camera, 
  MapPin, 
  Calendar, 
  Users,
  ChevronLeft,
  Grid,
  List
} from 'lucide-react'
import { sampleDestinations } from '@/data/sample-data'
import DigitalAlbumSection from '@/components/sections\digital-album-section'

export default function AlbumsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Digital Albums</h1>
              <p className="text-gray-600 mt-2">
                Preserve and share your travel memories with beautifully crafted digital albums
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Grid className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button variant="outline" size="sm">
                <List className="w-4 h-4 mr-2" />
                List View
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24</div>
              <div className="text-gray-600">Albums Created</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,240</div>
              <div className="text-gray-600">Photos</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">3.2K</div>
              <div className="text-gray-600">Likes Received</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">890</div>
              <div className="text-gray-600">Shares</div>
            </Card>
          </div>
          
          {/* Featured Albums */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Albums</h2>
              <Badge variant="secondary" className="px-3 py-1">
                Most Liked
              </Badge>
            </div>
            
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-80 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/albums/goa-album.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Goa Beach Paradise</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Goa, India</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>Dec 15-20, 2024</span>
                    <Users className="w-4 h-4 ml-4 mr-2 text-indigo-600" />
                    <span>5 travelers</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    An unforgettable week in Goa with friends. From stunning beaches to vibrant nightlife, 
                    this trip had it all. The digital album captures every magical moment of our adventure.
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-red-500 fill-current mr-2" />
                      <span className="font-medium">124 likes</span>
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-5 h-5 text-indigo-600 mr-2" />
                      <span className="font-medium">42 shares</span>
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="font-medium">42 photos</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button>
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* All Albums */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Albums</h2>
            <DigitalAlbumSection />
          </div>
        </motion.div>
      </div>
    </div>
  )
}