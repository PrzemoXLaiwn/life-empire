'use client'

import { create } from 'zustand'

export interface Character {
  id: string
  userId: string
  cityId: string | null
  city?: {
    id: string
    name: string
    country: string
    description: string
    incomeBonus: number      // DODAJ
    crimeBonus: number       // DODAJ
    trainingBonus: number    // DODAJ
    businessBonus: number    // DODAJ
    minLevel: number         // DODAJ
    requiresCar: boolean     // DODAJ
    requiresPlane: boolean   // DODAJ
  } | null
  
  money: number
  energy: number
  maxEnergy: number
  health: number
  maxHealth: number
  
  level: number
  xp: number
  xpNeeded: number
  age: number
  ageInDays: number
  
  reputation: number
  rank: number
  
  education: string | null
  job: string | null
  jobTitle: string | null
  salary: number
  
  strength: number
  defense: number
  speed: number
  dexterity: number
  
  crimesCommitted: number
  jailTime: number
  criminalReputation: number
  
  hasDriverLicense: boolean
  hasCar: boolean
  hasPlane: boolean
  
  lastEnergyRegen: Date
  lastHealthRegen: Date
  lastAgeIncrement: Date
  createdAt: Date
  updatedAt: Date
}

interface CharacterState {
  character: Character | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCharacter: () => Promise<void>
  updateCharacter: (updates: Partial<Character>) => void
  refreshCharacter: () => Promise<void>
  createCharacter: (userId: string, name: string) => Promise<void>
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  character: null,
  isLoading: false,
  error: null,

  fetchCharacter: async () => {
    try {
      set({ isLoading: true, error: null })
      
      // Dynamic import to avoid circular dependency
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.error('❌ No user authenticated')
        set({ isLoading: false, error: 'Not authenticated' })
        return
      }

      console.log('🔍 Fetching character for userId:', user.id)

      const response = await fetch(`/api/character?userId=${user.id}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch character: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.character) {
        console.log('⚠️ No character found, needs to be created')
        set({ isLoading: false, error: 'No character found' })
        return
      }

      const character = data.character
      
      // Convert date strings to Date objects
      character.lastEnergyRegen = new Date(character.lastEnergyRegen)
      character.lastHealthRegen = new Date(character.lastHealthRegen)
      character.lastAgeIncrement = new Date(character.lastAgeIncrement)
      character.createdAt = new Date(character.createdAt)
      character.updatedAt = new Date(character.updatedAt)
      
      console.log('✅ Character fetched:', character)
      
      set({ character, isLoading: false, error: null })
    } catch (error) {
      console.error('❌ Failed to fetch character:', error)
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch character'
      })
    }
  },

  createCharacter: async (userId: string, name: string) => {
    try {
      set({ isLoading: true, error: null })
      
      console.log('🎮 Creating character:', { userId, name })

      const response = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name })
      })

      if (!response.ok) {
        throw new Error(`Failed to create character: ${response.statusText}`)
      }

      const data = await response.json()
      const character = data.character
      
      // Convert date strings to Date objects
      character.lastEnergyRegen = new Date(character.lastEnergyRegen)
      character.lastHealthRegen = new Date(character.lastHealthRegen)
      character.lastAgeIncrement = new Date(character.lastAgeIncrement)
      character.createdAt = new Date(character.createdAt)
      character.updatedAt = new Date(character.updatedAt)
      
      console.log('✅ Character created:', character)
      
      set({ character, isLoading: false, error: null })
    } catch (error) {
      console.error('❌ Failed to create character:', error)
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create character'
      })
    }
  },

  updateCharacter: (updates) => {
    set((state) => ({
      character: state.character ? { ...state.character, ...updates } : null
    }))
  },

  refreshCharacter: async () => {
    await get().fetchCharacter()
  },
}))