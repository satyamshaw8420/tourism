'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, MapPin, 
  Calendar, Users, DollarSign, Plane, Heart, Star, 
  Loader2, Minimize2, Maximize2 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAIChat } from '@/hooks/useAIChat'
import Link from 'next/link'

interface AIChatWidgetProps {
  isOpen: boolean
  onToggle: () => void
}

const quickActionPrompts = [
  "Show me budget-friendly tours",
  "I want beach destinations",
  "Find mountain adventures",
  "Heritage and cultural tours",
  "Best group travel options",
  "Weekend getaway ideas"
]

export default function AIChatWidget({ isOpen, onToggle }: AIChatWidgetProps) {
  const { messages, isLoading, sendMessage, addMessage } = useAIChat()
  const [inputValue, setInputValue] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [hasInitialized, setHasInitialized] = useState(false)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasInitialized) {
      addMessage({
        type: 'ai',
        message: "Hello! 👋 I'm your AI travel assistant. I can help you find perfect destinations, plan itineraries, and suggest tours based on your preferences. What kind of travel experience are you looking for?",
        quickActions: quickActionPrompts
      })
      setHasInitialized(true)
    }
  }, [isOpen, messages.length, hasInitialized, addMessage])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return
    await sendMessage(message.trim())
    setInputValue('')
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className={`bg-white shadow-2xl border-0 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Travel Assistant</h3>
              {!isMinimized && <p className="text-xs text-blue-100">Powered by TravelTogether AI</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/10 p-1"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-white/10 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white ml-2' 
                          : 'bg-purple-100 text-purple-600 mr-2'
                      }`}>
                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      
                      <div className="space-y-2">
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border shadow-sm'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                        </div>
                        
                        {/* Tour recommendations */}
                        {message.recommendations && (
                          <div className="space-y-2">
                            {message.recommendations.map((tour) => (
                              <Card key={tour.id} className="p-3 bg-white border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-gray-900 text-sm">{tour.title}</h4>
                                  <div className="text-right">
                                    <div className="text-green-600 font-bold text-sm">₹{tour.price.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">per person</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                  <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {tour.destination.name}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {tour.duration} days
                                  </span>
                                  <span className="flex items-center">
                                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                                    {tour.rating}
                                  </span>
                                </div>
                                
                                <Link href={`/tours/${tour.id}`}>
                                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                                    View Details
                                  </Button>
                                </Link>
                              </Card>
                            ))}
                          </div>
                        )}
                        
                        {/* Quick actions */}
                        {message.quickActions && message.quickActions.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {message.quickActions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickAction(action)}
                                className="text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-600"
                              >
                                {action}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border shadow-sm p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about destinations, budgets, or travel plans..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  )
}