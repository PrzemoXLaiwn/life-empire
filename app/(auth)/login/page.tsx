'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    if (data.user) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#fff] uppercase tracking-wider mb-2">
            LIFE SYNDICATE
          </h1>
          <p className="text-sm text-[#888]">Build Your Empire</p>
        </div>

        {/* Login Form */}
        <div className="ls-section">
          <div className="ls-section-header">Login</div>
          <div className="ls-section-content">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="ls-info-label block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                />
              </div>

              <div>
                <label className="ls-info-label block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#333] text-[#d0d0d0] text-sm focus:outline-none focus:border-[#5cb85c]"
                />
              </div>

              {error && (
                <div className="bg-[#d9534f]/10 border border-[#d9534f] text-[#d9534f] px-3 py-2 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="ls-btn ls-btn-primary w-full disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'LOGIN'}
              </button>

              <div className="text-center pt-4 border-t border-[#2a2a2a]">
                <p className="text-xs text-[#888]">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-success hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}