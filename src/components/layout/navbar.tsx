'use client'

import Link from 'next/link'
import { useUser, UserButton, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Globe, Menu, X, Settings, LogOut, BarChart3, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Get user display name with fallback
  const getUserDisplayName = () => {
    if (!user) return ''
    return user.firstName || user.username || user.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'
  }

  // Check if current path is active
  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return pathname.startsWith('/dashboard')
    }
    return pathname === path
  }

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/dashboard/scraper/new', label: 'New Job', icon: Plus },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  // Public navigation items
  const publicNavItems = [
    { href: '/#features', label: 'Features' },
  ]

  return (
    <nav className="w-full bg-transparent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Globe className="h-8 w-8 text-indigo-400" />
            <span className="text-xl font-bold text-white tracking-tight">WebScraper Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Public nav items */}
            {!isSignedIn && publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-slate-300 hover:text-white transition-colors font-medium ${isActivePath(item.href) ? 'text-indigo-400' : ''
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Authenticated nav items */}
            {isSignedIn && (
              <>
                {authenticatedNavItems.slice(0, 2).map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-1 text-slate-300 hover:text-white transition-colors font-medium ${isActivePath(item.href) ? 'text-indigo-400' : ''
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoaded ? (
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20 bg-white/10" />
                <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
              </div>
            ) : isSignedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-300 font-medium">
                  Welcome, {getUserDisplayName()}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full hover:bg-white/10">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "h-8 w-8",
                          }
                        }}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-900 border-white/10 text-slate-300" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal text-white">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                        <p className="text-xs leading-none text-slate-500">
                          {user?.emailAddresses[0]?.emailAddress}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                      <Link href="/dashboard">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-400 focus:text-red-400 hover:bg-white/5 focus:bg-white/5"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="text-slate-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Public navigation */}
              {!isSignedIn && publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-slate-300 hover:text-white transition-colors font-medium py-2 ${isActivePath(item.href) ? 'text-indigo-400' : ''
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Authenticated navigation */}
              {isSignedIn && (
                <>
                  <div className="border-t border-white/5 pt-4">
                    {authenticatedNavItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center space-x-2 text-slate-300 hover:text-white transition-colors font-medium py-2 ${isActivePath(item.href) ? 'text-indigo-400' : ''
                            }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Auth section */}
              <div className="pt-4 border-t border-white/5">
                {!isLoaded ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full bg-white/10" />
                    <Skeleton className="h-10 w-full bg-white/10" />
                  </div>
                ) : isSignedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 py-2">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "h-8 w-8",
                          }
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {getUserDisplayName()}
                        </span>
                        <span className="text-xs text-slate-500">
                          {user?.emailAddresses[0]?.emailAddress}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-400 hover:text-red-300 border-white/10 hover:bg-white/5 bg-transparent"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        signOut()
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full text-slate-300 hover:text-white hover:bg-white/5" asChild>
                      <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                      <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}