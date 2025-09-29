'use client'

import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join TravelTogether
          </h1>
          <p className="mt-2 text-gray-600">
            Start your adventure with group travel and smart financing
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  )
}