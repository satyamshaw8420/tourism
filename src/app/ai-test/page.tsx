'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAIChat } from '@/hooks/useAIChat';

export default function AITestPage() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useAIChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI Chat Test</h1>
      
      <Card className="p-6 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about travel destinations..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Send'}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`p-4 ${message.type === 'user' ? 'bg-blue-50 ml-10' : 'bg-gray-50 mr-10'}`}>
            <div className="font-semibold mb-2">
              {message.type === 'user' ? 'You' : 'AI Assistant'}
            </div>
            <p>{message.message}</p>
            
            {message.recommendations && (
              <div className="mt-3">
                <h3 className="font-medium mb-2">Recommended Tours:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {message.recommendations.map((tour) => (
                    <div key={tour.id} className="border p-3 rounded">
                      <h4 className="font-medium">{tour.title}</h4>
                      <p className="text-sm text-gray-600">{tour.destination.name}</p>
                      <p className="text-sm">₹{tour.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}