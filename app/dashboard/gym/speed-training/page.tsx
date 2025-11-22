'use client'

import { useState, useEffect, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { useRouter } from 'next/navigation'
import { Wind, ArrowLeft } from 'lucide-react'
import {
  calculateWorkoutResult,
  hasEnoughEnergy,
  getEnergyCost,
  getRatingColor,
  getRatingMessage,
  type PerformanceRating
} from '@/lib/gym/scoring'

export default function SpeedTrainingPage() {
  const { character, fetchCharacter, updateCharacter } = useCharacterStore()
  const router = useRouter()

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'success'>('ready')
  const [timeLeft, setTimeLeft] = useState(20) // 20 seconds
  const [rating, setRating] = useState<PerformanceRating>('FAIL')
  const [xpGained, setXpGained] = useState(0)
  const [statGain, setStatGain] = useState(0)
  const [score, setScore] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [targetZone, setTargetZone] = useState(50) // Center of green zone
  const [targetDirection, setTargetDirection] = useState(1) // 1 or -1
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const animationRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  const isPlayingRef = useRef(false)
  const scoreRef = useRef(0)
  const sliderPositionRef = useRef(50)
  const targetZoneRef = useRef(50)

  const energyCost = getEnergyCost('speed-training')

  const startGame = () => {
    // Check energy before starting
    if (!hasEnoughEnergy('speed-training', character?.energy || 0)) {
      alert(`Need ${energyCost} energy to train! Rest to recover energy.`)
      return
    }

    setGameState('playing')
    isPlayingRef.current = true
    setTimeLeft(20)
    setScore(0)
    scoreRef.current = 0
    setSliderPosition(50)
    sliderPositionRef.current = 50
    setTargetZone(50)
    targetZoneRef.current = 50
    setTargetDirection(1)
    targetDirectionRef.current = 1
    lastTimeRef.current = performance.now()

    // Start countdown timer
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    animateTarget()
  }

  const targetDirectionRef = useRef(1)

  const animateTarget = () => {
    lastTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      if (!isPlayingRef.current) return

      const deltaTime = (currentTime - lastTimeRef.current) / 16 // Normalize to ~60fps
      lastTimeRef.current = currentTime

      // Move target zone
      setTargetZone(prev => {
        let newPos = prev + (targetDirectionRef.current * 0.8) // Speed of movement

        // Bounce at edges
        if (newPos >= 85) {
          newPos = 85
          targetDirectionRef.current = -1
          setTargetDirection(-1)
        } else if (newPos <= 15) {
          newPos = 15
          targetDirectionRef.current = 1
          setTargetDirection(1)
        }

        targetZoneRef.current = newPos
        return newPos
      })

      // Check if slider is in zone and award points automatically (10 times per second)
      const isInZone = Math.abs(sliderPositionRef.current - targetZoneRef.current) <= 15
      if (isInZone) {
        scoreRef.current += 2
        setScore(scoreRef.current)
      } else {
        scoreRef.current = Math.max(0, scoreRef.current - 1)
        setScore(scoreRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const endGame = () => {
    isPlayingRef.current = false
    if (timerRef.current) clearInterval(timerRef.current)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)

    // Calculate performance - max score if always in zone
    const maxScore = 20 * 60 * 2 // 20 seconds × 60 fps × 2 points = 2400 max score
    const result = calculateWorkoutResult(
      'speed-training',
      scoreRef.current,
      maxScore,
      character?.level || 1,
      (character as any)?.speed || 10
    )

    setRating(result.rating)
    setXpGained(result.xpGained)
    setStatGain(result.statGain)
    setGameState('success')
    saveProgress(result)
  }

  const handleSliderChange = (newValue: number) => {
    if (!isPlayingRef.current) return
    setSliderPosition(newValue)
    sliderPositionRef.current = newValue
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
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
          workout: 'speed-training',
          stat: 'speed',
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
              <h1 className="text-2xl font-bold text-white mb-1">🏃 Speed Training</h1>
              <p className="text-sm text-[#888]">Keep the slider in the target zone!</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#888]">Speed</p>
              <p className="text-2xl font-bold text-[#5cb85c]">{(character as any).speed || 10}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-8">
          {gameState === 'ready' && (
            <div className="text-center">
              <Wind className="w-16 h-16 text-[#5cb85c] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Ready to Sprint?</h2>
              <p className="text-sm text-[#888] mb-6">
                Keep your slider in the moving green zone for 20 seconds!<br />
                The zone moves - track it with your slider to earn points!
              </p>

              {/* Best Score Display */}
              {((character as any).gymBestScores?.['speed-training']) && (
                <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#5cb85c] rounded-lg inline-block">
                  <p className="text-xs text-[#888] uppercase">Your Best Score</p>
                  <p className="text-2xl font-bold text-[#5cb85c]">
                    {(character as any).gymBestScores['speed-training']}
                  </p>
                  <p className="text-[10px] text-[#666]">Beat your record!</p>
                </div>
              )}

              <button
                onClick={startGame}
                className="px-8 py-3 bg-[#5cb85c] hover:bg-[#4a9d4a] text-white font-bold rounded-lg transition-colors"
              >
                Start Sprinting
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="space-y-6">
              {/* Timer */}
              <div className={`text-center p-4 rounded-lg border ${
                timeLeft <= 5 ? 'bg-red-500/10 border-red-500 animate-pulse' : 'bg-[#0f0f0f] border-[#333]'
              }`}>
                <p className="text-sm text-[#888] mb-1">Time Remaining</p>
                <p className={`text-4xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
                  {timeLeft}s
                </p>
              </div>

              {/* Visual Track with Moving Green Zone */}
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-6">
                <p className="text-sm text-[#888] text-center mb-3">Keep your slider in the GREEN zone!</p>

                {/* Visual representation of track */}
                <div className="relative w-full h-12 bg-[#1a1a1a] rounded-lg overflow-hidden mb-4">
                  {/* Moving green zone */}
                  <div
                    className="absolute top-0 h-full bg-green-500/30 border-l-2 border-r-2 border-green-500 transition-none"
                    style={{
                      left: `${Math.max(0, targetZone - 15)}%`,
                      width: '30%'
                    }}
                  ></div>

                  {/* Player slider position indicator */}
                  <div
                    className="absolute top-0 h-full w-1 bg-white shadow-lg transition-none"
                    style={{ left: `${sliderPosition}%` }}
                  ></div>
                </div>

                {/* Slider control */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full h-8 bg-[#0f0f0f] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:h-12 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5cb85c] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                />

                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-red-500">Out of zone</span>
                  <span className={Math.abs(sliderPosition - targetZone) <= 15 ? 'text-green-500 font-bold' : 'text-red-500'}>
                    {Math.abs(sliderPosition - targetZone) <= 15 ? '✓ IN ZONE!' : '✗ OUT'}
                  </span>
                  <span className="text-red-500">Out of zone</span>
                </div>
              </div>

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
                You survived the 20 second sprint!
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
                    <p className="text-xs text-[#888]">Speed</p>
                    <p className="text-lg font-bold text-[#5cb85c]">+{statGain}</p>
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
                  className="flex-1 px-6 py-3 bg-[#5cb85c] hover:bg-[#4a9d4a] text-white font-bold rounded-lg transition-colors"
                  disabled={!hasEnoughEnergy('speed-training', character?.energy || 0)}
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
