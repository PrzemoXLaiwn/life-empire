'use client'

/**
 * Stats Page
 * Comprehensive dashboard showing player statistics, charts, and leaderboards
 */

import { useEffect, useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { getPlayerStats, getLeaderboards } from '@/actions/stats'
import { Avatar } from '@/components/ui/Avatar'
import { TrendingUp, Award, Briefcase, Target, DollarSign, Star, Trophy, Flame } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

type Stats = {
  overview: {
    netWorth: number
    totalCrimes: number
    totalJobs: number
    level: number
    experience: number
    xpNeeded: number
  }
  charts: {
    dailyEarnings: Array<{ day: string; amount: number }>
    crimesByType: Array<{ type: string; count: number }>
    xpHistory: Array<{ day: string; xp: number }>
  }
  personalRecords: {
    biggestCrimeReward: number
    longestShift: number
    mostMoneyInDay: number
    currentStreak: number
  }
}

type Leaderboards = {
  topByLevel: Array<{
    id: string
    username: string
    level: number
    avatar: string
    customAvatar?: string | null
  }>
  topByNetWorth: Array<{
    id: string
    username: string
    netWorth: number
    avatar: string
    customAvatar?: string | null
  }>
  topByReputation: Array<{
    id: string
    username: string
    reputation: number
    avatar: string
    customAvatar?: string | null
  }>
}

export default function StatsPage() {
  const { character, isLoading: charLoading } = useCharacterStore()
  const [stats, setStats] = useState<Stats | null>(null)
  const [leaderboards, setLeaderboards] = useState<Leaderboards | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStats = async () => {
      if (!character) return

      try {
        setIsLoading(true)
        setError(null)

        const [statsResult, leaderboardsResult] = await Promise.all([
          getPlayerStats(character.id),
          getLeaderboards()
        ])

        if ('error' in statsResult) {
          setError(statsResult.error || 'An error occurred')
        } else {
          setStats(statsResult as Stats)
        }

        if ('error' in leaderboardsResult) {
          console.error('Failed to load leaderboards:', leaderboardsResult.error)
        } else {
          setLeaderboards(leaderboardsResult as Leaderboards)
        }
      } catch (err) {
        console.error('Failed to load stats:', err)
        setError('Failed to load statistics')
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [character])

  if (charLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading stats...</p>
        </div>
      </div>
    )
  }

  if (error || !stats || !character) {
    return (
      <div className="p-6">
        <div className="ls-section border-[#d9534f]">
          <div className="ls-section-content">
            <p className="text-[#d9534f]">{error || 'Failed to load statistics'}</p>
          </div>
        </div>
      </div>
    )
  }

  const xpProgress = (stats.overview.experience / stats.overview.xpNeeded) * 100

  return (
    <div className="space-y-6 max-w-7xl mx-auto fade-in">
      <h1 className="text-2xl font-bold text-[#fff] mb-6">📊 Statistics</h1>

      {/* SECTION 1: Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Worth */}
        <div className="ls-section">
          <div className="ls-section-content">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#5cb85c]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#5cb85c]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] uppercase">Net Worth</p>
                <p className="text-xl font-bold text-[#5cb85c]">
                  ${stats.overview.netWorth.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Crimes */}
        <div className="ls-section">
          <div className="ls-section-content">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d9534f]/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#d9534f]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] uppercase">Crimes Committed</p>
                <p className="text-xl font-bold text-[#d0d0d0]">
                  {stats.overview.totalCrimes.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Jobs */}
        <div className="ls-section">
          <div className="ls-section-content">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#5bc0de]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#5bc0de]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] uppercase">Jobs Completed</p>
                <p className="text-xl font-bold text-[#d0d0d0]">
                  {stats.overview.totalJobs.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Level & XP */}
        <div className="ls-section">
          <div className="ls-section-content">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#f0ad4e]/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#f0ad4e]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#888] uppercase">Level</p>
                <p className="text-xl font-bold text-[#f0ad4e]">{stats.overview.level}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-[#888] mb-1">
                <span>XP Progress</span>
                <span>{stats.overview.experience}/{stats.overview.xpNeeded}</span>
              </div>
              <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                <div
                  className="bg-[#f0ad4e] h-2 rounded-full transition-all"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Money Earned Chart */}
        <div className="ls-section">
          <div className="ls-section-header">
            💰 Money Earned (Last 7 Days)
          </div>
          <div className="ls-section-content">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.charts.dailyEarnings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="day" stroke="#888" style={{ fontSize: '12px' }} />
                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#d0d0d0'
                  }}
                  formatter={(value: any) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#5cb85c"
                  strokeWidth={2}
                  dot={{ fill: '#5cb85c' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crimes by Type Chart */}
        <div className="ls-section">
          <div className="ls-section-header">
            🔫 Crimes by Type
          </div>
          <div className="ls-section-content">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.charts.crimesByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="type" stroke="#888" style={{ fontSize: '10px' }} />
                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#d0d0d0'
                  }}
                />
                <Bar dataKey="count" fill="#d9534f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* XP Gained Chart */}
        <div className="ls-section lg:col-span-2">
          <div className="ls-section-header">
            ⭐ Experience Gained (Last 7 Days)
          </div>
          <div className="ls-section-content">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={stats.charts.xpHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="day" stroke="#888" style={{ fontSize: '12px' }} />
                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#d0d0d0'
                  }}
                  formatter={(value: any) => `${value} XP`}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#f0ad4e"
                  fill="#f0ad4e"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 3 & 4: Leaderboards and Personal Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-[#fff]">🏆 Leaderboards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top by Level */}
            <div className="ls-section">
              <div className="ls-section-header text-[#f0ad4e]">
                Top by Level
              </div>
              <div className="ls-section-content">
                <div className="space-y-2">
                  {leaderboards?.topByLevel.slice(0, 10).map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        player.id === character.id ? 'bg-[#5cb85c]/10 border border-[#5cb85c]' : 'bg-[#1a1a1a]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#888] w-6">#{index + 1}</span>
                      <Avatar icon={player.avatar} customUrl={player.customAvatar} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#d0d0d0] truncate">{player.username}</p>
                      </div>
                      <span className="text-sm font-bold text-[#f0ad4e]">{player.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top by Net Worth */}
            <div className="ls-section">
              <div className="ls-section-header text-[#5cb85c]">
                Top by Net Worth
              </div>
              <div className="ls-section-content">
                <div className="space-y-2">
                  {leaderboards?.topByNetWorth.slice(0, 10).map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        player.id === character.id ? 'bg-[#5cb85c]/10 border border-[#5cb85c]' : 'bg-[#1a1a1a]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#888] w-6">#{index + 1}</span>
                      <Avatar icon={player.avatar} customUrl={player.customAvatar} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#d0d0d0] truncate">{player.username}</p>
                      </div>
                      <span className="text-xs font-bold text-[#5cb85c]">
                        ${(player.netWorth / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top by Reputation */}
            <div className="ls-section">
              <div className="ls-section-header text-[#5bc0de]">
                Top by Reputation
              </div>
              <div className="ls-section-content">
                <div className="space-y-2">
                  {leaderboards?.topByReputation.slice(0, 10).map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center gap-2 p-2 rounded ${
                        player.id === character.id ? 'bg-[#5cb85c]/10 border border-[#5cb85c]' : 'bg-[#1a1a1a]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#888] w-6">#{index + 1}</span>
                      <Avatar icon={player.avatar} customUrl={player.customAvatar} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#d0d0d0] truncate">{player.username}</p>
                      </div>
                      <span className="text-sm font-bold text-[#5bc0de]">{player.reputation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#fff]">🎖️ Personal Records</h2>

          <div className="ls-section">
            <div className="ls-section-content">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#f0ad4e]" />
                    <span className="text-sm text-[#d0d0d0]">Biggest Crime</span>
                  </div>
                  <span className="text-sm font-bold text-[#5cb85c]">
                    ${stats.personalRecords.biggestCrimeReward.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#5bc0de]" />
                    <span className="text-sm text-[#d0d0d0]">Longest Shift</span>
                  </div>
                  <span className="text-sm font-bold text-[#5cb85c]">
                    {stats.personalRecords.longestShift}h
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#5cb85c]" />
                    <span className="text-sm text-[#d0d0d0]">Most $ in 1 Day</span>
                  </div>
                  <span className="text-sm font-bold text-[#5cb85c]">
                    ${stats.personalRecords.mostMoneyInDay.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#d9534f]" />
                    <span className="text-sm text-[#d0d0d0]">Current Streak</span>
                  </div>
                  <span className="text-sm font-bold text-[#f0ad4e]">
                    {stats.personalRecords.currentStreak} days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
