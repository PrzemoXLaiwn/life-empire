'use client'

import { useEffect, useState } from 'react'
import { Trophy, Crown, Medal, Award, Star } from 'lucide-react'
import { LeaderboardPlayer } from '@/lib/types'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-[#f0ad4e]" />
      case 2:
        return <Medal className="w-6 h-6 text-[#c0c0c0]" />
      case 3:
        return <Award className="w-6 h-6 text-[#cd7f32]" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#888]">{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-[#f0ad4e] to-[#ec971f] text-[#fff]'
      case 2:
        return 'bg-gradient-to-r from-[#c0c0c0] to-[#a8a8a8] text-[#fff]'
      case 3:
        return 'bg-gradient-to-r from-[#cd7f32] to-[#b87333] text-[#fff]'
      default:
        return 'bg-[#1a1a1a] border border-[#333] text-[#888]'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading Leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-[#f0ad4e]" />
          <h1 className="text-3xl font-bold text-[#fff]">Leaderboard</h1>
        </div>
        <p className="text-[#888] text-sm">Top players in the game</p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-[#333] bg-[#0f0f0f]">
          <div className="grid grid-cols-12 gap-4 text-xs font-bold text-[#888] uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Player</div>
            <div className="col-span-2">Level</div>
            <div className="col-span-2">Reputation</div>
            <div className="col-span-2">Cash</div>
            <div className="col-span-2">Job</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#333]">
          {leaderboard.map((player) => (
            <div
              key={player.id}
              className="px-6 py-4 hover:bg-[#0f0f0f] transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Rank */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankColor(player.rank)}`}>
                    {getRankIcon(player.rank)}
                  </div>
                </div>

                {/* Player Info */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#888]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#fff]">{player.username}</p>
                      {player.gang && (
                        <p className="text-xs text-[#666]">{player.gang}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#f0ad4e]" />
                    <span className="text-sm font-bold text-[#fff]">{player.level}</span>
                  </div>
                </div>

                {/* Reputation */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#5bc0de]" />
                    <span className="text-sm font-bold text-[#fff]">{player.reputation.toLocaleString()}</span>
                  </div>
                </div>

                {/* Cash */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#5cb85c]">${player.cash.toLocaleString()}</span>
                  </div>
                </div>

                {/* Job */}
                <div className="col-span-2">
                  <span className="text-sm text-[#888]">{player.job}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 text-[#f0ad4e] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#fff]">{leaderboard.length}</p>
          <p className="text-xs text-[#888] uppercase">Total Players</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 text-center">
          <Crown className="w-8 h-8 text-[#f0ad4e] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#fff]">{leaderboard[0]?.level || 0}</p>
          <p className="text-xs text-[#888] uppercase">Highest Level</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 text-center">
          <Star className="w-8 h-8 text-[#5cb85c] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[#fff]">${leaderboard[0]?.cash.toLocaleString() || 0}</p>
          <p className="text-xs text-[#888] uppercase">Richest Player</p>
        </div>
      </div>
    </div>
  )
}
