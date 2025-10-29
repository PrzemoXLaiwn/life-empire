'use client'

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'

export default function AirportPage() {
  const { character, fetchCharacter } = useCharacterStore()
  const [citiesByCountry, setCitiesByCountry] = useState<Record<string, any[]>>({})
  const [currentCity, setCurrentCity] = useState<any>(null)
  const [hasPlane, setHasPlane] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTraveling, setIsTraveling] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadDestinations()
  }, [])

  const loadDestinations = async () => {
    try {
      const response = await fetch('/api/travel')
      if (response.ok) {
        const data = await response.json()
        
        // Filter only cities in OTHER countries
        const otherCountries: Record<string, any[]> = {}
        
        Object.entries(data.citiesByCountry).forEach(([country, cities]: [string, any]) => {
          if (!data.currentCity || country !== data.currentCity.country) {
            otherCountries[country] = cities
          }
        })
        
        setCitiesByCountry(otherCountries)
        setCurrentCity(data.currentCity)
        setHasPlane(data.hasPlane)
      }
    } catch (error) {
      console.error('Failed to load destinations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTravel = async (cityId: string, cityName: string) => {
    if (!confirm(`Fly to ${cityName}?`)) return

    setIsTraveling(true)
    setError('')

    try {
      const response = await fetch('/api/travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId })
      })

      const data = await response.json()

      if (response.ok) {
        await fetchCharacter()
        await loadDestinations()
        alert(`Successfully flew to ${cityName}!`)
      } else {
        setError(data.error || 'Failed to travel')
      }
    } catch (error) {
      setError('Failed to travel')
      console.error('Travel error:', error)
    } finally {
      setIsTraveling(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading...</p>
        </div>
      </div>
    )
  }

  if (!character) return null

  return (
    <div className="space-y-4 max-w-7xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-[#fff] mb-6">✈️ International Airport</h1>

      {error && (
        <div className="ls-section">
          <div className="ls-section-content">
            <p className="text-danger text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Current Location */}
      <div className="ls-section">
        <div className="ls-section-header">Current Location</div>
        <div className="ls-section-content">
          {currentCity ? (
            <>
              <div className="ls-info-row">
                <span className="ls-info-label">City:</span>
                <span className="ls-info-value">{currentCity.name}</span>
              </div>
              <div className="ls-info-row">
                <span className="ls-info-label">Country:</span>
                <span className="ls-info-value">{currentCity.country}</span>
              </div>
            </>
          ) : (
            <p className="text-[#888] text-sm">No city selected</p>
          )}
        </div>
      </div>

      {/* Plane Status */}
      <div className="ls-section">
        <div className="ls-section-header">Private Plane</div>
        <div className="ls-section-content">
          <div className="ls-info-row">
            <span className="ls-info-label">Status:</span>
            <span className={`ls-info-value ${hasPlane ? 'text-success' : 'text-danger'}`}>
              {hasPlane ? '✓ Owned' : '✗ Not Owned'}
            </span>
          </div>
          {!hasPlane && (
            <p className="text-xs text-[#888] mt-3">
              💡 You need to buy a private plane from the Market to travel internationally!
            </p>
          )}
        </div>
      </div>

      {/* International Destinations */}
      {Object.keys(citiesByCountry).length === 0 ? (
        <div className="ls-section">
          <div className="ls-section-content">
            <p className="text-[#888] text-sm">No international destinations available.</p>
          </div>
        </div>
      ) : (
        Object.entries(citiesByCountry).map(([country, cities]) => (
          <div key={country} className="ls-section">
            <div className="ls-section-header">🌍 {country}</div>
            <div className="ls-section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className={`ls-section ${city.locked ? 'opacity-50' : ''}`}
                  >
                    <div className="ls-section-header">
                      {city.name}
                    </div>
                    <div className="ls-section-content">
                      <p className="text-xs text-[#888] mb-3">{city.description}</p>

                      {/* Requirements */}
                      <div className="mb-3 pb-3 border-b border-[#2a2a2a]">
                        <p className="text-[10px] font-bold text-[#888] uppercase mb-2">Requirements:</p>
                        <div className="space-y-1">
                          <p className="text-xs">
                            <span className="text-[#888]">Level:</span>{' '}
                            <span className={character.level >= city.requirements.level ? 'text-success' : 'text-danger'}>
                              {city.requirements.level}
                            </span>
                          </p>
                          <p className="text-xs">
                            <span className="text-[#888]">Plane:</span>{' '}
                            <span className={hasPlane ? 'text-success' : 'text-danger'}>
                              {hasPlane ? 'Yes' : 'Required'}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Travel Info */}
                      <div className="mb-3">
                        <div className="ls-info-row">
                          <span className="ls-info-label">Flight Cost:</span>
                          <span className="ls-info-value text-warning">
                            ${city.travelCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="ls-info-row">
                          <span className="ls-info-label">Energy:</span>
                          <span className="ls-info-value text-warning">
                            -{city.energyCost}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleTravel(city.id, city.name)}
                        disabled={!city.canTravel || isTraveling}
                        className="ls-btn ls-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {city.canTravel 
                          ? '✈️ Fly'
                          : city.blockedReason
                        }
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}