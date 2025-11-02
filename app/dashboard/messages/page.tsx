'use client'

/**
 * Messages Page
 * Player-to-player messaging system with inbox and sent tabs
 */

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import {
  getMessages,
  getMessage,
  sendMessage,
  deleteMessage,
  markAllAsRead,
  getUnreadCount
} from '@/actions/messages'
import { Avatar } from '@/components/ui/Avatar'
import {
  Mail,
  Send,
  Trash2,
  Inbox,
  SendHorizontal,
  Search,
  X,
  CheckCheck,
  Plus
} from 'lucide-react'

type Message = {
  id: string
  content: string
  isRead: boolean
  sentAt: Date
  sender: {
    id: string
    username: string
    avatar: string
    customAvatar?: string | null
  }
  receiver: {
    id: string
    username: string
    avatar: string
    customAvatar?: string | null
  }
}

export default function MessagesPage() {
  const { character, isLoading: charLoading } = useCharacterStore()
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox')
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showCompose, setShowCompose] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Compose form state
  const [toUsername, setToUsername] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [composeError, setComposeError] = useState('')

  // Load messages
  const loadMessages = async () => {
    if (!character) return

    try {
      setIsLoading(true)
      const result = await getMessages(character.id, activeTab)

      if ('error' in result) {
        console.error('Failed to load messages:', result.error)
      } else {
        setMessages(result.messages as Message[])
      }
    } catch (err) {
      console.error('Failed to load messages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Load unread count
  const loadUnreadCount = async () => {
    if (!character) return

    const result = await getUnreadCount(character.id)
    if ('count' in result) {
      setUnreadCount(result.count)
    }
  }

  useEffect(() => {
    loadMessages()
    loadUnreadCount()
  }, [character, activeTab])

  // Select message
  const handleSelectMessage = async (msg: Message) => {
    if (!character) return

    const result = await getMessage(msg.id, character.id)

    if ('error' in result) {
      console.error('Failed to load message:', result.error)
    } else {
      setSelectedMessage(result.message as Message)
      // Refresh unread count if it was an unread inbox message
      if (activeTab === 'inbox' && !msg.isRead) {
        loadUnreadCount()
        loadMessages()
      }
    }
  }

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!character || !toUsername.trim() || !messageContent.trim()) return

    setIsSending(true)
    setComposeError('')

    try {
      const result = await sendMessage(character.id, toUsername.trim(), messageContent)

      if ('error' in result) {
        setComposeError(result.error || 'An error occurred')
      } else {
        setToUsername('')
        setMessageContent('')
        setShowCompose(false)
        // Switch to sent tab to see the sent message
        setActiveTab('sent')
      }
    } catch (err) {
      console.error('Failed to send message:', err)
      setComposeError('Failed to send message')
    } finally {
      setIsSending(false)
    }
  }

  // Delete message
  const handleDeleteMessage = async (messageId: string) => {
    if (!character || !confirm('Are you sure you want to delete this message?')) return

    const result = await deleteMessage(messageId, character.id)

    if ('error' in result) {
      console.error('Failed to delete message:', result.error)
    } else {
      setSelectedMessage(null)
      loadMessages()
      loadUnreadCount()
    }
  }

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    if (!character) return

    const result = await markAllAsRead(character.id)

    if ('error' in result) {
      console.error('Failed to mark all as read:', result.error)
    } else {
      loadMessages()
      loadUnreadCount()
    }
  }

  // Format time ago
  const timeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  if (charLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading messages...</p>
        </div>
      </div>
    )
  }

  const filteredMessages = searchQuery
    ? messages.filter(m =>
        m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (activeTab === 'inbox' ? m.sender.username : m.receiver.username)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : messages

  return (
    <div className="space-y-4 max-w-7xl mx-auto fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#fff]">💬 Messages</h1>
        <button
          onClick={() => setShowCompose(true)}
          className="ls-btn ls-btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Message
        </button>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="ls-section max-w-lg w-full">
            <div className="ls-section-header flex items-center justify-between">
              <span>✉️ Compose Message</span>
              <button onClick={() => setShowCompose(false)}>
                <X className="w-4 h-4 text-[#888] hover:text-[#fff]" />
              </button>
            </div>
            <div className="ls-section-content">
              <form onSubmit={handleSendMessage} className="space-y-4">
                {composeError && (
                  <div className="p-3 bg-[#d9534f]/10 border border-[#d9534f] rounded">
                    <p className="text-sm text-[#d9534f]">{composeError}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-[#888] mb-2">To (Username):</label>
                  <input
                    type="text"
                    value={toUsername}
                    onChange={(e) => setToUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[#d0d0d0] focus:border-[#5cb85c] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#888] mb-2">
                    Message ({messageContent.length}/500):
                  </label>
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value.slice(0, 500))}
                    placeholder="Type your message..."
                    rows={6}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[#d0d0d0] focus:border-[#5cb85c] focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSending || !toUsername.trim() || !messageContent.trim()}
                    className="ls-btn ls-btn-primary flex-1 disabled:opacity-50"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCompose(false)}
                    className="ls-btn ls-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
        {/* LEFT: Message List */}
        <div className="lg:col-span-1 flex flex-col h-full">
          <div className="ls-section flex-1 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-[#2a2a2a]">
              <button
                onClick={() => setActiveTab('inbox')}
                className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'inbox'
                    ? 'bg-[#1a1a1a] text-[#5cb85c] border-b-2 border-[#5cb85c]'
                    : 'text-[#888] hover:text-[#d0d0d0]'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span className="text-sm">Inbox</span>
                {unreadCount > 0 && (
                  <span className="text-xs bg-[#d9534f] text-white px-1.5 py-0.5 rounded">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'sent'
                    ? 'bg-[#1a1a1a] text-[#5cb85c] border-b-2 border-[#5cb85c]'
                    : 'text-[#888] hover:text-[#d0d0d0]'
                }`}
              >
                <SendHorizontal className="w-4 h-4" />
                <span className="text-sm">Sent</span>
              </button>
            </div>

            {/* Search & Actions */}
            <div className="p-3 border-b border-[#2a2a2a]">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-sm text-[#d0d0d0] focus:border-[#5cb85c] focus:outline-none"
                />
              </div>
              {activeTab === 'inbox' && unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-[#5cb85c] hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent"></div>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-6 text-center">
                  <Mail className="w-12 h-12 text-[#888] mx-auto mb-3" />
                  <p className="text-[#888] text-sm">
                    {searchQuery ? 'No messages found' : 'No messages yet'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#2a2a2a]">
                  {filteredMessages.map((msg) => {
                    const otherUser = activeTab === 'inbox' ? msg.sender : msg.receiver
                    const isSelected = selectedMessage?.id === msg.id

                    return (
                      <button
                        key={msg.id}
                        onClick={() => handleSelectMessage(msg)}
                        className={`w-full p-3 hover:bg-[#1a1a1a] transition-colors text-left ${
                          isSelected ? 'bg-[#1a1a1a] border-l-2 border-[#5cb85c]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {!msg.isRead && activeTab === 'inbox' && (
                            <div className="w-2 h-2 rounded-full bg-[#5cb85c] mt-1.5 flex-shrink-0" />
                          )}
                          <Avatar
                            icon={otherUser.avatar}
                            customUrl={otherUser.customAvatar}
                            size="sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p
                                className={`text-sm truncate ${
                                  !msg.isRead && activeTab === 'inbox'
                                    ? 'font-bold text-[#fff]'
                                    : 'text-[#d0d0d0]'
                                }`}
                              >
                                {otherUser.username}
                              </p>
                              <span className="text-xs text-[#888] ml-2 flex-shrink-0">
                                {timeAgo(msg.sentAt)}
                              </span>
                            </div>
                            <p className="text-xs text-[#888] truncate">{msg.content}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Message View */}
        <div className="lg:col-span-2 h-full">
          <div className="ls-section h-full flex flex-col">
            {selectedMessage ? (
              <>
                {/* Message Header */}
                <div className="p-4 border-b border-[#2a2a2a]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        icon={
                          activeTab === 'inbox'
                            ? selectedMessage.sender.avatar
                            : selectedMessage.receiver.avatar
                        }
                        customUrl={
                          activeTab === 'inbox'
                            ? selectedMessage.sender.customAvatar
                            : selectedMessage.receiver.customAvatar
                        }
                        size="md"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#d0d0d0]">
                          {activeTab === 'inbox'
                            ? selectedMessage.sender.username
                            : selectedMessage.receiver.username}
                        </p>
                        <p className="text-xs text-[#888]">
                          {new Date(selectedMessage.sentAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="ls-btn ls-btn-secondary flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded p-4">
                    <p className="text-[#d0d0d0] whitespace-pre-wrap">{selectedMessage.content}</p>
                  </div>
                </div>

                {/* Reply Button */}
                {activeTab === 'inbox' && (
                  <div className="p-4 border-t border-[#2a2a2a]">
                    <button
                      onClick={() => {
                        setToUsername(selectedMessage.sender.username)
                        setShowCompose(true)
                      }}
                      className="ls-btn ls-btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-[#888] mx-auto mb-4" />
                  <p className="text-[#888] text-sm">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
