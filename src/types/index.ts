// Database Models
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  kycStatus: 'pending' | 'verified' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[]; // Optional array of additional images
  category: 'beach' | 'mountain' | 'heritage' | 'adventure' | 'city';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating: number;
  reviewCount: number;
  featured?: boolean;
  createdAt: Date;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  images: string[];
  destination: Destination;
  duration: number;
  price: number;
  originalPrice?: number;
  maxGroupSize: number;
  minGroupSize: number;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals?: ('breakfast' | 'lunch' | 'dinner')[];
    accommodation?: string;
  }[];
  availability: Date[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  createdAt: Date;
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
  meals: ('breakfast' | 'lunch' | 'dinner')[]
  accommodation?: string
}

export interface Group {
  id: string
  name: string
  description: string
  creator: User
  members: GroupMember[]
  tour?: TourPackage
  customItinerary?: CustomItinerary
  wallet: GroupWallet
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  maxMembers: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GroupMember {
  id: string
  user: User
  role: 'admin' | 'member'
  contribution: number
  joinedAt: Date
  status: 'pending' | 'accepted' | 'declined'
}

export interface GroupWallet {
  id: string
  balance: number
  targetAmount: number
  transactions: Transaction[]
  emiPlans: EMIPlan[]
  createdAt: Date
}

export interface Transaction {
  id: string
  amount: number
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund'
  description: string
  userId: string
  groupId: string
  status: 'pending' | 'completed' | 'failed'
  paymentMethod: 'upi' | 'card' | 'wallet' | 'emi'
  createdAt: Date
}

export interface EMIPlan {
  id: string
  userId: string
  amount: number
  duration: number // months
  interestRate: number
  monthlyAmount: number
  remainingAmount: number
  status: 'active' | 'completed' | 'defaulted'
  startDate: Date
  endDate: Date
  payments: EMIPayment[]
}

export interface EMIPayment {
  id: string
  amount: number
  dueDate: Date
  paidAt?: Date
  status: 'pending' | 'paid' | 'overdue'
}

export interface Booking {
  id: string
  user: User
  tour: TourPackage
  group?: Group
  travelers: Traveler[]
  totalAmount: number
  paidAmount: number
  paymentStatus: 'pending' | 'partial' | 'completed'
  bookingStatus: 'pending' | 'confirmed' | 'cancelled'
  specialRequests?: string
  createdAt: Date
  travelDate: Date
}

export interface Traveler {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  idType: 'passport' | 'aadhar' | 'license'
  idNumber: string
}

export interface CustomItinerary {
  id: string
  title: string
  days: CustomItineraryDay[]
  totalBudget: number
  createdBy: string
  groupId: string
  status: 'draft' | 'finalized'
  votes: ItineraryVote[]
}

export interface CustomItineraryDay {
  day: number
  date: Date
  location: string
  activities: Activity[]
  accommodation?: Accommodation
  budget: number
}

export interface Activity {
  id: string
  name: string
  type: 'sightseeing' | 'adventure' | 'dining' | 'shopping' | 'transport'
  duration: number // hours
  cost: number
  description: string
  location: string
  timeSlot: string
}

export interface Accommodation {
  name: string
  type: 'hotel' | 'resort' | 'homestay' | 'hostel'
  rating: number
  pricePerNight: number
  location: string
}

export interface ItineraryVote {
  userId: string
  vote: 'approve' | 'reject' | 'suggest_changes'
  comment?: string
  createdAt: Date
}

// AI Recommendation Types
export interface AIQuery {
  message: string
  budget?: number
  duration?: number
  preferences?: string[]
  groupSize?: number
}

export interface AIResponse {
  message: string
  recommendations?: TourPackage[]
  suggestedItinerary?: CustomItinerary
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

export interface BookingForm {
  travelers: Traveler[]
  specialRequests?: string
  paymentMethod: 'full' | 'partial' | 'emi'
  emiDuration?: number
}

export interface GroupForm {
  name: string
  description: string
  maxMembers: number
  isPublic: boolean
  targetBudget: number
}