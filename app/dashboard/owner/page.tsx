'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCharacterStore } from '@/lib/character-store'
import { DollarSign, TrendingUp, Heart, Zap, Target, Award, Brain, Users, Lock, Code } from 'lucide-react'

export default function OwnerDashboard() {
  const router = useRouter()
  const supabase = createClient()
  const { character, isLoading: characterLoading, refresh } = useCharacterStore()

  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Financial
  const [cash, setCash] = useState(0)
  const [dirtyCash, setDirtyCash] = useState(0)
  const [bankBalance, setBankBalance] = useState(0)

  // Level & XP
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [reputation, setReputation] = useState(0)

  // Health & Energy
  const [health, setHealth] = useState(100)
  const [maxHealth, setMaxHealth] = useState(100)
  const [energy, setEnergy] = useState(100)
  const [maxEnergy, setMaxEnergy] = useState(100)

  // Attributes
  const [strength, setStrength] = useState(10)
  const [intelligence, setIntelligence] = useState(10)
  const [charisma, setCharisma] = useState(10)
  const [stamina, setStamina] = useState(10)

  // Physical Stats
  const [endurance, setEndurance] = useState(10)
  const [speed, setSpeed] = useState(10)
  const [agility, setAgility] = useState(10)

  // Criminal Skills
  const [shooting, setShooting] = useState(0)
  const [driving, setDriving] = useState(0)
  const [stealth, setStealth] = useState(0)
  const [lockpicking, setLockpicking] = useState(0)
  const [hacking, setHacking] = useState(0)

  // Business Skills
  const [management, setManagement] = useState(0)
  const [negotiation, setNegotiation] = useState(0)
  const [accounting, setAccounting] = useState(0)
  const [marketing, setMarketing] = useState(0)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        const response = await fetch('/api/user/role')
        if (response.ok) {
          const data = await response.json()
          setUserRole(data.role)

          if (data.role !== 'OWNER') {
            router.push('/dashboard')
            return
          }
        }
      } catch (error) {
        console.error('Failed to check access:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [router, supabase.auth])

  useEffect(() => {
    if (character) {
      // Initialize all values from current character
      setCash(character.cash || 0)
      setDirtyCash(character.dirtyCash || 0)
      setBankBalance(character.bankBalance || 0)
      setLevel(character.level || 1)
      setExperience(character.experience || 0)
      setReputation(character.reputation || 0)
      setHealth(character.health || 100)
      setMaxHealth(character.maxHealth || 100)
      setEnergy(character.energy || 100)
      setMaxEnergy(character.maxEnergy || 100)
      setStrength(character.strength || 10)
      setIntelligence(character.intelligence || 10)
      setCharisma(character.charisma || 10)
      setStamina(character.stamina || 10)
      setEndurance(character.endurance || 10)
      setSpeed(character.speed || 10)
      setAgility(character.agility || 10)
      setShooting(character.shooting || 0)
      setDriving(character.driving || 0)
      setStealth(character.stealth || 0)
      setLockpicking(character.lockpicking || 0)
      setHacking(character.hacking || 0)
      setManagement(character.management || 0)
      setNegotiation(character.negotiation || 0)
      setAccounting(character.accounting || 0)
      setMarketing(character.marketing || 0)
    }
  }, [character])

  const handleSave = async () => {
    setIsSaving(true)
    setSuccessMessage('')

    try {
      const response = await fetch('/api/owner/modify-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cash, dirtyCash, bankBalance,
          level, experience, reputation,
          health, maxHealth, energy, maxEnergy,
          strength, intelligence, charisma, stamina,
          endurance, speed, agility,
          shooting, driving, stealth, lockpicking, hacking,
          management, negotiation, accounting, marketing
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save stats')
      }

      const data = await response.json()
      console.log('Stats saved:', data)

      // Refresh character data
      refresh()

      setSuccessMessage(`✅ Successfully updated ${data.modified.length} stats!`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Failed to save stats:', error)
      alert('Failed to save stats')
    } finally {
      setIsSaving(false)
    }
  }

  const handleQuickMax = () => {
    setCash(999999999)
    setDirtyCash(0)
    setBankBalance(999999999)
    setLevel(100)
    setExperience(999999)
    setReputation(999999)
    setHealth(999)
    setMaxHealth(999)
    setEnergy(999)
    setMaxEnergy(999)
    setStrength(100)
    setIntelligence(100)
    setCharisma(100)
    setStamina(100)
    setEndurance(100)
    setSpeed(100)
    setAgility(100)
    setShooting(100)
    setDriving(100)
    setStealth(100)
    setLockpicking(100)
    setHacking(100)
    setManagement(100)
    setNegotiation(100)
    setAccounting(100)
    setMarketing(100)
  }

  if (isLoading || characterLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#888]">Loading...</p>
      </div>
    )
  }

  if (userRole !== 'OWNER') {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Code className="w-8 h-8 text-[#9b59b6]" />
            <h1 className="text-2xl font-bold text-[#fff] uppercase tracking-wider">
              💎 OWNER DEVELOPER PANEL
            </h1>
          </div>
          <p className="text-sm text-[#888]">
            Full control over your character stats for testing purposes
          </p>
        </div>

        {successMessage && (
          <div className="ls-section mb-6">
            <div className="ls-section-content">
              <p className="text-success text-sm">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="ls-section mb-6">
          <div className="ls-section-header">
            <Zap className="w-4 h-4" />
            Quick Actions
          </div>
          <div className="ls-section-content">
            <div className="flex gap-3">
              <button
                onClick={handleQuickMax}
                className="ls-btn ls-btn-primary flex-1"
              >
                ⚡ MAX ALL STATS
              </button>
              <button
                onClick={() => {
                  setCash(1000000)
                  setBankBalance(1000000)
                }}
                className="ls-btn ls-btn-success flex-1"
              >
                💰 $1M Cash
              </button>
              <button
                onClick={() => {
                  setLevel(50)
                  setExperience(50000)
                }}
                className="ls-btn flex-1"
              >
                📈 Level 50
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial */}
          <div className="ls-section">
            <div className="ls-section-header">
              <DollarSign className="w-4 h-4" />
              Financial
            </div>
            <div className="ls-section-content space-y-4">
              <div>
                <label className="ls-info-label block mb-2">Cash</label>
                <input
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                />
              </div>
              <div>
                <label className="ls-info-label block mb-2">Dirty Cash</label>
                <input
                  type="number"
                  value={dirtyCash}
                  onChange={(e) => setDirtyCash(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                />
              </div>
              <div>
                <label className="ls-info-label block mb-2">Bank Balance</label>
                <input
                  type="number"
                  value={bankBalance}
                  onChange={(e) => setBankBalance(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                />
              </div>
            </div>
          </div>

          {/* Level & Progression */}
          <div className="ls-section">
            <div className="ls-section-header">
              <TrendingUp className="w-4 h-4" />
              Level & Progression
            </div>
            <div className="ls-section-content space-y-4">
              <div>
                <label className="ls-info-label block mb-2">Level</label>
                <input
                  type="number"
                  value={level}
                  onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                />
              </div>
              <div>
                <label className="ls-info-label block mb-2">Experience</label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                />
              </div>
              <div>
                <label className="ls-info-label block mb-2">Reputation</label>
                <input
                  type="number"
                  value={reputation}
                  onChange={(e) => setReputation(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                />
              </div>
            </div>
          </div>

          {/* Health & Energy */}
          <div className="ls-section">
            <div className="ls-section-header">
              <Heart className="w-4 h-4" />
              Health & Energy
            </div>
            <div className="ls-section-content space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="ls-info-label block mb-2">Health</label>
                  <input
                    type="number"
                    value={health}
                    onChange={(e) => setHealth(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Max Health</label>
                  <input
                    type="number"
                    value={maxHealth}
                    onChange={(e) => setMaxHealth(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="ls-info-label block mb-2">Energy</label>
                  <input
                    type="number"
                    value={energy}
                    onChange={(e) => setEnergy(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Max Energy</label>
                  <input
                    type="number"
                    value={maxEnergy}
                    onChange={(e) => setMaxEnergy(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="ls-section">
            <div className="ls-section-header">
              <Award className="w-4 h-4" />
              Core Attributes
            </div>
            <div className="ls-section-content space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="ls-info-label block mb-2">Strength</label>
                  <input
                    type="number"
                    value={strength}
                    onChange={(e) => setStrength(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Intelligence</label>
                  <input
                    type="number"
                    value={intelligence}
                    onChange={(e) => setIntelligence(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Charisma</label>
                  <input
                    type="number"
                    value={charisma}
                    onChange={(e) => setCharisma(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Stamina</label>
                  <input
                    type="number"
                    value={stamina}
                    onChange={(e) => setStamina(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Physical Stats */}
          <div className="ls-section">
            <div className="ls-section-header">
              <Target className="w-4 h-4" />
              Physical Stats (Gym)
            </div>
            <div className="ls-section-content space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="ls-info-label block mb-2">Endurance</label>
                  <input
                    type="number"
                    value={endurance}
                    onChange={(e) => setEndurance(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Speed</label>
                  <input
                    type="number"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Agility</label>
                  <input
                    type="number"
                    value={agility}
                    onChange={(e) => setAgility(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Criminal Skills */}
          <div className="ls-section">
            <div className="ls-section-header">
              <Lock className="w-4 h-4" />
              Criminal Skills
            </div>
            <div className="ls-section-content space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="ls-info-label block mb-2">Shooting</label>
                  <input
                    type="number"
                    value={shooting}
                    onChange={(e) => setShooting(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Driving</label>
                  <input
                    type="number"
                    value={driving}
                    onChange={(e) => setDriving(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Stealth</label>
                  <input
                    type="number"
                    value={stealth}
                    onChange={(e) => setStealth(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Lockpicking</label>
                  <input
                    type="number"
                    value={lockpicking}
                    onChange={(e) => setLockpicking(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Hacking</label>
                  <input
                    type="number"
                    value={hacking}
                    onChange={(e) => setHacking(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Skills */}
          <div className="ls-section">
            <div className="ls-section-header">
              <Brain className="w-4 h-4" />
              Business Skills
            </div>
            <div className="ls-section-content space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="ls-info-label block mb-2">Management</label>
                  <input
                    type="number"
                    value={management}
                    onChange={(e) => setManagement(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Negotiation</label>
                  <input
                    type="number"
                    value={negotiation}
                    onChange={(e) => setNegotiation(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Accounting</label>
                  <input
                    type="number"
                    value={accounting}
                    onChange={(e) => setAccounting(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
                <div>
                  <label className="ls-info-label block mb-2">Marketing</label>
                  <input
                    type="number"
                    value={marketing}
                    onChange={(e) => setMarketing(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#9b59b6]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="ls-btn ls-btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : '💾 SAVE ALL CHANGES'}
          </button>
        </div>
      </div>
    </div>
  )
}
