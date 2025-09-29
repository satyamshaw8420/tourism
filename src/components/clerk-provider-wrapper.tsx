'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

export default function ClerkProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  // Check if we have valid Clerk keys
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const hasValidClerkKey = publishableKey && !publishableKey.includes('your_clerk');

  // If we don't have valid keys, just render children without ClerkProvider
  if (!hasValidClerkKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#3b82f6',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
          colorBackground: '#ffffff',
          colorInputBackground: '#f9fafb',
          colorInputText: '#1f2937',
          borderRadius: '0.5rem',
        },
        elements: {
          formButtonPrimary: 
            'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
          card: 'shadow-xl border-0',
          headerTitle: 'text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
          dividerLine: 'bg-gray-200',
          dividerText: 'text-gray-500',
          formFieldLabel: 'text-gray-700 font-medium',
          formFieldInput: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}