'use client'

import { useState, useEffect, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { useRouter } from 'next/navigation'
import { Heart, ArrowLeft } from 'lucide-react'
import {
  calculateWorkoutResult,
  hasEnoughEnergy,
  getEnergyCost,
  getRatingColor,
  getRatingMessage,
  type PerformanceRating
} from '@/lib/gym/scoring'

export default function YogaPage() {
  const { character, fetchCharacter, updateCharacter } = useCharacterStore()
  const router = useRouter()

  type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest'

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'success'>('ready')
  const [isHolding, setIsHolding] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale')
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)
  const [targetCycles] = useState(5) // 5 complete breath cycles
  const [rating, setRating] = useState<PerformanceRating>('FAIL')
  const [xpGained, setXpGained] = useState(0)
  const [statGain, setStatGain] = useState(0)
  const [score, setScore] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)

  const energyCost = getEnergyCost('yoga')

  const gameLoopRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Breath cycle durations (in seconds)
  const phaseDurations = {
    inhale: 4,   // Hold for 4 seconds
    hold: 4,     // Hold for 4 seconds
    exhale: 4,   // Release for 4 seconds
    rest: 2      // Release for 2 seconds
  }

  const phaseInstructions = {
    inhale: 'HOLD THE BUTTON',
    hold: 'KEEP HOLDING',
    exhale: 'RELEASE THE BUTTON',
    rest: 'KEEP RELEASED'
  }

  const currentPhaseRef = useRef<BreathPhase>('inhale')
  const cyclesRef = useRef(0)
  const scoreRef = useRef(0)

  useEffect(() => {
    currentPhaseRef.current = currentPhase
  }, [currentPhase])

  useEffect(() => {
    cyclesRef.current = cyclesCompleted
  }, [cyclesCompleted])

  useEffect(() => {
    scoreRef.current = score
  }, [score])

  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      return
    }

    gameLoopRef.current = setInterval(() => {
      setPhaseProgress(prev => {
        const phase = currentPhaseRef.current
        const currentDuration = phaseDurations[phase]

        // Check if player is doing the right action
        const shouldBeHolding = phase === 'inhale' || phase === 'hold'
        const correctAction = isHolding === shouldBeHolding

        let newProgress = prev

        // Only progress if player is doing the correct action!
        if (correctAction) {
          newProgress = prev + 0.1
          setScore(s => s + 5) // Reward for correct action
          scoreRef.current += 5
        } else {
          // Penalty - stay at same progress or regress slightly
          newProgress = Math.max(0, prev - 0.05)
          setScore(s => Math.max(0, s - 2)) // Penalty for wrong action
          scoreRef.current = Math.max(0, scoreRef.current - 2)
        }

        // Move to next phase when current one is complete
        if (newProgress >= currentDuration) {
          const phases: BreathPhase[] = ['inhale', 'hold', 'exhale', 'rest']
          const currentIndex = phases.indexOf(phase)
          const nextPhase = phases[(currentIndex + 1) % phases.length]

          setCurrentPhase(nextPhase)
          currentPhaseRef.current = nextPhase
          setPhaseProgress(0)

          // If we completed a full cycle (rest -> inhale)
          if (nextPhase === 'inhale') {
            const newCycles = cyclesRef.current + 1
            setCyclesCompleted(newCycles)
            cyclesRef.current = newCycles

            if (newCycles >= targetCycles) {
              if (gameLoopRef.current) clearInterval(gameLoopRef.current)

              // Calculate performance
              // Max score is theoretical perfect (all correct actions)
              const maxScore = 3500 // 5 cycles × 14s × 10 checks/s × 5 points
              const finalScore = Math.min(scoreRef.current, maxScore) // Cap at max
              const result = calculateWorkoutResult(
                'yoga',
                finalScore,
                maxScore,
                character?.level || 1,
                (character as any)?.endurance || 10
              )

              setRating(result.rating)
              setXpGained(result.xpGained)
              setStatGain(result.statGain)
              setGameState('success')
              saveProgress(result)
            }
          }

          return 0
        }

        return newProgress
      })
    }, 100)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameState, isHolding])

  const startGame = () => {
    // Check energy before starting
    if (!hasEnoughEnergy('yoga', character?.energy || 0)) {
      alert(`Need ${energyCost} energy to train! Rest to recover energy.`)
      return
    }

    setGameState('playing')
    setPhaseProgress(0)
    setScore(0)
    setIsHolding(false)
    setCurrentPhase('inhale')
    setCyclesCompleted(0)
    currentPhaseRef.current = 'inhale'
    cyclesRef.current = 0
    scoreRef.current = 0
  }

  const saveProgress = async (result: any) => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const response = await fetch('/api/gym/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workout: 'yoga',
          stat: 'endurance',
          gain: result.statGain,
          score: result.score,
          xp: result.xpGained,
          rating: result.rating,
          energyCost: energyCost
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.character) {
          updateCharacter(data.character)
          setIsNewRecord(data.isNewRecord || false)
        }
      }
    } catch (error) {
      console.error('Failed to save workout:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!character) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"></div>
        <p className="text-[#888] text-xs uppercase">Loading...</p>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] border border-[#333] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard/gym')}
              className="p-2 bg-[#333] hover:bg-[#444] rounded transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">🧘 Yoga</h1>
              <p className="text-sm text-[#888]">Hold the button and follow your breath!</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#888]">Endurance</p>
              <p className="text-2xl font-bold text-[#5bc0de]">{(character as any).endurance || 10}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-8">
          {gameState === 'ready' && (
            <div className="text-center">
              <Heart className="w-16 h-16 text-[#5bc0de] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Ready to Meditate?</h2>
              <p className="text-sm text-[#888] mb-6">
                Follow the breathing pattern for {targetCycles} complete cycles!<br />
                Inhale (hold) → Hold (keep holding) → Exhale (release) → Rest (stay released)
              </p>

              {/* Best Score Display */}
              {((character as any).gymBestScores?.yoga) && (
                <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#5bc0de] rounded-lg inline-block">
                  <p className="text-xs text-[#888] uppercase">Your Best Score</p>
                  <p className="text-2xl font-bold text-[#5bc0de]">
                    {(character as any).gymBestScores.yoga}
                  </p>
                  <p className="text-[10px] text-[#666]">Beat your record!</p>
                </div>
              )}

              <button
                onClick={startGame}
                className="px-8 py-3 bg-[#5bc0de] hover:bg-[#46b8da] text-white font-bold rounded-lg transition-colors"
              >
                Start Meditation
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="space-y-6">
              {/* Cycle Progress */}
              <div className="text-center mb-8">
                <p className="text-sm text-[#888] mb-2">Breath Cycles</p>
                <p className="text-5xl font-bold text-white mb-4">{cyclesCompleted}/{targetCycles}</p>
                <div className="w-full bg-[#0f0f0f] rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#5bc0de] to-[#46b8da] h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(cyclesCompleted / targetCycles) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Phase Instruction */}
              <div className={`text-center py-8 rounded-lg border ${
                currentPhase === 'inhale' || currentPhase === 'hold'
                  ? 'bg-blue-500/10 border-blue-500'
                  : 'bg-green-500/10 border-green-500'
              }`}>
                <p className="text-xs text-[#888] uppercase mb-2">{currentPhase}</p>
                <p className={`text-2xl font-bold mb-2 ${
                  currentPhase === 'inhale' || currentPhase === 'hold' ? 'text-blue-400' : 'text-green-400'
                }`}>
                  {phaseInstructions[currentPhase]}
                </p>
                <p className="text-sm text-[#666]">{phaseProgress.toFixed(1)}s / {phaseDurations[currentPhase]}s</p>

                {/* Phase Progress Bar */}
                <div className="w-full bg-[#0f0f0f] rounded-full h-2 mt-3 mx-auto max-w-xs">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      currentPhase === 'inhale' || currentPhase === 'hold'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(phaseProgress / phaseDurations[currentPhase]) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="text-center">
                {((currentPhase === 'inhale' || currentPhase === 'hold') && isHolding) ||
                 ((currentPhase === 'exhale' || currentPhase === 'rest') && !isHolding) ? (
                  <p className="text-green-500 font-bold">✓ CORRECT</p>
                ) : (
                  <p className="text-red-500 font-bold">✗ WRONG ACTION</p>
                )}
              </div>

              {/* Hold Button */}
              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className={`w-full py-20 text-white text-3xl font-bold rounded-lg transition-all select-none ${
                  isHolding
                    ? 'bg-blue-600 scale-95'
                    : 'bg-[#5bc0de] hover:bg-[#46b8da]'
                }`}
                style={{
                  touchAction: 'manipulation',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                {isHolding ? '🧘 HOLDING... 🧘' : '🧘 TAP TO BREATHE 🧘'}
              </button>

              <p className="text-center text-sm text-[#888]">Score: <span className="text-[#f0ad4e] font-bold">{score}</span></p>
            </div>
          )}

          {gameState === 'success' && (
            <div className="text-center">
              {/* NEW RECORD Banner */}
              {isNewRecord && (
                <div className="mb-4 p-3 bg-gradient-to-r from-[#f39c12] via-[#f1c40f] to-[#f39c12] rounded-lg animate-pulse">
                  <p className="text-2xl font-bold text-white">🏆 NEW RECORD! 🏆</p>
                  <p className="text-sm text-white/90">You beat your previous best!</p>
                </div>
              )}

              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: getRatingColor(rating) }}
              >
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: getRatingColor(rating) }}>
                {getRatingMessage(rating)}
              </h2>
              <p className="text-sm text-[#888] mb-4">
                You achieved inner peace and physical endurance!
              </p>
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 mb-6 space-y-3">
                <div>
                  <p className="text-xs text-[#888] mb-1">Performance</p>
                  <p className="text-2xl font-bold" style={{ color: getRatingColor(rating) }}>
                    {rating}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#888] mb-1">Final Score</p>
                  <p className="text-3xl font-bold text-[#f0ad4e]">{score}</p>
                </div>
                <div className="flex justify-around pt-2 border-t border-[#333]">
                  <div>
                    <p className="text-xs text-[#888]">XP Gained</p>
                    <p className="text-lg font-bold text-[#5bc0de]">+{xpGained}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#888]">Endurance</p>
                    <p className="text-lg font-bold text-[#5bc0de]">+{statGain}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#888]">Energy</p>
                    <p className="text-lg font-bold text-[#f0ad4e]">-{energyCost}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/dashboard/gym')}
                  className="flex-1 px-6 py-3 bg-[#333] hover:bg-[#444] text-white font-bold rounded-lg transition-colors"
                >
                  Back to Gym
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 px-6 py-3 bg-[#5bc0de] hover:bg-[#46b8da] text-white font-bold rounded-lg transition-colors"
                  disabled={!hasEnoughEnergy('yoga', character?.energy || 0)}
                >
                  Meditate Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
