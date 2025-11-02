'use client'

/**
 * Events Page
 * Live feed of game activities and events
 */

import { useEffect, useState, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { getGameEvents } from '@/actions/events'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from '@/components/ui/Avatar'
import { Filter, RefreshCw } from 'lucide-react'

type GameEvent = {
  id: string
  type: string
  message: string
  userId?: string | null
  username?: string | null
  avatar?: string | null
  createdAt: Date
}

const EVENT_ICONS: Record<string, string> = {
  CRIME: '🔫',
  JOB: '💼',
  GANG: '👊',
  LEVEL_UP: '⭐',
  BUSINESS: '🏢',
  SYSTEM: '📢',
  default: '📰'
}

const EVENT_COLORS: Record<string, string> = {
  CRIME: 'text-[#d9534f]',
  JOB: 'text-[#5bc0de]',
  GANG: 'text-[#f0ad4e]',
  LEVEL_UP: 'text-[#f0ad4e]',
  BUSINESS: 'text-[#5cb85c]',
  SYSTEM: 'text-[#9b59b6]',
  default: 'text-[#888]'
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Events' },
  { value: 'CRIME', label: 'Crimes' },
  { value: 'JOB', label: 'Jobs' },
  { value: 'GANG', label: 'Gang' },
  { value: 'LEVEL_UP', label: 'Level Ups' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'SYSTEM', label: 'System' }
]

export default function EventsPage() {
  const { character } = useCharacterStore()
  const [events, setEvents] = useState<GameEvent[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const supabase = createClient()
  const subscriptionRef = useRef<any>(null)

  // Load events
  const loadEvents = async (reset = false) => {
    try {
      if (reset) {
        setIsLoading(true)
        setOffset(0)
      }

      const currentOffset = reset ? 0 : offset
      const filter = activeFilter === 'all' ? undefined : activeFilter

      const result = await getGameEvents(filter, 50, currentOffset)

      if ('error' in result) {
        console.error('Failed to load events:', result.error)
      } else {
        if (reset) {
          setEvents(result.events as GameEvent[])
        } else {
          setEvents(prev => [...prev, ...(result.events as GameEvent[])])
        }
        setHasMore(result.hasMore || false)
      }
    } catch (err) {
      console.error('Failed to load events:', err)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  // Initial load and filter changes
  useEffect(() => {
    loadEvents(true)
  }, [activeFilter])

  // Set up real-time subscription
  useEffect(() => {
    // Clean up existing subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe()
    }

    // Subscribe to new events
    subscriptionRef.current = supabase
      .channel('game_events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'game_events'
        },
        (payload) => {
          const newEvent = payload.new as GameEvent

          // Only add if it matches the current filter
          if (activeFilter === 'all' || newEvent.type === activeFilter) {
            setEvents(prev => [newEvent, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [activeFilter])

  // Load more events
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    setOffset(prev => prev + 50)

    // The actual loading happens in the next effect when offset changes
    await loadEvents(false)
  }

  // Format time ago
  const timeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  // Refresh events
  const handleRefresh = () => {
    loadEvents(true)
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#fff]">🎲 Game Events</h1>
        <button
          onClick={handleRefresh}
          className="ls-btn ls-btn-secondary flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="ls-section">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-[#888]" />
            <span className="text-xs text-[#888] uppercase">Filter Events</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  activeFilter === option.value
                    ? 'bg-[#5cb85c] text-white'
                    : 'bg-[#1a1a1a] text-[#888] hover:text-[#d0d0d0] border border-[#2a2a2a]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Feed */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
              <p className="text-[#888] text-xs uppercase">Loading events...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="ls-section">
            <div className="ls-section-content text-center py-12">
              <p className="text-[#888] text-sm">No events yet. Start playing to see activities!</p>
            </div>
          </div>
        ) : (
          <>
            {events.map((event) => {
              const icon = EVENT_ICONS[event.type] || EVENT_ICONS.default
              const color = EVENT_COLORS[event.type] || EVENT_COLORS.default
              const isMyEvent = character && event.userId === character.id

              return (
                <div
                  key={event.id}
                  className={`ls-section ${isMyEvent ? 'border-[#5cb85c]' : ''}`}
                >
                  <div className="ls-section-content">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          {event.username && event.avatar && (
                            <Avatar icon={event.avatar} size="sm" />
                          )}
                          <p className={`text-sm ${color} flex-1`}>{event.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-[#888]">{timeAgo(event.createdAt)}</p>
                          {isMyEvent && (
                            <span className="text-xs bg-[#5cb85c]/10 text-[#5cb85c] px-2 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Event Type Badge */}
                      <div className="flex-shrink-0">
                        <span
                          className={`text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] ${color}`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center py-4">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="ls-btn ls-btn-secondary disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    'Load More Events'
                  )}
                </button>
              </div>
            )}

            {!hasMore && events.length > 0 && (
              <div className="text-center py-4">
                <p className="text-xs text-[#888]">No more events to load</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Info Card */}
      <div className="ls-section border-[#5bc0de]">
        <div className="ls-section-content">
          <p className="text-xs text-[#888]">
            <span className="text-[#5bc0de]">💡 Tip:</span> Events are updated in real-time! Watch as players across the game world commit crimes, complete jobs, level up, and more.
          </p>
        </div>
      </div>
    </div>
  )
}
