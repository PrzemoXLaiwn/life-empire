'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface City {
  id: string
  name: string
  country: string
  description: string
  incomeBonus: number
  crimeBonus: number
  trainingBonus: number
  businessBonus: number
  minLevel: number
}

export default function CitySelectionPage() {
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAndLoadCities = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Check if user already has a character with a city
      const charResponse = await fetch(`/api/character?userId=${user.id}`)
      if (charResponse.ok) {
        const data = await charResponse.json()
        if (data.character?.cityId) {
          router.push('/dashboard')
          return
        }
      }

      // Load cities
      const response = await fetch('/api/cities')
      if (response.ok) {
        const data = await response.json()
        setCities(data.cities.filter((c: City) => c.minLevel === 1))
      }
      
      setIsLoading(false)
    }

    checkAndLoadCities()
  }, [router, supabase])

  const handleSelectCity = async () => {
    if (!selectedCity) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const response = await fetch('/api/character/city', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityId: selectedCity })
    })

    if (response.ok) {
      router.push('/dashboard')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#fff] uppercase tracking-wider mb-2">
            Choose Your Starting City
          </h1>
          <p className="text-sm text-[#888]">
            Your choice will affect your bonuses and opportunities. Choose wisely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cities.map((city) => (
            <div
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`ls-section cursor-pointer transition-all ${
                selectedCity === city.id ? 'ring-2 ring-[#5cb85c]' : ''
              }`}
            >
              <div className="ls-section-header">{city.name}, {city.country}</div>
              <div className="ls-section-content">
                <p className="text-xs text-[#888] mb-4">{city.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-2">
                    Bonuses:
                  </h4>
                  
                  {city.incomeBonus > 0 && (
                    <div className="ls-info-row">
                      <span className="ls-info-label">Income</span>
                      <span className="ls-info-value text-success">+{city.incomeBonus}%</span>
                    </div>
                  )}
                  
                  {city.crimeBonus > 0 && (
                    <div className="ls-info-row">
                      <span className="ls-info-label">Crime Success</span>
                      <span className="ls-info-value text-success">+{city.crimeBonus}%</span>
                    </div>
                  )}
                  
                  {city.trainingBonus > 0 && (
                    <div className="ls-info-row">
                      <span className="ls-info-label">Training</span>
                      <span className="ls-info-value text-success">+{city.trainingBonus}%</span>
                    </div>
                  )}
                  
                  {city.businessBonus > 0 && (
                    <div className="ls-info-row">
                      <span className="ls-info-label">Business Costs</span>
                      <span className="ls-info-value text-success">-{city.businessBonus}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSelectCity}
            disabled={!selectedCity}
            className="ls-btn ls-btn-primary text-base px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  )
}