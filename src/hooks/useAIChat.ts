'use client';

import { useState, useCallback, useRef } from 'react';
import { AIResponse, TourPackage } from '@/types';
import { sampleTourPackages, sampleDestinations } from '@/data/sample-data';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  recommendations?: TourPackage[];
  quickActions?: string[];
  metadata?: {
    intent?: string;
    budget?: number;
    duration?: number;
    groupSize?: number;
    preferences?: string[];
  };
}

interface UseChatOptions {
  onNewMessage?: (message: ChatMessage) => void;
  onRecommendation?: (tours: TourPackage[]) => void;
}

interface UserContext {
  preferences?: string[];
  pastBookings?: string[];
  budgetRange?: { min: number; max: number };
}

interface EntityData {
  budget?: number;
  duration?: number;
  groupSize?: number;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
});

// Create a context string with all destinations and tours information
const createDestinationContext = () => {
  let context = "You are an AI travel assistant for TravelTogether, a travel planning platform. You have access to the following destinations and tour packages:\n\n";
  
  context += "Destinations:\n";
  sampleDestinations.forEach(dest => {
    context += `- ${dest.name} (${dest.category}): ${dest.description}. Rating: ${dest.rating}/5 based on ${dest.reviewCount} reviews. ${dest.featured ? 'Featured destination.' : ''}\n`;
  });
  
  context += "\nTour Packages:\n";
  sampleTourPackages.forEach(tour => {
    context += `- ${tour.title} in ${tour.destination.name}: ${tour.description}. Duration: ${tour.duration} days. Price: ₹${tour.price}${tour.originalPrice ? ` (Original: ₹${tour.originalPrice})` : ''}. Group size: ${tour.minGroupSize}-${tour.maxGroupSize} people. Rating: ${tour.rating}/5 based on ${tour.reviewCount} reviews. ${tour.featured ? 'Featured tour.' : ''}\n`;
    if (tour.inclusions && tour.inclusions.length > 0) {
      context += `  Inclusions: ${tour.inclusions.join(', ')}\n`;
    }
  });
  
  context += "\nWhen recommending tours, always provide specific tour names and destinations from the list above. If a user asks about a destination or tour not in this list, politely inform them that it's not currently available but suggest similar options. When users ask about specific destinations, provide detailed information about them including their category, description, rating, and any available tours.\n\n";
  context += "Key instructions:\n";
  context += "1. Always check the provided list of destinations and tours before responding\n";
  context += "2. If a user asks about a specific destination, provide detailed information about it\n";
  context += "3. If a user asks about tours in a specific destination, list all available tours for that destination\n";
  context += "4. Always be accurate and only provide information from the given data\n";
  context += "5. If users ask about destinations not in the list, politely say they're not available\n";
  
  return context;
};

