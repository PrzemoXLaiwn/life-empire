'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, X, Minus } from 'lucide-react'

interface GameEvent {
  id: string
  type: string
  message: string
  userId: string | null
  username?: string
  createdAt: string
}

export function FloatingFeed() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [events, setEvents] = useState<GameEvent[]>([])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      loadEvents()
      const interval = setInterval(loadEvents, 5000)
      return () => clearInterval(interval)
    }
  }, [isOpen, isMinimized])

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events.slice(0, 20))
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    }
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

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const eventTime = new Date(timestamp)
    const diffMs = now.getTime() - eventTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'now'
    if (diffMins < 60) return `${diffMins}m`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h`
    return `${Math.floor(diffHours / 24)}d`
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 p-4 bg-[#f0ad4e] hover:bg-[#ec971f] text-white rounded-full shadow-lg transition-all hover:scale-110"
        >
          <TrendingUp className="w-6 h-6" />
          {events.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d9534f] rounded-full text-[10px] font-bold flex items-center justify-center">
              {events.length}
            </span>
          )}
        </button>
      )}

      {/* Feed Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-full md:w-96 ${isMinimized ? 'h-14' : 'h-[500px]'} bg-[#0f0f0f] border border-[#333] shadow-2xl flex flex-col transition-all rounded-lg overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border-b border-[#333]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-sm font-bold text-[#fff] uppercase tracking-wider">
                Live Feed
              </span>
              <span className="text-[10px] text-success">● LIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
              >
                <Minus className="w-4 h-4 text-[#888]" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#2a2a2a] rounded transition-colors"
              >
                <X className="w-4 h-4 text-[#888]" />
              </button>
            </div>
          </div>

          {/* Events */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {events.length === 0 ? (
                <p className="text-[#888] text-xs text-center py-8">
                  📰 No recent activity
                </p>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-2 p-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] transition-colors rounded"
                  >
                    <span className="text-lg">{getEventIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#d0d0d0] break-words leading-tight">
                        {event.message}
                      </p>
                      <p className="text-[8px] text-[#666] mt-1">
                        {formatTime(event.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}