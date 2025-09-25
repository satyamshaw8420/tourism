import { Destination, TourPackage } from '@/types'

export const sampleDestinations: Destination[] = [
  {
    id: '1',
    name: 'Goa Beaches',
    description: 'Experience the beautiful beaches and vibrant nightlife of Goa',
    image: '/destinations/goa.jpg',
    category: 'beach',
    location: {
      lat: 15.2993,
      lng: 74.1240,
      address: 'Goa, India'
    },
    rating: 4.5,
    reviewCount: 1250,
    featured: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Himachal Pradesh',
    description: 'Explore the stunning mountains and valleys of Himachal Pradesh',
    image: '/destinations/himachal.jpg',
    category: 'mountain',
    location: {
      lat: 31.1048,
      lng: 77.1734,
      address: 'Himachal Pradesh, India'
    },
    rating: 4.7,
    reviewCount: 890,
    featured: true,
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Rajasthan Heritage',
    description: 'Discover the royal heritage and magnificent palaces of Rajasthan',
    image: '/destinations/rajasthan.jpg',
    category: 'heritage',
    location: {
      lat: 27.0238,
      lng: 74.2179,
      address: 'Rajasthan, India'
    },
    rating: 4.6,
    reviewCount: 2100,
    featured: true,
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    name: 'Ladakh Adventure',
    description: 'Experience high-altitude adventure in the land of high passes',
    image: '/destinations/ladakh.jpg',
    category: 'adventure',
    location: {
      lat: 34.1526,
      lng: 77.5771,
      address: 'Ladakh, India'
    },
    rating: 4.8,
    reviewCount: 650,
    featured: false,
    createdAt: new Date('2024-01-04')
  },
  {
    id: '5',
    name: 'Kerala Backwaters',
    description: 'Cruise through serene backwaters and experience God\'s Own Country',
    image: '/destinations/kerala.jpg',
    category: 'beach',
    location: {
      lat: 10.8505,
      lng: 76.2711,
      address: 'Kerala, India'
    },
    rating: 4.6,
    reviewCount: 1450,
    featured: true,
    createdAt: new Date('2024-01-05')
  },
  {
    id: '6',
    name: 'Mumbai City',
    description: 'Discover the bustling financial capital and Bollywood hub of India',
    image: '/destinations/mumbai.jpg',
    category: 'city',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Mumbai, Maharashtra, India'
    },
    rating: 4.3,
    reviewCount: 2340,
    featured: true,
    createdAt: new Date('2024-01-06')
  },
  {
    id: '7',
    name: 'Rishikesh Spiritual',
    description: 'Find inner peace in the yoga capital of the world',
    image: '/destinations/rishikesh.jpg',
    category: 'adventure',
    location: {
      lat: 30.0869,
      lng: 78.2676,
      address: 'Rishikesh, Uttarakhand, India'
    },
    rating: 4.5,
    reviewCount: 980,
    featured: false,
    createdAt: new Date('2024-01-07')
  },
  {
    id: '8',
    name: 'Agra Heritage',
    description: 'Marvel at the iconic Taj Mahal and Mughal architecture',
    image: '/destinations/agra.jpg',
    category: 'heritage',
    location: {
      lat: 27.1767,
      lng: 78.0081,
      address: 'Agra, Uttar Pradesh, India'
    },
    rating: 4.7,
    reviewCount: 3200,
    featured: true,
    createdAt: new Date('2024-01-08')
  },
  {
    id: '9',
    name: 'Darjeeling Hills',
    description: 'Experience tea gardens and panoramic Himalayan views',
    image: '/destinations/darjeeling.jpg',
    category: 'mountain',
    location: {
      lat: 27.0410,
      lng: 88.2663,
      address: 'Darjeeling, West Bengal, India'
    },
    rating: 4.4,
    reviewCount: 1120,
    featured: false,
    createdAt: new Date('2024-01-09')
  },
  {
    id: '10',
    name: 'Andaman Islands',
    description: 'Dive into crystal clear waters and pristine coral reefs',
    image: '/destinations/andaman.jpg',
    category: 'beach',
    location: {
      lat: 11.7401,
      lng: 92.6586,
      address: 'Port Blair, Andaman and Nicobar Islands, India'
    },
    rating: 4.8,
    reviewCount: 890,
    featured: true,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '11',
    name: 'Jaipur Pink City',
    description: 'Explore the vibrant markets and royal palaces of the Pink City',
    image: '/destinations/jaipur.jpg',
    category: 'heritage',
    location: {
      lat: 26.9124,
      lng: 75.7873,
      address: 'Jaipur, Rajasthan, India'
    },
    rating: 4.5,
    reviewCount: 1890,
    featured: true,
    createdAt: new Date('2024-01-11')
  },
  {
    id: '12',
    name: 'Manali Adventure',
    description: 'Enjoy snow-capped peaks and thrilling adventure sports',
    image: '/destinations/manali.jpg',
    category: 'mountain',
    location: {
      lat: 32.2396,
      lng: 77.1887,
      address: 'Manali, Himachal Pradesh, India'
    },
    rating: 4.6,
    reviewCount: 1560,
    featured: false,
    createdAt: new Date('2024-01-12')
  },
  {
    id: '13',
    name: 'Udaipur Lakes',
    description: 'Experience the romance of the City of Lakes and palaces',
    image: '/destinations/udaipur.jpg',
    category: 'heritage',
    location: {
      lat: 24.5854,
      lng: 73.7125,
      address: 'Udaipur, Rajasthan, India'
    },
    rating: 4.7,
    reviewCount: 1670,
    featured: true,
    createdAt: new Date('2024-01-13')
  },
  {
    id: '14',
    name: 'Varanasi Spiritual',
    description: 'Witness ancient traditions along the sacred River Ganges',
    image: '/destinations/varanasi.jpg',
    category: 'heritage',
    location: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    },
    rating: 4.4,
    reviewCount: 1340,
    featured: false,
    createdAt: new Date('2024-01-14')
  },
  {
    id: '15',
    name: 'Coorg Coffee Hills',
    description: 'Relax in coffee plantations and misty hill stations',
    image: '/destinations/coorg.jpg',
    category: 'mountain',
    location: {
      lat: 12.3375,
      lng: 75.8069,
      address: 'Coorg, Karnataka, India'
    },
    rating: 4.5,
    reviewCount: 980,
    featured: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '16',
    name: 'Hampi Ruins',
    description: 'Explore ancient temple ruins and boulder landscapes',
    image: '/destinations/hampi.jpg',
    category: 'heritage',
    location: {
      lat: 15.3350,
      lng: 76.4600,
      address: 'Hampi, Karnataka, India'
    },
    rating: 4.6,
    reviewCount: 1120,
    featured: false,
    createdAt: new Date('2024-01-16')
  }
]

