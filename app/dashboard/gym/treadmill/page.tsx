'use client'

import { useState, useEffect, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { useRouter } from 'next/navigation'
import { Zap, ArrowLeft } from 'lucide-react'
import {
  calculateWorkoutResult,
  hasEnoughEnergy,
  getEnergyCost,
  getRatingColor,
  getRatingMessage,
  type PerformanceRating
} from '@/lib/gym/scoring'

export default function TreadmillPage() {
  const { character, fetchCharacter, updateCharacter } = useCharacterStore()
  const router = useRouter()

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'success'>('ready')
  const [rating, setRating] = useState<PerformanceRating>('FAIL')
  const [xpGained, setXpGained] = useState(0)
  const [statGain, setStatGain] = useState(0)
  const [score, setScore] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)

  // Treadmill mechanics (like GTA SA gym)
  const [indicatorPosition, setIndicatorPosition] = useState(50) // 0-100
  const [indicatorDirection, setIndicatorDirection] = useState(1) // 1 or -1
  const [isHoldingButton, setIsHoldingButton] = useState(false)
  const [timeInZone, setTimeInZone] = useState(0) // Time spent in green zone
  const [totalTime, setTotalTime] = useState(0)

  const gameLoopRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isPlayingRef = useRef(false)
  const isHoldingRef = useRef(false)
  const timeInZoneRef = useRef(0)
  const totalTimeRef = useRef(0)
  const scoreRef = useRef(0)
  const currentSpeedRef = useRef(1.5)

  const energyCost = getEnergyCost('treadmill')
  const TARGET_TIME = 10 // 10 seconds to complete
  const GREEN_ZONE_MIN = 40
  const GREEN_ZONE_MAX = 60
  const INITIAL_SPEED = 1.5 // Starting speed
  const SPEED_INCREMENT = 0.3 // Speed increase per second

  const startGame = () => {
    // Check energy before starting
    if (!hasEnoughEnergy('treadmill', character?.energy || 0)) {
      alert(`Need ${energyCost} energy to train! Rest to recover energy.`)
      return
    }

    setGameState('playing')
    isPlayingRef.current = true
    isHoldingRef.current = false
    setScore(0)
    setIndicatorPosition(50)
    setIndicatorDirection(1)
    setIsHoldingButton(false)
    setTimeInZone(0)
    setTotalTime(0)
    timeInZoneRef.current = 0
    totalTimeRef.current = 0
    scoreRef.current = 0
    currentSpeedRef.current = INITIAL_SPEED

    // Start game loop
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    gameLoopRef.current = setInterval(() => {
      if (!isPlayingRef.current) return

      // Update total time
      totalTimeRef.current += 0.05
      setTotalTime(totalTimeRef.current)

      // Increase speed over time (gets harder!)
      currentSpeedRef.current = INITIAL_SPEED + (totalTimeRef.current * SPEED_INCREMENT)

      // Check if time is up
      if (totalTimeRef.current >= TARGET_TIME) {
        endGame()
        return
      }

      // Update indicator position
      setIndicatorPosition(prev => {
        let newPos = prev

        // If holding button, indicator moves up (slows down)
        if (isHoldingRef.current) {
          newPos = prev - currentSpeedRef.current
        } else {
          // If not holding, indicator moves down (speeds up)
          newPos = prev + currentSpeedRef.current
        }

        // Bounce at edges
        if (newPos <= 0) {
          newPos = 0
          setIndicatorDirection(1)
        } else if (newPos >= 100) {
          newPos = 100
          setIndicatorDirection(-1)
        }

        // Check if in green zone
        const inGreenZone = newPos >= GREEN_ZONE_MIN && newPos <= GREEN_ZONE_MAX
        if (inGreenZone) {
          timeInZoneRef.current += 0.05
          setTimeInZone(timeInZoneRef.current)

          // Award points for being in zone
          const points = 10
          scoreRef.current += points
          setScore(scoreRef.current)
        } else {
          // Penalty for being out of zone
          const penalty = 2
          scoreRef.current = Math.max(0, scoreRef.current - penalty)
          setScore(scoreRef.current)
        }

        return newPos
      })
    }, 50) // 20 times per second
  }

  const endGame = () => {
    isPlayingRef.current = false
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)

    // Calculate final score based on time in zone (consistent scoring)
    // Max score = if you stay in zone for full 10 seconds
    const maxScore = 3000 // Realistic max based on setInterval timing
    const finalScore = Math.min(scoreRef.current, maxScore) // Cap at max score

    const result = calculateWorkoutResult(
      'treadmill',
      finalScore,
      maxScore,
      character?.level || 1,
      character?.stamina || 10
    )

    setRating(result.rating)
    setXpGained(result.xpGained)
    setStatGain(result.statGain)
    setGameState('success')
    saveProgress(result)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [])

  const saveProgress = async (result: any) => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const response = await fetch('/api/gym/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workout: 'treadmill',
          stat: 'stamina',
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
          // Instantly update character in store without refetching
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

  const percentageInZone = totalTime > 0 ? (timeInZone / totalTime) * 100 : 0
  const timeRemaining = Math.max(0, TARGET_TIME - totalTime)

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
              <h1 className="text-2xl font-bold text-white mb-1">⚡ Treadmill</h1>
              <p className="text-sm text-[#888]">Keep the indicator in the green zone!</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#888]">Stamina</p>
              <p className="text-2xl font-bold text-[#f0ad4e]">{character.stamina}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-8">
          {gameState === 'ready' && (
            <div className="text-center">
              <Zap className="w-16 h-16 text-[#f0ad4e] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Ready to Run?</h2>

              {/* Best Score Display */}
              {((character as any).gymBestScores?.treadmill) && (
                <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#f0ad4e] rounded-lg inline-block">
                  <p className="text-xs text-[#888] uppercase">Your Best Score</p>
                  <p className="text-2xl font-bold text-[#f0ad4e]">
                    {(character as any).gymBestScores.treadmill}
                  </p>
                  <p className="text-[10px] text-[#666]">Beat your record!</p>
                </div>
              )}

              <p className="text-sm text-[#888] mb-6">
                Hold the button to control the indicator and keep it in the GREEN ZONE.<br />
                Complete {TARGET_TIME} seconds of training. Speed increases over time!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-[#f0ad4e] hover:bg-[#ec971f] text-white font-bold rounded-lg transition-colors"
              >
                Start Running
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="space-y-6">
              {/* Timer and Stats */}
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-xs text-[#888]">Time Left</p>
                  <p className="text-2xl font-bold text-white">{timeRemaining.toFixed(1)}s</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">In Zone</p>
                  <p className="text-2xl font-bold text-[#5cb85c]">{percentageInZone.toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Score</p>
                  <p className="text-2xl font-bold text-[#f0ad4e]">{score}</p>
                </div>
              </div>

              {/* Indicator Bar */}
              <div className="relative h-[400px] bg-[#0f0f0f] border border-[#333] rounded-lg overflow-hidden">
                {/* Background zones */}
                <div className="absolute inset-0">
                  {/* Red zone - Too slow */}
                  <div
                    className="absolute left-0 right-0 bg-[#d9534f]/20"
                    style={{
                      top: '0%',
                      height: `${GREEN_ZONE_MIN}%`
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <p className="text-[#d9534f] font-bold text-sm uppercase">Too Slow!</p>
                    </div>
                  </div>

                  {/* Green zone - Perfect! */}
                  <div
                    className="absolute left-0 right-0 bg-[#5cb85c]/30 border-y-2 border-[#5cb85c]"
                    style={{
                      top: `${GREEN_ZONE_MIN}%`,
                      height: `${GREEN_ZONE_MAX - GREEN_ZONE_MIN}%`
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <p className="text-[#5cb85c] font-bold text-lg uppercase">PERFECT PACE!</p>
                    </div>
                  </div>

                  {/* Red zone - Too fast */}
                  <div
                    className="absolute left-0 right-0 bg-[#d9534f]/20"
                    style={{
                      top: `${GREEN_ZONE_MAX}%`,
                      height: `${100 - GREEN_ZONE_MAX}%`
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <p className="text-[#d9534f] font-bold text-sm uppercase">Too Fast!</p>
                    </div>
                  </div>
                </div>

                {/* Moving Indicator */}
                <div
                  className="absolute left-0 right-0 h-4 bg-white border-2 border-[#f0ad4e] transition-all duration-100"
                  style={{
                    top: `${indicatorPosition}%`,
                    transform: 'translateY(-50%)',
                    boxShadow: '0 0 20px rgba(240, 173, 78, 0.8)'
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-[#f0ad4e] via-white to-[#f0ad4e]" />
                </div>
              </div>

              {/* Control Button */}
              <button
                onMouseDown={() => {
                  setIsHoldingButton(true)
                  isHoldingRef.current = true
                }}
                onMouseUp={() => {
                  setIsHoldingButton(false)
                  isHoldingRef.current = false
                }}
                onMouseLeave={() => {
                  setIsHoldingButton(false)
                  isHoldingRef.current = false
                }}
                onTouchStart={() => {
                  setIsHoldingButton(true)
                  isHoldingRef.current = true
                }}
                onTouchEnd={() => {
                  setIsHoldingButton(false)
                  isHoldingRef.current = false
                }}
                className={`w-full py-16 text-white text-3xl font-bold rounded-lg transition-all select-none ${
                  isHoldingButton
                    ? 'bg-[#ec971f] scale-95'
                    : 'bg-[#f0ad4e] hover:bg-[#ec971f]'
                }`}
                style={{
                  touchAction: 'manipulation',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                {isHoldingButton ? '⚡ HOLDING ⚡' : '⚡ TAP TO SLOW DOWN ⚡'}
              </button>

              <p className="text-center text-xs text-[#888]">
                Hold button = Slow down (move UP) | Release = Speed up (move DOWN)
              </p>
            </div>
          )}

          {gameState === 'success' && (
            <div className="text-center">
              {/* New Record Banner */}
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
                You kept the pace {percentageInZone.toFixed(0)}% of the time!
              </p>
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 mb-6 space-y-3">
                <div>
                  <p className="text-xs text-[#888] mb-1">Performance</p>
                  <p className="text-2xl font-bold" style={{ color: getRatingColor(rating) }}>
                    {rating} - {percentageInZone.toFixed(0)}%
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
                    <p className="text-xs text-[#888]">Stamina</p>
                    <p className="text-lg font-bold text-[#f0ad4e]">+{statGain}</p>
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
                  className="flex-1 px-6 py-3 bg-[#f0ad4e] hover:bg-[#ec971f] text-white font-bold rounded-lg transition-colors"
                  disabled={!hasEnoughEnergy('treadmill', character?.energy || 0)}
                >
                  Train Again
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
