'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Plane, User, Wallet } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const navItems = [
  { name: 'Destinations', href: '/destinations' },
  { name: 'Tours', href: '/tours' },
  { name: 'Groups', href: '/groups' },
  { name: 'Accessible Travel', href: '/accessible-travel' },
  { name: 'AI Assistant', href: '/ai-assistant' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Show skeleton UI while loading to prevent hydration mismatch */}
      {(!isLoaded || !isClient) ? (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 bg-transparent"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo Skeleton */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Desktop Navigation Skeleton */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>

              {/* Auth Buttons Skeleton */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Mobile Menu Button Skeleton */}
              <div className="md:hidden w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </motion.nav>
      ) : (
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/20'
              : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Travel-Ease
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
                    >
                      <span className="flex items-center space-x-1">
                        <span>{item.name}</span>
                        {item.name === 'AI Assistant' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            New
                          </span>
                        )}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {!isSignedIn ? (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button variant="gradient" className="shadow-lg hover:shadow-xl">
                        <Wallet className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </SignUpButton>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      Welcome, {user?.firstName || 'Traveler'}!
                    </span>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8"
                        }
                      }}
                      afterSignOutUrl="/"
                    />
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-4 py-6 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    {!isSignedIn ? (
                      <>
                        <SignInButton mode="modal">
                          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                            <User className="w-4 h-4 mr-2" />
                            Sign In
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button variant="gradient" className="w-full shadow-lg hover:shadow-xl">
                            <Wallet className="w-4 h-4 mr-2" />
                            Get Started
                          </Button>
                        </SignUpButton>
                      </>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          {user?.firstName || 'Traveler'}
                        </span>
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-8 h-8"
                            }
                          }}
                          afterSignOutUrl="/"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </>
  )
}