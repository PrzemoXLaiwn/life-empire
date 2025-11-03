'use client'

import { useEffect, useState, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from '@/components/ui/Avatar'
import {
  Check, Upload, Users, User,
  DollarSign, TrendingUp, Car, Home, Briefcase, Target, Award, AlertTriangle,
  Clock, Zap, Crosshair, Map, Shield, Activity, BarChart3, MapPin, Mail, Hash
} from 'lucide-react'

const AVATAR_OPTIONS = [
  { id: 'men1', name: 'Male 1', category: 'Men' },
  { id: 'men2', name: 'Male 2', category: 'Men' },
  { id: 'men3', name: 'Male 3', category: 'Men' },
  { id: 'men4', name: 'Male 4', category: 'Men' },
  { id: 'women1', name: 'Female 1', category: 'Women' },
  { id: 'women2', name: 'Female 2', category: 'Women' },
  { id: 'women3', name: 'Female 3', category: 'Women' },
  { id: 'women4', name: 'Female 4', category: 'Women' },
]

interface CharacterStats {
  totalMoneyEarned: number
  currentWealth: number
  cash: number
  bankBalance: number
  dirtyCash: number
  vehiclesOwned: number
  propertiesOwned: number
  businessesOwned: number
  weaponsOwned: number
  totalCrimes: number
  successfulCrimes: number
  failedCrimes: number
  crimeSuccessRate: number
  totalArrests: number
  deathCount: number
  level: number
  experience: number
  reputation: number
  totalJobHours: number
  heistsCompleted: number
  shooting: number
  driving: number
  stealth: number
  hacking: number
  strength: number
  stamina: number
  endurance: number
  speed: number
  agility: number
  intelligence: number
  charisma: number
  daysPlayed: number
}

export default function ProfilePage() {
  const { character, isLoading, fetchCharacter } = useCharacterStore()
  const [username, setUsername] = useState<string>('Player')
  const [email, setEmail] = useState<string>('')
  const [userRole, setUserRole] = useState<string>('USER')
  const [selectedAvatar, setSelectedAvatar] = useState<string>('men1')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [stats, setStats] = useState<CharacterStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (mounted) {
          if (user?.user_metadata?.username) {
            setUsername(user.user_metadata.username)
          } else {
            setUsername(user?.email?.split('@')[0] || 'Player')
          }
          setEmail(user?.email || '')
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user/role')
        if (response.ok) {
          const data = await response.json()
          if (mounted) {
            setUserRole(data.role || 'USER')
          }
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error)
      }
    }

    getUser()
    fetchUserRole()

    return () => {
      mounted = false
    }
  }, [supabase])

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoadingStats(true)
        const response = await fetch('/api/stats/character')
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoadingStats(false)
      }
    }
    if (character) {
      loadStats()
    }
  }, [character])

  useEffect(() => {
    if (character) {
      setSelectedAvatar((character as any).avatar || 'men1')
    }
  }, [character])

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const saveAvatar = async () => {
    if (!character) return

    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/character/avatar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: selectedAvatar })
      })

      if (response.ok) {
        await fetchCharacter()
        setMessage({ type: 'success', text: 'Avatar updated successfully!' })
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to save avatar' })
      }
    } catch (error) {
      console.error('Failed to save avatar:', error)
      setMessage({ type: 'error', text: 'Failed to save avatar. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMessage(null)

    // Validation
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File too large! Maximum size is 2MB' })
      return
    }

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setMessage({ type: 'error', text: 'Invalid file type! Use JPG, PNG, WEBP or GIF' })
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/character/upload-avatar', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        await fetchCharacter()
        setSelectedAvatar('custom')
        setMessage({ type: 'success', text: 'Custom avatar uploaded successfully!' })
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Upload failed' })
      }
    } catch (error) {
      console.error('Failed to upload:', error)
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' })
    } finally {
      setIsUploading(false)
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

  const menAvatars = AVATAR_OPTIONS.filter(a => a.category === 'Men')
  const womenAvatars = AVATAR_OPTIONS.filter(a => a.category === 'Women')

  return (
    <div className="space-y-6 max-w-7xl mx-auto fade-in">
      {/* Header with Profile Card */}
      <div className="bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] border border-[#333] rounded-lg p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar
              icon={selectedAvatar}
              customUrl={(character as any).customAvatar}
              size="xl"
              className="border-4 border-[#5cb85c] shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#f0ad4e] text-white px-3 py-1 rounded-full border-2 border-[#0f0f0f] font-bold text-sm">
              LVL {character.level}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h1 className="text-3xl font-bold text-white">{username}</h1>
              {/* Role Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  userRole === 'ADMIN'
                    ? 'bg-[#d9534f]/20 border border-[#d9534f] text-[#d9534f]'
                    : userRole === 'MODERATOR'
                    ? 'bg-[#f0ad4e]/20 border border-[#f0ad4e] text-[#f0ad4e]'
                    : userRole === 'VIP'
                    ? 'bg-[#5bc0de]/20 border border-[#5bc0de] text-[#5bc0de]'
                    : 'bg-[#888]/20 border border-[#888] text-[#888]'
                }`}
              >
                {userRole === 'ADMIN' && '👑'}
                {userRole === 'MODERATOR' && '🛡️'}
                {userRole === 'VIP' && '⭐'}
                {userRole === 'USER' && '👤'}
                {userRole}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-sm text-[#888] mb-4">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#5cb85c]" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#5cb85c]" />
                <span>{character.city?.name || 'No City'}, {character.city?.country || ''}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Hash className="w-4 h-4 text-[#5cb85c]" />
                <span className="text-[#666]">ID: {character.userId.slice(0, 8)}...</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#0f0f0f] border border-[#333] rounded px-3 py-2">
                <p className="text-xs text-[#888]">Reputation</p>
                <p className="text-lg font-bold text-[#f0ad4e]">{character.reputation.toLocaleString()}</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#333] rounded px-3 py-2">
                <p className="text-xs text-[#888]">Experience</p>
                <p className="text-lg font-bold text-[#5cb85c]">{character.experience.toLocaleString()}</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#333] rounded px-3 py-2">
                <p className="text-xs text-[#888]">Cash</p>
                <p className="text-lg font-bold text-[#5cb85c]">${character.cash.toLocaleString()}</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#333] rounded px-3 py-2">
                <p className="text-xs text-[#888]">Strength</p>
                <p className="text-lg font-bold text-[#d9534f]">{character.strength}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`ls-section ${message.type === 'success' ? 'border-[#5cb85c]' : 'border-[#d9534f]'}`}>
          <div className="ls-section-content">
            <p className={`text-sm ${message.type === 'success' ? 'text-[#5cb85c]' : 'text-[#d9534f]'}`}>
              {message.text}
            </p>
          </div>
        </div>
      )}

      {/* Avatar Selection */}
      <div className="ls-section">
        <div className="ls-section-header flex items-center gap-2">
          <User className="w-4 h-4 text-[#f0ad4e]" />
          Avatar Selection
        </div>
        <div className="ls-section-content">
          {/* Men Avatars */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Male Characters
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {menAvatars.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedAvatar(option.id)}
                  className={`relative aspect-square border-2 rounded-lg transition-all hover:scale-105 overflow-hidden ${
                    selectedAvatar === option.id
                      ? 'border-[#5cb85c] ring-2 ring-[#5cb85c] ring-offset-2 ring-offset-[#0f0f0f]'
                      : 'border-[#333] hover:border-[#5cb85c]'
                  }`}
                >
                  <Avatar icon={option.id} size="lg" className="!border-0 !shadow-none w-full h-full" />
                  {selectedAvatar === option.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#5cb85c] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Women Avatars */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Female Characters
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {womenAvatars.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedAvatar(option.id)}
                  className={`relative aspect-square border-2 rounded-lg transition-all hover:scale-105 overflow-hidden ${
                    selectedAvatar === option.id
                      ? 'border-[#5cb85c] ring-2 ring-[#5cb85c] ring-offset-2 ring-offset-[#0f0f0f]'
                      : 'border-[#333] hover:border-[#5cb85c]'
                  }`}
                >
                  <Avatar icon={option.id} size="lg" className="!border-0 !shadow-none w-full h-full" />
                  {selectedAvatar === option.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#5cb85c] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Upload */}
          <div className="mb-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
            <p className="text-sm text-[#888] mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Or upload your own avatar
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="ls-btn ls-btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Uploading...' : 'Upload Custom Avatar'}
            </button>
            <p className="text-xs text-[#666] mt-2 text-center">
              Max 2MB • JPG, PNG, WEBP, GIF
            </p>
          </div>

          <button
            onClick={saveAvatar}
            disabled={isSaving || selectedAvatar === (character as any).avatar}
            className="ls-btn ls-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Avatar'}
          </button>
        </div>
      </div>

      {/* Statistics - GTA Style */}
      <div className="ls-section">
        <div className="ls-section-header flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#f0ad4e]" />
          Career Statistics
        </div>
        <div className="ls-section-content">
          {loadingStats ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent"></div>
            </div>
          ) : stats ? (
            <div className="space-y-6">
              {/* Financial Stats */}
              <div>
                <h3 className="text-xs font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Financial
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Total Earned</span>
                    </div>
                    <p className="text-lg font-bold text-[#5cb85c]">${stats.totalMoneyEarned.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-[#f0ad4e]" />
                      <span className="text-xs text-[#888]">Current Wealth</span>
                    </div>
                    <p className="text-lg font-bold text-[#f0ad4e]">${stats.currentWealth.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-[#d9534f]" />
                      <span className="text-xs text-[#888]">Dirty Cash</span>
                    </div>
                    <p className="text-lg font-bold text-[#d9534f]">${stats.dirtyCash.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Assets */}
              <div>
                <h3 className="text-xs font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Assets & Possessions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Car className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Vehicles</span>
                    </div>
                    <p className="text-2xl font-bold text-[#fff]">{stats.vehiclesOwned}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Home className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Properties</span>
                    </div>
                    <p className="text-2xl font-bold text-[#fff]">{stats.propertiesOwned}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Businesses</span>
                    </div>
                    <p className="text-2xl font-bold text-[#fff]">{stats.businessesOwned}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Crosshair className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Weapons</span>
                    </div>
                    <p className="text-2xl font-bold text-[#fff]">{stats.weaponsOwned}</p>
                  </div>
                </div>
              </div>

              {/* Criminal Record */}
              <div>
                <h3 className="text-xs font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Criminal Record
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-[#d9534f]" />
                      <span className="text-xs text-[#888]">Total Crimes</span>
                    </div>
                    <p className="text-2xl font-bold text-[#fff]">{stats.totalCrimes}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Success Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-[#5cb85c]">{stats.crimeSuccessRate}%</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-[#d9534f]" />
                      <span className="text-xs text-[#888]">Arrests</span>
                    </div>
                    <p className="text-2xl font-bold text-[#d9534f]">{stats.totalArrests}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-[#888]" />
                      <span className="text-xs text-[#888]">Deaths</span>
                    </div>
                    <p className="text-2xl font-bold text-[#fff]">{stats.deathCount}</p>
                  </div>
                </div>
              </div>

              {/* Physical Stats - Gym Trainable */}
              <div>
                <h3 className="text-xs font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Physical Stats (Gym Training)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">💪 Strength</span>
                      <span className="text-xs font-bold text-[#d9534f]">{stats.strength}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#d9534f] to-[#c9302c] h-2 rounded-full transition-all"
                        style={{ width: `${stats.strength}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">⚡ Stamina</span>
                      <span className="text-xs font-bold text-[#f0ad4e]">{stats.stamina}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#f0ad4e] to-[#ec971f] h-2 rounded-full transition-all"
                        style={{ width: `${stats.stamina}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">🛡️ Endurance</span>
                      <span className="text-xs font-bold text-[#5bc0de]">{stats.endurance}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#5bc0de] to-[#46b8da] h-2 rounded-full transition-all"
                        style={{ width: `${stats.endurance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">🏃 Speed</span>
                      <span className="text-xs font-bold text-[#5cb85c]">{stats.speed}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#5cb85c] to-[#4a9d4a] h-2 rounded-full transition-all"
                        style={{ width: `${stats.speed}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">🤸 Agility</span>
                      <span className="text-xs font-bold text-[#9b59b6]">{stats.agility}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] h-2 rounded-full transition-all"
                        style={{ width: `${stats.agility}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Criminal Skills */}
              <div>
                <h3 className="text-xs font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Criminal Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">Shooting</span>
                      <span className="text-xs font-bold text-[#5cb85c]">{stats.shooting}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#5cb85c] to-[#4a9d4a] h-2 rounded-full transition-all"
                        style={{ width: `${stats.shooting}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">Driving</span>
                      <span className="text-xs font-bold text-[#5cb85c]">{stats.driving}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#5cb85c] to-[#4a9d4a] h-2 rounded-full transition-all"
                        style={{ width: `${stats.driving}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">Stealth</span>
                      <span className="text-xs font-bold text-[#5cb85c]">{stats.stealth}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#5cb85c] to-[#4a9d4a] h-2 rounded-full transition-all"
                        style={{ width: `${stats.stealth}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#888]">Hacking</span>
                      <span className="text-xs font-bold text-[#5cb85c]">{stats.hacking}/100</span>
                    </div>
                    <div className="w-full bg-[#0f0f0f] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#5cb85c] to-[#4a9d4a] h-2 rounded-full transition-all"
                        style={{ width: `${stats.hacking}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Stats */}
              <div>
                <h3 className="text-xs font-bold text-[#f0ad4e] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Achievements
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[#5cb85c]" />
                      <span className="text-xs text-[#888]">Hours Worked</span>
                    </div>
                    <p className="text-lg font-bold text-[#fff]">{stats.totalJobHours.toFixed(1)}h</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-[#f0ad4e]" />
                      <span className="text-xs text-[#888]">Heists Done</span>
                    </div>
                    <p className="text-lg font-bold text-[#fff]">{stats.heistsCompleted}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#333] rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Map className="w-4 h-4 text-[#5bc0de]" />
                      <span className="text-xs text-[#888]">Days Played</span>
                    </div>
                    <p className="text-lg font-bold text-[#fff]">{stats.daysPlayed}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#888] text-center py-8">Failed to load statistics</p>
          )}
        </div>
      </div>
    </div>
  )
}
