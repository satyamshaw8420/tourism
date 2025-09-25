import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import ChatProvider from '@/components/chat/chat-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TravelTogether - Modern Group Travel & Finance Platform',
  description: 'Create groups, pool funds, and explore the world with friends. AI-powered travel recommendations with seamless financing options.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
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
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ChatProvider />
        </body>
      </html>
    </ClerkProvider>
  )
}