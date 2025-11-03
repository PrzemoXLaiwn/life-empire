// Gym Scoring & Reward System
// Centralized logic for all gym minigames

export type PerformanceRating = 'PERFECT' | 'GOOD' | 'POOR' | 'FAIL'
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD'

export interface WorkoutConfig {
  name: string
  stat: 'strength' | 'stamina' | 'endurance' | 'agility' | 'speed'
  difficulty: DifficultyLevel
  energyCost: number
  baseXP: number
  duration: number // seconds
}

export interface WorkoutResult {
  score: number
  rating: PerformanceRating
  xpGained: number
  statGain: number
  perfectHits?: number
  totalHits?: number
  accuracy?: number
}

// Workout configurations
export const WORKOUTS: Record<string, WorkoutConfig> = {
  'bench-press': {
    name: 'Bench Press',
    stat: 'strength',
    difficulty: 'MEDIUM',
    energyCost: 20,
    baseXP: 25,
    duration: 15
  },
  'treadmill': {
    name: 'Treadmill',
    stat: 'stamina',
    difficulty: 'EASY',
    energyCost: 15,
    baseXP: 15,
    duration: 30
  },
  'agility-course': {
    name: 'Agility Course',
    stat: 'agility',
    difficulty: 'HARD',
    energyCost: 25,
    baseXP: 40,
    duration: 20
  },
  'speed-training': {
    name: 'Speed Training',
    stat: 'speed',
    difficulty: 'MEDIUM',
    energyCost: 20,
    baseXP: 30,
    duration: 20
  },
  'yoga': {
    name: 'Yoga',
    stat: 'endurance',
    difficulty: 'EASY',
    energyCost: 10,
    baseXP: 20,
    duration: 70 // 5 cycles x 14s each
  }
}

// Performance thresholds (percentage)
export const RATING_THRESHOLDS = {
  PERFECT: 90,  // 90-100%
  GOOD: 70,     // 70-89%
  POOR: 50,     // 50-69%
  FAIL: 0       // 0-49%
}

// XP multipliers based on performance
export const XP_MULTIPLIERS = {
  PERFECT: 1.5,
  GOOD: 1.0,
  POOR: 0.5,
  FAIL: 0
}

// Difficulty multipliers
export const DIFFICULTY_MULTIPLIERS = {
  EASY: 1.0,
  MEDIUM: 1.25,
  HARD: 1.5
}

/**
 * Calculate performance rating based on score/accuracy percentage
 */
export function calculateRating(percentage: number): PerformanceRating {
  if (percentage >= RATING_THRESHOLDS.PERFECT) return 'PERFECT'
  if (percentage >= RATING_THRESHOLDS.GOOD) return 'GOOD'
  if (percentage >= RATING_THRESHOLDS.POOR) return 'POOR'
  return 'FAIL'
}

/**
 * Calculate XP gained from workout
 */
export function calculateXP(
  workoutType: string,
  score: number,
  maxScore: number,
  characterLevel: number = 1
): number {
  const config = WORKOUTS[workoutType]
  if (!config) return 0

  const percentage = (score / maxScore) * 100
  const rating = calculateRating(percentage)

  // Base XP with difficulty multiplier
  let xp = config.baseXP * DIFFICULTY_MULTIPLIERS[config.difficulty]

  // Apply performance multiplier
  xp *= XP_MULTIPLIERS[rating]

  // Scale with character level (higher level = more XP needed)
  xp *= (1 + characterLevel * 0.1)

  return Math.round(xp)
}

/**
 * Calculate stat gain (how much the stat increases)
 */
export function calculateStatGain(
  rating: PerformanceRating,
  characterStatLevel: number = 10
): number {
  let baseGain = 1

  // Higher stats = slower growth
  const levelPenalty = Math.max(0.5, 1 - (characterStatLevel / 200))

  // Rating bonus
  const ratingBonus = {
    PERFECT: 2,
    GOOD: 1.5,
    POOR: 1,
    FAIL: 0
  }[rating]

  return Math.round(baseGain * ratingBonus * levelPenalty)
}

/**
 * Get rating color for UI
 */
export function getRatingColor(rating: PerformanceRating): string {
  switch (rating) {
    case 'PERFECT': return '#5cb85c'  // Green
    case 'GOOD': return '#5bc0de'     // Blue
    case 'POOR': return '#f0ad4e'     // Orange
    case 'FAIL': return '#d9534f'     // Red
  }
}

/**
 * Get rating message
 */
export function getRatingMessage(rating: PerformanceRating): string {
  switch (rating) {
    case 'PERFECT': return 'PERFECT! Outstanding performance!'
    case 'GOOD': return 'GOOD! Keep it up!'
    case 'POOR': return 'POOR. You can do better!'
    case 'FAIL': return 'FAILED. Try again!'
  }
}

/**
 * Calculate workout result
 */
export function calculateWorkoutResult(
  workoutType: string,
  score: number,
  maxScore: number,
  characterLevel: number = 1,
  characterStatLevel: number = 10
): WorkoutResult {
  const percentage = (score / maxScore) * 100
  const rating = calculateRating(percentage)
  const xpGained = calculateXP(workoutType, score, maxScore, characterLevel)
  const statGain = calculateStatGain(rating, characterStatLevel)

  return {
    score,
    rating,
    xpGained,
    statGain,
    accuracy: percentage
  }
}

/**
 * Check if player has enough energy
 */
export function hasEnoughEnergy(workoutType: string, currentEnergy: number): boolean {
  const config = WORKOUTS[workoutType]
  if (!config) return false
  return currentEnergy >= config.energyCost
}

/**
 * Get energy cost for workout
 */
export function getEnergyCost(workoutType: string): number {
  const config = WORKOUTS[workoutType]
  return config?.energyCost || 0
}
