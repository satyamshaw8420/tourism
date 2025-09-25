'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AIChatWidget from './ai-chat-widget'

export default function ChatProvider() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              onClick={toggleChat}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="relative">
                <MessageCircle className="w-6 h-6 text-white" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                />
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>
            </Button>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
            >
              Ask AI for travel recommendations
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        <AIChatWidget isOpen={isChatOpen} onToggle={toggleChat} />
      </AnimatePresence>
    </>
  )
}