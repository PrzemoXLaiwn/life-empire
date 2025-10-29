'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface GameEvent {
  id: string
  type: string
  message: string
  userId: string | null
  createdAt: string
  username?: string
}

export function LiveFeed() {
  const [events, setEvents] = useState<GameEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events)
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
    const interval = setInterval(loadEvents, 5000) // Refresh every 5s
    return () => clearInterval(interval)
  }, [])

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

  const formatMessage = (event: GameEvent) => {
    // Replace userId with username in message
    if (event.userId && event.username) {
      return event.message.replace(event.userId, event.username)
    }
    return event.message
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

  if (isLoading) {
    return (
      <div className="ls-section">
        <div className="ls-section-header">Live Feed</div>
        <div className="ls-section-content">
          <p className="text-[#888] text-sm">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ls-section">
      <div className="ls-section-header">Live Feed</div>
      <div className="ls-section-content">
        {events.length === 0 ? (
          <p className="text-[#888] text-sm">No recent activity</p>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] transition-colors"
              >
                <span className="text-xl">{getEventIcon(event.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#d0d0d0] break-words">
                    {formatMessage(event)}
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
  )
}