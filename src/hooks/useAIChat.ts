'use client'

import { useState, useCallback, useRef } from 'react'
import { AIQuery, AIResponse, TourPackage } from '@/types'
import { sampleDestinations, sampleTourPackages } from '@/data/sample-data'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  message: string
  timestamp: Date
  recommendations?: TourPackage[]
  quickActions?: string[]
  metadata?: {
    intent?: string
    budget?: number
    duration?: number
    groupSize?: number
    preferences?: string[]
  }
}

interface UseChatOptions {
  onNewMessage?: (message: ChatMessage) => void
  onRecommendation?: (tours: TourPackage[]) => void
}

// Advanced AI response logic with context awareness
const getAdvancedAIResponse = (
  query: string, 
  chatHistory: ChatMessage[] = [],
  userContext?: any
): AIResponse => {
  const lowerQuery = query.toLowerCase()
  const lastAIMessage = chatHistory.filter(m => m.type === 'ai').pop()
  
  // Extract intent and entities from query
  const intent = detectIntent(lowerQuery)
  const entities = extractEntities(lowerQuery)
  
  switch (intent) {
    case 'budget_inquiry':
      return handleBudgetInquiry(entities, lowerQuery)
    
    case 'destination_preference':
      return handleDestinationPreference(entities, lowerQuery)
    
    case 'group_planning':
      return handleGroupPlanning(entities, lowerQuery)
    
    case 'duration_specific':
      return handleDurationQuery(entities, lowerQuery)
    
    case 'activity_preference':
      return handleActivityPreference(entities, lowerQuery)
    
    case 'comparison_request':
      return handleComparison(entities, lowerQuery)
    
    case 'booking_assistance':
      return handleBookingAssistance(entities, lowerQuery)
    
    default:
      return handleGeneralInquiry(lowerQuery)
  }
}

// Intent detection
const detectIntent = (query: string): string => {
  if (query.includes('budget') || query.includes('cost') || query.includes('price') || query.includes('cheap') || query.includes('expensive')) {
    return 'budget_inquiry'
  }
  if (query.includes('beach') || query.includes('mountain') || query.includes('heritage') || query.includes('city')) {
    return 'destination_preference'
  }
  if (query.includes('group') || query.includes('friends') || query.includes('family') || query.includes('people')) {
    return 'group_planning'
  }
  if (query.includes('day') || query.includes('week') || query.includes('weekend') || query.includes('duration')) {
    return 'duration_specific'
  }
  if (query.includes('adventure') || query.includes('relax') || query.includes('culture') || query.includes('food')) {
    return 'activity_preference'
  }
  if (query.includes('compare') || query.includes('vs') || query.includes('better') || query.includes('difference')) {
    return 'comparison_request'
  }
  if (query.includes('book') || query.includes('reserve') || query.includes('confirm') || query.includes('payment')) {
    return 'booking_assistance'
  }
  return 'general_inquiry'
}

// Entity extraction
const extractEntities = (query: string) => {
  const entities: any = {}
  
  // Budget extraction
  const budgetMatch = query.match(/(\d+k?|\d+,\d+|\d+\s*thousand|\d+\s*lakh)/i)
  if (budgetMatch) {
    let budget = budgetMatch[1].toLowerCase()
    if (budget.includes('k')) {
      entities.budget = parseInt(budget) * 1000
    } else if (budget.includes('thousand')) {
      entities.budget = parseInt(budget) * 1000
    } else if (budget.includes('lakh')) {
      entities.budget = parseInt(budget) * 100000
    } else {
      entities.budget = parseInt(budget.replace(/,/g, ''))
    }
  }
  
  // Duration extraction
  const durationMatch = query.match(/(\d+)\s*(day|week|month)/i)
  if (durationMatch) {
    const num = parseInt(durationMatch[1])
    const unit = durationMatch[2].toLowerCase()
    entities.duration = unit === 'week' ? num * 7 : unit === 'month' ? num * 30 : num
  }
  
  // Group size extraction
  const groupMatch = query.match(/(\d+)\s*(people|person|friends|members)/i)
  if (groupMatch) {
    entities.groupSize = parseInt(groupMatch[1])
  }
  
  return entities
}

// Intent handlers
const handleBudgetInquiry = (entities: any, query: string): AIResponse => {
  const budget = entities.budget || (query.includes('cheap') ? 20000 : 50000)
  const tours = sampleTourPackages.filter(tour => tour.price <= budget).slice(0, 4)
  
  return {
    message: `💰 I found some excellent options within your budget of ₹${budget.toLocaleString()}! These tours offer great value for money:`,
    recommendations: tours
  }
}

