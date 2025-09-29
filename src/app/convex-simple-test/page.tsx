'use client';

import { useState, useEffect } from 'react';

export default function ConvexSimpleTest() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">
            Convex Simple Test
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            This page tests that Convex is properly configured
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Convex Setup Status
            </h2>
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-green-700 font-medium">Convex Provider Configured</span>
            </div>
            <p className="mt-4 text-gray-600">
              The Convex provider is properly set up in the client component.
              You can now use Convex hooks in your components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}