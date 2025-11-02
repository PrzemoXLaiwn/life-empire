export interface LeaderboardPlayer {
  rank: number
  id: string
  username: string
  avatar: string
  level: number
  reputation: number
  cash: number
  job: string
  gang: string | null
}

export interface DailyMission {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  reward: string
  icon: string
}

export interface ActivityItem {
  id: string
  type: 'success' | 'danger' | 'info' | 'warning'
  message: string
  time: string
  icon: string
}

export interface DailyRewards {
  currentStreak: number
  maxStreak: number
  rewards: Array<{
    day: number
    claimed: boolean
    amount: number
  }>
}
