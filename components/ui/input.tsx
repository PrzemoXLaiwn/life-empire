import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2 font-display">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-bg-hover border-2 border-border-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue focus:shadow-glow-blue transition-all ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
}