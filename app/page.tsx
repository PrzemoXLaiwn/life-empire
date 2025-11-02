// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface GlobalStats {
  totalPlayers: number
  onlinePlayers: number
  totalWealth: number
  totalBusinesses: number
  totalGangs: number
}

interface PlayerReview {
  id: string
  username: string
  avatar: string
  level: number
  careerPath: string
  review: string
  createdAt: string
}

export default function LandingPage() {
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [reviews, setReviews] = useState<PlayerReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadLiveData()
    
    // Refresh stats every 30 seconds
    const interval = setInterval(loadLiveData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadLiveData = async () => {
    try {
      const [statsRes, reviewsRes] = await Promise.all([
        fetch('/api/stats/global'),
        fetch('/api/reviews/latest?limit=3')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        if (statsData.success) {
          setStats(statsData.data)
        }
      }

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json()
        if (reviewsData.success) {
          setReviews(reviewsData.data)
        }
      }
    } catch (error) {
      console.error('Failed to load live data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const displayStats = [
    { 
      label: 'Active Players', 
      value: stats?.totalPlayers ? formatNumber(stats.totalPlayers) : '---',
      icon: '👥',
      loading: isLoading
    },
    { 
      label: 'Total Wealth', 
      value: stats?.totalWealth ? `$${formatNumber(stats.totalWealth)}` : '---',
      icon: '💰',
      loading: isLoading
    },
    { 
      label: 'Businesses Owned', 
      value: stats?.totalBusinesses ? formatNumber(stats.totalBusinesses) : '---',
      icon: '🏢',
      loading: isLoading
    },
    { 
      label: 'Active Gangs', 
      value: stats?.totalGangs ? formatNumber(stats.totalGangs) : '---',
      icon: '👊',
      loading: isLoading
    }
  ]

  const lifePaths = [
    {
      icon: '/images/career-legal.png',
      title: 'Legal Career Path',
      description: 'Build a legitimate empire. Become a doctor, lawyer, CEO, or entrepreneur. Pay taxes, invest wisely, and retire rich.',
      highlights: ['20+ Career Options', 'Promotions & Raises', 'Stock Market', 'Real Estate']
    },
    {
      icon: '/images/career-crime.png',
      title: 'Criminal Path',
      description: 'Live on the edge. Commit crimes, form gangs, control territory. High risk, high reward. Avoid jail or worse.',
      highlights: ['Crime System', 'Gang Wars', 'Drug Empire', 'Money Laundering']
    },
    {
      icon: '/images/career-business.png',
      title: 'Business Empire',
      description: 'From lemonade stand to global corporation. Buy, upgrade, and manage businesses. Compete with other players.',
      highlights: ['50+ Business Types', 'Upgrades', 'Employees', 'Franchising']
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d0d0d0]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0f0f0f]/90 border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Life Empire"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                  LIFE EMPIRE
                </h1>
                <p className="text-[9px] sm:text-[10px] text-[#888] uppercase tracking-wider hidden sm:block">
                  Live Your Life, Your Way
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/login">
                <button className="ls-btn text-sm sm:text-base px-3 sm:px-4 py-2">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="ls-btn ls-btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Real Background */}
      <section className="relative border-b border-[#333] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="City background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
        </div>

        {/* Hex Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/pattern-hex.png)',
            backgroundSize: '400px 400px'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Live Online Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#333] rounded-full px-4 py-2 mb-6 sm:mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3b82f6]"></span>
              </span>
              <span className="text-xs sm:text-sm text-[#888]">
                {stats?.onlinePlayers 
                  ? `🔥 ${formatNumber(stats.onlinePlayers)} players online now`
                  : '🔥 Loading...'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-tight leading-tight">
              Live Your Second Life<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]">
                Build Your Empire
              </span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-[#888] mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              A multiplayer life simulation where <span className="text-[#3b82f6] font-semibold">every choice matters</span>. 
              Work legally, commit crimes, or both. Your life, your rules.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-16">
              <Link href="/register">
                <button className="group w-full sm:w-auto ls-btn ls-btn-primary text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 shadow-lg shadow-[#3b82f6]/20 hover:shadow-[#3b82f6]/40 transition-all">
                  <span className="flex items-center gap-2">
                    🚀 START YOUR LIFE
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
              </Link>
              <Link href="/guide">
                <button className="w-full sm:w-auto ls-btn text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4">
                  📖 How to Play
                </button>
              </Link>
            </div>

            {/* Key selling points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-sm text-[#888] bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#333] rounded-lg px-4 py-3">
                <span className="text-2xl">✓</span>
                <span><span className="text-[#3b82f6] font-semibold">100% Free</span> • No Pay-to-Win</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-sm text-[#888] bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#333] rounded-lg px-4 py-3">
                <span className="text-2xl">✓</span>
                <span><span className="text-[#3b82f6] font-semibold">Full Freedom</span> • Choose Your Path</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-sm text-[#888] bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#333] rounded-lg px-4 py-3">
                <span className="text-2xl">✓</span>
                <span><span className="text-[#3b82f6] font-semibold">Multiplayer</span> • Real Players</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="border-b border-[#333] bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {displayStats.map((stat, index) => (
              <div 
                key={index} 
                className="ls-section group hover:border-[#3b82f6] transition-all duration-300 hover:scale-105"
              >
                <div className="ls-section-content text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  {stat.loading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-[#2a2a2a] rounded mb-2"></div>
                      <div className="h-3 bg-[#2a2a2a] rounded w-2/3 mx-auto"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3b82f6] mb-2">
                        {stat.value}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#888] uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life Paths with Real Images */}
      <section className="border-b border-[#333] bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">
              🎯 Choose Your Path
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#888] max-w-2xl mx-auto px-4">
              Complete freedom to live your life how you want. Switch paths anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {lifePaths.map((path, index) => (
              <div key={index} className="ls-section group hover:border-[#3b82f6] transition-all duration-300 hover:scale-105">
                <div className="ls-section-content p-4 sm:p-6">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={path.icon}
                      alt={path.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3">
                    {path.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#888] mb-3 sm:mb-4 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {path.highlights.map((highlight, i) => (
                      <span key={i} className="text-[10px] sm:text-xs bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded hover:border-[#3b82f6] transition-colors">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Reviews - LIVE DATA */}
      <section className="border-b border-[#333] bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">
              💬 Player Stories
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#888] max-w-2xl mx-auto px-4">
              Real players, real success stories
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[1,2,3].map((i) => (
                <div key={i} className="ls-section animate-pulse">
                  <div className="ls-section-content p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-[#2a2a2a] rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-[#2a2a2a] rounded mb-2"></div>
                        <div className="h-3 bg-[#2a2a2a] rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="h-16 bg-[#2a2a2a] rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#888]">No reviews yet. Be the first to share your story!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="ls-section hover:border-[#3b82f6] transition-all duration-300">
                  <div className="ls-section-content p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-full flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                        {review.avatar.startsWith('http') ? (
                          <Image src={review.avatar} alt={review.username} fill className="rounded-full" />
                        ) : (
                          <span>{review.avatar}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-bold text-white">
                          {review.username}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#3b82f6]">
                          Level {review.level} • {review.careerPath}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#888] leading-relaxed italic mb-3">
                      "{review.review}"
                    </p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[#f0ad4e] text-sm">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b border-[#333] bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="ls-section border-2 border-[#3b82f6] shadow-2xl shadow-[#3b82f6]/20">
            <div className="ls-section-content p-8 sm:p-12 lg:p-16">
              <div className="text-5xl sm:text-6xl lg:text-7xl mb-6">
                🌟
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
                Ready to Start<br className="sm:hidden" /> Your New Life?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-[#888] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Join {stats?.totalPlayers ? formatNumber(stats.totalPlayers) : 'thousands of'} players building their empires. 
                Work legally, commit crimes, or both. Your life, your rules.
              </p>
              <Link href="/register">
                <button className="group ls-btn ls-btn-primary text-lg sm:text-xl px-10 sm:px-16 py-4 sm:py-5 shadow-2xl shadow-[#3b82f6]/30 hover:shadow-[#3b82f6]/50 transition-all hover:scale-105">
                  <span className="flex items-center gap-3">
                    🚀 CREATE YOUR LIFE NOW
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </button>
              </Link>
              <p className="mt-6 text-xs sm:text-sm text-[#666]">
                Free forever • No credit card • 30 second signup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - ✅ CLEANED UP */}
      <footer className="bg-[#0a0a0a] border-t border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8">
                  <Image src="/images/logo.png" alt="Life Empire" fill className="object-contain" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  Life Empire
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#888] leading-relaxed">
                The ultimate life simulation multiplayer game. Live your life, your way.
              </p>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-4 uppercase tracking-wider">
                Game
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#888]">
                <li><Link href="/about" className="hover:text-[#3b82f6] transition-colors">About</Link></li>
                <li><Link href="/features" className="hover:text-[#3b82f6] transition-colors">Features</Link></li>
                <li><Link href="/guide" className="hover:text-[#3b82f6] transition-colors">Game Guide</Link></li>
                <li><Link href="/rules" className="hover:text-[#3b82f6] transition-colors">Rules</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-4 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#888]">
                <li><Link href="/help" className="hover:text-[#3b82f6] transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-[#3b82f6] transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[#3b82f6] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#3b82f6] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#333] pt-8 text-center">
            <p className="text-xs sm:text-sm text-[#666] mb-4">
              © 2025 Life Empire. All rights reserved. This is a simulation game for entertainment only.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-[#888]">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                </span>
                Server Online
              </span>
              <span>•</span>
              <span>{stats?.onlinePlayers ? `${formatNumber(stats.onlinePlayers)} Players Online` : 'Loading...'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}