'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
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
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface DailyReward {
  day: number
  claimed: boolean
  amount: number
}

interface DailyRewardsData {
  currentStreak: number
  maxStreak: number
  canClaimToday: boolean
  rewards: DailyReward[]
}

export default function DailyRewardsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [rewards, setRewards] = useState<DailyRewardsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [claimedReward, setClaimedReward] = useState<{ day: number; amount: number } | null>(null)

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      const response = await fetch('/api/daily-rewards')
      if (response.ok) {
        const data = await response.json()
        setRewards(data.rewards)
      }
    } catch (error) {
      console.error('Failed to fetch rewards:', error)
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
        // Refresh rewards data
        await fetchRewards()
      }
    } catch (error) {
      console.error('Failed to claim reward:', error)
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="ghost"
            className="text-[#888] hover:text-white hover:bg-[#1a1a1a]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#f0ad4e] to-[#d4af37] rounded-full">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Daily Rewards</h1>
          </div>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Claim your daily rewards and build your streak! The longer your streak, the bigger the rewards.
          </p>
        </div>

        {/* Streak Info */}
        <Card className="bg-[#1a1a1a] border-[#333] p-6 mb-8">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-[#f0ad4e]" />
                <span className="text-sm text-[#888] uppercase">Current Streak</span>
              </div>
              <div className="text-3xl font-bold text-[#f0ad4e]">{rewards.currentStreak}</div>
            </div>

            <div className="w-px h-12 bg-[#333]"></div>

            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-[#5cb85c]" />
                <span className="text-sm text-[#888] uppercase">Max Streak</span>
              </div>
              <div className="text-3xl font-bold text-[#5cb85c]">{rewards.maxStreak}</div>
            </div>

            <div className="w-px h-12 bg-[#333]"></div>

            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#5bc0de]" />
                <span className="text-sm text-[#888] uppercase">Next Reward</span>
              </div>
              <div className="text-3xl font-bold text-[#5bc0de]">
                {rewards.canClaimToday ? 'Today' : 'Tomorrow'}
              </div>
            </div>
          </div>
        </Card>

        {/* Claim Button */}
        {rewards.canClaimToday && (
          <div className="text-center mb-8">
            <Button
              onClick={claimReward}
              disabled={claiming}
              className="bg-gradient-to-r from-[#f0ad4e] to-[#d4af37] hover:from-[#e6a23c] hover:to-[#c4a030] text-black font-bold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {claiming ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Claiming...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Claim Today's Reward
                </>
              )}
            </Button>
          </div>
        )}

        {/* Success Message */}
        {claimedReward && (
          <Card className="bg-[#5cb85c]/10 border-[#5cb85c] p-6 mb-8">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#5cb85c] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#5cb85c] mb-2">Reward Claimed!</h3>
              <p className="text-[#5cb85c]">
                You claimed ${claimedReward.amount.toLocaleString()} for Day {claimedReward.day}!
              </p>
            </div>
          </Card>
        )}

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {rewards.rewards.map((reward, index) => (
            <Card
              key={reward.day}
              className={`relative p-6 text-center transition-all duration-200 ${
                reward.claimed
                  ? 'bg-[#5cb85c]/10 border-[#5cb85c] shadow-lg shadow-[#5cb85c]/20'
                  : index === rewards.currentStreak - 1 && rewards.canClaimToday
                  ? 'bg-[#f0ad4e]/10 border-[#f0ad4e] shadow-lg shadow-[#f0ad4e]/20 animate-pulse'
                  : 'bg-[#1a1a1a] border-[#333] hover:border-[#555]'
              }`}
            >
              {/* Day Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#333] border-2 border-[#0f0f0f] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{reward.day}</span>
              </div>

              {/* Status Icon */}
              <div className="mb-4">
                {reward.claimed ? (
                  <CheckCircle className="w-12 h-12 text-[#5cb85c] mx-auto" />
                ) : index === rewards.currentStreak - 1 && rewards.canClaimToday ? (
                  <Gift className="w-12 h-12 text-[#f0ad4e] mx-auto animate-bounce" />
                ) : (
                  <Circle className="w-12 h-12 text-[#555] mx-auto" />
                )}
              </div>

              {/* Reward Amount */}
              <div className="mb-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Coins className="w-4 h-4 text-[#f0ad4e]" />
                  <span className="text-lg font-bold text-[#f0ad4e]">
                    ${reward.amount.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#888]">Cash Reward</p>
              </div>

              {/* Status Text */}
              <div className="text-xs">
                {reward.claimed ? (
                  <span className="text-[#5cb85c] font-medium">Claimed</span>
                ) : index === rewards.currentStreak - 1 && rewards.canClaimToday ? (
                  <span className="text-[#f0ad4e] font-medium animate-pulse">Available Now</span>
                ) : (
                  <span className="text-[#888]">Locked</span>
                )}
              </div>

              {/* Special Day Indicator */}
              {reward.day === 7 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#f0ad4e] to-[#d4af37] text-black text-xs px-2 py-1 rounded-full font-bold">
                    MAX REWARD
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="bg-[#1a1a1a] border-[#333] p-6 mt-8">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-[#5bc0de] mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">How Daily Rewards Work</h3>
              <ul className="text-[#888] space-y-2 text-sm">
                <li>• Claim your reward every day to maintain your streak</li>
                <li>• Missing a day resets your streak back to 1</li>
                <li>• Higher streaks unlock bigger rewards</li>
                <li>• Rewards are automatically added to your cash balance</li>
                <li>• Complete the 7-day cycle to maximize your earnings</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
