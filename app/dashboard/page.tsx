'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Trophy,
  Zap,
  DollarSign,
  Target,
  Globe,
  Briefcase,
  ShoppingBag,
  Shield,
  Swords,
  Home
} from 'lucide-react'

interface GameEvent {
  id: string
  type: string
  message: string
  userId: string | null
  username?: string
  createdAt: string
}

interface ChatMessage {
  id: string
  username: string
  message: string
  createdAt: string
}

export default function DashboardPage() {
  const { character, isLoading } = useCharacterStore()
  const [events, setEvents] = useState<GameEvent[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('Player')
  const supabase = createClient()

  useEffect(() => {
    loadUsername()
    loadEvents()
    loadChat()
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      loadEvents()
      loadChat()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const loadUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username)
    } else {
      setUsername(user?.email?.split('@')[0] || 'Player')
    }
  }

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events.slice(0, 10))
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    }
  }

  const loadChat = async () => {
    try {
      const response = await fetch('/api/chat')
      if (response.ok) {
        const data = await response.json()
        setChatMessages(data.messages)
      }
    } catch (error) {
      console.error('Failed to load chat:', error)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      })

      if (response.ok) {
        setNewMessage('')
        loadChat()
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const eventTime = new Date(timestamp)
    const diffMs = now.getTime() - eventTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'crime': return '🔫'
      case 'travel': return '✈️'
      case 'business': return '💼'
      case 'level_up': return '⬆️'
      case 'gang': return '👥'
      default: return '📰'
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
    <div className="space-y-4 max-w-7xl mx-auto fade-in">
      {/* Welcome Header */}
      <div className="ls-section">
        <div className="ls-section-content">
          <h1 className="text-2xl font-bold text-[#fff] mb-2">
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

      {/* Quick Actions - 8 OPCJI */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <Link href="/dashboard/crimes" className="ls-section hover:border-danger transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Target className="w-8 h-8 mx-auto mb-2 text-danger" />
            <div className="text-xs font-bold text-[#fff]">Crime</div>
          </div>
        </Link>

        <Link href="/dashboard/gym" className="ls-section hover:border-warning transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
            <div className="text-xs font-bold text-[#fff]">Gym</div>
          </div>
        </Link>

        <Link href="/dashboard/jobs" className="ls-section hover:border-success transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-success" />
            <div className="text-xs font-bold text-[#fff]">Jobs</div>
          </div>
        </Link>

        <Link href="/dashboard/travel" className="ls-section hover:border-info transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Globe className="w-8 h-8 mx-auto mb-2 text-info" />
            <div className="text-xs font-bold text-[#fff]">Travel</div>
          </div>
        </Link>

        <Link href="/dashboard/city" className="ls-section hover:border-[#888] transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Home className="w-8 h-8 mx-auto mb-2 text-[#888]" />
            <div className="text-xs font-bold text-[#fff]">City</div>
          </div>
        </Link>

        <Link href="/dashboard/market" className="ls-section hover:border-[#f0ad4e] transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-[#f0ad4e]" />
            <div className="text-xs font-bold text-[#fff]">Market</div>
          </div>
        </Link>

        <Link href="/dashboard/combat" className="ls-section hover:border-danger transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Swords className="w-8 h-8 mx-auto mb-2 text-danger" />
            <div className="text-xs font-bold text-[#fff]">Combat</div>
          </div>
        </Link>

        <Link href="/dashboard/gang" className="ls-section hover:border-[#9b59b6] transition-all hover:scale-105">
          <div className="ls-section-content text-center p-3">
            <Shield className="w-8 h-8 mx-auto mb-2 text-[#9b59b6]" />
            <div className="text-xs font-bold text-[#fff]">Gang</div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Global Chat */}
        <div className="ls-section">
          <div className="ls-section-header">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Global Chat
            <span className="ml-2 text-[10px] text-success">● LIVE</span>
          </div>
          <div className="ls-section-content">
            {/* Messages */}
            <div className="space-y-2 mb-4 max-h-[350px] overflow-y-auto">
              {chatMessages.length === 0 ? (
                <p className="text-[#888] text-sm text-center py-8">
                  💬 No messages yet. Be the first to chat!
                </p>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] transition-colors rounded"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-bold text-success">
                        {msg.username}
                      </span>
                      <span className="text-[10px] text-[#666]">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[#d0d0d0] break-words">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message... (max 200 chars)"
                maxLength={200}
                className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c] rounded"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="ls-btn ls-btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
            <p className="text-[10px] text-[#666] mt-2">
              💡 Auto-refreshes every 5 seconds
            </p>
          </div>
        </div>

        {/* Live Feed */}
        <div className="ls-section">
          <div className="ls-section-header">
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Live Feed
            <span className="ml-2 text-[10px] text-success">● LIVE</span>
          </div>
          <div className="ls-section-content">
            {events.length === 0 ? (
              <p className="text-[#888] text-sm text-center py-8">
                📰 No recent activity
              </p>
            ) : (
              <div className="space-y-2 max-h-[450px] overflow-y-auto">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] transition-colors rounded"
                  >
                    <span className="text-xl">{getEventIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#d0d0d0] break-words">
                        {event.message}
                      </p>
                      <p className="text-[10px] text-[#666] mt-1">
                        {formatTime(event.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Players & Leaderboard Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="ls-section">
          <div className="ls-section-header">
            <Trophy className="w-4 h-4 inline mr-2" />
            Top Players by Level
          </div>
          <div className="ls-section-content">
            <p className="text-xs text-[#888] text-center py-6">
              🏆 Coming soon - compete for the top spot!
            </p>
            <Link 
              href="/dashboard/leaderboard"
              className="ls-btn ls-btn-primary w-full text-center"
            >
              View Full Leaderboard
            </Link>
          </div>
        </div>

        <div className="ls-section">
          <div className="ls-section-header">
            <Users className="w-4 h-4 inline mr-2" />
            Online Players
          </div>
          <div className="ls-section-content">
            <p className="text-xs text-[#888] text-center py-6">
              🟢 Coming soon - see who's online and active!
            </p>
            <Link 
              href="/dashboard/players"
              className="ls-btn ls-btn-secondary w-full text-center"
            >
              Browse All Players
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Challenges - FUTURE */}
      <div className="ls-section">
        <div className="ls-section-header">
          <Zap className="w-4 h-4 inline mr-2" />
          Daily Challenges
        </div>
        <div className="ls-section-content">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-sm text-[#888] mb-4">
              Daily challenges coming soon! Complete missions for rewards.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded">
              <span className="text-xs text-[#888]">Feature in development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}