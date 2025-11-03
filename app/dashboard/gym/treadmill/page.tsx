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

interface Note {
  id: number
  position: number // 0-100 vertical position
  lane: number // 0-3 (4 lanes)
  hit: boolean
}

export default function TreadmillPage() {
  const { character, fetchCharacter } = useCharacterStore()
  const router = useRouter()

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'success'>('ready')
  const [rating, setRating] = useState<PerformanceRating>('FAIL')
  const [xpGained, setXpGained] = useState(0)
  const [statGain, setStatGain] = useState(0)
  const [score, setScore] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)

  const timerRef = useRef<NodeJS.Timeout>()
  const noteIdRef = useRef(0)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const gameTimeRef = useRef(0)

  const energyCost = getEnergyCost('treadmill')
  const TARGET_NOTES = 30 // Need to hit 30 notes to complete

  const startGame = () => {
    // Check energy before starting
    if (!hasEnoughEnergy('treadmill', character?.energy || 0)) {
      alert(`Need ${energyCost} energy to train! Rest to recover energy.`)
      return
    }

    setGameState('playing')
    setScore(0)
    setNotes([])
    setHits(0)
    setMisses(0)
    setCombo(0)
    setMaxCombo(0)
    noteIdRef.current = 0
    gameTimeRef.current = 0
    lastTimeRef.current = performance.now()

    // Start animation loop
    animate()

    // Start spawning notes
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      spawnNote()
    }, 800) // Spawn note every 800ms
  }

  const spawnNote = () => {
    const randomLane = Math.floor(Math.random() * 4)
    const newNote: Note = {
      id: noteIdRef.current++,
      position: 0, // Start at top
      lane: randomLane,
      hit: false
    }
    setNotes(prev => [...prev, newNote])
  }

  const animate = () => {
    const loop = (currentTime: number) => {
      if (gameState !== 'playing') return

      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime
      gameTimeRef.current += deltaTime

      // Move notes down
      setNotes(prev => {
        const updated = prev.map(note => ({
          ...note,
          position: note.position + deltaTime * 0.05 // Speed of falling
        }))

        // Remove notes that went past the hit zone (missed)
        const filtered = updated.filter(note => {
          if (note.position > 110 && !note.hit) {
            // Missed note!
            setMisses(m => m + 1)
            setCombo(0)
            return false
          }
          return note.position <= 110
        })

        return filtered
      })

      animationRef.current = requestAnimationFrame(loop)
    }

    animationRef.current = requestAnimationFrame(loop)
  }

  const handleLaneClick = (lane: number) => {
    if (gameState !== 'playing') return

    // Find the closest note in this lane near the hit zone (90-100)
    const hitZoneNotes = notes.filter(
      note => note.lane === lane &&
      !note.hit &&
      note.position >= 85 &&
      note.position <= 105
    )

    if (hitZoneNotes.length > 0) {
      // Hit the closest note
      const closestNote = hitZoneNotes.reduce((prev, current) =>
        Math.abs(current.position - 95) < Math.abs(prev.position - 95) ? current : prev
      )

      // Mark as hit
      setNotes(prev => prev.map(n =>
        n.id === closestNote.id ? { ...n, hit: true } : n
      ))

      // Calculate points based on timing accuracy
      const accuracy = Math.abs(closestNote.position - 95)
      let points = 0
      if (accuracy <= 5) points = 200 // Perfect!
      else if (accuracy <= 10) points = 100 // Good
      else points = 50 // OK

      setScore(s => s + points + (combo * 10)) // Combo bonus!
      setHits(h => h + 1)
      setCombo(c => {
        const newCombo = c + 1
        setMaxCombo(max => Math.max(max, newCombo))
        return newCombo
      })

      // Remove hit note after short delay
      setTimeout(() => {
        setNotes(prev => prev.filter(n => n.id !== closestNote.id))
      }, 100)

      // Check if completed
      if (hits + 1 >= TARGET_NOTES) {
        endGame()
      }
    } else {
      // Missed click - penalty
      setCombo(0)
    }
  }

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)

    // Calculate performance
    const maxScore = TARGET_NOTES * 200 + (TARGET_NOTES * (TARGET_NOTES - 1) / 2) * 10 // Perfect hits + max combo
    const result = calculateWorkoutResult(
      'treadmill',
      score,
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
        await fetchCharacter()
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

  const laneColors = ['#d9534f', '#5cb85c', '#f0ad4e', '#5bc0de']

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
              <h1 className="text-2xl font-bold text-white mb-1">⚡ Treadmill Rhythm</h1>
              <p className="text-sm text-[#888]">Hit the notes as they reach the bottom!</p>
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
              <p className="text-sm text-[#888] mb-6">
                Click the lanes when notes reach the bottom zone!<br />
                Hit {TARGET_NOTES} notes to complete the workout!<br />
                Build combos for bonus points!
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
            <div className="space-y-4">
              {/* Stats */}
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-xs text-[#888]">Hits</p>
                  <p className="text-2xl font-bold text-[#5cb85c]">{hits}/{TARGET_NOTES}</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Combo</p>
                  <p className="text-2xl font-bold text-[#f0ad4e]">x{combo}</p>
                </div>
                <div>
                  <p className="text-xs text-[#888]">Score</p>
                  <p className="text-2xl font-bold text-white">{score}</p>
                </div>
              </div>

              {/* Game Track */}
              <div className="relative h-[500px] bg-[#0f0f0f] border border-[#333] rounded-lg overflow-hidden">
                {/* Lanes */}
                <div className="absolute inset-0 flex">
                  {[0, 1, 2, 3].map(lane => (
                    <div
                      key={lane}
                      className="flex-1 border-r border-[#333] last:border-r-0 relative"
                      style={{ backgroundColor: `${laneColors[lane]}10` }}
                    >
                      {/* Hit zone indicator */}
                      <div
                        className="absolute bottom-[5%] left-0 right-0 h-[10%] border-2 border-white/30"
                        style={{ borderColor: laneColors[lane] }}
                      />
                    </div>
                  ))}
                </div>

                {/* Falling Notes */}
                {notes.map(note => (
                  <div
                    key={note.id}
                    className="absolute w-[24.5%] h-12 rounded transition-none"
                    style={{
                      left: `${note.lane * 25}%`,
                      top: `${note.position}%`,
                      backgroundColor: note.hit ? '#5cb85c' : laneColors[note.lane],
                      opacity: note.hit ? 0.3 : 1,
                      transform: `scale(${note.hit ? 1.2 : 1})`
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Lane Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map(lane => (
                  <button
                    key={lane}
                    onClick={() => handleLaneClick(lane)}
                    className="py-8 rounded-lg font-bold text-white transition-all active:scale-95"
                    style={{ backgroundColor: laneColors[lane] }}
                  >
                    HIT!
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'success' && (
            <div className="text-center">
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
                You hit {hits}/{TARGET_NOTES} notes! Max combo: {maxCombo}x
              </p>
              <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-4 mb-6 space-y-3">
                <div>
                  <p className="text-xs text-[#888] mb-1">Performance</p>
                  <p className="text-2xl font-bold" style={{ color: getRatingColor(rating) }}>
                    {rating} - {Math.round((hits / TARGET_NOTES) * 100)}%
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
