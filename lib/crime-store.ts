import { create } from 'zustand'
import { useCharacterStore } from './character-store'

export interface Crime {
  id: string
  name: string
  energyCost: number
  minReward: number
  maxReward: number
  successRate: number
  xpReward: number
  description: string
  jailTimeOnFail: number
}

export const CRIMES: Crime[] = [
  {
    id: 'pickpocket',
    name: 'Pickpocket',
    energyCost: 10,
    minReward: 50,
    maxReward: 200,
    successRate: 95,
    xpReward: 5,
    description: 'Steal from an unsuspecting person',
    jailTimeOnFail: 15,
  },
  {
    id: 'shoplift',
    name: 'Shoplift',
    energyCost: 15,
    minReward: 200,
    maxReward: 500,
    successRate: 90,
    xpReward: 10,
    description: 'Steal items from a store',
    jailTimeOnFail: 30,
  },
  {
    id: 'car_theft',
    name: 'Car Theft',
    energyCost: 25,
    minReward: 1000,
    maxReward: 5000,
    successRate: 75,
    xpReward: 25,
    description: 'Steal and sell a car',
    jailTimeOnFail: 60,
  },
  {
    id: 'house_robbery',
    name: 'House Robbery',
    energyCost: 30,
    minReward: 5000,
    maxReward: 20000,
    successRate: 60,
    xpReward: 50,
    description: 'Rob a house while the owners are away',
    jailTimeOnFail: 120,
  },
  {
    id: 'bank_heist',
    name: 'Bank Heist',
    energyCost: 50,
    minReward: 50000,
    maxReward: 200000,
    successRate: 40,
    xpReward: 150,
    description: 'Pull off a major bank heist',
    jailTimeOnFail: 360,
  },
]

interface CrimeResult {
  success: boolean
  crime: Crime
  moneyGained?: number
  xpGained?: number
  jailTime?: number
  message: string
  leveledUp?: boolean
}

interface CrimeState {
  isCommitting: boolean
  lastResult: CrimeResult | null
  
  commitCrime: (crimeId: string) => Promise<CrimeResult>
  clearLastResult: () => void
}

export const useCrimeStore = create<CrimeState>((set, get) => ({
  isCommitting: false,
  lastResult: null,

  commitCrime: async (crimeId: string) => {
    const { isCommitting } = get()
    
    if (isCommitting) {
      return {
        success: false,
        crime: CRIMES[0],
        message: 'You are already committing a crime!',
      }
    }

    const crime = CRIMES.find(c => c.id === crimeId)
    if (!crime) {
      return {
        success: false,
        crime: CRIMES[0],
        message: 'Crime not found!',
      }
    }

    set({ isCommitting: true })

    try {
      const userId = localStorage.getItem('userId')
      
      if (!userId) {
        set({ isCommitting: false })
        return {
          success: false,
          crime,
          message: 'Not authenticated!',
        }
      }

      const response = await fetch('/api/crime/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ crimeId }),
      })

      const data = await response.json()

      if (!response.ok) {
        set({ isCommitting: false })
        return {
          success: false,
          crime,
          message: data.error || 'Failed to commit crime',
        }
      }

      // Update character in store
      const characterStore = useCharacterStore.getState()
      
      // Convert date strings to Date objects
      const updatedCharacter = {
        ...data.character,
        lastEnergyRegen: new Date(data.character.lastEnergyRegen),
        lastHealthRegen: new Date(data.character.lastHealthRegen),
        lastAgeIncrement: new Date(data.character.lastAgeIncrement),
        createdAt: new Date(data.character.createdAt),
        updatedAt: new Date(data.character.updatedAt),
      }
      
      characterStore.updateCharacter(updatedCharacter)

      const result = {
        success: data.success,
        crime,
        message: data.message,
        moneyGained: data.moneyGained,
        xpGained: data.xpGained,
        jailTime: data.jailTime,
        leveledUp: data.leveledUp,
      }

      set({ 
        isCommitting: false,
        lastResult: result,
      })

      return result
    } catch (error) {
      console.error('Crime commit error:', error)
      set({ isCommitting: false })
      return {
        success: false,
        crime,
        message: 'Network error! Please try again.',
      }
    }
  },

  clearLastResult: () => set({ lastResult: null }),
}))