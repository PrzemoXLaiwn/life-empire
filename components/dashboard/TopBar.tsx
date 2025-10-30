'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Power, Crown, Zap, Heart, DollarSign, TrendingUp } from 'lucide-react'

export function TopBar() {
  const { character, isLoading } = useCharacterStore()
  const [username, setUsername] = useState<string>('Player')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUsername = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.user_metadata?.username) {
        setUsername(user.user_metadata.username)
      } else {
        setUsername(user?.email?.split('@')[0] || 'Player')
      }
    }
    
    getUsername()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoading || !character) {
    return (
      <div className="bg-[#0f0f0f] border-b border-[#333] px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 bg-[#1a1a1a] animate-pulse rounded"></div>
          <div className="h-10 w-64 bg-[#1a1a1a] animate-pulse rounded"></div>
        </div>
      </div>
    )
  }

  // Get city name and country flag
  const getCityDisplay = () => {
    if (!character.city) {
      return { flag: '🌍', name: 'No City' }
    }
    
    const countryFlags: Record<string, string> = {
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'Japan': '🇯🇵'
    }
    
    const flag = countryFlags[character.city.country] || '🌍'
    return { flag, name: character.city.name }
  }

  const city = getCityDisplay()
  const healthPercent = (character.health / character.maxHealth) * 100
  const energyPercent = (character.energy / character.maxEnergy) * 100

  return (
    <div className="bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] border-b border-[#333] shadow-lg">
      <div className="px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          {/* Left: User Info */}
          <div className="flex items-center gap-3">
            {/* Avatar with Level Badge */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5cb85c] to-[#4a9d4a] flex items-center justify-center border-2 border-[#5cb85c] shadow-lg shadow-[#5cb85c]/20">
                <Crown className="w-6 h-6 text-white" />
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#f0ad4e] border-2 border-[#0f0f0f] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{character.level}</span>
              </div>
            </div>

            {/* Username & Location */}
            <div>
              <p className="text-base font-bold text-[#fff] uppercase tracking-wider leading-tight">
                {username}
              </p>
              <p className="text-[10px] text-[#888] uppercase tracking-wider flex items-center gap-1">
                <span>{city.flag}</span>
                <span>{city.name}</span>
              </p>
            </div>
          </div>

          {/* Center: Stats */}
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap lg:flex-nowrap">
            {/* Cash */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded">
              <DollarSign className="w-4 h-4 text-[#5cb85c]" />
              <div>
                <p className="text-[9px] text-[#888] uppercase tracking-wider leading-tight">Cash</p>
                <p className="text-sm font-bold text-[#5cb85c]">
                  ${character.money.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Health */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded min-w-[120px]">
              <Heart className="w-4 h-4 text-[#d9534f]" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] text-[#888] uppercase tracking-wider">Health</p>
                  <span className="text-[10px] font-bold text-[#d9534f]">
                    {character.health}/{character.maxHealth}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#d9534f] to-[#c9302c] transition-all duration-300"
                    style={{ width: `${healthPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Energy */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded min-w-[120px]">
              <Zap className="w-4 h-4 text-[#f0ad4e]" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] text-[#888] uppercase tracking-wider">Energy</p>
                  <span className="text-[10px] font-bold text-[#f0ad4e]">
                    {character.energy}/{character.maxEnergy}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#f0ad4e] to-[#ec971f] transition-all duration-300"
                    style={{ width: `${energyPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Reputation */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded">
              <TrendingUp className="w-4 h-4 text-[#5bc0de]" />
              <div>
                <p className="text-[9px] text-[#888] uppercase tracking-wider leading-tight">Rep</p>
                <p className="text-sm font-bold text-[#5bc0de]">
                  {character.reputation.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Logout */}
          <button
            onClick={handleLogout}
            className="p-2.5 bg-[#1a1a1a] border border-[#333] hover:border-[#d9534f] hover:bg-[#d9534f]/10 transition-all rounded group ml-auto"
            title="Logout"
          >
            <Power className="w-5 h-5 text-[#d9534f] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Stats - Compact Version */}
      <div className="lg:hidden border-t border-[#333] px-4 py-2 bg-[#0f0f0f]">
        <div className="grid grid-cols-2 gap-2">
          {/* Cash & Rep */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] px-2 py-1.5 rounded text-xs">
            <DollarSign className="w-3 h-3 text-[#5cb85c]" />
            <span className="text-[#5cb85c] font-bold">${character.money.toLocaleString()}</span>
            <span className="text-[#666] mx-1">•</span>
            <TrendingUp className="w-3 h-3 text-[#5bc0de]" />
            <span className="text-[#5bc0de] font-bold">{character.reputation}</span>
          </div>

          {/* Level Badge */}
          <div className="flex items-center justify-center gap-2 bg-[#1a1a1a] px-2 py-1.5 rounded">
            <Crown className="w-3 h-3 text-[#f0ad4e]" />
            <span className="text-[10px] text-[#888] uppercase">Level</span>
            <span className="text-xs font-bold text-[#f0ad4e]">{character.level}</span>
          </div>

          {/* Health Bar */}
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#d9534f]" />
                <span className="text-[9px] text-[#888] uppercase">HP</span>
              </div>
              <span className="text-[9px] font-bold text-[#d9534f]">
                {character.health}/{character.maxHealth}
              </span>
            </div>
            <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#d9534f]"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>

          {/* Energy Bar */}
          <div className="bg-[#1a1a1a] px-2 py-1.5 rounded">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#f0ad4e]" />
                <span className="text-[9px] text-[#888] uppercase">Energy</span>
              </div>
              <span className="text-[9px] font-bold text-[#f0ad4e]">
                {character.energy}/{character.maxEnergy}
              </span>
            </div>
            <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#f0ad4e]"
                style={{ width: `${energyPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}