// Gym Achievements System

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  type: 'workouts' | 'perfect' | 'score' | 'streak' | 'specific'
  workoutType?: string // For specific workout achievements
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  reward?: {
    cash?: number
    xp?: number
  }
}

export const GYM_ACHIEVEMENTS: Achievement[] = [
  // Workout Count Achievements
  {
    id: 'first_workout',
    name: 'First Steps',
    description: 'Complete your first workout',
    icon: '🏋️',
    requirement: 1,
    type: 'workouts',
    rarity: 'common',
    reward: { cash: 100, xp: 50 }
  },
  {
    id: 'gym_regular',
    name: 'Gym Regular',
    description: 'Complete 10 workouts',
    icon: '💪',
    requirement: 10,
    type: 'workouts',
    rarity: 'common',
    reward: { cash: 500, xp: 200 }
  },
  {
    id: 'gym_rat',
    name: 'Gym Rat',
    description: 'Complete 50 workouts',
    icon: '🐀',
    requirement: 50,
    type: 'workouts',
    rarity: 'rare',
    reward: { cash: 2000, xp: 1000 }
  },
  {
    id: 'gym_legend',
    name: 'Gym Legend',
    description: 'Complete 100 workouts',
    icon: '👑',
    requirement: 100,
    type: 'workouts',
    rarity: 'epic',
    reward: { cash: 5000, xp: 2500 }
  },
  {
    id: 'gym_god',
    name: 'Gym God',
    description: 'Complete 500 workouts',
    icon: '⚡',
    requirement: 500,
    type: 'workouts',
    rarity: 'legendary',
    reward: { cash: 25000, xp: 10000 }
  },

  // Perfect Performance Achievements
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get your first PERFECT rating',
    icon: '⭐',
    requirement: 1,
    type: 'perfect',
    rarity: 'common',
    reward: { cash: 200, xp: 100 }
  },
  {
    id: 'perfect_form',
    name: 'Perfect Form',
    description: 'Get 10 PERFECT ratings',
    icon: '🌟',
    requirement: 10,
    type: 'perfect',
    rarity: 'rare',
    reward: { cash: 1000, xp: 500 }
  },
  {
    id: 'flawless_athlete',
    name: 'Flawless Athlete',
    description: 'Get 50 PERFECT ratings',
    icon: '💎',
    requirement: 50,
    type: 'perfect',
    rarity: 'epic',
    reward: { cash: 5000, xp: 2000 }
  },
  {
    id: 'perfect_master',
    name: 'Perfect Master',
    description: 'Get PERFECT on all 5 workout types',
    icon: '🏆',
    requirement: 5,
    type: 'specific',
    rarity: 'epic',
    reward: { cash: 10000, xp: 5000 }
  },

  // Specific Workout Achievements
  {
    id: 'bench_press_master',
    name: 'Bench Press Master',
    description: 'Score 2700+ on Bench Press',
    icon: '🏋️‍♂️',
    requirement: 2700,
    type: 'score',
    workoutType: 'bench-press',
    rarity: 'rare',
    reward: { cash: 1500, xp: 500 }
  },
  {
    id: 'treadmill_runner',
    name: 'Endurance Runner',
    description: 'Score 2700+ on Treadmill',
    icon: '🏃',
    requirement: 2700,
    type: 'score',
    workoutType: 'treadmill',
    rarity: 'rare',
    reward: { cash: 1500, xp: 500 }
  },
  {
    id: 'agility_ninja',
    name: 'Agility Ninja',
    description: 'Score 4500+ on Agility Course',
    icon: '🥷',
    requirement: 4500,
    type: 'score',
    workoutType: 'agility-course',
    rarity: 'rare',
    reward: { cash: 2000, xp: 750 }
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Score 2160+ on Speed Training',
    icon: '⚡',
    requirement: 2160,
    type: 'score',
    workoutType: 'speed-training',
    rarity: 'rare',
    reward: { cash: 1500, xp: 500 }
  },
  {
    id: 'yoga_master',
    name: 'Yoga Master',
    description: 'Score 3150+ on Yoga',
    icon: '🧘',
    requirement: 3150,
    type: 'score',
    workoutType: 'yoga',
    rarity: 'rare',
    reward: { cash: 1500, xp: 500 }
  },

  // Streak Achievements
  {
    id: 'hot_streak',
    name: 'Hot Streak',
    description: 'Get 5 PERFECT ratings in a row',
    icon: '🔥',
    requirement: 5,
    type: 'streak',
    rarity: 'epic',
    reward: { cash: 3000, xp: 1500 }
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Get 10 PERFECT ratings in a row',
    icon: '💥',
    requirement: 10,
    type: 'streak',
    rarity: 'legendary',
    reward: { cash: 10000, xp: 5000 }
  }
]

