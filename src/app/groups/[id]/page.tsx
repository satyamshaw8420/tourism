'use client'

import { useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Users, MapPin, Calendar, DollarSign, Settings, 
  UserPlus, Share2, Heart, Star, Clock, Wallet, Target,
  TrendingUp, Activity, MessageCircle, Bell, CreditCard,
  CheckCircle, AlertCircle, Plus, Edit, Trash2, X, Copy,
  Send, LogOut, Shield, Eye, EyeOff, Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/sections/navbar'
import { Group, GroupMember } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface GroupDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// Sample group data (in a real app, this would be fetched from API)
const sampleGroup: Group = {
  id: '1',
  name: 'Goa Beach Squad',
  description: 'Friends planning an epic beach vacation in Goa with water sports, nightlife, and relaxation! Join us for an unforgettable experience with crystal clear waters, golden sandy beaches, and amazing seafood.',
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
    },
    {
      id: '3',
      user: {
        id: '4',
        email: 'vikram@example.com',
        name: 'Vikram Singh',
        kycStatus: 'verified',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      role: 'member',
      contribution: 6000,
      joinedAt: new Date('2024-01-25'),
      status: 'accepted'
    }
  ],
  wallet: {
    id: '1',
    balance: 29500,
    targetAmount: 30000,
    transactions: [
      {
        id: '1',
        amount: 8000,
        type: 'deposit',
        description: 'Initial contribution from Priya',
        userId: '1',
        groupId: '1',
        status: 'completed',
        paymentMethod: 'upi',
        createdAt: new Date('2024-01-10')
      },
      {
        id: '2',
        amount: 8000,
        type: 'deposit',
        description: 'Contribution from Rahul',
        userId: '2',
        groupId: '1',
        status: 'completed',
        paymentMethod: 'card',
        createdAt: new Date('2024-01-15')
      }
    ],
    emiPlans: [],
    createdAt: new Date('2024-01-10')
  },
  status: 'active',
  maxMembers: 6,
  isPublic: true,
  createdAt: new Date('2024-01-10'),
  updatedAt: new Date('2024-01-25')
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { id } = use(params)
  const [group] = useState<Group>(sampleGroup) // In real app, fetch by ID
  const [isJoined, setIsJoined] = useState(false)
  const [showContributeModal, setShowContributeModal] = useState(false)
  const [contributionAmount, setContributionAmount] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)

  // Utility function to format dates consistently for SSR
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0]
  }

  if (!group) {
    notFound()
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'planning': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const totalMembers = group.members.length + 1 // +1 for creator
  const remainingAmount = group.wallet.targetAmount - group.wallet.balance
  const avgContribution = group.wallet.targetAmount / group.maxMembers

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white pt-32 pb-12">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/groups" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Groups
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="text-3xl md:text-5xl font-bold">{group.name}</h1>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(group.status)}`}>
                    {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                  </span>
                  {!group.isPublic && (
                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                      Private
                    </span>
                  )}
                </div>
                
                <p className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed">
                  {group.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{totalMembers}/{group.maxMembers} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Created {formatDate(group.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Goal: ₹{group.wallet.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {!isJoined ? (
                  <Button
                    size="lg"
                    onClick={() => setIsJoined(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-bold"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Join Group
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => setShowContributeModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold"
                  >
                    <Wallet className="w-5 h-5 mr-2" />
                    Contribute
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowShareModal(true)}
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-6 py-3 rounded-xl"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-6 py-3 rounded-xl"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Funding Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 border-0 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Funding Progress</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Current Progress</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{group.wallet.balance.toLocaleString()} / ₹{group.wallet.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                      style={{ width: `${getProgressPercentage(group.wallet.balance, group.wallet.targetAmount)}%` }}
                    >
                      <span className="text-white text-xs font-bold">
                        {Math.round(getProgressPercentage(group.wallet.balance, group.wallet.targetAmount))}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">₹{remainingAmount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">{totalMembers}</div>
                      <div className="text-sm text-gray-600">Active Members</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">₹{Math.round(avgContribution).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Avg Contribution</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Group Members</h2>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setShowInviteModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Creator */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {group.creator.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{group.creator.name}</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Creator
                          </span>
                          {group.creator.kycStatus === 'verified' && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Joined {formatDate(group.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₹8,000</div>
                      <div className="text-sm text-gray-500">Contributed</div>
                    </div>
                  </div>
                  
                  {/* Members */}
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {member.user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{member.user.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              member.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {member.status}
                            </span>
                            {member.user.kycStatus === 'verified' && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Joined {formatDate(member.joinedAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">₹{member.contribution.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Contributed</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 border-0 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <Activity className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                </div>
                
                <div className="space-y-4">
                  {group.wallet.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(transaction.createdAt)} • {transaction.paymentMethod.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+₹{transaction.amount.toLocaleString()}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowContributeModal(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button 
                    onClick={() => setShowChatModal(true)}
                    variant="outline" 
                    className="w-full"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Group Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Plan Itinerary
                  </Button>
                  <Button 
                    onClick={() => setShowSettingsModal(true)}
                    variant="outline" 
                    className="w-full"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Group Settings
                  </Button>
                  {isJoined && (
                    <Button 
                      onClick={() => setShowLeaveModal(true)}
                      variant="outline" 
                      className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Leave Group
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Group Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Group Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Raised:</span>
                    <span className="font-bold text-green-600">₹{group.wallet.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Amount:</span>
                    <span className="font-bold">₹{group.wallet.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days Active:</span>
                    <span className="font-bold">
                      {Math.floor((Date.now() - group.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion:</span>
                    <span className="font-bold text-blue-600">
                      {Math.round(getProgressPercentage(group.wallet.balance, group.wallet.targetAmount))}%
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Safety & Trust */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Safety & Trust</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Verified Group Creator</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Secure Payment Processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Transparent Fund Management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">24/7 Customer Support</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {/* Contribute Modal */}
        {showContributeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContributeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contribute to Group</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContributeModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contribution Amount (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Quick Amounts</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[2000, 5000, 10000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setContributionAmount(amount.toString())}
                        className="border-blue-200 text-blue-700 hover:bg-blue-100"
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowContributeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    onClick={() => {
                      // Handle contribution logic
                      alert(`Contributing ₹${contributionAmount} to the group!`)
                      setShowContributeModal(false)
                      setContributionAmount('')
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Contribute
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Share Modal */}
        {showShareModal && (
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
                      value={`${window.location.origin}/groups/${group.id}`}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/groups/${group.id}`)
                        alert('Link copied to clipboard!')
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
                      const text = `Join our travel group "${group.name}"! ${window.location.origin}/groups/${group.id}`
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const text = `Join our travel group "${group.name}"! ${window.location.origin}/groups/${group.id}`
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
                    }}
                  >
                    Twitter
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Invite Friends</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInviteModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    onClick={() => {
                      // Handle invite logic
                      alert(`Invitation sent to ${inviteEmail}!`)
                      setShowInviteModal(false)
                      setInviteEmail('')
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Group Chat Modal */}
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowChatModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full h-[600px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Group Chat</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChatModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      P
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-900">Priya Sharma</p>
                        <p className="text-gray-700">Hey everyone! Excited for our Goa trip! 🏖️</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      R
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm font-medium text-gray-900">Rahul Kumar</p>
                        <p className="text-gray-700">Can't wait! Have we finalized the hotel booking?</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      alert(`Message sent: ${chatMessage}`)
                      setChatMessage('')
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    alert(`Message sent: ${chatMessage}`)
                    setChatMessage('')
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Group Settings Modal */}
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Group Settings</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettingsModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Settings className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium">Public Group</span>
                      </div>
                      <Button variant="outline" size="sm">
                        {group.isPublic ? 'Make Private' : 'Make Public'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium">Require Approval</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Toggle
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Group Information</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Group Name
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Description
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Update Target Amount
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Dangerous Actions</h4>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Group
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Leave Group Modal */}
        {showLeaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeaveModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Leave Group</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLeaveModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-900">Are you sure?</p>
                      <p className="text-sm text-red-700">You will lose access to the group and any contributions made.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowLeaveModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      setIsJoined(false)
                      setShowLeaveModal(false)
                      alert('You have left the group.')
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave Group
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