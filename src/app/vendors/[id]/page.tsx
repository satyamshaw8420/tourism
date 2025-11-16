'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Users, Award, MapPin, Phone, Mail, Globe, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

// Sample vendor data - in a real app this would come from an API
const vendorData = {
  '1': {
    id: '1',
    name: 'Ranchi Tribal Crafts',
    description: 'Authentic tribal handicrafts from Ranchi including wooden sculptures and bamboo products',
    rating: 4.8,
    reviewCount: 124,
    specialties: ['Wooden crafts', 'Bamboo products', 'Tribal jewelry', 'Handwoven textiles'],
    image: '/vendors/tribal-crafts.jpg',
    location: 'Ranchi',
    phone: '+91 98765 43210',
    email: 'tribalcrafts@ranchi.com',
    website: 'www.ranchitribalcrafts.com',
    established: '2010',
    artisans: 15,
    about: 'Ranchi Tribal Crafts has been preserving and promoting the rich tribal heritage of Jharkhand for over a decade. Our skilled artisans create beautiful handicrafts using traditional techniques passed down through generations. We specialize in wooden sculptures, bamboo products, and tribal jewelry that reflect the cultural richness of our region.',
    products: [
      { id: '1', name: 'Tribal Wooden Sculpture', price: '₹1,200', image: '/products/wooden-sculpture.jpg' },
      { id: '2', name: 'Bamboo Basket Set', price: '₹800', image: '/products/bamboo-basket.jpg' },
      { id: '3', name: 'Handwoven Textile', price: '₹1,500', image: '/products/textile.jpg' },
      { id: '4', name: 'Tribal Jewelry Set', price: '₹2,200', image: '/products/jewelry.jpg' }
    ],
    reviews: [
      { id: '1', user: 'Amit Sharma', rating: 5, comment: 'Beautiful craftsmanship! The wooden sculpture I bought is a centerpiece in my home.', date: '2024-05-15' },
      { id: '2', user: 'Priya Patel', rating: 4, comment: 'Great quality bamboo products. Fast shipping and excellent customer service.', date: '2024-04-22' },
      { id: '3', user: 'Rajesh Kumar', rating: 5, comment: 'Authentic tribal jewelry that my wife loves. Will definitely buy more!', date: '2024-03-10' }
    ]
  },
  '2': {
    id: '2',
    name: 'Deoghar Sweet House',
    description: 'Famous for authentic Deoghar peda and other traditional sweets',
    rating: 4.9,
    reviewCount: 256,
    specialties: ['Deoghar Peda', 'Traditional sweets', 'Dry fruits', 'Local delicacies'],
    image: '/vendors/sweets.jpg',
    location: 'Deoghar',
    phone: '+91 98765 43211',
    email: 'sweets@deoghar.com',
    website: 'www.deogharsweets.com',
    established: '1985',
    artisans: 8,
    about: 'Deoghar Sweet House has been delighting customers with authentic Deoghar peda for nearly four decades. Our sweets are made using traditional recipes and the finest ingredients. We are proud to be one of the most trusted sweet shops in Deoghar, serving pilgrims and locals alike.',
    products: [
      { id: '1', name: 'Original Deoghar Peda', price: '₹300/kg', image: '/products/peda.jpg' },
      { id: '2', name: 'Dry Fruit Barfi', price: '₹450/kg', image: '/products/barfi.jpg' },
      { id: '3', name: 'Traditional Ladoo', price: '₹250/kg', image: '/products/ladoo.jpg' },
      { id: '4', name: 'Kaju Katli', price: '₹500/kg', image: '/products/kaju-katli.jpg' }
    ],
    reviews: [
      { id: '1', user: 'Sunita Devi', rating: 5, comment: 'The best Deoghar peda I\'ve ever tasted! Authentic taste that reminds me of my childhood.', date: '2024-05-18' },
      { id: '2', user: 'Vikash Singh', rating: 5, comment: 'Ordered for a family function. Everyone loved the sweets. Will order again!', date: '2024-04-30' },
      { id: '3', user: 'Anjali Roy', rating: 4, comment: 'Great quality sweets. Packaging was also very good for gifting.', date: '2024-03-15' }
    ]
  },
  '3': {
    id: '3',
    name: 'Hazaribagh Jungle Guides',
    description: 'Local guides offering personalized wildlife tours in Hazaribagh National Park',
    rating: 4.9,
    reviewCount: 210,
    specialties: ['Wildlife tours', 'Bird watching', 'Nature walks', 'Tribal village visits'],
    image: '/vendors/guides.jpg',
    location: 'Hazaribagh',
    phone: '+91 98765 43212',
    email: 'guides@hazaribagh.com',
    website: 'www.hazaribaghjungleguides.com',
    established: '2005',
    artisans: 12,
    about: 'Hazaribagh Jungle Guides is a team of experienced local guides who have been exploring the wilderness of Hazaribagh National Park for over 15 years. Our guides have an intimate knowledge of the local flora, fauna, and tribal culture. We offer personalized wildlife tours that provide an authentic and educational experience for nature enthusiasts.',
    products: [
      { id: '1', name: 'Full Day Wildlife Safari', price: '₹2,500/person', image: '/products/safari.jpg' },
      { id: '2', name: 'Bird Watching Tour', price: '₹1,800/person', image: '/products/bird-watching.jpg' },
      { id: '3', name: 'Tribal Village Visit', price: '₹1,200/person', image: '/products/tribal-visit.jpg' },
      { id: '4', name: 'Night Jungle Walk', price: '₹2,000/person', image: '/products/night-walk.jpg' }
    ],
    reviews: [
      { id: '1', user: 'Rahul Verma', rating: 5, comment: 'Amazing experience! Our guide knew so much about the wildlife and shared fascinating stories.', date: '2024-05-10' },
      { id: '2', user: 'Deepa Nair', rating: 5, comment: 'The bird watching tour was incredible. Spotted so many rare species!', date: '2024-04-18' },
      { id: '3', user: 'Sanjay Patel', rating: 4, comment: 'Great guides who made our safari both educational and fun. Highly recommended!', date: '2024-03-05' }
    ]
  },
  '4': {
    id: '4',
    name: 'Jamshedpur Steel Art',
    description: 'Unique metal crafts made from recycled steel inspired by Tata Steel heritage',
    rating: 4.7,
    reviewCount: 156,
    specialties: ['Metal sculptures', 'Steel crafts', 'Industrial art', 'Home decor'],
    image: '/vendors/metal-crafts.jpg',
    location: 'Jamshedpur',
    phone: '+91 98765 43213',
    email: 'steelart@jamshedpur.com',
    website: 'www.jamshedpursteelart.com',
    established: '2012',
    artisans: 10,
    about: 'Jamshedpur Steel Art transforms recycled steel into beautiful artistic creations inspired by the industrial heritage of Jamshedpur. Our artisans, many of whom have backgrounds in the steel industry, use their expertise to craft unique sculptures and home decor items. Each piece tells a story of transformation - from industrial material to artistic expression.',
    products: [
      { id: '1', name: 'Tata Steel Heritage Sculpture', price: '₹4,500', image: '/products/steel-sculpture.jpg' },
      { id: '2', name: 'Industrial Wall Art', price: '₹2,800', image: '/products/wall-art.jpg' },
      { id: '3', name: 'Recycled Steel Vase', price: '₹1,500', image: '/products/steel-vase.jpg' },
      { id: '4', name: 'Steel Home Decor Set', price: '₹3,200', image: '/products/decor-set.jpg' }
    ],
    reviews: [
      { id: '1', user: 'Kavita Reddy', rating: 5, comment: 'The steel sculpture is a conversation starter in our living room. Excellent craftsmanship!', date: '2024-05-12' },
      { id: '2', user: 'Manoj Kumar', rating: 4, comment: 'Beautiful industrial art pieces. Shipping was careful and prompt.', date: '2024-04-25' },
      { id: '3', user: 'Shreya Bose', rating: 5, comment: 'Love the recycled steel vase. It perfectly complements our modern decor.', date: '2024-03-08' }
    ]
  },
  '5': {
    id: '5',
    name: 'Baidyanath Local Guides',
    description: 'Expert guides for pilgrimage tours to Baidyanath Dham and surrounding temples',
    rating: 4.8,
    reviewCount: 189,
    specialties: ['Pilgrimage tours', 'Temple history', 'Local legends', 'Spiritual experiences'],
    image: '/vendors/guides.jpg',
    location: 'Deoghar',
    phone: '+91 98765 43214',
    email: 'pilgrimage@baidyanath.com',
    website: 'www.baidyanathguides.com',
    established: '1998',
    artisans: 9,
    about: 'Baidyanath Local Guides has been providing expert pilgrimage guidance for over two decades. Our guides are not only knowledgeable about the religious significance of Baidyanath Dham but also well-versed in the spiritual traditions and local legends. We offer personalized tours that enhance the spiritual experience of pilgrims from all over the world.',
    products: [
      { id: '1', name: 'Complete Baidyanath Dham Tour', price: '₹1,500/person', image: '/products/baidyanath-tour.jpg' },
      { id: '2', name: 'Temple History Tour', price: '₹1,200/person', image: '/products/history-tour.jpg' },
      { id: '3', name: 'Spiritual Experience Package', price: '₹2,000/person', image: '/products/spiritual-package.jpg' },
      { id: '4', name: 'Local Legends Walking Tour', price: '₹800/person', image: '/products/legends-tour.jpg' }
    ],
    reviews: [
      { id: '1', user: 'Anil Joshi', rating: 5, comment: 'Our pilgrimage was made so much more meaningful with the guidance of these experts. Highly recommended!', date: '2024-05-20' },
      { id: '2', user: 'Sneha Mukherjee', rating: 5, comment: 'The guide shared fascinating stories about the temple history. Very knowledgeable and respectful.', date: '2024-04-28' },
      { id: '3', user: 'Ramesh Iyer', rating: 4, comment: 'Professional service that enhanced our spiritual journey. Good value for money.', date: '2024-03-12' }
    ]
  },
  '6': {
    id: '6',
    name: 'Netarhat Hill Farmers',
    description: 'Organic produce and local delicacies from the hills of Netarhat',
    rating: 4.6,
    reviewCount: 98,
    specialties: ['Organic honey', 'Hill vegetables', 'Local teas', 'Handmade preserves'],
    image: '/vendors/farmers.jpg',
    location: 'Netarhat',
    phone: '+91 98765 43215',
    email: 'farmers@netarhat.com',
    website: 'www.netarhatfarmers.com',
    established: '2015',
    artisans: 25,
    about: 'Netarhat Hill Farmers is a cooperative of local farmers who cultivate organic produce in the pristine hills of Netarhat. Our products are grown without chemicals and harvested at peak ripeness. We specialize in unique hill vegetables, organic honey, and locally grown teas that capture the essence of the Netarhat region. Our handmade preserves are prepared using traditional recipes passed down through generations.',
    products: [
      { id: '1', name: 'Organic Hill Honey', price: '₹400/500g', image: '/products/honey.jpg' },
      { id: '2', name: 'Netarhat Tea Collection', price: '₹300/100g', image: '/products/netarhat-tea.jpg' },
      { id: '3', name: 'Organic Hill Vegetables', price: '₹150/kg', image: '/products/hill-vegetables.jpg' },
      { id: '4', name: 'Traditional Fruit Preserves', price: '₹250/jar', image: '/products/preserves.jpg' }
    ],
    reviews: [
      { id: '1', user: 'Meera Desai', rating: 5, comment: 'The organic honey is absolutely delicious! You can taste the difference of hill flowers.', date: '2024-05-14' },
      { id: '2', user: 'Vikram Singh', rating: 4, comment: 'Fresh hill vegetables that arrived in perfect condition. Will definitely order again.', date: '2024-04-20' },
      { id: '3', user: 'Tanvi Rao', rating: 5, comment: 'The tea has a unique flavor that you can\'t find anywhere else. Love supporting local farmers!', date: '2024-03-07' }
    ]
  }
}

