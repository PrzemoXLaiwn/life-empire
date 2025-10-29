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
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

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
  const [expandedSections, setExpandedSections] = useState<string[]>(['MAIN'])

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

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
        { icon: Briefcase, label: 'Jobs', href: '/dashboard/jobs' },
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
    { icon: Car, label: 'Travel', href: '/dashboard/travel' },        // Miasta w kraju
    { icon: Plane, label: 'Airport', href: '/dashboard/airport' },    // Inne kraje
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

  return (
    <div className="w-64 bg-[#0f0f0f] border-r border-[#333] h-screen overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-[#333]">
        <h1 className="text-xl font-bold text-[#fff] uppercase tracking-wider">
          LIFE SYNDICATE
        </h1>
        <p className="text-[10px] text-[#888] uppercase tracking-wider mt-1">
          Build Your Empire
        </p>
      </div>

      {/* Navigation */}
      <div className="py-4">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.title)
          
          return (
            <div key={section.title} className="mb-2">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-6 py-2 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors"
              >
                <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider">
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
                <div className="mt-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-6 py-2.5 transition-colors relative
                          ${isActive 
                            ? 'bg-[#1a1a1a] text-[#5cb85c] border-l-2 border-[#5cb85c]' 
                            : 'text-[#d0d0d0] hover:bg-[#1a1a1a] hover:text-[#fff] border-l-2 border-transparent'
                          }
                          ${item.locked ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] bg-[#d9534f] text-white px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                        {item.locked && (
                          <span className="text-[10px] text-[#666]">🔒</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}