interface ProgressBarProps {
  current: number
  max: number
  label?: string
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange'
  showText?: boolean
}

export function ProgressBar({ 
  current, 
  max, 
  label,
  color = 'blue',
  showText = true 
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)
  
  const colorClasses = {
    blue: 'bg-accent-blue',
    green: 'bg-accent-green',
    red: 'bg-accent-red',
    purple: 'bg-accent-purple',
    orange: 'bg-accent-orange',
  }

  return (
    <div className="w-full">
      {label && showText && (
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>{label}</span>
          <span className="font-mono">{current}/{max}</span>
        </div>
      )}
      <div className="w-full bg-bg-hover rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}