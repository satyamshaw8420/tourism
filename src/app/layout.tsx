import { Inter } from 'next/font/google'
import ChatProvider from '@/components/chat/chat-provider'
import Script from 'next/script'
import './globals.css'
import ConvexClientProvider from '@/components/convex-client-provider'
import ClerkProviderWrapper from '@/components/clerk-provider-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Travel-Ease - Modern Group Travel & Finance Platform',
  description: 'Create groups, pool funds, and explore the world with friends. AI-powered travel recommendations with seamless financing options.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProviderWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
          <ChatProvider />
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}