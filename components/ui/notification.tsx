'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface NotificationProps {
  type: 'success' | 'error' | 'info'
  message: string
  onClose: () => void
  duration?: number
}

export function Notification({ type, message, onClose, duration = 5000 }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
  }

  const colors = {
    success: 'bg-accent-green border-accent-green text-white',
    error: 'bg-accent-red border-accent-red text-white',
    info: 'bg-accent-blue border-accent-blue text-white',
  }

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border-2
        ${colors[type]}
        shadow-lg backdrop-blur-sm
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
    >
      {icons[type]}
      <p className="font-semibold max-w-xs">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 hover:opacity-80 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface NotificationItem {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export function NotificationManager() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  useEffect(() => {
    ;(window as any).addNotification = (type: 'success' | 'error' | 'info', message: string) => {
      const id = Math.random().toString(36).substring(7)
      setNotifications(prev => [...prev, { id, type, message }])
    }
  }, [])

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 flex flex-col items-end">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

export const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
  if (typeof window !== 'undefined' && (window as any).addNotification) {
    ;(window as any).addNotification(type, message)
  }
}