const handleDestinationPreference = (entities: any, query: string): AIResponse => {
  let category = 'beach'
  let message = '🏖️ Beach destinations are perfect for relaxation!'
  
  if (query.includes('mountain') || query.includes('hill')) {
    category = 'mountain'
    message = '🏔️ Mountain adventures await you!'
  } else if (query.includes('heritage') || query.includes('culture') || query.includes('historical')) {
    category = 'heritage'
    message = '🏛️ Discover India\'s rich cultural heritage!'
  } else if (query.includes('city') || query.includes('urban')) {
    category = 'city'
    message = '🏙️ Urban experiences and city life!'
  }
  
  const tours = sampleTourPackages.filter(tour => 
    tour.destination.category === category
  )
  
  return {
    message: `${message} Here are some amazing ${category} destinations:`,
    recommendations: tours
  }
}

const handleGroupPlanning = (entities: any, query: string): AIResponse => {
  const groupSize = entities.groupSize || 8
  const tours = sampleTourPackages.filter(tour => 
    tour.maxGroupSize >= groupSize && tour.minGroupSize <= groupSize
  ).slice(0, 3)
  
  return {
    message: `👥 Perfect for group travel! I found tours that accommodate ${groupSize} people with great group activities and shared experiences:`,
    recommendations: tours
  }
}

const handleDurationQuery = (entities: any, query: string): AIResponse => {
  const duration = entities.duration || (query.includes('weekend') ? 3 : 7)
  const tours = sampleTourPackages.filter(tour => 
    Math.abs(tour.duration - duration) <= 2
  ).slice(0, 3)
  
  return {
    message: `⏰ Found some great ${duration}-day trips that fit your timeline perfectly:`,
    recommendations: tours
  }
}

const handleActivityPreference = (entities: any, query: string): AIResponse => {
  let message = ''
  let tours: TourPackage[] = []
  
  if (query.includes('adventure') || query.includes('exciting')) {
    message = '🎯 Adventure seekers, these tours are for you!'
    tours = sampleTourPackages.filter(tour => 
      tour.title.toLowerCase().includes('adventure') || 
      tour.destination.category === 'mountain'
    )
  } else if (query.includes('relax') || query.includes('peaceful')) {
    message = '🧘 Perfect for relaxation and peace of mind:'
    tours = sampleTourPackages.filter(tour => 
      tour.destination.category === 'beach' || 
      tour.title.toLowerCase().includes('backwater')
    )
  } else if (query.includes('culture') || query.includes('traditional')) {
    message = '🎨 Immerse yourself in rich cultural experiences:'
    tours = sampleTourPackages.filter(tour => 
      tour.destination.category === 'heritage'
    )
  }
  
  return {
    message,
    recommendations: tours.slice(0, 3)
  }
}

const handleComparison = (entities: any, query: string): AIResponse => {
  // Simple comparison logic - can be enhanced
  const tours = sampleTourPackages.slice(0, 2)
  return {
    message: '⚖️ Here\'s a comparison of similar tours to help you decide:',
    recommendations: tours
  }
}

const handleBookingAssistance = (entities: any, query: string): AIResponse => {
  return {
    message: '📋 I\'d be happy to help you with booking! Here are some popular tours you might be interested in. Click "View Details" on any tour to proceed with booking:',
    recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
  }
}

const handleGeneralInquiry = (query: string): AIResponse => {
  return {
    message: '🌟 I\'m here to help you plan the perfect trip! Here are some popular destinations to get you started:',
    recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
  }
}

export const useAIChat = (options: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [context, setContext] = useState<any>({})
  const messageIdCounter = useRef(1)

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: (messageIdCounter.current++).toString(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    options.onNewMessage?.(newMessage)
    
    if (newMessage.recommendations) {
      options.onRecommendation?.(newMessage.recommendations)
    }
    
    return newMessage
  }, [options])

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage = addMessage({
      type: 'user',
      message: message.trim()
    })

    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = getAdvancedAIResponse(message, messages, context)
      
      addMessage({
        type: 'ai',
        message: aiResponse.message,
        recommendations: aiResponse.recommendations,
        quickActions: aiResponse.recommendations ? [] : [
          "Show me budget options",
          "Beach destinations",
          "Mountain adventures", 
          "Heritage tours",
          "Group travel deals"
        ]
      })
      
      setIsLoading(false)
    }, 800 + Math.random() * 1200)
  }, [messages, context, addMessage])

  const clearChat = useCallback(() => {
    setMessages([])
    messageIdCounter.current = 1
  }, [])

  const updateContext = useCallback((newContext: any) => {
    setContext(prev => ({ ...prev, ...newContext }))
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    addMessage,
    context,
    updateContext
  }
}