'use client'

import { useState } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { Activity, Zap, Target, Wind, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Workout {
  id: string
  name: string
  description: string
  stat: string
  statName: string
  icon: any
  color: string
  energyCost: number
  difficulty: 'easy' | 'medium' | 'hard'
}

const WORKOUTS: Workout[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    description: 'Build raw strength by lifting weights. Click at the right time!',
    stat: 'strength',
    statName: 'Strength',
    icon: Activity,
    color: '#d9534f',
    energyCost: 20,
    difficulty: 'medium'
  },
  {
    id: 'treadmill',
    name: 'Treadmill',
    description: 'Increase stamina with cardio. Mash the button quickly!',
    stat: 'stamina',
    statName: 'Stamina',
    icon: Zap,
    color: '#f0ad4e',
    energyCost: 15,
    difficulty: 'easy'
  },
  {
    id: 'agility-course',
    name: 'Agility Course',
    description: 'Improve agility with obstacle course. Remember the sequence!',
    stat: 'agility',
    statName: 'Agility',
    icon: Target,
    color: '#9b59b6',
    energyCost: 25,
    difficulty: 'hard'
  },
  {
    id: 'speed-training',
    name: 'Speed Training',
    description: 'Sprint training to boost speed. Keep the slider in the zone!',
    stat: 'speed',
    statName: 'Speed',
    icon: Wind,
    color: '#5cb85c',
    energyCost: 20,
    difficulty: 'medium'
  },
  {
    id: 'yoga',
    name: 'Yoga',
    description: 'Build endurance through breathing exercises. Hold the button!',
    stat: 'endurance',
    statName: 'Endurance',
    icon: Heart,
    color: '#5bc0de',
    energyCost: 10,
    difficulty: 'easy'
  }
]

export default function GymPage() {
  const { character } = useCharacterStore()
  const router = useRouter()
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
          <p className="text-[#888] text-xs uppercase">Loading...</p>
        </div>
      </div>
    )
  }

  const startWorkout = (workout: Workout) => {
    if (character.energy < workout.energyCost) {
      alert('Not enough energy! Rest or use energy drinks.')
      return
    }
    router.push(`/dashboard/gym/${workout.id}`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] border border-[#333] rounded-lg p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d9534f] to-[#c9302c] rounded-lg flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">Iron Paradise Gym</h1>
            <p className="text-sm text-[#888]">Train your physical stats and become stronger</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#888]">Your Energy</p>
            <p className="text-2xl font-bold text-[#f0ad4e]">{character.energy}/{character.maxEnergy}</p>
          </div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <h2 className="text-sm font-bold text-[#f0ad4e] uppercase tracking-wider mb-4">Your Physical Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-[#0f0f0f] border border-[#333] rounded">
            <p className="text-xs text-[#888] mb-1">💪 Strength</p>
            <p className="text-xl font-bold text-[#d9534f]">{character.strength}</p>
          </div>
          <div className="text-center p-3 bg-[#0f0f0f] border border-[#333] rounded">
            <p className="text-xs text-[#888] mb-1">⚡ Stamina</p>
            <p className="text-xl font-bold text-[#f0ad4e]">{character.stamina}</p>
          </div>
          <div className="text-center p-3 bg-[#0f0f0f] border border-[#333] rounded">
            <p className="text-xs text-[#888] mb-1">🛡️ Endurance</p>
            <p className="text-xl font-bold text-[#5bc0de]">{(character as any).endurance || 10}</p>
          </div>
          <div className="text-center p-3 bg-[#0f0f0f] border border-[#333] rounded">
            <p className="text-xs text-[#888] mb-1">🏃 Speed</p>
            <p className="text-xl font-bold text-[#5cb85c]">{(character as any).speed || 10}</p>
          </div>
          <div className="text-center p-3 bg-[#0f0f0f] border border-[#333] rounded">
            <p className="text-xs text-[#888] mb-1">🤸 Agility</p>
            <p className="text-xl font-bold text-[#9b59b6]">{(character as any).agility || 10}</p>
          </div>
        </div>
      </div>

      {/* Workouts */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <h2 className="text-sm font-bold text-[#f0ad4e] uppercase tracking-wider mb-4">Available Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKOUTS.map((workout) => {
            const Icon = workout.icon
            const canAfford = character.energy >= workout.energyCost

            return (
              <div
                key={workout.id}
                className={`relative bg-[#0f0f0f] border-2 rounded-lg p-4 transition-all ${
                  canAfford
                    ? 'border-[#333] hover:border-[#5cb85c] hover:scale-105 cursor-pointer'
                    : 'border-[#333] opacity-50 cursor-not-allowed'
                }`}
                onClick={() => canAfford && startWorkout(workout)}
              >
                {/* Difficulty Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold ${
                    workout.difficulty === 'easy' ? 'bg-[#5cb85c] text-white' :
                    workout.difficulty === 'medium' ? 'bg-[#f0ad4e] text-white' :
                    'bg-[#d9534f] text-white'
                  }`}>
                    {workout.difficulty}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${workout.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: workout.color }} />
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white mb-1">{workout.name}</h3>
                <p className="text-xs text-[#888] mb-3 min-h-[2.5rem]">{workout.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-[#333]">
                  <div className="text-xs">
                    <span className="text-[#888]">Trains:</span>
                    <span className="ml-1 font-bold" style={{ color: workout.color }}>
                      {workout.statName}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-[#888]">Cost:</span>
                    <span className={`ml-1 font-bold ${canAfford ? 'text-[#f0ad4e]' : 'text-[#d9534f]'}`}>
                      {workout.energyCost} ⚡
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  className={`w-full mt-3 py-2 rounded font-bold text-sm uppercase transition-colors ${
                    canAfford
                      ? 'bg-[#5cb85c] hover:bg-[#4a9d4a] text-white'
                      : 'bg-[#333] text-[#666] cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (canAfford) startWorkout(workout)
                  }}
                  disabled={!canAfford}
                >
                  {canAfford ? 'Start Workout' : 'Not Enough Energy'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-[#1a1a1a] border border-[#f0ad4e] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#f0ad4e] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">!</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#f0ad4e] mb-1">Gym Tips</h3>
            <ul className="text-xs text-[#888] space-y-1">
              <li>• Each workout is a minigame - complete it successfully to gain stats!</li>
              <li>• Higher stats make it harder to train (diminishing returns)</li>
              <li>• Energy regenerates over time or can be restored with items</li>
              <li>• Different workouts have different difficulty levels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
