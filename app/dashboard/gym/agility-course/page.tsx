'use client'

import { useState, useEffect } from 'react'
import { useCharacterStore } from '@/lib/character-store'
import { useRouter } from 'next/navigation'
import { Target, ArrowLeft, ArrowUp, ArrowDown, ArrowLeftIcon, ArrowRight } from 'lucide-react'
import {
  calculateWorkoutResult,
  hasEnoughEnergy,
  getEnergyCost,
  getRatingColor,
  getRatingMessage,
  type PerformanceRating
} from '@/lib/gym/scoring'

const DIRECTIONS = ['up', 'down', 'left', 'right'] as const
type Direction = typeof DIRECTIONS[number]

const DIRECTION_ICONS = {
  up: ArrowUp,
  down: ArrowDown,
  left: ArrowLeftIcon,
  right: ArrowRight
}

const DIRECTION_COLORS = {
  up: '#d9534f',
  down: '#5cb85c',
  left: '#f0ad4e',
  right: '#5bc0de'
}

export default function AgilityCoursePage() {
  const { character, fetchCharacter, updateCharacter } = useCharacterStore()
  const router = useRouter()

  const [gameState, setGameState] = useState<'ready' | 'showing' | 'playing' | 'success'>('ready')
  const [round, setRound] = useState(1)
  const [targetRounds] = useState(5) // 5 rounds - easier!
  const [rating, setRating] = useState<PerformanceRating>('FAIL')
  const [xpGained, setXpGained] = useState(0)
  const [statGain, setStatGain] = useState(0)
  const [score, setScore] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(false)
  const [sequence, setSequence] = useState<Direction[]>([])
  const [playerInput, setPlayerInput] = useState<Direction[]>([])
  const [highlightedButton, setHighlightedButton] = useState<Direction | null>(null)

  const energyCost = getEnergyCost('agility-course')

  const startGame = () => {
    // Check energy before starting
    if (!hasEnoughEnergy('agility-course', character?.energy || 0)) {
      alert(`Need ${energyCost} energy to train! Rest to recover energy.`)
      return
    }

    setGameState('showing')
    setRound(1)
    setScore(0)
    setPlayerInput([])

    // Scroll to show all buttons before starting sequence
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      })

      // Start sequence after scroll
      setTimeout(() => {
        generateNewSequence()
      }, 800)
    }, 100)
  }

  const generateNewSequence = () => {
    // Add one random direction to the sequence
    const newDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
    const newSequence = [...sequence, newDirection]
    setSequence(newSequence)
    showSequence(newSequence)
  }

  const showSequence = async (seq: Direction[]) => {
    setGameState('showing')
    setPlayerInput([])

    // Show each direction with a delay - SLOWER for easier memory
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))  // Longer pause
      setHighlightedButton(seq[i])
      await new Promise(resolve => setTimeout(resolve, 600))  // Longer highlight
      setHighlightedButton(null)
    }

    await new Promise(resolve => setTimeout(resolve, 500))  // Longer prep time
    setGameState('playing')
  }

  const handleDirectionClick = (direction: Direction) => {
    if (gameState !== 'playing') return

    const newInput = [...playerInput, direction]
    setPlayerInput(newInput)

    // Check if correct
    const currentIndex = playerInput.length
    if (sequence[currentIndex] !== direction) {
      // Wrong! Game over
      setGameState('ready')
      setSequence([])
      setPlayerInput([])
      setRound(1)
      return
    }

    // Check if sequence is complete
    if (newInput.length === sequence.length) {
      // Correct! Next round
      const points = 200 * round
      setScore(prev => prev + points)

      if (round >= targetRounds) {
        // Game complete! Calculate performance
        const finalScore = score + points
        const maxScore = targetRounds * 200 * targetRounds // Each round worth more
        const result = calculateWorkoutResult(
          'agility-course',
          finalScore,
          maxScore,
          character?.level || 1,
          (character as any)?.agility || 10
        )

        setRating(result.rating)
        setXpGained(result.xpGained)
        setStatGain(result.statGain)
        setGameState('success')
        saveProgress(result)
      } else {
        // Next round
        setRound(prev => prev + 1)
        setTimeout(() => {
          generateNewSequence()
        }, 1000)
      }
    }
  }

  const saveProgress = async (result: any) => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const response = await fetch('/api/gym/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workout: 'agility-course',
          stat: 'agility',
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
              <h1 className="text-2xl font-bold text-white mb-1">🤸 Agility Course</h1>
              <p className="text-sm text-[#888]">Remember and repeat the sequence!</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#888]">Agility</p>
              <p className="text-2xl font-bold text-[#9b59b6]">{(character as any).agility || 10}</p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-8">
          {gameState === 'ready' && (
            <div className="text-center">
              <Target className="w-16 h-16 text-[#9b59b6] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Ready for the Course?</h2>
              <p className="text-sm text-[#888] mb-6">
                Memory game! Watch the sequence and repeat it.<br />
                Each round adds one more move - complete {targetRounds} rounds!
              </p>

              {/* Best Score Display */}
              {((character as any).gymBestScores?.['agility-course']) && (
                <div className="mb-4 p-3 bg-[#0f0f0f] border border-[#9b59b6] rounded-lg inline-block">
                  <p className="text-xs text-[#888] uppercase">Your Best Score</p>
                  <p className="text-2xl font-bold text-[#9b59b6]">
                    {(character as any).gymBestScores['agility-course']}
                  </p>
                  <p className="text-[10px] text-[#666]">Beat your record!</p>
                </div>
              )}

              <button
                onClick={startGame}
                className="px-8 py-3 bg-[#9b59b6] hover:bg-[#8e44ad] text-white font-bold rounded-lg transition-colors"
              >
                Start Course
              </button>
            </div>
          )}

          {(gameState === 'showing' || gameState === 'playing') && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="text-center mb-8">
                <p className="text-sm text-[#888] mb-2">Round {round} of {targetRounds}</p>
                <p className="text-5xl font-bold text-white mb-4">{playerInput.length}/{sequence.length}</p>
                <div className="w-full bg-[#0f0f0f] rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(round / targetRounds) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Message */}
              <div className="text-center py-8 bg-[#0f0f0f] border border-[#333] rounded-lg">
                {gameState === 'showing' && (
                  <p className="text-lg text-[#888]">Watch carefully...</p>
                )}
                {gameState === 'playing' && (
                  <>
                    <p className="text-lg text-[#888] mb-2">Repeat the sequence!</p>
                    <p className="text-sm text-[#666]">Progress: {playerInput.length}/{sequence.length}</p>
                  </>
                )}
              </div>

              {/* Direction Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleDirectionClick('up')}
                  disabled={gameState === 'showing'}
                  className={`aspect-square bg-gradient-to-br from-[#d9534f] to-[#c9302c] hover:scale-105 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    highlightedButton === 'up' ? 'scale-110 ring-4 ring-white' : ''
                  } ${gameState === 'showing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowUp className="w-12 h-12 text-white" />
                </button>
                <button
                  onClick={() => handleDirectionClick('down')}
                  disabled={gameState === 'showing'}
                  className={`aspect-square bg-gradient-to-br from-[#5cb85c] to-[#4a9d4a] hover:scale-105 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    highlightedButton === 'down' ? 'scale-110 ring-4 ring-white' : ''
                  } ${gameState === 'showing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowDown className="w-12 h-12 text-white" />
                </button>
                <button
                  onClick={() => handleDirectionClick('left')}
                  disabled={gameState === 'showing'}
                  className={`aspect-square bg-gradient-to-br from-[#f0ad4e] to-[#ec971f] hover:scale-105 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    highlightedButton === 'left' ? 'scale-110 ring-4 ring-white' : ''
                  } ${gameState === 'showing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowLeftIcon className="w-12 h-12 text-white" />
                </button>
                <button
                  onClick={() => handleDirectionClick('right')}
                  disabled={gameState === 'showing'}
                  className={`aspect-square bg-gradient-to-br from-[#5bc0de] to-[#46b8da] hover:scale-105 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    highlightedButton === 'right' ? 'scale-110 ring-4 ring-white' : ''
                  } ${gameState === 'showing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowRight className="w-12 h-12 text-white" />
                </button>
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
                You completed all {targetRounds} rounds perfectly!
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
                    <p className="text-xs text-[#888]">Agility</p>
                    <p className="text-lg font-bold text-[#9b59b6]">+{statGain}</p>
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
                  className="flex-1 px-6 py-3 bg-[#9b59b6] hover:bg-[#8e44ad] text-white font-bold rounded-lg transition-colors"
                  disabled={!hasEnoughEnergy('agility-course', character?.energy || 0)}
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
