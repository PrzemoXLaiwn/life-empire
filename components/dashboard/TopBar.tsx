'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import {
  Power,
  Zap,
  Heart,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Flame,
  Clock,
  Gift,
  Trophy,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Sparkles,
  Star,
  Target,
  Coins,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  MessageSquare,
  Swords,
  Shield,
  Activity,
  Gauge,
  User,
  MapPin,
  Menu,
  Home,
  BarChart3,
  Users,
  Building2,
  Plane,
  Gamepad2,
  Code
} from 'lucide-react'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  link?: string
}

interface DailyReward {
  day: number
  claimed: boolean
  amount: number
}

interface DailyRewardsData {
  currentStreak: number
  maxStreak: number
  canClaimToday: boolean
  rewards: DailyReward[]
}

export function TopBar() {
  const { character, isLoading } = useCharacterStore()
  const [username, setUsername] = useState<string>('Player')
  const [userRole, setUserRole] = useState<string>('USER')
  const supabase = createClient()
  const router = useRouter()

  // UI State
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showQuickStats, setShowQuickStats] = useState(false)
  const [showQuickNav, setShowQuickNav] = useState(false)
  const [isHovered, setIsHovered] = useState<string | null>(null)

  // Game State
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [dailyRewards, setDailyRewards] = useState<DailyRewardsData | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [gameWeather, setGameWeather] = useState<'sunny' | 'cloudy' | 'rainy' | 'windy'>('sunny')
  const [gameTimeOfDay, setGameTimeOfDay] = useState<'day' | 'night'>('day')
  const [nextEventCountdown, setNextEventCountdown] = useState(3600) // seconds

  useEffect(() => {
    const getUsername = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.user_metadata?.username) {
        setUsername(user.user_metadata.username)
      } else {
        setUsername(user?.email?.split('@')[0] || 'Player')
      }
    }

    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        console.log('[TopBar] Fetching role for user:', user?.id)
        if (user) {
          const response = await fetch('/api/user/role')
          console.log('[TopBar] Role API response status:', response.status)
          if (response.ok) {
            const data = await response.json()
            console.log('[TopBar] Role data received:', data)
            setUserRole(data.role || 'USER')
            console.log('[TopBar] User role set to:', data.role || 'USER')
          }
        }
      } catch (error) {
        console.error('[TopBar] Failed to fetch user role:', error)
      }
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications')
        if (response.ok) {
          const data = await response.json()
          setNotifications(data.notifications || [])
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      }
    }

    const fetchDailyRewards = async () => {
      try {
        const response = await fetch('/api/daily-rewards')
        if (response.ok) {
          const data = await response.json()
          setDailyRewards(data.rewards)
        }
      } catch (error) {
        console.error('Failed to fetch daily rewards:', error)
      }
    }

    getUsername()
    fetchUserRole()
    fetchNotifications()
    fetchDailyRewards()
  }, [supabase])

  // Update real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Update event countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNextEventCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate weather changes
  useEffect(() => {
    const weatherTimer = setInterval(() => {
      const weathers: typeof gameWeather[] = ['sunny', 'cloudy', 'rainy', 'windy']
      setGameWeather(weathers[Math.floor(Math.random() * weathers.length)])
    }, 60000) // Change every minute for demo

    return () => clearInterval(weatherTimer)
  }, [])

  // Update time of day based on real time
  useEffect(() => {
    const hours = currentTime.getHours()
    setGameTimeOfDay(hours >= 6 && hours < 18 ? 'day' : 'night')
  }, [currentTime])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const getWeatherIcon = () => {
    switch (gameWeather) {
      case 'sunny':
        return <Sun className="w-4 h-4 text-[#f0ad4e]" />
      case 'cloudy':
        return <Cloud className="w-4 h-4 text-[#888]" />
      case 'rainy':
        return <CloudRain className="w-4 h-4 text-[#5bc0de]" />
      case 'windy':
        return <Wind className="w-4 h-4 text-[#5cb85c]" />
    }
  }

  if (isLoading || !character) {
    return (
      <div className="bg-[#0f0f0f] border-b border-[#333] px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-[#1a1a1a] animate-pulse rounded"></div>
          <div className="h-10 w-64 bg-[#1a1a1a] animate-pulse rounded"></div>
        </div>
      </div>
    )
  }

  // Get city name and country flag
  const getCityDisplay = () => {
    if (!character.city) {
      return { flag: '🌍', name: 'No City' }
    }

    const countryFlags: Record<string, string> = {
      USA: '🇺🇸',
      UK: '🇬🇧',
      Japan: '🇯🇵',
    }

    const flag = countryFlags[character.city.country] || '🌍'
    return { flag, name: character.city.name }
  }

  const city = getCityDisplay()
  const healthPercent = (character.health / character.maxHealth) * 100
  const energyPercent = (character.energy / character.maxEnergy) * 100

  return (
    <>
      <div className="bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] border-b border-[#333] shadow-lg">
        {/* Main Top Bar */}
        <div className="px-4 md:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3">
            {/* Left: User Info & Location */}
            <div className="flex items-center gap-3">
              {/* Avatar with Level & Streak */}
              <div className="relative">
                <Avatar
                  icon={(character as any).avatar || 'men1'}
                  customUrl={(character as any).customAvatar}
                  size="md"
                  className="border-2 border-[#5cb85c] shadow-lg shadow-[#5cb85c]/20"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#f0ad4e] border-2 border-[#0f0f0f] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{character.level}</span>
                </div>
              </div>

              {/* Username, Location & Time */}
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#fff] uppercase tracking-wider">
                    {username}
                  </p>
                  <div className="flex items-center gap-1 bg-[#1a1a1a] border border-[#f0ad4e] px-1.5 py-0.5 rounded-full">
                    <Flame className="w-3 h-3 text-[#f0ad4e]" />
                    <span className="text-[9px] font-bold text-[#f0ad4e]">{dailyRewards?.currentStreak || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-[#888]">
                  <span className="flex items-center gap-1">
                    {city.flag} {city.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {gameTimeOfDay === 'day' ? (
                      <Sun className="w-3 h-3 text-[#f0ad4e]" />
                    ) : (
                      <Moon className="w-3 h-3 text-[#5bc0de]" />
                    )}
                    {currentTime.toLocaleTimeString()}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">{getWeatherIcon()}</span>
                </div>
              </div>
            </div>



            {/* Center: Quick Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Quick Navigation */}
              <button
                onClick={() => setShowQuickNav(!showQuickNav)}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#9b59b6] hover:bg-[#9b59b6]/10 transition-all rounded group"
                title="Quick Navigation"
              >
                <Menu className="w-4 h-4 text-[#888] group-hover:text-[#9b59b6] group-hover:rotate-90 transition-all" />
              </button>

              {/* Next Event Countdown */}
              <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#f0ad4e] px-2.5 py-1.5 rounded">
                <Clock className="w-3.5 h-3.5 text-[#f0ad4e]" />
                <div>
                  <p className="text-[8px] text-[#888] uppercase">Next Event</p>
                  <p className="text-[10px] font-mono font-bold text-[#f0ad4e]">
                    {formatCountdown(nextEventCountdown)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Daily Rewards */}
              <button
                onClick={() => router.push('/dashboard/daily-rewards')}
                onMouseEnter={() => setIsHovered('daily')}
                onMouseLeave={() => setIsHovered(null)}
                className="relative p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#f0ad4e] hover:bg-[#f0ad4e]/10 transition-all rounded group"
              >
                <Gift className="w-4 h-4 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
                {dailyRewards?.canClaimToday && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#d9534f] rounded-full border border-[#0f0f0f]"></div>
                )}
                {isHovered === 'daily' && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] border border-[#333] rounded px-2 py-1 text-[9px] text-[#fff] whitespace-nowrap z-50">
                    Daily Rewards
                  </div>
                )}
              </button>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                onMouseEnter={() => setIsHovered('notifications')}
                onMouseLeave={() => setIsHovered(null)}
                className="relative p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] hover:bg-[#5cb85c]/10 transition-all rounded group"
              >
                <Bell className="w-4 h-4 text-[#888] group-hover:text-[#5cb85c] group-hover:scale-110 transition-all" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#d9534f] rounded-full border border-[#0f0f0f] flex items-center justify-center px-1">
                    <span className="text-[9px] font-bold text-white">{unreadCount}</span>
                  </div>
                )}
                {isHovered === 'notifications' && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] border border-[#333] rounded px-2 py-1 text-[9px] text-[#fff] whitespace-nowrap z-50">
                    Notifications ({unreadCount} unread)
                  </div>
                )}
              </button>

              {/* Owner Panel - Only for OWNER */}
              {userRole === 'OWNER' && (
                <button
                  onClick={() => router.push('/dashboard/owner')}
                  onMouseEnter={() => setIsHovered('owner')}
                  onMouseLeave={() => setIsHovered(null)}
                  className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#9b59b6] hover:bg-[#9b59b6]/10 transition-all rounded group"
                >
                  <Code className="w-4 h-4 text-[#9b59b6] group-hover:scale-110 transition-transform" />
                  {isHovered === 'owner' && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] border border-[#333] rounded px-2 py-1 text-[9px] text-[#fff] whitespace-nowrap z-50">
                      💎 Owner Panel
                    </div>
                  )}
                </button>
              )}

              {/* Admin Panel - Only for ADMIN and MODERATOR */}
              {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                <button
                  onClick={() => router.push('/dashboard/admin')}
                  onMouseEnter={() => setIsHovered('admin')}
                  onMouseLeave={() => setIsHovered(null)}
                  className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#d9534f] hover:bg-[#d9534f]/10 transition-all rounded group"
                >
                  <Shield className="w-4 h-4 text-[#d9534f] group-hover:scale-110 transition-transform" />
                  {isHovered === 'admin' && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] border border-[#333] rounded px-2 py-1 text-[9px] text-[#fff] whitespace-nowrap z-50">
                      Admin Panel
                    </div>
                  )}
                </button>
              )}

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                onMouseEnter={() => setIsHovered('settings')}
                onMouseLeave={() => setIsHovered(null)}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#5bc0de] hover:bg-[#5bc0de]/10 transition-all rounded group"
              >
                <Settings className="w-4 h-4 text-[#888] group-hover:text-[#5bc0de] group-hover:rotate-90 transition-all" />
                {isHovered === 'settings' && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] border border-[#333] rounded px-2 py-1 text-[9px] text-[#fff] whitespace-nowrap z-50">
                    Settings
                  </div>
                )}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                onMouseEnter={() => setIsHovered('logout')}
                onMouseLeave={() => setIsHovered(null)}
                className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#d9534f] hover:bg-[#d9534f]/10 transition-all rounded group"
                title="Logout"
              >
                <Power className="w-4 h-4 text-[#d9534f] group-hover:scale-110 transition-transform" />
                {isHovered === 'logout' && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#0f0f0f] border border-[#333] rounded px-2 py-1 text-[9px] text-[#fff] whitespace-nowrap z-50">
                    Logout
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="lg:hidden border-t border-[#333] px-4 py-2 bg-[#0f0f0f]">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#1a1a1a] px-2 py-1.5 rounded">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#d9534f]" />
                  <span className="text-[8px] text-[#888] uppercase">HP</span>
                </div>
                <span className="text-[9px] font-bold text-[#d9534f]">
                  {character.health}/{character.maxHealth}
                </span>
              </div>
              <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-[#d9534f]" style={{ width: `${healthPercent}%` }} />
              </div>
            </div>

            <div className="bg-[#1a1a1a] px-2 py-1.5 rounded">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#f0ad4e]" />
                  <span className="text-[8px] text-[#888] uppercase">Energy</span>
                </div>
                <span className="text-[9px] font-bold text-[#f0ad4e]">
                  {character.energy}/{character.maxEnergy}
                </span>
              </div>
              <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-[#f0ad4e]" style={{ width: `${energyPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 max-w-[calc(100vw-2rem)] bg-[#0f0f0f] border border-[#333] rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-[#333] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#5cb85c]" />
              <h3 className="text-sm font-bold text-[#fff]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[9px] bg-[#d9534f] text-white px-1.5 py-0.5 rounded-full font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={markAllRead}
                className="text-[9px] text-[#5cb85c] hover:underline"
              >
                Mark all read
              </button>
              <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-[#1a1a1a] rounded">
                <X className="w-3.5 h-3.5 text-[#888]" />
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-[#333] mx-auto mb-2" />
                <p className="text-xs text-[#888]">No notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3 border-b border-[#333] hover:bg-[#1a1a1a] transition-colors cursor-pointer ${
                    !notif.isRead ? 'bg-[#5cb85c]/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 ${!notif.isRead ? 'w-2 h-2 bg-[#5cb85c] rounded-full' : 'w-2'}`}></div>
                    <div className="flex-1">
                      <p className="text-xs text-[#fff] mb-1">{notif.message}</p>
                      <p className="text-[9px] text-[#666]">{notif.createdAt}</p>
                    </div>
                    {!notif.isRead && <Star className="w-3 h-3 text-[#5cb85c]" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 w-64 bg-[#0f0f0f] border border-[#333] rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-[#333] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#5bc0de]" />
              <h3 className="text-sm font-bold text-[#fff]">Quick Settings</h3>
            </div>
            <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-[#1a1a1a] rounded">
              <X className="w-3.5 h-3.5 text-[#888]" />
            </button>
          </div>
          <div className="p-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors text-left">
              <Activity className="w-4 h-4 text-[#5cb85c]" />
              <span className="text-xs text-[#fff]">View Stats</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors text-left">
              <MessageSquare className="w-4 h-4 text-[#5bc0de]" />
              <span className="text-xs text-[#fff]">Messages</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors text-left">
              <Trophy className="w-4 h-4 text-[#f0ad4e]" />
              <span className="text-xs text-[#fff]">Achievements</span>
            </button>
            <div className="border-t border-[#333] my-2"></div>
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#1a1a1a] rounded transition-colors text-left">
              <Shield className="w-4 h-4 text-[#9b59b6]" />
              <span className="text-xs text-[#fff]">Privacy</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Navigation Panel */}
      {showQuickNav && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-80 bg-[#0f0f0f] border border-[#333] rounded-lg shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-[#333] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Menu className="w-4 h-4 text-[#9b59b6]" />
              <h3 className="text-sm font-bold text-[#fff]">Quick Navigation</h3>
            </div>
            <button onClick={() => setShowQuickNav(false)} className="p-1 hover:bg-[#1a1a1a] rounded">
              <X className="w-3.5 h-3.5 text-[#888]" />
            </button>
          </div>
          <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  router.push('/dashboard')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#5cb85c]/10 border border-[#333] hover:border-[#5cb85c] rounded transition-all group"
              >
                <Home className="w-5 h-5 text-[#5cb85c] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">Dashboard</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/city')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#f0ad4e]/10 border border-[#333] hover:border-[#f0ad4e] rounded transition-all group"
              >
                <MapPin className="w-5 h-5 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">City</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/business')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#5bc0de]/10 border border-[#333] hover:border-[#5bc0de] rounded transition-all group"
              >
                <Building2 className="w-5 h-5 text-[#5bc0de] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">Business</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/travel')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#9b59b6]/10 border border-[#333] hover:border-[#9b59b6] rounded transition-all group"
              >
                <Plane className="w-5 h-5 text-[#9b59b6] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">Travel</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/gym')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#d9534f]/10 border border-[#333] hover:border-[#d9534f] rounded transition-all group"
              >
                <Activity className="w-5 h-5 text-[#d9534f] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">Gym</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/leaderboard')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#f0ad4e]/10 border border-[#333] hover:border-[#f0ad4e] rounded transition-all group"
              >
                <BarChart3 className="w-5 h-5 text-[#f0ad4e] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">Leaderboard</span>
              </button>

              <button
                onClick={() => {
                  router.push('/dashboard/profile')
                  setShowQuickNav(false)
                }}
                className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#888]/20 border border-[#333] hover:border-[#888] rounded transition-all group"
              >
                <User className="w-5 h-5 text-[#888] group-hover:scale-110 transition-transform" />
                <span className="text-[9px] text-[#fff] font-medium">Profile</span>
              </button>

              {/* Owner Panel - Only for OWNER */}
              {userRole === 'OWNER' && (
                <button
                  onClick={() => {
                    router.push('/dashboard/owner')
                    setShowQuickNav(false)
                  }}
                  className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#9b59b6]/10 border border-[#333] hover:border-[#9b59b6] rounded transition-all group"
                >
                  <Code className="w-5 h-5 text-[#9b59b6] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] text-[#fff] font-medium">💎 Owner</span>
                </button>
              )}

              {/* Admin Panel - Only for ADMIN and MODERATOR */}
              {(userRole === 'ADMIN' || userRole === 'MODERATOR') && (
                <button
                  onClick={() => {
                    router.push('/dashboard/admin')
                    setShowQuickNav(false)
                  }}
                  className="flex flex-col items-center gap-2 p-3 bg-[#1a1a1a] hover:bg-[#d9534f]/10 border border-[#333] hover:border-[#d9534f] rounded transition-all group"
                >
                  <Shield className="w-5 h-5 text-[#d9534f] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] text-[#fff] font-medium">Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
