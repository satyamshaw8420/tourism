'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Share2, 
  Download, 
  Camera, 
  Award, 
  TrendingUp,
  Settings,
  Globe
} from 'lucide-react'
import { sampleDestinations } from '@/data/sample-data'

// Sample user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  joinDate: 'Jan 2023',
  tripsCompleted: 12,
  totalSpent: '₹1,25,000',
  avatar: '/users/alex.jpg',
  bio: 'Adventure seeker and travel enthusiast. Love exploring new cultures and creating unforgettable memories.',
  badges: [
    { id: '1', name: 'Globe Trotter', icon: Globe, description: 'Visited 10+ countries' },
    { id: '2', name: 'Adventure Seeker', icon: TrendingUp, description: 'Completed 5+ adventure trips' },
    { id: '3', name: 'Group Leader', icon: Users, description: 'Led 3+ group trips' }
  ]
}

// Sample trip data
const userTrips = [
  {
    id: '1',
    title: 'Goa Beach Paradise',
    destination: sampleDestinations[0],
    date: 'Dec 15-20, 2024',
    travelers: 5,
    status: 'completed',
    rating: 5,
    coverImage: '/albums/goa-album.jpg',
    photos: 42,
    likes: 124
  },
  {
    id: '2',
    title: 'Himalayan Adventure',
    destination: sampleDestinations[1],
    date: 'Nov 20-26, 2024',
    travelers: 8,
    status: 'completed',
    rating: 5,
    coverImage: '/albums/himachal-album.jpg',
    photos: 38,
    likes: 98
  },
  {
    id: '3',
    title: 'Kerala Backwater Cruise',
    destination: sampleDestinations[4],
    date: 'Jan 5-8, 2025',
    travelers: 4,
    status: 'upcoming',
    rating: null,
    coverImage: '/albums/kerala-album.jpg',
    photos: 0,
    likes: 0
  }
]

// Sample album data
const userAlbums = [
  {
    id: '1',
    title: 'Goa Beach Paradise',
    destination: sampleDestinations[0],
    date: 'Dec 15-20, 2024',
    coverImage: '/albums/goa-album.jpg',
    photos: 42,
    likes: 124,
    shares: 42
  },
  {
    id: '2',
    title: 'Himalayan Adventure',
    destination: sampleDestinations[1],
    date: 'Nov 20-26, 2024',
    coverImage: '/albums/himachal-album.jpg',
    photos: 38,
    likes: 98,
    shares: 35
  }
]

export default function UserProfile() {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6 flex items-end space-x-4">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                  <p className="text-indigo-100">Member since {userData.joinDate}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">{userData.tripsCompleted}</div>
                  <div className="text-gray-600">Trips Completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{userData.totalSpent}</div>
                  <div className="text-gray-600">Total Spent</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600">15</div>
                  <div className="text-gray-600">Groups Joined</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-gray-600">Badges Earned</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {userData.badges.map(badge => {
                  const Icon = badge.icon
                  return (
                    <Badge key={badge.id} variant="secondary" className="px-3 py-1.5 text-sm">
                      <Icon className="w-4 h-4 mr-1.5" />
                      {badge.name}
                    </Badge>
                  )
                })}
              </div>
              
              <p className="text-gray-600 mb-6">{userData.bio}</p>
              
              <div className="flex space-x-3">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  Share Profile
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Tabs for Trips and Albums */}
          <Tabs defaultValue="albums" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="trips" className="text-lg py-3">My Trips</TabsTrigger>
              <TabsTrigger value="albums" className="text-lg py-3">Digital Albums</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trips">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTrips.map(trip => (
                  <Card key={trip.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-40">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${trip.coverImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant={trip.status === 'completed' ? 'default' : 'secondary'}
                          className={trip.status === 'completed' ? 'bg-green-500' : ''}
                        >
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold">{trip.title}</h3>
                        <div className="flex items-center text-white/90 text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{trip.destination.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                        <span>{trip.date}</span>
                        <Users className="w-4 h-4 ml-3 mr-2 text-indigo-600" />
                        <span>{trip.travelers} travelers</span>
                      </div>
                      
                      {trip.status === 'completed' && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < (trip.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Camera className="w-4 h-4 mr-1" />
                              {trip.photos}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {trip.likes}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        disabled={trip.status !== 'completed'}
                      >
                        {trip.status === 'completed' ? 'View Album' : 'Trip Details'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="albums">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAlbums.map(album => (
                  <Card key={album.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${album.coverImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold">{album.title}</h3>
                        <div className="flex items-center text-white/90 text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{album.destination.name}</span>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-3 flex space-x-2">
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
                    
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                        <span>{album.date}</span>
                      </div>
                      
                      {/* Photo Preview Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[...Array(3)].map((_, idx) => (
                          <div 
                            key={idx} 
                            className="aspect-square rounded-lg overflow-hidden bg-gray-200"
                          >
                            <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-full" />
                          </div>
                        ))}
                        <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-500 text-xs font-medium">
                            +{album.photos - 3}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
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
                      
                      {/* Expanded Photo Gallery */}
                      {expandedAlbum === album.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="border-t border-gray-200 mt-4 pt-4"
                        >
                          <h4 className="font-bold text-gray-900 mb-3">Trip Photos</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(6)].map((_, idx) => (
                              <div 
                                key={idx} 
                                className="aspect-square rounded-lg overflow-hidden relative group"
                              >
                                <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-full" />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Complete more trips to unlock additional digital albums
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <Award className="w-5 h-5 mr-2" />
                  View All Badges
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}