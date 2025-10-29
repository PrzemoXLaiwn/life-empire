'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { createClient } from '@/lib/supabase/client'

export default function ProfilePage() {
  const { character, isLoading } = useCharacterStore()
  const [username, setUsername] = useState<string>('Player')
  const [email, setEmail] = useState<string>('')
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

  // Calculate city bonuses
  const cityBonuses = character.city ? [
    { label: 'Income Bonus', value: `+${character.city.incomeBonus}%`, active: character.city.incomeBonus > 0 },
    { label: 'Crime Success', value: `+${character.city.crimeBonus}%`, active: character.city.crimeBonus > 0 },
    { label: 'Training Speed', value: `+${character.city.trainingBonus}%`, active: character.city.trainingBonus > 0 },
    { label: 'Business Costs', value: `-${character.city.businessBonus}%`, active: character.city.businessBonus > 0 },
  ].filter(b => b.active) : []

  return (
    <div className="space-y-4 max-w-7xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-[#fff] mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* City Bonuses */}
        {cityBonuses.length > 0 && (
          <div className="ls-section">
            <div className="ls-section-header">🌆 City Bonuses</div>
            <div className="ls-section-content">
              <div className="space-y-2">
                {cityBonuses.map((bonus, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                    <span className="text-xs text-[#d0d0d0]">{bonus.label}</span>
                    <span className="text-sm font-bold text-success">{bonus.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#666] mt-3">
                💡 These bonuses are automatically applied to all your actions in {character.city?.name}
              </p>
            </div>
          </div>
        )}

        {/* Assets */}
        <div className="ls-section">
          <div className="ls-section-header">🚗 Assets & Travel</div>
          <div className="ls-section-content">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                <span className="text-xs text-[#d0d0d0]">Driver's License</span>
                <span className={`text-sm font-bold ${character.hasDriverLicense ? 'text-success' : 'text-danger'}`}>
                  {character.hasDriverLicense ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                <span className="text-xs text-[#d0d0d0]">Car</span>
                <span className={`text-sm font-bold ${character.hasCar ? 'text-success' : 'text-danger'}`}>
                  {character.hasCar ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                <span className="text-xs text-[#d0d0d0]">Private Plane</span>
                <span className={`text-sm font-bold ${character.hasPlane ? 'text-success' : 'text-danger'}`}>
                  {character.hasPlane ? '✓ Yes' : '✗ No'}
                </span>
              </div>
            </div>
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

        {/* Career */}
        <div className="ls-section">
          <div className="ls-section-header">Career</div>
          <div className="ls-section-content">
            <div className="ls-info-row">
              <span className="ls-info-label">Education:</span>
              <span className="ls-info-value">{character.education || 'None'}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Job:</span>
              <span className="ls-info-value">{character.job || 'Unemployed'}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Salary:</span>
              <span className="ls-info-value">${character.salary.toLocaleString()}/hr</span>
            </div>
          </div>
        </div>

        {/* Criminal Record */}
        <div className="ls-section">
          <div className="ls-section-header">Criminal Record</div>
          <div className="ls-section-content">
            <div className="ls-info-row">
              <span className="ls-info-label">Crimes Committed:</span>
              <span className="ls-info-value text-danger">{character.crimesCommitted}</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Jail Time:</span>
              <span className="ls-info-value text-danger">{character.jailTime} hours</span>
            </div>
            <div className="ls-info-row">
              <span className="ls-info-label">Criminal Rep:</span>
              <span className="ls-info-value">{character.criminalReputation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}