// Get AI response from OpenAI API
const getAIResponseFromOpenAI = async (query: string, chatHistory: ChatMessage[] = []): Promise<AIResponse> => {
  try {
    // Prepare the conversation history for the API
    const messages: ChatCompletionMessageParam[] = [
      { role: "system" as const, content: createDestinationContext() },
      ...chatHistory.map(msg => ({
        role: msg.type === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.message
      })),
      { role: "user" as const, content: query }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content || "I'd be happy to help you plan your trip!";

    // Extract tour recommendations if mentioned in the response
    const recommendedTours: TourPackage[] = [];
    sampleTourPackages.forEach(tour => {
      if (responseText.toLowerCase().includes(tour.title.toLowerCase()) || 
          responseText.toLowerCase().includes(tour.destination.name.toLowerCase())) {
        recommendedTours.push(tour);
      }
    });

    return {
      message: responseText,
      recommendations: recommendedTours.length > 0 ? recommendedTours : undefined
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    // Fallback to the existing logic if API fails
    return getAdvancedAIResponse(query, chatHistory);
  }
};

// Advanced AI response logic with context awareness (fallback)
const getAdvancedAIResponse = (
  query: string, 
  chatHistory: ChatMessage[] = []
): AIResponse => {
  const lowerQuery = query.toLowerCase();
  
  // Extract intent and entities from query
  const intent = detectIntent(lowerQuery);
  const entities = extractEntities(lowerQuery);
  
  switch (intent) {
    case 'budget_inquiry':
      return handleBudgetInquiry(entities, lowerQuery);
    
    case 'destination_preference':
      return handleDestinationPreference(entities, lowerQuery);
    
    case 'group_planning':
      return handleGroupPlanning(entities, lowerQuery);
    
    case 'duration_specific':
      return handleDurationQuery(entities, lowerQuery);
    
    case 'activity_preference':
      return handleActivityPreference(entities, lowerQuery);
    
    case 'comparison_request':
      return handleComparison();
    
    case 'booking_assistance':
      return handleBookingAssistance();
    
    default:
      return handleGeneralInquiry();
  }
}

// Intent detection
const detectIntent = (query: string): string => {
  if (query.includes('budget') || query.includes('cost') || query.includes('price') || query.includes('cheap') || query.includes('expensive')) {
    return 'budget_inquiry';
  }
  if (query.includes('beach') || query.includes('mountain') || query.includes('heritage') || query.includes('city')) {
    return 'destination_preference';
  }
  if (query.includes('group') || query.includes('friends') || query.includes('family') || query.includes('people')) {
    return 'group_planning';
  }
  if (query.includes('day') || query.includes('week') || query.includes('weekend') || query.includes('duration')) {
    return 'duration_specific';
  }
  if (query.includes('adventure') || query.includes('relax') || query.includes('culture') || query.includes('food')) {
    return 'activity_preference';
  }
  if (query.includes('compare') || query.includes('vs') || query.includes('better') || query.includes('difference')) {
    return 'comparison_request';
  }
  if (query.includes('book') || query.includes('reserve') || query.includes('confirm') || query.includes('payment')) {
    return 'booking_assistance';
  }
  return 'general_inquiry';
}

// Entity extraction
const extractEntities = (query: string): EntityData => {
  const entities: EntityData = {};
  
  // Budget extraction
  const budgetMatch = query.match(/(\d+k?|\d+,\d+|\d+\s*thousand|\d+\s*lakh)/i);
  if (budgetMatch) {
    const budget = budgetMatch[1].toLowerCase();
    if (budget.includes('k')) {
      entities.budget = parseInt(budget) * 1000;
    } else if (budget.includes('thousand')) {
      entities.budget = parseInt(budget) * 1000;
    } else if (budget.includes('lakh')) {
      entities.budget = parseInt(budget) * 100000;
    } else {
      entities.budget = parseInt(budget.replace(/,/g, ''));
    }
  }
  
  // Duration extraction
  const durationMatch = query.match(/(\d+)\s*(day|week|month)/i);
  if (durationMatch) {
    const num = parseInt(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();
    entities.duration = unit === 'week' ? num * 7 : unit === 'month' ? num * 30 : num;
  }
  
  // Group size extraction
  const groupMatch = query.match(/(\d+)\s*(people|person|friends|members)/i);
  if (groupMatch) {
    entities.groupSize = parseInt(groupMatch[1]);
  }
  
  return entities;
}

// Intent handlers
const handleBudgetInquiry = (entities: EntityData, query: string): AIResponse => {
  const budget = entities.budget || (query.includes('cheap') ? 20000 : 50000);
  const tours = sampleTourPackages.filter(tour => tour.price <= budget).slice(0, 4);
  
  // If no tours found within budget, fallback to featured tours
  if (tours.length === 0) {
    return {
      message: `💰 I couldn't find any tours within your budget of ₹${budget.toLocaleString()}, but here are some popular options:`,
      recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
    };
  }
  
  return {
    message: `💰 I found some excellent options within your budget of ₹${budget.toLocaleString()}! These tours offer great value for money:`,
    recommendations: tours
  };
}

const handleDestinationPreference = (entities: EntityData, query: string): AIResponse => {
  let category = 'beach';
  let message = '🏖️ Beach destinations are perfect for relaxation!';
  
  if (query.includes('mountain') || query.includes('hill')) {
    category = 'mountain';
    message = '🏔️ Mountain adventures await you!';
  } else if (query.includes('heritage') || query.includes('culture') || query.includes('historical')) {
    category = 'heritage';
    message = '🏛️ Discover India\'s rich cultural heritage!';
  } else if (query.includes('city') || query.includes('urban')) {
    category = 'city';
    message = '🏙️ Urban experiences and city life!';
  } else if (query.includes('adventure')) {
    category = 'adventure';
    message = '🎯 Adventure and thrill-seeking experiences!';
  }
  
  const tours = sampleTourPackages.filter(tour => 
    tour.destination.category === category
  );
  
  // If no tours found for the category, fallback to featured tours
  if (tours.length === 0) {
    return {
      message: `${message} Here are some popular destinations:`,
      recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
    };
  }
  
  return {
    message: `${message} Here are some amazing ${category} destinations:`,
    recommendations: tours.slice(0, 3)
  };
}

const handleGroupPlanning = (entities: EntityData, query: string): AIResponse => {
  const groupSize = entities.groupSize || 8;
  const tours = sampleTourPackages.filter(tour => 
    tour.maxGroupSize >= groupSize && tour.minGroupSize <= groupSize
  ).slice(0, 3);
  
  // If no tours found for the group size, fallback to featured tours
  if (tours.length === 0) {
    return {
      message: `👥 I couldn't find specific tours for a group of ${groupSize} people, but here are some popular options:`,
      recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
    };
  }
  
  return {
    message: `👥 Perfect for group travel! I found tours that accommodate ${groupSize} people with great group activities and shared experiences:`,
    recommendations: tours
  };
}

const handleDurationQuery = (entities: EntityData, query: string): AIResponse => {
  const duration = entities.duration || (query.includes('weekend') ? 3 : 7);
  const tours = sampleTourPackages.filter(tour => 
    Math.abs(tour.duration - duration) <= 2
  ).slice(0, 3);
  
  // If no tours found for the duration, fallback to featured tours
  if (tours.length === 0) {
    return {
      message: `⏰ I couldn't find specific tours for a ${duration}-day trip, but here are some popular options:`,
      recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
    };
  }
  
  return {
    message: `⏰ Found some great ${duration}-day trips that fit your timeline perfectly:`,
    recommendations: tours
  };
}

const handleActivityPreference = (entities: EntityData, query: string): AIResponse => {
  let message = '';
  let tours: TourPackage[] = [];
  
  if (query.includes('adventure') || query.includes('exciting')) {
    message = '🎯 Adventure seekers, these tours are for you!';
    tours = sampleTourPackages.filter(tour => 
      tour.title.toLowerCase().includes('adventure') || 
      tour.destination.category === 'mountain'
    );
  } else if (query.includes('relax') || query.includes('peaceful')) {
    message = '🧘 Perfect for relaxation and peace of mind:';
    tours = sampleTourPackages.filter(tour => 
      tour.destination.category === 'beach' || 
      tour.title.toLowerCase().includes('backwater')
    );
  } else if (query.includes('culture') || query.includes('traditional')) {
    message = '🎨 Immerse yourself in rich cultural experiences:';
    tours = sampleTourPackages.filter(tour => 
      tour.destination.category === 'heritage'
    );
  } else {
    // Default case when no specific activity preference is detected
    message = '🌟 Here are some popular tours based on your interests:';
    tours = sampleTourPackages.filter(tour => tour.featured).slice(0, 3);
  }
  
  return {
    message,
    recommendations: tours.slice(0, 3)
  };
}

const handleComparison = (): AIResponse => {
  // Simple comparison logic - can be enhanced
  const tours = sampleTourPackages.slice(0, 2);
  return {
    message: '⚖️ Here\'s a comparison of similar tours to help you decide:',
    recommendations: tours
  };
}

const handleBookingAssistance = (): AIResponse => {
  return {
    message: '📋 I\'d be happy to help you with booking! Here are some popular tours you might be interested in. Click "View Details" on any tour to proceed with booking:',
    recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
  };
}

const handleGeneralInquiry = (): AIResponse => {
  return {
    message: '🌟 I\'m here to help you plan the perfect trip! Here are some popular destinations to get you started:',
    recommendations: sampleTourPackages.filter(tour => tour.featured).slice(0, 3)
  };
}

export const useAIChat = (options: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<UserContext>({});
  const messageIdCounter = useRef(1);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: (messageIdCounter.current++).toString(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    options.onNewMessage?.(newMessage);
    
    if (newMessage.recommendations) {
      options.onRecommendation?.(newMessage.recommendations);
    }
    
    return newMessage;
  }, [options]);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = addMessage({
      type: 'user',
      message: message.trim()
    });

    setIsLoading(true);

    // Get response from OpenAI API
    getAIResponseFromOpenAI(message, [...messages, userMessage])
      .then(aiResponse => {
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
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error in sendMessage:", error);
        setIsLoading(false);
      });
  }, [messages, addMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    messageIdCounter.current = 1;
  }, []);

  const updateContext = useCallback((newContext: Partial<UserContext>) => {
    setContext((prev) => ({ ...prev, ...newContext }));
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    addMessage,
    context,
    updateContext
  };
};