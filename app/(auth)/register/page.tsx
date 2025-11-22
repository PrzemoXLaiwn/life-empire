'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword) {
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

    setIsLoading(true)

    try {
      // Create Supabase Auth account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        console.error('Auth error:', authError)
        throw authError
      }
      if (!authData.user) throw new Error('Failed to create account')

      console.log('✅ Auth account created:', authData.user.id)

      // Wait a moment for auth to settle
      await new Promise(resolve => setTimeout(resolve, 500))

      // Create User record in database
      const userResponse = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId: authData.user.id,
          email: authData.user.email
        })
      })

      if (!userResponse.ok) {
        const userData = await userResponse.json()
        throw new Error(userData.error || 'Failed to create user record')
      }

      console.log('✅ User record created')

      // Redirect to /create-character to complete character setup
      router.push('/create-character')
    } catch (error: any) {
      console.error('Registration error:', error)
      setError(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#fff] uppercase tracking-wider mb-2">
            LIFE EMPIRE
          </h1>
          <p className="text-sm text-[#888]">Create Your Account</p>
        </div>

        {error && (
          <div className="ls-section mb-6">
            <div className="ls-section-content">
              <p className="text-danger text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="ls-section">
            <div className="ls-section-header">Account Details</div>
            <div className="ls-section-content space-y-4">
              <div>
                <label className="ls-info-label block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="ls-btn ls-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Continue'}
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
      </div>
    </div>
  )
}
