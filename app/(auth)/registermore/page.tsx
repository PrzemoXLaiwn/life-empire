'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Crown, Star, Zap, Target, Shield, Trophy } from 'lucide-react'

const AVATARS = [
  { id: 'crown', icon: Crown, label: 'Crown' },
  { id: 'star', icon: Star, label: 'Star' },
  { id: 'lightning', icon: Zap, label: 'Lightning' },
  { id: 'target', icon: Target, label: 'Target' },
  { id: 'shield', icon: Shield, label: 'Shield' },
  { id: 'trophy', icon: Trophy, label: 'Trophy' },
]

const GENDERS = [
  { id: 'male', label: 'Male', icon: '♂️' },
  { id: 'female', label: 'Female', icon: '♀️' },
  { id: 'other', label: 'Other', icon: '⚥' },
]

interface City {
  id: string
  name: string
  country: string
  description: string
  crimeBonus: number
  businessTaxRate: number
  specializations: string[]
}

export default function RegisterMorePage() {
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('crown')
  const [selectedCity, setSelectedCity] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/register')
        return
      }
    }

    // Load cities
    const loadCities = async () => {
      try {
        const response = await fetch('/api/cities')
        if (!response.ok) throw new Error('Failed to load cities')
        const data = await response.json()
        setCities(data.cities || [])
      } catch (error) {
        console.error('Failed to load cities:', error)
        setError('Failed to load cities')
      }
    }

    checkAuth()
    loadCities()
  }, [router, supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !gender || !selectedAvatar || !selectedCity) {
      setError('Please fill all fields')
      return
    }

    if (username.length < 3 || username.length > 20) {
      setError('Username must be 3-20 characters')
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores')
      return
    }

    setIsLoading(true)

    try {
      // Create character with all info
      const response = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username,
          gender,
          avatar: selectedAvatar,
          cityId: selectedCity,
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create character')
      }

      console.log('✅ Character created successfully!')

      // Redirect to login page
      router.push('/login')
    } catch (error: any) {
      console.error('Character creation error:', error)
      setError(error.message || 'Failed to create character')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#fff] uppercase tracking-wider mb-2">
            CREATE YOUR CHARACTER
          </h1>
          <p className="text-sm text-[#888]">Begin your journey to the top</p>
        </div>

        {error && (
          <div className="ls-section mb-6">
            <div className="ls-section-content">
              <p className="text-danger text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="ls-section">
            <div className="ls-section-header">1. Choose Username</div>
            <div className="ls-section-content">
              <label className="ls-info-label block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                placeholder="Enter your username"
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]+"
                disabled={isLoading}
              />
              <p className="text-xs text-[#666] mt-1">3-20 characters, alphanumeric and underscores only</p>
            </div>
          </div>

          {/* Gender */}
          <div className="ls-section">
            <div className="ls-section-header">2. Select Gender</div>
            <div className="ls-section-content">
              <div className="grid grid-cols-3 gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGender(g.id)}
                    disabled={isLoading}
                    className={`p-4 border border-[#333] bg-[#1a1a1a] hover:border-[#5cb85c] transition-all ${
                      gender === g.id ? 'border-[#5cb85c] bg-[#5cb85c]/10' : ''
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="text-3xl mb-2">{g.icon}</div>
                    <div className="text-sm text-[#d0d0d0]">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="ls-section">
            <div className="ls-section-header">3. Select Avatar</div>
            <div className="ls-section-content">
              <div className="grid grid-cols-6 gap-3">
                {AVATARS.map((avatar) => {
                  const Icon = avatar.icon
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id)}
                      disabled={isLoading}
                      className={`p-4 border border-[#333] bg-[#1a1a1a] hover:border-[#5cb85c] transition-all ${
                        selectedAvatar === avatar.id ? 'border-[#5cb85c] bg-[#5cb85c]/10' : ''
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <Icon className="w-6 h-6 mx-auto text-[#d0d0d0]" />
                      <p className="text-xs text-[#888] mt-1">{avatar.label}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* City Selection */}
          <div className="ls-section">
            <div className="ls-section-header">4. Select Starting City</div>
            <div className="ls-section-content">
              {cities.length === 0 ? (
                <p className="text-sm text-[#888]">Loading cities...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => setSelectedCity(city.id)}
                      disabled={isLoading}
                      className={`p-4 border border-[#333] bg-[#1a1a1a] text-left hover:border-[#5cb85c] transition-all ${
                        selectedCity === city.id ? 'border-[#5cb85c] bg-[#5cb85c]/10' : ''
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-bold text-[#fff]">{city.name}</h3>
                          <p className="text-xs text-[#888]">{city.country}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-success">+{city.crimeBonus}% CRIME BONUS</p>
                          <p className="text-xs text-[#888]">{(city.businessTaxRate * 100).toFixed(0)}% TAX</p>
                        </div>
                      </div>
                      <p className="text-xs text-[#888] mb-2">{city.description}</p>
                      {city.specializations && city.specializations.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {city.specializations.map((spec, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 bg-[#2a2a2a] text-[#888] rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="ls-btn ls-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!username || !gender || !selectedAvatar || !selectedCity || isLoading}
          >
            {isLoading ? 'Creating Character...' : 'Create Character & Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
