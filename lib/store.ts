import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Character {
  id: string
  name: string
  age: number
  level: number
  experience: number
  money: number
  energy: number
  maxEnergy: number
  health: number
  maxHealth: number
  strength: number
  defense: number
  speed: number
  dexterity: number
  education: string
  job: string | null
  salary: number
  crimesCommitted: number
  jailTime: number
  reputation: number
}

interface User {
  id: string
  email: string
  username: string
  character: Character | null
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateCharacter: (character: Character) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (token: string, user: User) => {
        set({ 
          token, 
          user, 
          isAuthenticated: true 
        })
      },
      
      logout: () => {
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        })
      },
      
      updateCharacter: (character: Character) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            character
          } : null
        }))
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)