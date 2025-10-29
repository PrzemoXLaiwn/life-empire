'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useCharacterStore } from '@/lib/character-store'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopBar } from '@/components/dashboard/TopBar'
import type { User } from '@supabase/supabase-js'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { fetchCharacter, character } = useCharacterStore()

  useEffect(() => {
    let mounted = true

    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!mounted) return
        
        if (!user) {
          router.push('/login')
          return
        }

        setUser(user)

        // Fetch character tylko raz
        if (!character) {
          await fetchCharacter()
          
          // Check if character was created
          setTimeout(async () => {
            if (!mounted) return
            
            const currentState = useCharacterStore.getState()
            
            if (!currentState.character) {
              console.log('🎮 Creating new character...')
              
              const response = await fetch('/api/character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  name: 'Player'
                })
              })

              if (response.ok) {
                await fetchCharacter()
              }
            }
            
            if (mounted) {
              setIsLoading(false)
            }
          }, 500)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Auth error:', error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    checkAuth()

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        } else if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, []) // TYLKO PUSTY ARRAY!

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
          <p className="text-slate-400">Loading your empire...</p>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
          <p className="text-slate-400">Setting up your character...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}