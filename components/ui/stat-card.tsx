interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  subValue?: string
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'yellow'
  progress?: number
}

export function StatCard({ 
  icon, 
  label, 
  value, 
  subValue, 
  color = 'blue',
  progress 
}: StatCardProps) {
  const colorClasses = {
    blue: 'border-accent-blue shadow-accent-blue/20',
    green: 'border-accent-green shadow-accent-green/20',
    red: 'border-accent-red shadow-accent-red/20',
    purple: 'border-accent-purple shadow-accent-purple/20',
    orange: 'border-accent-orange shadow-accent-orange/20',
    yellow: 'border-accent-yellow shadow-accent-yellow/20',
  }

  const progressColorClasses = {
    blue: 'bg-gradient-to-r from-accent-blue to-accent-blue/50',
    green: 'bg-gradient-to-r from-accent-green to-accent-green/50',
    red: 'bg-gradient-to-r from-accent-red to-accent-red/50',
    purple: 'bg-gradient-to-r from-accent-purple to-accent-purple/50',
    orange: 'bg-gradient-to-r from-accent-orange to-accent-orange/50',
    yellow: 'bg-gradient-to-r from-accent-yellow to-accent-yellow/50',
  }

  const glowClasses = {
    blue: 'hover:shadow-lg hover:shadow-accent-blue/30',
    green: 'hover:shadow-lg hover:shadow-accent-green/30',
    red: 'hover:shadow-lg hover:shadow-accent-red/30',
    purple: 'hover:shadow-lg hover:shadow-accent-purple/30',
    orange: 'hover:shadow-lg hover:shadow-accent-orange/30',
    yellow: 'hover:shadow-lg hover:shadow-accent-yellow/30',
  }

  return (
    <div className={`
      bg-gradient-to-br from-bg-card to-bg-card/80 
      backdrop-blur-sm
      rounded-lg border-t-2 
      ${colorClasses[color]} 
      ${glowClasses[color]}
      p-4 
      hover:bg-bg-hover 
      transition-all duration-300
      hover:scale-105
      shadow-md
    `}>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl drop-shadow-lg">{icon}</div>
        <div className="flex-1">
          <p className="text-xs text-text-secondary font-display uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold font-mono text-text-primary drop-shadow-md">
            {value}
          </p>
          {subValue && (
            <p className="text-xs text-text-muted mt-0.5">{subValue}</p>
          )}
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="w-full bg-bg-dark/50 rounded-full h-2 overflow-hidden shadow-inner">
          <div 
            className={`h-full ${progressColorClasses[color]} transition-all duration-500 shadow-lg`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}