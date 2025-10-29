import { LucideIcon } from 'lucide-react'

interface ActionButtonProps {
  icon: LucideIcon
  label: string
  sublabel?: string
  onClick?: () => void
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange'
  disabled?: boolean
  energyCost?: number
}

export function ActionButton({ 
  icon: Icon, 
  label, 
  sublabel,
  onClick,
  color = 'blue',
  disabled = false,
  energyCost
}: ActionButtonProps) {
  const colorClasses = {
    blue: 'border-accent-blue hover:bg-accent-blue/20 hover:shadow-accent-blue/50',
    green: 'border-accent-green hover:bg-accent-green/20 hover:shadow-accent-green/50',
    red: 'border-accent-red hover:bg-accent-red/20 hover:shadow-accent-red/50',
    purple: 'border-accent-purple hover:bg-accent-purple/20 hover:shadow-accent-purple/50',
    orange: 'border-accent-orange hover:bg-accent-orange/20 hover:shadow-accent-orange/50',
  }

  const iconColorClasses = {
    blue: 'text-accent-blue group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]',
    green: 'text-accent-green group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    red: 'text-accent-red group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]',
    purple: 'text-accent-purple group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
    orange: 'text-accent-orange group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative 
        bg-gradient-to-br from-bg-card to-bg-card/80
        backdrop-blur-sm
        border-2 ${colorClasses[color]} 
        rounded-lg p-4 text-left
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
        hover:shadow-lg
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${iconColorClasses[color]} transition-all duration-300`} />
        <div className="flex-1">
          <p className="font-display font-semibold text-text-primary group-hover:text-white transition-colors">
            {label}
          </p>
          {sublabel && (
            <p className="text-xs text-text-secondary mt-1">{sublabel}</p>
          )}
          {energyCost && (
            <p className="text-xs text-accent-orange mt-1 font-semibold">
              ⚡ -{energyCost} Energy
            </p>
          )}
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 rounded-lg blur-xl ${colorClasses[color]} opacity-30`} />
      </div>
    </button>
  )
}