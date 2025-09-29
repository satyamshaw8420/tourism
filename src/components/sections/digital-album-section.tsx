'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Download, Camera, MapPin, Calendar, Users } from 'lucide-react'
import { sampleDestinations } from '@/data/sample-data'

// Sample album data - in a real app this would come from user trips
const sampleAlbums = [
  {
    id: '1',
    title: 'Goa Beach Paradise',
    destination: sampleDestinations[0],
    date: 'Dec 15-20, 2024',
    travelers: 5,
    coverImage: '/albums/goa-album.jpg',
    photos: [
      { id: '1', url: '/albums/goa-1.jpg', caption: 'Sunset at Calangute Beach' },
      { id: '2', url: '/albums/goa-2.jpg', caption: 'Water sports adventure' },
      { id: '3', url: '/albums/goa-3.jpg', caption: 'Local seafood dinner' },
      { id: '4', url: '/albums/goa-4.jpg', caption: 'Anjuna Flea Market' },
      { id: '5', url: '/albums/goa-5.jpg', caption: 'Fort Aguada views' },
      { id: '6', url: '/albums/goa-6.jpg', caption: 'Group photo at Baga Beach' }
    ],
    likes: 124,
    shares: 42
  },
  {
    id: '2',
    title: 'Himalayan Adventure',
    destination: sampleDestinations[1],
    date: 'Nov 20-26, 2024',
    travelers: 8,
    coverImage: '/albums/himachal-album.jpg',
    photos: [
      { id: '1', url: '/albums/himachal-1.jpg', caption: 'Snow-capped peaks of Manali' },
      { id: '2', url: '/albums/himachal-2.jpg', caption: 'Paragliding experience' },
      { id: '3', url: '/albums/himachal-3.jpg', caption: 'Rohtang Pass views' },
      { id: '4', url: '/albums/himachal-4.jpg', caption: 'Local Himachali cuisine' },
      { id: '5', url: '/albums/himachal-5.jpg', caption: 'Campfire under the stars' }
    ],
    likes: 98,
    shares: 35
  },
  {
    id: '3',
    title: 'Kerala Backwater Cruise',
    destination: sampleDestinations[4],
    date: 'Jan 5-8, 2025',
    travelers: 4,
    coverImage: '/albums/kerala-album.jpg',
    photos: [
      { id: '1', url: '/albums/kerala-1.jpg', caption: 'Houseboat on tranquil waters' },
      { id: '2', url: '/albums/kerala-2.jpg', caption: 'Coconut palm lined backwaters' },
      { id: '3', url: '/albums/kerala-3.jpg', caption: 'Traditional Kerala massage' },
      { id: '4', url: '/albums/kerala-4.jpg', caption: 'Local fishing techniques' },
      { id: '5', url: '/albums/kerala-5.jpg', caption: 'Spice plantation tour' },
      { id: '6', url: '/albums/kerala-6.jpg', caption: 'Ayurvedic wellness session' }
    ],
    likes: 156,
    shares: 67
  }
]

export default function DigitalAlbumSection() {
  const [likedAlbums, setLikedAlbums] = useState<Set<string>>(new Set())
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null)

  const toggleLike = (albumId: string) => {
    setLikedAlbums(prev => {
      const newSet = new Set(prev)
      if (newSet.has(albumId)) {
        newSet.delete(albumId)
      } else {
        newSet.add(albumId)
      }
      return newSet
    })
  }

  const toggleExpand = (albumId: string) => {
    setExpandedAlbum(prev => prev === albumId ? null : albumId)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Camera className="w-4 h-4" />
            <span>Digital Memories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Travel Albums
            </span>
            <br />
            <span className="text-gray-900">Preserve Your Adventures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every trip creates unforgettable memories. Our digital albums help you preserve and share 
            your travel experiences with friends and family.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleAlbums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                {/* Album Cover */}
                <div className="relative h-48">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${album.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{album.title}</h3>
                    <div className="flex items-center text-white/90 text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{album.destination.name}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-black/30 hover:bg-black/50 text-white border-0"
                      onClick={() => toggleLike(album.id)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${likedAlbums.has(album.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                      />
                      <span className="ml-1 text-xs">{album.likes + (likedAlbums.has(album.id) ? 1 : 0)}</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-black/30 hover:bg-black/50 text-white border-0"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Album Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    <span>{album.date}</span>
                    <Users className="w-4 h-4 ml-4 mr-2 text-indigo-600" />
                    <span>{album.travelers} travelers</span>
                  </div>
                  
                  {/* Photo Preview Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {album.photos.slice(0, 3).map((photo, idx) => (
                      <div 
                        key={photo.id} 
                        className="aspect-square rounded-lg overflow-hidden bg-gray-200"
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${photo.url})` }}
                        />
                      </div>
                    ))}
                    {album.photos.length > 3 && (
                      <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-500 text-xs font-medium">
                          +{album.photos.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      onClick={() => toggleExpand(album.id)}
                    >
                      {expandedAlbum === album.id ? 'Show Less' : 'View Album'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Expanded Photo Gallery */}
                {expandedAlbum === album.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-gray-200 p-6"
                  >
                    <h4 className="font-bold text-gray-900 mb-4">Trip Photos</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {album.photos.map(photo => (
                        <div key={photo.id} className="aspect-square rounded-lg overflow-hidden relative group">
                          <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundImage: `url(${photo.url})` }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <p className="text-white text-xs text-center w-full">{photo.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Create Your Digital Album
          </Button>
          <p className="text-gray-600 mt-4">
            Complete your trip to automatically generate a beautiful digital album of your memories
          </p>
        </motion.div>
      </div>
    </section>
  )
}