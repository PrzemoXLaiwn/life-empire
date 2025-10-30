'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, X, Minus } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'

interface ChatMessage {
  id: string
  username: string
  avatar: string
  message: string
  createdAt: string
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('Player')
  const supabase = createClient()

  useEffect(() => {
    loadUsername()
    if (isOpen && !isMinimized) {
      loadChat()
      const interval = setInterval(loadChat, 3000)
      return () => clearInterval(interval)
    }
  }, [isOpen, isMinimized])

  const loadUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username)
    } else {
      setUsername(user?.email?.split('@')[0] || 'Player')
    }
  }

  const loadChat = async () => {
    try {
      const response = await fetch('/api/chat')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
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
          className="fixed bottom-6 right-6 z-50 p-4 bg-[#5cb85c] hover:bg-[#4a9d4a] text-white rounded-full shadow-lg transition-all hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d9534f] rounded-full text-[10px] font-bold flex items-center justify-center">
              {messages.length > 99 ? '99+' : messages.length}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-full md:w-96 ${isMinimized ? 'h-14' : 'h-[500px]'} bg-[#0f0f0f] border border-[#333] shadow-2xl flex flex-col transition-all rounded-lg overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border-b border-[#333]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-success" />
              <span className="text-sm font-bold text-[#fff] uppercase tracking-wider">
                Global Chat
              </span>
              <span className="text-[10px] text-success">● {messages.length}</span>
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

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.length === 0 ? (
                  <p className="text-[#888] text-xs text-center py-8">
                    💬 No messages yet. Start chatting!
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-start gap-2 p-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] transition-colors rounded"
                    >
                      <Avatar icon={msg.avatar || 'crown'} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-[10px] font-bold text-success">
                            {msg.username}
                          </span>
                          <span className="text-[8px] text-[#666]">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-[#d0d0d0] break-words">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-3 bg-[#1a1a1a] border-t border-[#333]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    maxLength={200}
                    className="flex-1 px-3 py-2 bg-[#0f0f0f] border border-[#333] text-[#d0d0d0] text-xs focus:outline-none focus:border-[#5cb85c] rounded"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-[#5cb85c] hover:bg-[#4a9d4a] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}