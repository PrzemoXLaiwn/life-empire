'use client'

import { useEffect, useState, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from '@/components/ui/Avatar'
import { Crown, Skull, Flame, Star, Diamond, Rocket, Bot, Swords, Ship, Users, Check, Upload } from 'lucide-react'

const AVATAR_OPTIONS = [
  { id: 'crown', name: 'Crown', icon: Crown },
  { id: 'skull', name: 'Skull', icon: Skull },
  { id: 'fire', name: 'Fire', icon: Flame },
  { id: 'star', name: 'Star', icon: Star },
  { id: 'diamond', name: 'Diamond', icon: Diamond },
  { id: 'rocket', name: 'Rocket', icon: Rocket },
  { id: 'robot', name: 'Robot', icon: Bot },
  { id: 'ninja', name: 'Ninja', icon: Swords },
  { id: 'pirate', name: 'Pirate', icon: Ship },
  { id: 'alien', name: 'Alien', icon: Users }
]

export default function ProfilePage() {
  const { character, isLoading, fetchCharacter } = useCharacterStore()
  const [username, setUsername] = useState<string>('Player')
  const [email, setEmail] = useState<string>('')
  const [selectedAvatar, setSelectedAvatar] = useState<string>('crown')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.user_metadata?.username) {
        setUsername(user.user_metadata.username)
      } else {
        setUsername(user?.email?.split('@')[0] || 'Player')
      }
      setEmail(user?.email || '')
    }
    getUser()
  }, [supabase])

  useEffect(() => {
    if (character) {
      setSelectedAvatar((character as any).avatar || 'crown')
    }
  }, [character])

  const saveAvatar = async () => {
    if (!character) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/character/avatar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: selectedAvatar })
      })

      if (response.ok) {
        await fetchCharacter()
        alert('Avatar updated successfully!')
      }
    } catch (error) {
      console.error('Failed to save avatar:', error)
      alert('Failed to save avatar')
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Walidacja
    if (file.size > 2 * 1024 * 1024) {
      alert('File too large! Max 2MB')
      return
    }

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      alert('Invalid file type! Use JPG, PNG, WEBP or GIF')
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
        alert('Custom avatar uploaded!')
      } else {
        const error = await response.json()
        alert(error.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Failed to upload:', error)
      alert('Upload failed')
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-[#fff] mb-6">Profile</h1>

      {/* Avatar Selection */}
      <div className="ls-section">
        <div className="ls-section-header">
          🎭 Avatar Selection
        </div>
        <div className="ls-section-content">
          <div className="flex items-center gap-6 mb-6 p-4 bg-[#1a1a1a] border border-[#333] rounded">
            <Avatar 
              icon={selectedAvatar} 
              customUrl={(character as any).customAvatar}
              size="xl" 
            />
            <div>
              <h3 className="text-lg font-bold text-[#fff] mb-1">{username}</h3>
              <p className="text-sm text-[#888]">Level {character.level} • {character.city?.name || 'No City'}</p>
            </div>
          </div>

          <p className="text-sm text-[#888] mb-4">Choose your avatar:</p>
          
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-4">
            {AVATAR_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAvatar(option.id)}
                className={`relative p-3 border-2 rounded-lg transition-all hover:scale-105 ${
                  selectedAvatar === option.id
                    ? 'border-[#5cb85c] bg-[#5cb85c]/10'
                    : 'border-[#333] bg-[#1a1a1a] hover:border-[#5cb85c]'
                }`}
              >
                <option.icon className="w-8 h-8 text-[#5cb85c] mx-auto" />
                {selectedAvatar === option.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#5cb85c] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <p className="text-[10px] text-[#888] text-center mt-2">{option.name}</p>
              </button>
            ))}
          </div>

          {/* Custom Upload */}
          <div className="mb-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
            <p className="text-sm text-[#888] mb-3">Or upload your own:</p>
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

          <p className="text-xs text-[#666] mt-3 text-center">
            💡 Your avatar will be displayed in chat, leaderboards, and throughout the game
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Info */}
        <div className="ls-section">
          <div className="ls-section-header">Account Information</div>
          <div className="ls-section-content">
            <div className="ls-info-row">
              <span className="ls-info-label">Username:</span>
              <span className="ls-info-value">{username}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Email:</span>
              <span className="ls-info-value">{email}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">User ID:</span>
              <span className="ls-info-value text-[#666] text-xs">{character.userId.slice(0, 8)}...</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="ls-section">
          <div className="ls-section-header">Location</div>
          <div className="ls-section-content">
            {character.city ? (
              <>
                <div className="ls-info-row">
                  <span className="ls-info-label">City:</span>
                  <span className="ls-info-value">{character.city.name}</span>
                </div>
                <div className="ls-info-row">
                  <span className="ls-info-label">Country:</span>
                  <span className="ls-info-value">{character.city.country}</span>
                </div>
                <div className="ls-info-row">
                  <span className="ls-info-label">Description:</span>
                  <span className="ls-info-value text-xs text-[#888]">{character.city.description}</span>
                </div>
              </>
            ) : (
              <p className="text-[#888] text-sm">No city selected</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="ls-section">
          <div className="ls-section-header">Character Stats</div>
          <div className="ls-section-content">
            <div className="grid grid-cols-2 gap-2">
              <div className="ls-info-row">
                <span className="ls-info-label">Level:</span>
                <span className="ls-info-value">{character.level}</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Age:</span>
                <span className="ls-info-value">{character.age} years</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Reputation:</span>
                <span className="ls-info-value">{character.reputation}</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Rank:</span>
                <span className="ls-info-value">{character.rank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Stats */}
        <div className="ls-section">
          <div className="ls-section-header">Combat Stats</div>
          <div className="ls-section-content">
            <div className="grid grid-cols-2 gap-2">
              <div className="ls-info-row">
                <span className="ls-info-label">Strength:</span>
                <span className="ls-info-value">{character.strength}</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Defense:</span>
                <span className="ls-info-value">{character.defense}</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Speed:</span>
                <span className="ls-info-value">{character.speed}</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Dexterity:</span>
                <span className="ls-info-value">{character.dexterity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}