export const sampleTourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Goa Beach Paradise - 5 Days',
    description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa',
    images: ['/tours/goa-1.jpg', '/tours/goa-2.jpg', '/tours/goa-3.jpg'],
    destination: sampleDestinations[0],
    duration: 5,
    price: 25000,
    originalPrice: 30000,
    maxGroupSize: 15,
    minGroupSize: 4,
    inclusions: [
      'Airport transfers',
      'Accommodation for 4 nights',
      'Daily breakfast',
      'Water sports activities',
      'Sightseeing tours'
    ],
    exclusions: [
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa',
        description: 'Check-in to hotel and relax at Calangute Beach',
        activities: ['Airport pickup', 'Hotel check-in', 'Beach visit'],
        meals: ['dinner']
      },
      {
        day: 2,
        title: 'North Goa Exploration',
        description: 'Visit popular beaches and forts in North Goa',
        activities: ['Baga Beach', 'Anjuna Beach', 'Chapora Fort'],
        meals: ['breakfast'],
        accommodation: 'Beach Resort'
      }
    ],
    availability: [
      new Date('2024-12-15'),
      new Date('2024-12-22'),
      new Date('2025-01-05')
    ],
    rating: 4.5,
    reviewCount: 324,
    featured: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Himalayan Adventure - 7 Days',
    description: 'Trek through beautiful valleys and experience mountain culture',
    images: ['/tours/himachal-1.jpg', '/tours/himachal-2.jpg'],
    destination: sampleDestinations[1],
    duration: 7,
    price: 35000,
    maxGroupSize: 12,
    minGroupSize: 6,
    inclusions: [
      'Transportation',
      'Accommodation',
      'All meals',
      'Trekking guide',
      'Equipment'
    ],
    exclusions: [
      'Personal gear',
      'Insurance',
      'Tips'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali',
        description: 'Acclimatization and local sightseeing',
        activities: ['Local market visit', 'Hadimba Temple'],
        meals: ['breakfast', 'dinner']
      }
    ],
    availability: [
      new Date('2024-11-20'),
      new Date('2024-12-01')
    ],
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    title: 'Kerala Backwater Cruise - 4 Days',
    description: 'Sail through tranquil backwaters and experience traditional houseboat stays',
    images: ['/tours/kerala-1.jpg', '/tours/kerala-2.jpg', '/tours/kerala-3.jpg'],
    destination: sampleDestinations[4], // Kerala Backwaters
    duration: 4,
    price: 28000,
    originalPrice: 32000,
    maxGroupSize: 10,
    minGroupSize: 2,
    inclusions: [
      'Houseboat accommodation',
      'All meals on houseboat',
      'Backwater cruise',
      'Coconut farm visit',
      'Traditional Kerala massage'
    ],
    exclusions: [
      'Transportation to Alleppey',
      'Personal expenses',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Alleppey',
        description: 'Board traditional houseboat and start backwater journey',
        activities: ['Houseboat check-in', 'Backwater cruise', 'Village visit'],
        meals: ['lunch', 'dinner']
      },
      {
        day: 2,
        title: 'Backwater Exploration',
        description: 'Cruise through narrow canals and coconut groves',
        activities: ['Canal cruise', 'Fishing', 'Local market visit'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Traditional Houseboat'
      }
    ],
    availability: [
      new Date('2024-12-10'),
      new Date('2024-12-18'),
      new Date('2025-01-15')
    ],
    rating: 4.6,
    reviewCount: 289,
    featured: true,
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    title: 'Taj Mahal & Agra Heritage - 3 Days',
    description: 'Witness the eternal symbol of love and explore Mughal heritage',
    images: ['/tours/agra-1.jpg', '/tours/agra-2.jpg'],
    destination: sampleDestinations[7], // Agra Heritage
    duration: 3,
    price: 18000,
    maxGroupSize: 20,
    minGroupSize: 4,
    inclusions: [
      'Hotel accommodation',
      'Taj Mahal entry tickets',
      'Professional guide',
      'Transportation',
      'Breakfast'
    ],
    exclusions: [
      'Lunch and dinner',
      'Monument photography fees',
      'Shopping expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Taj Mahal Sunrise',
        description: 'Experience the beauty of Taj Mahal at sunrise',
        activities: ['Taj Mahal visit', 'Agra Fort', 'Local crafts tour'],
        meals: ['breakfast']
      }
    ],
    availability: [
      new Date('2024-11-25'),
      new Date('2024-12-05'),
      new Date('2025-01-10')
    ],
    rating: 4.8,
    reviewCount: 445,
    featured: true,
    createdAt: new Date('2024-01-04')
  },
  {
    id: '5',
    title: 'Andaman Island Paradise - 6 Days',
    description: 'Dive into crystal waters and explore tropical marine life',
    images: ['/tours/andaman-1.jpg', '/tours/andaman-2.jpg', '/tours/andaman-3.jpg'],
    destination: sampleDestinations[9], // Andaman Islands
    duration: 6,
    price: 45000,
    originalPrice: 52000,
    maxGroupSize: 12,
    minGroupSize: 4,
    inclusions: [
      'Hotel accommodation',
      'Island hopping tours',
      'Scuba diving session',
      'Snorkeling equipment',
      'All transfers',
      'Breakfast and lunch'
    ],
    exclusions: [
      'Dinner',
      'Water sports (extra)',
      'Personal diving gear'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Port Blair',
        description: 'Explore the capital and visit Cellular Jail',
        activities: ['Airport pickup', 'Cellular Jail', 'Light & Sound show'],
        meals: ['breakfast']
      },
      {
        day: 2,
        title: 'Havelock Island',
        description: 'Ferry to Havelock and beach exploration',
        activities: ['Ferry ride', 'Radhanagar Beach', 'Beach activities'],
        meals: ['breakfast', 'lunch'],
        accommodation: 'Beach Resort'
      }
    ],
    availability: [
      new Date('2024-12-20'),
      new Date('2025-01-08'),
      new Date('2025-01-25')
    ],
    rating: 4.9,
    reviewCount: 234,
    featured: true,
    createdAt: new Date('2024-01-05')
  },
  {
    id: '6',
    title: 'Jaipur Royal Experience - 3 Days',
    description: 'Live like royalty in the Pink City with palace stays and cultural shows',
    images: ['/tours/jaipur-1.jpg', '/tours/jaipur-2.jpg'],
    destination: sampleDestinations[10], // Jaipur Pink City
    duration: 3,
    price: 22000,
    maxGroupSize: 15,
    minGroupSize: 6,
    inclusions: [
      'Heritage hotel stay',
      'Palace tours',
      'Cultural folk show',
      'Elephant ride',
      'Traditional Rajasthani dinner'
    ],
    exclusions: [
      'Shopping expenses',
      'Camel safari',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Pink City Exploration',
        description: 'Discover the architectural marvels of Jaipur',
        activities: ['Hawa Mahal', 'City Palace', 'Jantar Mantar'],
        meals: ['breakfast', 'dinner']
      }
    ],
    availability: [
      new Date('2024-11-30'),
      new Date('2024-12-14'),
      new Date('2025-01-20')
    ],
    rating: 4.7,
    reviewCount: 367,
    featured: false,
    createdAt: new Date('2024-01-06')
  }
]

