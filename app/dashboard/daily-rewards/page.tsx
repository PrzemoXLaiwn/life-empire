'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Gift,
  Calendar,
  Coins,
  CheckCircle,
  Circle,
  Flame,
  Trophy,
  Sparkles,
  ArrowLeft,
  Clock,
  Lock
} from 'lucide-react'

interface DailyReward {
  day: number
  claimed: boolean
  amount: number
}

interface DailyRewardsData {
  currentStreak: number
  maxStreak: number
  canClaimToday: boolean
  nextDay: number
  rewards: DailyReward[]
}

export default function DailyRewardsPage() {
  const router = useRouter()
  const [rewards, setRewards] = useState<DailyRewardsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [claimedReward, setClaimedReward] = useState<{ day: number; amount: number; newBalance: number } | null>(null)

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/daily-rewards')
      if (response.ok) {
        const data = await response.json()
        setRewards(data.rewards)
      } else {
        console.error('Failed to fetch rewards')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const claimReward = async () => {
    if (!rewards?.canClaimToday || claiming) return

    setClaiming(true)
    try {
      const response = await fetch('/api/daily-rewards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setClaimedReward(data.reward)
        setShowSuccess(true)
        
        // Odśwież dane po 2 sekundach
        setTimeout(async () => {
          await fetchRewards()
          setShowSuccess(false)
        }, 2000)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to claim reward')
      }
    } catch (error) {
      console.error('Failed to claim reward:', error)
      alert('Failed to claim reward. Please try again.')
    } finally {
      setClaiming(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f0ad4e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#888] text-lg">Loading rewards...</p>
        </div>
      </div>
    )
  }

  if (!rewards) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-16 h-16 text-[#d9534f] mx-auto mb-4" />
          <p className="text-[#888] text-lg">Failed to load rewards</p>
          <button
            onClick={fetchRewards}
            className="mt-4 px-6 py-2 bg-[#5cb85c] text-white rounded-lg hover:bg-[#4a9d4a] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 text-[#888] hover:text-white hover:bg-[#1a1a1a] border border-[#333] rounded transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#f0ad4e] to-[#d4af37] rounded-full animate-pulse">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white uppercase">Daily Rewards</h1>
          </div>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Claim your daily rewards and build your streak! The longer your streak, the bigger the rewards.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && claimedReward && (
          <div className="mb-8 bg-[#5cb85c]/10 border-2 border-[#5cb85c] rounded-lg p-6 animate-in fade-in slide-in-from-top duration-300">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-[#5cb85c] mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-[#5cb85c] mb-2">🎉 Reward Claimed!</h3>
              <p className="text-lg text-[#5cb85c] mb-2">
                Day {claimedReward.day}: <span className="font-bold">${claimedReward.amount.toLocaleString()}</span>
              </p>
              <p className="text-sm text-[#888]">
                New Balance: <span className="text-[#5cb85c] font-bold">${claimedReward.newBalance.toLocaleString()}</span>
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1a1a1a] border border-[#f0ad4e] rounded-lg p-6 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="w-6 h-6 text-[#f0ad4e]" />
              <span className="text-sm text-[#888] uppercase tracking-wider">Current Streak</span>
            </div>
            <div className="text-5xl font-bold text-[#f0ad4e] mb-2">{rewards.currentStreak}</div>
            <p className="text-xs text-[#666]">days in a row</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#5cb85c] rounded-lg p-6 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-[#5cb85c]" />
              <span className="text-sm text-[#888] uppercase tracking-wider">Max Streak</span>
            </div>
            <div className="text-5xl font-bold text-[#5cb85c] mb-2">{rewards.maxStreak}</div>
            <p className="text-xs text-[#666]">days total</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#5bc0de] rounded-lg p-6 text-center hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-6 h-6 text-[#5bc0de]" />
              <span className="text-sm text-[#888] uppercase tracking-wider">Next Reward</span>
            </div>
            <div className="text-3xl font-bold text-[#5bc0de] mb-2">
              {rewards.canClaimToday ? 'Available' : 'Tomorrow'}
            </div>
            <p className="text-xs text-[#666]">Day {rewards.nextDay}</p>
          </div>
        </div>

        {/* Claim Button */}
        {rewards.canClaimToday ? (
          <button
            onClick={claimReward}
            disabled={claiming}
            className="w-full mb-8 bg-gradient-to-r from-[#f0ad4e] to-[#d4af37] hover:from-[#e6a23c] hover:to-[#c4a030] text-black font-bold px-8 py-5 text-xl rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {claiming ? (
              <>
                <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Claiming Day {rewards.nextDay}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span>🎁 CLAIM DAY {rewards.nextDay} REWARD - ${REWARD_AMOUNTS[rewards.nextDay - 1]?.toLocaleString()}</span>
              </>
            )}
          </button>
        ) : (
          <div className="w-full mb-8 bg-[#1a1a1a] border-2 border-[#5cb85c] text-center p-6 rounded-lg">
            <CheckCircle className="w-12 h-12 text-[#5cb85c] mx-auto mb-3" />
            <p className="text-xl font-bold text-[#5cb85c]">✅ Already claimed today!</p>
            <p className="text-[#888] mt-2">Come back tomorrow for Day {rewards.nextDay}</p>
          </div>
        )}

        {/* Rewards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-8">
          {rewards.rewards.map((reward) => {
            const isNext = reward.day === rewards.nextDay && rewards.canClaimToday
            const isClaimed = reward.claimed
            const isLocked = !isClaimed && reward.day > rewards.nextDay

            return (
              <div
                key={reward.day}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                  isNext
                    ? 'bg-[#f0ad4e]/10 border-[#f0ad4e] shadow-lg shadow-[#f0ad4e]/30 scale-105 animate-pulse'
                    : isClaimed
                    ? 'bg-[#5cb85c]/10 border-[#5cb85c]'
                    : isLocked
                    ? 'bg-[#1a1a1a] border-[#333] opacity-50'
                    : 'bg-[#1a1a1a] border-[#555] hover:border-[#f0ad4e]'
                }`}
              >
                {/* Day Badge */}
                <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isNext ? 'bg-[#f0ad4e] text-black' : isClaimed ? 'bg-[#5cb85c] text-white' : 'bg-[#333] text-[#888]'
                }`}>
                  {reward.day}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-3">
                  {isClaimed ? (
                    <div className="w-12 h-12 rounded-full bg-[#5cb85c] flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                  ) : isNext ? (
                    <div className="w-12 h-12 rounded-full bg-[#f0ad4e] flex items-center justify-center animate-bounce">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                  ) : isLocked ? (
                    <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border-2 border-[#333] flex items-center justify-center">
                      <Lock className="w-6 h-6 text-[#666]" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#f0ad4e] flex items-center justify-center">
                      <Coins className="w-7 h-7 text-white" />
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div className="text-center">
                  <p className={`text-sm font-bold mb-1 ${
                    isNext ? 'text-[#f0ad4e]' : isClaimed ? 'text-[#5cb85c]' : 'text-[#888]'
                  }`}>
                    ${reward.amount.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-[#666] uppercase tracking-wider">
                    {isClaimed ? '✓ Claimed' : isNext ? 'Available' : isLocked ? 'Locked' : 'Pending'}
                  </p>
                </div>

                {/* Special Badge for Day 30 */}
                {reward.day === 30 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#f0ad4e] to-[#d4af37] text-black text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Max
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info Box */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-[#5bc0de] mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-3">📌 How Daily Rewards Work</h3>
              <ul className="text-[#888] space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#5cb85c] mt-0.5">✓</span>
                  <span>Log in every day to claim your reward and build your streak</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5cb85c] mt-0.5">✓</span>
                  <span>Rewards increase each day - Day 30 gives you <span className="text-[#f0ad4e] font-bold">$350,000</span>!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5cb85c] mt-0.5">✓</span>
                  <span>Complete all 30 days to reset the cycle and start earning again</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f0ad4e] mt-0.5">!</span>
                  <span>Missing a day won't reset your progress - pick up where you left off!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5bc0de] mt-0.5">💡</span>
                  <span>Rewards are instantly added to your cash balance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reward amounts constant for display
const REWARD_AMOUNTS = [
  1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000,
  35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 110000,
  120000, 140000, 160000, 180000, 200000, 220000, 240000, 260000, 300000, 350000
]