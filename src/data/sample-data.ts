import { Destination, TourPackage } from '@/types'

export const sampleDestinations: Destination[] = [
  {
    id: '1',
    name: 'Goa Beaches',
    description: 'Experience the beautiful beaches and vibrant nightlife of Goa',
    image: '/destinations/goa-beaches/goa.jpg',
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
    image: '/destinations/himachal-pradesh/himachal-pradesh-main-attraction.jpg',
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
    image: '/destinations/rajasthan-heritage/rajasthan-heritage-main-attraction.jpg',
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
    image: '/destinations/ladakh-adventure/ladakh-adventure-main-attraction.jpg',
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
    id: '6',
    name: 'Mumbai City',
    description: 'Discover the bustling financial capital and Bollywood hub of India',
    image: '/destinations/mumbai/mumbai.jpg',
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
    image: '/destinations/rishikesh-spiritual/rishikesh-spiritual-main-attraction.jpg',
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
    image: '/destinations/agra-heritage/agra-heritage-main-attraction.png',
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
    image: '/destinations/darjeeling-hills/darjeeling-hills-main-attraction.jpg',
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
    image: '/destinations/andaman-islands/andaman-islands-main-attraction.jpg',
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
    image: '/destinations/jaipur-pink-city/jaipur-pink-city-main-attraction.jpg',
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
    image: '/destinations/manali-adventure/manali-adventure-main-attraction.jpg',
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
    image: '/destinations/udaipur-lakes/udaipur-lakes-main-attraction.jpg',
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
    image: '/destinations/varanasi-spiritual/varanasi-spiritual-main-attraction.jpg',
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
    image: '/destinations/coorg-coffee-hills/coorg-coffee-hills-main-attraction.jpg',
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
    image: '/destinations/hampi-ruins/hampi-ruins-main-attraction.jpg',
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
  },
  {
    id: '17',
    name: 'Dassam Falls',
    description: 'A beautiful waterfall surrounded by forest, perfect for picnics and photography',
    image: '/destinations/dassam-falls/dassam-falls-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.3750,
      lng: 85.4278,
      address: 'Ranchi, Jharkhand, India'
    },
    rating: 4.7,
    reviewCount: 890,
    featured: true,
    createdAt: new Date('2024-01-17')
  },
  {
    id: '18',
    name: 'Hundru Falls',
    description: 'A 98-meter-high fall, famous as one of the most spectacular in Jharkhand',
    image: '/destinations/hundru-falls/hundru-falls-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.3000,
      lng: 85.3000,
      address: 'Ranchi, Jharkhand, India'
    },
    rating: 4.8,
    reviewCount: 1240,
    featured: true,
    createdAt: new Date('2024-01-18')
  },
  {
    id: '19',
    name: 'Jonha Falls',
    description: 'Also called Gautamdhara, it has a Buddhist monastery nearby',
    image: '/destinations/jonha-falls/jonha-falls-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.4333,
      lng: 85.4500,
      address: 'Ranchi, Jharkhand, India'
    },
    rating: 4.6,
    reviewCount: 780,
    featured: true,
    createdAt: new Date('2024-01-19')
  },
  {
    id: '20',
    name: 'Patratu Valley',
    description: 'A winding valley with breathtaking hills, greenery, and a dam',
    image: '/destinations/patratu-valley/patratu-valley-main-attraction.jpg',
    category: 'mountain',
    location: {
      lat: 23.6000,
      lng: 85.3000,
      address: 'Ramgarh, Jharkhand, India'
    },
    rating: 4.5,
    reviewCount: 650,
    featured: false,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '21',
    name: 'Netarhat',
    description: 'Known as the "Queen of Chotanagpur," famous for sunrise and sunset views',
    image: '/destinations/netarhat/netarhat-main-attraction.jpg',
    category: 'mountain',
    location: {
      lat: 23.5000,
      lng: 84.6000,
      address: 'Latehar, Jharkhand, India'
    },
    rating: 4.7,
    reviewCount: 540,
    featured: true,
    createdAt: new Date('2024-01-21')
  },
  {
    id: '22',
    name: 'Dimna Lake',
    description: 'A serene lake offering water sports and peaceful surroundings',
    image: '/destinations/dimna-lake/dimna-lake-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 22.8000,
      lng: 86.2000,
      address: 'Jamshedpur, Jharkhand, India'
    },
    rating: 4.4,
    reviewCount: 420,
    featured: false,
    createdAt: new Date('2024-01-22')
  },
  {
    id: '23',
    name: 'Topchanchi Lake',
    description: 'A tranquil artificial lake ideal for a local getaway',
    image: '/destinations/topchanchi-lake/topchanchi-lake-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.8000,
      lng: 86.5000,
      address: 'Dhanbad, Jharkhand, India'
    },
    rating: 4.3,
    reviewCount: 380,
    featured: false,
    createdAt: new Date('2024-01-23')
  },
  {
    id: '24',
    name: 'Maithon Dam',
    description: 'A huge dam on the Barakar River, popular for boating and nature',
    image: '/destinations/maithon-dam/maithon-dam-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.7833,
      lng: 86.8167,
      address: 'Dhanbad, Jharkhand, India'
    },
    rating: 4.5,
    reviewCount: 460,
    featured: false,
    createdAt: new Date('2024-01-24')
  },
  {
    id: '25',
    name: 'Tilaiya Dam',
    description: 'A peaceful dam surrounded by hills, great for nature lovers',
    image: '/destinations/tilaiya-dam/tilaiya-dam-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 24.3000,
      lng: 85.5000,
      address: 'Koderma, Jharkhand, India'
    },
    rating: 4.2,
    reviewCount: 310,
    featured: false,
    createdAt: new Date('2024-01-25')
  },
  {
    id: '26',
    name: 'Betla National Park',
    description: 'Home to tigers, elephants, and scenic forests',
    image: '/destinations/betla-national-park/betla-national-park-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.4167,
      lng: 84.4500,
      address: 'Latehar, Jharkhand, India'
    },
    rating: 4.8,
    reviewCount: 920,
    featured: true,
    createdAt: new Date('2024-01-26')
  },
  {
    id: '27',
    name: 'Hazaribagh National Park',
    description: 'Famous for wildlife safaris and forest drives',
    image: '/destinations/hazaribagh-national-park/hazaribagh-national-park-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 23.9833,
      lng: 85.4000,
      address: 'Hazaribagh, Jharkhand, India'
    },
    rating: 4.6,
    reviewCount: 680,
    featured: false,
    createdAt: new Date('2024-01-27')
  },
  {
    id: '28',
    name: 'Dalma Wildlife Sanctuary',
    description: 'Known for elephants, trekking trails, and scenic views',
    image: '/destinations/dalma-wildlife-sanctuary/dalma-wildlife-sanctuary-main-attraction.jpg',
    category: 'adventure',
    location: {
      lat: 22.7000,
      lng: 86.2000,
      address: 'Jamshedpur, Jharkhand, India'
    },
    rating: 4.4,
    reviewCount: 530,
    featured: false,
    createdAt: new Date('2024-01-28')
  },
  {
    id: '29',
    name: 'Baidyanath Dham',
    description: 'A Jyotirlinga shrine and one of the holiest Hindu pilgrimage sites',
    image: '/destinations/baidyanath-dham/baidyanath-dham-main-attraction.jpg',
    category: 'heritage',
    location: {
      lat: 24.4833,
      lng: 86.7000,
      address: 'Deoghar, Jharkhand, India'
    },
    rating: 4.9,
    reviewCount: 1560,
    featured: true,
    createdAt: new Date('2024-01-29')
  },
  {
    id: '30',
    name: 'Parasnath Hill',
    description: 'The most sacred Jain pilgrimage site with spiritual trekking trails',
    image: '/destinations/parasnath-hill/parasnath-hill-main-attraction.jpg',
    category: 'heritage',
    location: {
      lat: 23.7000,
      lng: 86.1667,
      address: 'Giridih, Jharkhand, India'
    },
    rating: 4.7,
    reviewCount: 890,
    featured: true,
    createdAt: new Date('2024-01-30')
  },
  {
    id: '31',
    name: 'Pahari Mandir',
    description: 'A hilltop Shiva temple offering a panoramic view of the city',
    image: '/destinations/pahari-mandir/pahari-mandir-main-attraction.jpg',
    category: 'heritage',
    location: {
      lat: 23.3500,
      lng: 85.3333,
      address: 'Ranchi, Jharkhand, India'
    },
    rating: 4.5,
    reviewCount: 720,
    featured: false,
    createdAt: new Date('2024-01-31')
  },
  {
    id: '32',
    name: 'Jagannath Temple',
    description: 'A 17th-century temple resembling Puri\'s Jagannath Temple',
    image: '/destinations/jagannath-temple/jagannath-temple-main-attraction.jpg',
    category: 'heritage',
    location: {
      lat: 23.3500,
      lng: 85.3333,
      address: 'Ranchi, Jharkhand, India'
    },
    rating: 4.6,
    reviewCount: 680,
    featured: false,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '33',
    name: 'Rajrappa Mandir',
    description: 'A Shaktipeeth temple of Goddess Chhinnamastika at the confluence of two rivers',
    image: '/destinations/rajrappa-mandir/rajrappa-mandir-main-attraction.jpg',
    category: 'heritage',
    location: {
      lat: 23.7333,
      lng: 85.5167,
      address: 'Ramgarh, Jharkhand, India'
    },
    rating: 4.7,
    reviewCount: 750,
    featured: true,
    createdAt: new Date('2024-02-02')
  },
  {
    id: '34',
    name: 'Ranchi City',
    description: 'Known for waterfalls, temples, and local tribal culture',
    image: '/destinations/ranchi-city/ranchi-city-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 23.3441,
      lng: 85.3096,
      address: 'Ranchi, Jharkhand, India'
    },
    rating: 4.5,
    reviewCount: 1200,
    featured: true,
    createdAt: new Date('2024-02-03')
  },
  {
    id: '35',
    name: 'Jamshedpur',
    description: 'Famous for Jubilee Park, Dimna Lake, and Tata Steel heritage',
    image: '/destinations/jamshedpur/jamshedpur-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 22.8000,
      lng: 86.2000,
      address: 'Jamshedpur, Jharkhand, India'
    },
    rating: 4.4,
    reviewCount: 980,
    featured: false,
    createdAt: new Date('2024-02-04')
  },
  {
    id: '36',
    name: 'Dhanbad City',
    description: 'Popular for Maithon Dam, Topchanchi Lake, and mining tours',
    image: '/destinations/dhanbad-city/dhanbad-city-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 23.7833,
      lng: 86.8167,
      address: 'Dhanbad, Jharkhand, India'
    },
    rating: 4.2,
    reviewCount: 650,
    featured: false,
    createdAt: new Date('2024-02-05')
  },
  {
    id: '37',
    name: 'Hazaribagh Town',
    description: 'Known for its national park, scenic hills, and local markets',
    image: '/destinations/hazaribagh-town/hazaribagh-town-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 23.9833,
      lng: 85.4000,
      address: 'Hazaribagh, Jharkhand, India'
    },
    rating: 4.3,
    reviewCount: 520,
    featured: false,
    createdAt: new Date('2024-02-06')
  },
  {
    id: '38',
    name: 'Giridih Town',
    description: 'Famous for Parasnath Hills and surrounding forests',
    image: '/destinations/giridih-town/giridih-town-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 24.1833,
      lng: 86.3167,
      address: 'Giridih, Jharkhand, India'
    },
    rating: 4.1,
    reviewCount: 480,
    featured: false,
    createdAt: new Date('2024-02-07')
  },
  {
    id: '39',
    name: 'Deoghar Town',
    description: 'Famous for Baidyanath Dham, temples, and sweets like peda',
    image: '/destinations/deoghar-town/deoghar-town-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 24.4833,
      lng: 86.7000,
      address: 'Deoghar, Jharkhand, India'
    },
    rating: 4.6,
    reviewCount: 890,
    featured: false,
    createdAt: new Date('2024-02-08')
  },
  {
    id: '40',
    name: 'Chaibasa',
    description: 'Known for tribal culture and natural surroundings',
    image: '/destinations/chaibasa/chaibasa-main-attraction.jpg',
    category: 'city',
    location: {
      lat: 22.5833,
      lng: 85.8167,
      address: 'West Singhbhum, Jharkhand, India'
    },
    rating: 4.0,
    reviewCount: 420,
    featured: false,
    createdAt: new Date('2024-02-09')
  },
  {
    id: '41',
    name: 'Palamu Fort',
    description: 'A historic fort inside Betla National Park',
    image: '/destinations/palamu-fort/palamu-fort-main-attraction.jpg',
    category: 'heritage',
    location: {
      lat: 24.0000,
      lng: 84.3333,
      address: 'Daltonganj, Jharkhand, India'
    },
    rating: 4.3,
    reviewCount: 350,
    featured: false,
    createdAt: new Date('2024-02-10')
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
    title: 'Rajasthan Royal Heritage - 7 Days',
    description: 'Discover the magnificent palaces, forts, and rich cultural heritage of Rajasthan',
    images: ['/tours/rajasthan-1.jpg', '/tours/rajasthan-2.jpg', '/tours/rajasthan-3.jpg'],
    destination: sampleDestinations[2], // Rajasthan Heritage
    duration: 7,
    price: 45000,
    originalPrice: 52000,
    maxGroupSize: 15,
    minGroupSize: 4,
    inclusions: [
      'Luxury heritage hotel accommodation',
      'All meals (breakfast, lunch, dinner)',
      'Professional tour guide',
      'Transportation between cities',
      'Entry fees to all monuments',
      'Cultural folk show',
      'Traditional Rajasthani dinner'
    ],
    exclusions: [
      'Alcoholic beverages',
      'Personal expenses',
      'Travel insurance',
      'Tips for guides'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Jaipur - The Pink City',
        description: 'Welcome to the royal state of Rajasthan. Check-in to your heritage hotel and enjoy an evening welcome ceremony.',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome ceremony', 'Evening at leisure'],
        meals: ['dinner'],
        accommodation: 'Heritage Hotel'
      },
      {
        day: 2,
        title: 'Jaipur City Tour',
        description: 'Explore the architectural marvels of Jaipur including the iconic Amber Fort.',
        activities: ['Amber Fort with Elephant ride', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Heritage Hotel'
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur - The Blue City',
        description: 'Drive to Jodhpur and explore the magnificent Mehrangarh Fort.',
        activities: ['Drive to Jodhpur (6-7 hours)', 'Mehrangarh Fort', 'Umaid Bhawan Palace', 'Local market visit'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Heritage Hotel'
      },
      {
        day: 4,
        title: 'Jodhpur to Jaisalmer - The Golden City',
        description: 'Continue to Jaisalmer, known for its golden sandstone architecture.',
        activities: ['Drive to Jaisalmer (5-6 hours)', 'Jaisalmer Fort', 'Patwon Ki Haveli', 'Evening at leisure'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Heritage Hotel'
      },
      {
        day: 5,
        title: 'Jaisalmer Sightseeing',
        description: 'Explore the desert city with its ancient havelis and sand dunes.',
        activities: ['Sam Sand Dunes with Camel Safari', 'Desert Cultural Program', 'Nathmal Ji Ki Haveli', 'Jain Temples'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Heritage Hotel'
      },
      {
        day: 6,
        title: 'Jaisalmer to Udaipur - The City of Lakes',
        description: 'Drive to the romantic city of Udaipur, known for its beautiful lakes and palaces.',
        activities: ['Drive to Udaipur (8-9 hours)', 'City Palace', 'Lake Pichola boat ride', 'Evening aarti ceremony'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Lake Palace Hotel'
      },
      {
        day: 7,
        title: 'Udaipur City Tour & Departure',
        description: 'Enjoy a final day in the City of Lakes before departure.',
        activities: ['Saheliyon Ki Bari', 'Jagdish Temple', 'Shopping for local handicrafts', 'Check-out', 'Airport drop'],
        meals: ['breakfast', 'lunch']
      }
    ],
    availability: [
      new Date('2024-11-15'),
      new Date('2024-12-01'),
      new Date('2024-12-20'),
      new Date('2025-01-10'),
      new Date('2025-01-30')
    ],
    rating: 4.8,
    reviewCount: 320,
    featured: true,
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    title: 'Taj Mahal & Agra Heritage - 3 Days',
    description: 'Witness the eternal symbol of love and explore Mughal heritage',
    images: ['/tours/agra-1.jpg', '/tours/agra-2.jpg'],
    destination: sampleDestinations[6], // Agra Heritage
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
    destination: sampleDestinations[8], // Andaman Islands
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
    destination: sampleDestinations[9], // Jaipur Pink City
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
  },
  {
    id: '7',
    title: 'Jharkhand Waterfall Adventure - 5 Days',
    description: 'Explore the majestic waterfalls of Jharkhand including Hundru, Dassam, and Jonha Falls with local guides',
    images: ['/tours/jharkhand-1.jpg', '/tours/jharkhand-2.jpg', '/tours/jharkhand-3.jpg'],
    destination: sampleDestinations[16], // Hundru Falls
    duration: 5,
    price: 22000,
    originalPrice: 25000,
    maxGroupSize: 15,
    minGroupSize: 4,
    inclusions: [
      'Accommodation for 4 nights',
      'All meals',
      'Local guide services',
      'Transportation between waterfalls',
      'Entry fees to all attractions'
    ],
    exclusions: [
      'Personal expenses',
      'Travel insurance',
      'Tips for guides'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ranchi',
        description: 'Arrive in Ranchi and check into hotel. Evening city tour and local dinner',
        activities: ['Airport pickup', 'Hotel check-in', 'City tour', 'Local dinner'],
        meals: ['dinner']
      },
      {
        day: 2,
        title: 'Hundru Falls & Panch Gagh Falls',
        description: 'Visit the majestic Hundru Falls and Panch Gagh Falls with picnic lunch',
        activities: ['Hundru Falls visit', 'Panch Gagh Falls', 'Photography', 'Picnic lunch'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 3,
        title: 'Dassam Falls & Jonha Falls',
        description: 'Explore the famous Dassam Falls and scenic Jonha Falls',
        activities: ['Dassam Falls tour', 'Jonha Falls visit', 'Local tribal interaction', 'Cultural program'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 4,
        title: 'Tagore Hill & Local Sightseeing',
        description: 'Visit Tagore Hill and explore local markets and cultural sites',
        activities: ['Tagore Hill visit', 'Local market tour', 'Handicraft shopping', 'Cultural museum'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Final morning at leisure, check-out and departure',
        activities: ['Leisure time', 'Shopping', 'Check-out', 'Airport drop'],
        meals: ['breakfast']
      }
    ],
    availability: [
      new Date('2024-11-15'),
      new Date('2024-12-10'),
      new Date('2025-01-20')
    ],
    rating: 4.8,
    reviewCount: 187,
    featured: true,
    createdAt: new Date('2024-01-07')
  },
  {
    id: '8',
    title: 'Jharkhand Wildlife Safari - 4 Days',
    description: 'Experience the rich wildlife of Jharkhand in Betla and Hazaribagh National Parks',
    images: ['/tours/jharkhand-wildlife-1.jpg', '/tours/jharkhand-wildlife-2.jpg'],
    destination: sampleDestinations[24], // Betla National Park (was 25)
    duration: 4,
    price: 18000,
    maxGroupSize: 12,
    minGroupSize: 4,
    inclusions: [
      'Hotel accommodation',
      'All meals',
      'Safari jeep charges',
      'Park entry fees',
      'Expert wildlife guide'
    ],
    exclusions: [
      'Personal expenses',
      'Camera fees',
      'Optional excursions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ranchi and Transfer to Betla',
        description: 'Arrive in Ranchi, transfer to Betla National Park',
        activities: ['Airport pickup', 'Scenic drive to Betla', 'Check-in at resort'],
        meals: ['dinner'],
        accommodation: 'Jungle Resort'
      },
      {
        day: 2,
        title: 'Betla National Park Safari',
        description: 'Full day wildlife safari in Betla National Park',
        activities: ['Morning jeep safari', 'Elephant safari', 'Nature walk', 'Bird watching'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Jungle Resort'
      },
      {
        day: 3,
        title: 'Hazaribagh National Park',
        description: 'Drive to Hazaribagh and explore the national park',
        activities: ['Drive to Hazaribagh', 'Afternoon safari', 'Visit local tribal village'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Hazaribagh Resort'
      },
      {
        day: 4,
        title: 'Dalma Wildlife Sanctuary & Departure',
        description: 'Morning visit to Dalma Sanctuary and departure',
        activities: ['Dalma Sanctuary visit', 'Check-out', 'Drive to Ranchi', 'Airport drop'],
        meals: ['breakfast', 'lunch']
      }
    ],
    availability: [
      new Date('2024-11-20'),
      new Date('2024-12-15'),
      new Date('2025-01-25')
    ],
    rating: 4.7,
    reviewCount: 142,
    featured: true,
    createdAt: new Date('2024-01-08')
  },
  {
    id: '9',
    title: 'Jharkhand Pilgrimage Tour - 6 Days',
    description: 'Visit the holiest pilgrimage sites of Jharkhand including Baidyanath Dham and Parasnath Hill',
    images: ['/tours/jharkhand-pilgrimage-1.jpg', '/tours/jharkhand-pilgrimage-2.jpg'],
    destination: sampleDestinations[27], // Parasnath Hill (was 28)
    duration: 6,
    price: 25000,
    originalPrice: 28000,
    maxGroupSize: 20,
    minGroupSize: 6,
    inclusions: [
      'Hotel accommodation for 5 nights',
      'All meals (vegetarian)',
      'Transportation between cities',
      'Temple entry fees',
      'Local guide services'
    ],
    exclusions: [
      'Personal expenses',
      'Donations at temples',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ranchi',
        description: 'Arrive in Ranchi and visit Pahari Mandir for evening aarti',
        activities: ['Airport pickup', 'Check-in at hotel', 'Visit Pahari Mandir', 'Evening aarti'],
        meals: ['dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 2,
        title: 'Ranchi Local Sightseeing',
        description: 'Visit local temples and waterfalls in Ranchi',
        activities: ['Dassam Falls', 'Jagannath Temple', 'Sun Temple', 'Local market'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 3,
        title: 'Drive to Deoghar & Baidyanath Dham',
        description: 'Drive to Deoghar and visit the holy Baidyanath Dham',
        activities: ['Drive to Deoghar (6-7 hours)', 'Check-in at hotel', 'Evening visit to Baidyanath Temple'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Deoghar Hotel'
      },
      {
        day: 4,
        title: 'Baidyanath Dham Darshan',
        description: 'Full day darshan of Baidyanath Dham and surrounding temples',
        activities: ['Morning rituals', 'Temple darshan', 'Visit Baba Bhandari Temple', 'Local sightseeing'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Deoghar Hotel'
      },
      {
        day: 5,
        title: 'Drive to Giridih & Parasnath Hill',
        description: 'Drive to Giridih and trek to Parasnath Hill',
        activities: ['Drive to Giridih', 'Check-in at hotel', 'Evening trek to Parasnath Hill base'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Giridih Hotel'
      },
      {
        day: 6,
        title: 'Parasnath Hill Trek & Departure',
        description: 'Early morning trek to Parasnath Hill and departure',
        activities: ['Early morning trek to temple', 'Darshan at Parasnath Temple', 'Drive to Ranchi', 'Airport drop'],
        meals: ['breakfast', 'lunch']
      }
    ],
    availability: [
      new Date('2024-11-10'),
      new Date('2024-12-05'),
      new Date('2025-01-15')
    ],
    rating: 4.9,
    reviewCount: 210,
    featured: true,
    createdAt: new Date('2024-01-09')
  },
  {
    id: '10',
    title: 'Jharkhand Cultural & City Tour - 5 Days',
    description: 'Explore the cultural heritage and major cities of Jharkhand',
    images: ['/tours/jharkhand-cultural-1.jpg', '/tours/jharkhand-cultural-2.jpg'],
    destination: sampleDestinations[32], // Ranchi City (was 33)
    duration: 5,
    price: 20000,
    maxGroupSize: 15,
    minGroupSize: 5,
    inclusions: [
      'Hotel accommodation for 4 nights',
      'All meals',
      'Transportation between cities',
      'Local guide services',
      'Entry fees to attractions'
    ],
    exclusions: [
      'Personal expenses',
      'Shopping',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ranchi',
        description: 'Arrive in Ranchi and explore the city',
        activities: ['Airport pickup', 'Check-in at hotel', 'City tour', 'Visit Ranchi Hill', 'Evening at local market'],
        meals: ['dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 2,
        title: 'Ranchi Waterfalls & Temples',
        description: 'Visit famous waterfalls and temples around Ranchi',
        activities: ['Hundru Falls', 'Dassam Falls', 'Jonha Falls', 'Pahari Mandir', 'Jagannath Temple'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Ranchi Hotel'
      },
      {
        day: 3,
        title: 'Drive to Jamshedpur',
        description: 'Drive to Jamshedpur, the steel city of India',
        activities: ['Drive to Jamshedpur', 'Visit Tata Steel Plant', 'Dimna Lake', 'Jubilee Park'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Jamshedpur Hotel'
      },
      {
        day: 4,
        title: 'Jamshedpur & Drive to Dhanbad',
        description: 'Explore Jamshedpur and drive to Dhanbad',
        activities: ['Tata Museum', 'Local market shopping', 'Drive to Dhanbad', 'Evening at Topchanchi Lake'],
        meals: ['breakfast', 'lunch', 'dinner'],
        accommodation: 'Dhanbad Hotel'
      },
      {
        day: 5,
        title: 'Dhanbad Local Sightseeing & Departure',
        description: 'Visit local attractions and departure',
        activities: ['Maithon Dam', 'Local coal mine visit', 'Check-out', 'Drive to airport', 'Departure'],
        meals: ['breakfast', 'lunch']
      }
    ],
    availability: [
      new Date('2024-11-05'),
      new Date('2024-12-01'),
      new Date('2025-01-10')
    ],
    rating: 4.6,
    reviewCount: 175,
    featured: true,
    createdAt: new Date('2024-01-10')
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
  },
  {
    id: '7',
    name: 'Rajesh Kumar',
    avatar: '/avatars/rajesh.jpg',
    rating: 5,
    text: 'The Jharkhand waterfall tour was absolutely breathtaking! The local guides were knowledgeable and the community support aspect made the trip even more meaningful.',
    tour: 'Jharkhand Waterfall Adventure',
    location: 'Patna, Bihar'
  },
  {
    id: '8',
    name: 'Priya Sharma',
    avatar: '/avatars/priya2.jpg',
    rating: 5,
    text: 'The pilgrimage tour to Baidyanath Dham and Parasnath Hill was spiritually fulfilling. The arrangements were excellent and the local vendors provided authentic experiences.',
    tour: 'Jharkhand Pilgrimage Tour',
    location: 'Delhi, India'
  }
]