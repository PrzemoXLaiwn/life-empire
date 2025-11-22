'use client'

import { useState, useEffect, useRef } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { useRouter } from 'next/navigation'
import { Activity, ArrowLeft } from 'lucide-react'
import {
  calculateWorkoutResult,
  hasEnoughEnergy,
  getEnergyCost,
  getRatingColor,
  getRatingMessage,
  type PerformanceRating
} from '@/lib/gym/scoring'

export default function BenchPressPage() {
  const { character, fetchCharacter, updateCharacter } = useCharacterStore()
  const router = useRouter()

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'success' | 'failed'>('ready')
  const [reps, setReps] = useState(0)
  const [targetReps] = useState(10) // 10 powtórzeń
  const [perfectHits, setPerfectHits] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [rating, setRating] = useState<PerformanceRating>('FAIL')
  const [xpGained, setXpGained] = useState(0)
  const [statGain, setStatGain] = useState(0)
  const [score, setScore] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)
  const [barPosition, setBarPosition] = useState(0) // 0-100, position of moving bar
  const [barDirection, setBarDirection] = useState(1) // 1 = down, -1 = up
  const [barSpeed, setBarSpeed] = useState(0.1) // Starting speed - zwiększona
  const [barbellHeight, setBarbellHeight] = useState(50) // 0-100, for visual animation (50 = middle/chest)
  const [isLifting, setIsLifting] = useState(false) // Animation state
  const animationRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  const barDirectionRef = useRef(1)
  const barSpeedRef = useRef(0.1)
  const liftAnimationRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const energyCost = getEnergyCost('bench-press')

  const startGame = () => {
    // Check energy before starting
    if (!hasEnoughEnergy('bench-press', character?.energy || 0)) {
      alert(`Need ${energyCost} energy to train! Rest to recover energy.`)
      return
    }

    setGameState('playing')
    setReps(0)
    setPerfectHits(0)
    setTotalAttempts(0)
    setScore(0)
    setBarPosition(0)
    setBarDirection(1)
    setBarSpeed(0.1)
    setBarbellHeight(50) // Reset to chest level
    setIsLifting(false)
    barDirectionRef.current = 1
    barSpeedRef.current = 0.1
    lastTimeRef.current = performance.now()
    animateBar()
  }

  const animateBar = () => {
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      setBarPosition(prev => {
        let newPos = prev + (barDirectionRef.current * deltaTime * barSpeedRef.current) // Use dynamic speed

        // Bounce at edges
        if (newPos >= 100) {
          newPos = 100
          barDirectionRef.current = -1
          setBarDirection(-1)
        } else if (newPos <= 0) {
          newPos = 0
          barDirectionRef.current = 1
          setBarDirection(1)
        }

        return newPos
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Animate barbell lift
  const animateLift = (success: boolean) => {
    if (liftAnimationRef.current) clearTimeout(liftAnimationRef.current)

    setIsLifting(true)

    if (success) {
      // Success: Full lift animation (up and down)
      setBarbellHeight(0) // Lift up to top (0 = fully extended arms)

      liftAnimationRef.current = setTimeout(() => {
        setBarbellHeight(50) // Lower back to chest (50 = middle)
        setIsLifting(false)
      }, 400) // Hold at top for 400ms
    } else {
      // Fail: Quick shake animation
      setBarbellHeight(60) // Slightly lower (struggle)

      liftAnimationRef.current = setTimeout(() => {
        setBarbellHeight(50) // Back to starting position
        setIsLifting(false)
      }, 200) // Quick shake
    }
  }

  const handleClick = () => {
    if (gameState !== 'playing') return

    setTotalAttempts(prev => prev + 1)

    // Green zone is 35-65 (30% width in middle)
    const isInGreenZone = barPosition >= 35 && barPosition <= 65

    if (isInGreenZone) {
      // Perfect timing!
      setPerfectHits(prev => prev + 1)
      const newReps = reps + 1
      setReps(newReps)
      const points = 200 // Perfect hit
      const newScore = score + points
      setScore(newScore)

      // Trigger lift animation
      animateLift(true)

      // Increase speed after each successful rep (moderate increase)
      const newSpeed = barSpeedRef.current + 0.008 // Moderate increment
      barSpeedRef.current = newSpeed
      setBarSpeed(newSpeed)

      // Check if completed 10 reps
      if (newReps >= targetReps) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)

        // Calculate final performance rating
        const maxScore = targetReps * 200 // 2000 max score
        const result = calculateWorkoutResult(
          'bench-press',
          newScore,
          maxScore,
          character?.level || 1,
          character?.strength || 10
        )

        setRating(result.rating)
        setXpGained(result.xpGained)
        setStatGain(result.statGain)
        setGameState('success')
        saveProgress(result)
      }
    } else {
      // Missed! Lose 200 points (same as gain)
      const newScore = score - 200
      setScore(newScore)

      // Trigger fail animation
      animateLift(false)

      // Check if score dropped to 0 or below = GAME OVER
      if (newScore <= 0) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)

        // Failed - only +0 strength
        setRating('FAIL')
        setXpGained(0)
        setStatGain(0)
        setScore(0)
        setGameState('failed')

        // Save with 0 gains
        saveProgress({
          rating: 'FAIL',
          score: 0,
          xpGained: 0,
          statGain: 0
        })
      }
    }
  }

  // Cleanup animation
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (liftAnimationRef.current) {
        clearTimeout(liftAnimationRef.current)
      }
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
          workout: 'bench-press',
          stat: 'strength',
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
              <h1 className="text-2xl font-bold text-white mb-1">💪 Bench Press</h1>
              <p className="text-sm text-[#888]">Click when the bar is in the green zone!</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#888]">Strength</p>
              <p className="text-2xl font-bold text-[#d9534f]">{character.strength}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-8">
          {gameState === 'ready' && (
            <div className="text-center">
              <Activity className="w-16 h-16 text-[#d9534f] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Ready to Lift?</h2>
              <p className="text-sm text-[#888] mb-6">
                Click when the bar is in the green zone to complete a rep.<br />
                Complete {targetReps} reps to finish the workout!<br />
                <span className="text-[#d9534f] font-bold">⚠️ Miss = -200 points! Drop to 0 = FAIL!</span>
              </p>

              {/* Best Score Display */}
              {((character as any).gymBestScores?.['bench-press']) && (
                <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#d9534f] rounded-lg inline-block">
                  <p className="text-xs text-[#888] uppercase">Your Best Score</p>
                  <p className="text-2xl font-bold text-[#d9534f]">
                    {(character as any).gymBestScores['bench-press']}
                  </p>
                  <p className="text-[10px] text-[#666]">Beat your record!</p>
                </div>
              )}

              <button
                onClick={startGame}
                className="px-8 py-3 bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold rounded-lg transition-colors"
              >
                Start Workout
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="text-center mb-8">
                <p className="text-sm text-[#888] mb-2">Progress</p>
                <p className="text-5xl font-bold text-white mb-4">{reps}/{targetReps}</p>
                <div className="w-full bg-[#0f0f0f] rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#d9534f] to-[#c9302c] h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(reps / targetReps) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Barbell Animation - Side View Like GTA SA */}
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-6 mb-6">
                <p className="text-sm text-[#888] text-center mb-4">Watch the lift! 💪</p>

                {/* Side view visualization */}
                <div className="relative w-full h-56 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-lg overflow-hidden border-2 border-[#333]">
                  {/* Floor */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#444] to-transparent"></div>

                  {/* Bench (static) - centered */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                    {/* Bench seat */}
                    <div className="w-40 h-5 bg-gradient-to-b from-[#d9534f] to-[#c9302c] rounded border-2 border-[#a94442]"></div>
                    {/* Bench legs */}
                    <div className="absolute -bottom-12 left-4 w-3 h-12 bg-gradient-to-b from-[#666] to-[#444] border border-[#333]"></div>
                    <div className="absolute -bottom-12 right-4 w-3 h-12 bg-gradient-to-b from-[#666] to-[#444] border border-[#333]"></div>
                  </div>

                  {/* Character lying on bench */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center">
                    {/* Head (on left) */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4a574] to-[#c9945f] border-2 border-[#a67c52] flex items-center justify-center mr-2">
                      {/* Face */}
                      <div className="text-xs">😤</div>
                    </div>

                    {/* Body/Torso (center) */}
                    <div className="w-28 h-7 bg-gradient-to-b from-[#5bc0de] to-[#46b8da] rounded-sm border-2 border-[#31b0d5] relative">
                      {/* Arms extending up to barbell */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-16">
                        {/* Left arm */}
                        <div
                          className="w-2 bg-gradient-to-b from-[#d4a574] to-[#c9945f] rounded origin-bottom transition-all duration-300"
                          style={{
                            height: barbellHeight >= 50 ? '16px' : `${16 + ((50 - barbellHeight) * 1.2)}px`
                          }}
                        ></div>
                        {/* Right arm */}
                        <div
                          className="w-2 bg-gradient-to-b from-[#d4a574] to-[#c9945f] rounded origin-bottom transition-all duration-300"
                          style={{
                            height: barbellHeight >= 50 ? '16px' : `${16 + ((50 - barbellHeight) * 1.2)}px`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Legs (on right) */}
                    <div className="w-16 h-5 bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-r ml-1 border-2 border-[#1a252f]"></div>
                  </div>

                  {/* Barbell with weights (moves up and down above character) */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out"
                    style={{
                      bottom: barbellHeight >= 50
                        ? '88px'  // At chest level (resting)
                        : `${88 + ((50 - barbellHeight) * 2.2)}px` // Lifted up
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {/* Left weight plate */}
                      <div className="w-12 h-20 bg-gradient-to-r from-[#555] to-[#333] rounded-l-xl border-2 border-[#222] flex items-center justify-center shadow-xl">
                        <div className="text-[10px] text-white font-bold rotate-90">20kg</div>
                      </div>

                      {/* Bar */}
                      <div className="w-48 h-3 bg-gradient-to-r from-[#666] via-[#bbb] to-[#666] relative shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-sm"></div>
                        {/* Grip marks */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-full border-l-2 border-r-2 border-[#333]/70"></div>
                      </div>

                      {/* Right weight plate */}
                      <div className="w-12 h-20 bg-gradient-to-l from-[#555] to-[#333] rounded-r-xl border-2 border-[#222] flex items-center justify-center shadow-xl">
                        <div className="text-[10px] text-white font-bold rotate-90">20kg</div>
                      </div>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold"
                    style={{
                      backgroundColor: isLifting ? '#5cb85c' : '#333',
                      color: isLifting ? 'white' : '#888'
                    }}
                  >
                    {isLifting ? '💪 PRESSING!' : '⚡ Ready...'}
                  </div>

                  {/* Rep counter */}
                  <div className="absolute top-2 right-2 text-[10px] text-[#888]">
                    Rep: {reps}/{targetReps}
                  </div>
                </div>
              </div>

              {/* Timing Bar - Visual feedback */}
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-6">
                <p className="text-sm text-[#888] text-center mb-3">Click when the bar is in the GREEN zone!</p>

                {/* The timing track */}
                <div className="relative w-full h-16 bg-[#1a1a1a] rounded-lg overflow-hidden">
                  {/* Red zones (edges) */}
                  <div className="absolute left-0 top-0 w-[35%] h-full bg-red-500/20"></div>
                  <div className="absolute right-0 top-0 w-[35%] h-full bg-red-500/20"></div>

                  {/* Green zone (middle) - 30% width for easier hitting */}
                  <div className="absolute left-[35%] top-0 w-[30%] h-full bg-green-500/30 border-l-2 border-r-2 border-green-500"></div>

                  {/* Moving bar indicator */}
                  <div
                    className="absolute top-0 h-full w-1 bg-white shadow-lg transition-none"
                    style={{ left: `${barPosition}%` }}
                  ></div>
                </div>

                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-red-500">Miss</span>
                  <span className="text-green-500 font-bold">PERFECT!</span>
                  <span className="text-red-500">Miss</span>
                </div>
              </div>

              {/* Click Button */}
              <button
                onClick={handleClick}
                className="w-full py-16 bg-gradient-to-br from-[#d9534f] to-[#c9302c] hover:from-[#c9302c] hover:to-[#d9534f] text-white text-3xl font-bold rounded-lg transition-all active:scale-95 shadow-lg"
              >
                💪 LIFT! 💪
              </button>

              <p className="text-center text-sm text-[#888]">Score: <span className="text-[#f0ad4e] font-bold">{score}</span></p>
            </div>
          )}

          {gameState === 'failed' && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#d9534f]">
                <span className="text-4xl">✗</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#d9534f]">
                Failed! Score dropped to 0!
              </h2>
              <p className="text-sm text-[#888] mb-4">
                You completed {reps}/{targetReps} reps before failing. Try to avoid missing!
              </p>
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 mb-6 space-y-3">
                <div>
                  <p className="text-xs text-[#888] mb-1">Final Score</p>
                  <p className="text-3xl font-bold text-[#d9534f]">0</p>
                </div>
                <div className="flex justify-around pt-2 border-t border-[#333]">
                  <div>
                    <p className="text-xs text-[#888]">XP Gained</p>
                    <p className="text-lg font-bold text-[#5bc0de]">+0</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#888]">Strength</p>
                    <p className="text-lg font-bold text-[#d9534f]">+0</p>
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
                  className="flex-1 px-6 py-3 bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold rounded-lg transition-colors"
                  disabled={!hasEnoughEnergy('bench-press', character?.energy || 0)}
                >
                  Try Again
                </button>
              </div>
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
                You completed {reps}/{targetReps} perfect reps! ({totalAttempts} total attempts)
              </p>
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 mb-6 space-y-3">
                <div>
                  <p className="text-xs text-[#888] mb-1">Performance</p>
                  <p className="text-2xl font-bold" style={{ color: getRatingColor(rating) }}>
                    {rating} - {Math.round((perfectHits / targetReps) * 100)}%
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
                    <p className="text-xs text-[#888]">Strength</p>
                    <p className="text-lg font-bold text-[#d9534f]">+{statGain}</p>
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
                  className="flex-1 px-6 py-3 bg-[#d9534f] hover:bg-[#c9302c] text-white font-bold rounded-lg transition-colors"
                  disabled={!hasEnoughEnergy('bench-press', character?.energy || 0)}
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
