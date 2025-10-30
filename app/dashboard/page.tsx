'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  Trophy,
  Zap,
  Target,
  Globe,
  Briefcase,
  ShoppingBag,
  Shield,
  Swords,
  Home,
  Users,
  Dumbbell
} from 'lucide-react'

export default function DashboardPage() {
  const { character, isLoading } = useCharacterStore()
  const [username, setUsername] = useState('Player')
  const supabase = createClient()

  useEffect(() => {
    loadUsername()
  }, [])

  const loadUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username)
    } else {
      setUsername(user?.email?.split('@')[0] || 'Player')
    }
  }

  if (isLoading || !character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto fade-in">
      {/* Welcome Header */}
      <div className="ls-section">
        <div className="ls-section-content">
          <h1 className="text-3xl font-bold text-[#fff] mb-2">
            Welcome back, {username}! 👋
          </h1>
          <p className="text-sm text-[#888]">
            {character.city 
              ? `You're currently in ${character.city.name}, ${character.city.country}`
              : 'Select a city to begin your journey'
            }
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="ls-section">
        <div className="ls-section-header">
          ⚡ Quick Actions
        </div>
        <div className="ls-section-content">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <Link href="/dashboard/crimes" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-danger transition-all hover:scale-105 text-center rounded">
                <Target className="w-8 h-8 mx-auto mb-2 text-danger group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Crime</div>
              </div>
            </Link>

            <Link href="/dashboard/gym" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-warning transition-all hover:scale-105 text-center rounded">
                <Dumbbell className="w-8 h-8 mx-auto mb-2 text-warning group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Gym</div>
              </div>
            </Link>

            <Link href="/dashboard/jobs" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-success transition-all hover:scale-105 text-center rounded">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-success group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Jobs</div>
              </div>
            </Link>

            <Link href="/dashboard/travel" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-info transition-all hover:scale-105 text-center rounded">
                <Globe className="w-8 h-8 mx-auto mb-2 text-info group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Travel</div>
              </div>
            </Link>

            <Link href="/dashboard/city" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-[#888] transition-all hover:scale-105 text-center rounded">
                <Home className="w-8 h-8 mx-auto mb-2 text-[#888] group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">City</div>
              </div>
            </Link>

            <Link href="/dashboard/market" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-[#f0ad4e] transition-all hover:scale-105 text-center rounded">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Market</div>
              </div>
            </Link>

            <Link href="/dashboard/combat" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-danger transition-all hover:scale-105 text-center rounded">
                <Swords className="w-8 h-8 mx-auto mb-2 text-danger group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Combat</div>
              </div>
            </Link>

            <Link href="/dashboard/gang" className="group">
              <div className="p-4 bg-[#1a1a1a] border border-[#333] hover:border-[#9b59b6] transition-all hover:scale-105 text-center rounded">
                <Shield className="w-8 h-8 mx-auto mb-2 text-[#9b59b6] group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#fff]">Gang</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Players & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="ls-section">
          <div className="ls-section-header">
            <Trophy className="w-4 h-4 inline mr-2" />
            Top Players
          </div>
          <div className="ls-section-content">
            <p className="text-xs text-[#888] text-center py-8">
              🏆 Leaderboard coming soon!
            </p>
            <Link 
              href="/dashboard/leaderboard"
              className="ls-btn ls-btn-primary w-full text-center"
            >
              View Leaderboard
            </Link>
          </div>
        </div>

        <div className="ls-section">
          <div className="ls-section-header">
            <Users className="w-4 h-4 inline mr-2" />
            Online Players
          </div>
          <div className="ls-section-content">
            <p className="text-xs text-[#888] text-center py-8">
              🟢 See who's online!
            </p>
            <Link 
              href="/dashboard/players"
              className="ls-btn ls-btn-secondary w-full text-center"
            >
              Browse Players
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="ls-section">
        <div className="ls-section-header">
          <Zap className="w-4 h-4 inline mr-2" />
          Daily Challenges
        </div>
        <div className="ls-section-content">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-sm text-[#888] mb-4">
              Complete daily missions for exclusive rewards!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded">
              <span className="text-xs text-[#888]">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}