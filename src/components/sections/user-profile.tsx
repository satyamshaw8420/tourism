'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Please sign in</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <CardTitle>{user.fullName}</CardTitle>
              <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Welcome to TravelTogether! Your profile is active.</p>
        </CardContent>
      </Card>
    </div>
  )
}