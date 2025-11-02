'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { LeaderboardPlayer, DailyMission, ActivityItem, DailyRewards } from '@/lib/types'
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
  Dumbbell,
  TrendingUp,
  Activity,
  Star,
  Gift,
  Clock,
  Flame,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Calendar,
  MessageSquare,
  DollarSign,
  Heart,
  AlertCircle,
  ChevronRight,
  Layout,
  Eye,
  Plus,
  Minus,
  GripVertical,
  Crown
} from 'lucide-react'

// Icon mapping for string-based icons
const iconMap: Record<string, any> = {
  Dumbbell,
  Target,
  MessageSquare,
  Activity,
  Star,
  Briefcase,
  Trophy,
  Gift,
  Clock,
  Flame,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Calendar,
  DollarSign,
  Heart,
  AlertCircle,
  ChevronRight,
  Layout,
  Eye,
  Plus,
  Minus,
  GripVertical,
  Crown,
  Zap,
  Globe,
  ShoppingBag,
  Shield,
  Swords,
  Home,
  Users,
  TrendingUp
}

export default function DashboardPage() {
  const { character, isLoading } = useCharacterStore()
  const [username, setUsername] = useState('Player')
  const [showCustomize, setShowCustomize] = useState(false)
  const [visibleWidgets, setVisibleWidgets] = useState({
    stats: true,
    quickActions: true,
    dailyMissions: true,
    activity: true,
    topPlayers: true,
    achievements: true,
    dailyRewards: true,
  })

  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([])
  const [dailyRewards, setDailyRewards] = useState<DailyRewards | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadUsername()
    loadDashboardData()
  }, [])

  const loadUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username)
    } else {
      setUsername(user?.email?.split('@')[0] || 'Player')
    }
  }

  const loadDashboardData = async () => {
    try {
      const [missionsRes, activityRes, leaderboardRes, rewardsRes] = await Promise.all([
        fetch('/api/daily-missions'),
        fetch('/api/activity'),
        fetch('/api/leaderboard'),
        fetch('/api/daily-rewards')
      ])

      if (missionsRes.ok) {
        const data = await missionsRes.json()
        setDailyMissions(data.missions)
      }

      if (activityRes.ok) {
        const data = await activityRes.json()
        setActivities(data.activities)
      }

      if (leaderboardRes.ok) {
        const data = await leaderboardRes.json()
        setLeaderboard(data.leaderboard)
      }

      if (rewardsRes.ok) {
        const data = await rewardsRes.json()
        setDailyRewards(data.rewards)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const toggleWidget = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets(prev => ({ ...prev, [widget]: !prev[widget] }))
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

  const levelProgress = ((character.experience % 100) / 100) * 100 // Simple calculation

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto fade-in">
      {/* Welcome Header with Customize Button */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#fff] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#f0ad4e]" />
            Welcome back, {username}!
          </h1>
          <p className="text-xs text-[#888] mt-1">
            {character.city
              ? `You're currently in ${character.city.name}, ${character.city.country}`
              : 'Select a city to begin your journey'}
          </p>
        </div>
        <button
          onClick={() => setShowCustomize(!showCustomize)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] rounded transition-all"
        >
          <Layout className="w-4 h-4 text-[#888]" />
          <span className="text-xs text-[#888]">Customize Dashboard</span>
        </button>
      </div>

      {/* Customize Panel */}
      {showCustomize && (
        <div className="bg-[#1a1a1a] border border-[#5cb85c] rounded-lg p-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-[#5cb85c]" />
            <h3 className="text-sm font-bold text-[#fff]">Show/Hide Widgets</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {Object.entries(visibleWidgets).map(([key, visible]) => (
              <button
                key={key}
                onClick={() => toggleWidget(key as keyof typeof visibleWidgets)}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
                  visible
                    ? 'bg-[#5cb85c]/10 border border-[#5cb85c] text-[#5cb85c]'
                    : 'bg-[#0f0f0f] border border-[#333] text-[#666]'
                }`}
              >
                {visible ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3 opacity-50" />
                )}
                <span className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards Grid */}
      {visibleWidgets.stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Cash Card */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-lg p-4 hover:border-[#5cb85c] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-[#5cb85c] group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-1 text-[9px] text-[#5cb85c]">
                <ArrowUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#888] uppercase tracking-wider mb-1">Cash</p>
              <p className="text-xl font-bold text-[#fff]">${Number(character.cash).toLocaleString()}</p>
            </div>
          </div>

          {/* Reputation Card */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-lg p-4 hover:border-[#5bc0de] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-[#5bc0de] group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-1 text-[9px] text-[#5bc0de]">
                <ArrowUp className="w-3 h-3" />
                <span>+8%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#888] uppercase tracking-wider mb-1">Reputation</p>
              <p className="text-xl font-bold text-[#fff]">{character.reputation.toLocaleString()}</p>
            </div>
          </div>

          {/* Level Progress Card */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-lg p-4 hover:border-[#f0ad4e] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <Star className="w-8 h-8 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
              <div className="flex items-center gap-1 px-2 py-1 bg-[#f0ad4e]/10 border border-[#f0ad4e] rounded-full">
                <Crown className="w-3 h-3 text-[#f0ad4e]" />
                <span className="text-[10px] font-bold text-[#f0ad4e]">{character.level}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#888] uppercase tracking-wider mb-1">Level Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f0ad4e] to-[#ec971f] transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#f0ad4e]">{Math.floor(levelProgress)}%</span>
              </div>
            </div>
          </div>

          {/* Strength Card */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-lg p-4 hover:border-[#d9534f] transition-all group">
            <div className="flex items-center justify-between mb-3">
              <Dumbbell className="w-8 h-8 text-[#d9534f] group-hover:scale-110 transition-transform" />
              <Activity className="w-5 h-5 text-[#666]" />
            </div>
            <div>
              <p className="text-[10px] text-[#888] uppercase tracking-wider mb-1">Strength</p>
              <p className="text-xl font-bold text-[#fff]">{character.strength}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {visibleWidgets.quickActions && (
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[#333] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#f0ad4e]" />
              <h2 className="text-sm font-bold text-[#fff]">Quick Actions</h2>
            </div>
            <span className="text-[9px] text-[#666] uppercase">Press hotkeys to navigate</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <Link href="/dashboard/crimes" className="group relative">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#d9534f] transition-all hover:scale-105 text-center rounded-lg">
                  <Target className="w-8 h-8 mx-auto mb-2 text-[#d9534f] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Crime</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">C</kbd>
                </div>
              </Link>

              <Link href="/dashboard/gym" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#f0ad4e] transition-all hover:scale-105 text-center rounded-lg">
                  <Dumbbell className="w-8 h-8 mx-auto mb-2 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Gym</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">G</kbd>
                </div>
              </Link>

              <Link href="/dashboard/jobs" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#5cb85c] transition-all hover:scale-105 text-center rounded-lg">
                  <Briefcase className="w-8 h-8 mx-auto mb-2 text-[#5cb85c] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Jobs</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">J</kbd>
                </div>
              </Link>

              <Link href="/dashboard/travel" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#5bc0de] transition-all hover:scale-105 text-center rounded-lg">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-[#5bc0de] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Travel</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">T</kbd>
                </div>
              </Link>

              <Link href="/dashboard/city" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#888] transition-all hover:scale-105 text-center rounded-lg">
                  <Home className="w-8 h-8 mx-auto mb-2 text-[#888] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">City</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">H</kbd>
                </div>
              </Link>

              <Link href="/dashboard/market" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#f0ad4e] transition-all hover:scale-105 text-center rounded-lg">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Market</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">M</kbd>
                </div>
              </Link>

              <Link href="/dashboard/combat" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#d9534f] transition-all hover:scale-105 text-center rounded-lg">
                  <Swords className="w-8 h-8 mx-auto mb-2 text-[#d9534f] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Combat</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">F</kbd>
                </div>
              </Link>

              <Link href="/dashboard/gang" className="group">
                <div className="p-4 bg-[#0f0f0f] border border-[#333] hover:border-[#9b59b6] transition-all hover:scale-105 text-center rounded-lg">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-[#9b59b6] group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-[#fff] mb-1">Gang</div>
                  <kbd className="text-[8px] text-[#666] bg-[#1a1a1a] px-1.5 py-0.5 rounded">A</kbd>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Daily Missions & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Missions */}
        {visibleWidgets.dailyMissions && (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#5cb85c]" />
                <h2 className="text-sm font-bold text-[#fff]">Daily Missions</h2>
              </div>
              <span className="text-[9px] bg-[#5cb85c]/10 text-[#5cb85c] px-2 py-1 rounded-full font-bold">
                {dailyMissions.filter((m) => m.progress >= m.maxProgress).length}/{dailyMissions.length} Complete
              </span>
            </div>
            <div className="p-4 space-y-3">
              {dailyMissions.map((mission) => {
                const Icon = iconMap[mission.icon as keyof typeof iconMap] || Dumbbell
                const progress = (mission.progress / mission.maxProgress) * 100
                const isComplete = mission.progress >= mission.maxProgress

                return (
                  <div
                    key={mission.id}
                    className="bg-[#0f0f0f] border border-[#333] rounded-lg p-3 hover:border-[#5cb85c] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isComplete ? 'bg-[#5cb85c]/10' : 'bg-[#1a1a1a]'}`}>
                        <Icon className={`w-5 h-5 ${isComplete ? 'text-[#5cb85c]' : 'text-[#888]'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xs font-bold text-[#fff]">{mission.title}</h3>
                          {isComplete && <CheckCircle2 className="w-4 h-4 text-[#5cb85c]" />}
                        </div>
                        <p className="text-[10px] text-[#666] mb-2">{mission.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isComplete ? 'bg-[#5cb85c]' : 'bg-[#5bc0de]'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-[9px] font-bold text-[#888]">
                            {mission.progress}/{mission.maxProgress}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-[#f0ad4e]">
                          <Gift className="w-3 h-3" />
                          <span>Reward: {mission.reward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Activity Feed */}
        {visibleWidgets.activity && (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#5bc0de]" />
                <h2 className="text-sm font-bold text-[#fff]">Recent Activity</h2>
              </div>
              <button className="text-[9px] text-[#5bc0de] hover:underline">View All</button>
            </div>
            <div className="p-4 space-y-2">
              {activities.map((activity) => {
                const Icon = iconMap[activity.icon as keyof typeof iconMap] || Activity
                const colors = {
                  success: 'text-[#5cb85c] bg-[#5cb85c]/10 border-[#5cb85c]',
                  danger: 'text-[#d9534f] bg-[#d9534f]/10 border-[#d9534f]',
                  info: 'text-[#5bc0de] bg-[#5bc0de]/10 border-[#5bc0de]',
                  warning: 'text-[#f0ad4e] bg-[#f0ad4e]/10 border-[#f0ad4e]',
                }

                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-[#0f0f0f] border border-[#333] rounded-lg hover:border-[#5cb85c]/30 transition-all"
                  >
                    <div className={`p-1.5 rounded-lg border ${colors[activity.type]}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#fff] mb-0.5">{activity.message}</p>
                      <p className="text-[9px] text-[#666]">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Players */}
        {visibleWidgets.topPlayers && (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#333] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#f0ad4e]" />
              <h2 className="text-sm font-bold text-[#fff]">Top Players</h2>
            </div>
            <div className="p-4 space-y-2">
              {leaderboard.slice(0, 5).map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 p-2 bg-[#0f0f0f] border border-[#333] rounded hover:border-[#f0ad4e] transition-all"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-[#f0ad4e] text-[#fff] text-xs font-bold rounded-full">
                    {player.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#fff]">{player.username}</p>
                    <p className="text-[10px] text-[#666]">Level {player.level} • ${player.cash.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#f0ad4e]">{player.reputation}</p>
                    <p className="text-[10px] text-[#666]">Rep</p>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/leaderboard" className="block mt-3">
                <button className="w-full px-4 py-2 bg-[#f0ad4e] hover:bg-[#ec971f] text-[#fff] text-xs font-bold uppercase tracking-wider rounded transition-colors">
                  View Full Leaderboard
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Daily Rewards */}
        {visibleWidgets.dailyRewards && (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#333] flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#5cb85c]" />
              <h2 className="text-sm font-bold text-[#fff]">Daily Rewards</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                      day <= 7
                        ? 'bg-[#5cb85c]/10 border-[#5cb85c] text-[#5cb85c]'
                        : 'bg-[#0f0f0f] border-[#333] text-[#666]'
                    }`}
                  >
                    {day <= 7 ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[10px] font-bold">{day}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#5cb85c]/10 border border-[#5cb85c] rounded-lg">
                <Flame className="w-5 h-5 text-[#f0ad4e]" />
                <div>
                  <p className="text-xs font-bold text-[#fff]">7 Day Streak!</p>
                  <p className="text-[10px] text-[#888]">Keep it up to unlock exclusive rewards</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}