/**
 * Check if a new achievement was unlocked
 */
export function checkAchievements(
  currentAchievements: string[],
  stats: {
    totalWorkouts: number
    perfectWorkouts: number
    bestScores: Record<string, number>
    currentScore?: number
    currentWorkout?: string
    currentRating?: string
    perfectStreak?: number
  }
): {
  newAchievements: Achievement[]
  updatedAchievements: string[]
} {
  const newAchievements: Achievement[] = []
  const updatedSet = new Set(currentAchievements)

  for (const achievement of GYM_ACHIEVEMENTS) {
    // Skip if already unlocked
    if (currentAchievements.includes(achievement.id)) continue

    let unlocked = false

    switch (achievement.type) {
      case 'workouts':
        unlocked = stats.totalWorkouts >= achievement.requirement
        break

      case 'perfect':
        unlocked = stats.perfectWorkouts >= achievement.requirement
        break

      case 'score':
        if (achievement.workoutType && stats.currentWorkout === achievement.workoutType) {
          const bestScore = stats.bestScores[achievement.workoutType] || 0
          unlocked = bestScore >= achievement.requirement
        }
        break

      case 'streak':
        if (stats.perfectStreak) {
          unlocked = stats.perfectStreak >= achievement.requirement
        }
        break

      case 'specific':
        if (achievement.id === 'perfect_master') {
          // Check if player has PERFECT on all 5 workouts
          const workouts = ['bench-press', 'treadmill', 'agility-course', 'speed-training', 'yoga']
          const maxScores = workouts.map(w => {
            const maxScore = {
              'bench-press': 3000,
              'treadmill': 3000,
              'agility-course': 5000,
              'speed-training': 2400,
              'yoga': 3500
            }[w] || 0
            return (stats.bestScores[w] || 0) >= (maxScore * 0.9)
          })
          unlocked = maxScores.every(Boolean)
        }
        break
    }

    if (unlocked) {
      newAchievements.push(achievement)
      updatedSet.add(achievement.id)
    }
  }

  return {
    newAchievements,
    updatedAchievements: Array.from(updatedSet)
  }
}

/**
 * Get rarity color for UI
 */
export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common': return '#95a5a6'
    case 'rare': return '#3498db'
    case 'epic': return '#9b59b6'
    case 'legendary': return '#f39c12'
  }
}

/**
 * Get achievement progress
 */
export function getAchievementProgress(
  achievement: Achievement,
  stats: {
    totalWorkouts: number
    perfectWorkouts: number
    bestScores: Record<string, number>
    perfectStreak?: number
  }
): number {
  switch (achievement.type) {
    case 'workouts':
      return Math.min(100, (stats.totalWorkouts / achievement.requirement) * 100)

    case 'perfect':
      return Math.min(100, (stats.perfectWorkouts / achievement.requirement) * 100)

    case 'score':
      if (achievement.workoutType) {
        const bestScore = stats.bestScores[achievement.workoutType] || 0
        return Math.min(100, (bestScore / achievement.requirement) * 100)
      }
      return 0

    case 'streak':
      if (stats.perfectStreak) {
        return Math.min(100, (stats.perfectStreak / achievement.requirement) * 100)
      }
      return 0

    default:
      return 0
  }
}
