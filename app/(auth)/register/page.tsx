'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface City {
  id: string
  name: string
  country: string
  description: string
  crimeBonus: number
}

const COUNTRIES = [
  { code: 'USA', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'Japan', name: 'Japan', flag: '🇯🇵' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword || !username) {
      setError('All fields are required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    setStep(2)
  }

  const handleCountrySelect = async (countryCode: string) => {
    setSelectedCountry(countryCode)
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/cities')
      
      if (!response.ok) {
        throw new Error('Failed to load cities')
      }
      
      const data = await response.json()
      const countryCities = data.cities.filter(
        (c: City) => c.country === countryCode
      )
      
      if (countryCities.length === 0) {
        setError('No cities available in this country')
        return
      }
      
      setCities(countryCities)
      setStep(3)
    } catch (error) {
      setError('Failed to load cities. Please try again.')
      console.error('Load cities error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCitySelect = async (cityId: string) => {
    setSelectedCity(cityId)
  }

  const handleFinalSubmit = async () => {
    if (!selectedCity) {
      setError('Please select a city')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // 1. Create Supabase Auth account
      console.log('🔥 Step 1: Creating Supabase auth account...')
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { username }
        }
      })

      if (authError) {
        console.error('❌ Auth error:', authError)
        throw authError
      }
      if (!authData.user) throw new Error('Failed to create account')

      console.log('✅ Auth account created:', authData.user.id)

      // Wait for auth to settle
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 2. Create User record in Prisma database
      console.log('🔥 Step 2: Creating user record for:', authData.user.id)
      const userResponse = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId: authData.user.id,
          email: authData.user.email
        })
      })

      console.log('User response status:', userResponse.status)
      const userData = await userResponse.json()
      console.log('User response data:', userData)

      if (!userResponse.ok) {
        console.error('❌ User creation failed:', userData)
        throw new Error(userData.error || 'Failed to create user record')
      }

      console.log('✅ User created in database')

      // 3. Create character
      console.log('🔥 Step 3: Creating character...')
      const charResponse = await fetch('/api/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          cityId: selectedCity,
          username: username
        })
      })

      console.log('Character response status:', charResponse.status)
      const charData = await charResponse.json()
      console.log('Character response data:', charData)

      if (!charResponse.ok) {
        console.error('❌ Character creation failed:', charData)
        throw new Error(charData.error || 'Failed to create character')
      }

      console.log('✅ Character created!')

      // Success! Redirect to dashboard
      console.log('🎉 Registration complete! Redirecting...')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('❌ Registration error:', error)
      setError(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#fff] uppercase tracking-wider mb-2">
            LIFE EMPIRE
          </h1>
          <p className="text-sm text-[#888]">Create Your Account</p>
        </div>

        {/* Progress Steps */}
        <div className="ls-section mb-6">
          <div className="ls-section-content">
            <div className="flex items-center justify-between">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-success' : 'text-[#666]'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  step >= 1 ? 'bg-success text-[#0f0f0f]' : 'bg-[#2a2a2a] text-[#666]'
                }`}>
                  1
                </div>
                <p className="text-xs uppercase">Account</p>
              </div>
              <div className={`flex-1 h-[2px] ${step >= 2 ? 'bg-success' : 'bg-[#2a2a2a]'}`}></div>
              <div className={`flex-1 text-center ${step >= 2 ? 'text-success' : 'text-[#666]'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  step >= 2 ? 'bg-success text-[#0f0f0f]' : 'bg-[#2a2a2a] text-[#666]'
                }`}>
                  2
                </div>
                <p className="text-xs uppercase">Country</p>
              </div>
              <div className={`flex-1 h-[2px] ${step >= 3 ? 'bg-success' : 'bg-[#2a2a2a]'}`}></div>
              <div className={`flex-1 text-center ${step >= 3 ? 'text-success' : 'text-[#666]'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  step >= 3 ? 'bg-success text-[#0f0f0f]' : 'bg-[#2a2a2a] text-[#666]'
                }`}>
                  3
                </div>
                <p className="text-xs uppercase">City</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="ls-section mb-6">
            <div className="ls-section-content">
              <p className="text-danger text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* STEP 1: Account Details */}
        {step === 1 && (
          <form onSubmit={handleAccountSubmit}>
            <div className="ls-section">
              <div className="ls-section-header">Account Details</div>
              <div className="ls-section-content space-y-4">
                <div>
                  <label className="ls-info-label block mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                    required
                    minLength={3}
                  />
                </div>

                <div>
                  <label className="ls-info-label block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                    required
                  />
                </div>

                <div>
                  <label className="ls-info-label block mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label className="ls-info-label block mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                    required
                    minLength={8}
                  />
                </div>

                <button type="submit" className="ls-btn ls-btn-primary w-full">
                  Continue
                </button>

                <div className="text-center pt-4 border-t border-[#2a2a2a]">
                  <p className="text-xs text-[#888]">
                    Already have an account?{' '}
                    <Link href="/login" className="text-success hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: Country Selection */}
        {step === 2 && (
          <div className="ls-section">
            <div className="ls-section-header">Choose Your Country</div>
            <div className="ls-section-content">
              <p className="text-xs text-[#888] mb-4">
                Select the country where you want to start your criminal career.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code)}
                    disabled={isLoading}
                    className="ls-action-item text-left disabled:opacity-50"
                  >
                    <div className="ls-action-info">
                      <div className="ls-action-title">
                        <span className="mr-2 text-2xl">{country.flag}</span>
                        {country.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: City Selection */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="ls-section">
              <div className="ls-section-header">Choose Your Starting City</div>
              <div className="ls-section-content">
                <p className="text-xs text-[#888] mb-4">
                  Each city offers different opportunities. Choose wisely!
                </p>
                <div className="space-y-3">
                  {cities.map((city) => (
                    <div
                      key={city.id}
                      onClick={() => handleCitySelect(city.id)}
                      className={`ls-action-item cursor-pointer ${
                        selectedCity === city.id ? 'ring-2 ring-[#5cb85c]' : ''
                      }`}>
                      <div className="ls-action-info">
                        <div className="ls-action-title">{city.name}</div>
                        <div className="ls-action-details">
                          <span className="text-xs text-[#888]">{city.description}</span>
                        </div>
                        {city.crimeBonus > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-success">+{city.crimeBonus}% Crime Success</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              disabled={!selectedCity || isLoading}
              className="ls-btn ls-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}