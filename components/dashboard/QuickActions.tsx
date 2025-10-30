'use client'

import { useState } from 'react'
import { Briefcase, GraduationCap, Dumbbell, Target } from 'lucide-react'

export function QuickActions() {
  const [isWorking, setIsWorking] = useState(false)

  const actions = [
    {
      id: 'work',
      icon: Briefcase,
      title: 'Work',
      subtitle: 'Janitor • $50/hr',
      energyCost: 20,
      color: 'success'
    },
    {
      id: 'study',
      icon: GraduationCap,
      title: 'Study',
      subtitle: 'Math 101 • +5 INT',
      energyCost: 10,
      color: 'info'
    },
    {
      id: 'train',
      icon: Dumbbell,
      title: 'Train',
      subtitle: 'Gym • +2 STR',
      energyCost: 15,
      color: 'warning'
    },
    {
      id: 'crime',
      icon: Target,
      title: 'Quick Crime',
      subtitle: 'Pickpocket • $50-200',
      energyCost: 10,
      color: 'danger'
    }
  ]

  const handleAction = async (actionId: string) => {
    setIsWorking(true)
    // TODO: API call
    setTimeout(() => {
      setIsWorking(false)
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            disabled={isWorking}
            className="group relative overflow-hidden bg-[#1a1a1a] border border-[#333] hover:border-[#5cb85c] transition-all p-4 rounded text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Icon */}
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded bg-${action.color}/10 border border-${action.color}/20`}>
                <Icon className={`w-5 h-5 text-${action.color} group-hover:scale-110 transition-transform`} />
              </div>
              <span className="text-[10px] text-warning font-bold px-2 py-1 bg-[#2a2a2a] rounded">
                -{action.energyCost} ⚡
              </span>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-sm font-bold text-[#fff] mb-1 group-hover:text-[#5cb85c] transition-colors">
                {action.title}
              </h3>
              <p className="text-xs text-[#888]">
                {action.subtitle}
              </p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5cb85c]/0 to-[#5cb85c]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        )
      })}
    </div>
  )
}