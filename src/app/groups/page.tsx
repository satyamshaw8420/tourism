'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Users, Calendar, Search, Filter,
  UserPlus, Share2, X, Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/sections/navbar'
import { Group } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Sample group data
const sampleGroups: Group[] = [
  {
    id: '1',
    name: 'Goa Beach Squad',
    description: 'Friends planning an epic beach vacation in Goa with water sports, nightlife, and relaxation!',
    creator: {
      id: '1',
      email: 'priya@example.com',
      name: 'Priya Sharma',
      avatar: '/avatars/priya.jpg',
      kycStatus: 'verified',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    members: [
      {
        id: '1',
        user: {
          id: '2',
          email: 'rahul@example.com', 
          name: 'Rahul Kumar',
          kycStatus: 'verified',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        role: 'member',
        contribution: 8000,
        joinedAt: new Date('2024-01-15'),
        status: 'accepted'
      },
      {
        id: '2',
        user: {
          id: '3',
          email: 'anita@example.com',
          name: 'Anita Desai', 
          kycStatus: 'verified',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        role: 'member',
        contribution: 7500,
        joinedAt: new Date('2024-01-20'),
        status: 'accepted'
      }
    ],
    wallet: {
      id: '1',
      balance: 23500,
      targetAmount: 30000,
      transactions: [],
      emiPlans: [],
      createdAt: new Date('2024-01-10')
    },
    status: 'active',
    maxMembers: 6,
    isPublic: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2', 
    name: 'Himalayan Trekkers',
    description: 'Adventure seekers looking to conquer the Himalayas together. Experience breathtaking views and mountain culture!',
    creator: {
      id: '4',
      email: 'vikram@example.com',
      name: 'Vikram Singh',
      kycStatus: 'verified',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    members: [
      {
        id: '3',
        user: {
          id: '5',
          email: 'sneha@example.com',
          name: 'Sneha Patel',
          kycStatus: 'verified', 
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        role: 'member',
        contribution: 12000,
        joinedAt: new Date('2024-01-25'),
        status: 'accepted'
      }
    ],
    wallet: {
      id: '2',
      balance: 27000,
      targetAmount: 45000,
      transactions: [],
      emiPlans: [],
      createdAt: new Date('2024-01-15')
    },
    status: 'planning',
    maxMembers: 8,
    isPublic: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '3',
    name: 'Rajasthan Heritage Tours',
    description: 'Explore the royal heritage of Rajasthan - palaces, forts, and vibrant culture await!',
    creator: {
      id: '6', 
      email: 'arjun@example.com',
      name: 'Arjun Gupta',
      kycStatus: 'verified',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    members: [
      {
        id: '4',
        user: {
          id: '7',
          email: 'maya@example.com',
          name: 'Maya Reddy',
          kycStatus: 'verified',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        role: 'member',
        contribution: 9500,
        joinedAt: new Date('2024-02-01'),
        status: 'accepted'
      },
      {
        id: '5',
        user: {
          id: '8',
          email: 'karan@example.com', 
          name: 'Karan Joshi',
          kycStatus: 'pending',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        role: 'member',
        contribution: 0,
        joinedAt: new Date('2024-02-05'),
        status: 'pending'
      }
    ],
    wallet: {
      id: '3',
      balance: 19500,
      targetAmount: 35000,
      transactions: [],
      emiPlans: [],
      createdAt: new Date('2024-01-20')
    },
    status: 'active',
    maxMembers: 5,
    isPublic: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05')
  }
]

const filterOptions = ['All Groups', 'My Groups', 'Active', 'Planning', 'Public', 'Private']

export default function GroupsPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>(sampleGroups)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All Groups')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedGroupForShare, setSelectedGroupForShare] = useState<Group | null>(null)
  const [favoriteGroups, setFavoriteGroups] = useState<Set<string>>(new Set())

  // Utility function to format dates consistently for SSR
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0]
  }

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'All Groups' ||
                         (selectedFilter === 'Active' && group.status === 'active') ||
                         (selectedFilter === 'Planning' && group.status === 'planning') ||
                         (selectedFilter === 'Public' && group.isPublic) ||
                         (selectedFilter === 'Private' && !group.isPublic)
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'planning': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const toggleFavorite = (groupId: string) => {
    setFavoriteGroups(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(groupId)) {
        newFavorites.delete(groupId)
      } else {
        newFavorites.add(groupId)
      }
      return newFavorites
    })
  }

  const handleJoinGroup = (groupId: string) => {
    alert(`Joining group ${groupId}! Redirecting to group details...`)
    router.push(`/groups/${groupId}`)
  }

  const handleShareGroup = (group: Group) => {
    setSelectedGroupForShare(group)
    setShowShareModal(true)
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>Travel Together, Save Together</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Join Travel Groups & 
              <span className="block text-yellow-300">Split the Costs</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Connect with like-minded travelers, pool your resources, and explore amazing destinations 
              together while saving money and making new friends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push('/groups/create')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Group
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Groups
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search groups by name, destination, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-xl font-medium transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Groups Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg hover:scale-[1.02] hover:-translate-y-1">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {group.name}
                        </h3>
                        {!group.isPublic && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                            Private
                          </span>
                        )}
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                        {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Funding Progress</span>
                      <span className="text-sm font-bold text-green-600">
                        ₹{group.wallet.balance.toLocaleString()} / ₹{group.wallet.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getProgressPercentage(group.wallet.balance, group.wallet.targetAmount)}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">
                        {group.members.length + 1}/{group.maxMembers} members
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">
                        Created {formatDate(group.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-700 font-medium">Members:</span>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {group.creator.name.charAt(0)}
                      </div>
                      {group.members.slice(0, 3).map((member, idx) => (
                        <div key={idx} className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {member.user.name.charAt(0)}
                        </div>
                      ))}
                      {group.members.length > 3 && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                          +{group.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/groups/${group.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold group-hover:shadow-lg transition-all">
                        View Details
                      </Button>
                    </Link>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinGroup(group.id)}
                      className="border-gray-300 hover:border-blue-500 hover:text-blue-600 rounded-xl"
                    >
                      <UserPlus className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShareGroup(group)}
                      className="border-gray-300 hover:border-purple-500 hover:text-purple-600 rounded-xl"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or create a new group to get started!</p>
            <Button
              onClick={() => router.push('/groups/create')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Group
            </Button>
          </motion.div>
        )}
      </section>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedGroupForShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Group</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Link
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/groups/${selectedGroupForShare.id}`}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          navigator.clipboard.writeText(`${window.location.origin}/groups/${selectedGroupForShare.id}`)
                          alert('Link copied to clipboard!')
                        }
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const text = `Join our travel group "${selectedGroupForShare.name}"! ${window.location.origin}/groups/${selectedGroupForShare.id}`
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                      }
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const text = `Join our travel group "${selectedGroupForShare.name}"! ${window.location.origin}/groups/${selectedGroupForShare.id}`
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank') 
                      }
                    }}
                  >
                    Twitter
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}