export const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: '/avatars/priya.jpg',
    rating: 5,
    text: 'Amazing experience! The group wallet feature made it so easy to manage expenses with friends.',
    tour: 'Goa Beach Paradise',
    location: 'Mumbai'
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    avatar: '/avatars/rahul.jpg',
    rating: 5,
    text: 'The EMI option helped me join an expensive trip without financial stress. Highly recommended!',
    tour: 'Himalayan Adventure',
    location: 'Delhi'
  },
  {
    id: '3',
    name: 'Anita Desai',
    avatar: '/avatars/anita.jpg',
    rating: 4,
    text: 'The AI recommendations were spot-on. Found the perfect trip within our budget.',
    tour: 'Rajasthan Heritage',
    location: 'Bangalore'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    avatar: '/avatars/vikram.jpg',
    rating: 5,
    text: 'Kerala backwaters tour was magical! The houseboat experience was unforgettable.',
    tour: 'Kerala Backwater Cruise',
    location: 'Chennai'
  },
  {
    id: '5',
    name: 'Sneha Patel',
    avatar: '/avatars/sneha.jpg',
    rating: 5,
    text: 'Andaman islands exceeded all expectations. Crystal clear waters and amazing coral reefs!',
    tour: 'Andaman Island Paradise',
    location: 'Pune'
  },
  {
    id: '6',
    name: 'Arjun Gupta',
    avatar: '/avatars/arjun.jpg',
    rating: 4,
    text: 'The Taj Mahal sunrise tour was breathtaking. Professional guide made it very informative.',
    tour: 'Taj Mahal & Agra Heritage',
    location: 'Kolkata'
  }
]