export default function VendorProfile({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise using React.use()
  const resolvedParams = React.use(params)
  
  const [vendor, setVendor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Use the resolved params
      const vendorId = resolvedParams.id
      const foundVendor = vendorData[vendorId as keyof typeof vendorData]
      
      if (foundVendor) {
        setVendor(foundVendor)
      } else {
        setError('Vendor not found')
      }
      setLoading(false)
    }, 500)
  }, [params]) // Use params (the promise) in the dependency array, not resolvedParams.id

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vendor profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Error Loading Vendor</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link href="/#vendors">
            <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
              Back to Vendors
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Vendor Not Found</h1>
          <p className="mt-2 text-gray-600">The vendor you&#39;re looking for doesn&#39;t exist.</p>
          <Link href="/#vendors">
            <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
              Back to Vendors
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/#vendors" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
          ← Back to Vendors
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
        >
          {/* Vendor Header */}
          <div className="relative h-80 bg-gradient-to-r from-green-500 to-teal-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-2">{vendor.name}</h1>
              <div className="flex items-center text-white">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{vendor.location}</span>
              </div>
            </div>
          </div>
          
          {/* Vendor Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{vendor.about}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty: string, index: number) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Products & Services</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {vendor.products.map((product: any) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-40 bg-gray-200 flex items-center justify-center">
                          <div className="bg-gray-300 border-2 border-dashed rounded-xl w-16 h-16" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900">{product.name}</h3>
                          <p className="text-green-600 font-medium mt-1">{product.price}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                  <div className="space-y-6">
                    {vendor.reviews.map((review: any) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold text-gray-900">{review.user}</h3>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{review.rating}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar - Enhanced Contact Section */}
              <div>
                <Card className="p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-bold text-lg">{vendor.rating}</span>
                      <span className="text-gray-500 ml-1">({vendor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-green-600" />
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                          <Phone className="w-4 h-4 mr-3 text-green-500" />
                          <span className="font-medium">{vendor.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                          <Mail className="w-4 h-4 mr-3 text-green-500" />
                          <span className="font-medium">{vendor.email}</span>
                        </div>
                        <div className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                          <Globe className="w-4 h-4 mr-3 text-green-500" />
                          <span className="font-medium">{vendor.website}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-3 text-green-500" />
                          <span className="font-medium">{vendor.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Established</span>
                          <span className="font-medium">{vendor.established}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Artisans</span>
                          <span className="font-medium">{vendor.artisans}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 font-bold">
                    Contact Vendor
                  </Button>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Share this Vendor
                  </h3>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1 border-sky-200 text-sky-600 hover:bg-sky-50">
                      Twitter
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}