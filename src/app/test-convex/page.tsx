'use client';

import { useState } from 'react';
import { useCreateUser, useGetUserByEmail } from '@/hooks/useUsers';

export default function TestConvexPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const createUser = useCreateUser();
  const user = useGetUserByEmail(email);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ email, name, password });
      setMessage('User created successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Convex Test Page</h1>
      
      <div className="max-w-md mx-auto">
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create User
          </button>
        </form>
        
        {message && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">{message}</p>
          </div>
        )}
        
        {user && (
          <div className="mt-8 p-4 bg-green-50 rounded-md">
            <h2 className="text-lg font-medium text-green-800">User Found:</h2>
            <p className="text-green-700">Name: {user.name}</p>
            <p className="text-green-700">Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}