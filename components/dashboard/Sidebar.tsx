'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  BarChart3,
  Briefcase,
  GraduationCap,
  Building2,
  Target,
  Swords,
  Users,
  ShoppingBag,
  Trophy,
  Globe,
  Home,
  Car,
  Warehouse,
  TrendingUp,
  Dumbbell,
  Hospital,
  Pill,
  Shirt,
  Plane,
  MapPin,
  UserPlus,
  MessageSquare,
  Mail,
  Shield,
  Zap,
  BookOpen,
  Hammer,
  Factory,
  DollarSign,
  Package,
  Store,
  ChevronDown,
  ChevronRight,
  Search,
  Pin,
  Clock,
  Command,
  Sparkles,
  Bell,
  Flame,
  Star,
  X,
  Maximize2,
  Minimize2,
  Heart,
  TrendingUp as TrendUp,
  Activity,
  ClipboardCheck,
  UserCog,
  Wallet,
  Zap as Lightning
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { useCharacterStore } from '@/lib/character-store'

interface NavItem {
  icon: any
  label: string
  href: string
  badge?: string
  locked?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

export function Sidebar() {
  const pathname = usePathname()
  const { character } = useCharacterStore()
  const [expandedSections, setExpandedSections] = useState<string[]>(['MAIN'])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [pinnedItems, setPinnedItems] = useState<string[]>(['/dashboard/crimes', '/dashboard/gym'])
  const [recentPages, setRecentPages] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  // Track recent pages
  useEffect(() => {
    if (pathname && !recentPages.includes(pathname)) {
      setRecentPages(prev => [pathname, ...prev.filter(p => p !== pathname)].slice(0, 5))
    }
  }, [pathname])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(prev => !prev)
      }
      // Ctrl/Cmd + / for search
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        setShowSearch(prev => !prev)
      }
      // Escape to close overlays
      if (e.key === 'Escape') {
        setShowCommandPalette(false)
        setShowSearch(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const togglePin = (href: string) => {
    setPinnedItems(prev =>
      prev.includes(href)
        ? prev.filter(h => h !== href)
        : [...prev, href]
    )
  }

  const isPinned = (href: string) => pinnedItems.includes(href)

  const sections: NavSection[] = [
    {
      title: 'MAIN',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: User, label: 'Profile', href: '/dashboard/profile' },
        { icon: BarChart3, label: 'Stats', href: '/dashboard/stats' },
        { icon: Mail, label: 'Messages', href: '/dashboard/messages', badge: '0' },
        { icon: BookOpen, label: 'Events', href: '/dashboard/events' },
      ]
    },
    {
      title: 'CITY',
      items: [
        { icon: MapPin, label: 'City', href: '/dashboard/city' },
        { icon: Home, label: 'Home', href: '/dashboard/home' },
        { icon: Store, label: 'Shops', href: '/dashboard/shops' },
        { icon: Hospital, label: 'Hospital', href: '/dashboard/hospital' },
        { icon: Dumbbell, label: 'Gym', href: '/dashboard/gym' },
        { icon: Pill, label: 'Pharmacy', href: '/dashboard/pharmacy' },
      ]
    },
    {
      title: 'CAREER',
      items: [
        { icon: Briefcase, label: 'Career Center', href: '/dashboard/career' },
        { icon: GraduationCap, label: 'Education', href: '/dashboard/education' },
        { icon: Building2, label: 'Properties', href: '/dashboard/properties' },
        { icon: Factory, label: 'Businesses', href: '/dashboard/businesses' },
        { icon: TrendingUp, label: 'Stocks', href: '/dashboard/stocks' },
        { icon: DollarSign, label: 'Bank', href: '/dashboard/bank' },
      ]
    },
    {
      title: 'CRIMINAL',
      items: [
        { icon: Target, label: 'Crimes', href: '/dashboard/crimes' },
        { icon: Swords, label: 'Combat', href: '/dashboard/combat' },
        { icon: Zap, label: 'Organized Crime', href: '/dashboard/organized-crime' },
        { icon: Shield, label: 'Bounties', href: '/dashboard/bounties' },
        { icon: Warehouse, label: 'Heists', href: '/dashboard/heists' },
      ]
    },
    {
      title: 'ITEMS',
      items: [
        { icon: Package, label: 'Inventory', href: '/dashboard/inventory' },
        { icon: Shirt, label: 'Wardrobe', href: '/dashboard/wardrobe' },
        { icon: Car, label: 'Garage', href: '/dashboard/garage' },
        { icon: Hammer, label: 'Weapons', href: '/dashboard/weapons' },
      ]
    },
    {
      title: 'WORLD',
      items: [
        { icon: Car, label: 'Travel', href: '/dashboard/travel' },
        { icon: Plane, label: 'Airport', href: '/dashboard/airport' },
        { icon: Users, label: 'Gang', href: '/dashboard/gang' },
        { icon: UserPlus, label: 'Faction', href: '/dashboard/faction' },
        { icon: MessageSquare, label: 'Forums', href: '/dashboard/forums' },
      ]
    },
    {
      title: 'MARKET',
      items: [
        { icon: ShoppingBag, label: 'Market', href: '/dashboard/market' },
        { icon: TrendingUp, label: 'Trade', href: '/dashboard/trade' },
        { icon: Trophy, label: 'Auction', href: '/dashboard/auction' },
      ]
    },
    {
      title: 'SOCIAL',
      items: [
        { icon: Trophy, label: 'Leaderboard', href: '/dashboard/leaderboard' },
        { icon: Users, label: 'Players', href: '/dashboard/players' },
        { icon: Shield, label: 'Achievements', href: '/dashboard/achievements' },
      ]
    }
  ]

  // Filter items based on search
  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  // Get pinned items details
  const allItems = sections.flatMap(s => s.items)
  const pinnedItemsDetails = pinnedItems
    .map(href => allItems.find(item => item.href === href))
    .filter(Boolean) as NavItem[]

  // Get recent pages details
  const recentPagesDetails = recentPages
    .map(href => allItems.find(item => item.href === href))
    .filter(Boolean) as NavItem[]

  return (
    <>
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-[#0f0f0f] border-r border-[#333] h-screen overflow-hidden flex flex-col transition-all duration-300`}>
        {/* Logo & Quick Actions */}
        <div className="p-4 border-b border-[#333] flex-shrink-0">
          {!isCollapsed ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className="text-lg font-bold text-[#fff] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f0ad4e]" />
                    LIFE EMPIRE
                  </h1>
                  <p className="text-[9px] text-[#888] uppercase tracking-wider mt-0.5">
                    Build Your Empire
                  </p>
                </div>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
                  title="Collapse sidebar"
                >
                  <Minimize2 className="w-3 h-3 text-[#888]" />
                </button>
              </div>

              {/* Quick Stats Preview */}
              {character && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-center">
                    <Heart className="w-3 h-3 text-[#d9534f] mx-auto mb-0.5" />
                    <p className="text-[9px] font-bold text-[#d9534f]">{character.health}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-center">
                    <Zap className="w-3 h-3 text-[#f0ad4e] mx-auto mb-0.5" />
                    <p className="text-[9px] font-bold text-[#f0ad4e]">{character.energy}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] p-1.5 rounded text-center">
                    <TrendUp className="w-3 h-3 text-[#5bc0de] mx-auto mb-0.5" />
                    <p className="text-[9px] font-bold text-[#5bc0de]">{character.reputation}</p>
                  </div>
                </div>
              )}

              {/* Quick Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex-1 p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] rounded transition-all flex items-center justify-center gap-1.5 group"
                  title="Search (Ctrl+/)"
                >
                  <Search className="w-3 h-3 text-[#888] group-hover:text-[#5cb85c]" />
                  <span className="text-[9px] text-[#888] group-hover:text-[#5cb85c]">Search</span>
                </button>
                <button
                  onClick={() => setShowCommandPalette(!showCommandPalette)}
                  className="flex-1 p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] rounded transition-all flex items-center justify-center gap-1.5 group"
                  title="Commands (Ctrl+K)"
                >
                  <Command className="w-3 h-3 text-[#888] group-hover:text-[#5cb85c]" />
                  <span className="text-[9px] text-[#888] group-hover:text-[#5cb85c]">Cmd</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded transition-colors"
                title="Expand sidebar"
              >
                <Maximize2 className="w-4 h-4 text-[#888]" />
              </button>
              <Sparkles className="w-5 h-5 text-[#f0ad4e]" />
            </div>
          )}
        </div>

        {/* Search Bar */}
        {showSearch && !isCollapsed && (
          <div className="px-4 py-3 border-b border-[#333] bg-[#1a1a1a] flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2 top-2 w-3 h-3 text-[#888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search navigation..."
                className="w-full bg-[#0f0f0f] border border-[#333] rounded px-7 py-1.5 text-xs text-[#fff] focus:border-[#5cb85c] focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2"
                >
                  <X className="w-3 h-3 text-[#888] hover:text-[#fff]" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          {!isCollapsed ? (
            <>
              {/* Pinned Items */}
              {pinnedItemsDetails.length > 0 && !searchQuery && (
                <div className="mb-3 px-3">
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <Pin className="w-3 h-3 text-[#f0ad4e]" />
                    <span className="text-[9px] font-bold text-[#f0ad4e] uppercase tracking-wider">
                      Pinned
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {pinnedItemsDetails.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-2 px-3 py-2 rounded transition-all relative group ${
                            isActive
                              ? 'bg-[#5cb85c]/10 text-[#5cb85c] border-l-2 border-[#5cb85c]'
                              : 'text-[#d0d0d0] hover:bg-[#1a1a1a] hover:text-[#fff]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="text-xs flex-1">{item.label}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              togglePin(item.href)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Pin className="w-3 h-3 text-[#f0ad4e] fill-[#f0ad4e]" />
                          </button>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Recent Pages */}
              {recentPagesDetails.length > 0 && !searchQuery && (
                <div className="mb-3 px-3">
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <Clock className="w-3 h-3 text-[#5bc0de]" />
                    <span className="text-[9px] font-bold text-[#5bc0de] uppercase tracking-wider">
                      Recent
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {recentPagesDetails.slice(0, 3).map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all text-xs ${
                            isActive
                              ? 'bg-[#5cb85c]/10 text-[#5cb85c]'
                              : 'text-[#888] hover:bg-[#1a1a1a] hover:text-[#fff]'
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span className="flex-1 truncate">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Sections */}
              <div className="px-3">
                {(searchQuery ? filteredSections : sections).map((section) => {
                  const isExpanded = expandedSections.includes(section.title)

                  return (
                    <div key={section.title} className="mb-2">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors rounded"
                      >
                        <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider">
                          {section.title}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-3 h-3 text-[#888]" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-[#888]" />
                        )}
                      </button>

                      {/* Section Items */}
                      {isExpanded && (
                        <div className="mt-0.5 space-y-0.5">
                          {section.items.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                              <div key={item.href} className="relative group">
                                <Link
                                  href={item.href}
                                  className={`flex items-center gap-2 px-3 py-2 transition-all rounded ${
                                    isActive
                                      ? 'bg-[#5cb85c]/10 text-[#5cb85c] border-l-2 border-[#5cb85c]'
                                      : 'text-[#d0d0d0] hover:bg-[#1a1a1a] hover:text-[#fff] border-l-2 border-transparent'
                                  } ${item.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                  <span className="text-xs flex-1">{item.label}</span>
                                  {item.badge && (
                                    <span className="text-[9px] bg-[#d9534f] text-white px-1.5 py-0.5 rounded-full font-bold">
                                      {item.badge}
                                    </span>
                                  )}
                                  {item.locked && <span className="text-[10px]">🔒</span>}
                                </Link>
                                {!item.locked && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      togglePin(item.href)
                                    }}
                                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title={isPinned(item.href) ? 'Unpin' : 'Pin to top'}
                                  >
                                    <Pin className={`w-3 h-3 ${isPinned(item.href) ? 'text-[#f0ad4e] fill-[#f0ad4e]' : 'text-[#666]'}`} />
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            // Collapsed View - Just Icons
            <div className="space-y-1 px-2">
              {allItems.slice(0, 10).map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-center p-2.5 rounded transition-all ${
                      isActive
                        ? 'bg-[#5cb85c]/10 text-[#5cb85c]'
                        : 'text-[#888] hover:bg-[#1a1a1a] hover:text-[#fff]'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer - Keyboard Shortcuts Info */}
        {!isCollapsed && (
          <div className="p-3 border-t border-[#333] flex-shrink-0">
            <div className="bg-[#1a1a1a] border border-[#333] rounded p-2">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3 h-3 text-[#5cb85c]" />
                <span className="text-[9px] font-bold text-[#888] uppercase">Shortcuts</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-[#666]">Search</span>
                  <kbd className="px-1.5 py-0.5 bg-[#0f0f0f] border border-[#333] rounded text-[#888]">
                    Ctrl+/
                  </kbd>
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-[#666]">Commands</span>
                  <kbd className="px-1.5 py-0.5 bg-[#0f0f0f] border border-[#333] rounded text-[#888]">
                    Ctrl+K
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Command Palette Modal */}
      {showCommandPalette && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-[#0f0f0f] border border-[#333] rounded-lg w-full max-w-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="p-4 border-b border-[#333]">
              <div className="flex items-center gap-3">
                <Command className="w-5 h-5 text-[#5cb85c]" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-[#fff] text-sm focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setShowCommandPalette(false)}
                  className="p-1 hover:bg-[#1a1a1a] rounded"
                >
                  <X className="w-4 h-4 text-[#888]" />
                </button>
              </div>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              <div className="mb-3">
                <p className="text-[9px] text-[#888] uppercase px-3 py-1.5 font-bold">Quick Actions</p>
                <div className="space-y-1">
                  <Link
                    href="/dashboard/crimes"
                    onClick={() => setShowCommandPalette(false)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors"
                  >
                    <Target className="w-4 h-4 text-[#d9534f]" />
                    <span className="text-sm text-[#fff]">Commit Crime</span>
                    <span className="text-xs text-[#666] ml-auto">Ctrl+C</span>
                  </Link>
                  <Link
                    href="/dashboard/gym"
                    onClick={() => setShowCommandPalette(false)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors"
                  >
                    <Dumbbell className="w-4 h-4 text-[#f0ad4e]" />
                    <span className="text-sm text-[#fff]">Train at Gym</span>
                    <span className="text-xs text-[#666] ml-auto">Ctrl+G</span>
                  </Link>
                  <Link
                    href="/dashboard/travel"
                    onClick={() => setShowCommandPalette(false)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors"
                  >
                    <Globe className="w-4 h-4 text-[#5bc0de]" />
                    <span className="text-sm text-[#fff]">Travel</span>
                    <span className="text-xs text-[#666] ml-auto">Ctrl+T</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}