import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  isLoading?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold font-display transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-accent-blue hover:bg-accent-blue/80 text-white',
    secondary: 'bg-bg-hover hover:bg-bg-hover/80 text-text-primary border border-border-light',
    danger: 'bg-accent-red hover:bg-accent-red/80 text-white',
    success: 'bg-accent-green hover:bg-accent-green/80 text-white'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'LOADING...' : children}
    </button>
  )
}