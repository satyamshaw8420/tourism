'use client'

import { motion } from 'framer-motion'
import { Bot, Sparkles, MessageCircle, Zap, Brain, Globe, Users, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Navbar from '@/components/sections/navbar'
import { useState } from 'react'
import AIChatWidget from '@/components/chat/ai-chat-widget'

const features = [
  {
    icon: Brain,
    title: "Smart Recommendations",
    description: "Get personalized travel suggestions based on your preferences, budget, and travel history"
  },
  {
    icon: MapPin,
    title: "Destination Insights",
    description: "Learn about destinations, best times to visit, local culture, and must-see attractions"
  },
  {
    icon: Users,
    title: "Group Planning",
    description: "AI helps coordinate group trips, manage budgets, and find activities everyone will enjoy"
  },
  {
    icon: Zap,
    title: "Instant Answers",
    description: "Get immediate responses to travel questions, booking assistance, and real-time help"
  }
]

const sampleQuestions = [
  "Show me budget-friendly beach destinations",
  "Plan a 7-day mountain adventure for 4 people",
  "What are the best heritage sites in Rajasthan?",
  "Find family-friendly tours under ₹20,000",
  "Compare Kerala vs Goa for a romantic trip",
  "Help me plan a weekend getaway from Delhi"
]

export default function AIAssistantPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400 rounded-full opacity-10 animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-10 animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Advanced AI Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Personal
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                AI Travel Assistant
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Get instant, personalized travel recommendations, plan perfect itineraries, 
              and discover hidden gems with our intelligent AI assistant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="xl"
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Start Chatting Now
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg"
              >
                <Bot className="w-6 h-6 mr-2" />
                See How It Works
              </Button>
            </div>

            {/* AI Demo Conversation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Bot className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold text-gray-900">AI Assistant Demo</span>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs">
                    "I want a budget beach vacation for 2 people"
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                    🏖️ Perfect! I found amazing beach destinations under ₹25,000. 
                    Goa and Kerala offer great value with beautiful beaches and activities!
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Our AI Special?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI assistant understands travel like a human expert, but with the speed and 
              knowledge of advanced artificial intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Questions Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Try These Sample Questions
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Not sure what to ask? Here are some examples to get you started with our AI assistant.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {sampleQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                  onClick={() => setIsChatOpen(true)}
                >
                  <p className="text-white font-medium">{question}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="xl"
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              Ask Your Own Question
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let our AI assistant help you discover amazing destinations, 
              plan perfect itineraries, and make your travel dreams come true.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <Bot className="w-6 h-6 mr-2" />
                Chat with AI Now
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg"
              >
                <Globe className="w-6 h-6 mr-2" />
                Explore Destinations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <AIChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  )
}