'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Power } from 'lucide-react'

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
      <div className="bg-[#0f0f0f] border-b border-[#333] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-[#1a1a1a] animate-pulse"></div>
        </div>
      </div>
    )
  }

  const stats = [
    { 
      label: 'CASH', 
      value: `$${character.money.toLocaleString()}`, 
      color: 'text-success'
    },
    { 
      label: 'HP', 
      value: `${character.health}/${character.maxHealth}`, 
      color: 'text-success',
      percent: (character.health / character.maxHealth) * 100
    },
    { 
      label: 'ENERGY', 
      value: `${character.energy}/${character.maxEnergy}`, 
      color: 'text-warning',
      percent: (character.energy / character.maxEnergy) * 100
    },
    { 
      label: 'LVL', 
      value: character.level.toString(), 
      color: 'text-info'
    },
    { 
      label: 'REP', 
      value: character.reputation.toString(), 
      color: 'text-[#d0d0d0]'
    }
  ]

  // Get city name and country flag
  const getCityDisplay = () => {
    if (!character.city) {
      return 'NO CITY'
    }
    
    const countryFlags: Record<string, string> = {
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'Japan': '🇯🇵'
    }
    
    const flag = countryFlags[character.city.country] || '🌍'
    return `${flag} ${character.city.name}`
  }

  return (
    <div className="bg-[#0f0f0f] border-b border-[#333] px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Stats */}
        <div className="flex items-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div>
                <p className="text-[10px] text-[#888] uppercase tracking-wider leading-tight">
                  {stat.label}
                </p>
                <p className={`text-sm font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                {stat.percent !== undefined && (
                  <div className="w-16 h-[2px] bg-[#2a2a2a] mt-1">
                    <div 
                      className={`h-full ${stat.color === 'text-success' ? 'bg-[#5cb85c]' : 'bg-[#f0ad4e]'}`}
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[#fff] uppercase tracking-wider">
              {username}
            </p>
            <p className="text-[10px] text-[#888] uppercase tracking-wider">
              {getCityDisplay()}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 bg-[#1a1a1a] border border-[#333] hover:border-[#d9534f] hover:bg-[#d9534f]/10 transition-colors"
            title="Logout"
          >
            <Power className="w-4 h-4 text-[#d9534f]" />
          </button>
        </div>
      </div>
    </div>
  )
}